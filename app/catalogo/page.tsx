import Image from "next/image";
import Link from "next/link";
import { EditorialAddToCart } from "@/components/editorial/editorial-add-to-cart";
import { EditorialBar } from "@/components/editorial/editorial-bar";
import { EditorialFooter } from "@/components/editorial/editorial-footer";
import { getCategories, getProducts } from "@/lib/api";
import { formatPrice } from "@/lib/money";

const PER_PAGE = 12;
const WHATSAPP_URL = "https://wa.me/50233407786";

interface CatalogPageProps {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const { q, category, page } = await searchParams;
  const currentPage = Number(page) > 0 ? Number(page) : 1;

  const [categories, products] = await Promise.all([
    getCategories(),
    // Accumulate results so "Cargar más" grows the grid.
    getProducts({ q, category, page: 1, limit: currentPage * PER_PAGE }),
  ]);

  const items = products.items;
  const total = products.total;
  const hasMore = items.length < total;

  const buildHref = (params: Record<string, string | undefined>) => {
    const sp = new URLSearchParams();
    if (params.q) sp.set("q", params.q);
    if (params.category) sp.set("category", params.category);
    if (params.page && params.page !== "1") sp.set("page", params.page);
    const qs = sp.toString();
    return `/catalogo${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="ed">
      <EditorialBar active="catalogo" defaultQuery={q} />

      <div className="hoja">
        <div className="miga">
          <Link href="/">Inicio</Link> &nbsp;/&nbsp; Catálogo
        </div>
        <div className="titulo-zona">
          <div>
            <h1>{q ? `“${q}”` : "Catálogo"}</h1>
            <p>
              Cada pieza se revisa en autenticidad, marcha y hermeticidad antes
              de publicarse. Lo que ve aquí está disponible hoy.
            </p>
          </div>
          <span className="conteo">
            {total} {total === 1 ? "pieza" : "piezas"}
          </span>
        </div>
      </div>

      <div className="cuerpo-cat">
        {/* Filtros por categoría (reales) */}
        <div className="filtros-cat">
          <Link
            href={buildHref({ q })}
            className={`filtro-chip ${!category ? "activo" : ""}`}
          >
            Todas
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={buildHref({ q, category: cat.slug })}
              className={`filtro-chip ${category === cat.slug ? "activo" : ""}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Cuadrícula */}
        {items.length === 0 ? (
          <div className="rejilla">
            <div className="vacio">
              <h3>Sin resultados</h3>
              <p>
                Ninguna pieza coincide con esa búsqueda. Puede pedirnos la
                referencia directamente.
              </p>
              <Link className="btn" href="/requerimiento">
                Hacer un requerimiento{" "}
                <span className="flecha" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="rejilla">
            {items.map((p) => {
              const agotado = p.stock <= 0;
              return (
                <article
                  key={p.id}
                  className={`pieza${agotado ? " sin-stock" : ""}`}
                >
                  <Link href={`/products/${p.id}`} className="lienzo">
                    {agotado && <span className="etiqueta agotado">Agotado</span>}
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      width={400}
                      height={400}
                      sizes="(max-width:520px) 100vw, (max-width:1040px) 50vw, 33vw"
                    />
                  </Link>
                  <div className="ref">Ref. {p.id.slice(-6).toUpperCase()}</div>
                  <h2>
                    <Link href={`/products/${p.id}`}>{p.name}</Link>
                  </h2>
                  <div className="meta">{p.category.name}</div>
                  <div className="pie-pieza">
                    <span className="precio">{formatPrice(p.priceCents)}</span>
                    <EditorialAddToCart productId={p.id} disabled={agotado} />
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {hasMore && (
          <div className="mas">
            <Link
              className="btn"
              href={buildHref({
                q,
                category,
                page: String(currentPage + 1),
              })}
            >
              Cargar más piezas{" "}
              <span className="flecha" aria-hidden="true">↓</span>
            </Link>
          </div>
        )}
      </div>

      {/* ===================== ENCARGO ===================== */}
      <section className="encargo">
        <span className="eyebrow">¿No encuentra lo que busca?</span>
        <h2>Localizamos la referencia por usted</h2>
        <p>
          Díganos marca y modelo. Le confirmamos precio, estado y tiempo de
          entrega antes de cualquier compromiso.
        </p>
        <Link className="btn btn-claro" href="/requerimiento">
          Hacer un requerimiento{" "}
          <span className="flecha" aria-hidden="true">→</span>
        </Link>
      </section>

      <EditorialFooter />
    </div>
  );
}
