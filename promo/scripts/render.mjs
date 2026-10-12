// Frame-exact renderer. Serves the repo root, seeks the composition to each
// frame time and screenshots it, then encodes with ffmpeg.
//   node promo/scripts/render.mjs                 → promo/out/align-promo.mp4
//   node promo/scripts/render.mjs --stills=1,4.2  → promo/out/stills/*.png
//   node promo/scripts/render.mjs --sheet         → contact sheet (2 fps)
//   --teaser=<id> renders a vertical teaser (promo/teaser.html?t=<id>) → promo/out/teasers/<id>.mp4
//   --vertical renders the 9:16 (1080×1920) cut
//   options: --fps=30 --from=0 --to=30 --workers=4 --out=path.mp4
import { createRequire } from 'node:module'
import { createServer } from 'node:http'
import { readFile, mkdir, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(here, '../..')
const require = createRequire(path.join(ROOT, 'app/package.json'))
const { chromium } = require('playwright')

const arg = (k, d) => { const a = process.argv.find(x => x.startsWith(`--${k}=`)); return a ? a.split('=')[1] : (process.argv.includes(`--${k}`) ? true : d) }
const TEASER = arg('teaser')
const FPS = Number(arg('fps', 30)), FROM = Number(arg('from', 0)), WORKERS = Number(arg('workers', 4))
let TO = Number(arg('to', TEASER ? 0 : 31.5))
const VERT = !!arg('vertical') || !!TEASER
const [VW, VH] = VERT ? [1080, 1920] : [1920, 1080]
const OUT = path.resolve(arg('out', path.join(ROOT, TEASER ? `promo/out/teasers/${TEASER}.mp4` : VERT ? 'promo/out/align-promo-vertical.mp4' : 'promo/out/align-promo.mp4')))

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.json': 'application/json' }
const server = createServer(async (req, res) => {
  const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]))
  try { const b = await readFile(p); res.writeHead(200, { 'content-type': MIME[path.extname(p)] || 'application/octet-stream' }); res.end(b) }
  catch { res.writeHead(404); res.end() }
}).listen(0)
const port = server.address().port
const URL_ = TEASER ? `http://127.0.0.1:${port}/promo/teaser.html?render&v&t=${TEASER}` : `http://127.0.0.1:${port}/promo/index.html?render${VERT ? '&v' : ''}`

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--force-color-profile=srgb', '--disable-lcd-text'] }).catch(() => chromium.launch())
async function newPage() {
  const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1 })
  page.on('pageerror', e => console.error('PAGE ERROR', e.message))
  await page.goto(URL_)
  await page.waitForFunction(() => window.ready === true, null, { timeout: 60000 })
  return page
}
async function shoot(page, t, file, type = 'jpeg') {
  await page.evaluate(t => window.seek(t), t)
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))
  await page.screenshot({ path: file, type, ...(type === 'jpeg' ? { quality: 96 } : {}) })
}

if (TEASER && !TO) { const p = await newPage(); TO = await p.evaluate(() => window.DURATION); await p.close() }
const stills = arg('stills')
const sheet = arg('sheet')
if (stills || sheet) {
  const dir = path.resolve(arg('dir', path.join(ROOT, 'promo/out/stills'))); await mkdir(dir, { recursive: true })
  const times = sheet ? Array.from({ length: Math.round((TO - FROM) * Number(arg('rate', 2))) }, (_, i) => FROM + i / Number(arg('rate', 2))) : String(stills).split(',').map(Number)
  const page = await newPage()
  const files = []
  for (const t of times) { const f = path.join(dir, `t${t.toFixed(2).padStart(6, '0')}.jpg`); await shoot(page, t, f); files.push(f) }
  if (sheet) {
    const cols = 6
    const r = spawnSync('ffmpeg', ['-v', 'error', '-y', '-pattern_type', 'glob', '-i', path.join(dir, 't*.jpg'), '-vf', `scale=480:-1,tile=${cols}x${Math.ceil(files.length / cols)}:padding=4:color=white`, '-frames:v', '1', path.join(dir, 'sheet.jpg')])
    if (r.status) console.error(r.stderr.toString())
    console.log('sheet →', path.join(dir, 'sheet.jpg'))
  } else console.log(files.join('\n'))
} else {
  const dir = path.join(ROOT, 'promo/out/frames', path.basename(OUT, '.mp4')); await rm(dir, { recursive: true, force: true }); await mkdir(dir, { recursive: true })
  const n = Math.round((TO - FROM) * FPS)
  let done = 0
  const t0 = Date.now()
  await Promise.all(Array.from({ length: WORKERS }, async (_, w) => {
    const page = await newPage()
    for (let i = w; i < n; i += WORKERS) {
      await shoot(page, FROM + i / FPS, path.join(dir, `f${String(i).padStart(5, '0')}.jpg`))
      if (++done % 60 === 0) console.log(`${done}/${n} frames  ${((Date.now() - t0) / 1000).toFixed(0)}s`)
    }
  }))
  await mkdir(path.dirname(OUT), { recursive: true })
  const audio = TEASER ? path.join(ROOT, `promo/out/teasers/${TEASER}.wav`) : path.join(ROOT, 'promo/out/soundtrack.wav')
  const a = existsSync(audio) && !arg('mute') ? ['-i', audio] : []
  const r = spawnSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', path.join(dir, 'f%05d.jpg'), ...a,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    ...(a.length ? ['-c:a', 'aac', '-b:a', '192k', '-shortest'] : []), OUT])
  if (r.status) console.error(r.stderr.toString())
  else {
    console.log('video →', OUT)
    const share = OUT.replace(/\.mp4$/, '-share.mp4')
    spawnSync('ffmpeg', ['-v', 'error', '-y', '-i', OUT, '-c:v', 'libx264', '-preset', 'slow', '-b:v', '6500k', '-maxrate', '8000k', '-bufsize', '12000k', '-c:a', 'copy', '-movflags', '+faststart', share])
    console.log('share copy →', share)
  }
}
await browser.close(); server.close()
