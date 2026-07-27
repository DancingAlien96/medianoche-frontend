import { OrderStatusSelect } from "@/components/admin/order-status-select";
import { adminGetOrders } from "@/lib/api";
import { formatPrice } from "@/lib/money";
import { formatOrderDate, orderCode, PAYMENT_METHOD_LABELS } from "@/lib/orders";
import { getToken } from "@/lib/session";

export default async function AdminOrdersPage() {
  const token = (await getToken())!;
  const orders = await adminGetOrders(token);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Pedidos ({orders.length})</h2>

      {orders.length === 0 ? (
        <p className="text-muted py-12 text-center">Aún no hay pedidos.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-border bg-surface p-4 flex flex-col gap-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium">
                    Pedido #{orderCode(order.id)} ·{" "}
                    <span className="text-accent">
                      {formatPrice(order.totalCents)}
                    </span>
                  </p>
                  <p className="text-sm text-muted">
                    {formatOrderDate(order.createdAt)} ·{" "}
                    {order.items.length}{" "}
                    {order.items.length === 1 ? "artículo" : "artículos"}
                  </p>
                </div>
                <OrderStatusSelect id={order.id} status={order.status} />
              </div>

              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                <p>
                  <span className="text-muted">Cliente:</span>{" "}
                  {order.customerName}
                  {order.user && (
                    <span className="text-muted"> ({order.user.email})</span>
                  )}
                </p>
                <p>
                  <span className="text-muted">Tel:</span> {order.phone}
                </p>
                <p>
                  <span className="text-muted">Entrega:</span> {order.address},{" "}
                  {order.city}
                </p>
                <p>
                  <span className="text-muted">Pago:</span>{" "}
                  {PAYMENT_METHOD_LABELS[order.paymentMethod]}
                </p>
                {order.notes && (
                  <p className="sm:col-span-2">
                    <span className="text-muted">Notas:</span> {order.notes}
                  </p>
                )}
              </div>

              <div className="text-sm text-muted">
                {order.items
                  .map((i) => `${i.productName} ×${i.quantity}`)
                  .join(", ")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
