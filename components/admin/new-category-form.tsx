"use client";

import { Plus } from "lucide-react";
import { useActionState } from "react";
import { WatchSpinner } from "@/components/ui/watch-spinner";
import { createCategoryAction } from "@/lib/category-actions";

export function NewCategoryForm() {
  const [state, action, pending] = useActionState(createCategoryAction, {});

  return (
    <form action={action} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          name="name"
          required
          minLength={2}
          placeholder="Nueva categoría"
          className="flex-1 h-10 rounded-lg border border-border bg-surface-2 px-3 text-sm outline-none focus:border-accent transition-colors"
        />
        <button
          type="submit"
          disabled={pending}
          className="flex items-center gap-2 rounded-lg bg-accent px-4 h-10 text-sm font-medium text-accent-foreground hover:bg-accent-hover disabled:opacity-50 transition-colors"
        >
          {pending ? (
            <WatchSpinner className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          Agregar
        </button>
      </div>
      {state.error && <p className="text-sm text-danger">{state.error}</p>}
    </form>
  );
}
