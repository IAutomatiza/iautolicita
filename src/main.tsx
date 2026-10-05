import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
/* Fuentes desde el propio dominio, no desde Google Fonts.
   La hoja de Google bloqueaba el primer pintado ~0,8 s y el título
   (en Anton) esperaba la fuente: la portada medía LCP 5,8 s en móvil.
   Servidas acá, con font-display: swap y precarga de las dos que se
   ven arriba (Anton y Geist, ver prerender.mjs), el texto pinta al tiro. */
// Anton se declara en index.css con font-display: optional (ver ahí).
import "@fontsource-variable/geist/wght.css";
import "@fontsource-variable/geist-mono/wght.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./index.css";

// Strip trailing slash so React Router's basename matches Vite's base
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
