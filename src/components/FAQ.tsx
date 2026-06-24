import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "¿Cómo se conecta IAutoLicita con ChileCompra?",
    a: "Pipeline en producción con cobertura 100% Jun 2024 → hoy: 441K licitaciones, 7.2M adjudicaciones y 6.4M órdenes de compra. Crons nocturnos refrescan los 8 data marts precalculados; las oportunidades vivas se actualizan cada 2 horas. Triggers en Postgres normalizan y explotan automáticamente los ítems de cada licitación.",
  },
  {
    q: "¿Necesito instalar algo?",
    a: "No. IAutoLicita es 100% SaaS, accedes desde el navegador. Si ya tienes RUT con historial en ChileCompra, tu perfil se auto-genera leyendo tus adjudicaciones pasadas: top categorías ganadas, organismos compradores frecuentes y keywords detectados. En 1 click queda pre-cargado el motor matching.",
  },
  {
    q: "¿Qué tienen ustedes que LicitaLAB y los demás no?",
    a: "Cuatro cosas que nadie más tiene en Chile: (1) precio real pagado por ítem vía OC con p25/p50/p75 — sabes a qué precio se está cerrando cada producto/servicio; (2) flujo CLP región compradora → región proveedora (matriz 16×16) para detectar dónde se queda el gasto; (3) inteligencia del organismo: 4 KPIs históricos + top 5 proveedores + insights automáticos (>30% desiertas = ⚠️ bases mal armadas); (4) plataforma multi-módulo: MP + CRM + cobranza + facturación + agenda + WhatsApp con agente IA cross-módulo.",
  },
  {
    q: "¿Se pueden operar varias razones sociales bajo la misma cuenta?",
    a: "Sí, multi-organización es nativo. Cada razón social tiene su propio perfil de matching, equipo, notas, oportunidades y chat IA — con datos aislados a nivel de base de datos vía Row Level Security de Postgres. Una sola cuenta, varios proyectos.",
  },
  {
    q: "¿Cómo funciona el chat IA con las bases técnicas?",
    a: "El chat por licitación tiene acceso a 4 capas de contexto: datos públicos de la licitación + texto completo de las bases (PDFs/DOCs parseados) + notas del equipo + inteligencia del organismo comprador. Puede responder preguntas como '¿este organismo paga rápido?' con cifras reales del histórico. Powered by gpt-4o-mini, retención de conversación 90 días.",
  },
  {
    q: "¿Y las herramientas del equipo? ¿Cómo gestionan oportunidades?",
    a: "Notas TipTap con tipos (decisión/riesgo/tarea/idea/general), hilos, reacciones (👍 ❤️ ✅ ⚠️ 🔥), pin/unpin, menciones @usuario con notificaciones realtime. Las tareas se sincronizan automáticamente al Kanban del CRM. Resumen IA de notas con 1 click. Pipeline configurable: Detectada → Evaluando → Postulando → Adjudicada → Descartada.",
  },
  {
    q: "¿Qué incluye el plan? ¿Hay precios públicos?",
    a: "Trabajamos con plan único multi-organización. Incluye sincronización completa, enriquecimiento IA ilimitado, todos los módulos (matching multimodal, chat IA, OCs, inteligencia del organismo, gestión por equipo, análisis de mercado) y soporte directo. Para pricing y demo personalizada, contáctanos por WhatsApp.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-32 relative bg-ink-900/40 border-y border-[var(--hairline)]">
      <div className="container-edge">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-amber-400">
              FAQ
            </span>
            <h2 className="mt-5 font-display font-medium text-[40px] md:text-[52px] leading-[1.02] tracking-[-0.04em] text-cream-50">
              Preguntas que{" "}
              <span className="font-serif italic font-normal text-amber-400 tracking-[-0.02em]">
                recibimos
              </span>
              .
            </h2>
            <p className="mt-5 font-sans text-[15.5px] leading-[1.5] text-cream-200 max-w-[400px]">
              Si te queda alguna duda, escríbenos por WhatsApp. Respondemos rápido y sin guion.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="border-t border-[var(--hairline)]">
              {faqs.map((f, i) => {
                const open = openIdx === i;
                return (
                  <div key={i} className="border-b border-[var(--hairline)]">
                    <button
                      type="button"
                      onClick={() => setOpenIdx(open ? null : i)}
                      className="w-full flex items-center justify-between gap-6 py-5 md:py-6 text-left group"
                      aria-expanded={open}
                    >
                      <span className="font-display font-medium text-[18px] md:text-[20px] tracking-[-0.02em] text-cream-50 group-hover:text-amber-400 transition-colors">
                        {f.q}
                      </span>
                      <span className={`h-8 w-8 grid place-items-center rounded-full border border-[var(--hairline-strong)] flex-shrink-0 transition-all ${open ? "bg-amber-400 border-amber-400 rotate-45" : ""}`}>
                        <Plus
                          className={`h-4 w-4 ${open ? "text-ink-950" : "text-cream-100"}`}
                          strokeWidth={1.8}
                        />
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ${
                        open ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="font-sans text-[15px] leading-[1.6] text-cream-200 max-w-[640px]">
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
