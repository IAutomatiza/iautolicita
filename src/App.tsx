import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LiciPage from "./pages/LiciPage";
import PreciosPage from "./pages/PreciosPage";
import LiciWidget from "./components/LiciWidget";
import LegalPage from "./pages/LegalPage";
import ContactoPage from "./pages/ContactoPage";
import GlosarioPage from "./pages/GlosarioPage";
import GlosarioTerminoPage from "./pages/GlosarioTerminoPage";
import { PRIVACIDAD, TERMINOS } from "./lib/legal";

/* React Router navega pero NO hace scroll: un Link a "#faq" cambia
   la URL y deja la página donde estaba, y al cambiar de ruta se
   conserva la posición anterior. Este gestor hace lo que el visitante
   espera: con ancla, baja hasta la sección (reintentando mientras la
   página se monta); sin ancla, toda ruta abre arriba. */
function GestorScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      let intentos = 0;
      const buscar = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (intentos++ < 30) {
          // La sección puede no estar montada aún al llegar de otra ruta.
          requestAnimationFrame(buscar);
        }
      };
      buscar();
    } else {
      // "instant" a propósito: el scroll-behavior:smooth global haría
      // un viaje animado hasta arriba en cada cambio de página.
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <>
    <GestorScroll />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lici" element={<LiciPage />} />
      <Route path="/precios" element={<PreciosPage />} />
      {/* «Planes» circuló un rato con esta dirección. */}
      <Route path="/planes" element={<Navigate to="/precios" replace />} />
      {/* El asistente se llamaba ARIA: los enlaces que ya circulan siguen llegando. */}
      <Route path="/aria" element={<Navigate to="/lici" replace />} />
      <Route path="/contacto" element={<ContactoPage />} />
      <Route path="/glosario" element={<GlosarioPage />} />
      <Route path="/glosario/:slug" element={<GlosarioTerminoPage />} />
      <Route path="/privacidad" element={<LegalPage doc={PRIVACIDAD} />} />
      <Route path="/terminos" element={<LegalPage doc={TERMINOS} />} />
    </Routes>
    {/* Lici acompaña todas las páginas: es el canal de conversación
        del sitio desde que salió WhatsApp. */}
    <LiciWidget />
    </>
  );
}
