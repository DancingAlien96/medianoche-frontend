import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { RequerimientoForm } from "@/components/requerimiento-form";

interface Props {
  searchParams: Promise<{ enviado?: string }>;
}

export default async function RequerimientoPage({ searchParams }: Props) {
  const { enviado } = await searchParams;

  if (enviado) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 flex flex-col items-center gap-4">
        <CheckCircle2 className="w-12 h-12 text-success" />
        <h1 className="font-serif text-3xl">¡Requerimiento enviado!</h1>
        <p className="text-muted">
          Gracias. Revisaremos tu solicitud y te contactaremos por WhatsApp para
          ayudarte a encontrar tu pieza.
        </p>
        <Link
          href="/"
          className="mt-2 rounded-md bg-accent text-accent-foreground px-6 py-3 text-sm font-medium uppercase tracking-wide hover:bg-accent-hover transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-10 flex flex-col gap-6">
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-gold mb-2">
          Servicio a la medida
        </p>
        <h1 className="font-serif text-3xl md:text-4xl">
          Requerimiento especial
        </h1>
        <p className="text-muted mt-3">
          ¿Buscas un reloj o pieza específica? Cuéntanos qué necesitas y lo
          conseguimos para ti.
        </p>
      </div>
      <RequerimientoForm />
    </div>
  );
}
