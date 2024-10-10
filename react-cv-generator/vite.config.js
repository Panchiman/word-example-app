import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/generate-cv": {
        target: "http://localhost:3001", // Redirige al servidor de Express
        changeOrigin: true,
      },
    },
  },
});
