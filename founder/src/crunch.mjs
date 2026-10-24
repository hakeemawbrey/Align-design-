// Crunch the data: load every source reel, score it, write its Align version,
// and build the studio.
//   node src/crunch.mjs              -> out/report.md, out/scores.csv, out/scripts/*.json, app/dist/studio.html
//   node src/crunch.mjs --top 10     -> also print the top 10 to the terminal
//
// Add your own reels as CSV or JSON in data/imports/ (see src/sources.mjs for
// the columns) and run it again.

import { build as esbuild } from 'esbuild'
import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadCreators, loadSources } from './sources.mjs'
import { scoreVideo, scoreScript, grade } from './score.mjs'
import { adapt, classify, LIB } from './adapt.mjs'
import { BRIDGES } from './library.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => JSON.parse(readFileSync(path.join(ROOT, p), 'utf8'))
const args = process.argv.slice(2)
const top = args.includes('--top') ? Number(args[args.indexOf('--top') + 1]) || 10 : 0

const rubric = read('data/rubric.json')
const alignBrief = read('data/align-brief.json')
const creators = loadCreators(ROOT)
const brief = {
  bridges: BRIDGES,
  voice: alignBrief.voice.rules.filter((r) => !/^visual/i.test(r)),
  facts: alignBrief.facts,
}

// 1. Load and classify.
const sources = loadSources(ROOT).map((v) => ({ ...v, ...classify(v) }))

// 2. Score every reel against its own creator's set: audiences differ, so
//    a like on one account isn't worth a like on another.
const byCreator = Map.groupBy(sources, (v) => v.creator)
for (const v of sources) v.score = scoreVideo(v, { rubric, brief, set: byCreator.get(v.creator) })
sources.sort((a, b) => b.score.total - a.score.total)

// 3. An Align version of each, best reels first so they get first pick of
//    the angles (spread per creator).
const used = new Map()
const scripts = sources.map((v) => {
  if (!used.has(v.creator)) used.set(v.creator, new Map())
  const s = adapt(v, { used: used.get(v.creator) })
  s.score = scoreScript(s, { rubric, brief })
  v.alignId = s.id
  return s
})

// 4. Files.
const out = path.join(ROOT, 'out')
rmSync(path.join(out, 'scripts'), { recursive: true, force: true })
mkdirSync(path.join(out, 'scripts'), { recursive: true })
for (const s of scripts) writeFileSync(path.join(out, 'scripts', `${s.id}.json`), JSON.stringify(s, null, 2) + '\n')

const csvCell = (x) => (x == null ? '' : /[",\n]/.test(String(x)) ? `"${String(x).replace(/"/g, '""')}"` : String(x))
const rows = [['rank', 'creator', 'id', 'score', 'grade', 'craft', 'proof', 'fit', 'hook_type', 'format', 'likes', 'views', 'numbers', 'hook', 'url', 'align_score', 'align_hook', 'align_needs_facts']]
sources.forEach((v, i) => {
  const s = scripts.find((x) => x.id === v.alignId)
  rows.push([i + 1, v.creator, v.id, v.score.total, grade(v.score.total), v.score.craft, v.score.proof, v.score.fit, v.hookKey, v.formatKey,
    v.metrics?.likes, v.metrics?.views, v.metrics ? (v.metrics.verified ? 'verified' : 'estimate') : 'none', v.hook, v.url, s.score.total, s.hook, s.needsFacts])
})
writeFileSync(path.join(out, 'scores.csv'), rows.map((r) => r.map(csvCell).join(',')).join('\n') + '\n')

const label = (list, k) => LIB[list].find((x) => x.key === k)?.label ?? k
const handles = [...byCreator.keys()]
const row = (v, i) => {
  const s = scripts.find((x) => x.id === v.alignId)
  const nums = v.metrics ? [v.metrics.views != null && `${v.metrics.views.toLocaleString()} views`, v.metrics.likes != null && `${v.metrics.likes.toLocaleString()} likes`].filter(Boolean).join(', ') : '—'
  const hook = (v.hook || `(${v.topic})`).replace(/\|/g, '/').replace(/\n/g, ' ').slice(0, 90)
  return `| ${i + 1} | ${v.score.total} | ${v.url ? `[${hook}](${v.url})` : hook} | ${label('hooks', v.hookKey)} · ${label('formats', v.formatKey)} | ${nums} | ${s.hook.replace(/\|/g, '/')}${s.needsFacts ? ' *(fill the brackets)*' : ''} | ${s.score.total} |`
}
const md = [
  '# Founder Studio: scored reels',
  '',
  `${sources.length} source reels from ${handles.map((h) => '@' + h).join(' and ')}, scored out of 100 against each creator's own set. Each has an Align version. No public numbers are verified, so they count for less.`,
  ...handles.flatMap((h) => {
    const list = byCreator.get(h).slice().sort((a, b) => b.score.total - a.score.total)
    return [
      '', `## @${h}`, '',
      `${list.length} reels, ${list.filter((v) => v.score.proof != null).length} with public numbers.`, '',
      '| # | Score | Hook | Type · format | Numbers | Align version | Align score |',
      '| ---: | ---: | --- | --- | --- | --- | ---: |',
      ...list.map(row),
    ]
  }),
  '',
].join('\n')
writeFileSync(path.join(out, 'report.md'), md)

// 5. The studio: one self-contained page with the engine and data baked in.
const engine = await esbuild({
  stdin: {
    contents: `export { scoreScript, grade } from './src/score.mjs'\nexport { remix } from './src/adapt.mjs'`,
    resolveDir: ROOT, loader: 'js',
  },
  bundle: true, format: 'iife', globalName: 'AlignFounder', minify: true, write: false,
})
const slim = (v) => ({
  id: v.id, creator: v.creator, platform: v.platform, url: v.url, date: v.date, hook: v.hook, topic: v.topic, format: v.format,
  beats: v.beats, cta: v.cta, metrics: v.metrics, confidence: v.confidence, sourceNote: v.sourceNote,
  hookKey: v.hookKey, formatKey: v.formatKey, alignId: v.alignId, score: v.score, origin: v.origin,
})
const data = {
  sources: sources.map(slim), scripts, lib: LIB, rubric, brief,
  creators: creators.map(({ videos, ...c }) => ({ ...c, count: byCreator.get(c.handle)?.length ?? 0 })),
}
const html = readFileSync(path.join(ROOT, 'app', 'studio.template.html'), 'utf8')
  .replace('/*ENGINE*/', () => engine.outputFiles[0].text)
  .replace('/*DATA*/null', () => JSON.stringify(data).replace(/</g, '\\u003c'))
mkdirSync(path.join(ROOT, 'app', 'dist'), { recursive: true })
writeFileSync(path.join(ROOT, 'app', 'dist', 'studio.html'), html)

const avg = (arr) => Math.round(arr.reduce((a, b) => a + b, 0) / (arr.length || 1))
for (const h of handles) console.log(`@${h}: ${byCreator.get(h).length} reels, avg ${avg(byCreator.get(h).map((v) => v.score.total))}`)
console.log(`${sources.length} reels scored (avg ${avg(sources.map((v) => v.score.total))}), ${scripts.length} Align versions (avg ${avg(scripts.map((s) => s.score.total))}, ${scripts.filter((s) => s.needsFacts).length} need your facts)`)
console.log(`out/report.md, out/scores.csv, out/scripts/, app/dist/studio.html (${(html.length / 1024).toFixed(0)} KB)`)
if (top) for (const [i, v] of sources.slice(0, top).entries()) console.log(`${String(i + 1).padStart(2)}. ${v.score.total}  @${v.creator}  ${v.hook || v.topic}\n      → ${scripts.find((s) => s.id === v.alignId).hook}`)
