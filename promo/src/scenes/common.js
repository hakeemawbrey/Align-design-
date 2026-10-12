import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'

/** vertical 9:16 mode (render with ?v): scenes branch on VERT for their tall layouts */
export const VERT = typeof location !== 'undefined' && new URLSearchParams(location.search).has('v')
export const W = VERT ? 1080 : 1920, H = VERT ? 1920 : 1080
export const IMG = '../app/public/img/'
/** captured app assets (see promo/assets/MANIFEST.md) */
export const A = 'assets/'
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

// ─────────────────────────────────────────────── shared space backdrop
/** colour moods for the deep-space gradient scenes */
export const SPACE_MOODS = {
  // [base top, base bottom, nebula blobs as [r,g,b, x, y, radius, alpha]]
  rose:   ['#0b0620', '#1c0d3a', [[154, 123, 224, 0.22, 0.30, 900, 0.55], [232, 98, 138, 0.80, 0.72, 820, 0.42], [180, 92, 255, 0.62, 0.18, 640, 0.30], [242, 154, 74, 0.10, 0.95, 560, 0.16]]],
  teal:   ['#080522', '#120a33', [[86, 196, 214, 0.18, 0.78, 760, 0.30], [154, 123, 224, 0.70, 0.28, 900, 0.48], [127, 216, 176, 0.88, 0.85, 600, 0.20], [74, 114, 255, 0.40, 0.10, 700, 0.28]]],
  amber:  ['#0c0620', '#1e0e36', [[180, 92, 255, 0.25, 0.25, 860, 0.45], [242, 154, 74, 0.82, 0.80, 760, 0.30], [242, 199, 92, 0.55, 1.00, 620, 0.16], [232, 98, 138, 0.92, 0.20, 600, 0.26]]],
  aurora: ['#0d0626', '#24103f', [[232, 98, 138, 0.55, 0.70, 980, 0.62], [180, 92, 255, 0.20, 0.35, 900, 0.58], [154, 123, 224, 0.85, 0.30, 800, 0.50], [242, 154, 74, 0.18, 0.98, 640, 0.30], [255, 143, 177, 0.78, 0.95, 560, 0.34]]],
}

let GRAIN_TILES = null
function grainTiles() {
  if (GRAIN_TILES) return GRAIN_TILES
  GRAIN_TILES = Array.from({ length: 5 }, (_, k) => {
    const c = document.createElement('canvas'); c.width = c.height = 384
    const g = c.getContext('2d'), d = g.createImageData(384, 384), r = rng(900 + k)
    for (let i = 0; i < d.data.length; i += 4) { const v = 128 + (r() + r() + r() - 1.5) * 150; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255 }
    g.putImageData(d, 0, 0)
    return c.toDataURL()
  })
  return GRAIN_TILES
}

/**
 * Deep-space gradient backdrop with nebula blobs, sparse stars and animated film grain.
 * spaceBackdrop(parent, 'rose' | 'teal' | 'amber' | 'aurora', { seed, grain }) → { root, update(t) }
 */
export function spaceBackdrop(parent, mood = 'rose', { seed = 1, grain = 0.22, stars = 160 } = {}) {
  const [top, bottom, blobs] = SPACE_MOODS[mood]
  const root = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', overflow: 'hidden', background: `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)` }, parent)
  const r = rng(seed * 31 + 7)
  const bs = blobs.map(([cr, cg, cb, x, y, rad, a]) => ({
    x, y, rad, ph: r() * 6.28, sp: 0.25 + r() * 0.3,
    e: el('div', { position: 'absolute', width: rad * 2 + 'px', height: rad * 2 + 'px', borderRadius: '50%', mixBlendMode: 'screen',
      background: `radial-gradient(closest-side, rgba(${cr},${cg},${cb},${a}), rgba(${cr},${cg},${cb},${a * 0.42}) 45%, rgba(${cr},${cg},${cb},0) 100%)` }, root),
  }))
  const sc = makeStars(root, stars, seed * 13 + 5)
  const vig = el('div', { position: 'absolute', inset: 0, background: 'radial-gradient(120% 95% at 50% 50%, rgba(11,6,32,0) 55%, rgba(11,6,32,0.6) 100%)' }, root)
  const gr = el('div', { position: 'absolute', left: '-384px', top: '-384px', width: (W + 768) + 'px', height: (H + 768) + 'px', mixBlendMode: 'overlay', opacity: grain, pointerEvents: 'none' }, root)
  const tiles = grainTiles()
  return {
    root,
    update(t) {
      bs.forEach(b => {
        const x = b.x * W + Math.sin(t * b.sp + b.ph) * 70 - b.rad
        const y = b.y * H + Math.cos(t * b.sp * 0.8 + b.ph) * 45 - b.rad
        b.e.style.transform = `translate(${x}px, ${y}px)`
      })
      sc.style.transform = `translate(${Math.sin(t * 0.15 + seed) * 12}px, ${t * -4 % 40}px)`
      const fi = Math.round(t * 30), rr = rng(fi * 7 + seed)
      gr.style.backgroundImage = `url(${tiles[fi % tiles.length]})`
      gr.style.transform = `translate(${Math.floor(rr() * 384)}px, ${Math.floor(rr() * 384)}px)`
      void vig
    },
  }
}
