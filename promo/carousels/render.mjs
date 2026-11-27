// Render Star Talk carousels to JPEGs: node promo/carousels/render.mjs [c01 c02 …] [--out=dir]
// Writes <out>/<id>/01.jpg … and <out>/carousels.json (id, title, caption, slides).
import { createRequire } from 'node:module'
import { createServer } from 'node:http'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const here = path.dirname(fileURLToPath(import.meta.url)), root = path.resolve(here, '../..')
const require = createRequire(import.meta.url)
const { chromium } = require('playwright')
const args = process.argv.slice(2), outArg = args.find(a => a.startsWith('--out='))
const OUT = outArg ? path.resolve(outArg.slice(6)) : path.join(root, 'promo/out/carousels')
const IDS = args.filter(a => !a.startsWith('--'))
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.woff2': 'font/woff2', '.png': 'image/png' }
const server = createServer(async (req, res) => {
  const p = path.join(root, decodeURIComponent(req.url.split('?')[0]))
  if (!p.startsWith(root)) { res.writeHead(403); return res.end() }
  try { const b = await readFile(p); res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' }); res.end(b) }
  catch { res.writeHead(404); res.end() }
}).listen(0, '127.0.0.1')
await new Promise(r => server.once('listening', r))
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 1 })
page.on('pageerror', e => console.error('page error:', e.message))
await page.goto(`http://127.0.0.1:${server.address().port}/promo/carousels/index.html`)
await page.waitForFunction(() => window.ready === true, null, { timeout: 30000 })
const all = await page.evaluate(() => window.list())
const meta = []
for (const c of all.filter(c => !IDS.length || IDS.includes(c.id))) {
  const urls = await page.evaluate(id => window.renderAll(id), c.id)
  await mkdir(path.join(OUT, c.id), { recursive: true })
  for (const [i, u] of urls.entries()) await writeFile(path.join(OUT, c.id, `${String(i + 1).padStart(2, '0')}.jpg`), Buffer.from(u.split(',')[1], 'base64'))
  meta.push({ ...c, slides: urls.length }); console.log(c.id, urls.length, 'slides')
}
await writeFile(path.join(OUT, 'carousels.json'), JSON.stringify(meta, null, 1))
await browser.close(); server.close()
