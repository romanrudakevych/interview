import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://<user>.github.io/interview/ on GitHub Pages.
  base: '/interview/',
  plugins: [react()],
})
