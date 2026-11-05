// Render bold reels: script JSON → (voice with word timings, via ../affirm/voice.py) → timeline → frames (engine.js in
// Chromium) → MP4 over an original score (score.mjs, the original films' arranger), voice ducking the music.
//
//   node reels/bold/render.mjs                       # every script
//   node reels/bold/render.mjs 012 houston           # scripts whose file name contains any of these
//   node reels/bold/render.mjs --stills              # contact sheet + cover per script, no video (fast)
//   node reels/bold/render.mjs --jobs 3 --skip-existing
//   options: --out <dir> (default reels/out/bold) · --lean (no 1080p master kept, only post + web copies)
import { createRequire } from 'node:module'
import { spawn, execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderScore } from './score.mjs'
import VIS from './vis/index.js'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(HERE, '../..')
const AFFIRM = path.join(REPO, 'reels/affirm')
const require = createRequire(path.join(REPO, 'carousel', 'package.json'))
const { chromium } = require('playwright')

const args = process.argv.slice(2)
const flag = (n) => args.includes(n)
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d }
const stills = flag('--stills')
const jobs = Number(opt('--jobs', 2))
const outDir = path.resolve(opt('--out', path.join(REPO, 'reels/out/bold')))
const picks = args.filter((a, i) => !a.startsWith('--') && !['--jobs', '--out', '--at'].includes(args[i - 1]))
const FPS = 30

const VOICE_DIR = process.env.ALIGN_VOICE_DIR || path.join(AFFIRM, '.voice')
const VOICE_PY = process.env.ALIGN_VOICE_PY || (existsSync(path.join(VOICE_DIR, 'venv/bin/python')) ? path.join(VOICE_DIR, 'venv/bin/python') : 'python3')

const dataUri = (file, type) => `data:${type};base64,${readFileSync(file).toString('base64')}`
const fs1 = path.join(REPO, 'app/node_modules/@fontsource'), fs2 = path.join(REPO, 'carousel/node_modules/@fontsource')
const fsrc = (pkg, f) => [fs1, fs2].map(d => path.join(d, pkg, 'files', f)).find(existsSync)
const FONTS = [
  ['Inter', fsrc('inter', 'inter-latin-700-normal.woff2'), 'normal', '700'],
  ['Inter', fsrc('inter', 'inter-latin-800-normal.woff2'), 'normal', '800'],
  ['Inter', fsrc('inter', 'inter-latin-900-normal.woff2'), 'normal', '900'],
  ['EB Garamond', fsrc('eb-garamond', 'eb-garamond-latin-500-italic.woff2'), 'italic', '500'],
  ['EB Garamond', fsrc('eb-garamond', 'eb-garamond-latin-600-normal.woff2') || fsrc('eb-garamond', 'eb-garamond-latin-500-normal.woff2'), 'normal', '600'],
  ['Space Mono', fsrc('space-mono', 'space-mono-latin-700-normal.woff2'), 'normal', '700'],
  ['Space Mono', fsrc('space-mono', 'space-mono-latin-400-normal.woff2'), 'normal', '400'],
].map(([f, file, s, w]) => { if (!file) throw new Error(`font missing for ${f} ${w}: run npm ci in app/ and carousel/`); return [f, dataUri(file, 'font/woff2'), s, w] })
const GLYPHS = JSON.parse(readFileSync(path.join(AFFIRM, 'glyphs.json'), 'utf8'))

// ───────────────────────── words
const plain = (s) => (s || '').replace(/\*/g, '').replace(/\s*\|\s*/g, ' ').trim()
/** "Card *first.* | Face last." → [{ w, em, br }] (| = line break before the next word) */
function words(text) {
  if (!text) return []
  const out = []
  let em = false, br = false
  for (const raw of text.split(/\s+/).filter(Boolean)) {
    if (raw === '|') { br = true; continue }
    const starts = raw.startsWith('*'), ends = raw.replace(/[.,!?;:…"'”’)]+$/, '').endsWith('*')
    if (starts) em = true
    out.push({ w: raw.replace(/\*/g, ''), em, br })
    br = false
    if (ends) em = false
  }
  return out
}
const spokenWords = (s) => plain(s).split(/\s+/).filter(Boolean)

// ───────────────────────── footer: one quiet line about the beta and the city vote
const FOOTERS = {
  beta: 'Align · now in beta in Houston',
  vote: 'Align beta · Houston · vote your city next',
  city: 'Not in Houston? Vote for your city · Align beta',
  both: 'Align · Houston beta\nvote for the next city',
  houston: 'Houston: the Align beta is open',
}
function footerOf(script) {
  const f = script.footer ?? 'auto'
  if (f === false || f === 'none') return null
  if (FOOTERS[f]) return FOOTERS[f]
  if (f !== 'auto') return f
  const keys = script.series === 'Houston' ? ['houston', 'beta', 'both'] : ['beta', 'vote', 'city', 'both']
  const h = parseInt(createHash('sha1').update(script.id).digest('hex').slice(0, 6), 16)
  return FOOTERS[keys[h % keys.length]]
}

// ───────────────────────── voice
function speak(script) {
  const v = script.voice
  const req = {
    voice: v.voice ?? 'af_heart', speed: v.speed ?? 1.05,
    scenes: script.beats.map((b) => {
      const text = b.say ?? [plain(b.head), plain(b.sub)].filter(Boolean).join(' ')
      return { text, words: spokenWords(text), pause: 0.2 }
    }),
  }
  const key = createHash('sha1').update(JSON.stringify(req) + readFileSync(path.join(AFFIRM, 'voice.py'), 'utf8')).digest('hex').slice(0, 10)
  const dir = path.join(outDir, 'voice', `${script.id}-${key}`)
  if (!existsSync(path.join(dir, 'voice.json'))) {
    mkdirSync(dir, { recursive: true })
    writeFileSync(path.join(dir, 'request.json'), JSON.stringify(req))
    execFileSync(VOICE_PY, [path.join(AFFIRM, 'voice.py'), path.join(dir, 'request.json'), dir], { stdio: ['ignore', 'ignore', 'inherit'] })
  }
  return { dir, ...JSON.parse(readFileSync(path.join(dir, 'voice.json'), 'utf8')) }
}

// ───────────────────────── timeline
const visMin = (vis) => { const m = vis && VIS[vis.k]; return m?.min ? m.min(vis) : 0 }
function timeline(script, voice) {
  let t = 0
  const beats = []
  const n = script.beats.length
  script.beats.forEach((b, i) => {
    const last = i === n - 1
    const hw = words(b.head), sw = words(b.sub)
    const start = t
    let end, at = null
    if (voice) {
      const v = voice.scenes[i]
      at = start + (i === 0 ? 0.15 : 0.22)
      const own = b.say == null
      if (own) {
        const all = [...hw, ...sw]
        all.forEach((w, k) => { const sp = v.words[k] || v.words[v.words.length - 1]; w.s = at + sp[0] - 0.04 })
      } else {
        // the voice says something else: pop the words across the first ~60% of the speech
        const D = v.dur * 0.6
        hw.forEach((w, k) => { w.s = at + 0.05 + (D * 0.55) * (k / Math.max(1, hw.length)) })
        sw.forEach((w, k) => { w.s = at + D * 0.6 + (D * 0.4) * (k / Math.max(1, sw.length)) })
      }
      const speechEnd = at + v.dur
      end = Math.max(speechEnd + (b.hold ?? 0.3), start + visMin(b.vis), start + (b.dur ?? 0))
      beats.push({ wav: path.join(voice.dir, v.wav), at })
    } else {
      const h0 = start + 0.1
      hw.forEach((w, k) => { w.s = h0 + k * 0.075 })
      const s0 = (hw.length ? hw[hw.length - 1].s + 0.35 : start + 0.15)
      sw.forEach((w, k) => { w.s = s0 + k * 0.07 })
      const read = 0.9 + 0.26 * hw.length + 0.24 * sw.length + (sw.length ? 0.35 : 0)
      end = start + Math.max(b.dur ?? 0, read, visMin(b.vis), 2.0) + (b.hold ?? 0)
      beats.push({})
    }
    if (i === 0) hw.forEach((w) => { w.s = -1 })      // frame 0 shows the hook
    if (last) end += script.endHold ?? 1.8
    Object.assign(beats[i], { start, end, head: hw.length ? { words: hw } : null, sub: sw.length ? { words: sw } : null, vis: b.vis || null, eyebrow: b.eyebrow ?? null, eyebrowCol: b.eyebrowCol, accent: b.accent, subAccent: b.subAccent, size: b.size, final: last })
    t = end
  })
  const seed = parseInt(createHash('sha1').update(script.id).digest('hex').slice(0, 6), 16)
  return { duration: t, beats, voiced: !!voice, footer: footerOf(script), seed }
}

async function launch() {
  try { return await chromium.launch() } catch (e) {
    const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers'
    if (existsSync(path.join(base, 'chromium'))) return chromium.launch({ executablePath: path.join(base, 'chromium') })
    throw e
  }
}
const ORIGIN = 'http://reel.local'
const TYPES = { '.js': 'text/javascript', '.mjs': 'text/javascript', '.html': 'text/html', '.json': 'application/json' }
async function openEngine(browser, script, tl) {
  const page = await browser.newPage({ viewport: { width: 540, height: 960 } })
  page.on('pageerror', (e) => console.error(`[${script.id}]`, e.message))
  page.on('console', (m) => m.type() === 'error' && console.error(`[${script.id}]`, m.text()))
  await page.route(`${ORIGIN}/**`, (route) => {
    const rel = decodeURIComponent(new URL(route.request().url()).pathname).replace(/^\/+/, '')
    if (rel === '' || rel === 'index.html') return route.fulfill({ contentType: 'text/html', body: '<!doctype html><body style="margin:0;background:#000"><canvas id="c"></canvas><script type="module" src="engine.js"></script></body>' })
    const file = path.join(HERE, rel)
    if (!file.startsWith(HERE) || !existsSync(file)) return route.fulfill({ status: 404, body: '' })
    return route.fulfill({ contentType: TYPES[path.extname(file)] ?? 'application/octet-stream', body: readFileSync(file) })
  })
  await page.goto(`${ORIGIN}/index.html`)
  await page.waitForFunction(() => typeof window.setup === 'function', null, { timeout: 30000 })
  await page.evaluate(([script, timeline, fonts, glyphs]) => window.setup({ script, timeline, fonts, glyphs }), [script, tl, FONTS, GLYPHS])
  return page
}
const b64 = (s) => Buffer.from(s.split(',')[1], 'base64')

// ───────────────────────── sound
const STYLE_BY_SERIES = {
  Scenarios: ['pop', 'funk', 'house', 'chiptune'], Relationships: ['lofi', 'dreamy', 'jazzy'], 'Align ideas': ['dreamy', 'cinematic', 'synthwave'],
  Zodiac: ['jazzy', 'lofi', 'pop', 'dreamy'], 'Fun facts': ['chiptune', 'jazzy', 'funk'], Relatable: ['pop', 'house', 'funk'], Houston: ['house', 'funk', 'synthwave', 'lofi'],
}
const KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'Bb', 'Eb']
function musicOf(script, tl) {
  const h = parseInt(createHash('sha1').update(script.id + 'm').digest('hex').slice(0, 8), 16)
  const styles = STYLE_BY_SERIES[script.series] || ['pop', 'lofi', 'dreamy']
  const m = { style: styles[h % styles.length], key: KEYS[(h >> 4) % KEYS.length], seed: (h >> 8) % 97, ...(script.music || {}) }
  const B = tl.beats
  const drop = B[1] ? Math.max(0.6, B[1].start) : 0.6
  const mid = B[Math.floor(B.length / 2)]?.start ?? tl.duration / 2
  const lift = B[B.length - 1].start
  m.sections = { drop, ...(B.length > 4 && mid > drop + 3 && lift > mid + 3 ? { breakdown: mid, lift } : {}), outroAt: Math.max(lift, tl.duration - 1.3) }
  if (tl.voiced) { m.musicRel = m.musicRel ?? -7; m.lufs = -16 }
  return m
}
function mixAudio(script, tl, cues, wav) {
  const bed = wav.replace(/\.wav$/, '.bed.wav')
  renderScore({ duration: tl.duration, music: musicOf(script, tl), cues }, bed)
  if (!tl.voiced) { execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', bed, '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100', '-ac', '2', wav]); rmSync(bed); return }
  const ins = ['-i', bed], chains = []
  tl.beats.forEach((b, i) => {
    ins.push('-i', b.wav)
    const ms = Math.round(b.at * 1000)
    chains.push(`[${i + 1}:a]aresample=44100,aformat=channel_layouts=stereo,adelay=${ms}|${ms}[v${i}]`)
  })
  const n = tl.beats.length
  const filter = [
    ...chains,
    `${tl.beats.map((_, i) => `[v${i}]`).join('')}amix=inputs=${n}:normalize=0,highpass=f=80,equalizer=f=3200:t=q:w=1.2:g=2,acompressor=threshold=0.12:ratio=2.5:attack=8:release=160,aecho=0.85:0.5:38:0.05,volume=1.5,apad=whole_dur=${tl.duration.toFixed(3)}[vox]`,
    '[vox]asplit=2[va][vb]',
    '[0:a]aresample=44100,volume=0.9[bed]',
    '[bed][va]sidechaincompress=threshold=0.035:ratio=3:attack=30:release=500[bd]',
    `[bd][vb]amix=inputs=2:normalize=0,atrim=0:${tl.duration.toFixed(3)},loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100[out]`,
  ].join(';')
  execFileSync('ffmpeg', ['-v', 'error', '-y', ...ins, '-filter_complex', filter, '-map', '[out]', '-ac', '2', wav])
  rmSync(bed)
}

// ───────────────────────── one reel
export function loadScript(file) {
  const s = JSON.parse(readFileSync(path.join(HERE, 'scripts', file), 'utf8'))
  if (!s.id) s.id = path.basename(file, '.json')
  return s
}
async function renderOne(browser, file) {
  const script = loadScript(file)
  const mp4 = path.join(outDir, `${script.id}.mp4`)
  if (!stills && flag('--skip-existing') && existsSync(path.join(outDir, `${script.id}.web.mp4`))) return
  const voice = script.voice ? speak(script) : null
  const tl = timeline(script, voice)
  const page = await openEngine(browser, script, tl)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(path.join(outDir, `${script.id}.cover.jpg`), b64(await page.evaluate(() => window.cover())))

  if (stills) {
    const dir = path.join(outDir, 'stills', script.id)
    rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true })
    const at = opt('--at')
    const times = at ? at.split(',').map(Number) : [0, ...tl.beats.flatMap((b, i) => { const d = b.end - b.start; return i === 0 ? [b.start + d * 0.8] : [b.start + d * 0.45, b.start + d * 0.9] }), tl.duration - 0.05]
    for (const [i, t] of times.entries()) writeFileSync(path.join(dir, `${String(i).padStart(2, '0')}.jpg`), b64(await page.evaluate((t) => window.frame(t), t)))
    const cols = Math.min(6, times.length)
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-pattern_type', 'glob', '-i', path.join(dir, '*.jpg'),
      '-vf', `scale=300:-1,tile=${cols}x${Math.ceil(times.length / cols)}:padding=4:color=0x222222`, '-frames:v', '1', path.join(outDir, 'stills', `${script.id}.jpg`)])
    rmSync(dir, { recursive: true, force: true })
    await page.close()
    console.log(`stills ${script.id}: ${tl.duration.toFixed(1)}s, ${tl.beats.length} beats${tl.voiced ? ', voiced' : ''}`)
    return
  }

  const cues = await page.evaluate(() => window.cues())
  const wav = path.join(outDir, `${script.id}.wav`)
  mixAudio(script, tl, cues, wav)
  const frames = Math.ceil(tl.duration * FPS)
  const ff = spawn('ffmpeg', ['-v', 'error', '-y',
    '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-i', wav,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-maxrate', '9M', '-bufsize', '18M',
    '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', mp4,
  ], { stdio: ['pipe', 'inherit', 'inherit'] })
  const done = new Promise((res, rej) => ff.on('close', (c) => (c ? rej(new Error(`ffmpeg ${c}`)) : res())))
  ff.stdin.on('error', (e) => console.error(`[${script.id}] ffmpeg stopped reading frames: ${e.message}`))
  const t0 = Date.now()
  for (let f = 0; f < frames; f++) {
    const buf = b64(await page.evaluate((t) => window.frame(t), f / FPS))
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r))
  }
  ff.stdin.end()
  await done
  if (flag('--prof')) console.log(await page.evaluate(() => { const P = window.__prof; return `render ${(P.r / P.n).toFixed(1)} ms, encode ${(P.e / P.n).toFixed(1)} ms` }))
  await page.close()
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', mp4, '-vf', 'scale=720:-2:flags=lanczos', '-c:v', 'libx264', '-preset', 'slow',
    '-crf', '23', '-maxrate', '2.2M', '-bufsize', '4.4M', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k',
    '-movflags', '+faststart', path.join(outDir, `${script.id}.web.mp4`)])
  rmSync(wav, { force: true })
  const tags = (script.hashtags || []).map((h) => `#${h.replace(/^#/, '')}`).join(' ')
  writeFileSync(path.join(outDir, `${script.id}.caption.txt`), [script.caption, script.cta ?? 'Align is in beta in Houston. Not in Houston? Vote for your city at the link in bio.', tags].filter(Boolean).join('\n\n') + '\n')
  writeFileSync(path.join(outDir, `${script.id}.json`), JSON.stringify({ id: script.id, series: script.series, title: script.title, duration: +tl.duration.toFixed(2), voiced: tl.voiced, voice: script.voice?.voice ?? null }))
  console.log(`${script.id}: ${tl.duration.toFixed(1)}s${tl.voiced ? ' voiced' : ''}, ${frames} frames in ${((Date.now() - t0) / 1000).toFixed(0)}s`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.join(HERE, 'render.mjs')) {
  const browser = await launch()
  let files = readdirSync(path.join(HERE, 'scripts')).filter((f) => f.endsWith('.json')).sort()
  if (picks.length) files = files.filter((f) => picks.some((p) => f.includes(p)))
  const queue = [...files]
  await Promise.all(Array.from({ length: Math.min(jobs, queue.length) }, async () => {
    while (queue.length) {
      const f = queue.shift()
      try { await renderOne(browser, f) } catch (e) { console.error(`FAILED ${f}: ${e.message}`) }
    }
  }))
  await browser.close()
}
export { timeline, words, footerOf }
