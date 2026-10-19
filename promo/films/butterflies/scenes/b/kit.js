// Butterflies half b · shared kit: the sky camera (handoff H exactly, then a slow push), ambient pixel twinkles,
// a soft dark pocket for copy, and the motif: pixel-star butterflies (wings flap in 3 pixel steps, drift up on a sway).
import { clamp, lerp, prog, ease, rng, noise1, C } from '../../../../src/lib.js'
import { W, H } from '../../../../src/scenes/common.js'
import { drawSky, drawGrain, grainOpacity, getSky, layerCanvas, drawPixelStar } from '../../../sky.js'
export { drawGrain, grainOpacity, getSky, layerCanvas, drawPixelStar }

// ── H: the sky half a hands over (nothing else on screen at 15.0)
export const MOON = { x: 1716, y: 122, r: 52, phase: 0.12, alpha: 1 }
export const T_H = 15.0

/** the sky: exactly H until 15.2, then a slow push-in (zoom 1 → 1.035 by 30s) that never stops */
export function sky(bx, t, dim = 1) {
  const k = prog(t, 15.2, 30)
  const zoom = 1 + 0.035 * (k * k * (3 - 2 * k) * 0.5 + k * 0.5)
  drawSky(bx, t, { zoom, dx: 0, dy: 0, dim, moon: MOON })
}

// ── ambient pixel twinkles at the frame edges (clear of cards, copy and the moon). In from 15.4.
const PIXC = ['#e8628a', '#f2c75c', '#9a7be0', '#f29a4a', '#ff8fb1', '#c9a6ff', '#ffd98a']
const STAR_SPRITES = [
  ['...X...', '...X...', '..XXX..', 'XXXCXXX', '..XXX..', '...X...', '...X...'],
  ['.......', '...X...', '..XXX..', '.XXCXX.', '..XXX..', '...X...', '.......'],
  ['.......', '.......', '...X...', '..XCX..', '...X...', '.......', '.......'],
  ['.......', '.X...X.', '...X...', '..XCX..', '...X...', '.X...X.', '.......'],
].map(rows => rows.flatMap((row, y) => [...row].map((ch, x) => ch === '.' ? null : [x, y, ch === 'C'])).filter(Boolean))
export function pixStar(ctx, cx, cy, px, kind, color, centre, a) {
  ctx.globalAlpha = a
  const x0 = Math.round(cx - px * 3.5), y0 = Math.round(cy - px * 3.5)
  for (const [x, y, c] of STAR_SPRITES[kind]) { ctx.fillStyle = c ? centre : color; ctx.fillRect(x0 + x * px, y0 + y * px, px, px) }
  ctx.globalAlpha = 1
}
const pr = rng(9099)
const PIX = []
while (PIX.length < 14) {
  const x = 60 + pr() * (W - 120), y = 50 + pr() * (H - 100)
  if (x > 230 && x < 1690 && y > 110 && y < 985) continue
  if (x > 1560 && y < 300) continue
  PIX.push({ x, y, px: pr() < 0.3 ? 4 : 3, col: PIXC[Math.floor(pr() * PIXC.length)], ph: pr() * 6.28, sp: 1.6 + pr() * 2.4, kind: Math.floor(pr() * 4), t0: 15.4 + pr() * 1.2 })
}
export function twinkles(bx, t, k = 1) {
  bx.imageSmoothingEnabled = false
  const tick = Math.round(t * 30) >> 1
  PIX.forEach((s, i) => {
    const a = k * ease.outQuad(prog(t, s.t0, s.t0 + 0.5)) * (0.4 + 0.5 * Math.sin(t * s.sp + s.ph))
    if (a <= 0.02) return
    pixStar(bx, s.x, s.y, s.px, (tick + i) % 5 === 0 ? 2 : s.kind, s.col, '#fff3e0', a)
  })
  bx.imageSmoothingEnabled = true
}

// ── pixel butterflies: two star-pixel wings around a bone body. Wings fold in 3 pixel steps (open / half / edge-on).
const FLY = [
  'XX.....XX',
  'XWX...XWX',
  'XWWX.XWWX',
  '.XWXBXWX.',
  '..XXBXX..',
  '.XWXBXWX.',
  '.XX...XX.',
].flatMap((row, y) => [...row].map((ch, x) => ch === '.' ? null : [x - 4, y - 3, ch])).filter(Boolean)
export const CHAKRA_HEX = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
const lighten = (hex) => { const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; return `rgb(${(r + 255 * 1.4) / 2.4 | 0},${(g + 255 * 1.4) / 2.4 | 0},${(b + 255 * 1.4) / 2.4 | 0})` }
/** one pixel butterfly at (cx, cy); flap ∈ 0..1 (0 open → 1 edge-on), quantised to 3 pixel steps */
export function drawFly(ctx, cx, cy, px, color, flap, a, tilt = 0) {
  if (a <= 0.01) return
  const step = flap < 0.34 ? 1 : flap < 0.67 ? 0.7 : 0.4
  ctx.globalAlpha = clamp(a)
  const inner = lighten(color)
  ctx.save(); ctx.translate(Math.round(cx), Math.round(cy)); ctx.rotate(tilt)
  for (const [x, y, ch] of FLY) {
    const xx = ch === 'B' ? 0 : Math.sign(x) * Math.max(1, Math.round(Math.abs(x) * step))
    ctx.fillStyle = ch === 'B' ? '#fff3e0' : ch === 'W' ? inner : color
    ctx.fillRect(xx * px - px / 2, y * px - px / 2, px, px)
  }
  ctx.restore()
  ctx.globalAlpha = 1
}
/**
 * a flight of butterflies: each { t0, x0, y0, vx, vy, sway, px, col, seed, life } drifts up on a sway, flapping;
 * fades in over .25s, out over its last .5s. k scales alpha (scene exits).
 */
export function makeFlight(seed, n, spawn) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => ({ ...spawn(r, i), seed: r() * 100, rate: 7 + r() * 4 }))
}
export function drawFlight(ctx, flight, t, k = 1) {
  ctx.imageSmoothingEnabled = false
  for (const b of flight) {
    const u = t - b.t0
    if (u < 0 || u > b.life) continue
    const x = b.x0 + b.vx * u + Math.sin(u * 2.1 + b.seed) * b.sway + (noise1(u * 0.9, b.seed) - 0.5) * 40
    const y = b.y0 + b.vy * u + Math.sin(u * 3.3 + b.seed * 2) * b.sway * 0.35
    const flap = 0.5 + 0.5 * Math.sin(u * b.rate + b.seed)
    const a = k * ease.outQuad(prog(u, 0, 0.25)) * (1 - ease.inQuad(prog(u, b.life - 0.5, b.life)))
    drawFly(ctx, x, y, b.px, b.col, flap, a, Math.sin(u * 2.1 + b.seed) * 0.25)
  }
  ctx.imageSmoothingEnabled = true
}

/** a soft dark pocket behind copy so bone type holds on any sky */
export function pocketCanvas(cx, cy, rx, ry, a = 0.62) {
  const c = document.createElement('canvas'); c.width = W; c.height = H
  const x = c.getContext('2d')
  x.save(); x.translate(cx, cy); x.scale(1, ry / rx)
  const g = x.createRadialGradient(0, 0, 0, 0, 0, rx)
  g.addColorStop(0, `rgba(11,6,32,${a})`); g.addColorStop(0.6, `rgba(11,6,32,${a * 0.6})`); g.addColorStop(1, 'rgba(11,6,32,0)')
  x.fillStyle = g; x.fillRect(-rx, -rx, 2 * rx, 2 * rx); x.restore()
  return c
}
export { clamp, lerp, prog, ease, rng, noise1, C }
