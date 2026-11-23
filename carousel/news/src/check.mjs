// Validate posts and cross-check every `facts` line against data/sky.json.
//
//   node news/src/check.mjs [files or dirs ...]   (default: news/posts)

import { readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { jsonFiles } from '../../src/render.mjs'
import { validate } from './schema.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sky = JSON.parse(readFileSync(path.join(ROOT, 'data/sky.json'), 'utf8'))
const dayDiff = (a, b) => Math.abs((new Date(a) - new Date(b)) / 86400000)
const near = (e, d) => dayDiff(e.day, d) <= 1

/** Returns null if the fact matches the ephemeris, else a reason. */
export function checkFact(f) {
  const m = f.trim().toLowerCase().match(/^(\d{4}-\d{2}-\d{2})\s+(.+)$/)
  if (!m) return 'unreadable (want "YYYY-MM-DD …")'
  const [, d, rest] = m
  let r
  const ev = sky.events
  if ((r = rest.match(/^moon in (\w+)$/))) {
    const day = sky.days.find((x) => x.day === d)
    if (!day) return 'date outside data'
    // The Moon can change sign during the day: accept the sign at noon or any it enters that day.
    const ok = day.moon.sign === r[1] || ev.some((e) => e.type === 'moon-ingress' && e.day === d && (e.sign === r[1] || e.from === r[1]))
    return ok ? null : `moon is in ${day.moon.sign} that day`
  }
  if ((r = rest.match(/^(\w+) enters (\w+)/))) {
    return ev.some((e) => e.type === 'ingress' && e.body === r[1] && e.sign === r[2] && near(e, d)) ? null
      : `no ${r[1]} ingress to ${r[2]} near ${d}` + hint(ev.filter((e) => e.type === 'ingress' && e.body === r[1]))
  }
  if ((r = rest.match(/^(\w+) stations (retrograde|direct)(?: (?:in )?(\w+))?/))) {
    return ev.some((e) => e.type === 'station' && e.body === r[1] && e.direction === r[2] && (!r[3] || e.sign === r[3]) && near(e, d)) ? null
      : `no ${r[1]} ${r[2]} station near ${d}` + hint(ev.filter((e) => e.type === 'station' && e.body === r[1]))
  }
  if ((r = rest.match(/^(new moon|full moon|first quarter|last quarter)(?: (?:in )?(\w+))?/))) {
    return ev.some((e) => e.type === 'phase' && e.phase === r[1] && (!r[2] || e.sign === r[2]) && near(e, d)) ? null
      : `no ${r[1]}${r[2] ? ' in ' + r[2] : ''} near ${d}` + hint(ev.filter((e) => e.type === 'phase' && e.phase === r[1]))
  }
  if ((r = rest.match(/^(solar|lunar) eclipse(?: (?:in )?(\w+))?/))) {
    return ev.some((e) => e.type === 'eclipse' && e.kind === r[1] && (!r[2] || e.sign === r[2]) && near(e, d)) ? null
      : `no ${r[1]} eclipse near ${d}` + hint(ev.filter((e) => e.type === 'eclipse'))
  }
  if ((r = rest.match(/^(\w+) (conjunction|conjunct|sextile|square|trine|opposition|opposite) (\w+)/))) {
    const asp = { conjunct: 'conjunction', opposite: 'opposition' }[r[2]] ?? r[2]
    return ev.some((e) => e.type === 'aspect' && e.aspect === asp && ((e.a === r[1] && e.b === r[3]) || (e.a === r[3] && e.b === r[1])) && near(e, d)) ? null
      : `no exact ${r[1]} ${asp} ${r[3]} near ${d}`
  }
  if ((r = rest.match(/^(\w+) (?:is )?(?:retrograde|rx)/))) {
    const day = sky.days.find((x) => x.day === d)
    return day?.positions[r[1]]?.rx ? null : `${r[1]} is not retrograde on ${d}`
  }
  if ((r = rest.match(/^(\w+) in (\w+)$/))) {
    const day = sky.days.find((x) => x.day === d)
    if (!day) return 'date outside data'
    return day.positions[r[1]]?.sign === r[2] ? null : `${r[1]} is in ${day.positions[r[1]]?.sign} on ${d}`
  }
  return 'unrecognised fact shape'
}
const hint = (list) => list.length ? ` (ephemeris: ${list.slice(0, 4).map((e) => `${e.day} ${e.sign ?? ''} ${e.direction ?? e.phase ?? e.kind ?? ''}`.trim()).join('; ')})` : ''

function main() {
  const args = process.argv.slice(2)
  const files = (args.length ? args : [path.join(ROOT, 'posts')]).flatMap((p) => (statSync(p).isDirectory() ? jsonFiles(p) : [p]))
  let bad = 0, n = 0
  const ids = new Map()
  for (const f of files) {
    let c
    try { c = JSON.parse(readFileSync(f, 'utf8')) } catch (e) { console.log(`✗ ${f}: bad JSON (${e.message})`); bad++; continue }
    n++
    const errs = validate(c)
    if (c.id && path.basename(f, '.json') !== c.id) errs.push(`id "${c.id}" doesn't match filename`)
    if (ids.has(c.id)) errs.push(`duplicate id (also ${ids.get(c.id)})`)
    ids.set(c.id, f)
    if (!Array.isArray(c.facts)) errs.push('facts: list required (may be empty for evergreen posts)')
    for (const fact of c.facts ?? []) { const why = checkFact(fact); if (why) errs.push(`fact "${fact}": ${why}`) }
    if (errs.length) { bad++; console.log(`✗ ${path.relative(process.cwd(), f)}\n    - ${errs.join('\n    - ')}`) }
  }
  console.log(`${n - bad}/${n} ok`)
  if (bad) process.exitCode = 1
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main()
