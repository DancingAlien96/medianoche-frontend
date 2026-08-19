import Link from "next/link";
import { EditorialBar } from "@/components/editorial/editorial-bar";
import { EditorialFooter } from "@/components/editorial/editorial-footer";
import { LiveDial } from "@/components/editorial/live-dial";
import { Reveal } from "@/components/editorial/reveal";
import { getCategories, getProducts } from "@/lib/api";

const WHATSAPP = "50233407786";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP}`;
const CONTACT_EMAIL = "hola@medianoche.com.gt";
const INSTAGRAM = "@medianoche.gt";

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({ limit: 1 }),
  ]);

  const total = products.total;
  const dos = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="ed">
      <EditorialBar />

      {/* ===================== HERO ===================== */}
      <section className="hero">
        <div className="hero-in">
          <div className="hero-izq">
            <span className="eyebrow">Relojería · Guatemala</span>
            <h1 className="titular">
              El tiempo,
              <br />
              <em>a su medida</em>
            </h1>
            <p className="bajada">
              Selección curada de relojes automáticos, de cuarzo y de colección.
              Piezas verificadas, entregadas con su documentación completa.
            </p>
          </div>

          <LiveDial />

          <div className="hero-der">
            <span className="eyebrow">Desde 2021</span>
            <p className="bajada" style={{ marginTop: 14 }}>
              Cada pieza pasa por revisión de autenticidad, estado de marcha y
              hermeticidad antes de salir de nuestras manos.
            </p>
            <div className="acciones">
              <Link className="btn btn-solido" href="/catalogo">
                Ver catálogo
                <span className="flecha" aria-hidden="true">→</span>
              </Link>
              <Link className="btn btn-linea" href="/requerimiento">
                Requerimiento especial
                <span className="flecha" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== GARANTÍAS ===================== */}
      <section className="tira">
        <div className="tira-in">
          <div className="tira-item">
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <path d="M1.8 6.2h11v9.4h-11z" />
              <path d="M12.8 9.4h4.2l3.2 3.1v3.1h-7.4z" />
              <circle cx="5.6" cy="17" r="1.8" />
              <circle cx="16.2" cy="17" r="1.8" />
            </svg>
            <div>
              <h4>Envíos a todo Guatemala</h4>
              <p>Entrega asegurada en 24 a 72 horas, con número de guía.</p>
            </div>
          </div>
          <div className="tira-item">
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <path d="M11 1.8 19 5v5.6c0 4.6-3.2 8-8 9.6-4.8-1.6-8-5-8-9.6V5z" />
              <path d="m7.6 10.8 2.4 2.4 4.4-4.6" />
            </svg>
            <div>
              <h4>Compra verificada</h4>
              <p>Garantía escrita de autenticidad en cada pieza.</p>
            </div>
          </div>
          <div className="tira-item">
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <circle cx="11" cy="11" r="6.4" />
              <path d="M11 7.4V11l2.4 1.6" />
              <path d="M8 4.6 8.5 1.8h5l.5 2.8M8 17.4l.5 2.8h5l.5-2.8" />
            </svg>
            <div>
              <h4>Servicio posterior</h4>
              <p>Ajuste de eslabones, cambio de batería y mantenimiento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CATÁLOGO (categorías reales) ===================== */}
      <section className="seccion" id="catalogo">
        <div className="cabecera rev">
          <h2>Catálogo</h2>
          <Link href="/catalogo">
            Ver todo ({total} {total === 1 ? "pieza" : "piezas"}) →
          </Link>
        </div>

        <div className="rev">
          {categories.length === 0 ? (
            <Link className="fila" href="/catalogo">
              <span className="num">01</span>
              <span className="nombre">Ver todas las piezas</span>
              <span className="desc">Explora el catálogo completo.</span>
              <span className="ir" aria-hidden="true">→</span>
            </Link>
          ) : (
            categories.map((cat, i) => {
              const n = cat._count?.products;
              return (
                <Link
                  key={cat.id}
                  className="fila"
                  href={`/catalogo?category=${encodeURIComponent(cat.slug)}`}
                >
                  <span className="num">{dos(i + 1)}</span>
                  <span className="nombre">{cat.name}</span>
                  <span className="desc">
                    {typeof n === "number"
                      ? `${n} ${n === 1 ? "pieza disponible" : "piezas disponibles"}`
                      : "Ver piezas de esta categoría."}
                  </span>
                  <span className="ir" aria-hidden="true">→</span>
                </Link>
              );
            })
          )}
        </div>
      </section>

      {/* ===================== INFORMACIÓN ===================== */}
      <section className="info" id="informacion">
        <div className="info-in">
          <div className="rev">
            <span className="eyebrow">Quiénes somos</span>
            <h2>Empezamos con un solo reloj y una idea sencilla.</h2>
            <p>
              Medianoche nació como un proyecto personal en Guatemala: conseguir
              relojes buenos, verificados y bien presentados, sin el sobreprecio
              ni la distancia de una tienda tradicional.
            </p>
            <p>
              Hoy trabajamos por encargo y con inventario propio. Si busca una
              referencia específica que no aparece en el catálogo, la localizamos
              y le confirmamos precio y tiempo de entrega antes de cualquier
              compromiso.
            </p>
            <p style={{ marginTop: 6 }}>
              <Link
                href="/nosotros"
                style={{ borderBottom: "1px solid var(--negro)", paddingBottom: 2 }}
              >
                Conozca nuestra historia →
              </Link>
            </p>
          </div>

          <dl className="datos rev">
            <div className="dato">
              <dt>WhatsApp</dt>
              <dd>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  +502 3340 7786
                </a>
              </dd>
            </div>
            <div className="dato">
              <dt>Correo</dt>
              <dd>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </dd>
            </div>
            <div className="dato">
              <dt>Instagram</dt>
              <dd>
                <a href="#">{INSTAGRAM}</a>
              </dd>
            </div>
            <div className="dato">
              <dt>Atención</dt>
              <dd>Lunes a sábado, 9:00 – 19:00</dd>
            </div>
            <div className="dato">
              <dt>Entregas</dt>
              <dd>Ciudad de Guatemala y envíos a todo el país</dd>
            </div>
            <div className="dato">
              <dt>Pagos</dt>
              <dd>Tarjeta, transferencia y contra entrega</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ===================== CIERRE ===================== */}
      <section className="cierre">
        <span className="eyebrow">Catálogo completo</span>
        <h2>
          {total} {total === 1 ? "pieza esperando" : "piezas esperando"} su turno
        </h2>
        <div className="acciones">
          <Link className="btn btn-solido" href="/catalogo">
            Entrar al catálogo <span className="flecha" aria-hidden="true">→</span>
          </Link>
          <a
            className="btn btn-linea"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Escribirnos <span className="flecha" aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <EditorialFooter />
      <Reveal />
    </div>
  );
}
