"use client";

import Link from "next/link";
import { useActionState } from "react";
import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { WatchSpinner } from "@/components/ui/watch-spinner";
import { loginAction, type AuthState } from "@/lib/auth-actions";

const initialState: AuthState = {};

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <div className="max-w-sm mx-auto py-8 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Iniciar sesión</h1>
        <p className="text-muted mt-1 text-sm">
          Bienvenido de vuelta a Medianoche.
        </p>
      </div>

      <form action={action} className="flex flex-col gap-4">
        {state.error && (
          <p className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
            {state.error}
          </p>
        )}
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
            autoComplete="current-password"
            className="h-11 rounded-lg border border-border bg-surface-2 px-3 outline-none focus:border-accent transition-colors"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="h-11 flex items-center justify-center gap-2 rounded-lg bg-accent font-medium text-accent-foreground hover:bg-accent-hover disabled:opacity-50 transition-colors"
        >
          {pending && <WatchSpinner className="w-4 h-4" />}
          {pending ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <div className="flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-border" />o<span className="h-px flex-1 bg-border" />
      </div>

      <GoogleSignInButton />

      <p className="text-sm text-muted text-center">
        ¿No tienes cuenta?{" "}
        <Link href="/register" className="text-accent hover:underline">
          Regístrate
        </Link>
      </p>
    </div>
  );
}
