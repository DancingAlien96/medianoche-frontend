import Link from "next/link";
import { redirect } from "next/navigation";
import { OrderStatusBadge } from "@/components/order-status-badge";
import { getMyOrders } from "@/lib/api";
import { formatPrice } from "@/lib/money";
import { formatOrderDate, orderCode } from "@/lib/orders";
import { getCurrentUser, getToken } from "@/lib/session";

export default async function OrdersPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const token = (await getToken())!;
  const orders = await getMyOrders(token);

  if (orders.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Aún no tienes pedidos</h1>
        <p className="text-muted">Cuando hagas un pedido aparecerá aquí.</p>
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
      <h1 className="text-2xl font-semibold">Mis pedidos</h1>
      <div className="flex flex-col gap-3">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/pedidos/${order.id}`}
            className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4 hover:border-accent transition-colors"
          >
            <div>
              <p className="font-medium">Pedido #{orderCode(order.id)}</p>
              <p className="text-sm text-muted">
                {formatOrderDate(order.createdAt)} · {order.items.length}{" "}
                {order.items.length === 1 ? "artículo" : "artículos"}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <OrderStatusBadge status={order.status} />
              <span className="font-semibold text-accent">
                {formatPrice(order.totalCents)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
