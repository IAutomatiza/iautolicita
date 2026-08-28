import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";

/* Entrada de servidor — solo la usa `prerender.mjs` al compilar.
   No entra al bundle del navegador.

   Reexporta lo del módulo de SEO para que el prerenderizador tenga
   una sola cosa que importar. */
export { PAGINAS, SITIO, OG_IMAGEN, jsonLdDe } from "./lib/seo";

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}
