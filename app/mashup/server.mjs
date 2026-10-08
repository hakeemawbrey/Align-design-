// Tiny static server for the mashup studio and renderer.
//   /mashup/*  → app/mashup        /img/*   → app/public/img
//   /fonts/*   → @fontsource files /media/* → app/mashup/media
//   /api/media → { folder: [urls] } for every picture dropped into mashup/media
import { createServer } from 'node:http'
import { readFile, readdir, stat } from 'node:fs/promises'
import { extname, join, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = resolve(fileURLToPath(new URL('.', import.meta.url)))
const APP = resolve(HERE, '..')
export const MEDIA = join(HERE, 'media')

const ROUTES = [
  ['/mashup/', HERE],
  ['/img/', join(APP, 'public/img')],
  ['/fonts/', join(APP, 'node_modules/@fontsource')],
  ['/media/', MEDIA],
]

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.css': 'text/css', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif', '.avif': 'image/avif',
  '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.m4a': 'audio/mp4',
}
export const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'])

/** every picture in mashup/media/<folder>/, sorted by name */
export async function mediaIndex() {
  const out = {}
  let folders = []
  try { folders = await readdir(MEDIA, { withFileTypes: true }) } catch { return out }
  for (const d of folders) {
    if (!d.isDirectory()) continue
    const files = (await readdir(join(MEDIA, d.name))).filter((f) => IMAGE_EXT.has(extname(f).toLowerCase())).sort()
    if (files.length) out[d.name] = files.map((f) => `/media/${encodeURIComponent(d.name)}/${encodeURIComponent(f)}`)
  }
  return out
}

export function startServer(port = 0) {
  const server = createServer(async (req, res) => {
    try {
      const path = decodeURIComponent(new URL(req.url, 'http://x').pathname)
      if (path === '/' || path === '/mashup' || path === '/mashup/') {
        res.writeHead(302, { location: '/mashup/studio.html' }).end()
        return
      }
      if (path === '/api/media') {
        res.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-store' }).end(JSON.stringify(await mediaIndex()))
        return
      }
      const route = ROUTES.find(([prefix]) => path.startsWith(prefix))
      if (!route) { res.writeHead(404).end('not found'); return }
      const [prefix, dir] = route
      const file = resolve(dir, '.' + path.slice(prefix.length - 1))
      if (file !== dir && !file.startsWith(dir + sep)) { res.writeHead(403).end(); return }
      if (!(await stat(file)).isFile()) throw new Error('not a file')
      res.writeHead(200, { 'content-type': TYPES[extname(file).toLowerCase()] || 'application/octet-stream', 'cache-control': 'no-store' })
      res.end(await readFile(file))
    } catch {
      if (!res.headersSent) res.writeHead(404).end('not found')
    }
  })
  return new Promise((ok) => server.listen(port, '127.0.0.1', () => ok({ server, port: server.address().port })))
}

// `node mashup/server.mjs` → open the studio
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { port } = await startServer(Number(process.env.PORT) || 5180)
  console.log(`Align Mashup Studio → http://localhost:${port}/mashup/studio.html`)
}
