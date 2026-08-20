import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Moon,
  Receipt,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { getCart } from "@/lib/api";
import { logoutAction } from "@/lib/auth-actions";
import { getCurrentUser, getToken } from "@/lib/session";
import { SearchBar } from "./search-bar";

async function cartCount(): Promise<number> {
  const token = await getToken();
  if (!token) return 0;
  try {
    const cart = await getCart(token);
    return cart.totalItems;
  } catch {
    return 0;
  }
}

export async function Navbar() {
  const user = await getCurrentUser();
  const count = user ? await cartCount() : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur">
      <div className="w-full px-3 sm:px-6 lg:px-10">
        {/* Top row: logo + (inline search on desktop) + actions */}
        <div className="h-16 flex items-center justify-between gap-2 sm:gap-8">
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 min-w-0 shrink"
            aria-label="Medianoche — inicio"
          >
            <Moon
              className="w-5 h-5 sm:w-6 sm:h-6 text-accent shrink-0"
              fill="currentColor"
              strokeWidth={1.5}
            />
            <span className="font-serif text-lg sm:text-2xl tracking-tight truncate">
              Medianoche
            </span>
          </Link>

          {/* Inline search: desktop only */}
          <div className="hidden md:block flex-1 max-w-2xl">
            <Suspense fallback={<div className="h-10" />}>
              <SearchBar />
            </Suspense>
          </div>

          <nav className="flex items-center gap-0.5 sm:gap-1 text-sm shrink-0">
            <a
              href="/anatomia/index.html"
              className="hidden md:inline-flex rounded-lg px-3 py-2 text-muted hover:bg-surface-2 hover:text-foreground transition-colors"
            >
              Anatomía
            </a>

            {user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="rounded-lg p-2 sm:p-2.5 text-muted hover:bg-surface-2 hover:text-foreground transition-colors"
                aria-label="Panel de administración"
                title="Admin"
              >
                <LayoutDashboard className="w-5 h-5" />
              </Link>
            )}

            <Link
              href="/cart"
              className="relative rounded-lg p-2 sm:p-2.5 text-foreground hover:bg-surface-2 transition-colors"
              aria-label={`Carrito${count > 0 ? ` (${count})` : ""}`}
              title="Carrito"
            >
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-accent-foreground text-[11px] font-semibold grid place-items-center">
                  {count}
                </span>
              )}
            </Link>

            {user && (
              <Link
                href="/pedidos"
                className="rounded-lg p-2 sm:p-2.5 text-muted hover:bg-surface-2 hover:text-foreground transition-colors"
                aria-label="Mis pedidos"
                title="Mis pedidos"
              >
                <Receipt className="w-5 h-5" />
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-1 pl-1">
                <span className="hidden sm:inline text-muted px-2 max-w-[10ch] truncate">
                  {user.name.split(" ")[0]}
                </span>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="rounded-lg p-2 sm:p-2.5 text-muted hover:bg-surface-2 hover:text-foreground transition-colors"
                    aria-label="Cerrar sesión"
                    title="Salir"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </form>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-lg bg-accent px-3 sm:px-4 py-2 font-medium text-accent-foreground hover:bg-accent-hover transition-colors ml-1"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Ingresar</span>
              </Link>
            )}
          </nav>
        </div>

        {/* Search on its own row: mobile only */}
        <div className="md:hidden pb-3">
          <Suspense fallback={<div className="h-10" />}>
            <SearchBar />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
