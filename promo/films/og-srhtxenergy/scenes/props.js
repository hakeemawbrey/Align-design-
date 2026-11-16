// srhtxenergy props — drawings for this film only. Pure f(args); nothing touches `document` at load.
//   starFrame / inSprite / tearsCells / sweatCells   (the stlive5th / srhtxhumidity helpers, same maths as startalk.js)
//   drawSkyline(x, t, k, surge, a)   a generic night skyline wired with pulsing energy lines (no real buildings)
//   drawZap(x, x0, y0, x1, y1, t, { col, w, seed, jag })   a jagged lightning bolt
//   drawSmoke(x, cx, cy, p)  ·  drawCable(x, ax, ay, bx, by, col, sag, a)  ·  drawRug(x, cx, y, w, a)
//   drawChart(x, cx, cy, R, t, k, planetAng, col, charge)   a small zodiac chart wheel with one gold planet
//   drawReadArc(x, x0, x1, y, bulge, col, p, t, seed)       a crackling Push / Pull / Align arc
import { clamp, lerp, ease, hexToRgb } from '../../../src/lib.js'
import { SIGNS } from '../../wheel.js'

export const INK = '#1b1236'
export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', ELEC = '#7af0ff', CYAN = '#8fd8f6', BLUE = '#8fd8f6', PUSH = '#f59cc4', VIOLET = '#b07cff'
export const MONO = "'Space Mono', ui-monospace, monospace"
const TAU = Math.PI * 2
export const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
const hash = i => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }

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
// sweat drops flying off the temples (cells); k = how many (1–3)
export function sweatCells(ctx, t, k = 1) {
  const one = (ph, x0, d) => {
    const i = x0 + d * 4 * ph, j = 11 + 8 * ph * ph - 3 * ph
    ctx.fillStyle = INK; ctx.fillRect(i - 0.3, j - 1.2, 1.8, 2.6)
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j - 0.9, 1.2, 2); ctx.fillStyle = '#fff'; ctx.fillRect(i, j - 0.9, 0.5, 0.5)
  }
  for (let q = 0; q < k; q++) {
    one(((t * 1.6 + q * 0.37) % 1), 28.5, 1)
    if (k > 1) one(((t * 1.6 + q * 0.37 + 0.5) % 1), 6.5, -1)
  }
}


// ── the skyline. k 0…1 springs the towers up one by one; surge 0…1 blazes every window + line
const TOWERS = [[110, 120, 330], [235, 100, 470], [350, 130, 380], [480, 110, 560], [600, 140, 420], [735, 100, 620], [850, 120, 400], [975, 110, 300]]
export const SKY_BASE = 1400
export const towerTop = i => { const [cx, , h] = TOWERS[i]; return [cx, SKY_BASE - h] }
export function drawSkyline(x, t, k, surge = 0, a = 1) {
  if (k <= 0 || a <= 0) return
  x.save(); x.globalAlpha *= a
  const tops = []
  TOWERS.forEach(([cx, w, h], i) => {
    const kk = clamp(k * TOWERS.length - i * 0.85)
    if (kk <= 0) return
    const hh = h * (1 - Math.pow(1 - kk, 3)) * (1 + 0.06 * Math.sin(Math.PI * kk))
    tops.push([cx, SKY_BASE - hh, i])
    x.fillStyle = 'rgba(14,9,34,0.95)'; x.fillRect(cx - w / 2, SKY_BASE - hh, w, hh)
    x.strokeStyle = rgba(ELEC, 0.55 + 0.4 * surge); x.lineWidth = 4; x.shadowColor = ELEC; x.shadowBlur = 12 + 20 * surge
    x.strokeRect(cx - w / 2, SKY_BASE - hh, w, hh); x.shadowBlur = 0
    // windows
    const cols = Math.floor((w - 20) / 22), rows = Math.floor((hh - 30) / 30)
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const id = i * 997 + r * 31 + c
      const on = surge > 0.5 || hash(id + Math.floor(t * 1.3 + hash(id) * 5)) > 0.55
      if (!on) continue
      x.fillStyle = surge > 0.5 ? '#fff6c8' : (hash(id) > 0.5 ? GOLD : rgba(ELEC, 0.8))
      x.fillRect(cx - w / 2 + 12 + c * 22, SKY_BASE - hh + 18 + r * 30, 12, 14)
    }
  })
  // energy lines between neighbouring tops, with pulses running along them
  for (let j = 1; j < tops.length; j++) {
    const [ax, ay] = tops[j - 1], [bx, by] = tops[j]
    const midY = Math.min(ay, by) - 60
    x.strokeStyle = rgba(ELEC, 0.45 + 0.5 * surge); x.lineWidth = 3 + 4 * surge; x.shadowColor = ELEC; x.shadowBlur = 10 + 20 * surge
    x.beginPath(); x.moveTo(ax, ay); x.quadraticCurveTo((ax + bx) / 2, midY, bx, by); x.stroke(); x.shadowBlur = 0
    const ph = (t * 0.9 + j * 0.27) % 1, u = ph
    const px = (1 - u) * (1 - u) * ax + 2 * (1 - u) * u * (ax + bx) / 2 + u * u * bx, py = (1 - u) * (1 - u) * ay + 2 * (1 - u) * u * midY + u * u * by
    x.fillStyle = '#ffffff'; x.shadowColor = ELEC; x.shadowBlur = 16; x.beginPath(); x.arc(px, py, 7 + 5 * surge, 0, TAU); x.fill(); x.shadowBlur = 0
  }
  // the ground line
  x.strokeStyle = rgba(ELEC, 0.6); x.lineWidth = 4; x.beginPath(); x.moveTo(0, SKY_BASE); x.lineTo(1080, SKY_BASE); x.stroke()
  x.restore()
}

/** a jagged lightning bolt from (x0,y0) to (x1,y1); flickers with t */
export function drawZap(x, x0, y0, x1, y1, t, { col = ELEC, w = 7, seed = 1, jag = 26, n = 9, a = 1 } = {}) {
  if (a <= 0) return
  const fr = Math.floor(t * 24)
  const pts = []
  for (let i = 0; i <= n; i++) {
    const u = i / n, off = i === 0 || i === n ? 0 : (hash(seed * 31 + i + fr * 7) - 0.5) * 2 * jag
    const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1
    pts.push([x0 + dx * u - dy / L * off, y0 + dy * u + dx / L * off])
  }
  x.save(); x.globalAlpha *= a; x.lineJoin = 'round'; x.lineCap = 'round'
  for (const [lw, c, b] of [[w * 2.4, rgba(col, 0.35), 30], [w, col, 18], [w * 0.4, '#ffffff', 0]]) {
    x.strokeStyle = c; x.lineWidth = lw; x.shadowColor = col; x.shadowBlur = b
    x.beginPath(); pts.forEach(([px, py], i) => (i ? x.lineTo(px, py) : x.moveTo(px, py))); x.stroke()
  }
  x.restore()
}

/** a puff of grey smoke (p 0…1) */
export function drawSmoke(x, cx, cy, p) {
  if (p <= 0 || p >= 1) return
  x.save()
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * TAU + 0.4, r = 26 + 40 * ease.outCubic(p)
    x.globalAlpha = 0.8 * (1 - ease.inQuad(p))
    x.fillStyle = i % 2 ? '#8d88a8' : '#b9b3d6'
    x.beginPath(); x.arc(cx + Math.cos(a) * r * 1.3, cy + Math.sin(a) * r * 0.7 - 70 * p, 30 + 26 * p, 0, TAU); x.fill()
  }
  x.restore()
}

/** a jumper cable with a sagging wire and a clamp at the far end */
export function drawCable(x, ax, ay, bx, by, col, sag = 80, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  x.strokeStyle = col; x.lineWidth = 10; x.lineCap = 'round'; x.shadowColor = col; x.shadowBlur = 8
  x.beginPath(); x.moveTo(ax, ay); x.quadraticCurveTo((ax + bx) / 2, Math.max(ay, by) + sag, bx, by); x.stroke(); x.shadowBlur = 0
  for (const [px, py] of [[ax, ay], [bx, by]]) {
    x.fillStyle = col; x.fillRect(px - 16, py - 14, 32, 28)
    x.fillStyle = '#cfcfdf'; x.fillRect(px - 20, py - 22, 10, 14); x.fillRect(px + 10, py - 22, 10, 14)
  }
  x.restore()
}

/** a little pixel rug */
export function drawRug(x, cx, y, w, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  x.fillStyle = '#6a2a5a'; x.fillRect(cx - w / 2, y, w, 26)
  x.fillStyle = GOLD; for (let i = 0; i < w; i += 28) x.fillRect(cx - w / 2 + i + 6, y + 9, 14, 8)
  x.fillStyle = BONE; for (let i = 0; i <= w; i += 14) { x.fillRect(cx - w / 2 + i - 2, y + 26, 4, 10); x.fillRect(cx - w / 2 + i - 2, y - 10, 4, 10) }
  x.restore()
}

/** a small zodiac chart: ring, 12 ticks + glyphs, one gold planet at planetAng (rad); charge 0…1 makes it glow */
export function drawChart(x, cx, cy, R, t, k, planetAng, col, charge = 0) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.globalAlpha *= clamp(k * 2)
  x.fillStyle = 'rgba(14,9,34,0.85)'; x.beginPath(); x.arc(0, 0, R, 0, TAU); x.fill()
  x.strokeStyle = col; x.lineWidth = 6; x.shadowColor = col; x.shadowBlur = 18; x.beginPath(); x.arc(0, 0, R, 0, TAU); x.stroke()
  x.lineWidth = 3; x.beginPath(); x.arc(0, 0, R * 0.7, 0, TAU); x.stroke(); x.shadowBlur = 0
  x.save(); x.rotate(t * 0.15)
  x.font = `700 ${Math.round(R * 0.16)}px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
  for (let i = 0; i < 12; i++) {
    const an = (i / 12) * TAU
    x.strokeStyle = rgba(BONE, 0.5); x.lineWidth = 2; x.beginPath(); x.moveTo(Math.cos(an) * R * 0.7, Math.sin(an) * R * 0.7); x.lineTo(Math.cos(an) * R, Math.sin(an) * R); x.stroke()
    const ag = an + Math.PI / 12
    x.fillStyle = SIGNS[i].color; x.fillText(SIGNS[i].glyph + '︎', Math.cos(ag) * R * 0.85, Math.sin(ag) * R * 0.85)
  }
  x.restore()
  // the planet
  const pr = R * 0.7
  const px = Math.cos(planetAng) * pr, py = Math.sin(planetAng) * pr
  x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(px, py, 2, px, py, 40 + 50 * charge); g.addColorStop(0, rgba(GOLD, 0.8)); g.addColorStop(1, rgba(GOLD, 0))
  x.fillStyle = g; x.beginPath(); x.arc(px, py, 40 + 50 * charge, 0, TAU); x.fill()
  x.globalCompositeOperation = 'source-over'
  x.fillStyle = GOLD; x.beginPath(); x.arc(px, py, 18 + 4 * charge * Math.sin(t * 30), 0, TAU); x.fill()
  x.fillStyle = '#fff6c8'; x.beginPath(); x.arc(px - 5, py - 5, 6, 0, TAU); x.fill()
  x.restore()
}

/** a crackling reading arc between x0 and x1 at height y (bulge px upward), drawn on to p; a small label above its peak */
export function drawReadArc(x, x0, x1, y, bulge, col, p, t, label, seed = 1) {
  if (p <= 0) return
  const N = 28, pts = []
  const fr = Math.floor(t * 18)
  for (let i = 0; i <= N * p; i++) {
    const u = i / N
    const jit = i === 0 ? 0 : (hash(seed * 13 + i + fr * 5) - 0.5) * 10
    pts.push([lerp(x0, x1, u), y - Math.sin(Math.PI * u) * bulge + jit])
  }
  x.save(); x.lineJoin = 'round'; x.lineCap = 'round'
  for (const [lw, c, b] of [[16, rgba(col, 0.3), 26], [7, col, 16], [2.5, '#ffffff', 0]]) {
    x.strokeStyle = c; x.lineWidth = lw; x.shadowColor = col; x.shadowBlur = b
    x.beginPath(); pts.forEach(([px, py], i) => (i ? x.lineTo(px, py) : x.moveTo(px, py))); x.stroke()
  }
  if (p >= 1 && label) {
    x.shadowBlur = 0; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const tw = x.measureText(label).width + 26
    x.fillStyle = 'rgba(10,6,24,0.85)'; x.beginPath(); x.roundRect((x0 + x1) / 2 - tw / 2, y - bulge - 58, tw, 42, 10); x.fill()
    x.strokeStyle = col; x.lineWidth = 3; x.stroke()
    x.fillStyle = col; x.fillText(label, (x0 + x1) / 2, y - bulge - 36)
  }
  x.restore()
}
