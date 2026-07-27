"use client";

import { useActionState } from "react";
import { WatchSpinner } from "@/components/ui/watch-spinner";
import { checkoutAction } from "@/lib/order-actions";
import { PAYMENT_METHODS, PAYMENT_METHOD_LABELS } from "@/lib/orders";

const inputClass =
  "h-11 rounded-lg border border-border bg-surface-2 px-3 outline-none focus:border-accent transition-colors";

export function CheckoutForm({ defaultName }: { defaultName?: string }) {
  const [state, action, pending] = useActionState(checkoutAction, {});

  return (
    <form action={action} className="flex flex-col gap-4">
      {state.error && (
        <p className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
          {state.error}
        </p>
      )}

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-muted">Nombre de quien recibe *</span>
        <input
          name="customerName"
          required
          defaultValue={defaultName}
          className={inputClass}
        />
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Celular / WhatsApp *</span>
          <input name="phone" required className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Ciudad / Departamento *</span>
          <input name="city" required className={inputClass} />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-muted">Dirección de entrega *</span>
        <input name="address" required className={inputClass} />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-muted">Notas (opcional)</span>
        <textarea
          name="notes"
          rows={2}
          className="rounded-lg border border-border bg-surface-2 px-3 py-2 outline-none focus:border-accent transition-colors resize-y"
        />
      </label>

      <fieldset className="flex flex-col gap-2 text-sm">
        <span className="text-muted">Método de pago *</span>
        {PAYMENT_METHODS.map((method, index) => (
          <label
            key={method}
            className="flex items-center gap-3 rounded-lg border border-border bg-surface-2 px-3 py-2.5 cursor-pointer hover:border-accent transition-colors"
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method}
              defaultChecked={index === 0}
              className="accent-accent"
            />
            {PAYMENT_METHOD_LABELS[method]}
          </label>
        ))}
      </fieldset>

      <button
        type="submit"
        disabled={pending}
        className="h-11 flex items-center justify-center gap-2 rounded-lg bg-accent font-medium text-accent-foreground hover:bg-accent-hover disabled:opacity-50 transition-colors"
      >
        {pending && <WatchSpinner className="w-4 h-4" />}
        {pending ? "Realizando pedido..." : "Confirmar pedido"}
      </button>

      <p className="text-xs text-muted text-center">
        No se realiza ningún cobro en línea. Coordinaremos el pago y la entrega
        contigo.
      </p>
    </form>
  );
}
