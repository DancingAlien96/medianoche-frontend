import Link from "next/link";
import { getCart } from "@/lib/api";
import { getCurrentUser, getToken } from "@/lib/session";

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

type Active = "catalogo" | "nosotros" | "anatomia" | undefined;

/** Sticky editorial top bar shared by the redesigned pages. */
export async function EditorialBar({
  active,
  defaultQuery,
}: {
  active?: Active;
  defaultQuery?: string;
}) {
  const user = await getCurrentUser();
  const count = user ? await cartCount() : 0;

  return (
    <header className="barra">
      <div className="barra-in">
        <Link href="/" className="marca" aria-label="Medianoche, inicio">
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M14.5 13.2A6.2 6.2 0 0 1 6.8 5.5a6.5 6.5 0 1 0 7.7 7.7Z"
              fill="currentColor"
            />
          </svg>
          Medianoche
        </Link>

        <form className="buscar" action="/catalogo" method="get" role="search">
          <svg
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="4.6" />
            <path d="m10.5 10.5 4 4" />
          </svg>
          <input
            type="search"
            name="q"
            defaultValue={defaultQuery}
            placeholder="Buscar por marca, modelo o referencia"
            aria-label="Buscar en el catálogo"
          />
        </form>

        <nav className="nav">
          <Link
            href="/anatomia/index.html"
            className={`oculta-movil ${active === "anatomia" ? "activo" : ""}`}
          >
            Anatomía
          </Link>
          <Link
            href="/catalogo"
            className={active === "catalogo" ? "activo" : ""}
          >
            Catálogo
          </Link>
          <Link
            href="/nosotros"
            className={`oculta-movil ${active === "nosotros" ? "activo" : ""}`}
          >
            Nosotros
          </Link>
          {user?.role === "ADMIN" && (
            <Link href="/admin" className="oculta-movil">
              Admin
            </Link>
          )}
          <Link href="/cart" className="icono" aria-label="Bolsa de compras">
            <svg
              width="17"
              height="17"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              aria-hidden="true"
            >
              <path d="M3.4 5.5h11.2l-.9 9.3a1 1 0 0 1-1 .9H5.3a1 1 0 0 1-1-.9L3.4 5.5Z" />
              <path d="M6.4 7.4V5a2.6 2.6 0 0 1 5.2 0v2.4" />
            </svg>
            <span className="cuenta">{count}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
