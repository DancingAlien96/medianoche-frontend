"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";
import { removeCartItemAction, updateCartItemAction } from "@/lib/cart-actions";
import { formatPrice } from "@/lib/money";
import type { CartItem } from "@/lib/types";

export function CartItemRow({ item }: { item: CartItem }) {
  const [pending, startTransition] = useTransition();

  const setQuantity = (quantity: number) => {
    if (quantity < 1 || quantity > 99) return;
    startTransition(() => updateCartItemAction(item.id, quantity));
  };

  return (
    <div className="flex gap-4 rounded-xl border border-border bg-surface p-3">
      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-surface-2 shrink-0">
        <Image
          src={item.product.imageUrl}
          alt={item.product.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <p className="font-medium truncate">{item.product.name}</p>
        <p className="text-sm text-muted">
          {formatPrice(item.product.priceCents)}
        </p>

        <div className="mt-auto flex items-center gap-3">
          <div className="inline-flex items-center rounded-lg border border-border overflow-hidden">
            <button
              type="button"
              aria-label="Disminuir cantidad"
              disabled={pending || item.quantity <= 1}
              onClick={() => setQuantity(item.quantity - 1)}
              className="grid place-items-center px-2.5 py-2 hover:bg-surface-2 disabled:opacity-40"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-3 min-w-8 text-center tabular-nums">
              {item.quantity}
            </span>
            <button
              type="button"
              aria-label="Aumentar cantidad"
              disabled={pending || item.quantity >= 99}
              onClick={() => setQuantity(item.quantity + 1)}
              className="grid place-items-center px-2.5 py-2 hover:bg-surface-2 disabled:opacity-40"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button
            type="button"
            aria-label="Eliminar del carrito"
            disabled={pending}
            onClick={() =>
              startTransition(() => removeCartItemAction(item.id))
            }
            className="flex items-center gap-1.5 text-sm text-danger hover:underline disabled:opacity-40"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </button>
        </div>
      </div>

      <div className="text-right font-semibold whitespace-nowrap">
        {formatPrice(item.product.priceCents * item.quantity)}
      </div>
    </div>
  );
}
