import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'

export const W = 1920, H = 1080
export const IMG = '../app/public/img/'
export const PEOPLE = Array.from({ length: 12 }, (_, i) => `${IMG}people/p${i + 1}.jpg`)

export const SANS = "'Inter', system-ui, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', monospace"

export function fill(parent, style = {}) {
  return el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', overflow: 'hidden', ...style }, parent)
}
export function img(parent, src, style = {}) {
  const i = el('img', { position: 'absolute', display: 'block', ...style }, parent)
  i.src = src
  i.decoding = 'sync'
  return i
}

/** four small square "selection" ticks around a box centred on (cx, cy) */
export class Ticks {
  constructor(parent, color = C.ink, size = 9) {
    this.s = [0, 1, 2, 3].map(() => el('div', { position: 'absolute', width: size + 'px', height: size + 'px', background: color, opacity: 0 }, parent))
    this.size = size
  }
  update(cx, cy, w, h, op = 1) {
    const hs = this.size / 2
    const pts = [[-1, -1], [1, -1], [-1, 1], [1, 1]]
    this.s.forEach((s, i) => {
      s.style.left = (cx + pts[i][0] * w / 2 - hs) + 'px'
      s.style.top = (cy + pts[i][1] * h / 2 - hs) + 'px'
      s.style.opacity = String(op)
    })
  }
}

/** Align profile-style card: photo, gilt hairline, serif caption */
export function makeCard(parent, src, caption, { w = 420, h = 580 } = {}) {
  const card = el('div', {
    position: 'absolute', width: w + 'px', height: h + 'px', borderRadius: '22px', overflow: 'hidden',
    background: C.raised, boxShadow: '0 30px 60px rgba(20,10,46,0.28), 0 0 0 1.5px rgba(242,199,92,0.55) inset',
    transformStyle: 'preserve-3d', backfaceVisibility: 'hidden',
  }, parent)
  const ph = img(card, src, { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover' })
  el('div', { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(11,6,32,0) 55%, rgba(11,6,32,0.85) 100%)' }, card)
  const cap = el('div', { position: 'absolute', left: '22px', bottom: '18px', fontFamily: SERIF, fontStyle: 'italic', fontSize: Math.round(w * 0.075) + 'px', color: C.bone }, card, caption || '')
  el('div', { position: 'absolute', inset: '8px', borderRadius: '16px', border: '1px solid rgba(242,199,92,0.35)', pointerEvents: 'none' }, card)
  return { card, ph, cap }
}

export function makeStars(parent, n, seed, color = '255,247,236') {
  const c = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, parent)
  c.width = W; c.height = H
  const ctx = c.getContext('2d')
  const r = rng(seed)
  for (let i = 0; i < n; i++) {
    const x = r() * W, y = r() * H, s = r() * 1.6 + 0.3
    ctx.fillStyle = `rgba(${color},${0.2 + r() * 0.6})`
    ctx.beginPath(); ctx.arc(x, y, s, 0, Math.PI * 2); ctx.fill()
  }
  return c
}
