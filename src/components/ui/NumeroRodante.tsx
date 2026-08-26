/* ════════════════════════════════════════════════════════════
   NumeroRodante — el NumberFlow del bloque de precios original:
   al cambiar el precio, cada dígito rueda verticalmente hasta el
   nuevo, en 500 ms con ease-out.

   Sin @number-flow/react: ese paquete resuelve el caso general
   (formatos por locale, dígitos que entran y salen, plurales) y
   acá el texto ya viene formateado. Cada dígito es una columna
   del 0 al 9 desplazada con translateY; los separadores y el
   signo peso van fijos.

   El valor completo va en un span accesible y las columnas se
   ocultan del lector de pantalla: si no, "79.000" se leería como
   una tira de sesenta dígitos.
═══════════════════════════════════════════════════════════════ */

const DIGITOS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function NumeroRodante({
  texto,
  duracion = 500,
  className = "",
}: {
  /** Ya formateado, por ejemplo "$79.000". */
  texto: string;
  duracion?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex tabular-nums ${className}`}>
      <span className="sr-only">{texto}</span>
      {texto.split("").map((c, i) =>
        /\d/.test(c) ? (
          <Columna key={i} digito={Number(c)} duracion={duracion} />
        ) : (
          <span key={i} aria-hidden>
            {c}
          </span>
        )
      )}
    </span>
  );
}

function Columna({ digito, duracion }: { digito: number; duracion: number }) {
  return (
    <span
      aria-hidden
      className="inline-block overflow-hidden"
      // 1em de alto con leading-none deja el dígito justo: cualquier
      // interlineado heredado asomaría el número de arriba.
      style={{ height: "1em", lineHeight: 1 }}
    >
      <span
        className="flex flex-col"
        style={{
          transform: `translateY(${-digito}em)`,
          transition: `transform ${duracion}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      >
        {DIGITOS.map((n) => (
          <span key={n} style={{ height: "1em", lineHeight: 1 }}>
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}
