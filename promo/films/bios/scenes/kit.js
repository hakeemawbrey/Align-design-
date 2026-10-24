// bios · shared kit (LOOK A, film 1): moods, one global grain, corner ticks, phone, moon badge, pixel stars.
import { clamp, lerp, prog, ease, rng, el, C, PIXEL_PALETTE } from '../../../src/lib.js'
import { W, H, A, SANS, SERIF, MONO, fill, img } from '../../../src/scenes/common.js'
import { drawMoonGlyph, litOf, phaseName } from '../../../src/scenes/fx-moon.js'

export { W, H, A, SANS, SERIF, MONO, fill, img, C }
export const FI = (t) => Math.round(t * 30)
export const ROSE = '#ff8fb1'
export const GRAIN = 0.22

// ── four corner ticks; each corner trails by its own small delay and snaps at 10 Hz (film 1, s2-intro)
export function makeTicks(parent, color = C.bone, size = 18) {
  const s = [0, 1, 2, 3].map(() => el('div', { position: 'absolute', width: size + 'px', height: size + 'px', background: color, opacity: 0, boxShadow: '0 0 12px rgba(239,230,214,0.25)' }, parent))
  const pts = [[-1, -1], [1, -1], [-1, 1], [1, 1]]
  const delays = [0, 0.07, 0.11, 0.04]
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

// ── a dark phone showing a real app screen
export function phone(parent, src, ph = 860) {
  const pw = Math.round(ph * 1170 / 2532)
  const g = el('div', { position: 'absolute', width: pw + 'px', height: ph + 'px', opacity: 0, willChange: 'transform' }, parent)
  const scr = el('div', { position: 'absolute', inset: 0, borderRadius: '52px', overflow: 'hidden', background: C.canvas,
    boxShadow: '0 60px 120px rgba(4,2,14,0.7), 0 18px 40px rgba(4,2,14,0.45), 0 0 70px rgba(180,92,255,0.22), 0 0 0 1.5px rgba(239,230,214,0.35)' }, g)
  const im = img(scr, src, { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover' })
  return { g, scr, im, pw, ph }
}

// ── pixel-art sparkle stars (film 1)
const STAR7 = ['...1...', '...1...', '..111..', '1112111', '..111..', '...1...', '...1...']
const STAR5 = ['..1..', '..1..', '11211', '..1..', '..1..']
const STAR3 = ['.1.', '121', '.1.']
function drawPixelStar(ctx, sprite, x, y, px, color, a) {
  const n = sprite.length, o = Math.floor(n / 2) * px
  ctx.globalAlpha = a
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    const v = sprite[r][c]
    if (v === '.') continue
    ctx.fillStyle = v === '2' ? '#fff6ea' : color
    ctx.fillRect(Math.round(x) - o + c * px, Math.round(y) - o + r * px, px, px)
  }
  ctx.globalAlpha = 1
}
// fixed sparkle positions (all clear of the type bands and the badge corner)
const SPARKS = [[1790, 238, 0], [168, 336, 1], [1120, 1010, 2], [620, 1018, 1], [1660, 906, 0], [120, 720, 2], [1700, 70, 1], [96, 980, 0], [1840, 620, 2], [330, 190, 1]]
/** k = 0..1 visibility (cold problem half → small and grey) */
export function drawSparks(ctx, t, k, warm = 1) {
  if (k <= 0.01) return
  ctx.save(); ctx.imageSmoothingEnabled = false
  const tw2 = FI(t) >> 2
  SPARKS.forEach(([x, y, s], i) => {
    const ph = (tw2 + i * 3) % 9
    const sprite = ph === 4 ? (s === 0 ? STAR7 : STAR5) : ph === 3 || ph === 5 ? (s === 2 ? STAR3 : STAR5) : STAR3
    const px = s === 0 ? 5 : 4
    const col = warm > 0.5 ? PIXEL_PALETTE[i % PIXEL_PALETTE.length] : '#b3a6c4'
    drawPixelStar(ctx, sprite, x, y, px, col, k * (ph === 8 ? 0.35 : 0.75))
  })
  ctx.restore()
}

// ── moon-phase badge top-left (glyph centre 92,86; label to its right). Waxes as the film turns.
//   [time, phase] ticks; visible from 0 (new moon) until it leaves 9.75–10.05 (before the lockup's moon row).
const BADGE = [[0, 0.0], [3.62, 0.09], [5.3, 0.25], [7.7, 0.38]]
const B_OUT = 9.75
export function drawBadge(ctx, t) {
  const al = (0.25 + 0.75 * ease.inOutQuad(prog(t, 0, 0.3))) * (1 - ease.inOutQuad(prog(t, B_OUT, B_OUT + 0.3)))
  if (al <= 0.003) return
  let p = BADGE[0][1]
  for (let i = 1; i < BADGE.length; i++) p = lerp(p, BADGE[i][1], ease.inOutCubic(prog(t, BADGE[i][0], BADGE[i][0] + 0.6)))
  const GX = 92, GY = 86, GR = 20, lx = GX + GR + 18
  ctx.save()
  const pg = ctx.createRadialGradient(GX + 90, GY, 10, GX + 90, GY, 230)
  pg.addColorStop(0, `rgba(11,6,32,${0.38 * al})`); pg.addColorStop(1, 'rgba(11,6,32,0)')
  ctx.fillStyle = pg; ctx.fillRect(GX + 90 - 230, GY - 230, 460, 460)
  drawMoonGlyph(ctx, GX, GY, GR, p, { alpha: al, lw: 1.6, discAlpha: 0.12, glow: 0.7 })
  ctx.globalAlpha = al
  ctx.font = "400 17px 'Space Mono', monospace"
  try { ctx.letterSpacing = '3px' } catch {}
  ctx.textBaseline = 'alphabetic'
  ctx.shadowColor = 'rgba(11,6,32,0.8)'; ctx.shadowBlur = 10
  ctx.fillStyle = 'rgba(239,230,214,0.9)'
  ctx.fillText(phaseName(p), lx, GY - 3)
  ctx.font = "400 14px 'Space Mono', monospace"
  ctx.fillStyle = 'rgba(239,230,214,0.55)'
  ctx.fillText(`${Math.round(litOf(p) * 100)}% LIT`, lx, GY + 18)
  try { ctx.letterSpacing = '0px' } catch {}
  ctx.restore()
}

// ── film grain tiles (same recipe as common.js spaceBackdrop), one global layer for the whole film
let TILES = null
export function grainTiles() {
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
