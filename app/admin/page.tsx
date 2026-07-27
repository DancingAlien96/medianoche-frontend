import { Pencil, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DeleteProductButton } from "@/components/admin/delete-product-button";
import { getProducts } from "@/lib/api";
import { formatPrice } from "@/lib/money";

export default async function AdminProductsPage() {
  const { items, total } = await getProducts({ limit: 60 });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Productos ({total})</h2>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent-hover transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo producto
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-muted py-12 text-center">
          Aún no hay productos. Crea el primero.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-border rounded-xl border border-border overflow-hidden">
          {items.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-3 bg-surface"
            >
              <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-surface-2 shrink-0">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{product.name}</p>
                <p className="text-sm text-muted">
                  {product.category.name} · {formatPrice(product.priceCents)} ·
                  stock {product.stock}
                </p>
              </div>
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="flex items-center gap-1.5 text-sm rounded-lg border border-border px-3 py-1.5 hover:border-accent transition-colors"
              >
                <Pencil className="w-4 h-4" />
                <span className="hidden sm:inline">Editar</span>
              </Link>
              <DeleteProductButton id={product.id} name={product.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
