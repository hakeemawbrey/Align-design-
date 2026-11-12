// Render Align Morning reels: script JSON → frames (engine.js + three.js in
// Chromium) → MP4, scored with the Signs music generator (reels/signs/score.py).
//
//   node reels/morning/render.mjs                 # every script
//   node reels/morning/render.mjs winter          # by id
//   node reels/morning/render.mjs --stills        # one frame per room, as a contact sheet
//   node reels/morning/render.mjs --jobs 2

import { createRequire } from 'node:module'
import { spawn, execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(HERE, '../..')
// Playwright, three and the fonts come from the carousel package's node_modules.
const MODULES = path.join(REPO, 'carousel/node_modules')
const require = createRequire(path.join(REPO, 'carousel', 'package.json'))
const { chromium } = require('playwright')

const args = process.argv.slice(2)
const flag = (n) => args.includes(n)
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d }
const stills = flag('--stills')
const jobs = Number(opt('--jobs', 1))
const outDir = path.resolve(opt('--out', path.join(REPO, 'reels/out/morning')))
const picks = args.filter((a, i) => !a.startsWith('--') && !['--jobs', '--out'].includes(args[i - 1]))

const scriptsDir = path.join(HERE, 'scripts')
let files = readdirSync(scriptsDir).filter((f) => f.endsWith('.json')).sort()
if (picks.length) files = files.filter((f) => picks.some((p) => f.includes(p)))
mkdirSync(outDir, { recursive: true })

const HOST = 'http://morning.local/'
const FONTS = [
  ['Poppins', `${HOST}fonts/poppins/files/poppins-latin-600-normal.woff2`, 'normal', '600'],
  ['Poppins', `${HOST}fonts/poppins/files/poppins-latin-700-normal.woff2`, 'normal', '700'],
  ['Poppins', `${HOST}fonts/poppins/files/poppins-latin-800-normal.woff2`, 'normal', '800'],
  ['EB Garamond', `${HOST}fonts/eb-garamond/files/eb-garamond-latin-500-italic.woff2`, 'italic', '500'],
]
const INDEX = `<!doctype html><html><body style="margin:0;background:#000">
<canvas id="c"></canvas>
<script type="importmap">{"imports":{"three":"${HOST}three/three.module.js"}}</script>
<script type="module" src="${HOST}engine.js"></script>
</body></html>`

const TYPES = { '.js': 'text/javascript', '.woff2': 'font/woff2', '.html': 'text/html' }
function serve(url) {
  const p = url.slice(HOST.length).split('?')[0]
  if (p === 'index.html') return INDEX
  if (p === 'engine.js') return path.join(HERE, 'engine.js')
  if (p.startsWith('three/')) return path.join(MODULES, 'three/build', p.slice(6))
  if (p.startsWith('fonts/')) return path.join(MODULES, '@fontsource', p.slice(6))
  return null
}

async function launch() {
  const opts = { args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] }
  try { return await chromium.launch(opts) } catch (e) {
    const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers'
    if (existsSync(path.join(base, 'chromium'))) return chromium.launch({ ...opts, executablePath: path.join(base, 'chromium') })
    throw e
  }
}

async function renderOne(browser, file) {
  const script = JSON.parse(readFileSync(path.join(scriptsDir, file), 'utf8'))
  const page = await browser.newPage({ viewport: { width: 540, height: 960 } })
  page.on('pageerror', (e) => console.error(`[${script.id}]`, e.message))
  page.on('console', (m) => { if (m.type() === 'error') console.error(`[${script.id}]`, m.text()) })
  await page.route(`${HOST}**`, (route) => {
    const hit = serve(route.request().url())
    if (hit === INDEX) return route.fulfill({ body: INDEX, contentType: 'text/html' })
    if (!hit || !existsSync(hit)) return route.fulfill({ status: 404, body: '' })
    return route.fulfill({ body: readFileSync(hit), contentType: TYPES[path.extname(hit)] || 'application/octet-stream' })
  })
  await page.goto(`${HOST}index.html`)
  await page.waitForFunction(() => typeof window.setup === 'function')
  const { duration, frames, beat, hook } = await page.evaluate(([s, a]) => window.setup(s, a), [script, { fonts: FONTS }])
  const grab = async (t) => Buffer.from((await page.evaluate((t) => window.frame(t), t)).split(',')[1], 'base64')

  if (stills) {
    const dir = path.join(outDir, 'stills', script.id)
    rmSync(dir, { recursive: true, force: true })
    mkdirSync(dir, { recursive: true })
    const times = [1.2, ...script.beats.map((_, i) => hook + i * beat + beat * 0.8), hook + 0.5, duration - 0.3]
    for (const [i, t] of times.entries()) writeFileSync(path.join(dir, `${String(i).padStart(2, '0')}.jpg`), await grab(t))
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-pattern_type', 'glob', '-i', path.join(dir, '*.jpg'),
      '-vf', 'scale=270:-1,tile=8x2:padding=6:color=0x1d2350', '-frames:v', '1', path.join(outDir, 'stills', `${script.id}.jpg`)])
    await page.close()
    console.log(`stills ${script.id} → ${path.relative(REPO, dir)}`)
    return
  }

  // score.py writes <id>.wav, masters it to -14 LUFS and prints the mastered file's path
  const wav = execFileSync('python3', [path.join(REPO, 'reels/signs/score.py'), script.music || 'musicbox', String(duration + 0.5), String(script.seed || 1), path.join(outDir, `${script.id}.wav`)], { stdio: ['ignore', 'pipe', 'inherit'] }).toString().trim().split('\n').pop()
  const mp4 = path.join(outDir, `${script.id}.mp4`)
  const ff = spawn('ffmpeg', ['-v', 'error', '-y',
    '-f', 'image2pipe', '-framerate', '30', '-c:v', 'mjpeg', '-i', '-',
    '-i', wav,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-maxrate', '8M', '-bufsize', '16M',
    '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-af', `afade=t=out:st=${(duration - 1.2).toFixed(2)}:d=1.2`,
    '-shortest', '-movflags', '+faststart', mp4,
  ], { stdio: ['pipe', 'inherit', 'inherit'] })
  const done = new Promise((res, rej) => ff.on('close', (c) => (c ? rej(new Error(`ffmpeg ${c}`)) : res())))
  const t0 = Date.now()
  for (let f = 0; f < frames; f++) {
    const buf = await grab(f / 30)
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r))
  }
  ff.stdin.end()
  await done
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', mp4, '-vf', 'scale=720:-2', '-c:v', 'libx264', '-preset', 'slow',
    '-crf', '25', '-maxrate', '2M', '-bufsize', '4M', '-pix_fmt', 'yuv420p', '-c:a', 'copy',
    '-movflags', '+faststart', path.join(outDir, `${script.id}.web.mp4`)])
  rmSync(wav, { force: true })
  writeFileSync(path.join(outDir, `${script.id}.txt`), `${script.caption}\n\n${script.hashtags.map((h) => '#' + h).join(' ')}\n`)
  await page.close()
  console.log(`${script.id}: ${frames} frames in ${((Date.now() - t0) / 1000).toFixed(0)}s → ${path.relative(REPO, mp4)}`)
}

const browser = await launch()
const queue = [...files]
await Promise.all(Array.from({ length: Math.min(jobs, queue.length) }, async () => {
  while (queue.length) await renderOne(browser, queue.shift())
}))
await browser.close()
