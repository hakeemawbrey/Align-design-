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
  if (!Array.isArray(c.slides) || c.slides.length < 1 || c.slides.length > 20) { e.push('slides: 1–20'); return e }
  c.slides.forEach((s, i) => {
    const at = `slides[${i}]`
    if (!LAYOUT_NAMES.includes(s.layout)) e.push(`${at}.layout: one of ${LAYOUT_NAMES.join(', ')}`)
    if (s.sign && !SIGNS.includes(s.sign)) e.push(`${at}.sign`)
    if (s.layout === 'rank' && (!SIGNS.includes(s.sign) || !s.rank)) e.push(`${at}: rank needs sign and rank`)
    if (s.layout === 'note' && !VERDICTS.includes(s.verdict)) e.push(`${at}.verdict: ${VERDICTS.join('|')}`)
    if (s.layout === 'list' && !(Array.isArray(s.rows) && s.rows.length)) e.push(`${at}.rows: required`)
    if (s.layout !== 'list' && typeof s.headline !== 'string') e.push(`${at}.headline: required`)
    const txt = [s.headline, s.body, s.dek, ...(s.rows ?? []).map((r) => r.text)].filter(Boolean).join(' ')
    if (/!/.test(txt)) e.push(`${at}: no exclamation marks`)
    if (/\p{Extended_Pictographic}/u.test(txt)) e.push(`${at}: no emoji`)
    if (s.headline && s.headline.replace(/[*[\]]/g, '').length > 120) e.push(`${at}.headline: over 120 chars`)
    if (s.body && s.body.length > 420) e.push(`${at}.body: over 420 chars`)
    if (s.art && !ART_KINDS.includes(s.art.kind)) e.push(`${at}.art.kind: one of ${ART_KINDS.join(', ')}`)
    if (s.art?.kind === 'planet' && !(s.art.body in PLANET_COLORS)) e.push(`${at}.art.body: planet name`)
    if ((s.art?.kind === 'figure' || s.art?.kind === 'aura') && !SIGNS.includes(s.art.sign)) e.push(`${at}.art.sign`)
  })
  return e
}
