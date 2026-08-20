"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  GENDER_OPTIONS,
  MOVEMENT_OPTIONS,
  PRICE_RANGES,
} from "@/lib/product-facets";

export interface CatalogSelection {
  q?: string;
  category?: string;
  brands: string[];
  genders: string[];
  movements: string[];
  price?: string;
}

interface Props {
  categories: { slug: string; name: string; count?: number }[];
  brands: string[];
  selected: CatalogSelection;
}

export function CatalogFilters({ categories, brands, selected }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const push = (next: CatalogSelection) => {
    const sp = new URLSearchParams();
    if (next.q) sp.set("q", next.q);
    if (next.category) sp.set("category", next.category);
    if (next.brands.length) sp.set("brand", next.brands.join(","));
    if (next.genders.length) sp.set("gender", next.genders.join(","));
    if (next.movements.length) sp.set("movement", next.movements.join(","));
    if (next.price) sp.set("price", next.price);
    const qs = sp.toString();
    router.push(`/catalogo${qs ? `?${qs}` : ""}`);
  };

  const toggle = (list: string[], value: string) =>
    list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];

  const base: CatalogSelection = {
    q: selected.q,
    category: selected.category,
    brands: selected.brands,
    genders: selected.genders,
    movements: selected.movements,
    price: selected.price,
  };

  const anySelected =
    !!selected.category ||
    selected.brands.length > 0 ||
    selected.genders.length > 0 ||
    selected.movements.length > 0 ||
    !!selected.price;

  return (
    <aside className={`filtros-side ${open ? "abierto" : ""}`} aria-label="Filtros">
      <button
        type="button"
        className="abrir-filtros"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        Filtrar
        <span aria-hidden="true">{open ? "–" : "+"}</span>
      </button>

      <div className="filtros-body">
        <div className="grupo">
          <h3>Categoría</h3>
          {categories.map((c) => (
            <label className="opcion" key={c.slug}>
              <input
                type="checkbox"
                checked={selected.category === c.slug}
                onChange={() =>
                  push({
                    ...base,
                    category:
                      selected.category === c.slug ? undefined : c.slug,
                  })
                }
              />
              <span className="caja" />
              {c.name}
              {typeof c.count === "number" && (
                <span className="n">{c.count}</span>
              )}
            </label>
          ))}
        </div>

        {brands.length > 0 && (
          <div className="grupo">
            <h3>Marca</h3>
            {brands.map((b) => (
              <label className="opcion" key={b}>
                <input
                  type="checkbox"
                  checked={selected.brands.includes(b)}
                  onChange={() =>
                    push({ ...base, brands: toggle(selected.brands, b) })
                  }
                />
                <span className="caja" />
                {b}
              </label>
            ))}
          </div>
        )}

        <div className="grupo">
          <h3>Para quién</h3>
          {GENDER_OPTIONS.map((o) => (
            <label className="opcion" key={o.value}>
              <input
                type="checkbox"
                checked={selected.genders.includes(o.value)}
                onChange={() =>
                  push({ ...base, genders: toggle(selected.genders, o.value) })
                }
              />
              <span className="caja" />
              {o.label}
            </label>
          ))}
        </div>

        <div className="grupo">
          <h3>Movimiento</h3>
          {MOVEMENT_OPTIONS.map((o) => (
            <label className="opcion" key={o.value}>
              <input
                type="checkbox"
                checked={selected.movements.includes(o.value)}
                onChange={() =>
                  push({
                    ...base,
                    movements: toggle(selected.movements, o.value),
                  })
                }
              />
              <span className="caja" />
              {o.label}
            </label>
          ))}
        </div>

        <div className="grupo">
          <h3>Precio</h3>
          {PRICE_RANGES.map((r) => (
            <label className="opcion" key={r.key}>
              <input
                type="checkbox"
                checked={selected.price === r.key}
                onChange={() =>
                  push({
                    ...base,
                    price: selected.price === r.key ? undefined : r.key,
                  })
                }
              />
              <span className="caja" />
              {r.label}
            </label>
          ))}
        </div>

        {anySelected && (
          <button
            type="button"
            className="limpiar"
            onClick={() => push({ q: selected.q, brands: [], genders: [], movements: [] })}
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </aside>
  );
}
