import Link from "next/link";
import { redirect } from "next/navigation";
import "./admin.css";
import { AdminTabs } from "@/components/admin/admin-tabs";
import { logoutAction } from "@/lib/auth-actions";
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
    <div className="adm">
      {/* Barra superior */}
      <header className="barra">
        <div className="barra-in">
          <Link href="/" className="marca" aria-label="Medianoche, inicio">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M14.5 13.2A6.2 6.2 0 0 1 6.8 5.5a6.5 6.5 0 1 0 7.7 7.7Z"
                fill="currentColor"
              />
            </svg>
            Medianoche
          </Link>
          <span className="pastilla">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <circle cx="9" cy="6" r="3.2" />
              <path d="M2.8 15c1-3.2 4-4.6 6.2-4.6S15.2 11.8 16.2 15" />
            </svg>
            {user.name.split(" ")[0]}
          </span>
          <form action={logoutAction}>
            <button type="submit" className="salir" aria-label="Cerrar sesión">
              <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                <path d="M7 15.5H4a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1h3" />
                <path d="M12 12.5 16 9l-4-3.5" />
                <path d="M16 9H7" />
              </svg>
              Salir
            </button>
          </form>
        </div>
      </header>

      {/* Sub-barra + pestañas */}
      <div className="subbarra">
        <div className="subbarra-in">
          <div>
            <h1>Panel de administración</h1>
            <AdminTabs />
          </div>
          <Link href="/" className="volver">
            ← Ver tienda
          </Link>
        </div>
      </div>

      <div className="envoltorio">{children}</div>
    </div>
  );
}
