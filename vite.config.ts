import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/* La ruta base sale del entorno, porque hoy hay DOS destinos:

   · Vercel y el dominio propio sirven en la raíz  →  "/"
   · GitHub Pages sirve en un subdirectorio        →  "/iautolicita/"

   Si esto quedara fijo en "/", una publicación a Pages saldría en
   blanco: los assets apuntarían a pipex360.github.io/assets/… y
   darían 404. El workflow de Pages pasa BASE_SITIO; todo lo demás
   —Vercel, el dev server, el prerenderizado— usa la raíz. */
export default defineConfig(() => ({
  base: process.env.BASE_SITIO || "/",
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    allowedHosts: [".trycloudflare.com", ".loca.lt", ".ngrok-free.app", ".ngrok.io"],
  },
}));
