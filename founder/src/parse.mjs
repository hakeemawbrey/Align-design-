// Parsing reels into the common shape: no file access, so the studio page
// uses the same code to score reels pasted into it.

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
    // "(paraphrased) ..." and "(possible) ..." are research notes, not words.
    hook: (v.hook ?? '').replace(/^\((paraphrased|possible)\)\s*/i, ''),
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


/**
 * Reels pasted as plain text, the way you'd copy them while scrolling:
 *
 *   https://www.instagram.com/reel/ABC/
 *   THE LOVE LETTER METHOD. write it tonight
 *   1.2M views 85K likes 1,204 comments
 *
 * A link starts a new reel, and so does a blank line. Numbers count only
 * with a label (views, likes, comments, shares, saves). Everything else is
 * the caption; its first line is the hook. A pasted CSV with a header row
 * (url, hook, caption, views...) works too.
 */
export function parsePasted(text) {
  const t = text.replace(/\r\n?/g, '\n').trim()
  if (!t) return []
  const first = t.split('\n')[0].toLowerCase()
  if (/,/.test(first) && /\b(url|hook|caption)\b/.test(first)) return parseCsv(t + '\n')
  const blocks = []
  let cur = null
  for (const raw of t.split('\n')) {
    const line = raw.trim()
    const url = line.match(/https?:\/\/\S+/)?.[0]
    if (!line) { cur = null; continue }
    if (url || !cur) { cur = { lines: [] }; blocks.push(cur) }
    cur.lines.push(line)
  }
  return blocks.map(({ lines }) => {
    const row = {}
    let text = lines.join('\n')
    const url = text.match(/https?:\/\/\S+/)?.[0]
    if (url) { row.url = url.replace(/[),.]+$/, ''); text = text.replace(url, '') }
    text = text.replace(/([\d][\d.,]*\s*[kKmM]?)\s*(views|plays|likes|comments|shares|saves)\b/g, (m, n, k) => {
      row[k.toLowerCase() === 'plays' ? 'views' : k.toLowerCase()] = n.trim()
      return ''
    })
    row.caption = text.split('\n').map((l) => l.trim().replace(/^[·•|,\s]+|[·•|,\s]+$/g, '')).filter(Boolean).join('\n')
    return row
  }).filter((r) => r.url || r.caption)
}
