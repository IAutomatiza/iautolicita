import SectionLabel from "./ui/SectionLabel";

const steps = [
  {
    n: "01",
    title: "Ingresas tu RUT",
    body: "Tu perfil se auto-genera leyendo tu historial completo en 7.2M adjudicaciones: top categorías ganadas, organismos compradores frecuentes, keywords detectados. En un click pre-cargas el motor matching.",
    duration: "1 click",
  },
  {
    n: "02",
    title: "Sincronizamos ChileCompra",
    body: "Pipeline en producción con 441K licitaciones, 6.4M OC y 7.2M adjudicaciones. 8 data marts precalculados con refresh nocturno + cada 2h para oportunidades vivas.",
    duration: "automático · 24/7",
  },
  {
    n: "03",
    title: "Motor matching multimodal puntúa",
    body: "Cada licitación nueva se clasifica y puntúa apenas se publica, y sus bases técnicas las lee la IA, que extrae requisitos y riesgos. Score combina 3 capas: keywords + códigos UNSPSC + sectores objetivo con pesos Alta/Media/Baja.",
    duration: "12 seg por base",
  },
  {
    n: "04",
    title: "Tu equipo decide y postula",
    body: "Notas TipTap tipificadas (decisión/riesgo/tarea/idea), asignación con notificaciones realtime, chat IA con 4 capas de contexto (datos + bases + notas + inteligencia del organismo). Sync automático al Kanban del CRM.",
    duration: "ciclo cerrado",
  },
];

export default function HowItWorks() {
  return (
    <section id="como" className="py-16 md:py-32 relative">
      <div className="container-edge">
        <div className="text-center mb-16 max-w-[680px] mx-auto">
          <div className="flex justify-center">
            <SectionLabel index="05" label="Cómo funciona" />
          </div>
          <h2 className="mt-6 font-display font-medium text-[40px] md:text-[60px] leading-[1] tracking-tightest text-cream-50">
            Cuatro pasos.{" "}
            <span className="font-serif italic font-normal text-amber-400 tracking-[-0.02em]">
              Tres en automático.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-12 max-w-[1100px] mx-auto">
          {steps.map((s) => (
            <article
              key={s.n}
              className="relative pt-8 border-t border-[var(--hairline-strong)] group"
            >
              <div className="absolute -top-px left-0 w-12 h-px bg-amber-400 group-hover:w-24 transition-all duration-500" />

              <div className="flex items-baseline gap-4 mb-3">
                <div className="num font-display font-medium text-[64px] leading-none text-amber-400">
                  {s.n}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-400">
                  {s.duration}
                </div>
              </div>

              <h3 className="font-display font-medium text-[28px] leading-[1.05] tracking-[-0.02em] text-cream-50 mt-4">
                {s.title}
              </h3>
              <p className="mt-4 font-sans text-[15px] leading-[1.6] text-cream-200 max-w-[460px]">
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
