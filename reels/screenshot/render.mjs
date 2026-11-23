// Render Align "screenshot" reels: script JSON → frames (engine.js in
// Chromium) → MP4 over an original ambient bed (score.py).
//
//   node reels/screenshot/render.mjs                 # every script
//   node reels/screenshot/render.mjs love-numbers    # by id
//   node reels/screenshot/render.mjs --stills        # cover + one still per card, no video

import { createRequire } from 'node:module'
import { spawn, execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(HERE, '../..')
// Playwright and the fonts come from the carousel package's node_modules.
const require = createRequire(path.join(REPO, 'carousel', 'package.json'))
const { chromium } = require('playwright')

const args = process.argv.slice(2)
const stills = args.includes('--stills')
const outDir = path.join(REPO, 'reels/out/screenshot')
const picks = args.filter((a) => !a.startsWith('--'))
const FPS = 30

const dataUri = (file) => `data:font/woff2;base64,${readFileSync(file).toString('base64')}`
const fd = path.join(REPO, 'carousel/node_modules/@fontsource')
const FONTS = [
  ['Poppins', dataUri(`${fd}/poppins/files/poppins-latin-500-normal.woff2`), 'normal', '500'],
  ['Poppins', dataUri(`${fd}/poppins/files/poppins-latin-600-normal.woff2`), 'normal', '600'],
  ['Poppins', dataUri(`${fd}/poppins/files/poppins-latin-700-normal.woff2`), 'normal', '700'],
  ['Poppins', dataUri(`${fd}/poppins/files/poppins-latin-800-normal.woff2`), 'normal', '800'],
  ['Space Mono', dataUri(`${fd}/space-mono/files/space-mono-latin-400-normal.woff2`), 'normal', '400'],
  ['Space Mono', dataUri(`${fd}/space-mono/files/space-mono-latin-700-normal.woff2`), 'normal', '700'],
  ['EB Garamond', dataUri(`${fd}/eb-garamond/files/eb-garamond-latin-400-normal.woff2`), 'normal', '400'],
  ['EB Garamond', dataUri(`${fd}/eb-garamond/files/eb-garamond-latin-400-italic.woff2`), 'italic', '400'],
  ['EB Garamond', dataUri(`${fd}/eb-garamond/files/eb-garamond-latin-500-italic.woff2`), 'italic', '500'],
  ['EB Garamond', dataUri(`${fd}/eb-garamond/files/eb-garamond-latin-600-italic.woff2`), 'italic', '600'],
]
// The aura art is the app's own (app/public/img/aura), so the cards match the deck.
const AURA_DIR = path.join(REPO, 'app/public/img/aura')
const auraUri = (id) => `data:image/jpeg;base64,${readFileSync(path.join(AURA_DIR, `${id}.jpg`)).toString('base64')}`
const b64 = (s) => Buffer.from(s.split(',')[1], 'base64')

async function launch() {
  try { return await chromium.launch() } catch (e) {
    if (existsSync('/opt/pw-browsers/chromium')) return chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
    throw e
  }
}

async function renderOne(browser, file) {
  const script = JSON.parse(readFileSync(path.join(HERE, 'scripts', file), 'utf8'))
  const page = await browser.newPage({ viewport: { width: 540, height: 960 } })
  page.on('pageerror', (e) => console.error(`[${script.id}]`, e.message))
  await page.setContent('<!doctype html><body style="margin:0;background:#000"><canvas id="c"></canvas></body>')
  await page.addScriptTag({ content: readFileSync(path.join(HERE, 'engine.js'), 'utf8') })
  const { duration } = await page.evaluate(([script, fonts, fps, auras]) => window.setup({ script, fonts, fps, auras }), [script, FONTS, FPS, Object.fromEntries([...new Set(script.cards.map((c) => c.sign))].map((id) => [id, auraUri(id)]))])
  mkdirSync(outDir, { recursive: true })
  writeFileSync(path.join(outDir, `${script.id}.cover.jpg`), b64(await page.evaluate(() => window.cover())))

  if (stills) {
    const dir = path.join(outDir, 'stills', script.id)
    mkdirSync(dir, { recursive: true })
    for (let i = 0; i < script.cards.length; i++) writeFileSync(path.join(dir, `${String(i).padStart(2, '0')}.jpg`), b64(await page.evaluate((i) => window.card(i), i)))
    const cols = Math.min(6, script.cards.length)
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-pattern_type', 'glob', '-i', path.join(dir, '*.jpg'),
      '-vf', `scale=270:-1,tile=${cols}x${Math.ceil(script.cards.length / cols)}:padding=6:color=0x07041c`, '-frames:v', '1', path.join(outDir, 'stills', `${script.id}.jpg`)])
    await page.close()
    console.log(`stills ${script.id} → ${path.relative(REPO, path.join(outDir, 'stills', `${script.id}.jpg`))}`)
    return
  }

  const wav = path.join(outDir, `${script.id}.wav`)
  const cues = path.join(outDir, `${script.id}.cues.json`)
  writeFileSync(cues, JSON.stringify({ duration, intro: script.intro ?? 1.1, seed: script.id.length * 7919 }))
  execFileSync('python3', ['-I', path.join(HERE, 'score.py'), cues, wav])

  const mp4 = path.join(outDir, `${script.id}.mp4`)
  const frames = Math.ceil(duration * FPS)
  const ff = spawn('ffmpeg', ['-v', 'error', '-y',
    '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-i', wav,
    '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-maxrate', '10M', '-bufsize', '20M',
    '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', mp4,
  ], { stdio: ['pipe', 'inherit', 'inherit'] })
  const done = new Promise((res, rej) => ff.on('close', (c) => (c ? rej(new Error(`ffmpeg ${c}`)) : res())))
  for (let f = 0; f < frames; f++) {
    const buf = b64(await page.evaluate((t) => window.frame(t, 0.94), f / FPS))
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r))
  }
  ff.stdin.end()
  await done
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', mp4, '-vf', 'scale=720:-2', '-c:v', 'libx264', '-preset', 'slow',
    '-crf', '23', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', path.join(outDir, `${script.id}.web.mp4`)])
  for (const f of [wav, cues]) rmSync(f, { force: true })
  writeFileSync(path.join(outDir, `${script.id}.caption.txt`), `${script.caption}\n\n${script.hashtags.map((h) => `#${h}`).join(' ')}\n`)
  await page.close()
  console.log(`${script.id}: ${duration}s, ${frames} frames → ${path.relative(REPO, mp4)}`)
}

const browser = await launch()
let files = readdirSync(path.join(HERE, 'scripts')).filter((f) => f.endsWith('.json')).sort()
if (picks.length) files = files.filter((f) => picks.some((p) => f.includes(p)))
for (const f of files) await renderOne(browser, f)
await browser.close()
