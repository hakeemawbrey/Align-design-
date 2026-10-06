// Render the reel frame-by-frame in headless Chromium and encode with ffmpeg.
// usage: node tools/export.mjs [--page index.html] [--query 'sign=leo'] [--from 0] [--to 31] [--stills 3,8.5,20] [--out out/align-reel.mp4] [--scale 1]
//   --stills  write PNGs of those timestamps to out/stills/ and skip the video
import { chromium } from '/home/user/Align-design-/app/node_modules/playwright/index.mjs'
import { spawn } from 'node:child_process'
import { createServer } from 'node:http'
import { readFile, mkdir, writeFile, access } from 'node:fs/promises'
import { extname, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d }
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.woff2': 'font/woff2', '.wav': 'audio/wav', '.png': 'image/png', '.jpg': 'image/jpeg' }

const server = createServer(async (req, res) => {
  try { const p = join(ROOT, decodeURIComponent(req.url.split('?')[0].split('#')[0])); const b = await readFile(p); res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' }); res.end(b) }
  catch { res.writeHead(404); res.end() }
}).listen(0)
const port = server.address().port

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--disable-gpu-vsync'] }).catch(() => chromium.launch())
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } })
const errors = []
page.on('console', (m) => { if (m.type() === 'error' && !m.text().includes('404')) errors.push(m.text()) })
page.on('requestfailed', (r) => errors.push('request failed: ' + r.url()))
page.on('response', (r) => { if (r.status() >= 400 && !r.url().endsWith('favicon.ico')) errors.push(r.status() + ' ' + r.url()) })
page.on('pageerror', (e) => errors.push(String(e)))
const PAGE = arg('page', 'index.html'), QUERY = arg('query', '')
await page.goto(`http://localhost:${port}/${PAGE}${QUERY ? '?' + QUERY : ''}#export`)
await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 })
const FPS = await page.evaluate(() => window.ALIGN.FPS)

async function grab(frame, type = 'jpeg') {
  const b64 = await page.evaluate(([f, ty]) => { window.ALIGN.renderFrame(f); return document.getElementById('stage').toDataURL(ty === 'png' ? 'image/png' : 'image/jpeg', 0.93).split(',')[1] }, [frame, type])
  return Buffer.from(b64, 'base64')
}

const stills = arg('stills')
if (stills) {
  await mkdir(join(ROOT, 'out/stills'), { recursive: true })
  for (const s of stills.split(',')) {
    const f = Math.round(parseFloat(s) * FPS)
    await writeFile(join(ROOT, `out/stills/${arg('prefix', '')}t${parseFloat(s).toFixed(2)}.png`), await grab(f, 'png'))
  }
  console.log('stills written:', stills)
} else {
  const total = await page.evaluate(() => window.ALIGN.totalFrames())
  const from = Math.round(parseFloat(arg('from', '0')) * FPS), to = Math.min(total, Math.round(parseFloat(arg('to', String(total / FPS))) * FPS))
  const outFile = join(ROOT, arg('out', 'out/align-reel.mp4'))
  await mkdir(dirname(outFile), { recursive: true })
  const wav = join(ROOT, arg('audio', await page.evaluate(() => window.ALIGN.TL.audio || 'out/soundtrack.wav')))
  const hasAudio = await access(wav).then(() => true, () => false) && from === 0
  const scale = arg('scale', '1')
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
    ...(hasAudio ? ['-i', wav] : []),
    '-vf', `scale=iw*${scale}:ih*${scale}:flags=lanczos,format=yuv420p`,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-tune', 'grain', '-movflags', '+faststart',
    ...(hasAudio ? ['-c:a', 'aac', '-b:a', '192k', '-shortest'] : []), outFile], { stdio: ['pipe', 'inherit', 'inherit'] })
  const t0 = Date.now()
  for (let f = from; f < to; f++) {
    const buf = await grab(f)
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r))
    if (f % 60 === 0) process.stdout.write(`frame ${f}/${to} (${((Date.now() - t0) / 1000).toFixed(0)}s)\n`)
  }
  ff.stdin.end()
  await new Promise((r) => ff.on('close', r))
  console.log('wrote', outFile, hasAudio ? '(with audio)' : '(no audio)')
}
if (errors.length) { console.log('PAGE ERRORS:\n' + [...new Set(errors)].slice(0, 20).join('\n')); process.exitCode = 2 }
await browser.close(); server.close()
