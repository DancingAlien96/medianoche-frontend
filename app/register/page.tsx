"use client";

import Link from "next/link";
import { useActionState } from "react";
import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { WatchSpinner } from "@/components/ui/watch-spinner";
import { registerAction, type AuthState } from "@/lib/auth-actions";

const initialState: AuthState = {};

export default function RegisterPage() {
  const [state, action, pending] = useActionState(registerAction, initialState);

  return (
    <div className="max-w-sm mx-auto py-8 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Crear cuenta</h1>
        <p className="text-muted mt-1 text-sm">
          Únete a Medianoche en un minuto.
        </p>
      </div>

      <form action={action} className="flex flex-col gap-4">
        {state.error && (
          <p className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
            {state.error}
          </p>
        )}
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Nombre</span>
          <input
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            className="h-11 rounded-lg border border-border bg-surface-2 px-3 outline-none focus:border-accent transition-colors"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Correo electrónico</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="h-11 rounded-lg border border-border bg-surface-2 px-3 outline-none focus:border-accent transition-colors"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Contraseña</span>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            className="h-11 rounded-lg border border-border bg-surface-2 px-3 outline-none focus:border-accent transition-colors"
          />
          <span className="text-xs text-muted">Mínimo 6 caracteres.</span>
        </label>
        <button
          type="submit"
          disabled={pending}
          className="h-11 flex items-center justify-center gap-2 rounded-lg bg-accent font-medium text-accent-foreground hover:bg-accent-hover disabled:opacity-50 transition-colors"
        >
          {pending && <WatchSpinner className="w-4 h-4" />}
          {pending ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>

      <div className="flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-border" />o<span className="h-px flex-1 bg-border" />
      </div>

      <GoogleSignInButton />

      <p className="text-sm text-muted text-center">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="text-accent hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
