import { AtSign, Clock, MapPin, MessageCircle, Moon } from "lucide-react";
import Link from "next/link";

const WHATSAPP_URL = "https://wa.me/50233407786";
const INSTAGRAM_URL = "https://instagram.com/medianochegt";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Moon
              className="w-6 h-6 text-accent"
              fill="currentColor"
              strokeWidth={1.5}
            />
            <span className="font-serif text-xl tracking-tight">Medianoche</span>
          </Link>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">
            Autenticidad · Confianza · Elegancia
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-4">
            Navegación
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm text-muted">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/#catalogo"
                className="hover:text-foreground transition-colors"
              >
                Colección
              </Link>
            </li>
            <li>
              <a
                href="/anatomia/index.html"
                className="hover:text-foreground transition-colors"
              >
                Anatomía
              </a>
            </li>
            <li>
              <Link
                href="/pedidos"
                className="hover:text-foreground transition-colors"
              >
                Mis pedidos
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-4">
            Contacto
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-muted">
            <li className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-gold shrink-0" />
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                +502 3340 7786
              </a>
            </li>
            <li className="flex items-center gap-2">
              <AtSign className="w-4 h-4 text-gold shrink-0" />
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                @Medianochegt
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold shrink-0" />
              Ciudad de Guatemala
            </li>
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span>
                Lun–Vie: 9:00–18:00
                <br />
                Sáb: 9:00–13:00
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between text-xs text-muted">
          <span>© 2026 Medianoche. Todos los derechos reservados.</span>
          <Link href="/admin" className="hover:text-foreground transition-colors">
            Acceso interno
          </Link>
        </div>
      </div>
    </footer>
  );
}
