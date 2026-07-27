"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ApiError, adminUpdateOrderStatus, createOrder, getMe } from "./api";
import { PAYMENT_METHODS } from "./orders";
import { getToken } from "./session";
import type { OrderStatus, PaymentMethod } from "./types";

export interface CheckoutState {
  error?: string;
}

export async function checkoutAction(
  _prev: CheckoutState,
  formData: FormData,
): Promise<CheckoutState> {
  const token = await getToken();
  if (!token) redirect("/login");

  const paymentMethod = String(
    formData.get("paymentMethod") ?? "",
  ) as PaymentMethod;

  const input = {
    customerName: String(formData.get("customerName") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim(),
    city: String(formData.get("city") ?? "").trim(),
    notes: String(formData.get("notes") ?? "").trim() || undefined,
    paymentMethod,
  };

  if (
    !input.customerName ||
    !input.phone ||
    !input.address ||
    !input.city ||
    !PAYMENT_METHODS.includes(paymentMethod)
  ) {
    return { error: "Completa todos los campos obligatorios." };
  }

  let orderId: string;
  try {
    const order = await createOrder(token, input);
    orderId = order.id;
  } catch (error) {
    return {
      error:
        error instanceof ApiError
          ? error.message
          : "No se pudo realizar el pedido. Intenta de nuevo.",
    };
  }
  // Cart was emptied server-side; refresh the navbar counter.
  revalidatePath("/", "layout");
  redirect(`/pedidos/${orderId}?nuevo=1`);
}

async function requireAdminToken(): Promise<string> {
  const token = await getToken();
  if (!token) redirect("/login");
  const user = await getMe(token);
  if (!user || user.role !== "ADMIN") redirect("/");
  return token;
}

export async function updateOrderStatusAction(
  id: string,
  status: OrderStatus,
) {
  const token = await requireAdminToken();
  await adminUpdateOrderStatus(token, id, status);
  revalidatePath("/admin/pedidos");
}
