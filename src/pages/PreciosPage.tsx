import { useEffect } from "react";
import Nav from "../components/Nav";
import Planes from "../components/Planes";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import DotPattern from "../components/ui/DotPattern";

/* ════════════════════════════════════════════════════════════
   /precios — los planes viven en su propia página, como /lici.
   Estuvieron un rato como sección del home, pero un precio es
   algo que se busca a propósito y se comparte por link: en el
   home no tenía URL propia ni título propio.

   La página es el marco (encabezado, trama, cierre); las
   tarjetas y la regla de cobro siguen en Planes.tsx.
═══════════════════════════════════════════════════════════════ */

export default function PreciosPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    // La SPA comparte el <title> del index; sin esto /precios se
    // indexa y se comparte con el titular del home.
    const previo = document.title;
    document.title = "Planes y precios | IAutoLicita";
    return () => {
      document.title = previo;
    };
  }, []);

  return (
    <>
      {/* Como en /lici: el mismo menú del home, sin el ticker en
          vivo — acá el visitante viene a decidir, no a mirar. */}
      <Nav conTicker={false} />

      <main className="relative pt-16">
        <DotPattern
          cr={1}
          opacidad={0.05}
          className="[mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_10%,transparent_70%)]"
        />
        <div className="relative">
          <Planes conEncabezado />
          <FinalCTA />
        </div>
      </main>

      <Footer />
    </>
  );
}
