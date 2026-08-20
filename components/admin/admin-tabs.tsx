"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admin", label: "Productos", match: "/admin" },
  { href: "/admin/categorias", label: "Categorías", match: "/admin/categorias" },
  { href: "/admin/pedidos", label: "Pedidos", match: "/admin/pedidos" },
  {
    href: "/admin/requerimientos",
    label: "Requerimientos",
    match: "/admin/requerimientos",
  },
];

export function AdminTabs() {
  const pathname = usePathname();

  const isActive = (match: string) => {
    if (match === "/admin") {
      // Products list + the product form routes.
      return pathname === "/admin" || pathname.startsWith("/admin/products");
    }
    return pathname === match || pathname.startsWith(match + "/");
  };

  return (
    <div className="pestanas" role="tablist">
      {TABS.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          className={`pestana ${isActive(t.match) ? "activa" : ""}`}
          role="tab"
          aria-selected={isActive(t.match)}
        >
          {t.label}
        </Link>
      ))}
    </div>
  );
}
