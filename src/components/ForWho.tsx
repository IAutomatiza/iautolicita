import SectionLabel from "./ui/SectionLabel";

const profiles = [
  {
    title: "Consultoras técnicas",
    body: "que postulan ingeniería, auditoría, estudios e inspección al Estado.",
  },
  {
    title: "Laboratorios y proveedores de salud",
    body: "que venden insumos, servicios o tecnología sanitaria a hospitales y CESFAMs.",
  },
  {
    title: "Distribuidores industriales",
    body: "de insumos, oficina, EPP, alimentación o vestuario institucional.",
  },
  {
    title: "Integradores tecnológicos",
    body: "que implementan software, infraestructura o servicios profesionales para el sector público.",
  },
  {
    title: "Holdings y grupos",
    body: "que operan varias razones sociales bajo una misma matriz y necesitan operación unificada.",
  },
];

export default function ForWho() {
  return (
    <section className="py-24 md:py-32 relative bg-ink-900 border-y border-[var(--hairline-strong)]">
      <div className="container-edge">
        <div className="grid lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-6">
            <SectionLabel index="06" label="Para quién" />
            <h2 className="mt-6 font-display font-medium text-[40px] md:text-[58px] leading-[0.98] tracking-tightest text-cream-50">
              Si vendes al Estado,{" "}
              <span className="serif-em text-amber-400">esto es para ti.</span>
            </h2>
          </div>
        </div>

        <div className="border-t border-[var(--hairline-strong)]">
          {profiles.map((p, i) => (
            <article
              key={i}
              className="grid md:grid-cols-12 gap-4 md:gap-8 items-baseline py-7 md:py-9 border-b border-[var(--hairline)] group hover:bg-cream-50/[0.012] transition-colors"
            >
              <div className="md:col-span-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-400">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="md:col-span-5">
                <h3 className="font-display font-medium text-[28px] md:text-[36px] leading-[1] tracking-[-0.025em] text-cream-50">
                  {p.title}
                </h3>
              </div>
              <div className="md:col-span-6">
                <p className="font-sans text-[15.5px] leading-[1.55] text-cream-200">
                  {p.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
