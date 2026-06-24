// Real institutional logos sourced from Wikimedia Commons.
// Treatment: static responsive grid, grayscale + slight contrast for
// monochrome consistency. Logos fade/slide in with a stagger when the
// section scrolls into view, then stay still. Individual hover restores color.

import useInView from "../hooks/useInView";

const logos = [
  { src: "/logos/chilecompra.jpg", alt: "ChileCompra · Dirección de Compras y Contratación Pública" },
  { src: "/logos/carabineros.svg", alt: "Carabineros de Chile" },
  { src: "/logos/codelco.svg", alt: "Codelco" },
  { src: "/logos/armada.svg", alt: "Armada de Chile" },
  { src: "/logos/fach.svg", alt: "Fuerza Aérea de Chile" },
  { src: "/logos/ejercito.svg", alt: "Ejército de Chile" },
  { src: "/logos/sii.svg", alt: "SII · Servicio de Impuestos Internos" },
  { src: "/logos/registrocivil.png", alt: "Servicio de Registro Civil e Identificación" },
  { src: "/logos/sernac.png", alt: "SERNAC" },
  { src: "/logos/conaf.png", alt: "CONAF" },
  { src: "/logos/minsal.png", alt: "MINSAL" },
  { src: "/logos/junaeb.png", alt: "JUNAEB" },
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

        <ul
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10 md:gap-x-12 md:gap-y-12 m-0 list-none"
        >
          {logos.map((l, i) => (
            <li
              key={i}
              title={l.alt}
              className="flex items-center justify-center h-10 md:h-12 group/logo
                transition-all duration-500 ease-out"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(12px)",
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <img
                src={l.src}
                alt={l.alt}
                loading="lazy"
                className="h-full w-auto max-w-[150px] object-contain
                  grayscale contrast-[1.05] opacity-65
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
