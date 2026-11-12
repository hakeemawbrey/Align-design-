// Render Align World story reels: script JSON → narration (Kokoro, with word
// timings) → frames (engine.js + three.js in Chromium) → score and effects
// (score.py) → MP4.
//
//   node reels/world/render.mjs                 # every script
//   node reels/world/render.mjs card-flips      # by id
//   node reels/world/render.mjs --stills        # a contact sheet of every shot
//   node reels/world/render.mjs --from 20 --to 26   # a slice (seconds), for checking

import { createRequire } from 'node:module'
import { spawn, execFileSync } from 'node:child_process'
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
const VALUED = ['--out', '--from', '--to']
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d }
const stills = flag('--stills')
const outDir = path.resolve(opt('--out', path.join(REPO, 'reels/out/world')))
const from = Number(opt('--from', 0))
const to = opt('--to') ? Number(opt('--to')) : null
const picks = args.filter((a, i) => !a.startsWith('--') && !VALUED.includes(args[i - 1]))

const scriptsDir = path.join(HERE, 'scripts')
let files = readdirSync(scriptsDir).filter((f) => f.endsWith('.json')).sort()
if (picks.length) files = files.filter((f) => picks.some((p) => f.includes(p)))
mkdirSync(outDir, { recursive: true })

const HOST = 'http://world.local/'
const fontDir = path.join(MODULES, '@fontsource')
const FONTS = [
  ['Poppins', `${HOST}fonts/poppins/files/poppins-latin-900-normal.woff2`, 'normal', '900'],
  ['Poppins', `${HOST}fonts/poppins/files/poppins-latin-800-normal.woff2`, 'normal', '800'],
  ['EB Garamond', `${HOST}fonts/eb-garamond/files/eb-garamond-latin-500-italic.woff2`, 'italic', '500'],
  ['Space Mono', `${HOST}fonts/space-mono/files/space-mono-latin-400-normal.woff2`, 'normal', '400'],
]
const INDEX = `<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0;background:#000">
<canvas id="c" width="1080" height="1920"></canvas>
<script type="importmap">{"imports":{"three":"${HOST}three/three.module.js","three/addons/":"${HOST}addons/"}}</script>
<script type="module" src="${HOST}engine.js"></script>
</body></html>`
const TYPES = { '.js': 'text/javascript', '.woff2': 'font/woff2', '.html': 'text/html' }
function serve(url) {
  const p = url.slice(HOST.length).split('?')[0]
  if (p === 'index.html') return INDEX
  if (p === 'engine.js') return path.join(HERE, 'engine.js')
  if (p.startsWith('three/')) return path.join(MODULES, 'three/build', p.slice(6))
  if (p.startsWith('addons/')) return path.join(MODULES, 'three/examples/jsm', p.slice(7))
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

// Narration: Kokoro (reels/affirm's voice.py), one clip per scene, with word timings.
function narrate(script, dir) {
  const vjson = path.join(dir, 'voice.json')
  const req = { voice: script.voice || 'am_puck', speed: script.speed || 1.05, scenes: script.scenes.map((s) => ({ text: s.text, words: s.text.split(/\s+/), pause: 0.2 })) }
  const reqFile = path.join(dir, 'request.json')
  const same = existsSync(reqFile) && readFileSync(reqFile, 'utf8') === JSON.stringify(req)
  if (!same || !existsSync(vjson)) {
    writeFileSync(reqFile, JSON.stringify(req))
    const py = path.join(REPO, 'reels/affirm/.voice/venv/bin/python')
    if (!existsSync(py)) throw new Error('no voice yet: run bash reels/affirm/setup.sh once')
    execFileSync(py, [path.join(REPO, 'reels/affirm/voice.py'), reqFile, dir], { stdio: 'inherit' })
  }
  return JSON.parse(readFileSync(vjson, 'utf8'))
}

async function renderOne(browser, file) {
  const script = JSON.parse(readFileSync(path.join(scriptsDir, file), 'utf8'))
  const work = path.join(outDir, script.id)
  mkdirSync(work, { recursive: true })
  const voice = narrate(script, work)
  const page = await browser.newPage({ viewport: { width: 540, height: 960 } })
  page.on('pageerror', (e) => console.error(`[${script.id}]`, e.message))
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.error(`[${script.id}]`, m.text()) })
  await page.route(`${HOST}**`, (route) => {
    const hit = serve(route.request().url())
    if (hit === INDEX) return route.fulfill({ body: INDEX, contentType: 'text/html' })
    if (!hit || !existsSync(hit)) return route.fulfill({ status: 404, body: '' })
    return route.fulfill({ body: readFileSync(hit), contentType: TYPES[path.extname(hit)] || 'application/octet-stream' })
  })
  await page.goto(`${HOST}index.html`)
  await page.waitForFunction(() => typeof window.setup === 'function', null, { timeout: 60000 })
  const info = await page.evaluate(([s, a]) => window.setup(s, a), [script, { fonts: FONTS, voice }])
  writeFileSync(path.join(work, 'timeline.json'), JSON.stringify(info, null, 1))
  const grab = async (t) => Buffer.from((await page.evaluate((t) => window.frame(t), t)).split(',')[1], 'base64')

  if (stills) {
    const dir = path.join(work, 'stills')
    mkdirSync(dir, { recursive: true })
    const times = info.scenes.map((s) => s.start + (s.end - s.start) * 0.7)
    times.push(info.duration - 0.4)
    for (const [i, t] of times.entries()) writeFileSync(path.join(dir, `${String(i).padStart(2, '0')}.jpg`), await grab(t))
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-pattern_type', 'glob', '-i', path.join(dir, '*.jpg'),
      '-vf', `scale=216:-1,tile=9x2:padding=6:color=0x0b0712`, '-frames:v', '1', path.join(outDir, `${script.id}-stills.jpg`)])
    await page.close()
    console.log(`stills → ${path.relative(REPO, path.join(outDir, `${script.id}-stills.jpg`))}`)
    return
  }

  // narration track, laid on the timeline
  const voiceWav = path.join(work, 'voice-track.wav')
  const inputs = []
  const delays = []
  info.scenes.forEach((s, i) => { inputs.push('-i', path.join(work, voice.scenes[i].wav)); const ms = Math.round(s.vStart * 1000); delays.push(`[${i}:a]adelay=${ms}|${ms},apad[a${i}]`) })
  execFileSync('ffmpeg', ['-v', 'error', '-y', ...inputs, '-filter_complex',
    `${delays.join(';')};${info.scenes.map((_, i) => `[a${i}]`).join('')}amix=inputs=${info.scenes.length}:normalize=0,atrim=0:${info.duration.toFixed(3)}[v]`,
    '-map', '[v]', '-ar', '44100', '-ac', '1', voiceWav])
  // score + effects, ducked under the voice
  const mixWav = path.join(work, 'mix.wav')
  writeFileSync(path.join(work, 'cues.json'), JSON.stringify({ duration: info.duration, scenes: info.scenes, words: info.words }))
  execFileSync('python3', ['-I', path.join(HERE, 'score.py'), path.join(work, 'cues.json'), voiceWav, mixWav], { stdio: 'inherit' })

  const end = to ?? info.duration
  const first = Math.round(from * 30)
  const last = Math.round(end * 30)
  const slice = from > 0 || to != null
  const mp4 = path.join(outDir, `${script.id}${slice ? `-${from}-${end}` : ''}.mp4`)
  const ff = spawn('ffmpeg', ['-v', 'error', '-y',
    '-f', 'image2pipe', '-framerate', '30', '-c:v', 'mjpeg', '-i', '-',
    '-ss', String(from), '-i', mixWav,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-maxrate', '10M', '-bufsize', '20M',
    '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', mp4,
  ], { stdio: ['pipe', 'inherit', 'inherit'] })
  const done = new Promise((res, rej) => ff.on('close', (c) => (c ? rej(new Error(`ffmpeg ${c}`)) : res())))
  const t0 = Date.now()
  for (let f = first; f < last; f++) {
    const buf = await grab(f / 30)
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r))
    if ((f - first) % 150 === 0) console.log(`${script.id}: frame ${f}/${last} (${((Date.now() - t0) / 1000).toFixed(0)}s)`)
  }
  ff.stdin.end()
  await done
  if (!slice) {
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', mp4, '-vf', 'scale=720:-2', '-c:v', 'libx264', '-preset', 'slow',
      '-crf', '24', '-maxrate', '2.5M', '-bufsize', '5M', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k',
      '-movflags', '+faststart', path.join(outDir, `${script.id}.web.mp4`)])
  }
  await page.close()
  console.log(`${script.id}: ${last - first} frames in ${((Date.now() - t0) / 1000).toFixed(0)}s → ${path.relative(REPO, mp4)}`)
}

const browser = await launch()
for (const f of files) await renderOne(browser, f)
await browser.close()
