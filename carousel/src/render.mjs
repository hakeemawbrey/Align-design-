// Render carousels to JPEG/PNG slides, a caption file, a contact sheet and
// a review gallery.
//
//   node src/render.mjs [files or dirs ...] [--out out] [--format jpg|png] [--style type|photo] [--only <id>]

import { chromium } from 'playwright'
import { existsSync, readdirSync, statSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { STYLES, validate } from './schema.mjs'
import { slideHtml } from './template.mjs'
import { W, H } from './backgrounds.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const THUMB_W = 270

/** Every *.json under dir, depth-first, sorted for stable output. */
export function jsonFiles(dir, recurse = true) {
  if (!existsSync(dir)) return []
  const out = []
  for (const name of readdirSync(dir).sort()) {
    const p = path.join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) { if (recurse) out.push(...jsonFiles(p)) }
    else if (name.endsWith('.json')) out.push(p)
  }
  return out
}

// The bundled browser revision can lag the npm package; fall back to any
// chromium build that exists under PLAYWRIGHT_BROWSERS_PATH.
export async function launch() {
  try {
    return await chromium.launch()
  } catch (e) {
    const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers'
    const dirs = existsSync(base) ? readdirSync(base).filter((d) => /^chromium-\d+$/.test(d)).sort().reverse() : []
    for (const d of dirs) {
      const exe = path.join(base, d, 'chrome-linux', 'chrome')
      if (existsSync(exe)) return chromium.launch({ executablePath: exe })
    }
    throw e
  }
}

const pad = (n) => String(n).padStart(2, '0')

async function contactSheet(page, images, file) {
  const th = Math.round((THUMB_W * H) / W)
  const gap = 12
  const width = images.length * THUMB_W + (images.length + 1) * gap
  const height = th + gap * 2
  // Images go in as data URIs: a setContent page can't read file:// URLs.
  const imgs = images.map((b) => `<img src="data:image/jpeg;base64,${b.toString('base64')}">`).join('')
  await page.setViewportSize({ width, height })
  await page.setContent(`<!doctype html><style>
    *{margin:0} body{background:#0b0712;display:flex;gap:${gap}px;padding:${gap}px}
    img{width:${THUMB_W}px;height:${th}px;border-radius:6px;display:block}</style>${imgs}`, { waitUntil: 'load' })
  await page.screenshot({ path: file, type: 'jpeg', quality: 88 })
  await page.setViewportSize({ width: W, height: H })
}

// Rebuilt from whatever is in the out dir, so rendering one carousel with
// --only doesn't drop the others from the gallery.
async function writeIndex(out) {
  const ids = readdirSync(out).filter((d) => existsSync(path.join(out, d, 'caption.txt'))).sort()
  const rows = []
  for (const id of ids) {
    const slides = readdirSync(path.join(out, id)).filter((f) => /^\d+\.(jpg|png)$/.test(f)).sort()
    const caption = (await readFile(path.join(out, id, 'caption.txt'), 'utf8')).trim().replace(/&/g, '&amp;').replace(/</g, '&lt;')
    rows.push(`<section><h2>${id}</h2><pre>${caption}</pre><div class="row">${slides
      .map((f) => `<a href="${id}/${f}"><img src="${id}/${f}" loading="lazy"></a>`).join('')}</div></section>`)
  }
  await writeFile(path.join(out, 'index.html'), `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Align carousels</title>
<style>
body{margin:0;background:#0b0712;color:#e9e1f5;font:14px/1.4 ui-monospace,Menlo,monospace;padding:24px}
h1{font-size:16px;letter-spacing:.2em;opacity:.7;margin:0 0 24px}
section{margin:0 0 40px} h2{font-size:15px;margin:0 0 4px;color:#fff7ec}
pre{margin:0 0 10px;opacity:.6;white-space:pre-wrap}
.row{display:flex;gap:10px;overflow-x:auto;padding-bottom:8px}
.row img{width:240px;aspect-ratio:4/5;border-radius:6px;display:block}
</style></head><body><h1>align ✦ carousels (${ids.length})</h1>
${rows.join('\n')}
</body></html>`)
}

/**
 * Render already-validated carousel objects. Returns [{ id, dir, slides }].
 * Invalid carousels are skipped with a printed reason rather than thrown.
 */
export async function renderCarousels(carousels, { out = path.join(ROOT, 'out'), format = 'jpg', style = 'type', log = console.log } = {}) {
  await mkdir(out, { recursive: true })
  const browser = await launch()
  const results = []
  try {
    const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })
    const page = await ctx.newPage()
    for (const c of carousels) {
      const problems = validate(c)
      if (problems.length) {
        log(`✗ ${c?.id ?? '(no id)'}: skipped, invalid\n    - ${problems.join('\n    - ')}`)
        continue
      }
      const dir = path.join(out, c.id)
      await mkdir(dir, { recursive: true })
      const shots = []
      for (let i = 0; i < c.slides.length; i++) {
        await page.setContent(slideHtml(c, i, { style }), { waitUntil: 'load' })
        await page.waitForFunction(() => window.__ready === true, null, { timeout: 15000 })
        const file = path.join(dir, `${pad(i + 1)}.${format}`)
        const buf = await page.screenshot(format === 'png' ? { path: file, type: 'png' } : { path: file, type: 'jpeg', quality: 92 })
        // Contact sheet always wants JPEG thumbs; PNG renders are fine as-is too.
        shots.push(format === 'png' ? await page.screenshot({ type: 'jpeg', quality: 85 }) : buf)
        process.stdout.write(`\r  ${c.id}: ${i + 1}/${c.slides.length}`)
      }
      process.stdout.write('\n')
      await writeFile(path.join(dir, 'caption.txt'), `${c.caption}\n\n${c.hashtags.map((h) => `#${h}`).join(' ')}\n`)
      await contactSheet(page, shots, path.join(dir, 'contact.jpg'))
      log(`✓ ${c.id} → ${path.relative(process.cwd(), dir) || dir}`)
      results.push({ id: c.id, dir, slides: c.slides.length })
    }
  } finally {
    await browser.close()
  }
  await writeIndex(out)
  return results
}

function parseArgs(argv) {
  const opts = { inputs: [], out: path.join(ROOT, 'out'), format: 'jpg', style: 'type', only: null }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--out') opts.out = path.resolve(argv[++i])
    else if (a === '--format') opts.format = argv[++i]
    else if (a === '--style') opts.style = argv[++i]
    else if (a === '--only') opts.only = argv[++i]
    else if (a === '-h' || a === '--help') opts.help = true
    else opts.inputs.push(a)
  }
  if (!STYLES.includes(opts.style)) throw new Error(`--style must be ${STYLES.join(' or ')}, got ${opts.style}`)
  if (!['jpg', 'png'].includes(opts.format)) throw new Error(`--format must be jpg or png, got ${opts.format}`)
  return opts
}

async function main() {
  const opts = parseArgs(process.argv.slice(2))
  if (opts.help) {
    console.log('usage: node src/render.mjs [files or dirs ...] [--out out] [--format jpg|png] [--style type|photo] [--only <id>]')
    return
  }
  let files
  if (opts.inputs.length) {
    files = opts.inputs.flatMap((p) => (statSync(p).isDirectory() ? jsonFiles(p) : [p]))
  } else {
    const content = path.join(ROOT, 'content')
    files = [...jsonFiles(content, false), ...jsonFiles(path.join(content, 'generated'))]
  }

  const carousels = []
  for (const f of files) {
    try {
      carousels.push(JSON.parse(await readFile(f, 'utf8')))
    } catch (e) {
      console.log(`✗ ${f}: unreadable JSON (${e.message})`)
    }
  }
  const todo = opts.only ? carousels.filter((c) => c?.id === opts.only) : carousels
  if (!todo.length) {
    console.log(opts.only ? `no carousel with id "${opts.only}"` : 'nothing to render')
    process.exitCode = 1
    return
  }
  console.log(`rendering ${todo.length} carousel(s) → ${opts.out}`)
  const done = await renderCarousels(todo, opts)
  console.log(`done: ${done.length}/${todo.length} rendered. gallery: ${path.join(opts.out, 'index.html')}`)
  if (done.length < todo.length) process.exitCode = 1
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => { console.error(e); process.exit(1) })
}
