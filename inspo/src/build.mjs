// Bake the post list into the review page: app/dist/review.html.
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ROOT, USES, ensureDir, loadItems } from './items.mjs'

/** Align's voice rules, for Claude's drafted spins. */
function voice() {
  try {
    const brief = JSON.parse(readFileSync(path.join(ROOT, '..', 'founder', 'data', 'align-brief.json'), 'utf8'))
    return brief.voice.rules.map((r) => '- ' + r).join('\n')
  } catch { return '- Short sentences. No exclamation marks, no emoji, no "manifest". Astrology reads, it never decides. Never "download Align".' }
}

/** A self-contained module's source, ready to sit in the page's script. */
const inline = (f) => readFileSync(path.join(ROOT, 'src', f), 'utf8').replace(/^export /gm, '').replace(/<\/script/gi, '<\\/script')

const json = (v) => JSON.stringify(v).replace(/</g, '\\u003c')

export function build({ write = true } = {}) {
  const items = loadItems().map(({ id, shortcode, creator, type, url, about }) => ({ id, shortcode, creator, type, url, about }))
  const html = readFileSync(path.join(ROOT, 'app', 'review.template.html'), 'utf8')
    .replace('/*INSPO_ITEMS*/[]', json(items))
    .replace('/*INSPO_USES*/[]', json(USES))
    .replace('/*ALIGN_VOICE*/""', json(voice()))
    .replace('/*INSPO_LIB*/', () => ['spins.mjs', 'spec.mjs'].map(inline).join('\n'))
  const out = path.join(ROOT, 'app', 'dist', 'review.html')
  if (write) { ensureDir(path.dirname(out)); writeFileSync(out, html) }
  return { out, html, items: items.length, bytes: Buffer.byteLength(html) }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const r = build()
  console.log(`${path.relative(ROOT, r.out)}: ${r.items} posts, ${(r.bytes / 1024).toFixed(0)} KB`)
}
