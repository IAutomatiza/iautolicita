import SectionLabel from "./ui/SectionLabel";

/* ════════════════════════════════════════════════════════════
   Cómo funciona — cuatro pasos donde el usuario pone uno solo.
   El copy habla en resultados, no en infraestructura: nada de
   pipelines, marts ni TipTap. Cada paso dice qué pasa y qué
   gana el que lo lee, y el chip marca cuáles corren solos.
═══════════════════════════════════════════════════════════════ */

const steps: {
  n: string;
  title: string;
  body: React.ReactNode;
  duration: string;
  auto: boolean;
}[] = [
  {
    n: "01",
    title: "Parte con tu RUT",
    body: (
      <>
        Leemos tu historial completo en 7,2 millones de adjudicaciones y tu
        perfil se arma solo: qué vendes, a qué organismos les has ganado y con
        qué palabras te buscan.{" "}
        <span className="text-cream-50 font-medium">
          Es lo único que haces.
        </span>
      </>
    ),
    duration: "1 clic",
    auto: false,
  },
  {
    n: "02",
    title: "El radar no duerme",
    body: (
      <>
        Cada licitación nueva de ChileCompra se detecta apenas se publica y
        recibe un{" "}
        <span className="text-cream-50 font-medium">score 0–100</span> contra
        tu perfil. Las que calzan llegan solas a tu bandeja; el resto ni lo
        ves.
      </>
    ),
    duration: "automático · 24/7",
    auto: true,
  },
  {
    n: "03",
    title: "Lici lee las bases",
    body: (
      <>
        La IA extrae requisitos, plazos y riesgos de las bases, y le pone
        precio a tu oferta con{" "}
        <span className="text-cream-50 font-medium">
          lo que el Estado pagó por lo mismo
        </span>{" "}
        en 6,4 millones de órdenes de compra.
      </>
    ),
    duration: "automático · 12 seg por base",
    auto: true,
  },
  {
    n: "04",
    title: "Tú solo decides",
    body: (
      <>
        La alerta llega por WhatsApp con todo masticado: score, precio
        sugerido y riesgos. Tu equipo postula con ventaja —{" "}
        <span className="text-cream-50 font-medium">
          sin haber abierto el portal
        </span>
        .
      </>
    ),
    duration: "el paso que es tuyo",
    auto: false,
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
            <span className="serif-em text-amber-400">
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

              <div className="flex items-baseline justify-between gap-4 mb-3">
                <div className="num font-display font-medium text-[64px] leading-none text-amber-400">
                  {s.n}
                </div>
                <span
                  className={`font-mono text-[9.5px] uppercase tracking-[0.16em] px-2.5 py-1.5 rounded-full border ${
                    s.auto
                      ? "border-amber-400/30 bg-amber-400/[0.06] text-amber-400"
                      : "border-[var(--hairline-strong)] text-cream-300"
                  }`}
                >
                  {s.duration}
                </span>
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
