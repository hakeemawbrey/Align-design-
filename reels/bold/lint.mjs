// Check bold-reel scripts against SPEC.md before rendering:  node reels/bold/lint.mjs [name filters…]
// Errors (✗) must be fixed; warnings (!) are worth a look. Prints an estimated length per reel.
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import VIS from './vis/index.js'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const picks = process.argv.slice(2)
const SERIES = ['Scenarios', 'Relationships', 'Align ideas', 'Zodiac', 'Fun facts', 'Relatable', 'Houston']
const VOICES = ['af_heart', 'af_bella', 'af_nicole', 'af_sarah', 'af_aoede', 'af_kore', 'bf_emma', 'bf_isabella', 'am_michael', 'bm_george']
const KINDS = ['person', 'duo', 'crowd', 'phone', 'bubbles', 'mystery', 'deck', 'talkcard', 'stamps', 'quiz', 'stamp', 'ppa',
  'wheel', 'glyph', 'glyphs', 'planet', 'orbit', 'moon', 'elements', 'bigthree', 'constellation', 'horizon', 'aspect', 'houses', 'signcard',
  'skyline', 'map', 'freeway', 'food', 'weather', 'lovebugs', 'bayou', 'truck',
  'fact', 'word', 'versus', 'checklist', 'meter', 'flags', 'icons', 'timeline', 'clock', 'heart', 'scale', 'bars', 'calendar', 'ghost', 'butterflies', 'grid', 'note', 'notif']
const BANNED = [[/compatib/i, 'say alignment, not compatibility'], [/\bon align\b/i, 'never "on Align"'], [/\b(tinder|hinge|bumble|instagram|tiktok|snapchat|facebook|netflix|spotify|uber|starbucks|whataburger|buc-ee|astros|rockets|texans|nasa)\b/i, 'no real brands/teams'],
  [/\b(wine|beer|drunk|shots?|tequila|margarita|mimosa|cocktail|bar crawl|hangover)\b/i, 'no alcohol'], [/\b(hurricane|flood|harvey)\b/i, 'no disaster jokes'], [/\bastrologer/i, 'the voice mispronounces "astrologer"'], [/\bsoulmate\b/i, 'no soulmate promises']]
const plain = (s) => (s || '').replace(/\*/g, '').replace(/\|/g, ' ')
const nw = (s) => plain(s).split(/\s+/).filter(Boolean).length

let errs = 0, warns = 0, total = 0
const rows = []
let files = readdirSync(path.join(HERE, 'scripts')).filter((f) => f.endsWith('.json')).sort()
if (picks.length) files = files.filter((f) => picks.some((p) => f.includes(p)))
const titles = new Map()
for (const f of files) {
  const E = [], Wn = []
  let s
  try { s = JSON.parse(readFileSync(path.join(HERE, 'scripts', f), 'utf8')) } catch (e) { console.log(`✗ ${f}: bad JSON: ${e.message}`); errs++; continue }
  if (s.id !== path.basename(f, '.json')) E.push(`id "${s.id}" ≠ file name`)
  if (!SERIES.includes(s.series)) E.push(`series "${s.series}" not one of ${SERIES.join(', ')}`)
  if (!s.title) E.push('no title')
  if (titles.has(s.title)) E.push(`title duplicates ${titles.get(s.title)}`); titles.set(s.title, f)
  if (s.voice && !VOICES.includes(s.voice.voice)) E.push(`voice "${s.voice.voice}" unknown`)
  if (!Array.isArray(s.beats) || s.beats.length < 3) E.push('needs ≥ 3 beats')
  if (!s.caption) Wn.push('no caption')
  const all = JSON.stringify(s)
  for (const [re, why] of BANNED) if (re.test(all)) E.push(`${why} (${all.match(re)[0]})`)
  let dur = 0
  ;(s.beats || []).forEach((b, i) => {
    const tag = `beat ${i}`
    if (!b.head && !b.sub) E.push(`${tag}: no text`)
    const hw = nw(b.head), sw = nw(b.sub)
    if (hw > 14) E.push(`${tag}: headline ${hw} words (≤ 12)`); else if (hw > 12) Wn.push(`${tag}: headline ${hw} words`)
    if (sw > 16) E.push(`${tag}: sub ${sw} words (≤ 14)`)
    const stars = ((b.head || '').match(/\*/g) || []).length
    if (stars % 2) E.push(`${tag}: unbalanced * in head`)
    if (((b.sub || '').match(/\*/g) || []).length % 2) E.push(`${tag}: unbalanced * in sub`)
    if (b.vis) {
      if (!KINDS.includes(b.vis.k)) E.push(`${tag}: unknown vis "${b.vis.k}"`)
      else if (!VIS[b.vis.k]) Wn.push(`${tag}: vis "${b.vis.k}" not built yet`)
    }
    if (s.voice && /\d/.test(b.say ?? `${b.head ?? ''} ${b.sub ?? ''}`)) Wn.push(`${tag}: digits in spoken text (spell numbers out)`)
    if (/!/.test(`${b.head ?? ''}${b.sub ?? ''}`) && s.voice) Wn.push(`${tag}: exclamation mark in a voiced reel`)
    const min = b.vis && VIS[b.vis.k]?.min ? VIS[b.vis.k].min(b.vis) : 0
    const spoken = s.voice ? nw(b.say ?? `${b.head ?? ''} ${b.sub ?? ''}`) * 0.36 / (s.voice.speed ?? 1.05) + 0.55 : 0
    dur += Math.max(b.dur ?? 0, s.voice ? spoken : 0.9 + 0.26 * hw + 0.24 * sw + (sw ? 0.35 : 0), min, s.voice ? 0 : 2) + (b.hold ?? 0)
  })
  dur += s.endHold ?? 1.8
  total += dur
  rows.push([f, s.series, s.voice ? 'voice' : '', dur.toFixed(0) + 's', s.title])
  for (const e of E) console.log(`✗ ${f}: ${e}`)
  for (const w of Wn) console.log(`! ${f}: ${w}`)
  errs += E.length; warns += Wn.length
}
console.log(rows.map((r) => r.join('  ')).join('\n'))
console.log(`\n${files.length} scripts, ≈${(total / 60).toFixed(1)} min total · ${errs} errors · ${warns} warnings`)
process.exit(errs ? 1 : 0)
