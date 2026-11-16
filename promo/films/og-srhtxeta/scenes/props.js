// srhtxeta props — pixel drawings for this film only. Pure f(args); nothing touches `document` at load.
//   starFrame / inSprite / tearsCells / sweatCells   the stlive5th star-seated helpers (same maths as startalk.js).
//   bubble / clockFace / drawPhone / cobweb           the film's props.
import { clamp, lerp } from '../../../src/lib.js'
const INK = '#1b1236'
export const RED = '#ff4d4a', GREEN = '#5df29a', BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', CYAN = '#8fd8f6'
export const MONO = "'Space Mono', ui-monospace, monospace"
const G = 36, HALF = 18
const SC_Y = 19.6, SC_R = 17.6
const FOOT_ROW = SC_Y + SC_R * Math.cos(Math.PI / 5)

// ── star transform (mirrors startalk.js drawStarChar)
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
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
export const cellToWorld = (F, i, j) => [F.ox - F.S / 2 + i * F.cell, F.oy - F.S / 2 - F.base + j * F.cell]

function paintCells(ctx, cells, outline = INK) {
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  if (outline) {
    ctx.fillStyle = outline
    for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b))) ctx.fillRect(i + a, j + b, 1.02, 1.02)
  }
  for (const [i, j, c] of cells) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) }
}

// ── headset: band over the top point, two cups, and a little boom mic on the left cup
// ── tears (cells): k 1 sniffle · 2 streams · 3 fountains
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
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
// sweat drop on the right temple (cells)
export function sweatCells(ctx, t) {
  const ph = (t * 1.3) % 1
  const j = 12 + ph * 6
  ctx.fillStyle = INK; ctx.fillRect(28.6, j - 1.2, 1.8, 2.6)
  ctx.fillStyle = '#8fe3ff'; ctx.fillRect(28.9, j - 0.9, 1.2, 2); ctx.fillStyle = '#fff'; ctx.fillRect(28.9, j - 0.9, 0.5, 0.5)
}


// ─────────────────────────────────────────────── the film's props
export const VIOLET = '#c9a6ff', SUN = '#ffb36b', MINT = '#7fe0a8', BLUE = '#8fd8f6'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const TAU = Math.PI * 2
export const rgba = (hex, a) => `rgba(${[1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)).join(',')},${clamp(a)})`

/** fill the current path at fa, then stroke it thick with a glow */
export function ink(x, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { x.fillStyle = rgba(fill, fa); x.fill() }
  x.lineJoin = 'round'; x.lineCap = 'round'
  x.shadowColor = col; x.shadowBlur = glow
  x.strokeStyle = col; x.lineWidth = w; x.stroke()
  x.shadowBlur = 0
}

/** a chat bubble. side -1 = incoming (tail bottom-left, (lx, by) = left/bottom edge); side 1 = outgoing (lx = right edge) */
export function bubble(x, lx, by, txt, { size = 60, k = 1, a = 1, col = VIOLET, side = -1, stamp = null } = {}) {
  x.font = `800 ${size}px ${INTER}`
  const tw = x.measureText(txt).width
  const bw = tw + size * 1.05, bh = size * 1.62, r = bh * 0.42
  if (k <= 0 || a <= 0) return { bw, bh }
  x.save()
  x.translate(lx, by); if (side > 0) x.scale(-1, 1)
  x.translate(30, 0); x.scale(k, k); x.translate(-30, 0)
  x.globalAlpha *= a
  x.beginPath()
  x.moveTo(r, -bh); x.lineTo(bw - r, -bh); x.quadraticCurveTo(bw, -bh, bw, -bh + r); x.lineTo(bw, -r); x.quadraticCurveTo(bw, 0, bw - r, 0)
  x.lineTo(60, 0); x.quadraticCurveTo(26, 22, -6, 26); x.quadraticCurveTo(14, 4, 12, -14)
  x.quadraticCurveTo(0, -24, 0, -r); x.lineTo(0, -bh + r); x.quadraticCurveTo(0, -bh, r, -bh); x.closePath()
  x.fillStyle = '#1a1236'; x.fill()
  ink(x, col, { w: 6, fa: 0.22, glow: 20 })
  if (side > 0) x.scale(-1, 1)
  x.textAlign = side > 0 ? 'right' : 'left'; x.textBaseline = 'middle'
  x.fillStyle = BONE
  x.fillText(txt, side > 0 ? -size * 0.52 : size * 0.52, -bh / 2 + size * 0.04)
  if (stamp) {
    x.font = `700 ${Math.round(size * 0.42)}px ${MONO}`; x.fillStyle = rgba(BONE, 0.62)
    x.fillText(stamp, side > 0 ? -size * 0.3 : size * 0.3, size * 0.62)
  }
  x.restore()
  return { bw, bh }
}

/** a line-art wall clock at (cx, cy), radius R; min = minutes after 6:00 PM; blur 0…1 = racing smear */
export function clockFace(x, cx, cy, R, min, { k = 1, a = 1, blur = 0, rot = 0 } = {}) {
  if (k <= 0 || a <= 0) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k); x.globalAlpha *= a
  x.beginPath(); x.arc(0, 0, R, 0, TAU)
  x.fillStyle = '#140e2c'; x.fill()
  ink(x, GOLD, { w: Math.max(6, R * 0.08), fa: 0.12, glow: 26 })
  for (let i = 0; i < 12; i++) {
    const an = i / 12 * TAU, big = i % 3 === 0
    const r0 = R * (big ? 0.62 : 0.7), r1 = R * 0.8
    x.beginPath(); x.moveTo(Math.sin(an) * r0, -Math.cos(an) * r0); x.lineTo(Math.sin(an) * r1, -Math.cos(an) * r1)
    x.strokeStyle = rgba(BONE, big ? 0.95 : 0.6); x.lineWidth = big ? R * 0.07 : R * 0.04; x.lineCap = 'round'; x.stroke()
  }
  const hourA = ((6 * 60 + min) / 720) * TAU, minA = (min / 60) * TAU
  if (blur > 0) {
    x.save(); x.globalAlpha *= 0.34 * clamp(blur)
    x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, R * 0.74, minA - Math.PI / 2 - 1.8 * clamp(blur), minA - Math.PI / 2); x.closePath()
    x.fillStyle = PINK; x.fill(); x.restore()
  }
  const hand = (an, len, w, c) => {
    x.beginPath(); x.moveTo(-Math.sin(an) * R * 0.12, Math.cos(an) * R * 0.12); x.lineTo(Math.sin(an) * len, -Math.cos(an) * len)
    x.strokeStyle = c; x.lineWidth = w; x.lineCap = 'round'; x.shadowColor = c; x.shadowBlur = 14; x.stroke(); x.shadowBlur = 0
  }
  hand(hourA, R * 0.46, R * 0.1, BONE)
  hand(minA, R * 0.72, R * 0.06, PINK)
  x.beginPath(); x.arc(0, 0, R * 0.09, 0, TAU); x.fillStyle = GOLD; x.fill()
  x.restore()
}

/** a plain dark phone: bezel + pill notch. Returns the screen rect */
export function drawPhone(x, cx, cy, w, h, a = 1) {
  x.save(); x.globalAlpha *= a
  x.shadowColor = 'rgba(0,0,0,0.6)'; x.shadowBlur = 50; x.shadowOffsetY = 20
  x.fillStyle = '#0d0a1c'; x.beginPath(); x.roundRect(cx - w / 2, cy - h / 2, w, h, 64); x.fill()
  x.shadowOffsetY = 0
  x.lineWidth = 8; x.strokeStyle = BONE; x.shadowColor = rgba(VIOLET, 0.9); x.shadowBlur = 22; x.stroke(); x.shadowBlur = 0
  x.fillStyle = '#000'; x.beginPath(); x.roundRect(cx - 60, cy - h / 2 + 24, 120, 30, 15); x.fill()
  x.restore()
  return { x: cx - w / 2 + 20, y: cy - h / 2 + 20, w: w - 40, h: h - 40 }
}

/** a pixel cobweb hung in a corner at (ax, ay), spanning R px down-right (dir 1) or down-left (dir -1); g 0…1 grows it,
 *  plus a tiny pixel spider bobbing on a thread */
export function cobweb(x, ax, ay, R, g, t, dir = 1) {
  if (g <= 0) return
  const P = 6, snap = v => Math.round(v / P) * P
  x.save(); x.globalAlpha *= 0.85
  const spokes = 5
  const dot = (px, py, c = 'rgba(239,230,214,0.75)') => { x.fillStyle = c; x.fillRect(snap(px), snap(py), P, P) }
  for (let s = 0; s < spokes; s++) {
    const an = (s / (spokes - 1)) * (Math.PI / 2)
    const L = R * clamp(g * 1.4 - s * 0.08)
    for (let d = 0; d <= L; d += P) dot(ax + dir * Math.cos(an) * d, ay + Math.sin(an) * d)
  }
  for (let ring = 1; ring <= 3; ring++) {
    const rr = R * ring / 3.4, rk = clamp(g * 2.2 - ring * 0.45)
    if (rk <= 0) continue
    for (let q = 0; q <= 14 * rk; q++) { const an = (q / 14) * (Math.PI / 2); dot(ax + dir * Math.cos(an) * rr, ay + Math.sin(an) * rr * (1 + 0.06 * Math.sin(q * 1.7))) }
  }
  // the spider
  const sk = clamp(g * 2 - 1)
  if (sk > 0) {
    const sx = ax + dir * R * 0.36, top = ay + R * 0.3, sy = top + R * 0.5 * sk + Math.sin(t * 2.4) * 10
    for (let d = top; d < sy; d += P) dot(sx, d, 'rgba(239,230,214,0.5)')
    x.fillStyle = INK; x.fillRect(snap(sx) - P, snap(sy) - P, P * 3, P * 3)
    x.fillStyle = '#3b2f62'; x.fillRect(snap(sx) - P * 2, snap(sy), P, P); x.fillRect(snap(sx) + P * 2, snap(sy), P, P); x.fillRect(snap(sx) - P * 2, snap(sy) - P * 2, P, P); x.fillRect(snap(sx) + P * 2, snap(sy) - P * 2, P, P)
    x.fillStyle = '#fff'; x.fillRect(snap(sx), snap(sy), 2, 2); x.fillRect(snap(sx) + 3, snap(sy), 2, 2)
  }
  x.restore()
}
