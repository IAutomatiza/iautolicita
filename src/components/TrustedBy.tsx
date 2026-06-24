// Institutional emblems of Chilean State bodies whose ChileCompra tenders the
// platform processes. Only clean transparent-background marks are kept, shown
// in their original color (government crests read best in color, not grayscale)
// on a centered, airy row — Sprout/Revolut style. A mono eyebrow + display
// headline carry the credibility; logos reinforce it. Stagger fade-in on scroll.

import useInView from "../hooks/useInView";

// Relative to Vite's base URL so it works under the GitHub Pages subpath
const B = import.meta.env.BASE_URL;
const logos = [
  { src: `${B}logos/carabineros.svg`, alt: "Carabineros de Chile" },
  { src: `${B}logos/codelco.svg`, alt: "Codelco" },
  { src: `${B}logos/armada.svg`, alt: "Armada de Chile" },
  { src: `${B}logos/minsal.png`, alt: "Ministerio de Salud · Gobierno de Chile" },
  { src: `${B}logos/ejercito.svg`, alt: "Ejército de Chile" },
  { src: `${B}logos/sii.svg`, alt: "SII · Servicio de Impuestos Internos" },
];

export default function TrustedBy() {
  const [ref, inView] = useInView<HTMLUListElement>(0.15);

  return (
    <section className="py-14 md:py-20 border-y border-[var(--hairline)] bg-ink-900/40">
      <div className="container-edge text-center">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-amber-400 font-medium">
          Cobertura total · ChileCompra en tiempo real
        </span>

        <h2 className="mt-5 font-display font-medium text-[28px] md:text-[40px] lg:text-[46px] leading-[1.08] tracking-[-0.025em] text-cream-50 max-w-[760px] mx-auto">
          Procesamos las licitaciones de los{" "}
          <span className="font-serif italic font-normal text-amber-400 tracking-[-0.015em]">
            principales organismos
          </span>{" "}
          del Estado
        </h2>

        <ul
          ref={ref}
          className="mt-10 md:mt-12 flex flex-wrap items-center justify-center
            gap-x-12 gap-y-8 md:gap-x-16 m-0 list-none"
        >
          {logos.map((l, i) => (
            <li
              key={i}
              title={l.alt}
              className="flex items-center justify-center h-12 md:h-14 group/logo
                transition-all duration-500 ease-out"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(12px)",
                transitionDelay: `${i * 70}ms`,
              }}
            >
              <img
                src={l.src}
                alt={l.alt}
                loading="lazy"
                className="h-full w-auto max-w-[150px] object-contain
                  opacity-90 transition duration-300 ease-out
                  group-hover/logo:opacity-100 group-hover/logo:scale-[1.07]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
