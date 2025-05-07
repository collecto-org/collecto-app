import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dotenv from 'dotenv';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL ,
        changeOrigin: true,
        secure: false,
      },
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  }
});
