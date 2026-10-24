// Render Align zodiac reels: script JSON → frames (engine.js in Chromium) →
// MP4 with an original ambient score (score.py).
//
//   node reels/src/render.mjs                  # all twelve
//   node reels/src/render.mjs leo scorpio      # by sign or id
//   node reels/src/render.mjs --stills         # a contact sheet per reel, no video
//   node reels/src/render.mjs --jobs 3

import { createRequire } from 'node:module'
import { spawn, execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, '..')
const REPO = path.resolve(ROOT, '..')
// Playwright and the fonts come from the carousel package's node_modules.
const require = createRequire(path.join(REPO, 'carousel', 'package.json'))
const { chromium } = require('playwright')

const SIGN_COLORS = {
  aries: '#f0603a', taurus: '#e9b24a', gemini: '#f2cf4a', cancer: '#3fb6f0',
  leo: '#f39a3a', virgo: '#ef5c94', libra: '#e163d6', scorpio: '#e23d66',
  sagittarius: '#a35cf0', capricorn: '#2fc79a', aquarius: '#38c4ec', pisces: '#7c74f0',
}

const args = process.argv.slice(2)
const flag = (n) => args.includes(n)
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d }
const stills = flag('--stills')
const jobs = Number(opt('--jobs', 2))
const outDir = path.resolve(opt('--out', path.join(ROOT, 'out')))
const picks = args.filter((a, i) => !a.startsWith('--') && !(args[i - 1] ?? '').startsWith('--j') && !(args[i - 1] ?? '').startsWith('--o'))

const scriptsDir = path.join(ROOT, 'scripts')
let files = readdirSync(scriptsDir).filter((f) => f.endsWith('.json')).sort()
if (picks.length) files = files.filter((f) => picks.some((p) => f.includes(p)))
mkdirSync(outDir, { recursive: true })

const dataUri = (file, type) => `data:${type};base64,${readFileSync(file).toString('base64')}`
const fontDir = path.join(REPO, 'carousel/node_modules/@fontsource')
const FONTS = [
  ['Poppins', dataUri(path.join(fontDir, 'poppins/files/poppins-latin-500-italic.woff2'), 'font/woff2'), 'italic', '500'],
  ['Space Mono', dataUri(path.join(fontDir, 'space-mono/files/space-mono-latin-400-normal.woff2'), 'font/woff2'), 'normal', '400'],
]
const ENGINE = readFileSync(path.join(HERE, 'engine.js'), 'utf8')

async function launch() {
  try { return await chromium.launch() } catch (e) {
    // The bundled browser revision can lag the npm package; fall back to any
    // chromium build under PLAYWRIGHT_BROWSERS_PATH.
    const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers'
    if (existsSync(path.join(base, 'chromium'))) return chromium.launch({ executablePath: path.join(base, 'chromium') })
    for (const d of readdirSync(base).filter((d) => /^chromium-\d+$/.test(d)).sort().reverse()) {
      for (const sub of ['chrome-linux64', 'chrome-linux']) {
        const exe = path.join(base, d, sub, 'chrome')
        if (existsSync(exe)) return chromium.launch({ executablePath: exe })
      }
    }
    throw e
  }
}

async function renderOne(browser, file) {
  const script = JSON.parse(readFileSync(path.join(scriptsDir, file), 'utf8'))
  const page = await browser.newPage({ viewport: { width: 540, height: 960 } })
  page.on('pageerror', (e) => console.error(`[${script.id}]`, e.message))
  await page.setContent('<!doctype html><body style="margin:0;background:#000"><canvas id="c"></canvas></body>')
  await page.addScriptTag({ content: ENGINE })
  const fig = path.join(REPO, 'app/public/img/figure', `${script.sign}.jpg`)
  const { duration, frames } = await page.evaluate(([s, a]) => window.setup(s, a), [script, {
    signColor: SIGN_COLORS[script.sign],
    figure: existsSync(fig) ? dataUri(fig, 'image/jpeg') : null,
    fonts: FONTS,
  }])
  const grab = async (t) => Buffer.from((await page.evaluate((t) => window.frame(t), t)).split(',')[1], 'base64')

  if (stills) {
    // One frame from the middle of each scene, plus the outro.
    const dir = path.join(outDir, 'stills', script.id)
    mkdirSync(dir, { recursive: true })
    const times = script.scenes.map((_, i) => i * 3.4 + 1.9).concat([duration - 0.5])
    for (const [i, t] of times.entries()) writeFileSync(path.join(dir, `${String(i).padStart(2, '0')}.jpg`), await grab(t))
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-pattern_type', 'glob', '-i', path.join(dir, '*.jpg'),
      '-vf', 'scale=270:-1,tile=7x2:padding=6:color=0x0b0712', '-frames:v', '1', path.join(outDir, 'stills', `${script.id}.jpg`)])
    await page.close()
    console.log(`stills ${script.id}`)
    return
  }

  const wav = path.join(outDir, `${script.id}.wav`)
  execFileSync('python3', ['-I', path.join(HERE, 'score.py'), script.sign, String(duration), String(script.scenes.length), wav])
  const mp4 = path.join(outDir, `${script.id}.mp4`)
  const ff = spawn('ffmpeg', ['-v', 'error', '-y',
    '-f', 'image2pipe', '-framerate', '30', '-c:v', 'mjpeg', '-i', '-',
    '-i', wav,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '21', '-maxrate', '6M', '-bufsize', '12M',
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
  // A lighter 720p copy for previewing on a phone or a review page.
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', mp4, '-vf', 'scale=720:-2', '-c:v', 'libx264', '-preset', 'slow',
    '-crf', '25', '-maxrate', '2M', '-bufsize', '4M', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k',
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
