// Render Align mashup videos to MP4 (1080×1920, H.264 + AAC).
//
//   npm run mashup -- taurus                 one sign
//   npm run mashup -- zodiac fire big-three  themes
//   npm run mashup -- signs | themes | all   batches
//
// Options:
//   --bpm 120            tempo; every cut lands on a beat
//   --pace normal        chill | normal | hype
//   --audio song.mp3     use your own track instead of the built-in beat
//   --audio-start 32.5   start the track this many seconds in (line the drop up with the cut)
//   --silent             no soundtrack
//   --fps 30             frames per second
//   --crf 21             quality: lower = sharper and bigger (18–28)
//   --jobs 2             videos rendered at the same time
//   --out mashup/out     where the MP4s go
import { spawn } from 'node:child_process'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { tmpdir } from 'node:os'
import { chromium } from 'playwright'
import { startServer, mediaIndex } from './server.mjs'
import { ALL_VIDEOS, THEMES, ZODIAC } from './content.js'

const argv = process.argv.slice(2)
const opt = (name, def) => {
  const i = argv.indexOf(`--${name}`)
  if (i < 0) return def
  const v = argv[i + 1]
  argv.splice(i, 2)
  return v
}
const flag = (name) => {
  const i = argv.indexOf(`--${name}`)
  if (i >= 0) argv.splice(i, 1)
  return i >= 0
}

const bpm = Number(opt('bpm', 120))
const pace = opt('pace', 'normal')
const fps = Number(opt('fps', 30))
const crf = String(opt('crf', 21))
const audio = opt('audio')
const audioStart = Number(opt('audio-start', 0))
const jobs = Math.max(1, Number(opt('jobs', 2)))
const outDir = resolve(opt('out', 'mashup/out'))
const silent = flag('silent')
const help = flag('help') || flag('h')

const ids = [...new Set(argv.flatMap((a) =>
  a === 'all' ? ALL_VIDEOS : a === 'signs' ? ZODIAC : a === 'themes' ? Object.keys(THEMES) : [a]))]

if (help || !ids.length) {
  console.log(`Usage: npm run mashup -- <video…> [--bpm 120] [--pace chill|normal|hype] [--audio song.mp3] [--audio-start 0] [--silent]

Videos:
  signs   ${ZODIAC.join(' ')}
  themes  ${Object.keys(THEMES).join(' ')}
  or: signs | themes | all

Your own pictures: drop them in mashup/media/<video>/ (e.g. mashup/media/taurus/).`)
  process.exit(ids.length || help ? 0 : 1)
}
const unknown = ids.filter((id) => !ALL_VIDEOS.includes(id))
if (unknown.length) {
  console.error(`Unknown video: ${unknown.join(', ')}\nTry: ${ALL_VIDEOS.join(', ')}`)
  process.exit(1)
}
if (!['chill', 'normal', 'hype'].includes(pace)) {
  console.error('--pace must be chill, normal or hype')
  process.exit(1)
}

await mkdir(outDir, { recursive: true })
const tmp = join(tmpdir(), `align-mashup-${process.pid}`)
await mkdir(tmp, { recursive: true })

const media = await mediaIndex()
const own = Object.entries(media).map(([k, v]) => `${k} (${v.length})`)
if (own.length) console.log(`Your pictures: ${own.join(', ')}`)

const { server, port } = await startServer()
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
  .catch(() => chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }))

function ffmpeg(args) {
  const p = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: ['pipe', 'inherit', 'inherit'] })
  const done = new Promise((ok, bad) => {
    p.on('error', (e) => bad(new Error(`ffmpeg not found — install it (brew install ffmpeg / apt install ffmpeg). ${e.message}`)))
    p.on('close', (code) => (code === 0 ? ok() : bad(new Error(`ffmpeg exited ${code}`))))
  })
  return { stdin: p.stdin, done }
}

async function renderOne(id) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } })
  page.on('pageerror', (e) => console.error(`[${id}] page error:`, e.message))
  await page.goto(`http://127.0.0.1:${port}/mashup/render.html`)
  await page.waitForFunction(() => window.mashup)
  const { frames, duration } = await page.evaluate(([id, o]) => window.mashup.load(id, o), [id, { bpm, fps, pace }])

  const out = join(outDir, `align-${id}.mp4`)
  const audioArgs = []
  if (audio) {
    audioArgs.push('-ss', String(audioStart), '-i', resolve(audio))
  } else if (!silent) {
    const wavPath = join(tmp, `${id}.wav`)
    await writeFile(wavPath, Buffer.from(await page.evaluate((id) => window.mashup.music(id), id), 'base64'))
    audioArgs.push('-i', wavPath)
  }
  const fade = Math.max(0, duration - 1).toFixed(2)
  const enc = ffmpeg([
    '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    ...audioArgs,
    '-map', '0:v', ...(audioArgs.length ? ['-map', '1:a', '-af', `afade=t=out:st=${fade}:d=1`, '-c:a', 'aac', '-b:a', '192k'] : []),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', crf, '-pix_fmt', 'yuv420p', '-r', String(fps),
    '-t', duration.toFixed(3), '-movflags', '+faststart', out,
  ])

  const t0 = Date.now()
  for (let i = 0; i < frames; i++) {
    const jpg = Buffer.from(await page.evaluate((i) => window.mashup.frame(i), i), 'base64')
    if (!enc.stdin.write(jpg)) await new Promise((ok) => enc.stdin.once('drain', ok))
    if (i % 60 === 0) process.stdout.write(`\r  ${id}: ${Math.round((i / frames) * 100)}%   `)
  }
  enc.stdin.end()
  await enc.done
  await page.close()
  console.log(`\r  ✓ ${out}  (${duration.toFixed(1)}s, rendered in ${((Date.now() - t0) / 1000).toFixed(0)}s)`)
}

console.log(`Rendering ${ids.length} video${ids.length > 1 ? 's' : ''} at ${bpm} bpm, ${pace} pace…`)
let failed = 0
const queue = [...ids]
await Promise.all(Array.from({ length: Math.min(jobs, ids.length) }, async () => {
  while (queue.length) {
    const id = queue.shift()
    try { await renderOne(id) } catch (e) { failed++; console.error(`\n  ✗ ${id}: ${e.message}`) }
  }
}))

await browser.close()
server.close()
await rm(tmp, { recursive: true, force: true })
process.exit(failed ? 1 : 0)
