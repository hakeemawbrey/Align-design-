// Small deterministic motion toolkit: every value is a pure function of time.

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
export const lerp = (a, b, t) => a + (b - a) * t
/** 0..1 progress of t through [a, b] */
export const prog = (t, a, b) => clamp((t - a) / (b - a))

export const ease = {
  linear: x => x,
  inQuad: x => x * x,
  outQuad: x => 1 - (1 - x) * (1 - x),
  inOutQuad: x => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2),
  outCubic: x => 1 - Math.pow(1 - x, 3),
  inCubic: x => x * x * x,
  inOutCubic: x => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
  outQuart: x => 1 - Math.pow(1 - x, 4),
  outExpo: x => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)),
  inExpo: x => (x <= 0 ? 0 : Math.pow(2, 10 * x - 10)),
  inOutExpo: x => x <= 0 ? 0 : x >= 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2,
  outBack: x => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2) },
  /** damped spring settling at 1 (x in 0..1 of the settle time) */
  spring: (x, bounce = 0.18) => {
    if (x <= 0) return 0
    if (x >= 1) return 1
    const w = 2 * Math.PI * 1.35
    const zeta = 1 - bounce * 2.4
    const decay = Math.exp(-zeta * 6 * x)
    return 1 - decay * Math.cos(w * x * (1 - bounce * 0.4))
  },
}

/** keyframe tween: tw(t, [[time, value], ...], easeFn) */
export function tw(t, keys, e = ease.inOutCubic) {
  if (t <= keys[0][0]) return keys[0][1]
  for (let i = 1; i < keys.length; i++) {
    const [t1, v1] = keys[i]
    const [t0, v0] = keys[i - 1]
    if (t <= t1) {
      const fn = keys[i][2] || e
      return lerp(v0, v1, fn((t - t0) / (t1 - t0)))
    }
  }
  return keys[keys.length - 1][1]
}

/** seeded PRNG (mulberry32) */
export function rng(seed) {
  let a = seed >>> 0
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** smooth value noise in 1D, deterministic */
export function noise1(x, seed = 1) {
  const i = Math.floor(x), f = x - i
  const h = n => { const r = rng(seed * 9973 + n * 7919); r(); return r() }
  const u = f * f * (3 - 2 * f)
  return lerp(h(i), h(i + 1), u)
}

export function el(tag, style = {}, parent, html) {
  const e = document.createElement(tag)
  Object.assign(e.style, style)
  if (html != null) e.innerHTML = html
  if (parent) parent.appendChild(e)
  return e
}

export function hexToRgb(h) {
  const n = parseInt(h.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
export function mix(a, b, t) {
  const A = hexToRgb(a), B = hexToRgb(b)
  return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], clamp(t)))).join(',')})`
}

export const C = {
  void: '#0b0620',
  canvas: '#140a2e',
  raised: '#1e1240',
  glass: '#34235f',
  bone: '#efe6d6',
  paper: '#ebe5dc',
  ink: '#1a1033',
  label2: '#b3a6c4',
  label3: '#7d6f94',
  violet: '#9a7be0',
  rub: '#e8628a',
  spark: '#7fd8b0',
  gold: '#f2c75c',
  amber: '#f29a4a',
  plum: '#b45cff',
}
export const PIXEL_PALETTE = ['#e8628a', '#f2c75c', '#9a7be0', '#f29a4a', '#ff8fb1', '#c9a6ff', '#ffd98a']

/**
 * Typed line: splits text into per-character spans so each can fade in with a
 * colour shimmer (accent → final) like a reveal sweep.
 */
export class TypeLine {
  constructor(parent, text, style = {}, opts = {}) {
    this.root = el('div', { position: 'absolute', whiteSpace: 'pre', ...style }, parent)
    this.opts = { accent: [C.rub, C.gold, C.violet], final: C.bone, perChar: 0.028, fade: 0.32, ...opts }
    this.chars = [...text].map(ch => el('span', { opacity: 0 }, this.root, ch === ' ' ? ' ' : escapeHtml(ch)))
  }
  /** lt: seconds since typing started */
  update(lt, { out = Infinity } = {}) {
    const { perChar, fade, accent, final } = this.opts
    const n = this.chars.length
    this.chars.forEach((s, i) => {
      const t0 = i * perChar
      const p = prog(lt, t0, t0 + fade)
      const oo = out === Infinity ? 1 : 1 - prog(lt, out + (n - i) * 0.006, out + (n - i) * 0.006 + 0.2)
      s.style.opacity = String(Math.min(ease.outQuad(p), oo))
      const a = accent[i % accent.length]
      s.style.color = p >= 1 ? final : mix(a, final, ease.inQuad(p))
    })
  }
}

export function escapeHtml(s) {
  return s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))
}
