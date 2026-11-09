// Render Align "In this town" story reels: script JSON → narrator (Kokoro,
// via reels/affirm/voice.py) → frames (engine.js + three.js in Chromium) →
// MP4 with the voice over an original music bed (mix.py).
//
//   node reels/story/render.mjs                 # every script
//   node reels/story/render.mjs cards-flip      # by id
//   node reels/story/render.mjs --stills        # one frame per shot, as a contact sheet
//   node reels/story/render.mjs --jobs 3

import { createRequire } from 'node:module'
import { spawn, execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(HERE, '../..')
const MODULES = path.join(REPO, 'carousel/node_modules')
const require = createRequire(path.join(REPO, 'carousel', 'package.json'))
const { chromium } = require('playwright')

const args = process.argv.slice(2)
const flag = (n) => args.includes(n)
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d }
const stills = flag('--stills')
const jobs = Number(opt('--jobs', 1))
const outDir = path.resolve(opt('--out', path.join(REPO, 'reels/out/story')))
const picks = args.filter((a, i) => !a.startsWith('--') && !['--jobs', '--out'].includes(args[i - 1]))

const scriptsDir = path.join(HERE, 'scripts')
let files = readdirSync(scriptsDir).filter((f) => f.endsWith('.json')).sort()
if (picks.length) files = files.filter((f) => picks.some((p) => f.includes(p)))
mkdirSync(outDir, { recursive: true })

const VENV_PY = path.join(REPO, 'reels/affirm/.voice/venv/bin/python')
if (!existsSync(VENV_PY)) { console.error('Run reels/affirm/setup.sh first (it installs the narrator voice).'); process.exit(1) }

const HOST = 'http://story.local/'
const fontDir = path.join(MODULES, '@fontsource')
const FONTS = [
  ['Poppins', `${HOST}fonts/poppins/files/poppins-latin-800-normal.woff2`, 'normal', '800'],
  ['Poppins', `${HOST}fonts/poppins/files/poppins-latin-700-normal.woff2`, 'normal', '700'],
  ['Poppins', `${HOST}fonts/poppins/files/poppins-latin-600-normal.woff2`, 'normal', '600'],
  ['EB Garamond', `${HOST}fonts/eb-garamond/files/eb-garamond-latin-500-italic.woff2`, 'italic', '500'],
  ['EB Garamond', `${HOST}fonts/eb-garamond/files/eb-garamond-latin-400-italic.woff2`, 'italic', '400'],
  ['EB Garamond', `${HOST}fonts/eb-garamond/files/eb-garamond-latin-500-normal.woff2`, 'normal', '500'],
  ['Space Mono', `${HOST}fonts/space-mono/files/space-mono-latin-400-normal.woff2`, 'normal', '400'],
  ['Space Mono', `${HOST}fonts/space-mono/files/space-mono-latin-700-normal.woff2`, 'normal', '700'],
]
const SIGNS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const IMAGES = Object.fromEntries(SIGNS.map((s) => [`aura:${s}`, `${HOST}img/aura/${s}.jpg`]))
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

// The narrator: one clip per shot, with when each caption word is said.
function speak(script) {
  const req = {
    voice: script.voice || 'am_michael',
    speed: script.speed || 1.05,
    scenes: script.shots.map((s) => ({ text: s.say, words: s.say.split(/\s+/).filter(Boolean), pause: 0.12 })),
  }
  const hash = createHash('sha1').update(JSON.stringify(req)).digest('hex').slice(0, 10)
  const dir = path.join(outDir, 'voice', `${script.id}-${hash}`)
  if (!existsSync(path.join(dir, 'voice.json'))) {
    mkdirSync(dir, { recursive: true })
    writeFileSync(path.join(dir, 'request.json'), JSON.stringify(req))
    execFileSync(VENV_PY, [path.join(REPO, 'reels/affirm/voice.py'), path.join(dir, 'request.json'), dir], { stdio: 'inherit' })
  }
  return { dir, voice: JSON.parse(readFileSync(path.join(dir, 'voice.json'), 'utf8')) }
}

async function renderOne(browser, file) {
  const script = JSON.parse(readFileSync(path.join(scriptsDir, file), 'utf8'))
  const { dir: vdir, voice } = speak(script)
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
  const info = await page.evaluate(([s, a, v]) => window.setup(s, a, v), [script, { fonts: FONTS, images: IMAGES }, voice])
  const grab = async (t) => Buffer.from((await page.evaluate((t) => window.frame(t), t)).split(',')[1], 'base64')

  if (stills) {
    const dir = path.join(outDir, 'stills', script.id)
    mkdirSync(dir, { recursive: true })
    const times = info.shots.map((s) => s.start + Math.min(s.dur * 0.6, s.dur - 0.1))
    for (const [i, t] of times.entries()) writeFileSync(path.join(dir, `${String(i).padStart(2, '0')}.jpg`), await grab(t))
    const cols = Math.ceil(times.length / 3)
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-pattern_type', 'glob', '-i', path.join(dir, '*.jpg'),
      '-vf', `scale=270:-1,tile=${cols}x3:padding=6:color=0x0b0712`, '-frames:v', '1', path.join(outDir, 'stills', `${script.id}.jpg`)])
    await page.close()
    console.log(`stills ${script.id} → ${path.relative(REPO, path.join(outDir, 'stills', `${script.id}.jpg`))}`)
    return
  }

  const tl = path.join(vdir, 'timeline.json')
  writeFileSync(tl, JSON.stringify({ duration: info.duration, shots: info.shots, seed: SIGNS.indexOf(script.sign) + 1 }))
  const wav = path.join(outDir, `${script.id}.wav`)
  execFileSync(VENV_PY, [path.join(HERE, 'mix.py'), vdir, tl, wav], { stdio: 'inherit' })
  const mp4 = path.join(outDir, `${script.id}.mp4`)
  const ff = spawn('ffmpeg', ['-v', 'error', '-y',
    '-f', 'image2pipe', '-framerate', '30', '-c:v', 'mjpeg', '-i', '-',
    '-i', wav,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-maxrate', '10M', '-bufsize', '20M',
    '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', mp4,
  ], { stdio: ['pipe', 'inherit', 'inherit'] })
  const done = new Promise((res, rej) => ff.on('close', (c) => (c ? rej(new Error(`ffmpeg ${c}`)) : res())))
  const t0 = Date.now()
  for (let f = 0; f < info.frames; f++) {
    const buf = await grab(f / 30)
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r))
    if (f % 300 === 0) console.log(`${script.id}: frame ${f}/${info.frames}`)
  }
  ff.stdin.end()
  await done
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', mp4, '-vf', 'scale=720:-2', '-c:v', 'libx264', '-preset', 'slow',
    '-crf', '24', '-maxrate', '2.5M', '-bufsize', '5M', '-pix_fmt', 'yuv420p', '-c:a', 'copy',
    '-movflags', '+faststart', path.join(outDir, `${script.id}.web.mp4`)])
  await page.close()
  console.log(`${script.id}: ${info.frames} frames (${info.duration.toFixed(1)}s) in ${((Date.now() - t0) / 1000).toFixed(0)}s → ${path.relative(REPO, mp4)}`)
}

const browser = await launch()
const queue = [...files]
await Promise.all(Array.from({ length: Math.min(jobs, queue.length) }, async () => {
  while (queue.length) await renderOne(browser, queue.shift())
}))
await browser.close()
