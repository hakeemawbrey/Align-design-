// photos · shared kit (LOOK A, film 1 style). Pure helpers, no DOM at module load (cues.js imports this in Node).
import { clamp, lerp, prog, ease, rng, el, C } from '../../../src/lib.js'
import { W, H, SANS, SERIF, MONO } from '../../../src/scenes/common.js'
import { drawMoonGlyph, phaseName, litOf } from '../../../src/scenes/fx-moon.js'

export const BONE = C.bone
export const ROSE = '#ff8fb1'          // light rose accent (s2-intro): the italic word in each line
export const FI = (t) => Math.round(t * 30)
export const hash = (n) => { const r = rng(n * 7919 + 13); r(); return r() }

// ── the card footprint shared by the hook photo and the blind card (body centre / body height)
export const CARD = { cx: 960, cy: 455, bh: 620 }
// card-profile-3.png 1496×2238 · body [120,114]–[1374,2116] → centre (747,1115), 1254×2002, radius 84
export const PNG = { w: 1496, h: 2238, cx: 747, cy: 1115, bw: 1254, bh: 2002, r: 84 }
export const BODY_W = Math.round(CARD.bh * PNG.bw / PNG.bh)   // 388
export const BODY_R = Math.round(CARD.bh * PNG.r / PNG.bh)    // 26

// ── film grain: ONE overlay layer over the whole film (≈0.22, film 1), tiles copied from common.js spaceBackdrop
let TILES = null
function grainTiles() {
  if (TILES) return TILES
  TILES = Array.from({ length: 5 }, (_, k) => {
    const c = document.createElement('canvas'); c.width = c.height = 384
    const g = c.getContext('2d'), d = g.createImageData(384, 384), r = rng(900 + k)
    for (let i = 0; i < d.data.length; i += 4) { const v = 128 + (r() + r() + r() - 1.5) * 150; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255 }
    g.putImageData(d, 0, 0)
    return c.toDataURL()
  })
  return TILES
}
export function grainLayer(parent, opacity = 0.22) {
  const gr = el('div', { position: 'absolute', left: '-384px', top: '-384px', width: (W + 768) + 'px', height: (H + 768) + 'px', mixBlendMode: 'overlay', opacity, pointerEvents: 'none' }, parent)
  const tiles = grainTiles()
  return {
    el: gr,
    update(t) {
      const fi = FI(t), rr = rng(fi * 7 + 3)
      gr.style.backgroundImage = `url(${tiles[fi % tiles.length]})`
      gr.style.transform = `translate(${Math.floor(rr() * 384)}px, ${Math.floor(rr() * 384)}px)`
    },
  }
}

// ── four corner ticks (s2-intro): each corner lags a touch, positions snap at 10 Hz like the reference
export function makeTicks(parent, size = 12) {
  const s = [0, 1, 2, 3].map(() => el('div', { position: 'absolute', width: size + 'px', height: size + 'px', background: BONE, opacity: 0 }, parent))
  const pts = [[-1, -1], [1, -1], [-1, 1], [1, 1]], delays = [0, 0.07, 0.11, 0.04]
  return {
    update(t, box) {
      s.forEach((d, i) => {
        const q = Math.floor(FI(t - delays[i]) / 3) * 3 / 30
        const b = box(q)
        d.style.left = Math.round(b.cx + pts[i][0] * b.w / 2 - size / 2) + 'px'
        d.style.top = Math.round(b.cy + pts[i][1] * b.h / 2 - size / 2) + 'px'
        d.style.opacity = String(clamp(b.op))
      })
    },
  }
}

/** a centred line of words that punch in (opacity, small drop, de-blur), staggered. words = [[html, styleObj?], ...] */
export function wordLine(parent, wordsSpec, style, at, gap = 0.16) {
  const box = el('div', { position: 'absolute', left: 0, width: W + 'px', textAlign: 'center', whiteSpace: 'nowrap', ...style }, parent)
  const ws = wordsSpec.map(([html, st], i) => ({ t: at + i * gap, e: el('span', { display: 'inline-block', margin: '0 0.13em', opacity: 0, ...(st || {}) }, box, html) }))
  return {
    box,
    update(t, out = 1) {
      for (const w of ws) {
        const p = prog(t, w.t, w.t + 0.2), e = ease.outCubic(p)
        w.e.style.opacity = String(e * out)
        w.e.style.transform = `translateY(${(1 - e) * 18}px)`
        w.e.style.filter = p < 1 ? `blur(${((1 - e) * 9).toFixed(2)}px)` : 'none'
      }
    },
  }
}
export const ITAL = { fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: '1.18em', color: ROSE, letterSpacing: '0' }

// ── moon-phase badge, top-left (film 1): glyph (92,86) + two-line Space Mono label. The film's ONLY moon until the
// lockup's moon row. Waxes: new (hook) → crescent (the chart) → quarter (the reading) → FULL at the face reveal.
const BADGE = [
  { a: 0.12, b: 2.86, k: [[0, 0.0]] },
  { a: 3.2, b: 10.1, k: [[3.3, 0.07], [3.95, 0.13], [5.85, 0.13], [6.55, 0.25], [8.35, 0.27], [9.0, 0.5]], full: 9.0 },
]
function keyed(k, t) {
  if (t <= k[0][0]) return k[0][1]
  for (let i = 1; i < k.length; i++) if (t <= k[i][0]) return lerp(k[i - 1][1], k[i][1], ease.inOutCubic((t - k[i - 1][0]) / (k[i][0] - k[i - 1][0])))
  return k[k.length - 1][1]
}
export function drawBadge(ctx, t) {
  const c = BADGE.find(s => t >= s.a && t < s.b)
  if (!c) return
  const al = ease.inOutQuad(prog(t, c.a, c.a + 0.3)) * (1 - ease.inOutQuad(prog(t, c.b - 0.25, c.b)))
  if (al <= 0.003) return
  const p = keyed(c.k, t)
  const bloom = c.full ? Math.exp(-(((t - c.full) / 0.35) ** 2)) : 0
  const GX = 92, GY = 86 + (1 - ease.outCubic(prog(t, c.a, c.a + 0.4))) * 8, GR = 20, lx = GX + GR + 18
  ctx.save()
  const pg = ctx.createRadialGradient(GX + 90, GY, 10, GX + 90, GY, 230)
  pg.addColorStop(0, `rgba(11,6,32,${0.34 * al})`); pg.addColorStop(1, 'rgba(11,6,32,0)')
  ctx.fillStyle = pg; ctx.fillRect(GX + 90 - 230, GY - 230, 460, 460)
  drawMoonGlyph(ctx, GX, GY, GR, p, { alpha: al, lw: 1.6, discAlpha: 0.12, glow: 0.6 + 1.6 * bloom + (c.full && t > c.full ? 0.4 : 0) })
  ctx.globalAlpha = al
  ctx.font = "400 17px 'Space Mono', monospace"
  try { ctx.letterSpacing = '3px' } catch {}
  ctx.shadowColor = 'rgba(11,6,32,0.8)'; ctx.shadowBlur = 10
  ctx.fillStyle = 'rgba(239,230,214,0.9)'
  ctx.fillText(phaseName(p), lx, GY - 3)
  ctx.font = "400 14px 'Space Mono', monospace"
  ctx.fillStyle = 'rgba(239,230,214,0.55)'
  ctx.fillText(`${Math.round(litOf(p) * 100)}% LIT`, lx, GY + 18)
  try { ctx.letterSpacing = '0px' } catch {}
  ctx.restore()
}

// ── pixel-art sparkles (s2-intro sprites)
export const STAR7 = ['...1...', '...1...', '..111..', '1112111', '..111..', '...1...', '...1...']
export const STAR5 = ['..1..', '..1..', '11211', '..1..', '..1..']
export const STAR3 = ['.1.', '121', '.1.']
export function pixelStar(ctx, sprite, x, y, px, color, alpha = 1) {
  const n = sprite.length, o = Math.floor(n / 2) * px
  ctx.globalAlpha = alpha
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    const v = sprite[r][c]
    if (v === '.') continue
    ctx.fillStyle = v === '2' ? '#fff6ea' : color
    ctx.fillRect(Math.round(x) - o + c * px, Math.round(y) - o + r * px, px, px)
  }
  ctx.globalAlpha = 1
}
export { SANS, SERIF, MONO, W, H }
