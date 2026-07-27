"use client";

import { ShoppingBag } from "lucide-react";
import { useTransition } from "react";
import { WatchSpinner } from "@/components/ui/watch-spinner";
import { addToCartAction } from "@/lib/cart-actions";

interface Props {
  productId: string;
  disabled?: boolean;
}

export function AddToCartButton({ productId, disabled }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={disabled || pending}
      onClick={() => startTransition(() => addToCartAction(productId, 1))}
      className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-accent-foreground hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {pending ? (
        <WatchSpinner className="w-4 h-4" />
      ) : (
        <ShoppingBag className="w-4 h-4" />
      )}
      {pending
        ? "Agregando..."
        : disabled
          ? "Sin stock"
          : "Agregar al carrito"}
    </button>
  );
}
