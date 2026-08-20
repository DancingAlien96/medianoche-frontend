import Link from "next/link";
import {
  AdminProductList,
  type AdminProductRow,
} from "@/components/admin/admin-product-list";
import { getCategories, getProducts } from "@/lib/api";

export default async function AdminProductsPage() {
  const [{ items, total }, categories] = await Promise.all([
    getProducts({ limit: 200 }),
    getCategories(),
  ]);

  const rows: AdminProductRow[] = items.map((p) => ({
    id: p.id,
    name: p.name,
    imageUrl: p.imageUrl,
    categoryId: p.categoryId,
    categoryName: p.category.name,
    priceCents: p.priceCents,
    previousPriceCents: p.previousPriceCents,
    stock: p.stock,
  }));

  return (
    <section>
      <div className="tope">
        <h2>Productos ({total})</h2>
        <Link className="btn btn-solido" href="/admin/products/new">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M7 1v12M1 7h12" />
          </svg>
          Nuevo producto
        </Link>
      </div>

      <AdminProductList
        products={rows}
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
      />
    </section>
  );
}
