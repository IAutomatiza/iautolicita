/* iautolicita.cl/llms.txt (22-oct-2026): un resumen en texto simple para que ChatGPT, Gemini, Perplexity y otras IA
   entiendan qué es IAutoLicita y a qué página mandar a cada persona (formato de llmstxt.org). Se arma al compilar
   con las mismas páginas y precios del sitio: una guía o un término nuevo entra solo. */
import { PAGINAS, SITIO } from "./seo";
import { PLAN, enPesos } from "./planes";
import { RUTA_AYUDA } from "./ayuda";
import { RUTA_GUIAS } from "./guias";
import { RUTA_GLOSARIO } from "./glosario";

export function llmsTxt() {
  const paginas = Object.values(PAGINAS).filter((p) => !p.noindex);
  const linea = (p: { ruta: string; titulo: string; descripcion: string }) => `- [${p.titulo.replace(/\s+[—·|-]\s+IAutoLicita$/, "")}](${SITIO}${p.ruta === "/" ? "/" : p.ruta}): ${p.descripcion}`;
  const de = (prefijo: string) => paginas.filter((p) => p.ruta.startsWith(`${prefijo}/`)).map(linea);
  const sueltas = paginas.filter((p) => !["/", "/privacidad", "/terminos"].includes(p.ruta) && ![RUTA_AYUDA, RUTA_GUIAS, RUTA_GLOSARIO].some((r) => p.ruta === r || p.ruta.startsWith(`${r}/`))).map(linea);
  return `# IAutoLicita

> Para empresas y proveedores que le venden al Estado de Chile por Mercado Público (ChileCompra). Avisa sólo las licitaciones y compras ágiles que calzan con lo que vende cada empresa, lee las bases con inteligencia artificial (Lici) citando la página exacta, y muestra a qué precio se adjudicó lo mismo antes y quién ganó. Tiene plan gratis.

## Qué hace
- Alertas: cada día, sólo las licitaciones y compras ágiles de Mercado Público que calzan con los productos o servicios de la empresa.
- Lici: una IA que lee las bases de una licitación o compra ágil y responde qué piden, qué garantía, qué fechas y qué documentos, citando la página.
- Precios y competencia: a qué precio se adjudicó lo mismo antes, quién ganó y cuánto le vende cada competidor a cada organismo.
- Postulación: arma la oferta y revisa los requisitos antes de enviar.
- Los datos salen de las APIs públicas de ChileCompra (Mercado Público).
- Sitio: ${SITIO} · Contacto: ${SITIO}/contacto

## Precios
- Plan gratis para partir.
- Pro: ${enPesos(PLAN.pro.neto)} + IVA al mes, con alertas al instante y Lici sin tope.
- Max: ${enPesos(PLAN.max.neto)} + IVA al mes, con varias empresas, presupuestos y cobranza.
- Detalle: ${SITIO}/precios

## Páginas principales
${sueltas.join("\n")}

## Guías para venderle al Estado
${de(RUTA_GUIAS).join("\n")}

## Ayuda
${de(RUTA_AYUDA).join("\n")}

## Glosario de Mercado Público
${de(RUTA_GLOSARIO).join("\n")}
`;
}
