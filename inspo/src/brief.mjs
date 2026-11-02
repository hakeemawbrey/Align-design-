// Turn your review into a brief a content program can follow.
//   npm run brief                         # from data/decisions.json
//   npm run brief -- --merge ~/Downloads/decisions.json   # fold in an export from the review page first
//
// Writes:
//   out/brief.md        what you liked and why, grouped by what to take from it, plus what you skipped
//   out/accepted.json   the same as data, for a generator to read
//   ../founder/data/imports/inspo.csv   accepted reels, so `cd founder && npm run crunch` scores them and writes Align scripts
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ROOT, USES, cleanDecision, ensureDir, loadDecisions, loadItems, mediaIndex, saveDecisions } from './items.mjs'

const csvCell = (s) => /[",\n]/.test(s ?? '') ? `"${String(s).replace(/"/g, '""')}"` : (s ?? '')
const quote = (s, n = 220) => { const t = (s || '').replace(/\s+/g, ' ').trim(); return t.length > n ? t.slice(0, n - 1) + '…' : t }

/** Merge an exported decisions file: the newer edit of each post wins. */
export function merge(into, extra) {
  const out = { ...into }
  for (const [id, d] of Object.entries(extra)) {
    if (!out[id] || (d.updatedAt ?? '') > (out[id].updatedAt ?? '')) out[id] = cleanDecision(d)
  }
  return out
}

export function makeBrief(items, decisions, media = {}) {
  const byId = new Map(items.map((i) => [i.id, i]))
  const rows = Object.entries(decisions).filter(([id]) => byId.has(id)).map(([id, d]) => ({ ...byId.get(id), ...d, downloaded: media[byId.get(id).shortcode] ?? [] }))
  const accepted = rows.filter((r) => r.status === 'accepted')
  const maybe = rows.filter((r) => r.status === 'maybe')
  const rejected = rows.filter((r) => r.status === 'rejected')
  const label = (k) => USES.find((u) => u.key === k)?.label ?? k

  const entry = (r) => [
    `- **@${r.creator}** · ${r.type} · [${r.id}](${r.url})${r.downloaded.length ? ` · \`inspo/media/${r.shortcode}/\`` : ''}`,
    r.about ? `  - Their post: ${quote(r.about)}` : null,
    r.uses?.length ? `  - Take: ${r.uses.map(label).join(', ')}` : null,
    r.feedback ? `  - Feedback: ${quote(r.feedback, 1200)}` : null,
    r.spin ? `  - **Align spin:** ${quote(r.spin, 1200)}` : null,
  ].filter(Boolean).join('\n')

  const md = [
    '# Align content brief',
    '',
    `From ${rows.length} reviewed inspiration posts: ${accepted.length} to use, ${maybe.length} maybe, ${rejected.length} skipped (of ${items.length}).`,
    '',
    '## How to use this brief',
    '',
    'You are building Align content (reels, carousels, posts) from the posts below. For each accepted post:',
    '',
    '1. Take only what is listed under **Take** (the hook shape, the format, the look...). Never reuse their words, footage, audio or likeness. Only the structure carries over.',
    '2. Follow the **Align spin** where there is one; it is the founder\'s own direction and wins over everything else here.',
    '3. Follow the **Feedback**: it says what works and what to avoid.',
    '4. Write in Align\'s voice (`founder/data/align-brief.json` → `voice.rules`) and use only true Align facts from that file. Leave anything only the founder knows as a `[bracket]`.',
    '5. Reuse the repo\'s existing makers where they fit: `reels/` (scripted reels, Align Town), `carousel/` (carousels), `founder/` (talking-head scripts), `instagram/` (posting trial reels and reading results).',
    '',
    '## By what to take from them',
    '',
    ...USES.flatMap((u) => {
      const these = accepted.filter((r) => r.uses?.includes(u.key))
      return these.length ? [`### ${u.label} (${these.length})`, '', `_${u.hint}_`, '', ...these.map(entry), ''] : []
    }),
    ...(accepted.some((r) => !r.uses?.length) ? ['### Accepted, nothing ticked', '', ...accepted.filter((r) => !r.uses?.length).map(entry), ''] : []),
    ...(maybe.length ? ['## Maybe', '', ...maybe.map(entry), ''] : []),
    ...(rejected.some((r) => r.feedback || r.spin) ? ['## Skipped, and why (avoid these)', '', ...rejected.filter((r) => r.feedback || r.spin).map(entry), ''] : []),
    ...(rejected.length ? [`Skipped without notes: ${rejected.filter((r) => !r.feedback && !r.spin).length}.`, ''] : []),
  ].join('\n')

  const data = { generatedAt: new Date().toISOString(), counts: { total: items.length, accepted: accepted.length, maybe: maybe.length, rejected: rejected.length },
    accepted: accepted.map(({ id, creator, type, url, shortcode, about, uses, feedback, spin, downloaded }) => ({ id, creator, type, url, about, uses, feedback, spin, media: downloaded.map((f) => `inspo/media/${shortcode}/${f}`) })),
    maybe: maybe.map(({ id, creator, type, url, about, uses, feedback, spin }) => ({ id, creator, type, url, about, uses, feedback, spin })),
    avoid: rejected.filter((r) => r.feedback || r.spin).map(({ id, creator, url, about, feedback }) => ({ id, creator, url, about, feedback })) }

  // founder/ scores reels and writes Align talking-head scripts for each.
  const reels = accepted.filter((r) => r.type === 'Reel')
  const csv = ['url,creator,hook,caption,format', ...reels.map((r) => [r.url, 'inspo', (r.about || '').split(/(?<=[.!?])\s/)[0], [`@${r.creator}:`, r.about, r.spin && `ALIGN SPIN: ${r.spin}`].filter(Boolean).join(' — '), 'instagram reel'].map(csvCell).join(','))].join('\n') + '\n'
  return { md, data, csv, reels: reels.length }
}

function main() {
  const args = process.argv.slice(2)
  let decisions = loadDecisions()
  const mi = args.indexOf('--merge')
  if (mi >= 0) {
    const file = path.resolve(args[mi + 1] ?? '')
    if (!existsSync(file)) { console.error(`No file at ${file}`); process.exit(1) }
    decisions = merge(decisions, JSON.parse(readFileSync(file, 'utf8')))
    saveDecisions(decisions)
    console.log(`Merged ${file} into data/decisions.json`)
  }
  const { md, data, csv, reels } = makeBrief(loadItems(), decisions, mediaIndex())
  ensureDir(path.join(ROOT, 'out'))
  writeFileSync(path.join(ROOT, 'out', 'brief.md'), md)
  writeFileSync(path.join(ROOT, 'out', 'accepted.json'), JSON.stringify(data, null, 1) + '\n')
  const founderImports = path.join(ROOT, '..', 'founder', 'data', 'imports')
  if (existsSync(path.join(ROOT, '..', 'founder'))) {
    ensureDir(founderImports)
    writeFileSync(path.join(founderImports, 'inspo.csv'), csv)
  }
  const c = data.counts
  console.log(`out/brief.md and out/accepted.json: ${c.accepted} to use, ${c.maybe} maybe, ${c.rejected} skipped of ${c.total}.`)
  if (reels) console.log(`${reels} accepted reels written to founder/data/imports/inspo.csv. Run: cd ../founder && npm run crunch`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main()
