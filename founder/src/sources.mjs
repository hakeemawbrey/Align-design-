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

import { fromResearch, normalize, parseCsv } from './parse.mjs'
export { fromResearch, normalize, parseCsv, num } from './parse.mjs'

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
  // YouTube keeps the video in the query (?v=); everywhere else it's tracking.
  const key = (u) => (/youtube\.com\/watch/.test(u) ? u.replace(/&.*$/, '') : u.replace(/[?#].*$/, '').replace(/\/$/, ''))
  for (const v of out) byKey.set(v.url ? `${v.creator}:${key(v.url)}` : v.id, v)
  return [...byKey.values()]
}
