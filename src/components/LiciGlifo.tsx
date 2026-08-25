/* ════════════════════════════════════════════════════════════
   Marca de Lici — variante 2A del tablero "Logo para Lici IA"
   (claude.ai/design), con el ajuste pedido por el cliente:
   burbuja BLANCA, L negra y punto azul de IAutoLicita.

   Geometría del tablero (caja 112×112): burbuja de conversación
   con esquinas 34/34/34 y cola de 8 abajo-izquierda; L geométrica
   de dos barras (15 de trazo, esquinas r3) y punto de r6.5 al
   pie de la L. El SVG escala nítido a cualquier tamaño.
═══════════════════════════════════════════════════════════════ */

export const AZUL_IAL = "#0064E0";

export default function LiciGlifo({
  alto = 26,
  tinta = "#0C0C0C",
  fondo = "#FFFFFF",
  punto = AZUL_IAL,
  conBorde = false,
  className,
}: {
  /** Alto en px; la marca es cuadrada, el ancho es igual. */
  alto?: number;
  /** Color de la L. */
  tinta?: string;
  /** Color de la burbuja. */
  fondo?: string;
  /** Color del punto. */
  punto?: string;
  /** Hairline alrededor de la burbuja, para fondos claros. */
  conBorde?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 112 112"
      height={alto}
      width={alto}
      className={className}
      aria-hidden
      focusable="false"
    >
      {/* Burbuja: esquinas 34/34/34 y cola de 8 abajo-izquierda */}
      <path
        fill={fondo}
        stroke={conBorde ? "rgba(12,12,12,0.12)" : "none"}
        strokeWidth={conBorde ? 2 : 0}
        d="M34 1H78A33 33 0 0 1 111 34V78A33 33 0 0 1 78 111H8A7 7 0 0 1 1 104V34A33 33 0 0 1 34 1Z"
      />
      {/* L geométrica de dos barras */}
      <rect x="30" y="26" width="15" height="60" rx="3" fill={tinta} />
      <rect x="30" y="71" width="34" height="15" rx="3" fill={tinta} />
      {/* Punto al pie */}
      <circle cx="76.5" cy="79.5" r="6.5" fill={punto} />
    </svg>
  );
}
