"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const list = images.length > 0 ? images : [];
  const [active, setActive] = useState(0);
  const current = list[active] ?? list[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square rounded-xl overflow-hidden border border-border bg-surface-2">
        {current && (
          <Image
            src={current}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        )}
      </div>

      {list.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {list.map((img, i) => (
            <button
              key={`${img}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={`relative w-16 h-16 rounded-lg overflow-hidden border transition-colors ${
                i === active ? "border-accent" : "border-border hover:border-muted"
              }`}
            >
              <Image src={img} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
