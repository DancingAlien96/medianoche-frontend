import Link from "next/link";
import type { Category } from "@/lib/types";

interface Props {
  categories: Category[];
  active?: string;
  q?: string;
}

export function CategoryFilter({ categories, active, q }: Props) {
  const makeHref = (slug?: string) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (slug) params.set("category", slug);
    const qs = params.toString();
    return qs ? `/?${qs}` : "/";
  };

  const chipClass = (isActive: boolean) =>
    `rounded-full px-4 py-1.5 text-sm border transition-colors ${
      isActive
        ? "bg-accent text-accent-foreground border-accent"
        : "border-border text-muted hover:text-foreground hover:border-accent"
    }`;

  return (
    <div className="flex flex-wrap gap-2">
      <Link href={makeHref()} className={chipClass(!active)}>
        Todos
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={makeHref(category.slug)}
          className={chipClass(active === category.slug)}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
