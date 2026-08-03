import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/money";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group flex flex-col">
      <div className="relative aspect-square bg-surface-2 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
        />
      </div>
      <div className="pt-4 flex flex-col gap-1">
        <p className="text-[11px] uppercase tracking-[0.18em] text-gold">
          {product.category.name}
        </p>
        <h3 className="font-serif text-lg leading-snug line-clamp-2 group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <p className="mt-0.5 text-sm text-muted">
          {formatPrice(product.priceCents)}
        </p>
      </div>
    </Link>
  );
}
