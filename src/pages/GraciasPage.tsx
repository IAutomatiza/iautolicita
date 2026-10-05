import { useEffect } from "react";
import { Check } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import CtaButton from "../components/ui/CtaButton";
import { conversionAds, evento } from "../lib/analitica";

/* /gracias — donde cae quien pidió una reunión.

   Existe para la medición, no por estética: Google Ads cuenta una
   conversión cuando carga una página, y antes el «listo» se pintaba
   dentro del formulario sin cambiar de URL. Sin página propia no hay
   dónde colgar la etiqueta, ni forma de ver el embudo en GA4.

   No se indexa (ver `noindex` en seo.ts) y no está en el sitemap: es
   el final de un trámite, no una página que alguien busque.

   🪤 Sólo cuenta si se llega desde el formulario. Quien abre /gracias
   a mano o recarga no es un lead: el formulario deja una marca en
   sessionStorage y aquí se consume una sola vez. */

const MARCA = "ial_lead_enviado";

/** La deja el formulario justo antes de navegar hasta aquí. */
export function marcarLeadEnviado() {
  try {
    sessionStorage.setItem(MARCA, String(Date.now()));
  } catch {
    /* sin almacenamiento: la conversión de Ads no se dispara */
  }
}

export default function GraciasPage() {
  useEffect(() => {
    let venia = false;
    try {
      venia = !!sessionStorage.getItem(MARCA);
      sessionStorage.removeItem(MARCA);
    } catch {
      /* nada */
    }
    if (!venia) return;
    evento("ver_gracias", { tipo: "reunion" });
    conversionAds("lead");
  }, []);

  return (
    <>
      <Seo ruta="/gracias" />
      <Nav />
      <main className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container-edge max-w-[640px]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-400">
            <Check className="h-6 w-6 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="mt-6 font-display font-medium text-[40px] md:text-[52px] leading-[1.02] tracking-[-0.04em] text-cream-50">
            Listo, lo recibimos.
          </h1>
          <p className="mt-5 font-sans text-[16.5px] leading-[1.6] text-cream-200">
            Te escribimos dentro del día hábil para coordinar la media hora. Si
            dejaste el RUT, llegamos con tus licitaciones ya en pantalla.
          </p>
          <p className="mt-8 font-sans text-[15px] leading-[1.6] text-cream-200">
            Mientras tanto, puedes abrir tu cuenta gratis y ver hoy mismo qué
            licitaciones y compras ágiles calzan con tu empresa.
          </p>
          <div className="mt-6">
            <CtaButton variant="huge" origen="cierre" label="Abrir mi cuenta gratis" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
