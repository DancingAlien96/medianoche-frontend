"use client";

import { useTransition } from "react";
import { updateOrderStatusAction } from "@/lib/order-actions";
import { ORDER_STATUS_LABELS, ORDER_STATUSES } from "@/lib/orders";
import type { OrderStatus } from "@/lib/types";

export function OrderStatusSelect({
  id,
  status,
}: {
  id: string;
  status: OrderStatus;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(event) =>
        startTransition(() =>
          updateOrderStatusAction(id, event.target.value as OrderStatus),
        )
      }
      className="h-9 rounded-lg border border-border bg-surface-2 px-2 text-sm outline-none focus:border-accent disabled:opacity-50 transition-colors"
    >
      {ORDER_STATUSES.map((s) => (
        <option key={s} value={s}>
          {ORDER_STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}
