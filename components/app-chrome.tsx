"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Editorial routes render full-bleed with their own baked-in bar + footer
 * (the black-and-white "Medianoche" redesign). Everything else keeps the
 * standard shop chrome (shared Navbar + centered main + Footer).
 */
const EDITORIAL = ["/", "/catalogo", "/nosotros"];

function isEditorial(pathname: string): boolean {
  return (
    EDITORIAL.includes(pathname) ||
    pathname.startsWith("/catalogo/") ||
    pathname.startsWith("/nosotros/") ||
    pathname.startsWith("/admin")
  );
}

export function AppChrome({
  navbar,
  footer,
  children,
}: {
  navbar: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();

  if (isEditorial(pathname)) {
    // Full-bleed: the editorial page supplies its own header/footer.
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
      {footer}
    </>
  );
}
