// npm run dev — serves the player at http://localhost:5178
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { ROOT } from './content.mjs'

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.json': 'application/json', '.woff2': 'font/woff2', '.css': 'text/css', '.png': 'image/png',
}

export function serve(port = 5178) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://x')
    let p = decodeURIComponent(url.pathname)
    if (p === '/') p = '/index.html'
    const file = path.join(ROOT, p)
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404).end('not found')
      return
    }
    let body = fs.readFileSync(file)
    // index.html is written for the Artifact host, which adds the doctype.
    if (p === '/index.html') body = Buffer.concat([Buffer.from('<!doctype html>\n<meta charset="utf-8">\n'), body])
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' })
    res.end(body)
  })
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)))
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = +(process.env.PORT || 5178)
  await serve(port)
  console.log(`zodiac.exe player → http://localhost:${port}`)
}
