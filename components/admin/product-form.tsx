"use client";

import { Star, X } from "lucide-react";
import { useActionState, useState } from "react";
import { WatchSpinner } from "@/components/ui/watch-spinner";
import { uploadImageAction, type AdminState } from "@/lib/admin-actions";
import type { Category, Product } from "@/lib/types";

interface Props {
  categories: Category[];
  action: (state: AdminState, formData: FormData) => Promise<AdminState>;
  submitLabel: string;
  product?: Product;
}

const inputClass =
  "h-11 rounded-lg border border-border bg-surface-2 px-3 outline-none focus:border-accent transition-colors";

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
      if (result.url) {
        setImages((prev) => [...prev, result.url as string]);
      }
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
    <form action={formAction} className="flex flex-col gap-4">
      {product && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="images" value={JSON.stringify(images)} />

      {state.error && (
        <p className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
          {state.error}
        </p>
      )}

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-muted">Nombre</span>
        <input
          name="name"
          required
          minLength={2}
          defaultValue={product?.name}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-muted">Descripción</span>
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={product?.description}
          className="rounded-lg border border-border bg-surface-2 px-3 py-2 outline-none focus:border-accent transition-colors resize-y"
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Precio (Q)</span>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={product ? product.priceCents / 100 : ""}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Stock</span>
          <input
            name="stock"
            type="number"
            min="0"
            step="1"
            required
            defaultValue={product ? product.stock : 0}
            className={inputClass}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-muted">Categoría</span>
        <select
          name="categoryId"
          required
          defaultValue={product?.categoryId ?? ""}
          className={inputClass}
        >
          <option value="" disabled>
            Selecciona una categoría
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <div className="flex flex-col gap-2 text-sm">
        <span className="text-muted">
          Imágenes{" "}
          <span className="text-xs">(la primera es la portada)</span>
        </span>

        {images.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {images.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="relative w-20 h-20 rounded-lg overflow-hidden border border-border bg-surface-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt=""
                  className="w-full h-full object-cover"
                />
                {index === 0 ? (
                  <span className="absolute bottom-0 inset-x-0 bg-accent text-accent-foreground text-[10px] text-center py-0.5">
                    Portada
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => makeCover(index)}
                    title="Hacer portada"
                    aria-label="Hacer portada"
                    className="absolute bottom-0.5 left-0.5 rounded bg-background/80 p-1 hover:text-accent"
                  >
                    <Star className="w-3 h-3" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  title="Quitar"
                  aria-label="Quitar imagen"
                  className="absolute top-0.5 right-0.5 rounded-full bg-background/80 p-0.5 hover:text-danger"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          className="text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-surface-2 file:px-3 file:py-2 file:text-foreground hover:file:bg-border"
        />
        {uploading && <p className="text-muted">Subiendo imágenes...</p>}
        {uploadError && <p className="text-danger">{uploadError}</p>}
      </div>

      <button
        type="submit"
        disabled={pending || uploading || images.length === 0}
        className="h-11 flex items-center justify-center gap-2 rounded-lg bg-accent font-medium text-accent-foreground hover:bg-accent-hover disabled:opacity-50 transition-colors"
      >
        {pending && <WatchSpinner className="w-4 h-4" />}
        {pending ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}
