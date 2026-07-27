import { CategoryFilter } from "@/components/category-filter";
import { Pagination } from "@/components/pagination";
import { ProductCard } from "@/components/product-card";
import { getCategories, getProducts } from "@/lib/api";

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

  // Show the cinematic hero only on the clean landing (not while searching/filtering).
  const showHero = !q && !category && currentPage === 1;

  return (
    <div className="flex flex-col gap-8">
      {showHero && (
        <div className="relative left-1/2 -translate-x-1/2 w-screen -mt-8 overflow-hidden">
          <iframe
            src="/hero/index.html"
            title="Medianoche"
            className="block w-full border-0 aspect-[3/2] min-h-[70svh] max-h-[100svh]"
          />
        </div>
      )}

      <section>
        <h1 className="font-serif text-3xl">
          {q ? `Resultados para “${q}”` : "Catálogo"}
        </h1>
        <p className="text-muted mt-1">
          {products.total} {products.total === 1 ? "producto" : "productos"}
        </p>
      </section>

      <CategoryFilter categories={categories} active={category} q={q} />

      {products.items.length === 0 ? (
        <p className="text-muted py-16 text-center">
          No se encontraron productos.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
    </div>
  );
}
