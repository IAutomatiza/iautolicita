import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// El sitio se despliega en Vercel, en la raíz del dominio, así que la
// base es "/" en todos lados. Antes era "/iautolicita/" porque GitHub
// Pages lo servía en un subdirectorio; eso se terminó el 28-ago-2026.
export default defineConfig(() => ({
  base: "/",
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    allowedHosts: [".trycloudflare.com", ".loca.lt", ".ngrok-free.app", ".ngrok.io"],
  },
}));
