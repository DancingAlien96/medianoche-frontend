import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { OrderStatusBadge } from "@/components/order-status-badge";
import { ApiError, getOrder } from "@/lib/api";
import { formatPrice } from "@/lib/money";
import {
  formatOrderDate,
  orderCode,
  PAYMENT_METHOD_LABELS,
} from "@/lib/orders";
import { getCurrentUser, getToken } from "@/lib/session";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ nuevo?: string }>;
}

export default async function OrderDetailPage({ params, searchParams }: Props) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { id } = await params;
  const { nuevo } = await searchParams;
  const token = (await getToken())!;

  let order;
  try {
    order = await getOrder(token, id);
  } catch (error) {
    if (error instanceof ApiError) notFound();
    throw error;
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      {nuevo && (
        <div className="flex items-center gap-3 rounded-xl border border-success/40 bg-success/10 px-4 py-3 text-success">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="text-sm">
            ¡Pedido realizado! Te enviamos un correo de confirmación y
            coordinaremos el pago y la entrega contigo.
          </p>
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">
            Pedido #{orderCode(order.id)}
          </h1>
          <p className="text-sm text-muted">
            {formatOrderDate(order.createdAt)}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="rounded-xl border border-border bg-surface divide-y divide-border">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-3">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-surface-2 shrink-0">
              <Image
                src={item.imageUrl}
                alt={item.productName}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{item.productName}</p>
              <p className="text-sm text-muted">
                {formatPrice(item.priceCents)} × {item.quantity}
              </p>
            </div>
            <span className="font-medium whitespace-nowrap">
              {formatPrice(item.priceCents * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Subtotal</span>
          <span>{formatPrice(order.subtotalCents)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Envío</span>
          <span>{formatPrice(order.shippingCents)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg border-t border-border pt-2">
          <span>Total</span>
          <span className="text-accent">{formatPrice(order.totalCents)}</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 text-sm">
        <div className="rounded-xl border border-border bg-surface p-5">
          <h2 className="font-semibold mb-2">Entrega</h2>
          <p>{order.customerName}</p>
          <p className="text-muted">{order.phone}</p>
          <p className="text-muted">
            {order.address}, {order.city}
          </p>
          {order.notes && (
            <p className="text-muted mt-1">Notas: {order.notes}</p>
          )}
        </div>
        <div className="rounded-xl border border-border bg-surface p-5">
          <h2 className="font-semibold mb-2">Pago</h2>
          <p>{PAYMENT_METHOD_LABELS[order.paymentMethod]}</p>
          <p className="text-muted mt-1">
            Sin cobro en línea — se coordina contigo.
          </p>
        </div>
      </div>

      <Link
        href="/pedidos"
        className="text-sm text-muted hover:text-foreground w-fit"
      >
        ← Ver todos mis pedidos
      </Link>
    </div>
  );
}
