"use client";

import Link from "next/link";
import { useActionState, useRef, useState } from "react";
import { uploadImageAction, type AdminState } from "@/lib/admin-actions";
import type { Category, Product } from "@/lib/types";

interface Props {
  categories: Category[];
  action: (state: AdminState, formData: FormData) => Promise<AdminState>;
  submitLabel: string;
  product?: Product;
}

function initialImages(product?: Product): string[] {
  if (product?.images?.length) return product.images;
  if (product?.imageUrl) return [product.imageUrl];
  return [];
}

export function ProductForm({
  categories,
  action,
  submitLabel,
  product,
}: Props) {
  const [state, formAction, pending] = useActionState(action, {});
  const [images, setImages] = useState<string[]>(initialImages(product));
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;
    setUploading(true);
    setUploadError(null);
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadImageAction(formData);
      if (result.error) {
        setUploadError(result.error);
        break;
      }
      if (result.url) setImages((prev) => [...prev, result.url as string]);
    }
    setUploading(false);
    event.target.value = "";
  }

  const removeImage = (index: number) =>
    setImages((prev) => prev.filter((_, i) => i !== index));

  const makeCover = (index: number) =>
    setImages((prev) => {
      const next = [...prev];
      const [picked] = next.splice(index, 1);
      return [picked, ...next];
    });

  return (
    <form action={formAction} className="vista-form">
      {product && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="images" value={JSON.stringify(images)} />

      {state.error && <p className="aviso-error">{state.error}</p>}

      {/* Fotografías */}
      <div className="bloque">
        <h3>Fotografías</h3>
        <div className="foto-zona">
          {images.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className={`foto-item${index === 0 ? " es-principal" : ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" />
              {index !== 0 && (
                <button
                  type="button"
                  className="hacer-principal"
                  title="Hacer principal"
                  aria-label="Hacer principal"
                  onClick={() => makeCover(index)}
                />
              )}
              <button
                type="button"
                className="quitar"
                aria-label="Quitar foto"
                onClick={() => removeImage(index)}
              >
                ✕
              </button>
              {index === 0 && <span className="principal-marca">Principal</span>}
            </div>
          ))}
          <button
            type="button"
            className="foto-add"
            onClick={() => fileRef.current?.click()}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
              <path d="M10 3v14M3 10h14" />
            </svg>
            <span>Agregar foto</span>
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          style={{ display: "none" }}
        />
        <p className="ayuda-fotos">
          La primera foto es la portada del catálogo. Haga clic en cualquier otra
          para hacerla principal.
          {uploading && " Subiendo imágenes…"}
          {uploadError && ` ${uploadError}`}
        </p>
      </div>

      {/* Datos generales */}
      <div className="bloque">
        <h3>Datos generales</h3>
        <div className="rejilla-campos">
          <div className="campo ancho">
            <label htmlFor="campoNombre">Nombre del producto</label>
            <input
              id="campoNombre"
              type="text"
              name="name"
              required
              minLength={2}
              defaultValue={product?.name}
              placeholder="Ej. Reloj Cronógrafo Fenmore (Metal)"
            />
          </div>

          <div className="campo">
            <label htmlFor="campoMarca">Marca</label>
            <input
              id="campoMarca"
              type="text"
              name="brand"
              defaultValue={product?.brand ?? ""}
              placeholder="Ej. Armani Exchange"
            />
          </div>
          <div className="campo">
            <label htmlFor="campoCategoria">Categoría</label>
            <select
              id="campoCategoria"
              name="categoryId"
              required
              defaultValue={product?.categoryId ?? ""}
            >
              <option value="" disabled>
                Seleccione…
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="campo">
            <label htmlFor="campoGenero">Para quién</label>
            <select
              id="campoGenero"
              name="gender"
              defaultValue={product?.gender ?? ""}
            >
              <option value="">— Sin especificar —</option>
              <option value="MALE">Para él</option>
              <option value="FEMALE">Para ella</option>
              <option value="UNISEX">Unisex</option>
            </select>
          </div>
          <div className="campo">
            <label htmlFor="campoMovimiento">Movimiento</label>
            <select
              id="campoMovimiento"
              name="movement"
              defaultValue={product?.movement ?? ""}
            >
              <option value="">— Sin especificar —</option>
              <option value="AUTOMATIC">Automático</option>
              <option value="QUARTZ">Clásico de cuarzo</option>
            </select>
          </div>

          <div className="campo">
            <label htmlFor="campoStock">Existencia</label>
            <input
              id="campoStock"
              type="number"
              name="stock"
              min={0}
              step={1}
              required
              defaultValue={product ? product.stock : 1}
            />
          </div>
          <div className="campo">
            <label htmlFor="campoPrecio">Precio</label>
            <div className="prefijo-precio">
              <input
                id="campoPrecio"
                type="number"
                name="price"
                min={0}
                step="0.01"
                required
                defaultValue={product ? product.priceCents / 100 : ""}
                placeholder="0"
              />
            </div>
          </div>
          <div className="campo">
            <label htmlFor="campoPrecioAntes">
              Precio anterior{" "}
              <span style={{ textTransform: "none" }}>(opcional, rebaja)</span>
            </label>
            <div className="prefijo-precio">
              <input
                id="campoPrecioAntes"
                type="number"
                name="previousPrice"
                min={0}
                step="0.01"
                defaultValue={
                  product?.previousPriceCents
                    ? product.previousPriceCents / 100
                    : ""
                }
                placeholder="0"
              />
            </div>
          </div>

          <div className="campo ancho">
            <label htmlFor="campoDescripcion">Descripción</label>
            <textarea
              id="campoDescripcion"
              name="description"
              required
              defaultValue={product?.description}
              placeholder="Descripción breve para la ficha del producto…"
            />
          </div>
        </div>
      </div>

      <div className="form-acciones">
        <Link className="btn btn-fantasma" href="/admin">
          Cancelar
        </Link>
        <div className="der">
          <button
            type="submit"
            className="btn btn-solido"
            disabled={pending || uploading || images.length === 0}
          >
            {pending ? "Guardando…" : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
