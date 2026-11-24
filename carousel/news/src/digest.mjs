// A readable one-line-per-event digest of news/data/sky.json, for writers.
//   node news/src/digest.mjs > news/data/SKY.md
import { readFileSync } from 'node:fs'
const s = JSON.parse(readFileSync(new URL('../data/sky.json', import.meta.url)))
const et = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit' })
const cap = (x) => x[0].toUpperCase() + x.slice(1)
const out = ['# The sky, Dec 2026 – early Mar 2027', '', 'Computed with astronomy-engine (tropical, geocentric). Dates and times are New York (ET); the exact UTC moment is the `at` field in sky.json. `moon →` lines are the Moon changing sign (the "moon in X today" fact).', '']
let month = ''
for (const e of s.events) {
  const m = e.day.slice(0, 7)
  if (m !== month) { out.push('', `## ${m}`, ''); month = m }
  const t = et.format(new Date(e.at)).toLowerCase() + ' ET'
  let line
  if (e.type === 'moon-ingress') line = `moon → ${e.sign}`
  else if (e.type === 'ingress') line = `**${cap(e.body)} enters ${cap(e.sign)}**${e.retrograde ? ' (retrograde)' : ''}`
  else if (e.type === 'station') line = `**${cap(e.body)} stations ${e.direction}** at ${e.degree}° ${cap(e.sign)}`
  else if (e.type === 'aspect') line = `${cap(e.a)} ${e.aspect} ${cap(e.b)} (${e.aDeg}° ${cap(e.aSign)} / ${e.bDeg}° ${cap(e.bSign)})`
  else if (e.type === 'phase') line = `**${cap(e.phase)} in ${cap(e.sign)}** ${e.degree}°`
  else line = `**${cap(e.kind)} eclipse (${e.subtype}) in ${cap(e.sign)}** ${e.degree}°`
  out.push(`- ${e.day} ${t} · ${line}`)
}
out.push('', '## Retrograde periods in range', '')
const st = s.events.filter((e) => e.type === 'station')
for (const e of st) out.push(`- ${e.day}: ${cap(e.body)} turns ${e.direction} (${e.degree}° ${cap(e.sign)})`)
out.push('', 'Already retrograde on 2026-11-25: ' + Object.entries(s.days[0].positions).filter(([, p]) => p.rx).map(([b, p]) => `${b} (${p.sign} ${p.degree}°)`).join(', '))
console.log(out.join('\n'))
