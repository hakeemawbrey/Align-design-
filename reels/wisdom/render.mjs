// Render Align Wisdom reels: bank.mjs composes the words → Kokoro speaks them
// (word timings via ../affirm/voice.py) → engine.js paints every frame in
// Chromium → ffmpeg muxes the voice over an original chiptune bed (score.py).
//
//   node reels/wisdom/render.mjs                         # one reel per sign (seed 0), all twelve
//   node reels/wisdom/render.mjs --sign scorpio          # one sign
//   node reels/wisdom/render.mjs --sign leo --seed 7     # a different reel for that sign
//   node reels/wisdom/render.mjs --count 36 --from 0     # the next 36 in the endless order
//   node reels/wisdom/render.mjs --forever --jobs 2      # never stops: every sign in turn, seeds go up
//   node reels/wisdom/render.mjs --marathon 12           # one long video: twelve signs back to back
//   node reels/wisdom/render.mjs --stills                # a contact sheet per reel, no video
//
// Output: reels/out/wisdom/<sign>-<seed>.mp4 (+ .web.mp4, .cover.jpg, .caption.txt)

import { createRequire } from 'node:module'
import { spawn, execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SIGNS, compose, plain, lineWords, pagesOf } from './bank.mjs'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REELS = path.resolve(HERE, '..')
const REPO = path.resolve(HERE, '../..')
const AFFIRM = path.join(REPO, 'reels/affirm')
const require = createRequire(path.join(REPO, 'carousel', 'package.json'))
const { chromium } = require('playwright')

const args = process.argv.slice(2)
const flag = (n) => args.includes(n)
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d }
const stills = flag('--stills')
const forever = flag('--forever')
const skip = !flag('--redo')
const jobs = Number(opt('--jobs', 2))
const marathon = Number(opt('--marathon', 0))
const outDir = path.resolve(opt('--out', path.join(REPO, 'reels/out/wisdom')))
const VOICE = opt('--voice', 'af_heart')
const SPEED = Number(opt('--speed', 0.94))

const FPS = 30
const LEAD_FIRST = 0.75   // the star pops in, the box opens, then the hook
const LEAD = 0.5          // between pages
const TAIL = 0.55         // let a page sit after its last word
const END_HOLD = 2.4      // the pill and the heart

const VOICE_DIR = process.env.ALIGN_VOICE_DIR || path.join(AFFIRM, '.voice')
const PY = process.env.ALIGN_VOICE_PY || (existsSync(path.join(VOICE_DIR, 'venv/bin/python')) ? path.join(VOICE_DIR, 'venv/bin/python') : 'python3')

const dataUri = (file, type) => `data:${type};base64,${readFileSync(file).toString('base64')}`
const fontDir = path.join(REPO, 'carousel/node_modules/@fontsource')
const FONTS = [['Space Mono', dataUri(path.join(fontDir, 'space-mono/files/space-mono-latin-700-normal.woff2'), 'font/woff2'), 'normal', '700']]
const GLYPHS = JSON.parse(readFileSync(path.join(AFFIRM, 'glyphs.json'), 'utf8'))

function speak(reel, pages) {
  const req = {
    voice: VOICE, speed: SPEED,
    scenes: pages.map((p) => ({ text: plain(p.text), words: lineWords(p.text).map((w) => w.w), pause: 0.2 })),
  }
  const key = createHash('sha1').update(JSON.stringify(req) + readFileSync(path.join(AFFIRM, 'voice.py'), 'utf8')).digest('hex').slice(0, 10)
  const dir = path.join(outDir, 'voice', `${reel.id}-${key}`)
  if (!existsSync(path.join(dir, 'voice.json'))) {
    mkdirSync(dir, { recursive: true })
    writeFileSync(path.join(dir, 'request.json'), JSON.stringify(req))
    execFileSync(PY, [path.join(AFFIRM, 'voice.py'), path.join(dir, 'request.json'), dir], { stdio: ['ignore', 'ignore', 'inherit'] })
  }
  return { dir, ...JSON.parse(readFileSync(path.join(dir, 'voice.json'), 'utf8')) }
}

function timeline(pages, voice) {
  let t = 0
  const beats = [], lines = []
  pages.forEach((p, i) => {
    const v = voice.scenes[i]
    const last = i === pages.length - 1
    const start = t
    const at = t + (i === 0 ? LEAD_FIRST : LEAD)
    const end = at + v.dur + (last ? END_HOLD : TAIL)
    const words = lineWords(p.text).map((w, k) => ({ ...w, s: at + v.words[k][0], e: at + v.words[k][1] }))
    lines.push({ beat: i, words })
    beats.push({ kind: p.kind, start, at, end, wav: path.join(voice.dir, v.wav) })
    t = end
  })
  return { beats, lines, duration: t }
}

async function launch() {
  try { return await chromium.launch() } catch (e) {
    if (existsSync('/opt/pw-browsers/chromium')) return chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
    throw e
  }
}

// engine.js imports Star Talk's sprite from ../difference, so the page is
// served from reels/ under a made-up origin.
const ORIGIN = 'http://wisdom.local'
async function openEngine(browser, reel, tl) {
  const page = await browser.newPage({ viewport: { width: 540, height: 960 } })
  page.on('pageerror', (e) => console.error(`[${reel.id}]`, e.message))
  page.on('console', (m) => m.type() === 'error' && console.error(`[${reel.id}]`, m.text()))
  await page.route(`${ORIGIN}/**`, (route) => {
    const rel = decodeURIComponent(new URL(route.request().url()).pathname).replace(/^\/+/, '')
    if (rel === '' || rel === 'index.html') {
      return route.fulfill({ contentType: 'text/html', body: '<!doctype html><body style="margin:0;background:#000"><canvas id="c"></canvas><script type="module" src="wisdom/engine.js"></script></body>' })
    }
    const file = path.join(REELS, rel)
    if (!file.startsWith(REELS) || !existsSync(file)) return route.fulfill({ status: 404, body: '' })
    return route.fulfill({ contentType: /\.m?js$/.test(file) ? 'text/javascript' : 'application/octet-stream', body: readFileSync(file) })
  })
  await page.goto(`${ORIGIN}/index.html`)
  await page.waitForFunction(() => typeof window.setup === 'function')
  await page.evaluate(([reel, timeline, fonts, glyphs]) => window.setup({ reel, timeline, fonts, glyphs }), [reel, tl, FONTS, GLYPHS])
  return page
}
const b64 = (s) => Buffer.from(s.split(',')[1], 'base64')

function mixAudio(reel, tl, wav) {
  const bed = wav.replace(/\.wav$/, '.bed.wav')
  const sign = SIGNS.findIndex((s) => s.id === reel.sign)
  const cues = {
    duration: tl.duration, sign, seed: reel.seed,
    pages: tl.beats.map((b) => b.at),
    words: tl.lines.flatMap((l) => l.words.map((w) => w.s)),
    coin: tl.lines.at(-1).words.at(-1).e + 0.15,
  }
  const cueFile = wav.replace(/\.wav$/, '.cues.json')
  writeFileSync(cueFile, JSON.stringify(cues))
  execFileSync(PY, ['-I', path.join(HERE, 'score.py'), cueFile, bed])
  const ins = ['-i', bed], chains = []
  tl.beats.forEach((b, i) => {
    ins.push('-i', b.wav)
    const ms = Math.round(b.at * 1000)
    chains.push(`[${i + 1}:a]aresample=44100,aformat=channel_layouts=stereo,adelay=${ms}|${ms}[v${i}]`)
  })
  const n = tl.beats.length, D = tl.duration.toFixed(3)
  const filter = [
    ...chains,
    `${tl.beats.map((_, i) => `[v${i}]`).join('')}amix=inputs=${n}:normalize=0,highpass=f=80,equalizer=f=3200:t=q:w=1.2:g=2,acompressor=threshold=0.12:ratio=2.5:attack=8:release=160,aecho=0.85:0.5:42:0.07,volume=1.5,apad=whole_dur=${D}[vox]`,
    '[vox]asplit=2[va][vb]',
    '[0:a][va]sidechaincompress=threshold=0.04:ratio=2.4:attack=40:release=600[bd]',
    `[bd][vb]amix=inputs=2:normalize=0,atrim=0:${D},loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100[out]`,
  ].join(';')
  execFileSync('ffmpeg', ['-v', 'error', '-y', ...ins, '-filter_complex', filter, '-map', '[out]', '-ac', '2', wav])
  rmSync(cueFile, { force: true })
}

async function encode(page, tl, wav, mp4, label) {
  const frames = Math.ceil(tl.duration * FPS)
  const ff = spawn('ffmpeg', ['-v', 'error', '-y',
    '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-i', wav,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-tune', 'animation', '-maxrate', '8M', '-bufsize', '16M',
    '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', mp4,
  ], { stdio: ['pipe', 'inherit', 'inherit'] })
  const done = new Promise((res, rej) => ff.on('close', (c) => (c ? rej(new Error(`ffmpeg ${c}`)) : res())))
  for (let f = 0; f < frames; f++) {
    const buf = b64(await page.evaluate((t) => window.frame(t, 0.92), f / FPS))
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r))
    if (f % 300 === 0 && f) console.log(`  ${label}: frame ${f}/${frames}`)
  }
  ff.stdin.end()
  await done
}

async function renderOne(browser, reel) {
  const mp4 = path.join(outDir, `${reel.id}.mp4`)
  if (skip && !stills && existsSync(mp4)) return
  mkdirSync(outDir, { recursive: true })
  const pages = pagesOf(reel)
  const voice = speak(reel, pages)
  const tl = timeline(pages, voice)
  const page = await openEngine(browser, reel, tl)
  // the cover: the first wisdom page, fully typed
  const w1 = tl.lines[1].words
  writeFileSync(path.join(outDir, `${reel.id}.cover.jpg`), b64(await page.evaluate((t) => window.frame(t, 0.92), w1.at(-1).e + 0.3)))

  if (stills) {
    const dir = path.join(outDir, 'stills', reel.id)
    mkdirSync(dir, { recursive: true })
    const times = [0.3, ...tl.lines.map((l) => l.words.at(-1).e + 0.25), tl.duration - 0.1]
    for (const [i, t] of times.entries()) writeFileSync(path.join(dir, `${String(i).padStart(2, '0')}.jpg`), b64(await page.evaluate((t) => window.frame(t), t)))
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-pattern_type', 'glob', '-i', path.join(dir, '*.jpg'),
      '-vf', `scale=270:-1,tile=${times.length}x1:padding=6:color=0x120c22`, '-frames:v', '1', path.join(outDir, 'stills', `${reel.id}.jpg`)])
    await page.close()
    console.log(`stills ${reel.id} (${tl.duration.toFixed(1)}s)`)
    return
  }

  const wav = path.join(outDir, `${reel.id}.wav`)
  mixAudio(reel, tl, wav)
  const t0 = Date.now()
  await encode(page, tl, wav, mp4 + '.part.mp4', reel.id)
  execFileSync('mv', [mp4 + '.part.mp4', mp4])
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', mp4, '-vf', 'scale=720:-2:flags=neighbor', '-c:v', 'libx264', '-preset', 'slow',
    '-crf', '23', '-maxrate', '2.5M', '-bufsize', '5M', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k',
    '-movflags', '+faststart', path.join(outDir, `${reel.id}.web.mp4`)])
  for (const f of [wav, wav.replace(/\.wav$/, '.bed.wav')]) rmSync(f, { force: true })
  writeFileSync(path.join(outDir, `${reel.id}.caption.txt`),
    `${reel.caption}\n\n${reel.hashtags.map((h) => `#${h}`).join(' ')}\n\n--- spoken ---\n${pagesOf(reel).map((p) => plain(p.text)).join('\n')}\n`)
  await page.close()
  console.log(`${reel.id}: ${tl.duration.toFixed(1)}s in ${((Date.now() - t0) / 1000).toFixed(0)}s → ${path.relative(REPO, mp4)}`)
  return mp4
}

// the endless order: every sign in turn, then the seed goes up
const nth = (n) => compose(SIGNS[n % 12].id, Math.floor(n / 12))

function queueOf() {
  const sign = opt('--sign', null)
  const seed = opt('--seed', null)
  const count = Number(opt('--count', 0))
  const from = Number(opt('--from', 0))
  if (sign) {
    if (!SIGNS.some((s) => s.id === sign)) throw new Error(`unknown sign ${sign}`)
    if (seed !== null) return [compose(sign, Number(seed))]
    return Array.from({ length: count || 1 }, (_, i) => compose(sign, from + i))
  }
  if (marathon) return Array.from({ length: marathon }, (_, i) => nth(from + i))
  return Array.from({ length: count || 12 }, (_, i) => nth(from + i))
}

const browser = await launch()
if (forever) {
  // never ends: workers pull the next reel in the endless order
  let n = Number(opt('--from', 0))
  console.log(`forever from #${n}, ${jobs} at a time. Ctrl+C to stop; --from ${n} resumes`)
  await Promise.all(Array.from({ length: jobs }, async () => {
    for (;;) await renderOne(browser, nth(n++))
  }))
} else if (marathon) {
  const reels = queueOf()
  const files = []
  for (const r of reels) files.push(path.join(outDir, `${r.id}.mp4`))
  const queue = [...reels]
  await Promise.all(Array.from({ length: Math.min(jobs, queue.length) }, async () => { while (queue.length) await renderOne(browser, queue.shift()) }))
  const list = path.join(outDir, 'marathon.txt')
  writeFileSync(list, files.map((f) => `file '${f}'`).join('\n'))
  const out = path.join(outDir, `marathon-${reels[0].id}-x${reels.length}.mp4`)
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', '-movflags', '+faststart', out])
  rmSync(list)
  console.log(`marathon → ${path.relative(REPO, out)}`)
} else {
  const queue = queueOf()
  await Promise.all(Array.from({ length: Math.min(jobs, queue.length) }, async () => { while (queue.length) await renderOne(browser, queue.shift()) }))
}
await browser.close()
