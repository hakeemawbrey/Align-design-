// Star Talk season 4 (promo/films/STARTALK5.md): the season-wide Easter eggs, shared by all 100 films. Lead-owned: don't edit.
//   drawSeedConstellation(ctx, t, ep, opts)    EP n shows stars 1…n of a constellation that draws the seed-of-life logo in the
//                                              end card's order: centre ring EP 1–11, the six petals EP 12–77, outer ring EP 78–100.
//                                              Call it right after drawSky, so props and type sit on top of it.
//   drawGhostCameo(ctx, t, opts)               the ghost peeks out from behind an edge for ~1.5 s. A new spot every episode;
//                                              never behind type. Record the spot in your folder's lore.json.
//   drawGhostSheet(ctx, t, cx, cy, cell, o)    the ghost itself (stghost's sheet), for the ghost's own episodes
//   episodeNumeral(ep)                         'EP 042', for cardFrame({ numeral }): the frame's top cartouche
// Everything is a pure function of t; nothing touches `document` at module top level.
import { clamp, prog, ease } from '../src/lib.js'
import { drawPixelStar } from './sky.js'
import { easeOutBack } from './wheel.js'

const GOLD = '#f2c75c', BONE = '#efe6d6'
const TAU = Math.PI * 2, DEG = Math.PI / 180

export const episodeNumeral = ep => `EP ${String(Math.round(ep)).padStart(3, '0')}`

// ── the 100-star constellation, in logo units (petal rings r 20, outer ring r 40: the end card's mark).
// The start angles keep every pair of stars at least ~1.7 units apart.
const RINGS = (() => {
  const rings = [{ cx: 0, cy: 0, r: 20, n: 11, a0: -90 * DEG }]
  for (let k = 0; k < 6; k++) {
    const th = (-90 + k * 60) * DEG
    rings.push({ cx: Math.cos(th) * 20, cy: Math.sin(th) * 20, r: 20, n: 11, a0: th + 27.273 * DEG + (k % 2 ? 5.455 * DEG : 0) })
  }
  rings.push({ cx: 0, cy: 0, r: 40, n: 23, a0: (-90 + 10.435) * DEG })
  return rings
})()
export const SEED_POINTS = RINGS.flatMap((g, ring) => Array.from({ length: g.n }, (_, i) => {
  const a = g.a0 + i * TAU / g.n
  return { x: g.cx + Math.cos(a) * g.r, y: g.cy + Math.sin(a) * g.r, ring }
}))

// x, y: the logo's centre; r: the outer ring's radius in px. lines: the faint line the revealed stars draw (0 = none).
// glow (0…1): the end card's lavender halo, for EP 100 when the logo completes. today: the newest star twinkles gold.
export function drawSeedConstellation(ctx, t, ep, { x = 150, y = 122, r = 62, alpha = 1, lines = 0.32, today = true, glow = 0 } = {}) {
  const n = Math.round(clamp(ep, 0, 100))
  if (n <= 0 || alpha <= 0) return
  const u = r / 40
  ctx.save()
  if (glow > 0) {
    const gr = (40 + 26) * u
    const g = ctx.createRadialGradient(x, y, 0, x, y, gr)
    g.addColorStop(0, `rgba(154,123,224,${0.36 * glow * alpha})`); g.addColorStop(0.55, `rgba(154,123,224,${0.13 * glow * alpha})`); g.addColorStop(1, 'rgba(154,123,224,0)')
    ctx.fillStyle = g; ctx.fillRect(x - gr, y - gr, gr * 2, gr * 2)
  }
  // each ring draws on through its revealed stars, like the logo drawing itself in
  ctx.strokeStyle = BONE; ctx.lineWidth = Math.max(1.5, 0.045 * r); ctx.lineCap = 'round'
  let base = 0
  for (const g of RINGS) {
    const m = clamp(n - base, 0, g.n)
    base += g.n
    if (m < 2 || lines <= 0) continue
    ctx.globalAlpha = alpha * lines
    ctx.beginPath(); ctx.arc(x + g.cx * u, y + g.cy * u, g.r * u, g.a0, m >= g.n ? g.a0 + TAU : g.a0 + (m - 1) * TAU / g.n); ctx.stroke()
  }
  for (let i = 0; i < n - (today ? 1 : 0); i++) {
    const p = SEED_POINTS[i], tw = 0.5 + 0.5 * Math.sin(t * 1.9 + i * 2.39)
    ctx.globalAlpha = alpha * (0.55 + 0.4 * tw)
    drawPixelStar(ctx, x + p.x * u, y + p.y * u, 14, 2, BONE, '#ffffff')
  }
  if (today) {
    const p = SEED_POINTS[n - 1], px = x + p.x * u, py = y + p.y * u
    const pulse = 0.5 + 0.5 * Math.sin(t * 4.2)
    const g = ctx.createRadialGradient(px, py, 0, px, py, 30)
    g.addColorStop(0, `rgba(242,199,92,${(0.4 + 0.25 * pulse) * alpha})`); g.addColorStop(1, 'rgba(242,199,92,0)')
    ctx.globalAlpha = 1; ctx.fillStyle = g; ctx.fillRect(px - 30, py - 30, 60, 60)
    ctx.globalAlpha = alpha
    drawPixelStar(ctx, px, py, 21, pulse > 0.55 ? 0 : 1, GOLD, '#fff6e6')
  }
  ctx.restore()
}

// ── the ghost: stghost's sheet (cells), a dome with a wavy hem, two eye holes and the star's top point poking up.
// It spans about 29 × 35 cells around (cx, cy): 20 cells above, 14 below. look: [dx, dy] in −1…1 for the pupils.
export function drawGhostSheet(ctx, t, cx, cy, cell, { look = [0, 0], wide = false, blink = true, blush = 0, alpha = 1, rot = 0 } = {}) {
  if (alpha <= 0) return
  const RX = 13, RY = 15, HEM = 11, c = cell
  const inside = (i, j) => {
    const u = i + 0.5, v = j + 0.5
    if (Math.abs(u) > RX) return false
    if (v < -RY + 1.5) return Math.abs(u) <= (v + RY + 3.5) * 0.75
    if (v < 0) return (u / RX) ** 2 + (v / RY) ** 2 <= 1
    return v <= HEM + Math.round(1.6 * Math.sin(i * 0.9 + t * 7))
  }
  const holes = (i, j) => [-1, 1].some(s => ((i + 0.5 - s * 4.5) / 2.3) ** 2 + ((j + 0.5 + 3) / 3.1) ** 2 <= 1)
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(Math.round(cx), Math.round(cy)); ctx.rotate(rot)
  for (let j = -RY - 5; j <= HEM + 3; j++) for (let i = -RX - 1; i <= RX + 1; i++) {
    if (!inside(i, j)) {
      if (inside(i + 1, j) || inside(i - 1, j) || inside(i, j + 1) || inside(i, j - 1)) { ctx.fillStyle = '#2a2156'; ctx.fillRect(i * c, j * c, c + 0.5, c + 0.5) }
      continue
    }
    if (holes(i, j)) { ctx.fillStyle = '#120a28'; ctx.fillRect(i * c, j * c, c + 0.5, c + 0.5); continue }
    const u = (i + 0.5) / RX, v = (j + 0.5) / RY
    let col = '#f4f7ff'
    if (u + v < -0.9) col = '#ffffff'
    else if (u > 0.55 || (j > HEM - 4 && (i + Math.floor(t * 3)) % 5 === 0)) col = '#c9d6f2'
    else if (u > 0.3 && v > 0.2) col = '#dde6fa'
    ctx.fillStyle = col; ctx.fillRect(i * c, j * c, c + 0.5, c + 0.5)
  }
  const [lx, ly] = look, shut = blink && (t + 0.4) % 3.1 < 0.12
  for (const s of [-1, 1]) {
    const ex = s * 4.5 * c, ey = -3 * c
    if (shut) { ctx.fillStyle = '#ffffff'; ctx.fillRect(ex - 1.5 * c, ey, 3 * c, c * 0.6); continue }
    const pw = wide ? 2 : 1.6
    ctx.fillStyle = '#ffffff'; ctx.fillRect(ex - pw / 2 * c + lx * c * 0.7, ey - c * 1.2 + ly * c * 0.9, pw * c, (wide ? 2.6 : 2) * c)
    ctx.fillStyle = '#120a28'; ctx.fillRect(ex - 0.4 * c + lx * c * 0.9, ey - c * 0.4 + ly * c * 0.9, c * 0.8, c * 0.8)
  }
  if (blush > 0) { ctx.globalAlpha *= 0.6 * clamp(blush); ctx.fillStyle = '#ffb3cc'; for (const s of [-1, 1]) ctx.fillRect(s * 6.5 * c - c, c, 2 * c, c) }
  ctx.restore()
}

// ── the cameo: the ghost slides out from behind an edge, looks at you, glances along the edge, and ducks back.
// (x, y) is a point on the edge it hides behind. from: the side it hides on: 'below' (it rises above a horizontal edge
// at y), 'above' (it hangs down under one, upside down), 'left' or 'right' (it leans out past a vertical edge at x).
// Only the ghost is clipped, so draw it AFTER the thing it hides behind or the thing will cover it.
export function drawGhostCameo(ctx, t, { x, y, at, dur = 1.5, from = 'below', cell = 3, look = null } = {}) {
  if (!(t > at && t < at + dur)) return
  const k = easeOutBack(prog(t, at, at + 0.3), 1.7) * (1 - ease.inCubic(prog(t, at + dur - 0.28, at + dur)))
  const mid = prog(t, at + 0.35, at + dur - 0.35)
  const along = from === 'right' ? -1 : 1
  const lk = look ?? (mid > 0.35 && mid < 0.7 ? [along, 0] : [0, 0])
  const c = cell, BIG = 4000
  let cx = x, cy = y, rot = 0
  ctx.save(); ctx.beginPath()
  if (from === 'below') { ctx.rect(x - BIG, y - BIG, 2 * BIG, BIG); cy = y - c + (1 - k) * 23 * c }
  else if (from === 'above') { ctx.rect(x - BIG, y, 2 * BIG, BIG); cy = y + c - (1 - k) * 23 * c; rot = Math.PI }
  else if (from === 'left') { ctx.rect(x, y - BIG, BIG, 2 * BIG); cx = x + c - (1 - k) * 16 * c; rot = 0.2 * k }
  else { ctx.rect(x - BIG, y - BIG, BIG, 2 * BIG); cx = x - c + (1 - k) * 16 * c; rot = -0.2 * k }
  ctx.clip()
  drawGhostSheet(ctx, t, cx, cy, c, { look: lk, rot })
  ctx.restore()
}
