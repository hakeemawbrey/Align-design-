// Render the star pause challenge: reel.json → frames (scene.js in Chromium, WebGL) → MP4 with an original score.
//
//   node reels/pause/render.mjs                 # full reel → reels/out/pause/<id>.mp4 (+ .web.mp4, cover, answer key)
//   node reels/pause/render.mjs --stills        # cover + the three aligned frames and their neighbours, no video
//   options: --config <file> (default reel.json) · --out <dir>
import { createRequire } from 'node:module'
import { spawn, execFileSync } from 'node:child_process'
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(HERE, '../..')
const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const args = process.argv.slice(2)
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d }
const stills = args.includes('--stills')
const cfg = JSON.parse(readFileSync(path.resolve(HERE, opt('--config', 'reel.json')), 'utf8'))
const out = path.resolve(opt('--out', path.join(REPO, 'reels/out/pause')))
mkdirSync(out, { recursive: true })
const NM = path.join(HERE, 'node_modules')
if (!existsSync(path.join(NM, 'three'))) throw new Error('run npm install in reels/pause first')

const TYPES = { js: 'text/javascript', html: 'text/html', woff2: 'font/woff2' }
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] })
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 })
page.on('pageerror', (e) => console.error('page error:', e.message))
page.on('console', (m) => m.type() === 'error' && console.error('console:', m.text()))
await page.route('http://reel.local/**', (route) => {
  const p = new URL(route.request().url()).pathname
  const file = p === '/' ? path.join(HERE, 'page.html')
    : p.startsWith('/three/') ? path.join(NM, p)
    : p.startsWith('/font/') ? path.join(NM, '@fontsource', p.slice(6).replace(/^([^/]+)\//, '$1/files/'))
    : path.join(HERE, p)
  if (!existsSync(file)) return route.fulfill({ status: 404, body: 'missing ' + p })
  route.fulfill({ body: readFileSync(file), contentType: TYPES[path.extname(file).slice(1)] || 'application/octet-stream' })
})
await page.addInitScript((c) => { window.REEL = c }, cfg)
await page.goto('http://reel.local/')
await page.waitForFunction(() => window.READY === true, null, { timeout: 60000 })
await page.evaluate(() => document.fonts.ready)
const { total, align } = await page.evaluate(() => ({ total: window.TOTAL_FRAMES, align: window.ALIGN_FRAMES }))

const shot = async (f, file) => {
  await page.evaluate((f) => window.renderFrame(f), f)
  const buf = await page.screenshot({ type: 'jpeg', quality: 95 })
  if (file) writeFileSync(file, buf)
  return buf
}
const fmt = (f) => `${(f / cfg.fps).toFixed(2)}s (frame ${f})`
const key = cfg.rounds.map((rd, i) => `${rd.label}: ${fmt(align[i])}`).join('\n')
writeFileSync(path.join(out, `${cfg.id}.answers.txt`), `Exact aligned frames at ${cfg.fps} fps:\n${key}\n`)
writeFileSync(path.join(out, `${cfg.id}.caption.txt`), `${cfg.caption}\n\n${cfg.hashtags.map((h) => '#' + h).join(' ')}\n`)
await shot(Math.round(cfg.intro * cfg.fps * 0.75), path.join(out, `${cfg.id}.cover.jpg`))

if (stills) {
  const sd = path.join(out, 'stills'); mkdirSync(sd, { recursive: true })
  for (const [i, f] of align.entries()) for (const d of [-1, 0, 1]) await shot(f + d, path.join(sd, `${cfg.rounds[i].label.toLowerCase()}-${d === 0 ? 'fit' : d < 0 ? 'before' : 'after'}.jpg`))
  await shot(total - 20, path.join(sd, 'outro.jpg'))
  console.log(`stills → ${sd}\n${key}`)
  await browser.close(); process.exit(0)
}

const wav = path.join(out, `${cfg.id}.wav`)
execFileSync('python3', [path.join(HERE, 'score.py'), path.join(HERE, opt('--config', 'reel.json')), wav], { stdio: 'inherit' })
const mp4 = path.join(out, `${cfg.id}.mp4`)
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(cfg.fps), '-c:v', 'mjpeg', '-i', '-', '-i', wav,
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-movflags', '+faststart',
  '-c:a', 'aac', '-b:a', '192k', '-shortest', mp4], { stdio: ['pipe', 'inherit', 'inherit'] })
const t0 = Date.now()
for (let f = 0; f < total; f++) {
  const buf = await shot(f)
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r))
  if (f % 60 === 0) process.stdout.write(`\r${f}/${total} frames · ${((Date.now() - t0) / 1000).toFixed(0)}s`)
}
ff.stdin.end()
await new Promise((r, j) => ff.on('close', (c) => (c ? j(new Error('ffmpeg ' + c)) : r())))
await browser.close()
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', mp4, '-vf', 'scale=720:-2', '-c:v', 'libx264', '-crf', '24', '-preset', 'fast', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', mp4.replace(/\.mp4$/, '.web.mp4')])
console.log(`\n→ ${mp4}\n${key}`)
