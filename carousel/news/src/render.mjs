// Render news carousels to slides + caption + contact sheet + review gallery.
//
//   node news/src/render.mjs [files or dirs ...] [--out news/out] [--only <id>] [--month 2026-12]
//
// Defaults to everything in news/posts/.

import { existsSync, readdirSync, statSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { launch, jsonFiles } from '../../src/render.mjs'
import * as base from './template.mjs'
// NEWS_TEMPLATE=path/to/template.mjs renders with another template (for design experiments).
const tpl = process.env.NEWS_TEMPLATE ? await import(pathToFileURL(path.resolve(process.env.NEWS_TEMPLATE)).href) : base
const { slideHtml, W, H } = tpl
import { validate } from './schema.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pad = (n) => String(n).padStart(2, '0')

async function contactSheet(page, shots, file) {
  const tw = 216, th = Math.round(tw * H / W), gap = 10
  const width = shots.length * tw + (shots.length + 1) * gap
  await page.setViewportSize({ width, height: th + gap * 2 })
  await page.setContent(`<!doctype html><style>*{margin:0}body{background:#05030f;display:flex;gap:${gap}px;padding:${gap}px}
    img{width:${tw}px;height:${th}px;border-radius:6px}</style>${shots.map((b) => `<img src="data:image/jpeg;base64,${b.toString('base64')}">`).join('')}`)
  await page.screenshot({ path: file, type: 'jpeg', quality: 86 })
  await page.setViewportSize({ width: W, height: H })
}

export async function renderNews(list, { out = path.join(ROOT, 'out'), log = console.log, force = false } = {}) {
  await mkdir(out, { recursive: true })
  const browser = await launch()
  const done = []
  try {
    const page = await (await browser.newContext({ viewport: { width: W, height: H } })).newPage()
    for (const c of list) {
      const errs = validate(c)
      if (errs.length && !force) { log(`✗ ${c?.id}: ${errs.join('; ')}`); continue }
      const dir = path.join(out, c.id)
      await mkdir(dir, { recursive: true })
      const shots = []
      const warn = []
      for (let i = 0; i < c.slides.length; i++) {
        await page.setContent(slideHtml(c, i), { waitUntil: 'load' })
        await page.waitForFunction(() => window.__ready === true, null, { timeout: 20000 })
        const of = await page.evaluate(() => window.__overflow)
        if (of?.length) warn.push(`slide ${i + 1}: tight (${of.join(', ')})`)
        shots.push(await page.screenshot({ path: path.join(dir, `${pad(i + 1)}.jpg`), type: 'jpeg', quality: 92 }))
      }
      await writeFile(path.join(dir, 'caption.txt'), `${c.caption}\n\n${c.hashtags.map((h) => `#${h}`).join(' ')}\n`)
      await contactSheet(page, shots, path.join(dir, 'contact.jpg'))
      log(`${warn.length ? '!' : '✓'} ${c.id}${warn.length ? '  ' + warn.join(' | ') : ''}`)
      done.push(c)
    }
  } finally {
    await browser.close()
  }
  return done
}

async function main() {
  const args = process.argv.slice(2)
  const opt = { inputs: [], out: path.join(ROOT, 'out'), only: null, month: null, force: false }
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--out') opt.out = path.resolve(args[++i])
    else if (args[i] === '--only') opt.only = args[++i]
    else if (args[i] === '--month') opt.month = args[++i]
    else if (args[i] === '--force') opt.force = true
    else opt.inputs.push(args[i])
  }
  const files = opt.inputs.length
    ? opt.inputs.flatMap((p) => (statSync(p).isDirectory() ? jsonFiles(p) : [p]))
    : jsonFiles(path.join(ROOT, 'posts'))
  let list = []
  for (const f of files) {
    const j = JSON.parse(await readFile(f, 'utf8'))
    list.push(...(Array.isArray(j) ? j : [j]))
  }
  if (opt.only) list = list.filter((c) => c.id === opt.only)
  if (opt.month) list = list.filter((c) => c.date?.startsWith(opt.month))
  console.log(`rendering ${list.length} → ${opt.out}`)
  const done = await renderNews(list, { out: opt.out, force: opt.force })
  console.log(`done ${done.length}/${list.length}`)
  if (done.length < list.length) process.exitCode = 1
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main().catch((e) => { console.error(e); process.exit(1) })
