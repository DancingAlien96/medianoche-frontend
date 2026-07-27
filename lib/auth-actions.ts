"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApiError, googleLogin, login, register } from "./api";
import { TOKEN_COOKIE } from "./session";

export interface AuthState {
  error?: string;
}

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

async function setAuthCookie(token: string) {
  const store = await cookies();
  store.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function loginAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  try {
    const { accessToken } = await login(email, password);
    await setAuthCookie(accessToken);
  } catch (error) {
    return {
      error:
        error instanceof ApiError
          ? error.message
          : "No se pudo iniciar sesión. Intenta de nuevo.",
    };
  }
  // redirect() throws, so it must live outside the try/catch above.
  redirect("/");
}

export async function registerAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  try {
    const { accessToken } = await register(name, email, password);
    await setAuthCookie(accessToken);
  } catch (error) {
    return {
      error:
        error instanceof ApiError
          ? error.message
          : "No se pudo crear la cuenta. Intenta de nuevo.",
    };
  }
  redirect("/");
}

export async function googleLoginAction(idToken: string): Promise<AuthState> {
  try {
    const { accessToken } = await googleLogin(idToken);
    await setAuthCookie(accessToken);
  } catch (error) {
    return {
      error:
        error instanceof ApiError
          ? error.message
          : "No se pudo iniciar sesión con Google.",
    };
  }
  redirect("/");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(TOKEN_COOKIE);
  redirect("/");
}
