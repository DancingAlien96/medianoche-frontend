"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  ApiError,
  createProduct,
  deleteProduct,
  getMe,
  updateProduct,
  uploadImage,
  type ProductInput,
} from "./api";
import { getToken } from "./session";

export interface AdminState {
  error?: string;
}

/** Ensure the caller is an authenticated ADMIN; returns their token. */
async function requireAdminToken(): Promise<string> {
  const token = await getToken();
  if (!token) redirect("/login");
  const user = await getMe(token);
  if (!user || user.role !== "ADMIN") redirect("/");
  return token;
}

function parseProduct(formData: FormData): ProductInput | { error: string } {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const categoryId = String(formData.get("categoryId") ?? "");
  const brand = String(formData.get("brand") ?? "").trim();
  const gender = String(formData.get("gender") ?? "");
  const movement = String(formData.get("movement") ?? "");
  const previousRaw = String(formData.get("previousPrice") ?? "").trim();

  let images: string[] = [];
  try {
    const parsed = JSON.parse(String(formData.get("images") ?? "[]"));
    if (Array.isArray(parsed)) {
      images = parsed.filter((x) => typeof x === "string" && x.length > 0);
    }
  } catch {
    // ignore malformed input
  }

  if (!name || !description || !categoryId) {
    return { error: "Completa todos los campos obligatorios." };
  }
  if (images.length === 0) {
    return { error: "Sube al menos una imagen." };
  }
  if (!Number.isFinite(price) || price < 0) {
    return { error: "El precio no es válido." };
  }
  if (!Number.isInteger(stock) || stock < 0) {
    return { error: "El stock no es válido." };
  }

  const previous = previousRaw ? Number(previousRaw) : NaN;
  const input: ProductInput = {
    name,
    description,
    priceCents: Math.round(price * 100),
    stock,
    categoryId,
    images,
    // Empty string clears brand on the backend (service maps "" → null).
    brand,
    // 0 → backend treats as "no sale price".
    previousPriceCents:
      Number.isFinite(previous) && previous > 0
        ? Math.round(previous * 100)
        : 0,
  };
  // Enums must be valid values or omitted (empty is rejected by the API).
  if (gender === "MALE" || gender === "FEMALE" || gender === "UNISEX") {
    input.gender = gender;
  }
  if (movement === "AUTOMATIC" || movement === "QUARTZ") {
    input.movement = movement;
  }
  return input;
}

function revalidateProducts() {
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function createProductAction(
  _prev: AdminState,
  formData: FormData,
): Promise<AdminState> {
  const token = await requireAdminToken();
  const parsed = parseProduct(formData);
  if ("error" in parsed) return parsed;

  try {
    await createProduct(token, parsed);
  } catch (error) {
    return {
      error:
        error instanceof ApiError
          ? error.message
          : "No se pudo crear el producto.",
    };
  }
  revalidateProducts();
  redirect("/admin");
}

export async function updateProductAction(
  _prev: AdminState,
  formData: FormData,
): Promise<AdminState> {
  const token = await requireAdminToken();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Producto no encontrado." };

  const parsed = parseProduct(formData);
  if ("error" in parsed) return parsed;

  try {
    await updateProduct(token, id, parsed);
  } catch (error) {
    return {
      error:
        error instanceof ApiError
          ? error.message
          : "No se pudo actualizar el producto.",
    };
  }
  revalidateProducts();
  redirect("/admin");
}

export async function deleteProductAction(id: string) {
  const token = await requireAdminToken();
  await deleteProduct(token, id);
  revalidateProducts();
}

export async function uploadImageAction(
  formData: FormData,
): Promise<{ url?: string; error?: string }> {
  const token = await requireAdminToken();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Archivo inválido." };
  }
  try {
    const { url } = await uploadImage(token, file);
    return { url };
  } catch (error) {
    return {
      error:
        error instanceof ApiError
          ? error.message
          : "No se pudo subir la imagen.",
    };
  }
}
