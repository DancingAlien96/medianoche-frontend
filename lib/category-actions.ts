"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  ApiError,
  adminCreateCategory,
  adminDeleteCategory,
  adminUpdateCategory,
  getMe,
} from "./api";
import { getToken } from "./session";

export interface CategoryState {
  error?: string;
}

async function requireAdminToken(): Promise<string> {
  const token = await getToken();
  if (!token) redirect("/login");
  const user = await getMe(token);
  if (!user || user.role !== "ADMIN") redirect("/");
  return token;
}

function revalidateCategories() {
  revalidatePath("/admin/categorias");
  revalidatePath("/"); // home category filter
}

export async function createCategoryAction(
  _prev: CategoryState,
  formData: FormData,
): Promise<CategoryState> {
  const token = await requireAdminToken();
  const name = String(formData.get("name") ?? "").trim();
  if (name.length < 2) {
    return { error: "El nombre debe tener al menos 2 caracteres." };
  }
  try {
    await adminCreateCategory(token, name);
  } catch (error) {
    return {
      error:
        error instanceof ApiError
          ? error.message
          : "No se pudo crear la categoría.",
    };
  }
  revalidateCategories();
  redirect("/admin/categorias");
}

export async function updateCategoryAction(
  _prev: CategoryState,
  formData: FormData,
): Promise<CategoryState> {
  const token = await requireAdminToken();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  if (!id) return { error: "Categoría no encontrada." };
  if (name.length < 2) {
    return { error: "El nombre debe tener al menos 2 caracteres." };
  }
  try {
    await adminUpdateCategory(token, id, name);
  } catch (error) {
    return {
      error:
        error instanceof ApiError
          ? error.message
          : "No se pudo actualizar la categoría.",
    };
  }
  revalidateCategories();
  redirect("/admin/categorias");
}

export async function deleteCategoryAction(
  id: string,
  reassignToId?: string,
): Promise<CategoryState> {
  const token = await requireAdminToken();
  try {
    await adminDeleteCategory(token, id, reassignToId);
  } catch (error) {
    return {
      error:
        error instanceof ApiError
          ? error.message
          : "No se pudo eliminar la categoría.",
    };
  }
  revalidateCategories();
  return {};
}
