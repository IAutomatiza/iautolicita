import { useEffect, useState } from "react";

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
    q: "¿Cómo se conecta con ChileCompra?",
    a: "Pipeline en producción: 441K licitaciones, 7.2M adjudicaciones y 6.4M órdenes de compra. Crons nocturnos refrescan los 8 data marts precalculados; las oportunidades vivas se actualizan cada 2 horas. Triggers en Postgres normalizan y explotan automáticamente los ítems de cada licitación.",
  },
  {
    q: "¿Necesito instalar algo?",
    a: "No. IAutoLicita es 100% SaaS, accedes desde el navegador. Si ya tienes RUT con historial en ChileCompra, tu perfil se auto-genera leyendo tus adjudicaciones pasadas: top categorías ganadas, organismos compradores frecuentes y keywords detectados. En 1 click queda pre-cargado el motor matching.",
  },
  {
    q: "¿Qué los hace distintos?",
    a: "Cuatro cosas que no encontrarás en la competencia: (1) precio real pagado por ítem vía OC con p25/p50/p75 — sabes a qué precio se está cerrando cada producto o servicio; (2) flujo CLP región compradora → región proveedora (matriz 16×16) para detectar dónde se queda el gasto; (3) inteligencia del organismo: 4 KPIs históricos + top 5 proveedores + insights automáticos (>30% desiertas = ⚠️ bases mal armadas); (4) plataforma multi-módulo: Mercado Público + CRM + cobranza + facturación + agenda + WhatsApp con agente IA cross-módulo.",
  },
  {
    q: "¿Sirve para varias empresas?",
    a: "Sí, multi-organización es nativo. Cada razón social tiene su propio perfil de matching, equipo, notas, oportunidades y chat IA — con datos aislados a nivel de base de datos vía Row Level Security de Postgres. Una sola cuenta, varios proyectos.",
  },
  {
    q: "¿Cómo lee las bases?",
    a: "El chat por licitación tiene acceso a 4 capas de contexto: datos públicos de la licitación + texto completo de las bases (PDFs y DOCs parseados) + notas del equipo + inteligencia del organismo comprador. Puede responder preguntas como “¿este organismo paga rápido?” con cifras reales del histórico. Retención de conversación 90 días.",
  },
  {
    q: "¿Y el trabajo en equipo?",
    a: "Notas con tipos (decisión, riesgo, tarea, idea, general), hilos, reacciones, pin y menciones @usuario con notificaciones en tiempo real. Las tareas se sincronizan automáticamente al Kanban del CRM. Resumen IA de notas con 1 click. Pipeline configurable: Detectada → Evaluando → Postulando → Adjudicada → Descartada.",
  },
  {
    // El enlace "Planes" de la nav apunta acá: es lo único que
    // el sitio dice hoy sobre planes y precios.
    ancla: "planes",
    q: "¿Cuánto cuesta?",
    a: "Trabajamos con plan único multi-organización. Incluye sincronización completa, enriquecimiento IA ilimitado, todos los módulos (matching multimodal, chat IA, órdenes de compra, inteligencia del organismo, gestión por equipo, análisis de mercado) y soporte directo. Para el precio y una demo personalizada, escríbenos por WhatsApp.",
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
      className="py-16 md:py-32 relative bg-ink-900/40 border-y border-[var(--hairline)]"
    >
      <div className="container-edge">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-4">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-amber-400">
              FAQ
            </span>
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
                            activa ? "text-amber-400" : "text-cream-50/25 group-hover:text-cream-50/45"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3
                          className={`font-display font-medium uppercase leading-[0.95] tracking-[-0.03em] text-[26px] md:text-[42px] transition-colors duration-300 ${
                            activa
                              ? "text-amber-400"
                              : "text-cream-50/25 group-hover:text-cream-50/50"
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
