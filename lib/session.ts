import { cookies } from "next/headers";
import { getMe } from "./api";
import type { User } from "./types";

export const TOKEN_COOKIE = "mn_token";

/** Read the JWT from the httpOnly cookie (Server Components / Actions only). */
export async function getToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(TOKEN_COOKIE)?.value;
}

/** Resolve the current user from the session cookie, or null if signed out. */
export async function getCurrentUser(): Promise<User | null> {
  const token = await getToken();
  if (!token) return null;
  return getMe(token);
}
