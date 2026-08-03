import { BadgeCheck, MessageCircle, ShieldCheck } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Autenticidad garantizada",
    text: "Cada pieza es seleccionada y verificada antes de ofrecerse.",
  },
  {
    icon: BadgeCheck,
    title: "Piezas originales",
    text: "Relojes, accesorios y perfumes auténticos.",
  },
  {
    icon: MessageCircle,
    title: "Atención personalizada",
    text: "Te acompañamos en cada compra por WhatsApp.",
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
            <p className="text-sm text-muted max-w-[30ch]">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
