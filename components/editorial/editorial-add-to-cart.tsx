"use client";

import { useState, useTransition } from "react";
import { addToCartAction } from "@/lib/cart-actions";

/** Minimal editorial "Agregar" control; reuses the real cart server action. */
export function EditorialAddToCart({
  productId,
  disabled,
}: {
  productId: string;
  disabled?: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState(false);

  if (disabled) {
    return (
      <button type="button" className="agregar" disabled>
        Agotado
      </button>
    );
  }

  return (
    <button
      type="button"
      className="agregar"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await addToCartAction(productId, 1);
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        })
      }
    >
      {pending ? "Agregando…" : done ? "Agregado ✓" : "Agregar"}
    </button>
  );
}
