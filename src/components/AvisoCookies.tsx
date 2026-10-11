import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EVENTO_ABRIR_COOKIES, eleccionCookies, elegirCookies, type EleccionCookies } from "../lib/consentimiento";

/**
 * El aviso de cookies.
 *
 * Aparece sólo si la persona todavía no elige, y se puede volver a
 * abrir desde «Preferencias de cookies» en el pie. Se monta después
 * de la primera pintura: el prerenderizado no lo incluye, así que no
 * mueve nada de la página ni compite con la portada.
 *
 * Va abajo a la izquierda porque abajo a la derecha vive Lici.
 * Los dos botones pesan lo mismo a propósito: rechazar tiene que ser
 * tan fácil como aceptar.
 */
export default function AvisoCookies() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (eleccionCookies() === null) setVisible(true);
    const abrir = () => setVisible(true);
    window.addEventListener(EVENTO_ABRIR_COOKIES, abrir);
    return () => window.removeEventListener(EVENTO_ABRIR_COOKIES, abrir);
  }, []);

  if (!visible) return null;

  const elegir = (e: EleccionCookies) => {
    elegirCookies(e);
    setVisible(false);
  };

  const boton =
    "h-9 flex-1 rounded-full border px-4 font-sans text-[13.5px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40";

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed bottom-24 left-3 right-3 z-[55] rounded-2xl border border-[var(--hairline-strong)] bg-white p-4 shadow-[0_1px_2px_rgba(10,10,10,0.06),0_12px_32px_-8px_rgba(10,10,10,0.18)] sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[360px]"
    >
      <p className="font-sans text-[13.5px] leading-relaxed text-cream-100">
        Usamos cookies para medir las visitas y nuestros avisos. El sitio funciona igual si las rechazas.{" "}
        <Link to="/privacidad" className="text-amber-400 underline underline-offset-2 hover:no-underline">
          Política de privacidad
        </Link>
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => elegir("rechazadas")}
          className={`${boton} border-[var(--hairline-strong)] bg-white text-cream-50 hover:border-cream-300`}
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={() => elegir("aceptadas")}
          className={`${boton} border-amber-400 bg-amber-400 text-white hover:bg-amber-500`}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
