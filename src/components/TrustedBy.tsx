// Real institutional logos sourced from Wikimedia Commons.
// Treatment: structured grid with hairline dividers (Rox-inspired) over the
// dark ink background. Logos are grayscale for monochrome consistency and
// fade/slide in with a stagger when the section scrolls into view, then stay
// still. Individual hover restores color.

import useInView from "../hooks/useInView";

// Only clean transparent-background marks are kept here, so the grid stays
// visually consistent. The banner-style raster assets (chilecompra.jpg,
// registrocivil/sernac/conaf/minsal/junaeb .png) were dropped on purpose.
const logos = [
  { src: "/logos/carabineros.svg", alt: "Carabineros de Chile" },
  { src: "/logos/codelco.svg", alt: "Codelco" },
  { src: "/logos/armada.svg", alt: "Armada de Chile" },
  { src: "/logos/fach.svg", alt: "Fuerza Aérea de Chile" },
  { src: "/logos/ejercito.svg", alt: "Ejército de Chile" },
  { src: "/logos/sii.svg", alt: "SII · Servicio de Impuestos Internos" },
];

export default function TrustedBy() {
  const [ref, inView] = useInView<HTMLUListElement>(0.15);

  return (
    <section className="py-10 md:py-14 border-y border-[var(--hairline)] bg-ink-900/40">
      <div className="container-edge">
        <div className="text-center mb-8 md:mb-10">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-cream-400">
            Sincronizado en tiempo real con ChileCompra · cobertura 100% Jun 2024 → hoy
          </span>
        </div>

        {/* Bordered grid: the <ul> draws the top + left hairlines, each <li>
            draws its right + bottom hairline, completing a clean lattice. */}
        <ul
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 m-0 list-none
            border-t border-l border-[var(--hairline)]"
        >
          {logos.map((l, i) => (
            <li
              key={i}
              title={l.alt}
              className="flex items-center justify-center h-24 md:h-28 px-6 group/logo
                border-r border-b border-[var(--hairline)]
                transition-all duration-500 ease-out
                hover:bg-cream-50/[0.02]"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(12px)",
                transitionDelay: `${i * 55}ms`,
              }}
            >
              <img
                src={l.src}
                alt={l.alt}
                loading="lazy"
                className="h-10 md:h-12 w-auto max-w-[150px] object-contain
                  grayscale contrast-[1.05] opacity-60
                  transition duration-300 ease-out
                  group-hover/logo:grayscale-0 group-hover/logo:opacity-100
                  group-hover/logo:scale-[1.06]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
