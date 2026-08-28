/* Sincroniza los planes desde la base y escribe `src/lib/planes.ts`.

   EL PROBLEMA QUE RESUELVE
   Los precios y los topes son configurables: se cambian en la app,
   en `/admin/planes`, y quedan en la tabla `planes`. Pero el sitio
   es estático y no habla con Supabase, así que las cifras estaban
   escritas a mano en CUATRO lugares:

     1. la tabla `planes`            ← la única verdad
     2. src/components/Planes.tsx    ← la página de precios
     3. src/lib/liciConocimiento.ts  ← lo que dice Lici
     4. src/lib/seo.ts               ← el JSON-LD que lee Google

   Cuatro copias a mano derivan. Y cuando derivan, el sitio le
   promete a un cliente un precio que no existe.

   CÓMO SE USA
     npm run sync:planes     ← cuando cambie un precio o un tope

   Genera `src/lib/planes.ts`, que es de donde leen los otros tres.
   NO corre dentro de `npm run build` a propósito: un deploy no
   debe caerse porque la base esté lenta. El archivo generado se
   commitea, y el cron de salud avisa si la base se movió.

   Necesita SUPABASE_URL y SUPABASE_ANON_KEY (los planes públicos
   son información pública: es lo mismo que muestra /precios). */

import { writeFileSync } from "node:fs";

const URL_BASE = process.env.SUPABASE_URL;
const LLAVE = process.env.SUPABASE_ANON_KEY;

if (!URL_BASE || !LLAVE) {
  console.error(`
  Faltan las credenciales. Corre así:

    SUPABASE_URL=https://xxxx.supabase.co \\
    SUPABASE_ANON_KEY=eyJ… \\
    npm run sync:planes
  `);
  process.exit(1);
}

const pedir = async (ruta) => {
  const r = await fetch(`${URL_BASE}/rest/v1/${ruta}`, {
    headers: { apikey: LLAVE, Authorization: `Bearer ${LLAVE}` },
  });
  if (!r.ok) throw new Error(`${r.status} en ${ruta}: ${await r.text()}`);
  return r.json();
};

const planes = await pedir(
  "planes?select=codigo,nombre,precio_clp,max_usuarios,cap_preguntas_aria_dia,visible_publico,activo" +
    "&visible_publico=eq.true&activo=eq.true&order=precio_clp.asc",
);

if (!planes.length) throw new Error("La base no devolvió ningún plan público.");

const salida = `/* GENERADO — no editar a mano.

   Lo escribe \`npm run sync:planes\` leyendo la tabla \`planes\`.
   Última sincronización: ${new Date().toISOString().slice(0, 10)}

   Si cambias un precio en /admin/planes, corre el script y
   commitea este archivo. Es la única fuente de cifras del sitio:
   de acá leen la página de precios, Lici y el JSON-LD de Google. */

export type PlanBase = {
  codigo: string;
  nombre: string;
  /** Precio NETO en pesos. El IVA se muestra aparte. */
  neto: number;
  usuarios: number | null;
  /** Tope diario de preguntas a Lici. null = sin tope. */
  preguntasDia: number | null;
};

export const PLANES_BASE: PlanBase[] = ${JSON.stringify(
  planes.map((p) => ({
    codigo: p.codigo.replace(/^licita_/, ""),
    nombre: p.nombre,
    neto: p.precio_clp,
    usuarios: p.max_usuarios,
    preguntasDia: p.cap_preguntas_aria_dia,
  })),
  null,
  2,
)};

/** Búsqueda por código: PLAN.pro.neto */
export const PLAN = Object.fromEntries(
  PLANES_BASE.map((p) => [p.codigo, p]),
) as Record<string, PlanBase>;

/** "$79.000" — el formato que usa el sitio. */
export const enPesos = (n: number) => "$" + n.toLocaleString("es-CL");
`;

writeFileSync("src/lib/planes.ts", salida);

console.log("  ✓ src/lib/planes.ts actualizado desde la base:");
for (const p of planes) {
  console.log(
    `      ${p.nombre.padEnd(6)} $${(p.precio_clp ?? 0).toLocaleString("es-CL").padStart(8)}` +
      ` · ${p.max_usuarios ?? "—"} usuarios` +
      ` · Lici ${p.cap_preguntas_aria_dia ?? "sin tope"}/día`,
  );
}
