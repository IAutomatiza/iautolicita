import type { ReactNode, CSSProperties } from "react";

/* ════════════════════════════════════════════════════════════
   Tarjetas que se apilan al hacer scroll — clon del cards-stack
   de Ali Imam. Cada tarjeta es `position: sticky` con un `top`
   creciente: al bajar, se van frenando una tras otra y quedan
   escalonadas como un mazo de naipes.

   El original envuelve cada tarjeta en motion.div con
   layout="position" (de la librería `motion`), pero el efecto en
   sí es CSS puro — el layout animation solo interviene si el
   contenido cambia de tamaño, que no es el caso. Va sin
   dependencias.
═══════════════════════════════════════════════════════════════ */

export function ContainerScroll({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative w-full ${className}`} style={{ perspective: "1000px" }}>
      {children}
    </div>
  );
}

export function CardSticky({
  index,
  incrementY = 10,
  incrementZ = 10,
  children,
  className = "",
  style,
}: {
  /** Posición en el mazo: define cuánto más abajo se frena. */
  index: number;
  incrementY?: number;
  incrementZ?: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`sticky ${className}`}
      style={{
        top: index * incrementY,
        zIndex: index * incrementZ,
        backfaceVisibility: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
