// Render Align frequency reels: script JSON → frames (engine.js + three.js in
// Chromium) → MP4, with the sound written by score.py from the engine's cues.
//
//   node reels/frequency/render.mjs                  # every script
//   node reels/frequency/render.mjs planets          # by id
//   node reels/frequency/render.mjs --stills         # contact sheets only
//   node reels/frequency/render.mjs --full           # the long versions the DMs send
//   node reels/frequency/render.mjs --audio          # redo only the sound of rendered reels
//   node reels/frequency/render.mjs --pfp            # profile picture options
//   node reels/frequency/render.mjs --jobs 2

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
const full = flag('--full')
const audioOnly = flag('--audio')
const pfp = flag('--pfp')
const jobs = Number(opt('--jobs', 1))
const outDir = path.resolve(opt('--out', path.join(REPO, 'reels/out/frequency')))
const picks = args.filter((a, i) => !a.startsWith('--') && !['--jobs', '--out'].includes(args[i - 1]))

const scriptsDir = path.join(HERE, 'scripts')
let files = readdirSync(scriptsDir).filter((f) => f.endsWith('.json')).sort()
if (picks.length) files = files.filter((f) => picks.some((p) => f.includes(p)))
mkdirSync(outDir, { recursive: true })

const HOST = 'http://frequency.local/'
const fontDir = path.join(MODULES, '@fontsource')
const FONTS = [
  ['EB Garamond', `${HOST}fonts/eb-garamond/files/eb-garamond-latin-500-italic.woff2`, 'italic', '500'],
  ['EB Garamond', `${HOST}fonts/eb-garamond/files/eb-garamond-latin-400-italic.woff2`, 'italic', '400'],
  ['Space Mono', `${HOST}fonts/space-mono/files/space-mono-latin-400-normal.woff2`, 'normal', '400'],
  ['Space Mono', `${HOST}fonts/space-mono/files/space-mono-latin-700-normal.woff2`, 'normal', '700'],
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

const ff = (a) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...a])

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
  const info = await page.evaluate(([s, a]) => window.setup(s, a), [script, { fonts: FONTS }])
  const grab = async (t, o = {}) => Buffer.from((await page.evaluate(([t, o]) => window.frame(t, o), [t, o])).split(',')[1], 'base64')

  if (stills) {
    const dir = path.join(outDir, 'stills', script.id)
    rmSync(dir, { recursive: true, force: true })
    mkdirSync(dir, { recursive: true })
    for (const [i, t] of info.stills.entries()) writeFileSync(path.join(dir, `${String(i).padStart(2, '0')}.jpg`), await grab(t))
    const cols = Math.ceil(info.stills.length / 2)
    ff(['-pattern_type', 'glob', '-i', path.join(dir, '*.jpg'),
      '-vf', `scale=270:-1,tile=${cols}x2:padding=6:color=0x0b0620`, '-frames:v', '1', path.join(outDir, 'stills', `${script.id}.jpg`)])
    await page.close()
    console.log(`stills ${script.id} → ${path.relative(REPO, dir)}`)
    return
  }

  if (full) {
    // the long versions for the DMs: the finished scene, held, and the long score.
    // A script can also list variants (one per sign), each with its own poster.
    const dir = path.join(outDir, 'full'); mkdirSync(dir, { recursive: true })
    const runs = [[null, script.full?.seconds || 600], ...(script.full?.variants || []).map((v) => [v, script.full.variantSeconds || 180])]
    for (const [variant, seconds] of runs) {
      const id = variant ? `${script.id}-${variant}` : script.id
      const cues = path.join(dir, `${id}.cues.json`)
      writeFileSync(cues, JSON.stringify(await page.evaluate(([s, v]) => window.fullAudio(s, v), [seconds, variant])))
      const wav = path.join(dir, `${id}.wav`)
      execFileSync('python3', ['-I', path.join(HERE, 'score.py'), cues, wav])
      const still = path.join(dir, `${id}.jpg`)
      writeFileSync(still, await grab(await page.evaluate((v) => window.posterAt(v), variant), { clean: true }))
      ff(['-i', wav, '-c:a', 'aac', '-b:a', '192k', path.join(dir, `${id}.m4a`)])
      ff(['-loop', '1', '-framerate', '1', '-i', still, '-i', wav, '-c:v', 'libx264', '-tune', 'stillimage', '-pix_fmt', 'yuv420p',
        '-r', '1', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', path.join(dir, `${id}.mp4`)])
      rmSync(wav); rmSync(cues)
      console.log(`full ${id}: ${(seconds / 60).toFixed(0)} min → ${path.relative(REPO, dir)}/${id}.m4a, .mp4`)
    }
    await page.close()
    return
  }

  if (pfp) {
    // square crops of the scenes, for the profile picture
    const spec = JSON.parse(readFileSync(path.join(HERE, 'profile', 'pfp.json'), 'utf8'))
    const dir = path.join(HERE, 'profile')
    for (const o of spec.options.filter((o) => script.id.startsWith(o.script))) {
      const full = path.join(outDir, `pfp-${o.id}.full.jpg`)
      writeFileSync(full, await grab(o.t, { bare: true }))
      const side = o.side || 1080
      ff(['-i', full, '-vf', `crop=${side}:${side}:${(1080 - side) / 2}:${o.cy - side / 2},scale=1080:1080`, path.join(dir, `pfp-${o.id}.png`)])
      console.log(`pfp ${o.id} → reels/frequency/profile/pfp-${o.id}.png`)
    }
    await page.close()
    return
  }

  if (audioOnly) {
    // swap in fresh sound on an already rendered reel
    const mp4 = path.join(outDir, `${script.id}.mp4`)
    if (!existsSync(mp4)) { console.log(`skip ${script.id}: not rendered yet`); await page.close(); return }
    const cues = path.join(outDir, `${script.id}.cues.json`)
    writeFileSync(cues, JSON.stringify(info.audio))
    const wav = path.join(outDir, `${script.id}.wav`)
    execFileSync('python3', ['-I', path.join(HERE, 'score.py'), cues, wav])
    const tmp = path.join(outDir, `${script.id}.tmp.mp4`)
    ff(['-i', mp4, '-i', wav, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', tmp])
    execFileSync('mv', [tmp, mp4])
    ff(['-i', mp4, '-vf', 'scale=720:-2', '-c:v', 'libx264', '-preset', 'slow', '-crf', '25', '-maxrate', '2M', '-bufsize', '4M',
      '-pix_fmt', 'yuv420p', '-c:a', 'copy', '-movflags', '+faststart', path.join(outDir, `${script.id}.web.mp4`)])
    rmSync(cues)
    await page.close()
    console.log(`audio ${script.id} → ${path.relative(REPO, mp4)}`)
    return
  }

  const cues = path.join(outDir, `${script.id}.cues.json`)
  writeFileSync(cues, JSON.stringify(info.audio))
  const wav = path.join(outDir, `${script.id}.wav`)
  execFileSync('python3', ['-I', path.join(HERE, 'score.py'), cues, wav])
  const mp4 = path.join(outDir, `${script.id}.mp4`)
  const enc = spawn('ffmpeg', ['-v', 'error', '-y',
    '-f', 'image2pipe', '-framerate', '30', '-c:v', 'mjpeg', '-i', '-',
    '-i', wav,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-maxrate', '9M', '-bufsize', '18M',
    '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', mp4,
  ], { stdio: ['pipe', 'inherit', 'inherit'] })
  const done = new Promise((res, rej) => enc.on('close', (c) => (c ? rej(new Error(`ffmpeg ${c}`)) : res())))
  const t0 = Date.now()
  for (let f = 0; f < info.frames; f++) {
    const buf = await grab(f / 30)
    if (!enc.stdin.write(buf)) await new Promise((r) => enc.stdin.once('drain', r))
    if (f % 150 === 0) console.log(`  ${script.id} ${f}/${info.frames}`)
  }
  enc.stdin.end()
  await done
  ff(['-i', mp4, '-vf', 'scale=720:-2', '-c:v', 'libx264', '-preset', 'slow',
    '-crf', '25', '-maxrate', '2M', '-bufsize', '4M', '-pix_fmt', 'yuv420p', '-c:a', 'copy',
    '-movflags', '+faststart', path.join(outDir, `${script.id}.web.mp4`)])
  // a cover frame for the grid
  writeFileSync(path.join(outDir, `${script.id}.cover.jpg`), await grab(script.cover ?? 0.2))
  rmSync(cues)
  await page.close()
  console.log(`${script.id}: ${info.frames} frames in ${((Date.now() - t0) / 1000).toFixed(0)}s → ${path.relative(REPO, mp4)}`)
}

const browser = await launch()
const queue = [...files]
await Promise.all(Array.from({ length: Math.min(jobs, queue.length) }, async () => {
  while (queue.length) await renderOne(browser, queue.shift())
}))
await browser.close()
