import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductGallery } from "@/components/product-gallery";
import { getProduct } from "@/lib/api";
import { formatPrice } from "@/lib/money";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/catalogo"
        className="text-sm text-muted hover:text-foreground w-fit"
      >
        ← Volver al catálogo
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <ProductGallery
          images={product.images?.length ? product.images : [product.imageUrl]}
          alt={product.name}
        />

        <div className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-wide text-muted">
            {product.category.name}
          </p>
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-2xl font-bold text-accent">
            {formatPrice(product.priceCents)}
          </p>
          <p className="text-muted leading-relaxed">{product.description}</p>
          <p className="text-sm text-muted">
            {product.stock > 0 ? `${product.stock} disponibles` : "Agotado"}
          </p>
          <div className="pt-2">
            <AddToCartButton
              productId={product.id}
              disabled={product.stock <= 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
