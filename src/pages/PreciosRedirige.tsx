import { useEffect } from "react";

/* ════════════════════════════════════════════════════════════
   /precios — acá vivió un rato una copia de la página de planes,
   con los precios escritos a mano porque este sitio es estático.
   Eran dos páginas y dos fuentes para el mismo precio, y la copia
   podía quedar desfasada sin que nadie se enterara.

   La que manda es la de la app: la exige Flow para aprobar el
   cobro automático y arma los precios desde la base. Esta ruta
   queda solo para que los enlaces que ya circulan sigan llegando.
═══════════════════════════════════════════════════════════════ */

const DESTINO = "https://app.iautolicita.cl/precios";

export default function PreciosRedirige() {
  useEffect(() => {
    // replace y no assign: el visitante no debería volver acá con
    // el botón atrás, que lo dejaría rebotando entre las dos.
    window.location.replace(DESTINO);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-center">
      <p className="font-sans text-[15px] text-cream-300">
        Llevándote a los planes…{" "}
        <a
          href={DESTINO}
          className="text-cream-50 underline underline-offset-4"
        >
          Ir ahora
        </a>
      </p>
    </div>
  );
}
