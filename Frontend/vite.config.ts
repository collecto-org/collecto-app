import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const apiUrl = import.meta.VITE_API_URL

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
 server:{
  proxy:{
    "/api":"http://localhost:3000",
  }
 }})
