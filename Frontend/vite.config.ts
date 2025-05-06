import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const apiUrl = process.env.VITE_API_URL;
const socketsUrl = process.env.VITE_SOCKET_URL;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": apiUrl || "http://localhost:3000",
      "/chat": {
        target:socketsUrl ,
        ws: true, 
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  }
});
