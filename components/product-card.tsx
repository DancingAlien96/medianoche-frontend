import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/money";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col rounded-xl border border-border bg-surface overflow-hidden hover:border-accent transition-colors"
    >
      <div className="relative aspect-square bg-surface-2 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col gap-1">
        <p className="text-xs uppercase tracking-wide text-muted">
          {product.category.name}
        </p>
        <h3 className="font-medium leading-snug line-clamp-2">{product.name}</h3>
        <p className="mt-1 font-semibold text-accent">
          {formatPrice(product.priceCents)}
        </p>
      </div>
    </Link>
  );
}
