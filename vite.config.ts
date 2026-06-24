import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Deployed to GitHub Pages at /iautolicita/ — base only applies to production
// builds so local dev (and previews) stay at the root.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/iautolicita/" : "/",
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    allowedHosts: [".trycloudflare.com", ".loca.lt", ".ngrok-free.app", ".ngrok.io"],
  },
}));
