import Link from "next/link";

interface Props {
  page: number;
  totalPages: number;
  q?: string;
  category?: string;
}

export function Pagination({ page, totalPages, q, category }: Props) {
  if (totalPages <= 1) return null;

  const href = (target: number) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (target > 1) params.set("page", String(target));
    const qs = params.toString();
    return qs ? `/?${qs}` : "/";
  };

  const base = "rounded-lg px-4 py-2 border border-border text-sm";

  return (
    <div className="flex items-center justify-center gap-3">
      {page > 1 ? (
        <Link href={href(page - 1)} className={`${base} hover:border-accent`}>
          Anterior
        </Link>
      ) : (
        <span className={`${base} opacity-40`}>Anterior</span>
      )}
      <span className="text-sm text-muted">
        Página {page} de {totalPages}
      </span>
      {page < totalPages ? (
        <Link href={href(page + 1)} className={`${base} hover:border-accent`}>
          Siguiente
        </Link>
      ) : (
        <span className={`${base} opacity-40`}>Siguiente</span>
      )}
    </div>
  );
}
