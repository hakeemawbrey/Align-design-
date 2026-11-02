// Shared helpers: the post list, decisions, and what's been downloaded.
import { existsSync, readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const MEDIA = process.env.INSPO_MEDIA_DIR ? path.resolve(process.env.INSPO_MEDIA_DIR) : path.join(ROOT, 'media')
const DECISIONS = path.join(ROOT, 'data', 'decisions.json')

/** The ways a post can be useful to Align. Shared by the review app and the brief. */
export const USES = [
  { key: 'hook', label: 'Hook', hint: 'the first line or first second' },
  { key: 'format', label: 'Format', hint: 'the shape of the video: series, skit, list, POV, tutorial' },
  { key: 'visual', label: 'Look', hint: 'colour, type, framing, 3D, illustration' },
  { key: 'edit', label: 'Editing', hint: 'pacing, cuts, transitions, captions' },
  { key: 'text', label: 'On-screen text', hint: 'how words sit on the screen' },
  { key: 'audio', label: 'Sound', hint: 'the track, voiceover or sound design' },
  { key: 'caption', label: 'Caption / CTA', hint: 'comment-to-get, save bait, the ask' },
  { key: 'carousel', label: 'Carousel', hint: 'slide structure and swipe hooks' },
  { key: 'series', label: 'Series', hint: 'a repeatable episode idea' },
  { key: 'pipeline', label: 'Automation', hint: 'how they make it: tools, AI, Claude Code' },
]

export function loadItems() {
  return JSON.parse(readFileSync(path.join(ROOT, 'data', 'inspo.json'), 'utf8')).items
}

export function loadDecisions() {
  return existsSync(DECISIONS) ? JSON.parse(readFileSync(DECISIONS, 'utf8')) : {}
}

export function saveDecisions(d) {
  const sorted = Object.fromEntries(Object.keys(d).sort().map((k) => [k, d[k]]))
  writeFileSync(DECISIONS, JSON.stringify(sorted, null, 1) + '\n')
}

/** Keep only fields we know, so nothing odd from a browser lands in the repo. */
export function cleanDecision(d) {
  const status = ['accepted', 'rejected', 'maybe'].includes(d?.status) ? d.status : null
  const uses = Array.isArray(d?.uses) ? d.uses.filter((u) => USES.some((x) => x.key === u)) : []
  const str = (s, n) => (typeof s === 'string' ? s.slice(0, n) : '')
  return { status, uses, feedback: str(d?.feedback, 4000), spin: str(d?.spin, 4000), updatedAt: str(d?.updatedAt, 40) || new Date().toISOString() }
}

/** shortcode → ['01.mp4', ...] for every post with files on disk. */
export function mediaIndex(dir = MEDIA) {
  const out = {}
  if (!existsSync(dir)) return out
  for (const code of readdirSync(dir)) {
    if (code.startsWith('_') || code.startsWith('.')) continue
    let files = []
    try { files = readdirSync(path.join(dir, code)).filter((f) => /\.(mp4|mov|webm|jpe?g|png|webp)$/i.test(f) && !f.includes('.part')).sort() } catch { continue }
    if (files.length) out[code] = files
  }
  return out
}

export function ensureDir(d) { mkdirSync(d, { recursive: true }); return d }
