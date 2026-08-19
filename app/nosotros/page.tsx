import Link from "next/link";
import { EditorialBar } from "@/components/editorial/editorial-bar";
import { EditorialFooter } from "@/components/editorial/editorial-footer";
import { Reveal } from "@/components/editorial/reveal";

const WHATSAPP_URL = "https://wa.me/50233407786";
const CONTACT_EMAIL = "hola@medianoche.com.gt";
const INSTAGRAM = "@medianoche.gt";

export const metadata = {
  title: "Nosotros — Medianoche",
};

export default function NosotrosPage() {
  return (
    <div className="ed">
      <EditorialBar active="nosotros" />

      {/* ===================== APERTURA ===================== */}
      <div className="hoja">
        <div className="miga">
          <Link href="/">Inicio</Link> &nbsp;/&nbsp; Nosotros
        </div>
        <div className="apertura">
          <h1>
            Una pareja
            <br />
            <em>soñadora</em>
          </h1>
          <p className="frase">
            Medianoche es una tienda guatemalteca de relojes. Dedicada a
            encontrar tu pieza ideal.
          </p>
        </div>
      </div>

      {/* ===================== RELATO ===================== */}
      <section className="seccion">
        <div className="relato rev">
          <div className="marginal">
            El origen
            <br />
            Guatemala
            <br />
            Desde 2021
          </div>
          <div className="cuerpo">
            <p className="primera">
              Todo comenzó con la intención de comprar un reloj para mi novio, un
              hombre encantado por los relojes. Al ver tantos modelos, estilos,
              marcas, formas y colores, terminé enamorándome yo también, junto
              con él, de los relojes. Terminamos importándolo nosotros mismos,
              aprendiendo a verificarlo, y descubriendo que la parte difícil no
              era conseguir el reloj: era confiar en quien te lo vende.
            </p>
            <p>
              De ahí salió Medianoche. Al principio fueron dos o tres piezas al
              mes, vendidas por mensaje directo a conocidos que confiaron en
              nosotros. El nombre viene de la hora en que se armaba todo esto:
              después del trabajo, con la mesa llena de herramientas, una taza de
              café y muchas ideas.
            </p>
            <p>
              Como las tres manecillas del reloj, este es un proyecto de tres:
              una pareja enamorada entre sí y apasionada por los relojes, y Dios
              en el centro de nuestros sueños. Por las noches soñábamos con un
              negocio propio y con una forma de crear. Medianoche es la única
              hora en que las tres manecillas coinciden exactamente en el mismo
              punto, que es una manera bonita de decir que las cosas encajan
              cuando uno les dedica el tiempo.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== CITA ===================== */}
      <figure className="cita">
        <div className="cita-in">
          <blockquote>
            Un reloj no se compra por la hora. Se compra porque va a estar en su
            muñeca todos los días durante años.
          </blockquote>
          <figcaption>
            Medianoche
            <br />
            Ciudad de Guatemala
          </figcaption>
        </div>
      </figure>

      {/* ===================== LÍNEA DE TIEMPO ===================== */}
      <section className="seccion">
        <div className="rotulo">
          <span className="num">01</span>
          <h2>El camino</h2>
        </div>
        <p className="entrada">Cuatro momentos que cambiaron cómo trabajamos.</p>

        <div className="linea rev">
          <div className="hito">
            <div className="anio">2021</div>
            <h3>La primera pieza</h3>
            <p>
              Un automático importado para uso propio, revisado en la mesa de la
              cocina. De ahí salieron los primeros tres encargos de amigos.
            </p>
          </div>
          <div className="hito">
            <div className="anio">2022</div>
            <h3>Garantía por escrito</h3>
            <p>
              Empezamos a entregar cada reloj con garantía firmada, para que la
              confianza no dependiera solo de nuestra palabra.
            </p>
          </div>
          <div className="hito">
            <div className="anio">2023</div>
            <h3>Envíos a todo el país</h3>
            <p>
              Dejamos de entregar solo en la capital. Empaque rígido, seguro
              incluido y número de guía en cada envío departamental.
            </p>
          </div>
          <div className="hito">
            <div className="anio">2024</div>
            <h3>Requerimientos especiales</h3>
            <p>
              Empezamos a buscar referencias puntuales por encargo, con precio y
              tiempo confirmados antes de que el cliente comprometa nada.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== CÓMO TRABAJAMOS ===================== */}
      <section className="revision">
        <div className="seccion">
          <div className="rotulo">
            <span className="num">02</span>
            <h2>Cómo trabajamos</h2>
          </div>
          <p className="entrada">
            Dos cosas no negociamos: que cada reloj tenga garantía real, y que
            valga la pena por ser distinto a lo que ya conoce.
          </p>

          <div className="puntos rev">
            <div className="punto">
              <span className="clave">01</span>
              <h3>Garantía</h3>
              <p>
                Cada reloj sale con garantía firmada, no solo con la promesa de
                un mensaje. Si algo falla dentro del plazo, respondemos nosotros.
              </p>
            </div>
            <div className="punto">
              <span className="clave">02</span>
              <h3>Piezas únicas y especiales</h3>
              <p>
                Elegimos modelos, estilos y marcas que no están en cualquier
                vitrina. Cada pieza se selecciona a mano, no por catálogo de
                mayorista.
              </p>
            </div>
            <div className="punto">
              <span className="clave">03</span>
              <h3>Atención personal</h3>
              <p>Un equipo honesto y confiable que te atiende, empaca y da seguimiento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CIFRAS ===================== */}
      <section className="seccion">
        <div className="rotulo">
          <span className="num">03</span>
          <h2>En números</h2>
        </div>
        <p className="entrada">Al día de hoy.</p>
        <div className="cifras rev">
          <div className="cifra">
            <div className="n">+100</div>
            <div className="r">
              Modelos
              <br />
              vendidos
            </div>
          </div>
          <div className="cifra">
            <div className="n">10</div>
            <div className="r">
              Departamentos
              <br />
              con envío
            </div>
          </div>
          <div className="cifra">
            <div className="n">8 h</div>
            <div className="r">
              Respuesta
              <br />
              promedio
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CONTACTO ===================== */}
      <section className="contacto" id="contacto">
        <div className="contacto-in">
          <div className="rev">
            <span className="eyebrow">Hablemos</span>
            <h2>Escríbanos y le contestamos nosotros</h2>
            <p className="intro">
              Si busca una referencia específica o quiere fotos adicionales de una
              pieza del catálogo, mándenos un mensaje. No hay guion de ventas del
              otro lado.
            </p>
            <a
              className="btn btn-claro"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Escribir por WhatsApp{" "}
              <span className="flecha" aria-hidden="true">→</span>
            </a>
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
      <section className="cierre-claro">
        <span className="eyebrow">Lo que hay disponible hoy</span>
        <h2>Vea el catálogo</h2>
        <p>Cada pieza publicada ya pasó la revisión.</p>
        <Link className="btn" href="/catalogo">
          Entrar al catálogo <span className="flecha" aria-hidden="true">→</span>
        </Link>
      </section>

      <EditorialFooter />
      <Reveal />
    </div>
  );
}
