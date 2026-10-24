// The scorer: one number out of 100 for any talking-head script or source
// reel, with the reasons behind it.
//
// Three parts, blended:
//   craft  the rubric in data/rubric.json, run over the words: each
//          dimension starts at 5/10, its patterns and words add or take
//          away, its rule (hook length, number density, the loop back to
//          the hook...) adjusts, and it's clamped to 0-10
//   proof  how the reel actually did, when there are numbers: its rank in
//          the set on views (or likes), plus engagement when views exist.
//          Estimates count for less than numbers read off the post
//   fit    how well it carries over to an Align founder video: a format
//          that works as a talking head, and a topic Align has a story for
// A reel with no numbers is scored on craft and fit alone, and says so.
//
// Pure functions, no I/O: the CLI and the studio page both use this file.

const clamp = (n, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n))

/** Everything a script says, as one string. */
export function scriptText(v) {
  const beats = (v.beats ?? []).map((b) => (typeof b === 'string' ? b : b.line ?? b.text ?? '')).join(' ')
  return [v.hook, beats, v.transcript, v.cta, v.caption].filter(Boolean).join(' \n ')
}

function compile(rubric) {
  if (rubric._compiled) return rubric._compiled
  const dims = (rubric.dimensions ?? []).map((d) => {
    const h = d.heuristics ?? {}
    return {
      ...d,
      scope: h.scope ?? d.scope ?? 'full',
      regexes: (h.patterns ?? []).flatMap((p, i) => {
        try { return [{ re: new RegExp(p, 'gim'), sign: h.patternSigns?.[i] ?? 1 }] } catch { return [] }
      }),
      words: (h.words ?? []).map((w) => {
        const esc = w.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        return new RegExp(`(^|[^\\w#])${esc}($|[^\\w])`, 'i')
      }),
      wordSign: h.wordSign ?? 1,
    }
  })
  const total = dims.reduce((s, d) => s + (d.weight ?? 0), 0) || 1
  Object.defineProperty(rubric, '_compiled', { value: { dims, total }, enumerable: false })
  return rubric._compiled
}

const sentences = (t) => t.split(/(?<=[.!?])\s+|\n+/).map((x) => x.trim()).filter(Boolean)
const countWords = (t) => (t.match(/[\w'$#%]+/g) ?? []).length

// The three slices the rubric scans: the first two seconds, the end, all of it.
function slices(v) {
  const beats = (v.beats ?? []).map((b) => (typeof b === 'string' ? b : b.line ?? b.text ?? ''))
  const body = [...beats, v.transcript, v.cta].filter(Boolean).join(' \n')
  const full = [v.hook, body].filter(Boolean).join(' \n')
  const hook = (v.hook ?? sentences(full)[0] ?? '').trim()
  const ending = sentences(body || full).slice(-2).join(' ')
  return { hook, ending, full, fullWords: countWords(full), hookWords: countWords(hook) }
}

// The rubric's plain-language rules, one per dimension, as code.
function rules(key, sl) {
  const lowerFull = sl.full.toLowerCase()
  const estSec = sl.fullWords / 2.6
  switch (key) {
    case 'hook':
      if (!sl.hook) return -4
      return sl.hookWords <= 14 ? 2 : sl.hookWords <= 20 ? 0 : -2
    case 'specificity': {
      const nums = new Set(sl.full.match(/\$?\d[\d,.]*%?/g) ?? [])
      return nums.size >= 3 ? 2 : nums.size === 0 ? -3 : 0
    }
    case 'storyTension': {
      const turns = (lowerFull.match(/\b(but|until|then|so|turns out|instead|except|suddenly)\b/g) ?? []).length
      let n = turns >= 2 && turns <= 6 ? 2 : turns === 0 ? -2 : 0
      if (sentences(sl.full).some((s) => countWords(s) > 30)) n -= 1
      return n
    }
    case 'authenticity': {
      const fp = (lowerFull.match(/\b(i|i'm|i've|i'd|my|me|myself)\b/g) ?? []).length
      const r = fp / (sl.fullWords || 1)
      return r >= 0.05 ? 2 : r < 0.02 ? -2 : 0
    }
    case 'relatability': {
      const you = (lowerFull.match(/\b(you|your|you're)\b/g) ?? []).length
      const me = (lowerFull.match(/\b(i|my|me|i'm)\b/g) ?? []).length
      return you >= 2 && me >= 2 ? 1 : 0
    }
    case 'shareSaveReplay': {
      // The loop: the last line comes back to the hook's words.
      const content = (s) => new Set(s.toLowerCase().match(/[a-z']{4,}/g) ?? [])
      const hookW = content(sl.hook)
      const last = sentences(sl.full).at(-1) ?? ''
      const back = [...content(last)].filter((w) => hookW.has(w)).length
      return back >= 2 && last !== sl.hook ? 2 : 0
    }
    case 'cta': {
      const types = [/link in (my )?bio|in my bio|app store|download|try it|beta/, /follow/, /comment|tell me|answer in|yes or no/, /save this|send this|share/]
      const n = types.filter((re) => re.test(lowerFull)).length
      let pts = n === 1 ? 2 : n === 0 ? -3 : n >= 3 ? -2 : 0
      if (/link in bio|download|follow/.test(sl.hook.toLowerCase())) pts -= 2
      return pts
    }
    case 'trendFit':
      return !sl.fullWords ? -1 : estSec < 8 ? -1 : estSec <= 45 ? 2 : estSec <= 75 ? 0 : -2
    default:
      return 0
  }
}

/** Craft: 0-100 from the rubric, with a per-dimension breakdown (each 0-100). */
export function craftScore(v, rubric) {
  const { dims, total } = compile(rubric)
  const sl = slices(v)
  const breakdown = dims.map((d) => {
    const text = d.scope === 'hook' ? sl.hook : d.scope === 'ending' ? sl.ending : sl.full
    let pts = 5
    const hits = []
    for (const { re, sign } of d.regexes) {
      const found = text.match(re) ?? []
      if (!found.length) continue
      // Small signs (like "I" at +0.3) count every use, up to six; the rest count once.
      pts += sign * Math.min(found.length, Math.abs(sign) < 1 ? 6 : 1)
      hits.push(found[0].trim())
    }
    let wordHits = 0
    for (const re of d.words) {
      const m = text.match(re)
      if (m) { wordHits++; hits.push(m[0].trim()) }
    }
    pts += Math.min(3, wordHits * d.wordSign)
    pts += rules(d.key, sl)
    const score = Math.round(Math.max(0, Math.min(10, pts)) * 10)
    return { key: d.key, label: d.label, weight: d.weight, score, hits: [...new Set(hits.map((h) => h.toLowerCase()))].slice(0, 6) }
  })
  const score = breakdown.reduce((sum, b) => sum + b.score * (b.weight ?? 0), 0) / total
  return { score: Math.round(score), breakdown }
}

/** Proof: 0-100 from real numbers, ranked against the whole set. Null when there are none. */
export function proofScore(v, set) {
  const m = v.metrics ?? {}
  if (m.views == null && m.likes == null) return null
  const pct = (arr, n) => (arr.length < 2 ? 0.5 : arr.filter((x) => x <= n).length / arr.length)
  const col = (k) => set.map((x) => x.metrics?.[k]).filter((n) => n != null).sort((a, b) => a - b)
  const parts = []
  if (m.views != null) parts.push(pct(col('views'), m.views) * 100)
  else parts.push(pct(col('likes'), m.likes) * 100)
  if (m.views && (m.likes != null || m.comments != null)) {
    const er = ((m.likes ?? 0) + (m.comments ?? 0) * 3) / m.views
    // 10% weighted engagement on a reel is excellent; scale so that's about 95.
    parts.push(clamp(Math.round(Math.sqrt(er / 0.1) * 95)))
  } else if (m.comments != null) {
    // No views: rank on comments too, since comments mean people talked.
    parts.push(pct(col('comments'), m.comments) * 100)
  }
  const raw = parts.reduce((a, b) => a + b, 0) / parts.length
  const trust = m.verified ? 1 : 0.75
  return Math.round(50 + (raw - 50) * trust)
}

/** Fit: 0-100, how well this becomes an Align founder video. */
export function fitScore(v, brief) {
  const fmt = (v.format ?? '').toLowerCase()
  let pts = 50
  if (/talking|face|storytime|founder|green ?screen|pov|direct|reply|skit|tutorial|interview/.test(fmt)) pts += 20
  if (/dance|lip ?sync|trending[- ]sound|slideshow|unknown|^reel$/.test(fmt)) pts -= 20
  const text = [scriptText(v), v.topic, ...(v.themes ?? [])].filter(Boolean).join(' ').toLowerCase()
  let hit = 0
  for (const b of brief?.bridges ?? []) if (b.words.some((w) => text.includes(w))) hit++
  pts += Math.min(30, hit * 8)
  if (!v.hook) pts -= 15
  return clamp(Math.round(pts))
}

/**
 * Score one source reel. `set` is every reel being ranked (for the
 * percentiles). Returns { total, craft, proof, fit, breakdown, basis }.
 */
export function scoreVideo(v, { rubric, brief, set = [v] }) {
  // Only the words she said or wrote count toward craft. The researched
  // beats describe the video's structure; they aren't lines.
  const said = { hook: v.hook, transcript: [v.caption, v.transcript].filter(Boolean).join('\n') }
  const craft = craftScore(said, rubric)
  const proof = proofScore(v, set)
  const fit = fitScore(v, brief)
  const total = proof == null
    ? Math.round(craft.score * 0.7 + fit * 0.3)
    : Math.round(craft.score * 0.35 + proof * 0.45 + fit * 0.2)
  return {
    total, craft: craft.score, proof, fit,
    breakdown: craft.breakdown,
    basis: proof == null ? 'craft + fit (no public numbers)' : `craft + proof + fit (${v.metrics?.verified ? 'numbers read off the post' : 'estimated numbers, discounted'})`,
  }
}

/** Score an Align script: craft and fit only, since it hasn't been posted yet. */
export function scoreScript(s, { rubric, brief }) {
  const craft = craftScore(s, rubric)
  const fit = fitScore({ ...s, format: s.format ?? 'talking head' }, brief)
  return { total: Math.round(craft.score * 0.8 + fit * 0.2), craft: craft.score, fit, breakdown: craft.breakdown }
}

/** Letter grade for the table. */
export const grade = (n) => (n >= 85 ? 'A' : n >= 75 ? 'B+' : n >= 65 ? 'B' : n >= 55 ? 'C' : 'D')
