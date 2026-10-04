import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // relative base so the build runs from any host or sub-path
  base: './',
  plugins: [react()],
})
