// Loading source videos: one folder per creator under data/creators/<handle>/
// (videos.json from research, patterns.json for the "What works" view) plus
// anything you add yourself under data/imports/ (CSV or JSON).
//
// CSV columns (header row, any order, all but one of hook/caption optional):
//   creator, url, date, platform, hook, caption, transcript, format, topic,
//   views, likes, comments, shares, saves
// `creator` is the handle without @ (it matches a folder in data/creators/);
// left blank, the row counts as yours ("imports").
// Paste a row per reel you watched. Numbers read off the post count as
// verified; leave them blank if you don't know them, never guess.

import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

/** A small RFC 4180 reader: quoted fields, doubled quotes, newlines in quotes. */
export function parseCsv(text) {
  const rows = []
  let row = [], field = '', q = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (q) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++ }
      else if (c === '"') q = false
      else field += c
    } else if (c === '"') q = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(field); field = ''
      if (row.some((f) => f.trim())) rows.push(row)
      row = []
    } else field += c
  }
  row.push(field)
  if (row.some((f) => f.trim())) rows.push(row)
  const [head = [], ...body] = rows
  const keys = head.map((h) => h.trim().toLowerCase())
  return body.map((r) => Object.fromEntries(keys.map((k, i) => [k, (r[i] ?? '').trim()])))
}

// "1.6M", "464.8K", "~300K", "16.4K-16.9K" (takes the first), "1,985".
export const num = (s) => {
  if (s == null || s === '') return null
  if (typeof s === 'number') return s
  const m = String(s).toLowerCase().replace(/,/g, '').match(/([\d.]+)\s*([km])?/)
  if (!m) return null
  return Math.round(parseFloat(m[1]) * (m[2] === 'm' ? 1e6 : m[2] === 'k' ? 1e3 : 1))
}

/** One imported row → the same shape as a researched video. */
export function normalize(r, i, origin) {
  const caption = r.caption || ''
  const hook = r.hook || caption.split(/\n|(?<=[.!?])\s/)[0] || ''
  const metrics = {
    views: num(r.views), likes: num(r.likes), comments: num(r.comments),
    shares: num(r.shares), saves: num(r.saves),
  }
  const hasAny = Object.values(metrics).some((n) => n != null)
  return {
    id: r.id || `${origin}-${String(i + 1).padStart(3, '0')}`,
    creator: (r.creator || '').replace(/^@/, '') || 'imports',
    platform: r.platform || (/tiktok/.test(r.url ?? '') ? 'tiktok' : 'instagram'),
    url: r.url || null,
    date: r.date || null,
    hook,
    caption,
    transcript: r.transcript || '',
    topic: r.topic || '',
    format: r.format || '',
    beats: r.beats ? String(r.beats).split('|').map((s) => s.trim()) : [],
    cta: r.cta || '',
    metrics: hasAny ? { ...metrics, verified: true } : null,
    confidence: r.transcript ? 'verbatim' : caption ? 'caption' : 'hook only',
    origin,
  }
}

/** One researched video (data/creators/<handle>/videos.json) → the common shape. */
export function fromResearch(v, i, creator = { handle: 'hothighpriestess', prefix: 'hhp' }) {
  const m = v.metrics
  const metrics = m && { views: num(m.views), likes: num(m.likes), comments: num(m.comments), verified: Boolean(m.verified), basis: m.basis ?? '' }
  return {
    id: v.id ?? `${creator.prefix}-${String(i + 1).padStart(3, '0')}`,
    creator: creator.handle,
    platform: v.platform?.startsWith('unknown') ? 'unknown' : v.platform,
    url: v.url ?? null,
    date: v.approx_date ?? v.date ?? null,
    hook: v.hook ?? '',
    caption: v.caption ?? '',
    transcript: v.transcript ?? '',
    topic: v.topic ?? '',
    format: v.format ?? '',
    beats: v.structure ?? v.beats ?? [],
    cta: v.cta && !/^n\/a/i.test(v.cta) ? v.cta : '',
    metrics: metrics && (metrics.views != null || metrics.likes != null) ? metrics : null,
    confidence: v.confidence ?? '',
    themes: [v.era, v.stella_related && 'stella', v.founder_story && 'founder story'].filter(Boolean),
    sourceNote: [v.source, v.notes].filter(Boolean).join('. '),
    origin: 'research',
  }
}

/** Every creator folder: { handle, prefix, name, company, patterns, ... }. */
export function loadCreators(root) {
  const dir = path.join(root, 'data', 'creators')
  if (!existsSync(dir)) return []
  return readdirSync(dir).sort().flatMap((handle) => {
    const p = path.join(dir, handle, 'videos.json')
    if (!existsSync(p)) return []
    const d = JSON.parse(readFileSync(p, 'utf8'))
    const pp = path.join(dir, handle, 'patterns.json')
    const patterns = existsSync(pp) ? JSON.parse(readFileSync(pp, 'utf8')) : { summary: [], forAlign: [] }
    const c = d.creator ?? {}
    return [{
      handle, prefix: c.prefix ?? handle.slice(0, 3), name: c.name ?? handle, company: c.company ?? '',
      bio: c.bio_line ?? '', patterns, videos: d.videos ?? [],
    }]
  })
}

export function loadSources(root) {
  const out = []
  for (const c of loadCreators(root)) c.videos.forEach((v, i) => out.push(fromResearch(v, i, c)))
  const dir = path.join(root, 'data', 'imports')
  if (existsSync(dir)) {
    for (const f of readdirSync(dir).sort()) {
      const p = path.join(dir, f)
      const name = path.basename(f, path.extname(f))
      if (f.endsWith('.csv')) parseCsv(readFileSync(p, 'utf8')).forEach((r, i) => out.push(normalize(r, i, name)))
      else if (f.endsWith('.json')) {
        const d = JSON.parse(readFileSync(p, 'utf8'))
        ;(Array.isArray(d) ? d : d.videos ?? []).forEach((r, i) => out.push(r.metrics !== undefined ? { ...r, origin: name } : normalize(r, i, name)))
      }
    }
  }
  // An imported reel with the same url replaces the researched one: your
  // own reading of the post beats a search snippet.
  const byKey = new Map()
  for (const v of out) byKey.set(v.url ? v.url.replace(/[?#].*$/, '').replace(/\/$/, '') : v.id, v)
  return [...byKey.values()]
}
