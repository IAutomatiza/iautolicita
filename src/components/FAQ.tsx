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

import { FAQS as faqs } from "../lib/faqs";


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
              Si te queda alguna duda, escríbenos. Respondemos rápido y sin
              guion.
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
