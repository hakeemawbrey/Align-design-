// Render Align "How you…" reels: script JSON → voice (Kokoro, with word
// timings, shared with ../affirm) → frames (engine.js + three.js in
// Chromium) → MP4 with an original score and sound effects (score.py).
//
//   node reels/howyou/render.mjs                  # every script → reels/out/howyou/
//   node reels/howyou/render.mjs venus            # by id
//   node reels/howyou/render.mjs --stills         # contact sheets, one frame per scene
//   node reels/howyou/render.mjs --jobs 2

import { createRequire } from 'node:module'
import { createHash } from 'node:crypto'
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
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d }
const stills = flag('--stills')
const jobs = Number(opt('--jobs', 1))
const outDir = path.resolve(opt('--out', path.join(REPO, 'reels/out/howyou')))
const picks = args.filter((a, i) => !a.startsWith('--') && !['--jobs', '--out'].includes(args[i - 1]))

const scriptsDir = path.join(HERE, 'scripts')
let files = readdirSync(scriptsDir).filter((f) => f.endsWith('.json')).sort()
if (picks.length) files = files.filter((f) => picks.some((p) => f.includes(p)))
mkdirSync(outDir, { recursive: true })

// Seconds. Cuts are quick: the voice starts almost as the shot lands.
const LEAD_FIRST = 0.15
const LEAD = 0.16
const TAIL = 0.14
const OUTRO = 2.6
const FPS = 30

const AFFIRM = path.join(REPO, 'reels/affirm')
const VOICE_DIR = process.env.ALIGN_VOICE_DIR || path.join(AFFIRM, '.voice')
const VOICE_PY = process.env.ALIGN_VOICE_PY || (existsSync(path.join(VOICE_DIR, 'venv/bin/python')) ? path.join(VOICE_DIR, 'venv/bin/python') : 'python3')

const HOST = 'http://howyou.local/'
const fontDir = path.join(MODULES, '@fontsource')
const FONTS = [
  ['Poppins', `${HOST}fonts/poppins/files/poppins-latin-500-normal.woff2`, 'normal', '500'],
  ['Poppins', `${HOST}fonts/poppins/files/poppins-latin-600-normal.woff2`, 'normal', '600'],
  ['Poppins', `${HOST}fonts/poppins/files/poppins-latin-700-normal.woff2`, 'normal', '700'],
  ['Poppins', `${HOST}fonts/poppins/files/poppins-latin-400-normal.woff2`, 'normal', '400'],
  ['Space Mono', `${HOST}fonts/space-mono/files/space-mono-latin-700-normal.woff2`, 'normal', '700'],
  ['EB Garamond', `${HOST}fonts/eb-garamond/files/eb-garamond-latin-500-italic.woff2`, 'italic', '500'],
]
const GLYPHS = JSON.parse(readFileSync(path.join(AFFIRM, 'glyphs.json'), 'utf8'))
const INDEX = `<!doctype html><html><body style="margin:0;background:#000">
<canvas id="c"></canvas>
<script type="importmap">{"imports":{"three":"${HOST}three/three.module.js","three/addons/":"${HOST}addons/"}}</script>
<script type="module" src="${HOST}engine.js"></script>
</body></html>`
const TYPES = { '.js': 'text/javascript', '.woff2': 'font/woff2', '.html': 'text/html' }
function serve(url) {
  const p = url.slice(HOST.length).split('?')[0]
  if (p === 'engine.js') return path.join(HERE, 'engine.js')
  if (p.startsWith('three/')) return path.join(MODULES, 'three/build', p.slice(6))
  if (p.startsWith('addons/')) return path.join(MODULES, 'three/examples/jsm', p.slice(7))
  if (p.startsWith('fonts/')) return path.join(fontDir, p.slice(6))
  return null
}

const plain = (s) => s.replace(/\*/g, '')
function lineWords(line) {
  const out = []
  let em = false
  for (const raw of line.split(/\s+/).filter(Boolean)) {
    if (raw.startsWith('*')) em = true
    out.push({ w: plain(raw), em })
    if (raw.replace(/[.,!?;:…]+$/, '').endsWith('*')) em = false
  }
  return out
}

function speak(script) {
  const req = {
    voice: script.voice ?? 'am_michael',
    speed: script.speed ?? 1.08,
    scenes: script.scenes.map((sc) => ({ text: plain(sc.text), words: lineWords(sc.text).map((w) => w.w), pause: 0.2 })),
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

// A sentence can be two shots: the scene, then its "b" shot (a cutaway or
// reaction) from word "cut" on. No shot should run much past 4 s.
function shotSpecs(sc) {
  const { b, cut, ...a } = sc
  if (!b) return [a]
  const own = b.set && b.set !== a.set
  const bs = { ...b, set: b.set || a.set, cast: b.cast ?? (own ? [] : a.cast), fx: b.fx ?? (own ? [] : a.fx), shot: b.shot || 'medium', focus: b.focus || (own ? 'center' : a.focus), sfx: b.sfx || 'cut' }
  return [a, bs]
}
function cutWord(sc, words) {
  if (sc.cut != null) return sc.cut
  const k = words.findIndex((w, i) => i > 0 && i < words.length - 1 && /[.,?!…]$/.test(words[i - 1].w))
  return k > 0 ? k : Math.floor(words.length / 2)
}

function timeline(script, voice) {
  let t = 0
  const sentences = [], shots = []
  script.scenes.forEach((sc, i) => {
    const v = voice.scenes[i]
    const start = t
    const at = t + (i === 0 ? LEAD_FIRST : LEAD)
    // the voice clip has a little silence at its end; cut on the last word
    const lastWord = v.words.length ? v.words[v.words.length - 1][1] : v.dur
    const voiceEnd = at + Math.min(v.dur, lastWord + 0.12)
    const end = voiceEnd + TAIL
    const words = lineWords(sc.text).map((w, k) => ({ ...w, s: at + v.words[k][0], e: at + v.words[k][1] }))
    sentences.push({ start, end, at, voiceEnd, words, wav: path.join(voice.dir, v.wav) })
    const specs = shotSpecs(sc)
    if (specs.length === 1) shots.push({ start, end, at, spec: specs[0] })
    else {
      const ct = words[cutWord(sc, words)].s - 0.06
      shots.push({ start, end: ct, at, spec: specs[0] }, { start: ct, end, at: ct, spec: specs[1] })
    }
    t = end
  })
  const outro = t
  shots[shots.length - 1].end = t + OUTRO
  sentences[sentences.length - 1].end = t + OUTRO
  return { shots, sentences, outro, duration: t + OUTRO }
}

async function launch() {
  const opts = { args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] }
  try { return await chromium.launch(opts) } catch (e) {
    const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers'
    if (existsSync(path.join(base, 'chromium'))) return chromium.launch({ ...opts, executablePath: path.join(base, 'chromium') })
    throw e
  }
}

function mixAudio(script, tl, wav) {
  const bed = wav.replace(/\.wav$/, '.score.wav')
  const cues = []
  for (const s of tl.shots) {
    cues.push([Number(s.start.toFixed(3)), s.spec.sfx || 'whoosh'])
    if (s.spec.impact) cues.push([Number(s.start.toFixed(3)), 'hit'])
  }
  cues.push([Number(tl.outro.toFixed(3)), 'outro'])
  const seed = parseInt(createHash('sha1').update(script.id).digest('hex').slice(0, 6), 16)
  execFileSync('python3', ['-I', path.join(HERE, 'score.py'), String(tl.duration), bed, String(seed), JSON.stringify(cues)])
  const ins = ['-i', bed]
  const chains = []
  tl.sentences.forEach((s, i) => {
    ins.push('-i', s.wav)
    const ms = Math.round(s.at * 1000)
    chains.push(`[${i + 1}:a]atrim=0:${(s.voiceEnd - s.at + 0.1).toFixed(3)},aresample=44100,aformat=channel_layouts=stereo,adelay=${ms}|${ms}[v${i}]`)
  })
  const n = tl.sentences.length
  const filter = [
    ...chains,
    `${tl.sentences.map((_, i) => `[v${i}]`).join('')}amix=inputs=${n}:normalize=0,highpass=f=70,equalizer=f=3000:t=q:w=1.2:g=2.5,acompressor=threshold=0.1:ratio=3:attack=5:release=120,volume=1.6,apad=whole_dur=${tl.duration.toFixed(3)}[vox]`,
    '[vox]asplit=2[va][vb]',
    '[0:a]volume=1.0[bed]',
    '[bed][va]sidechaincompress=threshold=0.04:ratio=3:attack=30:release=500[bd]',
    `[bd][vb]amix=inputs=2:normalize=0,atrim=0:${tl.duration.toFixed(3)},loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100[out]`,
  ].join(';')
  execFileSync('ffmpeg', ['-v', 'error', '-y', ...ins, '-filter_complex', filter, '-map', '[out]', '-ac', '2', wav])
}

async function renderOne(browser, file) {
  const script = JSON.parse(readFileSync(path.join(scriptsDir, file), 'utf8'))
  const voice = speak(script)
  const tl = timeline(script, voice)
  const page = await browser.newPage({ viewport: { width: 540, height: 960 } })
  page.on('pageerror', (e) => console.error(`[${script.id}]`, e.message))
  page.on('console', (m) => { if (m.type() === 'error') console.error(`[${script.id}]`, m.text()) })
  await page.route(`${HOST}**`, (route) => {
    const u = route.request().url()
    if (u.endsWith('index.html')) return route.fulfill({ body: INDEX, contentType: 'text/html' })
    const hit = serve(u)
    if (!hit || !existsSync(hit)) return route.fulfill({ status: 404, body: '' })
    return route.fulfill({ body: readFileSync(hit), contentType: TYPES[path.extname(hit)] || 'application/octet-stream' })
  })
  await page.goto(`${HOST}index.html`)
  await page.waitForFunction(() => typeof window.setup === 'function')
  const { duration, frames } = await page.evaluate((a) => window.setup(a), { script, timeline: tl, fonts: FONTS, glyphs: GLYPHS })
  const grab = async (t) => Buffer.from((await page.evaluate((t) => window.frame(t), t)).split(',')[1], 'base64')

  const base = path.join(outDir, script.id)
  writeFileSync(`${base}.caption.txt`, [script.caption, '', script.cta || '', '', (script.hashtags || []).map((h) => `#${h}`).join(' ')].join('\n'))
  if (stills) {
    const dir = path.join(outDir, 'stills', script.id)
    mkdirSync(dir, { recursive: true })
    const times = tl.shots.map((s) => s.start + (s.end - s.start) * (s.spec.impact ? 0.45 : 0.6))
    times[times.length - 1] = tl.shots[tl.shots.length - 1].start + 1.2
    times.push(duration - 0.4)
    for (const [i, t] of times.entries()) writeFileSync(path.join(dir, `${String(i).padStart(2, '0')}.jpg`), await grab(t))
    const cols = Math.ceil(times.length / 2)
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-pattern_type', 'glob', '-i', path.join(dir, '*.jpg'),
      '-vf', `scale=270:-1,tile=${cols}x2:padding=6:color=0x0b0712`, '-frames:v', '1', path.join(outDir, 'stills', `${script.id}.jpg`)])
    writeFileSync(`${base}.cover.jpg`, await grab(0.9))
    await page.close()
    console.log(`stills ${script.id} (${duration.toFixed(1)} s) → ${path.relative(REPO, path.join(outDir, 'stills', script.id + '.jpg'))}`)
    return
  }

  const wav = `${base}.wav`
  mixAudio(script, tl, wav)
  const mp4 = `${base}.mp4`
  const ff = spawn('ffmpeg', ['-v', 'error', '-y',
    '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-i', wav,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-maxrate', '10M', '-bufsize', '20M',
    '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', mp4,
  ], { stdio: ['pipe', 'inherit', 'inherit'] })
  const done = new Promise((res, rej) => ff.on('close', (c) => (c ? rej(new Error(`ffmpeg ${c}`)) : res())))
  const t0 = Date.now()
  for (let f = 0; f < frames; f++) {
    const buf = await grab(f / FPS)
    if (f === 27) writeFileSync(`${base}.cover.jpg`, buf)
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r))
  }
  ff.stdin.end()
  await done
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', mp4, '-vf', 'scale=720:-2', '-c:v', 'libx264', '-preset', 'slow',
    '-crf', '25', '-maxrate', '2M', '-bufsize', '4M', '-pix_fmt', 'yuv420p', '-c:a', 'copy',
    '-movflags', '+faststart', `${base}.web.mp4`])
  await page.close()
  console.log(`${script.id}: ${duration.toFixed(1)} s, ${frames} frames in ${((Date.now() - t0) / 1000).toFixed(0)}s → ${path.relative(REPO, mp4)}`)
}

const browser = await launch()
const queue = [...files]
await Promise.all(Array.from({ length: Math.min(jobs, queue.length) }, async () => {
  while (queue.length) await renderOne(browser, queue.shift())
}))
await browser.close()
