import SectionLabel from "./ui/SectionLabel";

const messages = [
  {
    role: "user",
    text: "¿Cuáles son los plazos críticos de esta licitación?",
  },
  {
    role: "ai",
    text: "Tres fechas clave: cierre de consultas el 12-may, apertura técnica el 17-may a las 15:00, y entrega de garantía de seriedad antes del 14-may. La licitación cierra el 16-may a las 17:00.",
  },
  {
    role: "user",
    text: "¿Qué acreditaciones técnicas exigen?",
  },
  {
    role: "ai",
    text: "ISO 9001:2015 vigente, registro en MOP categoría 2A o superior, mínimo 3 obras similares en últimos 5 años. Las bases admiten consorcios siempre que el líder cumpla individualmente con el registro MOP.",
  },
  {
    role: "user",
    text: "¿Vale la pena para nosotros postular?",
  },
];

export default function ChatIADemo() {
  return (
    <section id="chat" className="py-24 md:py-32 relative">
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[var(--hairline-strong)] to-transparent" />

      <div className="container-edge">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left: explanation */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <SectionLabel index="03" label="Chat IA documental" />

            <h2 className="mt-6 font-display font-medium text-[40px] md:text-[58px] leading-[0.98] tracking-tightest text-cream-50">
              No leas la base.{" "}
              <span className="serif-em text-amber-400">Conversa con ella.</span>
            </h2>

            <p className="mt-8 font-sans text-[16px] leading-[1.6] text-cream-200 max-w-[480px]">
              Cada licitación tiene su propio hilo IA con contexto de las bases técnicas. Pregunta en lenguaje natural sobre requisitos, plazos, criterios de evaluación, riesgos y estrategia de postulación.
            </p>

            <ul className="mt-10 space-y-3 font-mono text-[12px] text-cream-200">
              <li className="flex items-baseline gap-3 pb-2 border-b border-[var(--hairline)]">
                <span className="text-amber-400">→</span>
                <span>Persistencia por organización con RLS</span>
              </li>
              <li className="flex items-baseline gap-3 pb-2 border-b border-[var(--hairline)]">
                <span className="text-amber-400">→</span>
                <span>Tracking de tokens, cache y modelo usado</span>
              </li>
              <li className="flex items-baseline gap-3 pb-2 border-b border-[var(--hairline)]">
                <span className="text-amber-400">→</span>
                <span>36 conversaciones registradas en producción</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="text-amber-400">→</span>
                <span>Acceso al texto completo de las bases</span>
              </li>
            </ul>
          </div>

          {/* Right: chat mock */}
          <div className="lg:col-span-7 lg:pl-6">
            <div className="surface border border-[var(--hairline-strong)] relative">
              {/* Pinned licitación context bar */}
              <div className="border-b border-[var(--hairline)] px-5 py-3 flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-400">
                    Conversando con · Lic. ID 1057-887-LP25
                  </div>
                  <div className="font-display font-medium text-[16px] text-cream-50 mt-0.5">
                    Estudio de carga vial Ruta CH-225
                  </div>
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-amber-400 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  Score 84
                </div>
              </div>

              {/* Messages */}
              <div className="p-5 space-y-5">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] ${
                        m.role === "user"
                          ? "bg-brand-500/15 border border-brand-300/20 px-4 py-3"
                          : "border-l-2 border-amber-400 pl-4 pr-2 py-1"
                      }`}
                    >
                      {m.role === "ai" && (
                        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-amber-400 mb-1.5">
                          IAutoLicita · IA
                        </div>
                      )}
                      <p
                        className={`${
                          m.role === "ai"
                            ? "font-display font-medium text-[16px] leading-[1.5] text-cream-50"
                            : "font-sans text-[14px] leading-[1.5] text-cream-100"
                        }`}
                      >
                        {m.text}
                      </p>
                    </div>
                  </div>
                ))}

                {/* typing indicator for the last unanswered question */}
                <div className="flex justify-start pl-4">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-cream-400">
                    <span className="flex gap-1">
                      <span className="h-1 w-1 rounded-full bg-amber-400 animate-pulse-soft" />
                      <span className="h-1 w-1 rounded-full bg-amber-400 animate-pulse-soft [animation-delay:0.2s]" />
                      <span className="h-1 w-1 rounded-full bg-amber-400 animate-pulse-soft [animation-delay:0.4s]" />
                    </span>
                    Analizando bases técnicas
                  </div>
                </div>
              </div>

              {/* Input area mock */}
              <div className="border-t border-[var(--hairline)] px-5 py-3 flex items-center gap-3">
                <div className="flex-1 font-sans text-[13px] text-cream-400">
                  Pregunta sobre esta licitación…
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream-400">
                  ⌘ ↵
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
