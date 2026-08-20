import Image from "next/image";
import Link from "next/link";
import { CatalogFilters } from "@/components/editorial/catalog-filters";
import { EditorialAddToCart } from "@/components/editorial/editorial-add-to-cart";
import { EditorialBar } from "@/components/editorial/editorial-bar";
import { EditorialFooter } from "@/components/editorial/editorial-footer";
import { getFacets, getProducts } from "@/lib/api";
import { getCategories } from "@/lib/api";
import { formatPrice } from "@/lib/money";
import { priceRangeByKey } from "@/lib/product-facets";

const PER_PAGE = 12;

function csv(v?: string): string[] {
  return v ? v.split(",").map((s) => s.trim()).filter(Boolean) : [];
}

interface CatalogPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    brand?: string;
    gender?: string;
    movement?: string;
    price?: string;
    page?: string;
  }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const sp = await searchParams;
  const { q, category, brand, gender, movement, price, page } = sp;
  const currentPage = Number(page) > 0 ? Number(page) : 1;
  const range = priceRangeByKey(price);

  const [categories, facets, products] = await Promise.all([
    getCategories(),
    getFacets(),
    getProducts({
      q,
      category,
      brand,
      gender,
      movement,
      minPriceCents: range ? range.min : undefined,
      maxPriceCents: range && range.max != null ? range.max : undefined,
      page: 1,
      limit: currentPage * PER_PAGE,
    }),
  ]);

  const items = products.items;
  const total = products.total;
  const hasMore = items.length < total;

  const selected = {
    q,
    category,
    brands: csv(brand),
    genders: csv(gender),
    movements: csv(movement),
    price,
  };

  const nextPageHref = () => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (brand) params.set("brand", brand);
    if (gender) params.set("gender", gender);
    if (movement) params.set("movement", movement);
    if (price) params.set("price", price);
    params.set("page", String(currentPage + 1));
    return `/catalogo?${params.toString()}`;
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
        <div className="dist-cat">
          <CatalogFilters
            categories={categories.map((c) => ({
              slug: c.slug,
              name: c.name,
              count: c._count?.products,
            }))}
            brands={facets.brands}
            selected={selected}
          />

          <div>
            {items.length === 0 ? (
              <div className="rejilla">
                <div className="vacio">
                  <h3>Sin resultados</h3>
                  <p>
                    Ninguna pieza coincide con esos filtros. Puede quitar alguno
                    o pedirnos la referencia directamente.
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
                  const rebaja =
                    p.previousPriceCents != null &&
                    p.previousPriceCents > p.priceCents;
                  return (
                    <article
                      key={p.id}
                      className={`pieza${agotado ? " sin-stock" : ""}`}
                    >
                      <Link href={`/products/${p.id}`} className="lienzo">
                        {agotado ? (
                          <span className="etiqueta agotado">Agotado</span>
                        ) : rebaja ? (
                          <span className="etiqueta">Rebaja</span>
                        ) : null}
                        <Image
                          src={p.imageUrl}
                          alt={p.name}
                          width={400}
                          height={400}
                          sizes="(max-width:520px) 100vw, (max-width:1040px) 50vw, 33vw"
                        />
                      </Link>
                      <div className="ref">
                        {p.brand ?? `Ref. ${p.id.slice(-6).toUpperCase()}`}
                      </div>
                      <h2>
                        <Link href={`/products/${p.id}`}>{p.name}</Link>
                      </h2>
                      <div className="meta">{p.category.name}</div>
                      <div className="pie-pieza">
                        <span className="precio">
                          {rebaja && (
                            <s
                              style={{
                                color: "var(--gris)",
                                fontSize: 11,
                                marginRight: 6,
                              }}
                            >
                              {formatPrice(p.previousPriceCents!)}
                            </s>
                          )}
                          {formatPrice(p.priceCents)}
                        </span>
                        <EditorialAddToCart
                          productId={p.id}
                          disabled={agotado}
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {hasMore && (
              <div className="mas">
                <Link className="btn" href={nextPageHref()}>
                  Cargar más piezas{" "}
                  <span className="flecha" aria-hidden="true">↓</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

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
