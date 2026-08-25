import { useEffect, useState } from "react";
import Eyebrow from "./ui/Eyebrow";

/* ════════════════════════════════════════════════════════════
   FAQ con el acordeón de Ali Imam (accordion-05): las preguntas
   van numeradas y en mayúsculas a gran tamaño, apagadas cuando
   están cerradas y encendidas en el acento al abrirse — sin
   chevron ni subrayado.

   El original monta sobre Radix; acá se mantiene el acordeón
   propio (un useState y la transición grid-rows que ya usaba la
   sección), así no entra @radix-ui/react-accordion por un
   componente de una sola instancia. Los colores son los del
   sitio: crema sobre el fondo oscuro y el acento de la marca.
═══════════════════════════════════════════════════════════════ */

const faqs: { q: string; a: string; ancla?: string }[] = [
  {
    q: "¿De dónde salen los datos?",
    a: "De ChileCompra, completo: 441 mil licitaciones, 7,2 millones de adjudicaciones y 6,4 millones de órdenes de compra. Todo se actualiza solo, varias veces al día — cuando entras, ya está al día.",
  },
  {
    q: "¿Necesito instalar algo?",
    a: "Nada. Entras desde el navegador y listo. Con tu RUT basta: leemos lo que ya has ganado y tu perfil queda armado en un clic — qué vendes, dónde ganas y quién te compra.",
  },
  {
    q: "¿Qué los hace distintos?",
    a: "Que sabemos cuánto pagó el Estado de verdad por lo que tú vendes, no el presupuesto que dicen las bases. Con eso Lici te sugiere el precio para ganar, se lee las bases enteras y te muestra la página exacta donde dice cada cosa.",
  },
  {
    q: "¿Sirve para varias empresas?",
    a: "Sí. Manejas todos tus RUT desde una sola cuenta, cada uno con su equipo, sus alertas y su información separada. Sin pagar una cuenta por empresa.",
  },
  {
    q: "¿Y si no entiendo de licitaciones?",
    a: "Mejor todavía: le preguntas a Lici en tu idioma — “¿me conviene?”, “¿cuánto ofertar?” — y responde en simple, con las cifras al lado. La experiencia la pone ella.",
  },
  {
    q: "¿Se me puede pasar un cierre?",
    a: "Para eso está. Cada fecha, documento y riesgo te llega con días de anticipación por WhatsApp, correo o donde ya trabaje tu equipo. Nadie tiene que acordarse de entrar a revisar.",
  },
  {
    // El enlace "Planes" de la nav apunta acá: es lo único que
    // el sitio dice hoy sobre planes y precios.
    ancla: "planes",
    q: "¿Cuánto cuesta?",
    a: "Un plan único, con todo incluido y sin límite de uso: todas tus empresas, todos los módulos y soporte directo con nosotros. Escríbenos por WhatsApp y te contamos el precio en dos minutos.",
  },
];

export default function FAQ() {
  const [abierta, setAbierta] = useState<number | null>(0);

  // Al llegar por un ancla (hoy "#planes"), esa pregunta se abre
  // sola: si no, el visitante aterriza en un acordeón cerrado.
  useEffect(() => {
    const abrirPorHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const i = faqs.findIndex((f) => f.ancla === hash);
      if (i !== -1) setAbierta(i);
    };
    abrirPorHash();
    window.addEventListener("hashchange", abrirPorHash);
    return () => window.removeEventListener("hashchange", abrirPorHash);
  }, []);

  return (
    <section
      id="faq"
      className="scroll-mt-28 py-16 md:py-28 relative bg-ink-900/40 border-y border-[var(--hairline)]"
    >
      <div className="container-edge">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-4">
            <Eyebrow align="left">Preguntas frecuentes</Eyebrow>
            <h2 className="mt-5 font-display font-medium text-[40px] md:text-[52px] leading-[1.02] tracking-[-0.04em] text-cream-50">
              Preguntas que{" "}
              <span className="serif-em text-amber-400">recibimos</span>.
            </h2>
            <p className="mt-5 font-sans text-[15.5px] leading-[1.5] text-cream-200 max-w-[400px]">
              Si te queda alguna duda, escríbenos por WhatsApp. Respondemos
              rápido y sin guion.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-[var(--hairline)]">
              {faqs.map((f, i) => {
                const activa = abierta === i;
                return (
                  <div
                    key={f.q}
                    id={f.ancla}
                    className="border-b border-[var(--hairline)] scroll-mt-28"
                  >
                    <button
                      type="button"
                      onClick={() => setAbierta(activa ? null : i)}
                      aria-expanded={activa}
                      className="group w-full py-5 md:py-7 text-left"
                    >
                      <div className="flex items-start gap-4 md:gap-6">
                        <span
                          className={`mt-2 md:mt-3 shrink-0 font-mono text-[11px] tabular-nums transition-colors duration-300 ${
                            activa ? "text-amber-400" : "text-cream-50/50 group-hover:text-cream-50/75"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3
                          className={`font-display font-medium uppercase leading-[0.95] tracking-[-0.03em] text-[26px] md:text-[42px] transition-colors duration-300 ${
                            activa
                              ? "text-amber-400"
                              : "text-cream-50/50 group-hover:text-cream-50/80"
                          }`}
                        >
                          {f.q}
                        </h3>
                      </div>
                    </button>

                    <div
                      className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        activa ? "grid-rows-[1fr] pb-7" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p
                          className={`font-sans text-[15px] leading-[1.65] text-cream-200 max-w-[640px] pl-[calc(1rem+2ch)] md:pl-[calc(1.5rem+2ch)] transition-all duration-500 ${
                            activa ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                          }`}
                        >
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
