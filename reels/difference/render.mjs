// Render Align "What's the difference?" reels: script JSON → voice (Kokoro,
// with word timings, via ../affirm/voice.py) → frames (engine.js in Chromium)
// → MP4 with the voice over an original score.
//
//   node reels/difference/render.mjs                  # every script
//   node reels/difference/render.mjs love             # by id
//   node reels/difference/render.mjs --stills         # contact sheets + covers, no video
//   node reels/difference/render.mjs --jobs 2

import { createRequire } from 'node:module'
import { spawn, execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(HERE, '../..')
const AFFIRM = path.join(REPO, 'reels/affirm')
// Playwright and the fonts come from the carousel package's node_modules.
const require = createRequire(path.join(REPO, 'carousel', 'package.json'))
const { chromium } = require('playwright')

const args = process.argv.slice(2)
const flag = (n) => args.includes(n)
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d }
const stills = flag('--stills')
const jobs = Number(opt('--jobs', 2))
const outDir = path.resolve(opt('--out', path.join(REPO, 'reels/out/difference')))
const picks = args.filter((a, i) => !a.startsWith('--') && !['--jobs', '--out'].includes(args[i - 1]))

// Seconds. A flip between pairs takes 0.62 s, so those beats lead longer.
const LEAD_FIRST = 0.4
const LEAD = 0.18
const LEAD_FLIP = 0.64
const TAIL = 0.14
const TAIL_DIFF = 0.36
const END_HOLD = 2.1
const FPS = 30
const HANDLE = '@align.difference'

const VOICE_DIR = process.env.ALIGN_VOICE_DIR || path.join(AFFIRM, '.voice')
const VOICE_PY = process.env.ALIGN_VOICE_PY || (existsSync(path.join(VOICE_DIR, 'venv/bin/python')) ? path.join(VOICE_DIR, 'venv/bin/python') : 'python3')

const dataUri = (file, type) => `data:${type};base64,${readFileSync(file).toString('base64')}`
const fontDir = path.join(REPO, 'carousel/node_modules/@fontsource')
const FONTS = [
  ['Poppins', dataUri(path.join(fontDir, 'poppins/files/poppins-latin-500-normal.woff2'), 'font/woff2'), 'normal', '500'],
  ['Poppins', dataUri(path.join(fontDir, 'poppins/files/poppins-latin-700-normal.woff2'), 'font/woff2'), 'normal', '700'],
  ['Poppins', dataUri(path.join(fontDir, 'poppins/files/poppins-latin-800-normal.woff2'), 'font/woff2'), 'normal', '800'],
  ['Space Mono', dataUri(path.join(fontDir, 'space-mono/files/space-mono-latin-700-normal.woff2'), 'font/woff2'), 'normal', '700'],
  ['EB Garamond', dataUri(path.join(fontDir, 'eb-garamond/files/eb-garamond-latin-500-italic.woff2'), 'font/woff2'), 'italic', '500'],
]
const GLYPHS = JSON.parse(readFileSync(path.join(AFFIRM, 'glyphs.json'), 'utf8'))

const plain = (s) => s.replace(/\*/g, '')
// "*second date.*" → words with an emphasis flag; "Align" is flagged too
function lineWords(line) {
  const out = []
  let em = false
  for (const raw of line.split(/\s+/).filter(Boolean)) {
    const starts = raw.startsWith('*')
    const ends = raw.replace(/[.,!?;:…]+$/, '').endsWith('*')
    if (starts) em = true
    const w = plain(raw)
    out.push({ w, em, align: /^Align\b/.test(w) })
    if (ends) em = false
  }
  return out
}

// A script's pairs become beats: ask, explain A, explain B, the difference.
function beatsOf(script) {
  const beats = []
  script.pairs.forEach((p, i) => {
    beats.push({ kind: 'ask', pair: i, lines: p.ask })
    beats.push({ kind: 'a', pair: i, lines: p.explainA })
    beats.push({ kind: 'b', pair: i, lines: p.explainB })
    beats.push({ kind: 'diff', pair: i, lines: p.diff })
  })
  beats.push({ kind: 'end', pair: script.pairs.length - 1, lines: script.end.lines })
  return beats
}

function speak(script, beats) {
  const req = {
    voice: script.voice ?? 'af_heart',
    speed: script.speed ?? 1.0,
    scenes: beats.map((b) => ({
      text: b.lines.map(plain).join(' '),
      words: b.lines.flatMap((l) => lineWords(l).map((w) => w.w)),
      pause: 0.22,
    })),
  }
  const key = createHash('sha1').update(JSON.stringify(req) + readFileSync(path.join(AFFIRM, 'voice.py'), 'utf8')).digest('hex').slice(0, 10)
  const dir = path.join(outDir, 'voice', `${script.id}-${key}`)
  if (!existsSync(path.join(dir, 'voice.json'))) {
    mkdirSync(dir, { recursive: true })
    writeFileSync(path.join(dir, 'request.json'), JSON.stringify(req))
    execFileSync(VOICE_PY, [path.join(AFFIRM, 'voice.py'), path.join(dir, 'request.json'), dir], { stdio: 'inherit' })
  }
  return { dir, ...JSON.parse(readFileSync(path.join(dir, 'voice.json'), 'utf8')) }
}

function timeline(beats, voice) {
  let t = 0
  const out = [], lines = []
  beats.forEach((b, i) => {
    const v = voice.scenes[i]
    const last = i === beats.length - 1
    const flips = (b.kind === 'ask' && b.pair > 0) || b.kind === 'end'
    const start = t
    const at = t + (i === 0 ? LEAD_FIRST : flips ? LEAD_FLIP : LEAD)
    const end = at + v.dur + (last ? END_HOLD : b.kind === 'diff' ? TAIL_DIFF : TAIL)
    let wi = 0
    for (const l of b.lines) {
      const words = lineWords(l).map((w) => {
        const [s, e] = v.words[wi++]
        return { ...w, s: at + s, e: at + e }
      })
      lines.push({ beat: i, start: words[0].s, end: words[words.length - 1].e, words })
    }
    out.push({ kind: b.kind, pair: b.pair, start, at, end, wav: path.join(voice.dir, v.wav) })
    t = end
  })
  return { beats: out, lines, duration: t }
}

async function launch() {
  try { return await chromium.launch() } catch (e) {
    const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers'
    if (existsSync(path.join(base, 'chromium'))) return chromium.launch({ executablePath: path.join(base, 'chromium') })
    throw e
  }
}

// The engine is an ES module (it imports Star Talk's sprite), so the page is
// served from this folder under a made-up origin.
const ORIGIN = 'http://reel.local'
const TYPES = { '.js': 'text/javascript', '.mjs': 'text/javascript', '.html': 'text/html' }
async function openEngine(browser, script, tl) {
  const page = await browser.newPage({ viewport: { width: 540, height: 960 } })
  page.on('pageerror', (e) => console.error(`[${script.id}]`, e.message))
  page.on('console', (m) => m.type() === 'error' && console.error(`[${script.id}]`, m.text()))
  await page.route(`${ORIGIN}/**`, (route) => {
    const rel = decodeURIComponent(new URL(route.request().url()).pathname).replace(/^\/+/, '')
    if (rel === '' || rel === 'index.html') {
      return route.fulfill({ contentType: 'text/html', body: '<!doctype html><body style="margin:0;background:#000"><canvas id="c"></canvas><script type="module" src="engine.js"></script></body>' })
    }
    const file = path.join(HERE, rel)
    if (!file.startsWith(HERE) || !existsSync(file)) return route.fulfill({ status: 404, body: '' })
    return route.fulfill({ contentType: TYPES[path.extname(file)] ?? 'application/octet-stream', body: readFileSync(file) })
  })
  await page.goto(`${ORIGIN}/index.html`)
  await page.waitForFunction(() => typeof window.setup === 'function')
  await page.evaluate(([script, timeline, fonts, glyphs]) => window.setup({ script, timeline, fonts, glyphs }), [script, tl, FONTS, GLYPHS])
  return page
}
const b64 = (s) => Buffer.from(s.split(',')[1], 'base64')

function mixAudio(script, tl, wav) {
  const bed = wav.replace(/\.wav$/, '.bed.wav')
  const seed = parseInt(createHash('sha1').update(script.id).digest('hex').slice(0, 6), 16)
  // sound cues: a pop as the question marks appear, a flip per card turn,
  // a chime on each answer, a ding for the pill
  const cues = { flips: [], pops: [], chimes: [], ding: null }
  for (const b of tl.beats) {
    if (b.kind === 'ask') cues.pops.push(b.start + 0.12, b.start + 0.2)
    if ((b.kind === 'ask' && b.pair > 0) || b.kind === 'end') cues.flips.push(b.start, b.start + 0.1)
    if (b.kind === 'diff') cues.chimes.push(b.start + 0.1)
  }
  const endLines = tl.lines.filter((l) => l.beat === tl.beats.length - 1)
  if (script.end?.pill) cues.ding = endLines[endLines.length - 1].start + 0.2
  const cueFile = wav.replace(/\.wav$/, '.cues.json')
  writeFileSync(cueFile, JSON.stringify({ duration: tl.duration, seed, ...cues }))
  execFileSync(VOICE_PY, ['-I', path.join(HERE, 'score.py'), cueFile, bed])
  const ins = ['-i', bed]
  const chains = []
  tl.beats.forEach((b, i) => {
    ins.push('-i', b.wav)
    const ms = Math.round(b.at * 1000)
    chains.push(`[${i + 1}:a]aresample=44100,aformat=channel_layouts=stereo,adelay=${ms}|${ms}[v${i}]`)
  })
  const n = tl.beats.length
  const filter = [
    ...chains,
    `${tl.beats.map((_, i) => `[v${i}]`).join('')}amix=inputs=${n}:normalize=0,highpass=f=80,equalizer=f=3200:t=q:w=1.2:g=2,acompressor=threshold=0.12:ratio=2.5:attack=8:release=160,aecho=0.85:0.5:38:0.06,volume=1.5,apad=whole_dur=${tl.duration.toFixed(3)}[vox]`,
    '[vox]asplit=2[va][vb]',
    '[0:a]volume=1.0[bed]',
    '[bed][va]sidechaincompress=threshold=0.04:ratio=2.2:attack=40:release=600[bd]',
    `[bd][vb]amix=inputs=2:normalize=0,atrim=0:${tl.duration.toFixed(3)},loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100[out]`,
  ].join(';')
  execFileSync('ffmpeg', ['-v', 'error', '-y', ...ins, '-filter_complex', filter, '-map', '[out]', '-ac', '2', wav])
}

async function renderOne(browser, file) {
  const script = { handle: HANDLE, ...JSON.parse(readFileSync(path.join(HERE, 'scripts', file), 'utf8')) }
  const beats = beatsOf(script)
  const voice = speak(script, beats)
  const tl = timeline(beats, voice)
  const page = await openEngine(browser, script, tl)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(path.join(outDir, `${script.id}.cover.jpg`), b64(await page.evaluate((t) => window.cover(t), script.cover ?? 'What\'s the difference?')))

  if (stills) {
    const dir = path.join(outDir, 'stills', script.id)
    mkdirSync(dir, { recursive: true })
    const times = [0.05, ...tl.lines.map((l) => (l.start + l.end) / 2 + 0.2), ...tl.beats.filter((b) => b.kind === 'ask' && b.pair > 0).map((b) => b.start + 0.2), tl.duration - 0.5].sort((a, b) => a - b)
    for (const [i, t] of times.entries()) writeFileSync(path.join(dir, `${String(i).padStart(2, '0')}.jpg`), b64(await page.evaluate((t) => window.frame(t), t)))
    const cols = Math.min(8, times.length)
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-pattern_type', 'glob', '-i', path.join(dir, '*.jpg'),
      '-vf', `scale=270:-1,tile=${cols}x${Math.ceil(times.length / cols)}:padding=6:color=0xd8d0c4`, '-frames:v', '1', path.join(outDir, 'stills', `${script.id}.jpg`)])
    await page.close()
    console.log(`stills ${script.id} (${tl.duration.toFixed(1)}s, ${times.length} frames)`)
    return
  }

  const wav = path.join(outDir, `${script.id}.wav`)
  mixAudio(script, tl, wav)
  const mp4 = path.join(outDir, `${script.id}.mp4`)
  const frames = Math.ceil(tl.duration * FPS)
  const ff = spawn('ffmpeg', ['-v', 'error', '-y',
    '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-i', wav,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-maxrate', '8M', '-bufsize', '16M',
    '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', mp4,
  ], { stdio: ['pipe', 'inherit', 'inherit'] })
  const done = new Promise((res, rej) => ff.on('close', (c) => (c ? rej(new Error(`ffmpeg ${c}`)) : res())))
  ff.stdin.on('error', (e) => console.error(`[${script.id}] ffmpeg stopped reading frames: ${e.message}`))
  const t0 = Date.now()
  for (let f = 0; f < frames; f++) {
    const buf = b64(await page.evaluate((t) => window.frame(t), f / FPS))
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r))
    if (f % 300 === 0) console.log(`  ${script.id}: frame ${f}/${frames}`)
  }
  ff.stdin.end()
  await done
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', mp4, '-vf', 'scale=720:-2', '-c:v', 'libx264', '-preset', 'slow',
    '-crf', '24', '-maxrate', '2.5M', '-bufsize', '5M', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k',
    '-movflags', '+faststart', path.join(outDir, `${script.id}.web.mp4`)])
  writeFileSync(path.join(outDir, `${script.id}.caption.txt`), `${script.caption}\n\n${script.cta}\n\n${script.hashtags.map((h) => `#${h}`).join(' ')}\n`)
  await page.close()
  console.log(`${script.id}: ${tl.duration.toFixed(1)}s, ${frames} frames in ${((Date.now() - t0) / 1000).toFixed(0)}s → ${path.relative(REPO, mp4)}`)
}

const browser = await launch()
let files = readdirSync(path.join(HERE, 'scripts')).filter((f) => f.endsWith('.json')).sort()
if (picks.length) files = files.filter((f) => picks.some((p) => f.includes(p)))
const queue = [...files]
await Promise.all(Array.from({ length: Math.min(jobs, queue.length) }, async () => {
  while (queue.length) await renderOne(browser, queue.shift())
}))
await browser.close()
