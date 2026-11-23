// The news carousel contract. See news/README.md for the field guide.

import { SIGNS } from '../../src/schema.mjs'
import { ART_KINDS, PLANET_COLORS } from './art.mjs'
import { LAYOUT_NAMES } from './template.mjs'

export const FORMATS = ['sky-roundup', 'ranked-twelve', 'sign-callout', 'sky-note', 'month-ahead', 'moon-alert', 'who-this-hits', 'venus-report', 'season-handover']
const VERDICTS = ['true', 'misleading', 'false', 'context']

export function validate(c) {
  const e = []
  if (!c || typeof c !== 'object') return ['not an object']
  if (!/^[a-z0-9][a-z0-9-]*$/.test(c.id ?? '')) e.push('id: kebab')
  if (!FORMATS.includes(c.format)) e.push(`format: one of ${FORMATS.join(', ')}`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(c.date ?? '')) e.push('date: YYYY-MM-DD')
  if (c.signs && c.signs.some((s) => !SIGNS.includes(s))) e.push('signs: sign ids')
  if (typeof c.caption !== 'string' || !c.caption.trim()) e.push('caption: required')
  if (!Array.isArray(c.hashtags) || c.hashtags.length < 3 || c.hashtags.length > 8 || c.hashtags.some((h) => !/^[a-z0-9_]+$/.test(h))) e.push('hashtags: 3–8, lowercase, no #')
  const maxSlides = c.format === 'ranked-twelve' ? 14 : 7
  if (!Array.isArray(c.slides) || c.slides.length < 1 || c.slides.length > maxSlides) { e.push(`slides: 1–${maxSlides}`); return e }
  c.slides.forEach((s, i) => {
    const at = `slides[${i}]`
    if (!LAYOUT_NAMES.includes(s.layout)) e.push(`${at}.layout: one of ${LAYOUT_NAMES.join(', ')}`)
    if (s.sign && !SIGNS.includes(s.sign)) e.push(`${at}.sign`)
    if (s.layout === 'rank' && (!SIGNS.includes(s.sign) || !s.rank)) e.push(`${at}: rank needs sign and rank`)
    if (s.layout === 'note' && !VERDICTS.includes(s.verdict)) e.push(`${at}.verdict: ${VERDICTS.join('|')}`)
    if ((s.layout === 'list' || s.layout === 'table') && !(Array.isArray(s.rows) && s.rows.length)) e.push(`${at}.rows: required`)
    if (s.layout === 'split' && !s.art2) e.push(`${at}.art2: split needs two arts`)
    if (s.layout !== 'list' && s.layout !== 'table' && typeof s.headline !== 'string') e.push(`${at}.headline: required`)
    const txt = [s.headline, s.body, s.dek, ...(s.rows ?? []).map((r) => r.text)].filter(Boolean).join(' ')
    if (/!/.test(txt)) e.push(`${at}: no exclamation marks`)
    if (/\p{Extended_Pictographic}/u.test(txt)) e.push(`${at}: no emoji`)
    // Lean limits: one idea per slide, room to breathe.
    const plain = (t) => (t ?? '').replace(/[*[\]]/g, '')
    const H = { cover: 72, hero: 72, breaking: 64, split: 64, callout: 72, end: 64 }[s.layout] ?? 90
    if (s.headline && plain(s.headline).length > H) e.push(`${at}.headline: ${plain(s.headline).length} chars (max ${H} on ${s.layout})`)
    const B = { rank: 170, note: 200, story: 150, callout: 90, end: 80 }[s.layout] ?? 0
    if (s.body && plain(s.body).length > B) e.push(`${at}.body: ${plain(s.body).length} chars (max ${B} on ${s.layout})`)
    if (s.dek && plain(s.dek).length > 48) e.push(`${at}.dek: max 48 chars`)
    if (s.rows && s.rows.length > 5) e.push(`${at}.rows: max 5`)
    for (const r of s.rows ?? []) if (plain(r.text).length > 44) e.push(`${at}.row "${r.label}": text max 44 chars`)
    for (const k of ['art2', 'inset']) if (s[k] && !ART_KINDS.includes(s[k].kind)) e.push(`${at}.${k}.kind`)
    if (s.art && !ART_KINDS.includes(s.art.kind)) e.push(`${at}.art.kind: one of ${ART_KINDS.join(', ')}`)
    if (s.art?.kind === 'planet' && !(s.art.body in PLANET_COLORS)) e.push(`${at}.art.body: planet name`)
    if ((s.art?.kind === 'figure' || s.art?.kind === 'aura') && !SIGNS.includes(s.art.sign)) e.push(`${at}.art.sign`)
  })
  return e
}
