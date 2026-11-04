// Render Align affirmation reels: script JSON → voice (Kokoro, with word
// timings) → frames (engine.js in Chromium) → MP4 with the voice over an
// original music bed.
//
//   node reels/affirm/render.mjs                 # every script
//   node reels/affirm/render.mjs venus passing   # by id
//   node reels/affirm/render.mjs --stills        # contact sheets + covers, no video
//   node reels/affirm/render.mjs --profile       # profile picture options
//   node reels/affirm/render.mjs --jobs 2

import { createRequire } from 'node:module'
import { spawn, execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(HERE, '../..')
// Playwright and the fonts come from the carousel package's node_modules.
const require = createRequire(path.join(REPO, 'carousel', 'package.json'))
const { chromium } = require('playwright')

const args = process.argv.slice(2)
const flag = (n) => args.includes(n)
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d }
const stills = flag('--stills')
const profile = flag('--profile')
const jobs = Number(opt('--jobs', 2))
const outDir = path.resolve(opt('--out', path.join(REPO, 'reels/out/affirm')))
const picks = args.filter((a, i) => !a.startsWith('--') && !['--jobs', '--out'].includes(args[i - 1]))

// Seconds: art draws a beat before the voice starts, scenes breathe between.
const LEAD_FIRST = 0.35
const LEAD = 0.8
const TAIL = 0.5
const END_HOLD = 2.8
const FPS = 30

const VOICE_DIR = process.env.ALIGN_VOICE_DIR || path.join(HERE, '.voice')
const VOICE_PY = process.env.ALIGN_VOICE_PY || (existsSync(path.join(VOICE_DIR, 'venv/bin/python')) ? path.join(VOICE_DIR, 'venv/bin/python') : 'python3')

const dataUri = (file, type) => `data:${type};base64,${readFileSync(file).toString('base64')}`
const fontDir = path.join(REPO, 'carousel/node_modules/@fontsource')
const FONTS = [
  ['Poppins', dataUri(path.join(fontDir, 'poppins/files/poppins-latin-400-normal.woff2'), 'font/woff2'), 'normal', '400'],
  ['Poppins', dataUri(path.join(fontDir, 'poppins/files/poppins-latin-600-normal.woff2'), 'font/woff2'), 'normal', '600'],
  ['Poppins', dataUri(path.join(fontDir, 'poppins/files/poppins-latin-700-normal.woff2'), 'font/woff2'), 'normal', '700'],
  ['Space Mono', dataUri(path.join(fontDir, 'space-mono/files/space-mono-latin-400-normal.woff2'), 'font/woff2'), 'normal', '400'],
  ['Space Mono', dataUri(path.join(fontDir, 'space-mono/files/space-mono-latin-700-normal.woff2'), 'font/woff2'), 'normal', '700'],
  ['EB Garamond', dataUri(path.join(fontDir, 'eb-garamond/files/eb-garamond-latin-500-italic.woff2'), 'font/woff2'), 'italic', '500'],
]
const GLYPHS = JSON.parse(readFileSync(path.join(HERE, 'glyphs.json'), 'utf8'))
const ENGINE = readFileSync(path.join(HERE, 'engine.js'), 'utf8')

const plain = (s) => s.replace(/\*/g, '')
// "*seventh house.*" → words with an emphasis flag
function lineWords(line) {
  const out = []
  let em = false
  for (const raw of line.split(/\s+/).filter(Boolean)) {
    const starts = raw.startsWith('*')
    const ends = raw.replace(/[.,!?;:…]+$/, '').endsWith('*')
    if (starts) em = true
    out.push({ w: plain(raw), em })
    if (ends) em = false
  }
  return out
}

function speak(script) {
  const req = {
    voice: script.voice ?? 'af_heart',
    speed: script.speed ?? 0.92,
    scenes: script.scenes.map((sc) => ({
      text: sc.lines.map(plain).join(' '),
      words: sc.lines.flatMap((l) => lineWords(l).map((w) => w.w)),
      pause: sc.pause ?? 0.3,
    })),
  }
  const key = createHash('sha1').update(JSON.stringify(req) + readFileSync(path.join(HERE, 'voice.py'), 'utf8')).digest('hex').slice(0, 10)
  const dir = path.join(outDir, 'voice', `${script.id}-${key}`)
  if (!existsSync(path.join(dir, 'voice.json'))) {
    mkdirSync(dir, { recursive: true })
    writeFileSync(path.join(dir, 'request.json'), JSON.stringify(req))
    execFileSync(VOICE_PY, [path.join(HERE, 'voice.py'), path.join(dir, 'request.json'), dir], { stdio: 'inherit' })
  }
  return { dir, ...JSON.parse(readFileSync(path.join(dir, 'voice.json'), 'utf8')) }
}

function timeline(script, voice) {
  let t = 0
  const scenes = [], lines = []
  script.scenes.forEach((sc, i) => {
    const v = voice.scenes[i]
    const last = i === script.scenes.length - 1
    const start = t
    const at = t + (i === 0 ? LEAD_FIRST : LEAD)
    const end = at + v.dur + (last ? END_HOLD : TAIL)
    let wi = 0
    const scLines = sc.lines.map((l) => {
      const words = lineWords(l).map((w) => {
        const [s, e] = v.words[wi++]
        return { ...w, s: at + s, e: at + e }
      })
      return { start: words[0].s, end: words[words.length - 1].e, words, scene: i }
    })
    scLines[scLines.length - 1].hideAt = end - 0.05
    lines.push(...scLines)
    scenes.push({ start, end, at, lines: scLines, wav: path.join(voice.dir, v.wav) })
    t = end
  })
  return { scenes, lines, duration: t }
}

async function launch() {
  try { return await chromium.launch() } catch (e) {
    const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers'
    if (existsSync(path.join(base, 'chromium'))) return chromium.launch({ executablePath: path.join(base, 'chromium') })
    throw e
  }
}

async function openEngine(browser, script, tl) {
  const page = await browser.newPage({ viewport: { width: 540, height: 960 } })
  page.on('pageerror', (e) => console.error(`[${script.id}]`, e.message))
  page.on('console', (m) => m.type() === 'error' && console.error(`[${script.id}]`, m.text()))
  await page.setContent('<!doctype html><body style="margin:0;background:#000"><canvas id="c"></canvas></body>')
  await page.addScriptTag({ content: ENGINE })
  await page.evaluate(([script, timeline, fonts, glyphs]) => window.setup({ script, timeline, fonts, glyphs }), [script, tl, FONTS, GLYPHS])
  return page
}
const b64 = (s) => Buffer.from(s.split(',')[1], 'base64')

function mixAudio(script, tl, wav) {
  const bed = wav.replace(/\.wav$/, '.bed.wav')
  const seed = parseInt(createHash('sha1').update(script.id).digest('hex').slice(0, 6), 16)
  const last = script.scenes[script.scenes.length - 1]
  const lt = tl.scenes[tl.scenes.length - 1]
  const bell = last.pill ? lt.lines[Math.min(last.pillAt ?? 1, lt.lines.length - 1)].start + 0.25 : null
  execFileSync(VOICE_PY, ['-I', path.join(HERE, 'bed.py'), String(tl.duration), bed, String(seed), tl.scenes.map((s) => s.start.toFixed(3)).join(','), ...(bell ? [bell.toFixed(3)] : [])])
  const ins = ['-i', bed]
  const chains = []
  tl.scenes.forEach((s, i) => {
    ins.push('-i', s.wav)
    const ms = Math.round(s.at * 1000)
    chains.push(`[${i + 1}:a]aresample=44100,aformat=channel_layouts=stereo,adelay=${ms}|${ms}[v${i}]`)
  })
  const n = tl.scenes.length
  const filter = [
    ...chains,
    `${tl.scenes.map((_, i) => `[v${i}]`).join('')}amix=inputs=${n}:normalize=0,highpass=f=80,equalizer=f=3200:t=q:w=1.2:g=2,acompressor=threshold=0.12:ratio=2.5:attack=8:release=160,aecho=0.85:0.55:42|88:0.09|0.05,volume=1.5,apad=whole_dur=${tl.duration.toFixed(3)}[vox]`,
    '[vox]asplit=2[va][vb]',
    '[0:a]volume=0.9[bed]',
    '[bed][va]sidechaincompress=threshold=0.03:ratio=4:attack=40:release=700[bd]',
    `[bd][vb]amix=inputs=2:normalize=0,atrim=0:${tl.duration.toFixed(3)},loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100[out]`,
  ].join(';')
  execFileSync('ffmpeg', ['-v', 'error', '-y', ...ins, '-filter_complex', filter, '-map', '[out]', '-ac', '2', wav])
}

async function renderOne(browser, file) {
  const script = JSON.parse(readFileSync(path.join(HERE, 'scripts', file), 'utf8'))
  const voice = speak(script)
  const tl = timeline(script, voice)
  const page = await openEngine(browser, script, tl)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(path.join(outDir, `${script.id}.cover.jpg`), b64(await page.evaluate((t) => window.cover(t), script.cover ?? script.title)))

  if (stills) {
    const dir = path.join(outDir, 'stills', script.id)
    mkdirSync(dir, { recursive: true })
    const times = tl.lines.map((l) => (l.start + l.end) / 2 + 0.25).concat([tl.duration - 0.8])
    for (const [i, t] of times.entries()) writeFileSync(path.join(dir, `${String(i).padStart(2, '0')}.jpg`), b64(await page.evaluate((t) => window.frame(t), t)))
    const cols = Math.min(8, times.length)
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-pattern_type', 'glob', '-i', path.join(dir, '*.jpg'),
      '-vf', `scale=270:-1,tile=${cols}x${Math.ceil(times.length / cols)}:padding=6:color=0x0b0620`, '-frames:v', '1', path.join(outDir, 'stills', `${script.id}.jpg`)])
    await page.close()
    console.log(`stills ${script.id} (${tl.duration.toFixed(1)}s)`)
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
  }
  ff.stdin.end()
  await done
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', mp4, '-vf', 'scale=720:-2', '-c:v', 'libx264', '-preset', 'slow',
    '-crf', '24', '-maxrate', '2.5M', '-bufsize', '5M', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k',
    '-movflags', '+faststart', path.join(outDir, `${script.id}.web.mp4`)])
  // what to paste when posting
  writeFileSync(path.join(outDir, `${script.id}.caption.txt`), `${script.caption}\n\ncomment ${script.keyword} and i'll send it to you ✦\nyour full chart is free on align, link in bio\n\n${script.hashtags.map((h) => `#${h}`).join(' ')}\n`)
  await page.close()
  console.log(`${script.id}: ${tl.duration.toFixed(1)}s, ${frames} frames in ${((Date.now() - t0) / 1000).toFixed(0)}s → ${path.relative(REPO, mp4)}`)
}

// Profile pictures: one scene per option, drawn fully, cropped square.
async function renderProfile(browser) {
  const spec = JSON.parse(readFileSync(path.join(HERE, 'profile', 'pfp.json'), 'utf8'))
  const script = { id: 'profile', scenes: spec.options.map((o) => ({ art: o.art, opts: o.opts ?? {}, lines: ['.'] })) }
  const tl = {
    scenes: spec.options.map((_, i) => ({ start: i * 20, end: i * 20 + 19, lines: [{ start: i * 20 + 0.1 }] })),
    lines: spec.options.map((_, i) => ({ start: i * 20 + 0.1, end: i * 20 + 0.2, words: [{ w: '', s: 0, e: 0 }], scene: i, hideAt: 0 })),
    duration: spec.options.length * 20,
  }
  const page = await openEngine(browser, script, tl)
  const dir = path.join(HERE, 'profile')
  for (const [i, o] of spec.options.entries()) {
    const png = path.join(outDir, `pfp-${o.id}.full.png`)
    mkdirSync(outDir, { recursive: true })
    writeFileSync(png, b64(await page.evaluate(([i, o]) => window.still(i, { zoom: o.zoom ?? 1, cy: o.cy ?? 800 }), [i, o])))
    const cy = o.cy ?? 800
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', png, '-vf', `crop=1080:1080:0:${cy - 540}`, path.join(dir, `pfp-${o.id}.png`)])
  }
  // a preview of how each reads as a small circle
  const list = spec.options.map((o) => path.join(dir, `pfp-${o.id}.png`))
  const inputs = list.flatMap((f) => ['-i', f])
  const parts = list.map((_, i) => `[${i}:v]scale=220:220,format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='if(lte(hypot(X-110,Y-110),110),255,0)'[c${i}]`)
  const pads = list.map((_, i) => `color=c=0xf4f1ec:s=260x260:d=1[bg${i}];[bg${i}][c${i}]overlay=20:20:format=auto[p${i}]`)
  execFileSync('ffmpeg', ['-v', 'error', '-y', ...inputs, '-filter_complex',
    [...parts, ...pads, `${list.map((_, i) => `[p${i}]`).join('')}hstack=inputs=${list.length}[out]`].join(';'), '-map', '[out]', '-frames:v', '1', path.join(dir, 'preview-circles.png')])
  await page.close()
  console.log(`profile: ${list.length} options → ${path.relative(REPO, dir)}`)
}

const browser = await launch()
if (profile) {
  await renderProfile(browser)
} else {
  let files = readdirSync(path.join(HERE, 'scripts')).filter((f) => f.endsWith('.json')).sort()
  if (picks.length) files = files.filter((f) => picks.some((p) => f.includes(p)))
  const queue = [...files]
  await Promise.all(Array.from({ length: Math.min(jobs, queue.length) }, async () => {
    while (queue.length) await renderOne(browser, queue.shift())
  }))
}
await browser.close()
