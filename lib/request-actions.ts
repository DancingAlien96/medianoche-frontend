"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminUpdateRequestStatus, getMe } from "./api";
import { getToken } from "./session";
import type { RequestStatus } from "./types";

const API_URL = process.env.API_URL ?? "http://localhost:3001/api";

export interface RequerimientoState {
  error?: string;
}

/** Public: submit a special request (contact + description + up to 3 photos). */
export async function createRequerimientoAction(
  _prev: RequerimientoState,
  formData: FormData,
): Promise<RequerimientoState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const brand = String(formData.get("brand") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (phone.length < 6) return { error: "Ingresa un teléfono válido." };
  if (description.length < 4) {
    return { error: "Describe lo que buscas." };
  }

  // Forward as multipart to the backend (public endpoint).
  const body = new FormData();
  if (name) body.set("name", name);
  body.set("phone", phone);
  if (brand) body.set("brand", brand);
  body.set("description", description);

  let count = 0;
  for (const photo of formData.getAll("photos")) {
    if (photo instanceof File && photo.size > 0 && count < 3) {
      body.append("photos", photo);
      count += 1;
    }
  }

  let res: Response;
  try {
    res = await fetch(`${API_URL}/requests`, { method: "POST", body });
  } catch {
    return { error: "No se pudo enviar. Revisa tu conexión e intenta de nuevo." };
  }

  if (!res.ok) {
    let message = "No se pudo enviar el requerimiento.";
    try {
      const data = (await res.json()) as { message?: string | string[] };
      if (data.message) {
        message = Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message;
      }
    } catch {
      // ignore
    }
    return { error: message };
  }

  redirect("/requerimiento?enviado=1");
}

async function requireAdminToken(): Promise<string> {
  const token = await getToken();
  if (!token) redirect("/login");
  const user = await getMe(token);
  if (!user || user.role !== "ADMIN") redirect("/");
  return token;
}

export async function updateRequestStatusAction(
  id: string,
  status: RequestStatus,
) {
  const token = await requireAdminToken();
  await adminUpdateRequestStatus(token, id, status);
  revalidatePath("/admin/requerimientos");
}
