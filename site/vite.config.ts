import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

const app = (p: string) => fileURLToPath(new URL(`../app/${p}`, import.meta.url))

// The site draws the app's real cards, straight from app/src, with the app's images.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@app': app('src') },
    // app/src files resolve these from the site, so there is one React and one framer-motion
    dedupe: ['react', 'react-dom', 'framer-motion', 'canvas-confetti'],
  },
  publicDir: app('public'),
  server: { fs: { allow: ['..'] } },
})
