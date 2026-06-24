import {
  Radar,
  ScrollText,
  Target,
  Users,
  CircleArrowRight,
} from "lucide-react";
import SectionLabel from "./ui/SectionLabel";

const items = [
  {
    icon: Radar,
    title: "Sincronización con la API oficial",
    body: "13 workflows ingestan a diario licitaciones, órdenes de compra, adjudicaciones y organismos. Captura completa de campos, no subset.",
    tag: "01 · ingesta",
    metric: "13",
    metricLabel: "workflows · 24/7",
    visual: "sync",
  },
  {
    icon: ScrollText,
    title: "Lectura IA de bases técnicas",
    body: "Cada licitación pasa por extracción HTML + análisis IA. Resumen estructurado, requisitos, plazos y montos en minutos.",
    tag: "02 · enrichment",
    metric: "6.061",
    metricLabel: "bases enriquecidas",
    visual: "doc",
  },
  {
    icon: Target,
    title: "Matching automático por perfil",
    body: "20+ atributos de empresa (servicios, regiones, keywords, acreditaciones). Score por licitación, asignación automática multi-org.",
    tag: "03 · routing",
    metric: "20+",
    metricLabel: "atributos perfil",
    visual: "score",
  },
  {
    icon: Users,
    title: "Gestión colaborativa nivel CRM",
    body: "Notas tipificadas, hilos, tareas con due-date, menciones, reacciones. Tu equipo opera en una sola UI, no en planillas paralelas.",
    tag: "04 · workflow",
    metric: "5",
    metricLabel: "tipos de nota",
    visual: "kanban",
  },
  {
    icon: CircleArrowRight,
    title: "Ciclo cerrado post-adjudicación",
    body: "OCs vinculadas a la licitación origen. Calificación al proveedor, comportamiento de pago y relación comercial recurrente.",
    tag: "05 · outcome",
    metric: "40+",
    metricLabel: "campos por OC",
    visual: "cycle",
  },
];

const VisualPreview = ({ kind }: { kind: string }) => {
  if (kind === "sync") {
    return (
      <div className="space-y-1.5">
        {["Licitaciones · diario", "OCs · diario", "Adjudicaciones · diario", "Organismos · semanal"].map((s, i) => (
          <div key={i} className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.16em]">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse-soft" style={{ animationDelay: `${i * 0.2}s` }} />
            <span className="text-cream-200 truncate">{s}</span>
            <span className="text-amber-400 ml-auto">OK</span>
          </div>
        ))}
      </div>
    );
  }
  if (kind === "doc") {
    return (
      <div className="space-y-1.5">
        <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-cream-400">extracción · pdf</div>
        {[100, 88, 92, 76, 95].map((w, i) => (
          <div key={i} className="h-1 bg-ink-700/60 overflow-hidden">
            <div className="h-full bg-amber-400/70" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    );
  }
  if (kind === "score") {
    const dist = [12, 24, 38, 56, 74, 88, 64, 42, 22];
    return (
      <div>
        <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-cream-400 mb-2">distribución score</div>
        <div className="flex items-end gap-1 h-12">
          {dist.map((v, i) => (
            <div
              key={i}
              className={`flex-1 ${i >= 6 ? "bg-amber-400" : "bg-cream-300/30"}`}
              style={{ height: `${v}%` }}
            />
          ))}
        </div>
      </div>
    );
  }
  if (kind === "kanban") {
    return (
      <div className="grid grid-cols-3 gap-1.5">
        {[["Decisión", 3], ["Riesgo", 2], ["Tarea", 5]].map(([l, n], i) => (
          <div key={i} className="border border-[var(--hairline-strong)] p-1.5">
            <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-cream-400">{l}</div>
            <div className="num font-display font-medium text-[18px] text-cream-50 leading-none mt-1">{n}</div>
          </div>
        ))}
      </div>
    );
  }
  if (kind === "cycle") {
    return (
      <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em]">
        {["Lic.", "Match", "Postula", "Adj.", "OC"].map((s, i) => (
          <div key={i} className="flex items-center">
            <span className={i === 4 ? "text-amber-400" : "text-cream-300"}>{s}</span>
            {i < 4 && <span className="mx-1.5 text-cream-400">→</span>}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Capabilities() {
  return (
    <section id="capacidades" className="py-24 md:py-32 relative">
      <div className="container-edge">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <SectionLabel index="01" label="Capacidades" />
            <h2 className="mt-6 font-display font-medium text-[40px] md:text-[56px] leading-[1] tracking-tightest text-cream-50">
              No es una alerta.{" "}
              <span className="serif-em text-amber-400">
                Es el ciclo completo.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p className="font-sans text-[16px] leading-[1.55] text-cream-200 max-w-[520px]">
              Cinco capacidades operando en producción, una sobre la otra. Desde la ingesta hasta el seguimiento del pago, sin saltar a otra herramienta.
            </p>
          </div>
        </div>

        <div className="border-t border-[var(--hairline-strong)]">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <article
                key={i}
                className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-10 md:py-12 border-b border-[var(--hairline)] hover:bg-amber-400/[0.018] transition-colors"
              >
                <div className="md:col-span-2 flex md:block items-center gap-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-400">
                    {it.tag}
                  </div>
                  <div className="md:mt-4 h-12 w-12 grid place-items-center border border-[var(--hairline-strong)] group-hover:border-amber-400 transition-colors">
                    <Icon className="h-5 w-5 text-cream-100 group-hover:text-amber-400 transition-colors" strokeWidth={1.4} />
                  </div>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display font-medium text-[28px] md:text-[36px] leading-[1.02] tracking-[-0.02em] text-cream-50">
                    {it.title}
                  </h3>
                  <p className="mt-4 font-sans text-[14.5px] leading-[1.55] text-cream-200">
                    {it.body}
                  </p>
                </div>
                <div className="md:col-span-3 md:pl-4 flex md:block items-center gap-4">
                  <div className="num font-display font-medium text-[60px] md:text-[80px] leading-none tracking-tightest text-amber-400">
                    {it.metric}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-400 mt-2">
                    {it.metricLabel}
                  </div>
                </div>
                <div className="md:col-span-3 md:border-l border-[var(--hairline)] md:pl-6 self-center">
                  <VisualPreview kind={it.visual} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
