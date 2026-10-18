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
const COUNT = opt('forever', false) ? Infinity : +opt('count', 1)
const SIGN = opt('sign', null)
const TOPIC = opt('topic', null)
const HANDLE = opt('handle', '') === true ? '' : opt('handle', '')
const BRAND = !args.includes('--no-brand')
const WORLD = opt('world', null)
const LINE = opt('line', null)
const INTERNAL = +opt('internal', 0.5)
fs.mkdirSync(OUT, { recursive: true })

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
  const line = deal(made)
  const seed = `${line.id}:${Date.now().toString(36)}:${made}`
  const item = { ...line, seed, ...(WORLD ? { world: WORLD } : {}) }
  const t0 = Date.now()
  const info = await page.evaluate(([it, h, b]) => window.ZEXE.prepare(it, { handle: h, brand: b }), [item, HANDLE, BRAND])
  const base = `${stamp}-${String(made + 1).padStart(3, '0')}-${line.sign}-${line.id.split('-')[1]}`
  const mp4 = path.join(OUT, base + '.mp4')
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
  fs.unlinkSync(wav)
  fs.writeFileSync(path.join(OUT, base + '.txt'), info.caption + '\n')
  fs.appendFileSync(path.join(OUT, 'manifest.jsonl'), JSON.stringify({ file: base + '.mp4', sign: line.sign, topic: line.topic, text: line.text, world: info.world, seed, duration: info.duration }) + '\n')
  if (!LINE) saveLedger()
  made++
  process.stdout.write(`\r  ✓ ${base}.mp4  ${info.world}  ${info.duration.toFixed(1)}s  (${((Date.now() - t0) / 1000).toFixed(0)}s)\n    ${line.text}\n`)
}

await browser.close()
server.close()
console.log(`\n${made} reel(s) in ${path.relative(process.cwd(), OUT) || '.'}`)
