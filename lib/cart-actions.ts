"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addCartItem, removeCartItem, updateCartItem } from "./api";
import { getToken } from "./session";

function revalidateCart() {
  revalidatePath("/cart");
  // Refresh the navbar cart counter rendered in the root layout.
  revalidatePath("/", "layout");
}

export async function addToCartAction(productId: string, quantity = 1) {
  const token = await getToken();
  if (!token) redirect("/login");
  await addCartItem(token, productId, quantity);
  revalidateCart();
}

export async function updateCartItemAction(itemId: string, quantity: number) {
  const token = await getToken();
  if (!token) redirect("/login");
  await updateCartItem(token, itemId, quantity);
  revalidateCart();
}

export async function removeCartItemAction(itemId: string) {
  const token = await getToken();
  if (!token) redirect("/login");
  await removeCartItem(token, itemId);
  revalidateCart();
}
