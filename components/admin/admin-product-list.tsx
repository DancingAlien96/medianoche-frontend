"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { deleteProductAction } from "@/lib/admin-actions";
import { formatPrice } from "@/lib/money";

export interface AdminProductRow {
  id: string;
  name: string;
  imageUrl: string;
  categoryId: string;
  categoryName: string;
  priceCents: number;
  previousPriceCents: number | null;
  stock: number;
}

export function AdminProductList({
  products,
  categories,
}: {
  products: AdminProductRow[];
  categories: { id: string; name: string }[];
}) {
  const [cats, setCats] = useState<string[]>([]);
  const [avail, setAvail] = useState<string[]>([]);
  const [orden, setOrden] = useState("recientes");
  const [pending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggle = (
    list: string[],
    set: (v: string[]) => void,
    value: string,
  ) => set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const list = useMemo(() => {
    let out = products.filter((p) => {
      if (cats.length && !cats.includes(p.categoryId)) return false;
      if (avail.length) {
        const estado = p.stock > 0 ? "disponible" : "agotado";
        if (!avail.includes(estado)) return false;
      }
      return true;
    });
    out = [...out];
    if (orden === "nombre") out.sort((a, b) => a.name.localeCompare(b.name, "es"));
    if (orden === "precio-asc") out.sort((a, b) => a.priceCents - b.priceCents);
    if (orden === "precio-desc") out.sort((a, b) => b.priceCents - a.priceCents);
    if (orden === "stock") out.sort((a, b) => b.stock - a.stock);
    return out;
  }, [products, cats, avail, orden]);

  const remove = (id: string, name: string) => {
    if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return;
    setDeletingId(id);
    startTransition(async () => {
      await deleteProductAction(id);
      setDeletingId(null);
    });
  };

  const countByCat = (id: string) =>
    products.filter((p) => p.categoryId === id).length;

  return (
    <div className="distribucion">
      <aside className="filtros">
        <div className="grupo">
          <h3>Categoría</h3>
          {categories.map((c) => (
            <label className="opcion" key={c.id}>
              <input
                type="checkbox"
                checked={cats.includes(c.id)}
                onChange={() => toggle(cats, setCats, c.id)}
              />
              <span className="caja" />
              {c.name}
              <span className="n">{countByCat(c.id)}</span>
            </label>
          ))}
        </div>
        <div className="grupo">
          <h3>Disponibilidad</h3>
          <label className="opcion">
            <input
              type="checkbox"
              checked={avail.includes("disponible")}
              onChange={() => toggle(avail, setAvail, "disponible")}
            />
            <span className="caja" />
            Disponible
          </label>
          <label className="opcion">
            <input
              type="checkbox"
              checked={avail.includes("agotado")}
              onChange={() => toggle(avail, setAvail, "agotado")}
            />
            <span className="caja" />
            Agotado
          </label>
        </div>
        <div className="grupo">
          <h3>Ordenar por</h3>
          <select
            className="selector-orden"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="recientes">Más recientes</option>
            <option value="nombre">Nombre A – Z</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="stock">Existencia</option>
          </select>
        </div>
        <button
          type="button"
          className="limpiar-filtros"
          onClick={() => {
            setCats([]);
            setAvail([]);
            setOrden("recientes");
          }}
        >
          Limpiar filtros
        </button>
      </aside>

      <div>
        {list.length === 0 ? (
          <div className="vacio-lista">
            <h3>Sin productos que coincidan</h3>
            <p>Ajuste los filtros o cree un producto nuevo.</p>
            <Link className="btn btn-linea" href="/admin/products/new">
              Nuevo producto
            </Link>
          </div>
        ) : (
          <div className="lista">
            {list.map((p) => {
              const disponible = p.stock > 0;
              const rebaja =
                p.previousPriceCents != null &&
                p.previousPriceCents > p.priceCents;
              return (
                <div className="fila" key={p.id}>
                  <div className="miniatura">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.imageUrl} alt="" />
                  </div>
                  <div className="info-p">
                    <div className="nombre">{p.name}</div>
                    <div className="meta">
                      {p.categoryName} · <span>{p.stock} en existencia</span>
                    </div>
                  </div>
                  <span
                    className={`estado-pill ${disponible ? "disponible" : "agotado"}`}
                  >
                    {disponible ? "Disponible" : "Agotado"}
                  </span>
                  <span className="precio">
                    {rebaja && (
                      <s style={{ color: "var(--gris)", fontSize: 11, marginRight: 6 }}>
                        {formatPrice(p.previousPriceCents!)}
                      </s>
                    )}
                    {formatPrice(p.priceCents)}
                  </span>
                  <div className="acciones">
                    <Link className="icon-btn" href={`/admin/products/${p.id}/edit`}>
                      Editar
                    </Link>
                    <button
                      type="button"
                      className="icon-btn borrar"
                      disabled={pending && deletingId === p.id}
                      onClick={() => remove(p.id, p.name)}
                    >
                      {pending && deletingId === p.id ? "Eliminando…" : "Eliminar"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
