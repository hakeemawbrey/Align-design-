// Review on your own computer: plays the videos you downloaded (or Instagram's
// player for ones you haven't) and saves every call to data/decisions.json.
//   npm run review        → http://localhost:4545
import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from './build.mjs'
import { MEDIA, cleanDecision, loadDecisions, loadItems, mediaIndex, saveDecisions } from './items.mjs'
import { writeSpec } from './brief.mjs'

const TYPES = { '.mp4': 'video/mp4', '.mov': 'video/quicktime', '.webm': 'video/webm', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' }

function shell(body) {
  return `<!doctype html><html><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>[hidden]{display:none!important}</style></head><body>${body}</body></html>`
}

/** Serve a file with Range support, so videos seek. */
function sendFile(req, res, file) {
  const size = statSync(file).size
  const type = TYPES[path.extname(file).toLowerCase()] ?? 'application/octet-stream'
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.range ?? '')
  if (m) {
    const start = m[1] ? Number(m[1]) : size - Number(m[2])
    const end = m[1] && m[2] ? Number(m[2]) : size - 1
    res.writeHead(206, { 'content-type': type, 'content-range': `bytes ${start}-${end}/${size}`, 'accept-ranges': 'bytes', 'content-length': end - start + 1 })
    createReadStream(file, { start, end }).pipe(res)
  } else {
    res.writeHead(200, { 'content-type': type, 'content-length': size, 'accept-ranges': 'bytes' })
    createReadStream(file).pipe(res)
  }
}

export function makeServer() {
  const ids = new Set(loadItems().map((i) => i.id))
  let page = null
  let specTimer = null
  const respec = () => { clearTimeout(specTimer); specTimer = setTimeout(() => { try { writeSpec() } catch (e) { console.error('Could not write out/GENERATOR.md:', e.message) } }, 1500) }
  return createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost')
    try {
      if (url.pathname === '/' || url.pathname === '/index.html') {
        page ??= build({ write: false }).html
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
        return res.end(shell(page))
      }
      if (url.pathname === '/api/state') {
        res.writeHead(200, { 'content-type': 'application/json' })
        return res.end(JSON.stringify({ decisions: loadDecisions(), media: mediaIndex() }))
      }
      if (url.pathname === '/api/decision' && req.method === 'POST') {
        let raw = ''
        for await (const c of req) { raw += c; if (raw.length > 1e5) throw new Error('too big') }
        const { id, decision } = JSON.parse(raw)
        if (!ids.has(id)) { res.writeHead(400); return res.end('unknown post') }
        const all = loadDecisions()
        all[id] = cleanDecision(decision)
        saveDecisions(all)
        respec()
        res.writeHead(204); return res.end()
      }
      if (url.pathname.startsWith('/media/')) {
        const file = path.resolve(MEDIA, decodeURIComponent(url.pathname.slice(7)))
        if (!file.startsWith(MEDIA + path.sep) || !existsSync(file)) { res.writeHead(404); return res.end() }
        return sendFile(req, res, file)
      }
      res.writeHead(404); res.end()
    } catch (e) {
      res.writeHead(500); res.end(String(e.message))
    }
  })
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 4545)
  makeServer().listen(port, '127.0.0.1', () => {
    console.log(`Review at http://localhost:${port}  (${Object.keys(mediaIndex()).length} posts downloaded; Ctrl+C to stop)`)
  })
}
