// news/out/index.html: every rendered post, by date, with its caption.
//   node news/src/gallery.mjs [--out news/out]

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { jsonFiles } from '../../src/render.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const i = process.argv.indexOf('--out')
const out = i > 0 ? path.resolve(process.argv[i + 1]) : path.join(ROOT, 'out')
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')

const posts = jsonFiles(path.join(ROOT, 'posts')).map((f) => JSON.parse(readFileSync(f, 'utf8')))
  .filter((c) => existsSync(path.join(out, c.id, '01.jpg')))
  .sort((a, b) => a.date.localeCompare(b.date))

let month = ''
const rows = posts.map((c) => {
  const slides = readdirSync(path.join(out, c.id)).filter((f) => /^\d+\.jpg$/.test(f)).sort()
  const head = c.date.slice(0, 7) !== month ? `<h2>${(month = c.date.slice(0, 7))}</h2>` : ''
  return `${head}<section><div class="meta"><b>${c.date}</b> · ${c.format} · ${slides.length} slides</div>
  <div class="row">${slides.map((f) => `<a href="${c.id}/${f}"><img src="${c.id}/${f}" loading="lazy"></a>`).join('')}</div>
  <pre>${esc(c.caption)}\n${c.hashtags.map((h) => '#' + h).join(' ')}</pre></section>`
}).join('\n')

writeFileSync(path.join(out, 'index.html'), `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Align sky news</title>
<style>body{margin:0;background:#0b0620;color:#efe6d6;font:14px/1.4 ui-monospace,Menlo,monospace;padding:24px}
h1{font-size:15px;letter-spacing:.24em;color:#b3a6c4}h2{margin:40px 0 12px;font-size:22px;color:#f2c75c}
section{margin:0 0 28px}.meta{color:#b3a6c4;margin-bottom:8px}.meta b{color:#efe6d6}
.row{display:flex;gap:8px;overflow-x:auto;padding-bottom:6px}.row img{width:200px;aspect-ratio:4/5;border-radius:6px}
pre{white-space:pre-wrap;color:#7d6f94;margin:6px 0 0}</style></head><body>
<h1>ALIGN ✦ SKY NEWS (${posts.length})</h1>${rows}</body></html>`)
console.log(`gallery: ${posts.length} posts → ${path.join(out, 'index.html')}`)
