/* El texto del manual, tal como viene del índice y de las fichas.

   El manual se escribe UNA vez y se lee en tres lugares —el PDF, la app y esta
   página—, así que viaja en un formato mínimo que cada uno dibuja con su propia
   tipografía: `**negrita**`, `` `código` `` y `{Pro}`, que es el chip del plan
   pagado dentro de una frase. No es Markdown completo a propósito. */
import { Fragment, ReactNode } from "react";

/** El chip del plan pagado. Se MUESTRA, nunca se esconde: es lo que vende. */
export function ChipPro({ titulo }: { titulo?: string }) {
  return (
    <span
      title={titulo}
      className="inline-flex items-center align-middle border border-gold-300 bg-gold-50 px-1.5 py-px font-mono text-[10px] uppercase tracking-[0.1em] text-gold-500"
    >
      Pro
    </span>
  );
}

const TROZOS = /(\*\*[^*]+\*\*|`[^`]+`|\{Pro\})/g;

export default function TextoManual({ children }: { children: string }): ReactNode {
  return (
    <>
      {children.split(TROZOS).map((t, i) => {
        if (t.startsWith("**") && t.endsWith("**"))
          return (
            <b key={i} className="font-medium text-cream-50">
              {t.slice(2, -2)}
            </b>
          );
        if (t.startsWith("`") && t.endsWith("`"))
          return (
            <code key={i} className="font-mono text-[0.92em] text-cream-100">
              {t.slice(1, -1)}
            </code>
          );
        if (t === "{Pro}") return <ChipPro key={i} />;
        return <Fragment key={i}>{t}</Fragment>;
      })}
    </>
  );
}
