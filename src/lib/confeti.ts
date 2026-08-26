/* ════════════════════════════════════════════════════════════
   Confeti — el estallido que el bloque de precios original hacía
   con canvas-confetti al pasar a cobro anual, con sus mismos
   parámetros (50 partículas, apertura 60°, gravedad 1,2, decay
   0,94, velocidad inicial 30, 200 ticks, círculos).

   Está escrito acá y no instalado porque canvas-confetti trae su
   propio canvas, su cola de animaciones y ~4 kB para un solo
   gesto de una sola página. Lo que sigue es ese gesto y nada más.

   Respeta prefers-reduced-motion: si el sistema pide menos
   movimiento, no dibuja nada.
═══════════════════════════════════════════════════════════════ */

type Opciones = {
  /** Origen en coordenadas de viewport, 0–1. */
  x: number;
  y: number;
  colores?: string[];
};

const PARTICULAS = 50;
const APERTURA = 60; // grados
const VELOCIDAD = 30;
const GRAVEDAD = 1.2;
const DECAY = 0.94;
const TICKS = 200;

export default function confeti({ x, y, colores }: Opciones) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const paleta = colores?.length ? colores : ["#0064E0", "#0A0A0A", "#A8A29E"];

  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999";
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }
  ctx.scale(dpr, dpr);

  // El ángulo base apunta hacia arriba y se abre `APERTURA` grados.
  // Ojo con la física: canvas-confetti NO acelera, le suma la
  // gravedad a la POSICIÓN y le aplica el decay a una velocidad
  // escalar. Tratarla como aceleración hunde el confeti en medio
  // segundo y el gesto no se alcanza a ver.
  const base = 90;
  const particulas = Array.from({ length: PARTICULAS }, () => {
    const grados = base + (Math.random() * APERTURA - APERTURA / 2);
    const angulo = (-grados * Math.PI) / 180;
    return {
      x: x * window.innerWidth,
      y: y * window.innerHeight,
      cos: Math.cos(angulo),
      sin: Math.sin(angulo),
      v: VELOCIDAD * 0.5 + Math.random() * VELOCIDAD,
      r: 3 + Math.random() * 3,
      color: paleta[Math.floor(Math.random() * paleta.length)],
    };
  });

  let tick = 0;
  let raf = 0;

  const dibujar = () => {
    tick += 1;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const opacidad = Math.max(0, 1 - tick / TICKS);

    for (const p of particulas) {
      p.x += p.cos * p.v;
      p.y += p.sin * p.v + GRAVEDAD;
      p.v *= DECAY;

      ctx.globalAlpha = opacidad;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    if (tick < TICKS) {
      raf = requestAnimationFrame(dibujar);
    } else {
      cancelAnimationFrame(raf);
      canvas.remove();
    }
  };

  raf = requestAnimationFrame(dibujar);
}
