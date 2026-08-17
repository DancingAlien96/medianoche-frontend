import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/");

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm border-b border-border pb-4">
        <Link href="/admin" className="font-semibold">
          Panel de administración
        </Link>
        <Link href="/admin" className="text-muted hover:text-foreground">
          Productos
        </Link>
        <Link
          href="/admin/categorias"
          className="text-muted hover:text-foreground"
        >
          Categorías
        </Link>
        <Link href="/admin/pedidos" className="text-muted hover:text-foreground">
          Pedidos
        </Link>
        <Link
          href="/admin/requerimientos"
          className="text-muted hover:text-foreground"
        >
          Requerimientos
        </Link>
        <Link href="/" className="text-muted hover:text-foreground ml-auto">
          ← Ver tienda
        </Link>
      </nav>
      {children}
    </div>
  );
}
