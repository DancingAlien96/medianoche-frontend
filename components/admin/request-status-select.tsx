"use client";

import { useTransition } from "react";
import { updateRequestStatusAction } from "@/lib/request-actions";
import { REQUEST_STATUS_LABELS, REQUEST_STATUSES } from "@/lib/requests";
import type { RequestStatus } from "@/lib/types";

export function RequestStatusSelect({
  id,
  status,
}: {
  id: string;
  status: RequestStatus;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(event) =>
        startTransition(() =>
          updateRequestStatusAction(id, event.target.value as RequestStatus),
        )
      }
      className="h-9 rounded-md border border-border bg-surface-2 px-2 text-sm outline-none focus:border-accent disabled:opacity-50 transition-colors"
    >
      {REQUEST_STATUSES.map((s) => (
        <option key={s} value={s}>
          {REQUEST_STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}
