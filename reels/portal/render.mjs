// Render Align "Portals" reels: script JSON → voice (Kokoro, with word
// timings, via ../affirm/voice.py) → frames (engine.js in Chromium) → MP4
// with the voice over an original glassy ambient bed (bed.py).
//
//   node reels/portal/render.mjs                 # every script
//   node reels/portal/render.mjs eleven          # by id (substring)
//   node reels/portal/render.mjs --stills        # contact sheets + covers, no video
//   node reels/portal/render.mjs --jobs 2

import { createRequire } from 'node:module'
import { spawn, execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, mkdirSync, writeFileSync, renameSync, rmSync } from 'node:fs'
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
const remix = flag('--remix') // new audio onto the existing video, no frames redrawn
const jobs = Number(opt('--jobs', 2))
const outDir = path.resolve(opt('--out', path.join(REPO, 'reels/out/portal')))
const scriptsDir = path.resolve(opt('--dir', path.join(HERE, 'scripts')))
const skipExisting = flag('--skip-existing')
const at = opt('--at', null) // --stills --at 3.1,3.4: stills at these seconds instead (check a transition)
const picks = args.filter((a, i) => !a.startsWith('--') && !['--jobs', '--out', '--dir', '--at'].includes(args[i - 1]))

// Seconds. The reference moves fast: a new object every ~4 s, the voice
// barely pauses between beats, objects dissolve while the next builds.
const LEAD_FIRST = 0.02 // the first word lands within ~0.15 s
const LEAD = 0.45
const TAIL = 0.3
const END_HOLD = 2.6
const FPS = 30

// The voice lives with the affirm series: one install, one cache format.
const VOICE_DIR = process.env.ALIGN_VOICE_DIR || path.join(AFFIRM, '.voice')
const VOICE_PY = process.env.ALIGN_VOICE_PY || (existsSync(path.join(VOICE_DIR, 'venv/bin/python')) ? path.join(VOICE_DIR, 'venv/bin/python') : 'python3')
const VOICE_SCRIPT = path.join(AFFIRM, 'voice.py')

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
const GLYPHS = JSON.parse(readFileSync(path.join(AFFIRM, 'glyphs.json'), 'utf8'))
const ENGINE = readFileSync(path.join(HERE, 'engine.js'), 'utf8')

const plain = (s) => s.replace(/\*/g, '')
// "*eleven eleven* is" → words with an emphasis flag
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

// `show` overrides what a caption line displays (digits for spoken numbers).
// Its words take their timing proportionally from the spoken words.
function showFor(sc, li) {
  const s = sc.show
  if (!s) return null
  return s[li] ?? s[String(li)] ?? null
}
function captionWords(sc, li, spoken) {
  const show = showFor(sc, li)
  if (!show) return spoken
  const sw = lineWords(show)
  const n = spoken.length, m = sw.length
  return sw.map((w, j) => {
    const a = Math.min(n - 1, Math.floor((j * n) / m))
    const b = Math.min(n - 1, Math.max(a, Math.ceil(((j + 1) * n) / m) - 1))
    return { ...w, s: spoken[a].s, e: spoken[b].e }
  })
}

function speak(script) {
  const req = {
    voice: script.voice ?? 'af_heart',
    speed: script.speed ?? 0.95,
    scenes: script.scenes.map((sc) => ({
      text: sc.lines.map(plain).join(' '),
      words: sc.lines.flatMap((l) => lineWords(l).map((w) => w.w)),
      pause: sc.pause ?? 0.25,
    })),
  }
  const key = createHash('sha1').update(JSON.stringify(req) + readFileSync(VOICE_SCRIPT, 'utf8')).digest('hex').slice(0, 10)
  const dir = path.join(outDir, 'voice', `${script.id}-${key}`)
  if (!existsSync(path.join(dir, 'voice.json'))) {
    mkdirSync(dir, { recursive: true })
    writeFileSync(path.join(dir, 'request.json'), JSON.stringify(req))
    execFileSync(VOICE_PY, [VOICE_SCRIPT, path.join(dir, 'request.json'), dir], { stdio: 'inherit' })
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
    // lists and notes hold a beat after the last item is written
    const tail = sc.tail ?? (['list', 'note'].includes(sc.art) || (sc.with ?? []).some((w) => w.art === 'list') ? TAIL + 0.55 : TAIL)
    const end = at + v.dur + (last ? END_HOLD : tail)
    let wi = 0
    const scLines = sc.lines.map((l, li) => {
      const spoken = lineWords(l).map((w) => {
        const [s, e] = v.words[wi++]
        return { ...w, s: at + s, e: at + e }
      })
      const words = captionWords(sc, li, spoken)
      return { start: spoken[0].s, end: spoken[spoken.length - 1].e, words, scene: i }
    })
    scLines[scLines.length - 1].hideAt = end - 0.05
    lines.push(...scLines)
    scenes.push({ start, end, at, lines: scLines, wav: path.join(voice.dir, v.wav) })
    t = end
  })
  return { scenes, lines, duration: t }
}

// When each step lights on the tracker (for the chimes).
function stepTimes(script, tl) {
  const out = []
  let cur = -1
  script.scenes.forEach((sc, i) => {
    if (sc.step == null || sc.step <= cur) return
    cur = sc.step
    out.push(tl.scenes[i].start + 0.15)
  })
  return out
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

function pillTime(script, tl) {
  const last = script.scenes[script.scenes.length - 1]
  const lt = tl.scenes[tl.scenes.length - 1]
  return last.pill ? lt.lines[Math.min(last.pillAt ?? 1, lt.lines.length - 1)].end + 0.2 : null
}

function mixAudio(script, tl, wav) {
  const bed = wav.replace(/\.wav$/, '.bed.wav')
  const seed = parseInt(createHash('sha1').update(script.id).digest('hex').slice(0, 6), 16)
  const ding = pillTime(script, tl)
  execFileSync(VOICE_PY, ['-I', path.join(HERE, 'bed.py'), String(tl.duration), bed, String(seed),
    tl.scenes.map((s) => s.start.toFixed(3)).join(','), stepTimes(script, tl).map((x) => x.toFixed(3)).join(','),
    ...(ding ? [ding.toFixed(3)] : [])])
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
    `${tl.scenes.map((_, i) => `[v${i}]`).join('')}amix=inputs=${n}:normalize=0,highpass=f=80,equalizer=f=3200:t=q:w=1.2:g=2,acompressor=threshold=0.12:ratio=2.5:attack=8:release=160,aecho=0.85:0.55:48|96:0.08|0.04,volume=1.5,apad=whole_dur=${tl.duration.toFixed(3)}[vox]`,
    '[vox]asplit=2[va][vb]',
    '[0:a]volume=1.0[bed]',
    '[bed][va]sidechaincompress=threshold=0.04:ratio=2.5:attack=60:release=900[bd]',
    `[bd][vb]amix=inputs=2:normalize=0,atrim=0:${tl.duration.toFixed(3)},loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100[out]`,
  ].join(';')
  execFileSync('ffmpeg', ['-v', 'error', '-y', ...ins, '-filter_complex', filter, '-map', '[out]', '-ac', '2', wav])
}

// What to paste when posting. The default follow line is skipped when the
// script's caption already asks for the follow.
function captionText(script) {
  const cap = script.caption ?? ''
  const cta = script.cta ?? (/follow/i.test(cap) ? null : 'follow for the next portal ✦ your chart and your deck are free in the align app, link in bio')
  return [cap, cta, (script.hashtags ?? []).map((h) => `#${h}`).join(' ')].filter(Boolean).join('\n\n') + '\n'
}

function loadScript(file) {
  return JSON.parse(readFileSync(path.join(scriptsDir, file), 'utf8'))
}

async function renderOne(browser, file) {
  const script = loadScript(file)
  if (skipExisting && !stills && existsSync(path.join(outDir, `${script.id}.mp4`))) return
  const voice = speak(script)
  const tl = timeline(script, voice)
  const page = await openEngine(browser, script, tl)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(path.join(outDir, `${script.id}.cover.jpg`), b64(await page.evaluate((t) => window.cover(t), script.cover ?? script.title)))

  writeFileSync(path.join(outDir, `${script.id}.caption.txt`), captionText(script))
  if (stills) {
    const dir = path.join(outDir, 'stills', script.id)
    rmSync(dir, { recursive: true, force: true })
    mkdirSync(dir, { recursive: true })
    const times = at ? at.split(',').map(Number) : tl.lines.map((l) => (l.start + l.end) / 2 + 0.25).concat([tl.duration - 0.8])
    for (const [i, t] of times.entries()) writeFileSync(path.join(dir, `${String(i).padStart(2, '0')}.jpg`), b64(await page.evaluate((t) => window.frame(t), t)))
    const cols = Math.min(8, times.length)
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-pattern_type', 'glob', '-i', path.join(dir, '*.jpg'),
      '-vf', `scale=270:-1,tile=${cols}x${Math.ceil(times.length / cols)}:padding=6:color=0x111111`, '-frames:v', '1', path.join(outDir, 'stills', `${script.id}.jpg`)])
    await page.close()
    console.log(`stills ${script.id} (${tl.duration.toFixed(1)}s) → ${path.relative(REPO, path.join(outDir, 'stills', `${script.id}.jpg`))}`)
    return
  }

  const wav = path.join(outDir, `${script.id}.wav`)
  mixAudio(script, tl, wav)
  const mp4 = path.join(outDir, `${script.id}.mp4`)
  const web = () => execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', mp4, '-vf', 'scale=720:-2', '-c:v', 'libx264', '-preset', 'slow',
    '-crf', '24', '-maxrate', '2.5M', '-bufsize', '5M', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k',
    '-movflags', '+faststart', path.join(outDir, `${script.id}.web.mp4`)])
  if (remix && existsSync(mp4)) {
    const tmp = mp4.replace(/\.mp4$/, '.remix.mp4')
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', mp4, '-i', wav, '-map', '0:v', '-map', '1:a', '-c:v', 'copy',
      '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', tmp])
    renameSync(tmp, mp4)
    web()
    await page.close()
    console.log(`${script.id}: new audio → ${path.relative(REPO, mp4)}`)
    return
  }
  const frames = Math.ceil(tl.duration * FPS)
  const part = mp4.replace(/\.mp4$/, '.part.mp4')
  const ff = spawn('ffmpeg', ['-v', 'error', '-y',
    '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-i', wav,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-maxrate', '10M', '-bufsize', '20M',
    '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', part,
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
  renameSync(part, mp4)
  web()
  writeFileSync(path.join(outDir, `${script.id}.caption.txt`), captionText(script))
  await page.close()
  console.log(`${script.id}: ${tl.duration.toFixed(1)}s, ${frames} frames in ${((Date.now() - t0) / 1000).toFixed(0)}s → ${path.relative(REPO, mp4)}`)
}

const browser = await launch()
let files = readdirSync(scriptsDir).filter((f) => f.endsWith('.json')).sort()
if (picks.length) files = files.filter((f) => picks.some((p) => f.includes(p)))
const queue = [...files]
await Promise.all(Array.from({ length: Math.min(jobs, queue.length) }, async () => {
  while (queue.length) {
    const f = queue.shift()
    try { await renderOne(browser, f) } catch (e) { console.error(`${f}: ${e.message}`); process.exitCode = 1 }
  }
}))
await browser.close()
