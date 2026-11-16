// sxhoodmidtown · props: helpers copied from srhtxloops/scenes/props.js (ink, sparkle, chip, the star transform, tears,
// asides) plus this film's own Midtown pieces (skyline, light rail, phone, notifications, tables, card, show bug).
import { clamp, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', BLUE = '#8fd8f6', ROSE = '#f59cc4', VIOLET = '#9a7be0', LAV = '#c9a6ff', AMBER = '#ffb86b'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
const TAU = Math.PI * 2
const h2r = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
export const rgba = (hex, a) => { const [r, g, b] = h2r(hex); return `rgba(${r},${g},${b},${clamp(a)})` }

/** fill the current path at fa, then stroke it thick with a glow */
export function ink(ctx, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { ctx.fillStyle = rgba(fill, fa); ctx.fill() }
  ctx.lineJoin = 'round'; ctx.lineCap = 'round'
  ctx.shadowColor = col; ctx.shadowBlur = glow
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke()
  ctx.shadowBlur = 0
}

// ── pixel-star sparkle burst
const SPARK = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
export function sparkle(ctx, x, y, t, t0, { n = 10, R = 150, seed = 1, cols = SPARK, size = 28, dur = 0.75 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const r = rng(seed)
  ctx.save()
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + r() * 0.5, d = R * (0.6 + 0.5 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = 1 - Math.pow(1 - Math.min(1, tt / (dur * 0.8)), 3)
    ctx.globalAlpha = Math.max(0, 1 - Math.max(0, tt - dur * 0.3) / (dur * 0.7))
    drawPixelStar(ctx, x + Math.cos(a) * d * p, y + Math.sin(a) * d * p, size * (1 - 0.35 * p), kind, col)
  }
  ctx.restore()
}

// ── a glowing orb with a soft halo
export function orb(ctx, px, py, r, color, a = 1, halo = 3.2) {
  if (a <= 0 || r <= 0.5) return
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  const hr = r * halo, g = ctx.createRadialGradient(px, py, r * 0.5, px, py, hr)
  g.addColorStop(0, rgba(color, 0.5 * a)); g.addColorStop(0.3, rgba(color, 0.16 * a)); g.addColorStop(1, rgba(color, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, hr, 0, TAU); ctx.fill()
  ctx.globalCompositeOperation = 'source-over'
  ctx.globalAlpha = a
  const s = ctx.createRadialGradient(px - r * 0.35, py - r * 0.4, r * 0.08, px, py, r)
  s.addColorStop(0, '#fffaf0'); s.addColorStop(0.45, color); s.addColorStop(1, rgba(color, 0.85))
  ctx.fillStyle = s; ctx.beginPath(); ctx.arc(px, py, r, 0, TAU); ctx.fill()
  ctx.restore()
}

/** a label chip (mono caps on a dark pill) centred at (x, y) */
export function chip(ctx, x, y, text, k, { size = 26, col = BONE, edge = LAV } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.globalAlpha *= clamp(k * 1.5)
  ctx.font = `700 ${size}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  const w = ctx.measureText(text).width + size * 1.1, h = size * 1.6
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, h / 2)
  ctx.fillStyle = 'rgba(14,9,34,0.88)'; ctx.fill(); ink(ctx, edge, { w: 3, fa: 0, glow: 10 })
  ctx.fillStyle = col; ctx.fillText(text, 0, 1)
  ctx.restore()
}

// ───────────────────────────────────────── the star transform (mirrors startalk.js drawStarChar; from stelevator's kit)
const G = 36, HALF = 18
const SC = { y: 19.6, R: 17.6 }
const FOOT_ROW = SC.y + SC.R * Math.cos(Math.PI / 5)
function hopState(t, hops) {
  if (!hops || !hops.length) return { lift: 0, sq: 0 }
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt > 0.6) return { lift: 0, sq: 0 }
  const AIR = 0.26
  if (dt < 0.05) return { lift: 0, sq: 0.12 * Math.sin(Math.PI * dt / 0.05) }
  if (dt < 0.05 + AIR) { const p = (dt - 0.05) / AIR; return { lift: Math.sin(Math.PI * p), sq: -0.1 * Math.sin(Math.PI * Math.min(1, p * 1.6)) } }
  const d = dt - 0.05 - AIR
  return { lift: 0, sq: 0.16 * Math.exp(-d * 11) * Math.cos(d * 26) }
}
export function starFrame(x, y, size, t, { pop = 1, bob, squash = 0, hops = null, seed = 1 } = {}) {
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const S = cell * G
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  return { cell, S, cy, base, ox: Math.round(x), oy: Math.round(cy + base), sx: 1 + sq, sy: 1 - sq * 0.9 }
}
/** run fn with the context mapped to sprite cells (0…36) of the star drawn with the same args */
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
export const cellToWorld = (F, i, j) => [F.ox + (i - HALF) * F.cell * F.sx, F.oy + (j - HALF) * F.cell * F.sy - F.base * F.sy]
const INKC = '#1b1236'
/** tears from both eyes (cells). k: 0 none · 1 sniffle · 2 streams · 3 fountains */
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INKC; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      if (k === 1 && ph > 0.75) continue
      let x, y
      if (k >= 3) { x = ex + d * 15 * ph; y = 20 - 9 * ph + 24 * ph * ph }
      else if (k === 2) { x = ex + d * 3.5 * ph; y = 20.5 + 15 * ph * ph }
      else { x = ex + d * 0.6 * ph; y = 21 + 8 * ph * ph }
      drop(Math.round(x * 2) / 2, Math.round(y * 2) / 2)
    }
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
/** a pixel speech chip with a little tail toward (tx, ty) (Pisces' asides) */
export function aside(ctx, x, y, text, k, { size = 30, col = BONE, edge = '#c9a6ff', tx = null, ty = null } = {}) {
  if (k <= 0.01) return
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.globalAlpha *= clamp(k * 1.5)
  ctx.font = `700 ${size}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  const w = ctx.measureText(text).width + 36, h = size + 26
  if (tx !== null) { ctx.fillStyle = INKC; ctx.beginPath(); ctx.moveTo(-14, h / 2 - 2); ctx.lineTo((tx - x) / k * 0.35, (ty - y) / k * 0.6); ctx.lineTo(14, h / 2 - 2); ctx.fill() }
  ctx.fillStyle = INKC; ctx.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  ctx.fillStyle = 'rgba(20,12,44,0.97)'; ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.fillStyle = edge; ctx.fillRect(-w / 2, h / 2 - 5, w, 5)
  ctx.fillStyle = col; ctx.fillText(text, 0, 2)
  ctx.restore()
}

// ───────────────────────────────────────── the show bug (DOM): "NEIGHBORHOOD STARS · <HOOD>", top-left, 56 px in
export function showBug(el, root, hood) {
  return el('div', { position: 'absolute', left: '56px', top: '56px', font: `800 30px ${INTER}`, fontVariant: 'all-small-caps', letterSpacing: '0.16em',
    color: GOLD, textShadow: '0 3px 14px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', opacity: 0, pointerEvents: 'none' }, root,
    `★ NEIGHBORHOOD STARS<span style="color:rgba(239,230,214,0.6)"> · ${hood}</span>`)
}

// ───────────────────────────────────────── a generic Midtown skyline: mid-rise blocks, balconies, a construction crane
const TOWERS = [
  { x: -20, w: 150, h: 300 }, { x: 120, w: 120, h: 420, crane: true }, { x: 232, w: 160, h: 340 }, { x: 380, w: 110, h: 520 },
  { x: 480, w: 170, h: 380 }, { x: 640, w: 120, h: 470 }, { x: 752, w: 150, h: 330 }, { x: 890, w: 130, h: 440 }, { x: 1010, w: 100, h: 280 },
]
export function skyline(ctx, t, { y = 1330, alpha = 1, lit = 0.5, dim = 0, warm = '#ffd98a' } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  TOWERS.forEach((b, bi) => {
    const T0 = y - b.h
    ctx.fillStyle = '#1a1140'; ctx.fillRect(b.x, T0, b.w, b.h)
    ctx.fillStyle = '#2c1f5e'; ctx.fillRect(b.x, T0, 4, b.h); ctx.fillRect(b.x, T0, b.w, 6)
    // balcony rails every other floor
    ctx.fillStyle = '#251a52'
    for (let j = T0 + 40; j < y - 20; j += 56) ctx.fillRect(b.x + 6, j, b.w - 12, 4)
    // windows
    for (let j = 0; T0 + 18 + j * 28 < y - 16; j++) for (let i = 0; b.x + 14 + i * 22 < b.x + b.w - 14; i++) {
      const h = Math.sin(bi * 91.7 + i * 12.9898 + j * 78.233) * 43758.5453, r = h - Math.floor(h)
      if (r > lit) continue
      const flick = Math.sin(t * 0.8 + r * 50) > 0.95 ? 0.4 : 1
      ctx.globalAlpha = alpha * (0.5 + 0.5 * r / lit) * flick * (1 - dim * (r > 0.12 ? 0.85 : 0.2))
      ctx.fillStyle = r < 0.07 ? '#fff3d6' : r < 0.2 ? PINK : warm
      ctx.fillRect(b.x + 14 + i * 22, T0 + 18 + j * 28, 12, 15)
    }
    ctx.globalAlpha = alpha
    if (b.crane) {   // a tower crane on the roof (Midtown is always building something)
      const cx = b.x + b.w * 0.6, top = T0 - 150
      ctx.fillStyle = '#f2c75c'
      for (let k = 0; k < 150; k += 14) { ctx.fillRect(cx - 6, top + k, 4, 12); ctx.fillRect(cx + 6, top + k, 4, 12); ctx.fillRect(cx - 6, top + k + 6, 16, 3) }
      ctx.fillRect(cx - 70, top - 4, 230, 8); ctx.fillRect(cx - 70, top - 4, 34, 22)
      const sw = Math.sin(t * 0.9) * 8
      ctx.fillStyle = BONE; ctx.fillRect(cx + 120 + sw * 0.2, top + 4, 2, 70 + sw)
      ctx.fillStyle = PINK; ctx.fillRect(cx + 112 + sw * 0.2, top + 74 + sw, 18, 12)
      ctx.globalAlpha = alpha * (Math.sin(t * 5) > 0 ? 1 : 0.2); ctx.fillStyle = '#ff3d6e'; ctx.fillRect(cx - 2, top - 14, 8, 8); ctx.globalAlpha = alpha
    }
  })
  // the street + sidewalk
  ctx.fillStyle = '#120c2c'; ctx.fillRect(0, y, 1080, 260)
  ctx.fillStyle = '#2b2160'; ctx.fillRect(0, y, 1080, 12)
  ctx.fillStyle = '#3a2d78'; ctx.fillRect(0, y + 120, 1080, 8)
  ctx.restore()
}

/** the light-rail train sliding along the street (generic: bone body, pink stripe, a pantograph), front at x */
export function train(ctx, x, y, t, a = 1) {
  if (a <= 0) return
  ctx.save(); ctx.globalAlpha *= a
  ctx.fillStyle = '#6a5aa8'; ctx.fillRect(-20, y - 196, 1120, 4)                        // the overhead wire
  for (let c = 0; c < 3; c++) {
    const L = x - (c + 1) * 330
    ctx.fillStyle = '#1b1236'; ctx.fillRect(L - 6, y - 126, 330, 120)
    ctx.fillStyle = BONE; ctx.fillRect(L, y - 120, 318, 108)
    ctx.fillStyle = PINK; ctx.fillRect(L, y - 54, 318, 12)
    for (let i = 0; i < 5; i++) { ctx.fillStyle = '#2b3d7a'; ctx.fillRect(L + 18 + i * 60, y - 104, 44, 40); ctx.fillStyle = '#8fd8f6'; ctx.fillRect(L + 18 + i * 60, y - 104, 44, 8) }
    ctx.fillStyle = '#1b1236'; ctx.fillRect(L + 140, y - 160, 6, 36); ctx.fillRect(L + 120, y - 194, 46, 6)   // pantograph
    for (const d of [50, 268]) { ctx.fillStyle = '#1b1236'; ctx.beginPath(); ctx.arc(L + d, y - 6, 16, 0, TAU); ctx.fill() }
  }
  ctx.fillStyle = '#ffe7a8'; ctx.shadowColor = '#ffe7a8'; ctx.shadowBlur = 18; ctx.fillRect(x - 18, y - 46, 12, 14); ctx.shadowBlur = 0
  ctx.restore()
}

/** a pixel phone centred at (x, y): face up (glowing) → face down as down goes 0 → 1; buzz shakes it */
export function phone(ctx, x, y, s, rot, t, { a = 1, down = 0, buzz = 0, glowCol = '#8fd8f6' } = {}) {
  if (a <= 0 || s <= 0) return
  const w = 64 * s, h = 116 * s, flipK = Math.abs(Math.cos(Math.PI * down))
  ctx.save(); ctx.translate(x + buzz * 5 * Math.sin(t * 90), y); ctx.rotate(rot); ctx.scale(1, Math.max(0.06, flipK)); ctx.globalAlpha *= a
  const face = down < 0.5
  if (face) { ctx.shadowColor = glowCol; ctx.shadowBlur = 30 * s }
  ctx.fillStyle = '#1b1236'; ctx.fillRect(-w / 2 - 5 * s, -h / 2 - 5 * s, w + 10 * s, h + 10 * s)
  ctx.shadowBlur = 0
  if (face) {
    ctx.fillStyle = '#2a3f8f'; ctx.fillRect(-w / 2, -h / 2, w, h)
    ctx.fillStyle = glowCol; for (let i = 0; i < 4; i++) ctx.fillRect(-w / 2 + 8 * s, -h / 2 + 14 * s + i * 22 * s, w - 16 * s - (i % 2) * 14 * s, 12 * s)
  } else {
    ctx.fillStyle = '#4b3d8a'; ctx.fillRect(-w / 2, -h / 2, w, h)
    ctx.fillStyle = '#6a5aa8'; ctx.fillRect(-w / 2 + 10 * s, -h / 2 + 10 * s, 18 * s, 18 * s)
  }
  ctx.restore()
}

/** a phone notification card (canvas) centred at (x, y): app line + message */
export function notif(ctx, x, y, from, msg, k, { w = 470, edge = LAV, fromCol = LAV } = {}) {
  if (k <= 0.01) return
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.globalAlpha *= clamp(k * 1.5)
  const h = 108
  ctx.fillStyle = '#1b1236'; ctx.beginPath(); ctx.roundRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10, 24); ctx.fill()
  ctx.fillStyle = 'rgba(30,20,64,0.97)'; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 20); ctx.fill()
  ctx.strokeStyle = edge; ctx.lineWidth = 3; ctx.stroke()
  ctx.fillStyle = edge; ctx.fillRect(-w / 2 + 22, -h / 2 + 22, 22, 22)
  ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
  ctx.font = `700 22px ${MONO}`; ctx.fillStyle = fromCol; ctx.fillText(from, -w / 2 + 56, -h / 2 + 33)
  ctx.font = `800 36px ${INTER}`; ctx.fillStyle = BONE; ctx.fillText(msg, -w / 2 + 22, h / 2 - 30)
  ctx.restore()
}

/** a table top seen from the front: a slab with legs, from x0 to x1, top surface at y */
export function table(ctx, x0, x1, y, { a = 1, cloth = '#efe6d6', edge = '#c9a6ff' } = {}) {
  if (a <= 0 || x1 <= x0) return
  ctx.save(); ctx.globalAlpha *= a
  ctx.fillStyle = '#1b1236'; ctx.fillRect(x0 - 6, y - 6, x1 - x0 + 12, 46)
  ctx.fillStyle = cloth; ctx.fillRect(x0, y, x1 - x0, 34)
  ctx.fillStyle = edge; ctx.fillRect(x0, y + 26, x1 - x0, 8)
  ctx.fillStyle = '#1b1236'
  for (let lx = x0 + 30; lx < x1 - 20; lx += 260) ctx.fillRect(lx, y + 40, 14, 150)
  ctx.fillRect(x1 - 44, y + 40, 14, 150)
  ctx.restore()
}

/** a pixel waffle on a plate (the brunch), centred at (x, y) */
export function waffle(ctx, x, y, s, a = 1) {
  if (a <= 0 || s <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a
  ctx.fillStyle = '#1b1236'; ctx.fillRect(-42, -4, 84, 14)
  ctx.fillStyle = BONE; ctx.fillRect(-38, -2, 76, 8)
  ctx.fillStyle = '#1b1236'; ctx.fillRect(-26, -26, 52, 26)
  ctx.fillStyle = '#e9a64a'; ctx.fillRect(-22, -22, 44, 20)
  ctx.fillStyle = '#b8732a'; for (let i = 0; i < 3; i++) { ctx.fillRect(-22 + i * 15 + 5, -22, 4, 20); ctx.fillRect(-22, -16 + i * 6, 44, 2) }
  ctx.fillStyle = '#fff3c4'; ctx.fillRect(-6, -28, 12, 8)
  ctx.restore()
}

/** a little candle (flicker) */
export function candle(ctx, x, y, t, a = 1) {
  if (a <= 0) return
  ctx.save(); ctx.globalAlpha *= a
  ctx.fillStyle = '#1b1236'; ctx.fillRect(x - 14, y - 52, 28, 52)
  ctx.fillStyle = BONE; ctx.fillRect(x - 10, y - 48, 20, 48)
  const f = 1 + 0.15 * Math.sin(t * 17) + 0.1 * Math.sin(t * 31)
  ctx.shadowColor = AMBER; ctx.shadowBlur = 40
  ctx.fillStyle = AMBER; ctx.fillRect(x - 6, y - 52 - 22 * f, 12, 22 * f)
  ctx.fillStyle = '#fff3c4'; ctx.fillRect(x - 3, y - 52 - 12 * f, 6, 12 * f)
  ctx.restore()
}

/** a plain pixel card back (seed-of-life rings, no wordmark) centred at (x, y), w wide; flip 0..1 shows it edge-on → flat */
export function cardBack(ctx, x, y, w, rot, a = 1, flip = 1) {
  if (a <= 0 || w <= 0) return
  const h = w * 1.5
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(Math.max(0.04, flip), 1); ctx.globalAlpha *= a
  ctx.shadowColor = GOLD; ctx.shadowBlur = 30
  ctx.fillStyle = '#1b1236'; ctx.beginPath(); ctx.roundRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12, 16); ctx.fill()
  ctx.shadowBlur = 0
  ctx.fillStyle = '#2a1c5c'; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 12); ctx.fill()
  ctx.strokeStyle = GOLD; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20, 8); ctx.stroke()
  const r = w * 0.14
  ctx.strokeStyle = 'rgba(242,199,92,0.85)'; ctx.lineWidth = 2.5
  ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.stroke()
  for (let i = 0; i < 6; i++) { const an = i * Math.PI / 3; ctx.beginPath(); ctx.arc(Math.cos(an) * r, Math.sin(an) * r, r, 0, TAU); ctx.stroke() }
  drawPixelStar(ctx, 0, -h * 0.34, 22, 1, GOLD)
  drawPixelStar(ctx, 0, h * 0.34, 22, 1, GOLD)
  ctx.restore()
}

/** a warm pool of light on the ground / table (additive) */
export function pool(ctx, cx, cy, rx, ry, a, col = '255,214,150') {
  if (a <= 0) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.translate(cx, cy); ctx.scale(1, ry / rx)
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx)
  g.addColorStop(0, `rgba(${col},${0.42 * a})`); g.addColorStop(1, `rgba(${col},0)`)
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, rx, 0, TAU); ctx.fill()
  ctx.restore()
}

/** little pixel hearts floating up from (cx, cy) between t0 and t1 */
export function floatHearts(ctx, t, cx, cy, t0, t1, seed = 0, cell = 7, spread = 200) {
  const HB = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
  for (let i = 0; i < 7; i++) {
    const born = t0 + i * 0.22, life = 1.2
    if (t < born || born > t1) continue
    const p = (t - born) / life
    if (p >= 1) continue
    const side = ((i * 37 + seed) % 7) / 6 - 0.5
    const hx = Math.round(cx + side * spread + Math.sin(p * 7 + i) * 16), hy = Math.round(cy - 40 - p * 220)
    const c = cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6)))
    ctx.save(); ctx.globalAlpha *= Math.sin(Math.PI * p)
    HB.forEach((row, j) => [...row].forEach((ch, k) => { if (ch === '.') return; ctx.fillStyle = ch === 'W' ? '#ffd1de' : '#ff4f86'; ctx.fillRect(hx + (k - 2.5) * c, hy + (j - 2.5) * c, c + 0.5, c + 0.5) }))
    ctx.restore()
  }
}
