import { redirect } from "next/navigation";
import { CheckoutForm } from "@/components/checkout-form";
import { getCart } from "@/lib/api";
import { formatPrice } from "@/lib/money";
import { getCurrentUser, getToken } from "@/lib/session";

const SHIPPING_CENTS = 3500;

export default async function CheckoutPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const token = (await getToken())!;
  const cart = await getCart(token);
  if (cart.items.length === 0) redirect("/cart");

  const total = cart.subtotalCents + SHIPPING_CENTS;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Finalizar compra</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm defaultName={user.name} />
        </div>

        <aside className="rounded-xl border border-border bg-surface p-5 h-fit flex flex-col gap-3">
          <h2 className="font-semibold">Resumen</h2>
          {cart.items.map((item) => (
            <div key={item.id} className="flex justify-between gap-3 text-sm">
              <span className="text-muted">
                {item.product.name}{" "}
                <span className="text-foreground">× {item.quantity}</span>
              </span>
              <span className="whitespace-nowrap">
                {formatPrice(item.product.priceCents * item.quantity)}
              </span>
            </div>
          ))}
          <div className="border-t border-border pt-3 flex justify-between text-sm">
            <span className="text-muted">Subtotal</span>
            <span>{formatPrice(cart.subtotalCents)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted">Envío</span>
            <span>{formatPrice(SHIPPING_CENTS)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t border-border pt-3">
            <span>Total</span>
            <span className="text-accent">{formatPrice(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
