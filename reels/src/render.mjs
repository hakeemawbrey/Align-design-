// npm run render -- [options]
//
// Renders finished 1080×1920 MP4 reels (with sound) plus a caption file for
// each, dealing lines from content/ without repeats across runs.
//
//   --count 12          how many reels (default 1)
//   --sign scorpio      only this sign (default: rotate through all 12)
//   --topic love|self   only this topic
//   --forever           keep rendering until stopped
//   --line "<text>"     render one specific line (needs --sign)
//   --from approved.json  render exactly the reels approved in the player (same seeds),
//                         or a batch from `npm run plan`; files already made are skipped
//   --jobs 4            with --from: render in this many parallel workers
//   --world cavelake    force a world (cavelake poolrooms meadow checker dunes nightsea snow cloudtops)
//   --handle @name      small watermark, lower left
//   --no-brand          leave out the small align ✦ mark
//   --fps 30  --internal 0.5  --out out/
import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { chromium } from 'playwright'
import { serve } from './serve.mjs'
import { ROOT, SIGNS, loadLibrary, lineId } from './content.mjs'

const args = process.argv.slice(2)
const opt = (name, def) => {
  const i = args.indexOf('--' + name)
  if (i === -1) return def
  const v = args[i + 1]
  return v === undefined || v.startsWith('--') ? true : v
}

const OUT = path.resolve(ROOT, opt('out', 'out'))
const FPS = +opt('fps', 30)
const FROM = opt('from', null)
const APPROVED = FROM ? JSON.parse(fs.readFileSync(path.resolve(process.cwd(), FROM), 'utf8')) : null
const COUNT = APPROVED ? APPROVED.length : opt('forever', false) ? Infinity : +opt('count', 1)
const SIGN = opt('sign', null)
const TOPIC = opt('topic', null)
const HANDLE = opt('handle', '') === true ? '' : opt('handle', '')
const BRAND = !args.includes('--no-brand')
const WORLD = opt('world', null)
const LINE = opt('line', null)
const INTERNAL = +opt('internal', 0.5)
fs.mkdirSync(OUT, { recursive: true })
const JOBS = +opt('jobs', 1)
const OFFSET = +opt('offset', 0)

// --jobs N: split the list into N slices and render each in its own process.
if (APPROVED && JOBS > 1) {
  const keep = []
  for (let i = 0; i < args.length; i++) {
    if (['--from', '--jobs', '--offset'].includes(args[i])) i++
    else keep.push(args[i])
  }
  const size = Math.ceil(APPROVED.length / JOBS)
  const t0 = Date.now()
  const runs = []
  for (let j = 0; j < JOBS; j++) {
    const slice = APPROVED.slice(j * size, (j + 1) * size)
    if (!slice.length) continue
    const file = path.join(OUT, `.slice-${j}.json`)
    fs.writeFileSync(file, JSON.stringify(slice))
    const child = spawn(process.execPath, [process.argv[1], ...keep, '--from', file, '--offset', String(j * size), '--out', OUT], { stdio: ['ignore', 'pipe', 'inherit'] })
    child.stdout.on('data', (d) => {
      for (const line of String(d).split(/[\r\n]+/)) if (line.includes('✓')) console.log(`  [${j + 1}/${JOBS}] ${line.trim()}`)
    })
    runs.push(new Promise((res) => child.on('close', (code) => {
      fs.rmSync(file, { force: true })
      res(code)
    })))
  }
  const codes = await Promise.all(runs)
  const made = fs.readdirSync(OUT).filter((f) => f.endsWith('.mp4')).length
  console.log(`\n${made} reel(s) in ${path.relative(process.cwd(), OUT) || '.'} (${((Date.now() - t0) / 60000).toFixed(1)} min)`)
  process.exit(codes.every((c) => c === 0) ? 0 : 1)
}

// --- dealing: no line twice until the whole deck (for this filter) is used
const LEDGER = path.join(OUT, 'ledger.json')
const ledger = fs.existsSync(LEDGER) ? JSON.parse(fs.readFileSync(LEDGER, 'utf8')) : { used: [], lastSign: null }
const used = new Set(ledger.used)
const library = loadLibrary()

function deal(n) {
  if (LINE) {
    if (!SIGN) throw new Error('--line needs --sign')
    return { sign: SIGN, topic: TOPIC || 'self', text: LINE, caption: 'break the loop', id: lineId(SIGN, LINE) }
  }
  // rotate signs in zodiac order unless one is pinned
  const sign = SIGN || SIGNS[(SIGNS.indexOf(ledger.lastSign) + 1) % 12]
  let pool = library.filter((l) => l.sign === sign && (!TOPIC || l.topic === TOPIC))
  if (!pool.length) throw new Error(`no lines for ${sign}${TOPIC ? '/' + TOPIC : ''}`)
  let fresh = pool.filter((l) => !used.has(l.id))
  if (!fresh.length) {
    for (const l of pool) used.delete(l.id)
    fresh = pool
    console.log(`  (every ${sign} line used, reshuffling — run \`npm run write -- --sign ${sign}\` for new ones)`)
  }
  const l = fresh[Math.floor(Math.random() * fresh.length)]
  used.add(l.id)
  ledger.lastSign = sign
  return l
}

function saveLedger() {
  ledger.used = [...used]
  fs.writeFileSync(LEDGER, JSON.stringify(ledger, null, 2))
}

// --- browser
const server = await serve(0)
const port = server.address().port
const browser = await chromium.launch({
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'],
})
const page = await browser.newPage({ viewport: { width: 400, height: 400 } })
page.on('pageerror', (e) => console.error('  page error:', e.message))
page.on('console', (m) => m.type() === 'error' && console.error('  console:', m.text()))
await page.goto(`http://127.0.0.1:${port}/index.html?render=1&internal=${INTERNAL}`)
await page.waitForFunction(() => window.ZEXE_READY === true, null, { timeout: 30000 })

function ffmpeg(file, wavPath) {
  const p = spawn('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-i', wavPath,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-maxrate', '14M', '-bufsize', '28M', '-pix_fmt', 'yuv420p', '-profile:v', 'high',
    '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart',
    file,
  ], { stdio: ['pipe', 'inherit', 'inherit'] })
  const done = new Promise((res, rej) => p.on('close', (c) => (c === 0 ? res() : rej(new Error('ffmpeg exited ' + c)))))
  return { stdin: p.stdin, done }
}

const stamp = new Date().toISOString().slice(0, 10)
let made = 0
let stopping = false
process.on('SIGINT', () => {
  if (stopping) process.exit(1)
  stopping = true
  console.log('\nfinishing this reel, then stopping (Ctrl+C again to quit now)')
})

while (made < COUNT && !stopping) {
  const line = APPROVED ? APPROVED[made] : deal(made)
  const seed = APPROVED ? String(line.seed) : `${line.id}:${Date.now().toString(36)}:${made}`
  const item = { ...line, seed, ...(WORLD ? { world: WORLD } : {}) }
  const t0 = Date.now()
  const info = await page.evaluate(([it, h, b]) => window.ZEXE.prepare(it, { handle: h, brand: b }), [item, HANDLE, BRAND])
  // a list renders under its own numbering, so a rerun skips what's done
  const base = APPROVED
    ? `${String(OFFSET + made + 1).padStart(3, '0')}-${line.sign}-${line.id.split('-')[1]}`
    : `${stamp}-${String(made + 1).padStart(3, '0')}-${line.sign}-${line.id.split('-')[1]}`
  if (APPROVED && fs.existsSync(path.join(OUT, base + '.mp4'))) {
    made++
    continue
  }
  const mp4 = path.join(OUT, base + '.part.mp4')
  const wav = path.join(OUT, base + '.wav')
  fs.writeFileSync(wav, Buffer.from(await page.evaluate(() => window.ZEXE.audio()), 'base64'))
  const enc = ffmpeg(mp4, wav)
  const frames = Math.ceil(info.duration * FPS)
  for (let f = 0; f < frames; f++) {
    const b64 = await page.evaluate((t) => window.ZEXE.frame(t), f / FPS)
    if (!enc.stdin.write(Buffer.from(b64, 'base64'))) await new Promise((r) => enc.stdin.once('drain', r))
    if (f % 30 === 0) process.stdout.write(`\r  ${base}  ${Math.round((f / frames) * 100)}%   `)
  }
  enc.stdin.end()
  await enc.done
  fs.renameSync(mp4, path.join(OUT, base + '.mp4'))
  fs.unlinkSync(wav)
  fs.writeFileSync(path.join(OUT, base + '.txt'), info.caption + '\n')
  fs.appendFileSync(path.join(OUT, 'manifest.jsonl'), JSON.stringify({ file: base + '.mp4', sign: line.sign, topic: line.topic, text: line.text, world: info.world, seed, duration: info.duration }) + '\n')
  if (!LINE && !APPROVED) saveLedger()
  made++
  process.stdout.write(`\r  ✓ ${base}.mp4  ${info.world}  ${info.duration.toFixed(1)}s  (${((Date.now() - t0) / 1000).toFixed(0)}s)\n    ${line.text}\n`)
}

await browser.close()
server.close()
console.log(`\n${made} reel(s) in ${path.relative(process.cwd(), OUT) || '.'}`)
