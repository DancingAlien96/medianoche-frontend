import Link from "next/link";
import { CartItemRow } from "@/components/cart-item-row";
import { getCart } from "@/lib/api";
import { formatPrice } from "@/lib/money";
import { getCurrentUser, getToken } from "@/lib/session";

export default async function CartPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="max-w-md mx-auto text-center py-16 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Tu carrito</h1>
        <p className="text-muted">
          Inicia sesión para ver y gestionar tu carrito.
        </p>
        <Link
          href="/login"
          className="mx-auto rounded-lg bg-accent px-6 py-3 font-medium text-accent-foreground hover:bg-accent-hover transition-colors"
        >
          Ingresar
        </Link>
      </div>
    );
  }

  const token = (await getToken())!;
  const cart = await getCart(token);

  if (cart.items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Tu carrito está vacío</h1>
        <p className="text-muted">Explora el catálogo y agrega productos.</p>
        <Link
          href="/"
          className="mx-auto rounded-lg bg-accent px-6 py-3 font-medium text-accent-foreground hover:bg-accent-hover transition-colors"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Tu carrito</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-3">
          {cart.items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </div>

        <aside className="rounded-xl border border-border bg-surface p-5 h-fit flex flex-col gap-4">
          <h2 className="font-semibold">Resumen</h2>
          <div className="flex justify-between text-sm">
            <span className="text-muted">Productos</span>
            <span>{cart.totalItems}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t border-border pt-4">
            <span>Subtotal</span>
            <span className="text-accent">{formatPrice(cart.subtotalCents)}</span>
          </div>
          <Link
            href="/checkout"
            className="rounded-lg bg-accent px-6 py-3 font-medium text-accent-foreground hover:bg-accent-hover transition-colors text-center"
          >
            Finalizar compra
          </Link>
          <p className="text-xs text-muted text-center">
            Sin pago en línea: coordinamos el pago y la entrega contigo.
          </p>
        </aside>
      </div>
    </div>
  );
}
