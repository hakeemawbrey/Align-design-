// Source reel → Align script.
//
// classify() reads one of her reels and names its move: the hook type and
// the format. adapt() keeps that move and swaps the subject for a true
// Align story (an angle from library.mjs). remix() is the same with any of
// the three changed, which is what the studio's Remix buttons call.
// Nothing of hers is copied: only the shape of the video carries over.

import { ANGLES, HOOKS, FORMATS, BRIDGES, INTRO } from './library.mjs'

export const LIB = {
  angles: ANGLES.map(({ key, label }) => ({ key, label })),
  hooks: HOOKS.map(({ key, label }) => ({ key, label })),
  formats: FORMATS.map(({ key, label }) => ({ key, label })),
}

function rng(seed) {
  let a = typeof seed === 'number' ? seed >>> 0 : [...String(seed)].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0, 2166136261)
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const pick = (r, arr) => arr[Math.floor(r() * arr.length)]
const lower = (v) => [v.hook, v.topic, v.format, v.caption, ...(v.beats ?? []).map((b) => (typeof b === 'string' ? b : b.line)), ...(v.themes ?? [])].filter(Boolean).join(' ').toLowerCase()

// Rules are checked in order; the first match wins.
const HOOK_RULES = [
  [/\b(effect|trilemma|paradox|principle|law)\b|^#(psychology|philosophy|socrates)/, 'named_concept'],
  [/^guess my/, 'guess_my'],
  [/^(you aren't|you're not|you are not|you're|if you)\b/, 'if_youre'],
  [/done to me|what i learned|i spent|i lived|years of|i was\b/, 'nobody_tells_you'],
  [/^(why|how come)\b/, 'insider_secret'],
  [/replying to|reply to/, 'reply_hater'],
  [/\bmethod\b/, 'named_method'],
  [/repeat|for \d+ days|listen (three|3) times|save this/, 'save_bait'],
  [/\bpov\b/, 'pov_founder'],
  [/\$\s?\d|\d+k\s?(\/|a )?month|mrr|revenue/, 'proof_first_revenue'],
  [/overnight|instantly|in one minute|obsessed|get them|you're welcome/, 'outcome_speed'],
  [/\bin \d+ days/, 'x_in_y_days'],
  [/claude|chatgpt|\bai\b|built (this|it|an app)/, 'built_with_ai'],
  [/wdym|finding this|does anyone/, 'does_anyone_else'],
  [/secret|nobody tells|no one tells/, 'insider_secret'],
  [/\bhow (to|i)\b/, 'named_method'],
  [/^i (get|am|have)\b|^i'm\b|amen/, 'mantra'],
  [/would you|be honest/, 'fake_demo'],
  [/the one you see|pick a card|meant to/, 'if_youre'],
  [/download|on stella|my app|using stella|stella app/, 'built_that'],
]
const FORMAT_RULES = [
  [/explainer|book summary|^green screen$/, 'concept_explainer'],
  [/one-liner|quote montage|emotional sound|over .*sound/, 'mood_one_liner'],
  [/confession/, 'storytime_near_failure'],
  [/hot take|commentary|advice|listicle|news reaction/, 'insider_secrets'],
  [/interrupt|skit|co-?star/, 'skit_interrupt'],
  [/reply/, 'reply_to_hate'],
  [/interview|storytime|long-form/, 'storytime_near_failure'],
  [/app demo|screen-?record/, 'build_with_ai'],
  [/promo|testimonial|reaction/, 'relatable_pain_plug'],
  [/pick-a-card|tarot/, 'fake_demo_validation'],
  [/tutorial|method|affirmation|routine/, 'method_tutorial'],
  [/trending|lip-?sync|sound/, 'pov_skit'],
]

export function classify(v) {
  const hook = (v.hook ?? '').toLowerCase()
  const all = lower(v)
  const fmt = (v.format ?? '').toLowerCase()
  const hookKey = v.hookKey ?? HOOK_RULES.find(([re]) => re.test(hook))?.[1] ?? HOOK_RULES.find(([re]) => re.test(all))?.[1] ?? (hook ? 'unpopular_opinion' : 'built_that')
  const formatKey = v.formatKey ?? FORMAT_RULES.find(([re]) => re.test(fmt))?.[1] ?? (hookKey === 'reply_hater' ? 'reply_to_hate' : 'method_tutorial')
  return { hookKey, formatKey }
}

/** Align angles ranked by how well they answer this reel's topic. */
export function rankAngles(v) {
  const text = lower(v)
  const scores = new Map(ANGLES.map((a) => [a.key, 0]))
  for (const b of BRIDGES) for (const w of b.words) if (text.includes(w)) scores.set(b.angle, scores.get(b.angle) + 1)
  return [...scores.entries()].sort((a, b) => b[1] - a[1]).map(([k, n]) => ({ key: k, n }))
}

const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s)
const unCap = (s) => (s && !/^(I\b|I'|Align|Houston|Claude|Supabase|Capacitor|Venus|Gemini|Virgo|[A-Z]{2})/.test(s) ? s[0].toLowerCase() + s.slice(1) : s)
function fill(t, a) {
  return t.replace(/\{(\w+)\}/g, (m, k) => {
    if (k === 'label_lc') return unCap(a.label)
    if (k === 'fast_lc') return unCap(a.fast)
    if (k === 'METHOD') return (a.method ?? '').toUpperCase()
    const base = k[0].toLowerCase() + k.slice(1)
    const val = a[base]
    if (val == null) return m
    const s = typeof val === 'string' ? val : val.line
    return k[0] === k[0].toUpperCase() ? cap(s) : s
  })
}
const words = (s) => (s.match(/\S+/g) ?? []).length

/** Build one script from an angle, a hook and a format. */
export function build(source, { angleKey, hookKey, formatKey, seed = 1 }) {
  const r = rng(seed)
  const a = ANGLES.find((x) => x.key === angleKey) ?? ANGLES[0]
  const h = HOOKS.find((x) => x.key === hookKey) ?? HOOKS[0]
  const f = FORMATS.find((x) => x.key === formatKey) ?? FORMATS[0]
  const hook = cap(fill(pick(r, h.t), a))
  const beats = f.beats.map((b, i) => {
    if (typeof b === 'object') return { line: fill(b.line, a), broll: b.broll ?? '', onScreen: '' }
    if (b === 'intro') return { line: INTRO, broll: 'You, to camera', onScreen: 'founder, Align' }
    if (b.startsWith('never')) {
      const n = Number(b.slice(5))
      return { line: `${['One', 'Two', 'Three'][n]}. I'd never ${unCap(a.never[n]).replace(/^never /, '')}`, broll: i === 0 ? 'You, to camera' : '', onScreen: `${n + 1}` }
    }
    if (b === 'proof') return { line: a.proof.line, broll: a.broll?.proof ?? '', onScreen: a.proof.onScreen }
    const part = b.startsWith('how') ? a.how[Number(b.slice(3))] : a[b]
    const brollKey = b.startsWith('how') ? 'how' : b
    return { line: part, broll: a.broll?.[brollKey] ?? '', onScreen: '' }
  })
  // The same cutaway twice in a row is one long cutaway.
  for (let i = 1; i < beats.length; i++) if (beats[i].broll && beats[i].broll === beats[i - 1].broll) beats[i].broll = ''
  // A hook that already says the premise shouldn't be repeated by beat one.
  if (beats[0] && hook.toLowerCase().includes(beats[0].line.toLowerCase().slice(0, 30))) beats.shift()
  const cta = f.cta ?? a.cta
  const all = [hook, ...beats.map((b) => b.line), cta].join(' ')
  const needsFacts = /\[[^\]]+\]/.test(all)
  return {
    id: `align-${source.id}`,
    sourceId: source.id,
    title: a.label,
    angleKey: a.key, hookKey: h.key, formatKey: f.key,
    hook, beats, cta,
    caption: a.caption,
    hashtags: a.hashtags,
    lengthSec: Math.max(12, Math.round(words(all) / 2.6) + 2),
    needsFacts,
    notes: needsFacts ? 'Fill in every [bracket] with what really happened before you film. Never guess a number.' : '',
  }
}

/** The first Align version of a reel: same hook type and format, best-fit angle. */
export function adapt(source, { used = new Map(), seed, cap = 3 } = {}) {
  const { hookKey, formatKey } = classify(source)
  // Spread the angles across one creator's set: an angle used `cap` times
  // already gives way to the next best one.
  const ranked = rankAngles(source)
  const angle = ranked.find((x) => (used.get(x.key) ?? 0) < cap) ?? ranked[0]
  used.set(angle.key, (used.get(angle.key) ?? 0) + 1)
  return build(source, { angleKey: angle.key, hookKey, formatKey, seed: seed ?? source.id })
}

/** A fresh take on a reel. Leave any of the three unset to let it choose. */
export function remix(source, _lib, opts = {}) {
  const r = rng(opts.seed ?? Date.now())
  const base = classify(source)
  const angleKey = opts.angleKey ?? (r() < 0.5 ? pick(r, rankAngles(source).slice(0, 4)).key : pick(r, ANGLES).key)
  const hookKey = opts.hookKey ?? (r() < 0.4 ? base.hookKey : pick(r, HOOKS.filter((h) => !h.needsFacts)).key)
  const formatKey = opts.formatKey ?? (r() < 0.4 ? base.formatKey : pick(r, FORMATS).key)
  return build(source, { angleKey, hookKey, formatKey, seed: Math.floor(r() * 1e9) })
}
