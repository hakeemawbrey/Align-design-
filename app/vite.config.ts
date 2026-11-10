import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { copyFileSync, createReadStream, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

/**
 * The beta's photo check (MediaPipe): its WebAssembly ships next to the app in
 * mp/wasm, so it runs offline and inside hosts that block outside downloads.
 * Only the beta build carries it.
 */
const WASM = resolve(__dirname, 'node_modules/@mediapipe/tasks-vision/wasm')
function auraModels(): Plugin {
  let outDir = 'dist'
  return {
    name: 'align-aura-models',
    configResolved(c) { outDir = resolve(c.root, c.build.outDir) },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const m = req.url?.match(/\/mp\/wasm\/([\w.-]+)$/)
        const file = m && join(WASM, m[1])
        if (!file || !existsSync(file)) return next()
        if (file.endsWith('.wasm')) res.setHeader('Content-Type', 'application/wasm')
        createReadStream(file).pipe(res)
      })
    },
    closeBundle() {
      // the models themselves are bundled (src/lib/auraModels.ts); only the WebAssembly is copied
      mkdirSync(join(outDir, 'mp/wasm'), { recursive: true })
      for (const f of readdirSync(WASM)) copyFileSync(join(WASM, f), join(outDir, 'mp/wasm', f))
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // relative base so the build runs from any host or sub-path
  base: './',
  plugins: [react(), ...(mode === 'beta' ? [auraModels()] : [])],
  // the photo check's models are imported as bytes
  assetsInclude: ['**/*.tflite'],
}))
