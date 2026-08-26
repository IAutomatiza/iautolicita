import { useEffect } from "react";
import Nav from "../components/Nav";
import Planes from "../components/Planes";
import Footer from "../components/Footer";

/* ════════════════════════════════════════════════════════════
   /precios — los planes viven en el sitio, en su propia página
   como /lici. Estuvieron un rato saliendo a la página de la app;
   eso abría otra pestaña y sacaba al visitante del sitio.

   La página de la app sigue existiendo y sigue siendo la fuente
   del precio: la exige Flow y los arma desde la base. Esta es la
   cara comercial; los valores de Planes.tsx son un espejo de esa
   tabla y hay que moverlos junto con ella.
═══════════════════════════════════════════════════════════════ */

export default function PreciosPage() {
  useEffect(() => {
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
      <Nav />

      <main className="pt-16">
        <Planes />
      </main>

      <Footer />
    </>
  );
}
