"use client";

import { useActionState, useState } from "react";
import { WatchSpinner } from "@/components/ui/watch-spinner";
import { createRequerimientoAction } from "@/lib/request-actions";

const inputClass =
  "h-11 rounded-md border border-border bg-surface-2 px-3 outline-none focus:border-accent transition-colors";

export function RequerimientoForm() {
  const [state, action, pending] = useActionState(
    createRequerimientoAction,
    {},
  );
  const [previews, setPreviews] = useState<string[]>([]);
  const [tooMany, setTooMany] = useState(false);

  function onPhotos(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    setTooMany(files.length > 3);
    setPreviews(files.slice(0, 3).map((f) => URL.createObjectURL(f)));
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      {state.error && (
        <p className="rounded-md border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
          {state.error}
        </p>
      )}

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-muted">Nombre (opcional)</span>
        <input name="name" className={inputClass} />
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Celular / WhatsApp *</span>
          <input name="phone" required className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Marca (opcional)</span>
          <input
            name="brand"
            placeholder="Rolex, Omega, Casio…"
            className={inputClass}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-muted">¿Qué buscas? *</span>
        <textarea
          name="description"
          required
          rows={4}
          placeholder="Describe el reloj o pieza que buscas: modelo, referencia, color, características…"
          className="rounded-md border border-border bg-surface-2 px-3 py-2 outline-none focus:border-accent transition-colors resize-y"
        />
      </label>

      <div className="flex flex-col gap-2 text-sm">
        <span className="text-muted">Fotos de referencia (opcional, máx. 3)</span>
        {previews.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {previews.map((url, i) => (
              <div
                key={i}
                className="w-20 h-20 rounded-md overflow-hidden border border-border bg-surface-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          name="photos"
          accept="image/*"
          multiple
          onChange={onPhotos}
          className="text-sm file:mr-3 file:rounded-md file:border-0 file:bg-surface-2 file:px-3 file:py-2 file:text-foreground hover:file:bg-border"
        />
        {tooMany && (
          <p className="text-danger">Solo se enviarán las primeras 3 fotos.</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="h-11 flex items-center justify-center gap-2 rounded-md bg-accent font-medium text-accent-foreground uppercase tracking-wide text-sm hover:bg-accent-hover disabled:opacity-50 transition-colors"
      >
        {pending && <WatchSpinner className="w-4 h-4" />}
        {pending ? "Enviando…" : "Enviar requerimiento"}
      </button>

      <p className="text-xs text-muted text-center">
        Te contactaremos por WhatsApp para ayudarte a encontrar tu pieza.
      </p>
    </form>
  );
}
