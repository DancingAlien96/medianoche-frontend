import { ORDER_STATUS_LABELS } from "@/lib/orders";
import type { OrderStatus } from "@/lib/types";

const styles: Record<OrderStatus, string> = {
  PENDING: "bg-surface-2 text-muted border-border",
  CONFIRMED: "bg-accent/15 text-accent border-accent/40",
  SHIPPED: "bg-navy/40 text-foreground border-navy",
  DELIVERED: "bg-success/15 text-success border-success/40",
  CANCELLED: "bg-danger/15 text-danger border-danger/40",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
}
