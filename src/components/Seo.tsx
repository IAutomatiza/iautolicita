import { useEffect } from "react";
import { PAGINAS, SITIO, OG_IMAGEN } from "../lib/seo";

/* Mantiene el <head> al día cuando se navega dentro del sitio.

   El HTML que sirve el servidor ya trae todo esto escrito por el
   prerenderizador — esto es solo para la navegación del lado del
   cliente, donde el <head> no se vuelve a pedir.

   Reemplaza el `document.title` a mano que tenían /lici y
   /precios, y que dejaba la descripción y el canonical sin tocar. */

function fijarMeta(selector: string, crear: () => HTMLElement, valor: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = crear();
    document.head.appendChild(el);
  }
  if (el.tagName === "LINK") el.setAttribute("href", valor);
  else el.setAttribute("content", valor);
}

export default function Seo({ ruta }: { ruta: string }) {
  useEffect(() => {
    const meta = PAGINAS[ruta];
    if (!meta) return;

    const url = `${SITIO}${meta.ruta === "/" ? "" : meta.ruta}`;
    document.title = meta.titulo;

    fijarMeta(
      'meta[name="description"]',
      () => Object.assign(document.createElement("meta"), { name: "description" }),
      meta.descripcion,
    );
    fijarMeta(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement("link"), { rel: "canonical" }),
      url,
    );

    const og: [string, string][] = [
      ["og:title", meta.titulo],
      ["og:description", meta.descripcion],
      ["og:url", url],
      ["og:image", OG_IMAGEN],
    ];
    for (const [prop, valor] of og) {
      fijarMeta(
        `meta[property="${prop}"]`,
        () => {
          const m = document.createElement("meta");
          m.setAttribute("property", prop);
          return m;
        },
        valor,
      );
    }
  }, [ruta]);

  return null;
}
