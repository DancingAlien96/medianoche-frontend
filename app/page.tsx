import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CategoryFilter } from "@/components/category-filter";
import { MediaNocheLogo } from "@/components/media-noche-logo";
import { Pagination } from "@/components/pagination";
import { ProductCard } from "@/components/product-card";
import { TrustBand } from "@/components/trust-band";
import { WhatsappCta } from "@/components/whatsapp-cta";
import { getCategories, getProducts } from "@/lib/api";

const WHATSAPP_URL = "https://wa.me/50233407786";

interface HomePageProps {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { q, category, page } = await searchParams;
  const currentPage = Number(page) > 0 ? Number(page) : 1;

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({ q, category, page: currentPage, limit: 12 }),
  ]);

  const showHero = !q && !category && currentPage === 1;

  return (
    <div className="flex flex-col">
      {showHero && (
        <>
          {/* Full-width hero — animated brand logo */}
          <div className="pb-14 md:pb-24">
            <h1 className="sr-only">
              Medianoche — Relojes, accesorios y perfumes
            </h1>
            <div className="relative left-1/2 -translate-x-1/2 w-screen -mt-8 overflow-hidden">
              <MediaNocheLogo className="w-full" loopSecs={11} spinTurns={1} />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-8">
              <a
                href="#catalogo"
                className="rounded-md bg-accent text-accent-foreground px-8 py-3.5 text-sm font-medium uppercase tracking-wide hover:bg-accent-hover transition-colors"
              >
                Ver colección
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-foreground/25 px-8 py-3.5 text-sm font-medium uppercase tracking-wide hover:border-foreground transition-colors"
              >
                Contáctanos
              </a>
            </div>
          </div>

          <TrustBand />
        </>
      )}

      <section id="catalogo" className="pt-12 flex flex-col gap-8 scroll-mt-20">
        <div className="text-center">
          <h2 className="font-serif text-2xl md:text-3xl uppercase tracking-[0.14em]">
            {q ? `Resultados para “${q}”` : "Piezas disponibles"}
          </h2>
          <p className="text-muted mt-2 text-sm">
            {products.total} {products.total === 1 ? "pieza" : "piezas"}
          </p>
        </div>

        <CategoryFilter categories={categories} active={category} q={q} />

        {products.items.length === 0 ? (
          <p className="text-muted py-16 text-center">
            No se encontraron piezas.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {products.items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <Pagination
          page={products.page}
          totalPages={products.totalPages}
          q={q}
          category={category}
        />
      </section>

      {showHero && (
        <>
          <section className="text-center py-20 max-w-2xl mx-auto flex flex-col items-center gap-6">
            <p className="text-lg leading-relaxed text-muted">
              En Medianoche seleccionamos relojes originales, accesorios con
              carácter y detalles que complementan tu estilo con elegancia y
              autenticidad.
            </p>
            <a
              href="/anatomia/index.html"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.14em] font-medium hover:text-accent transition-colors"
            >
              Descubre la anatomía de un reloj
              <ArrowRight className="w-4 h-4" />
            </a>
          </section>

          <WhatsappCta />
        </>
      )}
    </div>
  );
}
