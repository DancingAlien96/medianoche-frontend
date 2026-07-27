"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { WatchSpinner } from "@/components/ui/watch-spinner";
import { deleteProductAction } from "@/lib/admin-actions";

export function DeleteProductButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) {
          startTransition(() => deleteProductAction(id));
        }
      }}
      className="flex items-center gap-1.5 text-sm rounded-lg border border-border px-3 py-1.5 text-danger hover:border-danger disabled:opacity-40 transition-colors"
    >
      {pending ? (
        <WatchSpinner className="w-4 h-4" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
      <span className="hidden sm:inline">
        {pending ? "Eliminando..." : "Eliminar"}
      </span>
    </button>
  );
}
