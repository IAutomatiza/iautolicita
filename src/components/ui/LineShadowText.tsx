import type { ElementType, HTMLAttributes } from "react";

/* ════════════════════════════════════════════════════════════
   LineShadowText — clon del componente de MagicUI adaptado al
   stack propio: el original envuelve el nodo en motion.create()
   solo para poder recibir props de animación, pero el efecto en
   sí es CSS puro (un ::after con la misma palabra, relleno con
   un degradado de rayas diagonales recortado al texto, que se
   desplaza en bucle). Así no entra la dependencia `motion`.

   La animación vive en tailwind.config.ts como `line-shadow`.
═══════════════════════════════════════════════════════════════ */

type Props = HTMLAttributes<HTMLElement> & {
  children: string;
  /** Color de las rayas de la sombra. */
  shadowColor?: string;
  /** Etiqueta a renderizar (span por defecto). */
  as?: ElementType;
};

export default function LineShadowText({
  children,
  shadowColor = "black",
  className = "",
  as: Componente = "span",
  ...props
}: Props) {
  return (
    <Componente
      style={{ "--shadow-color": shadowColor } as React.CSSProperties}
      data-text={children}
      className={[
        "relative z-0 inline-flex",
        "after:absolute after:left-[0.04em] after:top-[0.04em] after:content-[attr(data-text)]",
        "after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)]",
        "after:-z-10 after:bg-[length:0.06em_0.06em] after:bg-clip-text after:text-transparent",
        "after:animate-line-shadow",
        "motion-reduce:after:animate-none",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </Componente>
  );
}
