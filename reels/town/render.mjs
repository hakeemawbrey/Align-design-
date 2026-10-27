// Render Align Town reels: script JSON → frames (engine.js + three.js in
// Chromium) → MP4 with the original ambient score from reels/src/score.py.
//
//   node reels/town/render.mjs                    # every script
//   node reels/town/render.mjs full-moon          # by id
//   node reels/town/render.mjs --stills           # one frame per line, as a contact sheet
//   node reels/town/render.mjs --jobs 2

import { createRequire } from 'node:module'
import { spawn, execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs'
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
const outDir = path.resolve(opt('--out', path.join(REPO, 'reels/out/town')))
const picks = args.filter((a, i) => !a.startsWith('--') && !['--jobs', '--out'].includes(args[i - 1]))

const scriptsDir = path.join(HERE, 'scripts')
let files = readdirSync(scriptsDir).filter((f) => f.endsWith('.json')).sort()
if (picks.length) files = files.filter((f) => picks.some((p) => f.includes(p)))
mkdirSync(outDir, { recursive: true })

const HOST = 'http://town.local/'
const fontDir = path.join(MODULES, '@fontsource')
const FONTS = [
  ['EB Garamond', `${HOST}fonts/eb-garamond/files/eb-garamond-latin-500-italic.woff2`, 'italic', '500'],
  ['EB Garamond', `${HOST}fonts/eb-garamond/files/eb-garamond-latin-400-italic.woff2`, 'italic', '400'],
  ['Space Mono', `${HOST}fonts/space-mono/files/space-mono-latin-400-normal.woff2`, 'normal', '400'],
]
const SIGNS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const IMAGES = {
  ...Object.fromEntries(SIGNS.map((s) => [`figure:${s}`, `${HOST}img/figure/${s}.jpg`])),
  ...Object.fromEntries(SIGNS.map((s) => [`aura:${s}`, `${HOST}img/aura/${s}.jpg`])),
  ...Object.fromEntries([1, 2, 3, 4, 5, 6].map((k, i) => [`person:${i}`, `${HOST}img/people/p${k}.jpg`])),
}
const INDEX = `<!doctype html><html><body style="margin:0;background:#000">
<canvas id="c"></canvas>
<script type="importmap">{"imports":{"three":"${HOST}three/three.module.js"}}</script>
<script type="module" src="${HOST}engine.js"></script>
</body></html>`

const TYPES = { '.js': 'text/javascript', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.html': 'text/html' }
function serve(url) {
  const p = url.slice(HOST.length).split('?')[0]
  if (p === 'index.html') return INDEX
  if (p === 'engine.js') return path.join(HERE, 'engine.js')
  if (p.startsWith('three/')) return path.join(MODULES, 'three/build', p.slice(6))
  if (p.startsWith('img/')) return path.join(REPO, 'app/public', p)
  if (p.startsWith('fonts/')) return path.join(fontDir, p.slice(6))
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
  const { duration, frames, beat } = await page.evaluate(([s, a]) => window.setup(s, a), [script, { fonts: FONTS, images: IMAGES }])
  const grab = async (t) => Buffer.from((await page.evaluate((t) => window.frame(t), t)).split(',')[1], 'base64')

  if (stills) {
    const dir = path.join(outDir, 'stills', script.id)
    mkdirSync(dir, { recursive: true })
    const times = [0.6, ...script.beats.map((_, i) => i * beat + beat * 0.75), ...script.beats.slice(1, 3).map((_, i) => (i + 1) * beat + 0.55), duration - 0.3]
    for (const [i, t] of times.entries()) writeFileSync(path.join(dir, `${String(i).padStart(2, '0')}.jpg`), await grab(t))
    const cols = Math.ceil(times.length / 2)
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-pattern_type', 'glob', '-i', path.join(dir, '*.jpg'),
      '-vf', `scale=270:-1,tile=${cols}x2:padding=6:color=0x0b0712`, '-frames:v', '1', path.join(outDir, 'stills', `${script.id}.jpg`)])
    await page.close()
    console.log(`stills ${script.id} → ${path.relative(REPO, dir)}`)
    return
  }

  const wav = path.join(outDir, `${script.id}.wav`)
  execFileSync('python3', ['-I', path.join(REPO, 'reels/src/score.py'), script.sign, String(duration), String(script.beats.length), wav, String(beat)])
  const mp4 = path.join(outDir, `${script.id}.mp4`)
  const ff = spawn('ffmpeg', ['-v', 'error', '-y',
    '-f', 'image2pipe', '-framerate', '30', '-c:v', 'mjpeg', '-i', '-',
    '-i', wav,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-maxrate', '8M', '-bufsize', '16M',
    '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', mp4,
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
  await page.close()
  console.log(`${script.id}: ${frames} frames in ${((Date.now() - t0) / 1000).toFixed(0)}s → ${path.relative(REPO, mp4)}`)
}

const browser = await launch()
const queue = [...files]
await Promise.all(Array.from({ length: Math.min(jobs, queue.length) }, async () => {
  while (queue.length) await renderOne(browser, queue.shift())
}))
await browser.close()
