// Build a batch of affirmation reels from the content bank: every body in
// bank/*.json gets an Align ending (comment for a DM, align with the right
// person, join the beta, or vote your city) and a voice, and lands in
// batch/<id>.json with a manifest.
//
//   node reels/affirm/generate.mjs --check [bank/file.json ...]   # validate the bank
//   node reels/affirm/generate.mjs                                # write batch/ + batch/manifest.csv
//   node reels/affirm/generate.mjs --seed 7                       # a different shuffle

import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d }

export const SIGNS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
export const KEYWORDS = ['VENUS', 'MARS', 'MOON', 'SEVEN', 'MATCH', 'PASSING', 'MUTUAL', 'CHART']
const GLYPHS = ['♀', '♂', '☽', '☿', '☉', '♃', '♄']

// What each art accepts. Anchors are the points labels can hang from.
export const ARTS = {
  wheel: { opts: ['highlight', 'highlightAt', 'axis', 'axisAt', 'planet', 'planetSign', 'planetAt', 'pair', 'pairAt', 'rising'], anchors: ['house', 'h7', 'asc', 'dsc', 'planet', 'pair'] },
  figures: { opts: ['pose', 'threadAt', 'forwardAt'], anchors: ['thread', 'a', 'b', 'you', 'orbit'] },
  venus: { opts: ['mirror', 'mirrorAt'], anchors: ['glass', 'handle'] },
  planet: { opts: ['glyph', 'tone', 'ring'], anchors: ['planet'] },
  sign: { opts: ['sign'], anchors: ['sign', 'stars'] },
  phases: { opts: ['lit', 'litAt'], anchors: ['moon'] },
  elements: { opts: ['element', 'second'], anchors: ['element'] },
  eclipse: { opts: [], anchors: ['moon', 'sun'] },
  syzygy: { opts: ['offline', 'alignAt'], anchors: ['moon', 'line'] },
  loop: { opts: [], anchors: ['loop'] },
  retro: { opts: ['sightAt', 'pathAt'], anchors: ['planet', 'earth', 'path'] },
}
// Words the voice mangles or the brand avoids.
const BANNED = [
  /\bastrologers?\b/i, /\bmanifest/i, /\bsoul ?mates?\b/i, /\btwin flames?\b/i, /\btoxic\b/i, /\bnarcissis/i,
  /\btrauma/i, /\bdownload/i, /\bapp\b/i, /\bAlign\b/, /!/, /#/, /\d/, /\bsyzygy\b/i,
]

function checkBody(b, where) {
  const errs = []
  const e = (m) => errs.push(`${where}: ${m}`)
  for (const k of ['key', 'title', 'cover', 'caption', 'hashtags', 'keyword', 'scenes']) if (b[k] == null) e(`missing ${k}`)
  if (errs.length) return errs
  if (!/^[a-z0-9-]+$/.test(b.key)) e(`key "${b.key}" must be lowercase-with-dashes`)
  if (!KEYWORDS.includes(b.keyword)) e(`keyword ${b.keyword} not one of ${KEYWORDS.join(' ')}`)
  if (b.cover.replace(/\*/g, '').length > 32) e('cover over 32 characters')
  if (b.caption.length > 110 || b.caption !== b.caption.toLowerCase()) e('caption must be lowercase, under 110 characters')
  if (!Array.isArray(b.hashtags) || b.hashtags.length < 3 || b.hashtags.length > 6 || b.hashtags.some((h) => /[#\s]/.test(h))) e('hashtags: 3–6, no # or spaces')
  if (!Array.isArray(b.scenes) || b.scenes.length < 3 || b.scenes.length > 4) e('3 or 4 scenes')
  let words = 0
  let prevArt = null
  for (const [si, sc] of (b.scenes ?? []).entries()) {
    const at = `scene ${si}`
    const spec = ARTS[sc.art]
    if (!spec) { e(`${at}: art "${sc.art}" unknown`); continue }
    for (const k of Object.keys(sc.opts ?? {})) if (!spec.opts.includes(k)) e(`${at}: ${sc.art} has no opt "${k}"`)
    const o = sc.opts ?? {}
    if (sc.art === 'figures' && !['apart', 'meet', 'pass', 'orbit'].includes(o.pose)) e(`${at}: figures needs pose apart|meet|pass|orbit`)
    if (sc.art === 'sign' && !SIGNS.includes(o.sign)) e(`${at}: sign needs opts.sign`)
    if (sc.art === 'planet' && !GLYPHS.includes(o.glyph)) e(`${at}: planet needs glyph one of ${GLYPHS.join(' ')}`)
    if (sc.art === 'elements' && !['fire', 'earth', 'air', 'water'].includes(o.element)) e(`${at}: elements needs element`)
    if (sc.art === 'phases' && !(o.lit >= 0 && o.lit <= 7)) e(`${at}: phases needs lit 0–7`)
    if (o.planet && !GLYPHS.includes(o.planet)) e(`${at}: wheel planet must be one of ${GLYPHS.join(' ')}`)
    if (o.planetSign != null && !SIGNS.includes(o.planetSign) && !(o.planetSign >= 0 && o.planetSign < 12)) e(`${at}: planetSign must be a sign name`)
    if (o.rising != null && !SIGNS.includes(o.rising)) e(`${at}: rising must be a sign name`)
    if (o.pair && !(Array.isArray(o.pair) && o.pair.length === 2 && o.pair.every((p) => SIGNS.includes(p)))) e(`${at}: pair must be two sign names`)
    if (o.highlight != null && !(o.highlight >= 1 && o.highlight <= 12)) e(`${at}: highlight must be a house 1–12`)
    if (sc.header && (sc.header.length > 32 || sc.header !== sc.header.toUpperCase())) e(`${at}: header must be CAPS, ≤ 32 chars`)
    if (!Array.isArray(sc.lines) || sc.lines.length < 2 || sc.lines.length > 7) e(`${at}: 2–7 lines`)
    for (const [li, l] of (sc.lines ?? []).entries()) {
      const plain = l.replace(/\*/g, '')
      const n = plain.split(/\s+/).filter(Boolean).length
      words += n
      if (n < 2 || n > 10) e(`${at} line ${li}: ${n} words (2–10)`)
      if (plain.length > 50) e(`${at} line ${li}: over 50 characters`)
      if ((l.match(/\*/g) ?? []).length % 2) e(`${at} line ${li}: unbalanced *`)
      if (/\b[A-Z]{2,}\b/.test(plain.replace(/\bI\b/g, ''))) e(`${at} line ${li}: no ALL-CAPS words in lines`)
      for (const re of BANNED) if (re.test(plain)) e(`${at} line ${li}: "${plain}" uses a banned word (${re})`)
    }
    for (const lb of sc.labels ?? []) {
      if (!spec.anchors.includes(lb.on)) e(`${at}: label anchor "${lb.on}" not on ${sc.art} (${spec.anchors.join(' ')})`)
      if (!(lb.at >= 0 && lb.at < sc.lines.length)) e(`${at}: label at ${lb.at} out of range`)
      if (lb.text.length > 28 || lb.text !== lb.text.toUpperCase()) e(`${at}: label "${lb.text}" must be CAPS, ≤ 28 chars`)
    }
    if (sc.pause != null && !(sc.pause >= 0.2 && sc.pause <= 0.8)) e(`${at}: pause 0.2–0.8`)
    prevArt = sc.art
  }
  if (words < 55 || words > 88) e(`${words} words in the body (55–88)`)
  return errs
}

function loadBank(files) {
  const bodies = []
  const errs = []
  for (const f of files) {
    let items
    try { items = JSON.parse(readFileSync(f, 'utf8')) } catch (err) { errs.push(`${f}: not valid JSON (${err.message})`); continue }
    if (!Array.isArray(items)) { errs.push(`${f}: must be a JSON array`); continue }
    for (const [i, b] of items.entries()) {
      errs.push(...checkBody(b, `${path.basename(f)}[${i}] ${b.key ?? ''}`))
      bodies.push({ ...b, family: path.basename(f, '.json') })
    }
  }
  const seen = new Map()
  for (const b of bodies) {
    for (const [k, v] of [['key', b.key], ['hook', b.scenes?.[0]?.lines?.[0]?.replace(/\*/g, '').toLowerCase()]]) {
      const id = `${k}:${v}`
      if (seen.has(id)) errs.push(`duplicate ${k} "${v}" in ${b.family} and ${seen.get(id)}`)
      else seen.set(id, b.family)
    }
  }
  return { bodies, errs }
}

// ---------- endings ----------

const COMMENT = {
  VENUS: { face: 'Venus', sub: 'HOW YOU NEED TO BE LOVED', glyph: '♀', pill: 'YOUR VENUS READING IS ON ITS WAY', send: "and I'll send you what yours needs," },
  MARS: { face: 'Mars', sub: 'HOW YOU LOVE OUT LOUD', glyph: '♂', pill: 'YOUR MARS READING IS ON ITS WAY', send: "and I'll send you what yours wants," },
  MOON: { face: 'Moon', sub: 'WHAT MAKES YOU FEEL SAFE', glyph: '☽', pill: 'YOUR MOON READING IS ON ITS WAY', send: "and I'll send you what yours needs to feel safe," },
  SEVEN: { face: 'Seven', sub: 'THE HOUSE OF PARTNERS', pill: 'YOUR 7TH HOUSE IS ON ITS WAY', send: "and I'll send you your seventh house sign," },
  MATCH: { face: 'Match', sub: 'TWO CHARTS · ONE SKY', pill: 'YOUR MATCH READING IS ON ITS WAY', send: "and I'll send you how two charts fit," },
  PASSING: { face: 'Passing', sub: 'FOR THE NEXT TIME THEY TEXT', pill: 'YOUR RETROGRADE KIT IS ON ITS WAY', send: "and I'll send you what to say when they text," },
  MUTUAL: { face: 'Mutual', sub: 'FOR THE ONE WHO KEEPS TRYING', pill: 'YOUR AFFIRMATION IS ON ITS WAY', send: "and I'll send you the affirmation for it," },
  CHART: { face: 'Chart', sub: 'YOUR SKY, READ', glyph: '☉', pill: 'YOUR CHART IS ON ITS WAY', send: "and I'll send you your full chart," },
}
const LEADS = [
  'Stop swiping on *faces.*', 'Read the sky before the *face.*', 'Love should feel like *alignment.*',
  'Someone out there already speaks your *language.*', "The right one won't need *translating.*",
  'You deserve someone who moves *toward* you.', 'It has to be *mutual.*', 'Your sky already knows your *type.*',
]
const SUBS = ['READ THE SKY BEFORE THE FACE', 'IT HAS TO BE MUTUAL', 'YOU WON\'T ARRIVE ALONE', 'A NEW DEAL AT 11:11']

function ending(kind, b, r) {
  const pick = (a) => a[Math.floor(r() * a.length)]
  if (kind === 'comment') {
    const c = COMMENT[b.keyword]
    return {
      cta: `comment ${b.keyword} and i'll send it to you ✦ free from the align app`,
      scene: {
        art: 'card', header: 'COMMENT · ' + b.keyword, opts: { face: c.face, sub: c.sub, ...(c.glyph ? { glyph: c.glyph } : {}), revealAt: 1 },
        pill: c.pill, pillAt: 1, lines: [`Comment *${b.keyword}*`, c.send, 'free from the *Align* app.'],
      },
    }
  }
  if (kind === 'right') {
    return {
      cta: 'align with the right person ✦ the align app, link in bio',
      scene: {
        art: 'card', header: 'THE ALIGN APP', opts: { face: 'Align', sub: pick(SUBS), revealAt: 1 },
        pill: 'ALIGN · LINK IN BIO', pillAt: 1, lines: [pick(LEADS), '*Align* with the right person.', 'The *Align* app.', 'Link in bio.'],
      },
    }
  }
  if (kind === 'beta') {
    return {
      cta: 'the align beta is open ✦ link in bio',
      scene: {
        art: 'card', header: 'THE ALIGN BETA', opts: { face: 'Align', sub: 'THE BETA IS OPEN', revealAt: 1 },
        pill: 'JOIN THE BETA · LINK IN BIO', pillAt: 1, lines: [pick(LEADS), 'The *Align* app is in *beta.*', 'Join it.', 'Link in bio.'],
      },
    }
  }
  return {
    cta: 'join the align beta to vote where it opens next ✦ link in bio',
    scene: {
      art: 'cities', header: 'WHERE SHOULD ALIGN OPEN NEXT', opts: { voteAt: 2 },
      pill: 'JOIN THE BETA · VOTE YOUR CITY', pillAt: 1,
      lines: ['The *Align* app is opening city by city.', 'Join the *beta*', 'to vote for your *city.*', 'Link in bio.'],
    },
  }
}

// Voices that passed the audition (see voices/README.md), and their pace.
export const VOICES = [
  { id: 'af_heart', speed: 0.92, note: 'US woman, warm (the original)' },
  { id: 'af_bella', speed: 0.92, note: 'US woman, bright' },
  { id: 'af_nicole', speed: 1.25, note: 'US woman, soft and breathy' },
  { id: 'af_aoede', speed: 0.92, note: 'US woman, clear' },
  { id: 'af_kore', speed: 0.92, note: 'US woman, full' },
  { id: 'af_sarah', speed: 0.92, note: 'US woman, light' },
  { id: 'bf_emma', speed: 0.92, note: 'UK woman, calm' },
  { id: 'bf_isabella', speed: 0.92, note: 'UK woman, crisp' },
  { id: 'am_michael', speed: 0.92, note: 'US man, low and easy' },
  { id: 'bm_george', speed: 0.92, note: 'UK man, deep' },
]
const MIX = [['comment', 0.4], ['right', 0.25], ['beta', 0.2], ['city', 0.15]]

function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const shuffle = (a, r) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [b[i], b[j]] = [b[j], b[i]] } return b }

function build(bodies, seed) {
  const r = rng(seed)
  // spread families out: round-robin across shuffled families
  const fam = new Map()
  for (const b of shuffle(bodies, r)) fam.set(b.family, [...(fam.get(b.family) ?? []), b])
  const queues = shuffle([...fam.values()], r)
  const order = []
  while (queues.some((q) => q.length)) for (const q of queues) if (q.length) order.push(q.shift())
  // endings and voices: exact proportions, shuffled
  const kinds = shuffle(MIX.flatMap(([k, p]) => Array(Math.round(p * order.length)).fill(k)), r)
  while (kinds.length < order.length) kinds.push('comment')
  const outDir = path.join(HERE, 'batch')
  if (existsSync(outDir)) rmSync(outDir, { recursive: true })
  mkdirSync(outDir, { recursive: true })
  const rows = [['id', 'family', 'title', 'ending', 'keyword', 'voice', 'words', 'caption']]
  order.forEach((b, i) => {
    const id = `${String(i + 1).padStart(3, '0')}-${b.key}`
    const voice = VOICES[i % VOICES.length]
    const end = ending(kinds[i], b, r)
    const script = {
      id, title: b.title, cover: b.cover, keyword: b.keyword, caption: b.caption, cta: end.cta, hashtags: b.hashtags,
      voice: voice.id, speed: voice.speed, family: b.family, ending: kinds[i],
      scenes: [...b.scenes, end.scene],
    }
    writeFileSync(path.join(outDir, `${id}.json`), JSON.stringify(script, null, 2) + '\n')
    const words = script.scenes.flatMap((s) => s.lines).join(' ').split(/\s+/).length
    rows.push([id, b.family, b.title, kinds[i], kinds[i] === 'comment' ? b.keyword : '', voice.id, words, b.caption])
  })
  const csv = rows.map((row) => row.map((v) => (/[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : v)).join(',')).join('\n') + '\n'
  writeFileSync(path.join(outDir, 'manifest.csv'), csv)
  return order.length
}

const bankDir = path.join(HERE, 'bank')
const given = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--seed')
const files = given.length ? given.map((f) => path.resolve(f)) : readdirSync(bankDir).filter((f) => f.endsWith('.json')).sort().map((f) => path.join(bankDir, f))
const { bodies, errs } = loadBank(files)
if (errs.length) {
  console.error(errs.join('\n'))
  console.error(`\n${errs.length} problem(s) in ${bodies.length} bodies`)
  process.exit(1)
}
if (args.includes('--check')) {
  console.log(`ok: ${bodies.length} bodies in ${files.length} file(s)`)
} else {
  const n = build(bodies, Number(opt('--seed', 11)))
  console.log(`wrote ${n} scripts → reels/affirm/batch/ (+ manifest.csv)`)
}
