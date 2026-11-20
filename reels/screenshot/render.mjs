// Render the Align "screenshot your card" reel: the 51 talk cards from the app
// flash one at a time, and whichever you screenshot is your question for tonight.
//
//   node reels/screenshot/render.mjs            # → reels/out/screenshot/screenshot.mp4 (+ .web.mp4)
//   node reels/screenshot/render.mjs --stills   # a few frames as PNGs, no video
//   node reels/screenshot/render.mjs --seed 4   # a different card order

import { createRequire } from 'node:module'
import { execFileSync } from 'node:child_process'
import { readFileSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(HERE, '../..')
const require = createRequire(path.join(REPO, 'carousel', 'package.json'))
const { chromium } = require('playwright')

const args = process.argv.slice(2)
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d }
const stills = args.includes('--stills')
const SEED = Number(opt('--seed', 1))
const FPS = 30
const OUT = path.join(REPO, 'reels/out/screenshot')

// ── cards, read straight from the app so the reel never drifts from it ──
const src = readFileSync(path.join(REPO, 'app/src/data/talkCards.ts'), 'utf8')
const str = s => s.replace(/\\'/g, "'")
const CARDS = [...src.matchAll(/^\s*c\('(\w+)', '(\w+)', '(\w+)', '((?:[^'\\]|\\.)*)', '(?:[^'\\]|\\.)*'(?:, '(\w+)')?(?:, \['((?:[^'\\]|\\.)*)', '((?:[^'\\]|\\.)*)'\])?\)/gm)]
  .map(m => ({ id: m[1], topic: m[2], kind: m[3], q: str(m[4]), rarity: m[5] || 'common', opts: m[6] ? [str(m[6]), str(m[7])] : null }))
const block = name => src.slice(src.indexOf(`export const ${name}`)).split('\n}\n')[0]
const TOPICS = Object.fromEntries([...block('TOPICS').matchAll(/(\w+): \{ label: '([^']+)', glyph: '([^']+)', color: '([^']+)'/g)].map(m => [m[1], { label: m[2], glyph: m[3], color: m[4] }]))
const ARCANA = Object.fromEntries([...block('ARCANA').matchAll(/(\w+): \{ name: '([^']+)', numeral: '([^']+)'/g)].map(m => [m[1], { name: m[2], numeral: m[3] }]))
if (CARDS.length < 40 || Object.keys(TOPICS).length !== 9) throw new Error(`card parse failed: ${CARDS.length} cards`)

// shuffle so topics alternate, deterministic per seed
let s = SEED * 7919 + 13; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647
const deck = [...CARDS].sort(() => rnd() - .5)
for (let i = 1; i < deck.length; i++) if (deck[i].topic === deck[i - 1].topic) {
  const j = deck.findIndex((c, k) => k > i && c.topic !== deck[i - 1].topic); if (j > 0) [deck[i], deck[j]] = [deck[j], deck[i]]
}

// ── timeline (seconds) ──
const CARD_SEC = 0.2 // 6 frames per card: long enough to land a screenshot on, too fast to choose
const beats = [['stop', 2.6], ['breath', 3.0], ['ready', 2.4], ['flash', deck.length * CARD_SEC], ['reveal', 3.0], ['comment', 2.8], ['end', 2.8]]
let at = 0
const scenes = beats.map(([id, d]) => { const sc = { id, start: +at.toFixed(3), end: +(at + d).toFixed(3) }; at += d; return sc })
scenes.at(-1).last = true
const duration = +at.toFixed(3)

mkdirSync(OUT, { recursive: true })
writeFileSync(path.join(OUT, 'timeline.json'), JSON.stringify({ duration, card_sec: CARD_SEC, scenes }, null, 1))
writeFileSync(path.join(OUT, 'cards.txt'), deck.map((c, i) => `No. ${String(i + 1).padStart(2, '0')}  ${TOPICS[c.topic].label.padEnd(14)} ${c.q}`).join('\n') + '\n')
console.log(`${deck.length} cards, ${duration}s`)

// ── frames ──
const fonts = pathToFileURL(path.join(REPO, 'carousel/node_modules/@fontsource')).href
const html = readFileSync(path.join(HERE, 'engine.html'), 'utf8').replaceAll('FONTS/', fonts + '/')
  .replace('<script>', `<script>window.__REEL = ${JSON.stringify({ TIMELINE: scenes, CARDS: deck, TOPICS, ARCANA, CARD_SEC })}</script><script>`)
const page_ = path.join(OUT, 'engine.built.html'); writeFileSync(page_, html)

// CHROMIUM_PATH overrides the browser Playwright looks for (e.g. a preinstalled one)
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {})
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } })
await page.goto(pathToFileURL(page_).href)
await page.evaluate(() => window.ready)

if (stills) {
  const dir = path.join(OUT, 'stills'); mkdirSync(dir, { recursive: true })
  const f = scenes.find(x => x.id === 'flash')
  const picks = [['stop', 1.4], ['breath', 4.1], ['ready', 6.6], ['card-a', f.start + 0.1], ['card-b', f.start + 17 * CARD_SEC + .1], ['card-c', f.start + 33 * CARD_SEC + .1], ['reveal', scenes[4].start + 1.5], ['comment', scenes[5].start + 1.5], ['end', duration - .6]]
  for (const [name, t] of picks) { await page.evaluate(t => window.seek(t), t); await page.screenshot({ path: path.join(dir, `${name}.png`) }) }
  await browser.close(); console.log('stills →', dir); process.exit(0)
}

const frames = path.join(OUT, 'frames'); rmSync(frames, { recursive: true, force: true }); mkdirSync(frames)
const N = Math.round(duration * FPS)
for (let i = 0; i < N; i++) {
  await page.evaluate(t => window.seek(t), (i + .5) / FPS)
  await page.screenshot({ path: path.join(frames, `${String(i).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 92 })
  if (i % 60 === 0) process.stdout.write(`\rframes ${i}/${N}`)
}
await browser.close(); console.log(`\rframes ${N}/${N}`)

// ── audio + encode ──
const wav = path.join(OUT, 'score.wav')
execFileSync('python3', ['-I', path.join(HERE, 'score.py'), path.join(OUT, 'timeline.json'), wav], { stdio: 'inherit' })
const mp4 = path.join(OUT, 'screenshot.mp4')
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(frames, '%05d.jpg'), '-i', wav,
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', mp4], { stdio: 'inherit' })
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', mp4, '-vf', 'scale=720:-2', '-c:v', 'libx264', '-crf', '24', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', path.join(OUT, 'screenshot.web.mp4')], { stdio: 'inherit' })
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', '1.4', '-i', mp4, '-frames:v', '1', path.join(OUT, 'cover.jpg')])
rmSync(frames, { recursive: true, force: true })
console.log('→', mp4)
