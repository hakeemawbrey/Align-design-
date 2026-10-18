// Loads and validates the line library in content/. Shared by check, render
// and write so they all enforce CONTENT.md the same way.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
// CONTENT_DIR env var points everything at another library (tests, scratch copies).
export const CONTENT_DIR = process.env.CONTENT_DIR ? path.resolve(process.env.CONTENT_DIR) : path.join(ROOT, 'content')

export const SIGNS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
]
export const TOPICS = ['love', 'self']

const BANNED = [
  /—/, /;/, /!/, /#/, /\bbestie\b/i, /\bmanifest/i, /\btoxic\b/i, /\bnarcissis/i,
  /\battachment\b/i, /\btrauma/i, /healing journey/i, /\bboundaries\b/i,
  /\p{Extended_Pictographic}/u,
]

const cap = (s) => s[0].toUpperCase() + s.slice(1)
export const norm = (s) => s.toLowerCase().replace(/^[a-z]+,\s*/, '').replace(/[^a-z ]/g, '').replace(/\s+/g, ' ').trim()

// Stable id for a line: sign + short hash of its text.
export function lineId(sign, text) {
  let h = 2166136261
  for (const ch of text) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
  return `${sign}-${(h >>> 0).toString(36)}`
}

export function validateLine(sign, l) {
  const errs = []
  const t = l.text || ''
  if (!TOPICS.includes(l.topic)) errs.push(`topic "${l.topic}"`)
  if (!t.startsWith(cap(sign) + ', ')) errs.push('must start with the sign name and a comma')
  if (t.length < 40 || t.length > 95) errs.push(`length ${t.length} (40–95)`)
  if (!/[.?]$/.test(t)) errs.push('must end with . or ?')
  for (const re of BANNED) if (re.test(t)) errs.push(`banned: ${re}`)
  const c = l.caption || ''
  const words = c.trim().split(/\s+/).filter(Boolean)
  if (words.length < 2 || words.length > 6) errs.push(`caption "${c}" should be 2–6 words`)
  if (c !== c.toLowerCase()) errs.push('caption must be lowercase')
  for (const re of BANNED) if (re.test(c)) errs.push(`caption banned: ${re}`)
  return errs
}

export function loadLibrary() {
  const lines = []
  for (const sign of SIGNS) {
    const file = path.join(CONTENT_DIR, `${sign}.json`)
    if (!fs.existsSync(file)) continue
    const data = JSON.parse(fs.readFileSync(file, 'utf8'))
    for (const l of data.lines) lines.push({ ...l, sign, id: lineId(sign, l.text) })
  }
  return lines
}

export function checkLibrary() {
  const problems = []
  const seen = new Map()
  const counts = {}
  for (const sign of SIGNS) {
    const file = path.join(CONTENT_DIR, `${sign}.json`)
    if (!fs.existsSync(file)) {
      problems.push(`${sign}: missing content/${sign}.json`)
      continue
    }
    const data = JSON.parse(fs.readFileSync(file, 'utf8'))
    if (data.sign !== sign) problems.push(`${sign}: "sign" field is ${data.sign}`)
    counts[sign] = { love: 0, self: 0 }
    data.lines.forEach((l, i) => {
      counts[sign][l.topic] = (counts[sign][l.topic] || 0) + 1
      for (const e of validateLine(sign, l)) problems.push(`${sign}#${i}: ${e} — ${l.text}`)
      const k = norm(l.text)
      if (seen.has(k)) problems.push(`${sign}#${i}: duplicate of ${seen.get(k)} — ${l.text}`)
      else seen.set(k, `${sign}#${i}`)
    })
  }
  return { problems, counts }
}
