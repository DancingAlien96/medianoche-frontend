import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/50233407786";

export function WhatsappCta() {
  return (
    <section className="relative left-1/2 -translate-x-1/2 w-screen bg-foreground text-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 flex flex-col items-center text-center gap-4">
        <h2 className="font-serif text-3xl md:text-4xl">
          ¿Buscas algo específico?
        </h2>
        <p className="opacity-80 max-w-md">
          Escríbenos por WhatsApp y te ayudamos a encontrar tu próxima pieza.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 rounded-md bg-[#25D366] text-white px-6 py-3 font-medium hover:opacity-90 transition-opacity"
        >
          <MessageCircle className="w-5 h-5" />
          Escríbenos por WhatsApp
        </a>
      </div>
    </section>
  );
}
