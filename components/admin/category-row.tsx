"use client";

import { Check, Pencil, Trash2, X } from "lucide-react";
import { useActionState, useState, useTransition } from "react";
import { WatchSpinner } from "@/components/ui/watch-spinner";
import {
  deleteCategoryAction,
  updateCategoryAction,
} from "@/lib/category-actions";
import type { Category } from "@/lib/types";

export function CategoryRow({
  category,
  categories,
}: {
  category: Category;
  categories: Category[];
}) {
  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [updState, updateAction, updPending] = useActionState(
    updateCategoryAction,
    {},
  );
  const [delPending, startDelete] = useTransition();
  const [delError, setDelError] = useState<string | null>(null);

  const count = category._count?.products ?? 0;
  const others = categories.filter((c) => c.id !== category.id);
  const [target, setTarget] = useState(others[0]?.id ?? "");

  function runDelete(reassignToId?: string) {
    setDelError(null);
    startDelete(async () => {
      const result = await deleteCategoryAction(category.id, reassignToId);
      if (result?.error) setDelError(result.error);
      else setConfirmingDelete(false);
    });
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <div className="flex items-center gap-2">
        {editing ? (
          <form action={updateAction} className="flex items-center gap-2 flex-1">
            <input type="hidden" name="id" value={category.id} />
            <input
              name="name"
              defaultValue={category.name}
              required
              minLength={2}
              autoFocus
              className="flex-1 h-9 rounded-lg border border-border bg-surface-2 px-3 text-sm outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              disabled={updPending}
              aria-label="Guardar"
              className="p-2 rounded-lg text-success hover:bg-surface-2 disabled:opacity-50"
            >
              {updPending ? (
                <WatchSpinner className="w-4 h-4" />
              ) : (
                <Check className="w-4 h-4" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              aria-label="Cancelar"
              className="p-2 rounded-lg text-muted hover:bg-surface-2"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{category.name}</p>
              <p className="text-xs text-muted">
                {count} {count === 1 ? "producto" : "productos"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setEditing(true)}
              aria-label="Renombrar"
              title="Renombrar"
              className="p-2 rounded-lg hover:bg-surface-2 transition-colors"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={delPending}
              aria-label="Eliminar"
              title="Eliminar"
              onClick={() => {
                if (count > 0) {
                  setConfirmingDelete((v) => !v);
                } else if (
                  confirm(`¿Eliminar la categoría "${category.name}"?`)
                ) {
                  runDelete();
                }
              }}
              className="p-2 rounded-lg text-danger hover:bg-surface-2 disabled:opacity-40 transition-colors"
            >
              {delPending ? (
                <WatchSpinner className="w-4 h-4" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </button>
          </>
        )}
      </div>

      {confirmingDelete && count > 0 && !editing && (
        <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
          <p className="text-sm text-muted">
            Esta categoría tiene {count}{" "}
            {count === 1 ? "producto" : "productos"}. ¿A qué categoría moverlos
            antes de eliminar?
          </p>
          {others.length === 0 ? (
            <p className="text-sm text-danger">
              Crea otra categoría primero para poder mover los productos.
            </p>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="h-9 rounded-lg border border-border bg-surface-2 px-2 text-sm outline-none focus:border-accent"
              >
                {others.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                disabled={delPending || !target}
                onClick={() => runDelete(target)}
                className="flex items-center gap-2 rounded-lg bg-danger px-3 h-9 text-sm font-medium text-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {delPending ? (
                  <WatchSpinner className="w-4 h-4" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Mover y eliminar
              </button>
              <button
                type="button"
                onClick={() => setConfirmingDelete(false)}
                className="text-sm text-muted hover:text-foreground px-2"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      )}

      {updState.error && (
        <p className="text-sm text-danger mt-1">{updState.error}</p>
      )}
      {delError && <p className="text-sm text-danger mt-1">{delError}</p>}
    </div>
  );
}
