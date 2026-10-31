// sxhoodeado · props: helpers copied from sxhoodmidtown/scenes/props.js (ink, sparkle, chip, the star transform, tears,
// asides, show bug, pool, hearts) plus this film's own EaDo pieces (lofts, murals, light towers, beret, sketchbook).
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

// ───────────────────────────────────────── EaDo: a generic mural (bold bands, a sun, zigzags), no words, no logos
const MURAL_SETS = [
  ['#3b1f6e', '#c2459a', '#f0646f', '#f7a24b', '#ffd36b'],
  ['#14455e', '#2bb3a3', '#9fe08a', '#ffd36b', '#ff8fb1'],
  ['#4a1d3f', '#ff6f59', '#ffb86b', '#5fd0ff', '#efe6d6'],
]
export function mural(ctx, x0, y0, w, h, seed = 0, a = 1, reveal = 1) {
  if (a <= 0 || reveal <= 0) return
  const C = MURAL_SETS[seed % MURAL_SETS.length]
  ctx.save(); ctx.globalAlpha *= a
  ctx.beginPath(); ctx.rect(x0, y0, w * reveal, h); ctx.clip()
  const n = C.length, bh = h / n
  // diagonal bands
  for (let i = -2; i < n + 3; i++) {
    ctx.fillStyle = C[(i + n * 4) % n]
    ctx.beginPath(); ctx.moveTo(x0, y0 + i * bh); ctx.lineTo(x0 + w, y0 + (i - 1.2) * bh); ctx.lineTo(x0 + w, y0 + (i - 0.2) * bh); ctx.lineTo(x0, y0 + (i + 1) * bh); ctx.closePath(); ctx.fill()
  }
  // a big sun
  const sx = x0 + w * (0.3 + 0.4 * ((seed * 0.37) % 1)), sy = y0 + h * 0.36, R = Math.min(w, h) * 0.22
  ctx.fillStyle = C[4]; ctx.beginPath(); ctx.arc(sx, sy, R, 0, TAU); ctx.fill()
  ctx.fillStyle = C[0]; for (let k = 0; k < 4; k++) ctx.fillRect(sx - R, sy + R * (0.15 + k * 0.22), R * 2, R * 0.08)
  // zigzag along the bottom
  ctx.fillStyle = C[1]
  for (let i = 0; i < w; i += 28) { ctx.beginPath(); ctx.moveTo(x0 + i, y0 + h); ctx.lineTo(x0 + i + 14, y0 + h - 36); ctx.lineTo(x0 + i + 28, y0 + h); ctx.fill() }
  ctx.restore()
}

/** a generic EaDo row: brick warehouse lofts with big grid windows, a water tower, murals on the walls; ground at y */
const LOFTS = [{ x: -20, w: 260, h: 380 }, { x: 230, w: 220, h: 300 }, { x: 440, w: 280, h: 430, tank: true }, { x: 710, w: 200, h: 330 }, { x: 900, w: 200, h: 400 }]
export function lofts(ctx, t, { y = 1410, a = 1, lit = 0.42, murals = true } = {}) {
  if (a <= 0) return
  ctx.save(); ctx.globalAlpha *= a
  LOFTS.forEach((b, bi) => {
    const T0 = y - b.h
    ctx.fillStyle = '#3a1f30'; ctx.fillRect(b.x, T0, b.w, b.h)
    ctx.fillStyle = '#4a2a3c'; for (let j = T0 + 8; j < y; j += 22) for (let i = b.x + ((j / 22) % 2 ? 0 : 20); i < b.x + b.w; i += 40) ctx.fillRect(i, j, 36, 3)
    ctx.fillStyle = '#24121e'; ctx.fillRect(b.x, T0, b.w, 10)
    // big factory windows (grids)
    for (let j = 0; T0 + 40 + j * 90 < y - 60; j++) for (let i = 0; b.x + 24 + i * 70 < b.x + b.w - 50; i++) {
      const hh = Math.sin(bi * 51.7 + i * 12.9 + j * 78.2) * 4375.5, r = hh - Math.floor(hh)
      const wx = b.x + 24 + i * 70, wy = T0 + 40 + j * 90
      ctx.fillStyle = '#1b1236'; ctx.fillRect(wx - 3, wy - 3, 50, 62)
      ctx.fillStyle = r < lit ? (r < 0.1 ? '#fff3d6' : '#ffd98a') : '#2a1d4e'; ctx.fillRect(wx, wy, 44, 56)
      ctx.fillStyle = '#1b1236'; ctx.fillRect(wx + 21, wy, 3, 56); ctx.fillRect(wx, wy + 27, 44, 3)
    }
    if (b.tank) {   // a rooftop water tower
      const cx = b.x + b.w * 0.7, top = T0 - 120
      ctx.fillStyle = '#1b1236'; ctx.fillRect(cx - 40, top + 70, 8, 50); ctx.fillRect(cx + 32, top + 70, 8, 50)
      ctx.fillStyle = '#6b3a2e'; ctx.fillRect(cx - 44, top + 10, 88, 64)
      ctx.fillStyle = '#8a4c3a'; for (let k = 0; k < 4; k++) ctx.fillRect(cx - 44 + k * 24, top + 10, 4, 64)
      ctx.fillStyle = '#1b1236'; ctx.beginPath(); ctx.moveTo(cx - 52, top + 12); ctx.lineTo(cx, top - 24); ctx.lineTo(cx + 52, top + 12); ctx.fill()
    }
  })
  if (murals) { mural(ctx, 250, y - 250, 180, 200, 1, 0.9); mural(ctx, 920, y - 280, 160, 230, 2, 0.9) }
  ctx.fillStyle = '#120c2c'; ctx.fillRect(0, y, 1080, 260)
  ctx.fillStyle = '#2b2160'; ctx.fillRect(0, y, 1080, 12)
  ctx.restore()
}

/** generic stadium light towers far behind the lofts: a pole, a grid of lamps, soft beams up into the sky */
export function lightTowers(ctx, t, { y = 1100, a = 1, swing = 0, aim = null } = {}) {
  if (a <= 0) return
  ctx.save(); ctx.globalAlpha *= a
  for (const [px, h, s] of [[640, 520, 1], [960, 600, -1]]) {
    const top = y - h
    ctx.fillStyle = '#20163f'; ctx.fillRect(px - 6, top, 12, h)
    for (let k = 0; k < h; k += 30) ctx.fillRect(px - 16, top + k, 32, 3)
    // beam
    const ang = aim ? Math.atan2(aim.y - top, aim.x - px) : -Math.PI / 2 + s * (0.35 + 0.08 * Math.sin(t * 0.6 + px)) + swing * s
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.translate(px, top); ctx.rotate(ang)
    const len = aim ? Math.hypot(aim.x - px, aim.y - top) + 120 : 1100
    const g = ctx.createLinearGradient(0, 0, len, 0)
    g.addColorStop(0, 'rgba(255,246,214,0.32)'); g.addColorStop(1, 'rgba(255,246,214,0)')
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(0, -24); ctx.lineTo(len, -len * 0.16); ctx.lineTo(len, len * 0.16); ctx.lineTo(0, 24); ctx.fill()
    ctx.restore()
    // lamp head
    ctx.fillStyle = '#1b1236'; ctx.fillRect(px - 50, top - 46, 100, 56)
    for (let j = 0; j < 3; j++) for (let i = 0; i < 5; i++) { ctx.fillStyle = (i + j + Math.floor(t * 2)) % 7 ? '#fff6d6' : '#ffe7a8'; ctx.fillRect(px - 44 + i * 18, top - 40 + j * 16, 14, 12) }
    ctx.save(); ctx.globalCompositeOperation = 'lighter'
    const gl = ctx.createRadialGradient(px, top - 18, 0, px, top - 18, 160); gl.addColorStop(0, 'rgba(255,246,214,0.4)'); gl.addColorStop(1, 'rgba(255,246,214,0)')
    ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(px, top - 18, 160, 0, TAU); ctx.fill(); ctx.restore()
  }
  ctx.restore()
}

/** a little pixel beret sitting on the star's top tip (F = starFrame of the star) */
export function beret(ctx, F, a = 1, tilt = -0.25, lift = 0) {
  if (a <= 0) return
  const [tx, ty] = cellToWorld(F, 18, 2.6), c = F.cell * F.sx
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(tx, ty - lift); ctx.rotate(tilt)
  ctx.fillStyle = '#1b1236'; ctx.beginPath(); ctx.ellipse(0, -2 * c, 8.5 * c, 3.6 * c, 0, 0, TAU); ctx.fill()
  ctx.fillStyle = '#d6334f'; ctx.beginPath(); ctx.ellipse(0, -2.3 * c, 7.6 * c, 2.8 * c, 0, 0, TAU); ctx.fill()
  ctx.fillStyle = '#ff6b7f'; ctx.fillRect(-5 * c, -4 * c, 4 * c, c)
  ctx.fillStyle = '#1b1236'; ctx.fillRect(-0.6 * c, -6.4 * c, 1.4 * c, 1.8 * c)
  ctx.restore()
}

/** a sketchbook: closed (open = 0) → open (1) showing a wobbly doodle of two stars and a redrawn heart */
export function sketchbook(ctx, x, y, s, rot, open, t, a = 1) {
  if (a <= 0 || s <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a
  const w = 120, h = 150
  if (open < 0.5) {
    const k = 1 - open * 2
    ctx.scale(Math.max(0.05, k), 1)
    ctx.fillStyle = '#1b1236'; ctx.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    ctx.fillStyle = '#2bb3a3'; ctx.fillRect(-w / 2, -h / 2, w, h)
    ctx.fillStyle = BONE; for (let j = 0; j < 9; j++) ctx.fillRect(-w / 2 - 4, -h / 2 + 8 + j * 16, 10, 6)
    ctx.fillStyle = '#ffd36b'; ctx.fillRect(-26, -20, 52, 30)
    ctx.fillStyle = '#1b1236'; ctx.font = `700 15px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('WIP', 0, -4)
  } else {
    const k = (open - 0.5) * 2
    ctx.scale(Math.max(0.05, k), 1)
    const W2 = w * 2
    ctx.fillStyle = '#1b1236'; ctx.fillRect(-W2 / 2 - 6, -h / 2 - 6, W2 + 12, h + 12)
    ctx.fillStyle = '#f6efe2'; ctx.fillRect(-W2 / 2, -h / 2, W2, h)
    ctx.fillStyle = '#d8ccb8'; ctx.fillRect(-2, -h / 2, 4, h)
    // two wobbly pencil stars, holding hands
    ctx.strokeStyle = '#3b2a5e'; ctx.lineWidth = 4; ctx.lineJoin = 'round'
    const starPath = (cx, cy, r, wob) => { ctx.beginPath(); for (let i = 0; i < 10; i++) { const an = -Math.PI / 2 + i * Math.PI / 5, rr = (i % 2 ? r * 0.45 : r) * (1 + 0.08 * Math.sin(i * 3.1 + wob)); ctx.lineTo(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr) } ctx.closePath(); ctx.stroke() }
    starPath(-60, 18, 40, 1); starPath(60, 18, 40, 4)
    ctx.fillStyle = '#3b2a5e'; for (const ex of [-72, -50, 48, 70]) ctx.fillRect(ex, 10, 6, 8)
    ctx.beginPath(); ctx.moveTo(-26, 34); ctx.quadraticCurveTo(0, 48, 26, 34); ctx.stroke()
    // a scribbled-out heart + the redrawn one
    ctx.strokeStyle = '#9a8db0'; ctx.lineWidth = 3
    for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-96 + i * 6, -50); ctx.lineTo(-70 + i * 6, -30); ctx.stroke() }
    ctx.fillStyle = '#ff4f86'
    const HB = ['.H.H.', 'HHHHH', 'HHHHH', '.HHH.', '..H..']
    HB.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'H') ctx.fillRect(-15 + i * 6, -58 + j * 6, 6, 6) }))
  }
  ctx.restore()
}
