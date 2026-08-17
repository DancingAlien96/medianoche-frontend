import { ShieldCheck, Sparkles, Truck } from "lucide-react";

const items = [
  {
    icon: Truck,
    title: "Envíos a todo Guatemala",
    text: "Recibe tu compra donde estés, con opciones de envío rápidas y seguras.",
  },
  {
    icon: ShieldCheck,
    title: "Compra fácil y segura",
    text: "Realiza tu pedido de forma sencilla y recibe acompañamiento durante todo el proceso.",
  },
  {
    icon: Sparkles,
    title: "Detalles que marcan la diferencia",
    text: "Seleccionamos piezas que combinan estilo, calidad y personalidad para cada ocasión.",
  },
];

export function TrustBand() {
  return (
    <section className="border-y border-border">
      <div className="grid sm:grid-cols-3 gap-8 py-12">
        {items.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="flex flex-col items-center text-center gap-2 px-4"
          >
            <Icon className="w-7 h-7 text-foreground" strokeWidth={1.4} />
            <h3 className="text-sm uppercase tracking-[0.14em] font-semibold">
              {title}
            </h3>
            <p className="text-sm text-muted max-w-[32ch]">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
