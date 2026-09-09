/* GENERADO — no editar a mano.

   Lo escribe `npm run sync:planes` leyendo la tabla `planes`.
   Última sincronización: 2026-08-28

   ⚠️ 9-sep-2026: los netos de Pro y Max se editaron A MANO
   (79.000 → 59.000 y 149.000 → 119.000) para dejar el sitio igual
   a lo que cobra la app. NO corras `sync:planes` hasta que Pro y
   Max vuelvan a `activo = true` en la tabla: el script filtra por
   `activo`, y hoy devolvería SOLO el Free — el sitio se quedaría
   con un plan.

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

export const PLANES_BASE: PlanBase[] = [
  {
    "codigo": "free",
    "nombre": "Free",
    "neto": 0,
    "usuarios": 1,
    "preguntasDia": 5
  },
  {
    "codigo": "pro",
    "nombre": "Pro",
    "neto": 59000,
    "usuarios": 3,
    "preguntasDia": null
  },
  {
    "codigo": "max",
    "nombre": "Max",
    "neto": 119000,
    "usuarios": 5,
    "preguntasDia": null
  }
];

/** Búsqueda por código: PLAN.pro.neto */
export const PLAN = Object.fromEntries(
  PLANES_BASE.map((p) => [p.codigo, p]),
) as Record<string, PlanBase>;

/** "$79.000" — el formato que usa el sitio. */
export const enPesos = (n: number) => "$" + n.toLocaleString("es-CL");
