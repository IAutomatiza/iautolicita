// Real institutional logos sourced from Wikimedia Commons.
// Treatment: grayscale + slight contrast for monochrome consistency,
// individual hover restores original color.

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

const Logo = ({ src, alt, ariaHidden = false }: {
  src: string;
  alt: string;
  ariaHidden?: boolean;
}) => (
  <li
    aria-hidden={ariaHidden || undefined}
    className="flex items-center justify-center flex-shrink-0 h-10 md:h-12 group/logo"
    title={alt}
  >
    <img
      src={src}
      alt={ariaHidden ? "" : alt}
      loading="lazy"
      className="h-full w-auto max-w-[140px] object-contain
        grayscale contrast-[1.05] opacity-65
        transition duration-300 ease-out
        group-hover/logo:grayscale-0 group-hover/logo:opacity-100
        group-hover/logo:scale-[1.06]"
    />
  </li>
);

export default function TrustedBy() {
  return (
    <section className="py-8 md:py-10 border-y border-[var(--hairline)] bg-ink-900/40 overflow-hidden">
      <div className="container-edge">
        <div className="text-center mb-6 md:mb-7">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-cream-400">
            Sincronizado en tiempo real con ChileCompra · cobertura 100% Jun 2024 → hoy
          </span>
        </div>
      </div>

      {/* Two-track seamless marquee:
          Each <ul> has internal `gap` AND right padding equal to gap.
          The track is 2× one ul. Animation translates -50% which equals
          exactly one ul width, so the second ul slides into the first's
          position with no visual cut. */}
      <div className="relative group/marquee">
        <div className="absolute inset-y-0 left-0 w-32 md:w-48 bg-gradient-to-r from-ink-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-48 bg-gradient-to-l from-ink-900 to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused]">
          <ul className="flex items-center gap-12 md:gap-16 pr-12 md:pr-16 shrink-0 m-0 list-none">
            {logos.map((l, i) => (
              <Logo key={`a-${i}`} {...l} />
            ))}
          </ul>
          <ul className="flex items-center gap-12 md:gap-16 pr-12 md:pr-16 shrink-0 m-0 list-none">
            {logos.map((l, i) => (
              <Logo key={`b-${i}`} {...l} ariaHidden />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
