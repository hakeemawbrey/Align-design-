// srhtxtaste props — drawings for this film only. Pure f(args); nothing touches `document` at load.
//   starFrame / inSprite / tearsCells / sweatCells / drawBits   star-seated pixel helpers (same maths as startalk.js)
//   bibCells(ctx) / forkWorld(...)   Taurus the food critic's napkin bib and fork
//   drawFaceCard(...)                a generic faceless profile card (the swipe feed on the phone)
//   taco / kolache / crawfish / plate / heart / sparkle / ink   the line-art food of the original htxtaste
import { clamp, lerp, rng, hexToRgb } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

const INK = '#1b1236'
export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', FIRE = '#f0603a', RED = '#ff4d3a', GREEN = '#7be08a', SILVER = '#e3ecff', CRUST = '#e9a94a', BERRY = '#ff4f7b', VIOLET = '#c9a6ff', CYAN = '#8fd8f6'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
const TAU = Math.PI * 2
export const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
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

/** bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

// stepped-corner pixel rectangle (P = pixel size), filled
function stepRect(x, X, Y, w, h, P, col) {
  x.fillStyle = col
  x.fillRect(X + 2 * P, Y, w - 4 * P, h)
  x.fillRect(X, Y + 2 * P, w, h - 4 * P)
  x.fillRect(X + P, Y + P, w - 2 * P, h - 2 * P)
}

// ── a generic faceless profile card (the swipe feed): photo blob, head + shoulders silhouette, bio bars
export function drawFaceCard(x, cx, cy, w, h, hue, rot = 0, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.rotate(rot)
  const X = -w / 2, Y = -h / 2, P = Math.max(4, Math.round(w / 40))
  stepRect(x, X - P, Y - P, w + 2 * P, h + 2 * P, P, INK)
  stepRect(x, X, Y, w, h, P, '#f3ece0')
  const ph = h * 0.66
  x.fillStyle = hue; x.fillRect(X + P, Y + P, w - 2 * P, ph)
  // silhouette (blocky)
  x.fillStyle = 'rgba(27,18,54,0.45)'
  const hx = 0, hy = Y + P + ph * 0.42, hr = w * 0.16
  x.fillRect(hx - hr, hy - hr, 2 * hr, 2 * hr)
  x.fillRect(hx - w * 0.3, Y + P + ph * 0.72, w * 0.6, ph * 0.28)
  // bio bars
  x.fillStyle = '#c9bfae'
  x.fillRect(X + 2 * P, Y + ph + 3 * P, w * 0.55, P * 1.4)
  x.fillRect(X + 2 * P, Y + ph + 6 * P, w * 0.75, P)
  x.fillRect(X + 2 * P, Y + ph + 8.5 * P, w * 0.5, P)
  // heart / x stickers
  x.restore()
}

/** fill the current path at fa, then stroke it thick with a glow */
export function ink(x, col, { w = 8, fa = 0.3, glow = 18, fill = col } = {}) {
  if (fa > 0) { x.fillStyle = rgba(fill, fa); x.fill() }
  x.lineJoin = 'round'; x.lineCap = 'round'
  x.shadowColor = col; x.shadowBlur = glow
  x.strokeStyle = col; x.lineWidth = w; x.stroke()
  x.shadowBlur = 0
}

// ───────────────────────── pixel-star sparkle burst
const SPARK = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
export function sparkle(x, px, py, t, t0, { n = 10, R = 150, seed = 1, cols = SPARK, size = 28, dur = 0.75 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const r = rng(seed)
  x.save()
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + r() * 0.5, d = R * (0.6 + 0.5 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = 1 - Math.pow(1 - Math.min(1, tt / (dur * 0.8)), 3)
    x.globalAlpha = Math.max(0, 1 - Math.max(0, tt - dur * 0.3) / (dur * 0.7))
    drawPixelStar(x, px + Math.cos(a) * d * p, py + Math.sin(a) * d * p, size * (1 - 0.35 * p), kind, col)
  }
  x.restore()
}

// ───────────────────────── taco (side view, ~300 wide, centred on the shell)
export function taco(x, t) {
  // filling: meat, lettuce bumps, tomato, cheese
  x.save()
  x.beginPath(); x.moveTo(-122, 0)
  for (let i = 0; i <= 8; i++) { const px = -122 + i * 30.5; x.quadraticCurveTo(px - 15, -58 - (i % 2) * 18, px, -8) }
  x.lineTo(122, 0); x.closePath()
  ink(x, GREEN, { w: 8, fa: 0.55, glow: 14 })
  x.beginPath(); x.moveTo(-110, 4); x.quadraticCurveTo(-60, -34, 0, -16); x.quadraticCurveTo(60, -36, 110, 4); x.closePath()
  ink(x, '#b8613a', { w: 6, fa: 0.75, glow: 6, fill: '#7a3b22' })
  for (const [cx, cy, r] of [[-58, -40, 15], [12, -50, 17], [72, -38, 14]]) { x.beginPath(); x.arc(cx, cy + Math.sin(t * 3 + cx) * 2, r, 0, TAU); ink(x, RED, { w: 6, fa: 0.8, glow: 12 }) }
  x.strokeStyle = '#ffe07a'; x.lineWidth = 7; x.lineCap = 'round'
  for (const [cx, cy, a] of [[-90, -22, -0.6], [-22, -30, 0.5], [40, -24, -0.4], [95, -20, 0.7]]) { x.beginPath(); x.moveTo(cx - 12 * Math.cos(a), cy - 12 * Math.sin(a)); x.lineTo(cx + 12 * Math.cos(a), cy + 12 * Math.sin(a)); x.stroke() }
  // the shell (front half-moon band)
  x.beginPath(); x.ellipse(0, -6, 158, 112, 0, Math.PI, 0, true); x.ellipse(0, -6, 128, 84, 0, 0, Math.PI, false); x.closePath()
  ink(x, GOLD, { w: 9, fa: 0.5, glow: 22, fill: '#f2b84a' })
  // toasty dots on the shell
  x.fillStyle = rgba('#a5652a', 0.7)
  for (const ax of [0.75, 0.6, 0.45, 0.3, 0.85, 0.18]) { const a = Math.PI * ax; x.beginPath(); x.arc(Math.cos(a) * 143, -6 + Math.sin(a) * 98, 5, 0, TAU); x.fill() }
  x.restore()
}

// ───────────────────────── kolache (fruit, 3/4 view, ~250 wide) with steam
export function kolache(x, t, steam = 1) {
  x.save()
  x.save(); x.scale(1, 0.8)
  // thickness
  x.beginPath(); x.ellipse(0, 26, 124, 118, 0, 0, TAU); x.fillStyle = '#8a5523'; x.fill()
  x.beginPath(); x.ellipse(0, 26, 124, 118, 0, 0, Math.PI); ink(x, CRUST, { w: 8, fa: 0, glow: 10 })
  // top
  x.beginPath(); x.ellipse(0, 0, 124, 118, 0, 0, TAU); ink(x, CRUST, { w: 9, fa: 0.85, glow: 22, fill: '#d99542' })
  // puffy dough ring highlight
  x.beginPath(); x.ellipse(-8, -10, 96, 88, 0, Math.PI * 1.05, Math.PI * 1.55); x.strokeStyle = rgba('#ffe2a8', 0.65); x.lineWidth = 9; x.stroke()
  // fruit well
  x.beginPath(); x.ellipse(0, 4, 60, 56, 0, 0, TAU); ink(x, BERRY, { w: 8, fa: 0.85, glow: 20 })
  x.beginPath(); x.ellipse(-14, -10, 26, 14, -0.5, 0, TAU); x.fillStyle = rgba('#ffd0dc', 0.75); x.fill()
  // streusel crumbs
  const r = rng(5)
  x.fillStyle = '#fff1cf'
  for (let i = 0; i < 14; i++) { const a = r() * TAU, d = 74 + r() * 30; x.fillRect(Math.cos(a) * d - 4, Math.sin(a) * d - 4, 8, 8) }
  x.restore()
  // steam
  if (steam > 0) {
    x.save(); x.lineCap = 'round'
    for (let i = 0; i < 3; i++) {
      const ph = (t * 0.9 + i * 0.33) % 1, sx = (i - 1) * 46
      x.globalAlpha = steam * Math.sin(Math.PI * ph) * 0.85
      x.strokeStyle = BONE; x.lineWidth = 8; x.shadowColor = BONE; x.shadowBlur = 12
      x.beginPath()
      for (let k = 0; k <= 12; k++) { const yy = -110 - ph * 70 - k * 9, xx = sx + 14 * Math.sin(k * 0.6 + t * 4 + i); k ? x.lineTo(xx, yy) : x.moveTo(xx, yy) }
      x.stroke()
    }
    x.restore()
  }
  x.restore()
}

// ───────────────────────── crawfish (top view, head up, ~300 tall); snap 0..1 opens/closes the claws
function claw(x, side, snap) {
  x.save(); x.scale(side, 1)
  // arm
  x.beginPath(); x.moveTo(26, -64); x.quadraticCurveTo(70, -80, 72, -118); ink(x, RED, { w: 14, fa: 0, glow: 10 })
  x.translate(76, -126); x.rotate(-0.25)
  // big pincer (fixed jaw) + moving finger
  x.beginPath(); x.ellipse(0, -44, 30, 56, 0.15, 0, TAU); ink(x, RED, { w: 8, fa: 0.55, glow: 18 })
  x.save(); x.translate(-12, -4); x.rotate(-0.15 - 0.5 * snap)
  x.beginPath(); x.ellipse(-8, -46, 13, 46, -0.12, 0, TAU); ink(x, RED, { w: 7, fa: 0.55, glow: 12 })
  x.restore()
  x.fillStyle = '#ffd4c8'; for (const [px, py] of [[8, -70], [12, -42], [6, -16]]) { x.beginPath(); x.arc(px, py, 4, 0, TAU); x.fill() }
  x.restore()
}
export function crawfish(x, t, snap = 0) {
  x.save()
  // antennae
  x.lineCap = 'round'
  for (const s of [-1, 1]) {
    x.beginPath(); x.moveTo(s * 10, -100); x.bezierCurveTo(s * 30, -200, s * (120 + 10 * Math.sin(t * 3 + s)), -210, s * (150 + 14 * Math.sin(t * 2.6 + s)), -280)
    ink(x, '#ff8a6a', { w: 5, fa: 0, glow: 8 })
  }
  // legs
  for (const s of [-1, 1]) for (let i = 0; i < 4; i++) {
    const y0 = -40 + i * 20, w = Math.sin(t * 9 + i * 1.3) * 5
    x.beginPath(); x.moveTo(s * 34, y0); x.lineTo(s * 66, y0 + 10 + w); x.lineTo(s * 76, y0 + 30 + w); ink(x, RED, { w: 5, fa: 0, glow: 6 })
  }
  claw(x, -1, snap); claw(x, 1, snap)
  // tail: segments + fan
  for (let i = 4; i >= 0; i--) {
    const w = 72 - i * 8, y = 50 + i * 30
    x.beginPath(); x.roundRect(-w / 2, y - 18, w, 36, 14); ink(x, RED, { w: 7, fa: 0.55, glow: 12 })
  }
  for (const [a, l] of [[-0.55, 56], [0, 62], [0.55, 56]]) {
    x.save(); x.translate(0, 192); x.rotate(a)
    x.beginPath(); x.ellipse(0, 30, 18, l / 2, 0, 0, TAU); ink(x, RED, { w: 7, fa: 0.55, glow: 12 })
    x.restore()
  }
  // carapace
  x.beginPath(); x.ellipse(0, -16, 44, 74, 0, 0, TAU); ink(x, RED, { w: 9, fa: 0.62, glow: 22 })
  x.beginPath(); x.moveTo(0, -84); x.lineTo(0, 46); x.strokeStyle = rgba('#ffd4c8', 0.45); x.lineWidth = 4; x.stroke()
  x.beginPath(); x.moveTo(-18, -96); x.lineTo(0, -122); x.lineTo(18, -96); ink(x, RED, { w: 7, fa: 0.6, glow: 10 })
  x.fillStyle = '#1a1430'; for (const s of [-1, 1]) { x.beginPath(); x.arc(s * 20, -84, 7, 0, TAU); x.fill() }
  x.restore()
}

// ───────────────────────── the plate (top view). Its rim rings sit exactly where the zodiac wheel's rings will be.
export function plate(x, R, Rin, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 50; x.shadowOffsetY = 18
  x.beginPath(); x.arc(0, 0, R, 0, TAU); x.fillStyle = 'rgba(30,22,58,0.92)'; x.fill()
  x.shadowOffsetY = 0; x.shadowBlur = 0
  x.beginPath(); x.arc(0, 0, R, 0, TAU); x.arc(0, 0, Rin, 0, TAU, true); x.fillStyle = rgba(BONE, 0.14); x.fill('evenodd')
  x.beginPath(); x.arc(0, 0, R, 0, TAU); ink(x, BONE, { w: 7, fa: 0, glow: 22 })
  x.beginPath(); x.arc(0, 0, Rin, 0, TAU); ink(x, BONE, { w: 4, fa: 0, glow: 8 })
  // a shine on the rim
  x.beginPath(); x.arc(0, 0, (R + Rin) / 2, Math.PI * 1.1, Math.PI * 1.4); x.strokeStyle = rgba('#ffffff', 0.4); x.lineWidth = 10; x.lineCap = 'round'; x.stroke()
  x.restore()
}

// ───────────────────────── pictogram person (feet at 0,0; ~270 tall); no face
export function person(x, col, { a = 1, lean = 0 } = {}) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.rotate(lean)
  x.beginPath(); x.moveTo(-50, 0); x.lineTo(-44, -150); x.quadraticCurveTo(-44, -190, 0, -192); x.quadraticCurveTo(44, -190, 44, -150); x.lineTo(50, 0); x.closePath()
  ink(x, col, { w: 9, fa: 0.38, glow: 20 })
  x.beginPath(); x.arc(0, -238, 38, 0, TAU); ink(x, col, { w: 9, fa: 0.85, glow: 20 })
  x.restore()
}

/** a plump heart centred at 0,0 (~2s wide) */
export function heart(x, s, col, a = 1) {
  if (a <= 0 || s <= 0) return
  x.save(); x.globalAlpha *= a; x.scale(s / 60, s / 60)
  x.beginPath(); x.moveTo(0, 42)
  x.bezierCurveTo(-70, -6, -46, -62, 0, -26)
  x.bezierCurveTo(46, -62, 70, -6, 0, 42)
  x.closePath(); ink(x, col, { w: 8, fa: 0.6, glow: 26 })
  x.restore()
}


// ── Taurus the critic: a red-gingham napkin bib tucked under the eyes (cells, inside the sprite frame)
export function bibCells(ctx) {
  const rows = [[14, 22], [14, 22], [15, 21], [15, 21], [16, 20], [16, 20], [17, 19]]
  ctx.fillStyle = INK
  rows.forEach(([a, b], k) => ctx.fillRect(a - 0.5, 24 + k - 0.3, b - a + 2, 1.6))
  rows.forEach(([a, b], k) => { for (let i = a; i <= b; i++) { ctx.fillStyle = ((i + k) % 2) ? '#f6efe2' : '#e8473f'; ctx.fillRect(i, 24 + k, 1.02, 1.02) } })
  // the knot
  ctx.fillStyle = INK; ctx.fillRect(16.6, 22.4, 2.8, 2)
  ctx.fillStyle = '#f6efe2'; ctx.fillRect(17, 22.7, 2, 1.4)
}
// ── a pixel fork, held up on the star's left (cells); `raise` 0..1 lifts it for a toast
export function forkCells(ctx, raise = 0) {
  const dy = -6 * raise
  const C = [[2, 11], [4, 11], [6, 11], [2, 12], [4, 12], [6, 12], [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [3, 14], [4, 14], [5, 14],
    [4, 15], [4, 16], [4, 17], [4, 18], [4, 19], [4, 20], [4, 21]]
  ctx.fillStyle = INK
  for (const [i, j] of C) ctx.fillRect(i - 0.4, j + dy - 0.4, 1.8, 1.8)
  for (const [i, j] of C) { ctx.fillStyle = j >= 15 ? '#c9b48a' : '#e3ecff'; ctx.fillRect(i, j + dy, 1.02, 1.02) }
}

// ── the phone (pixel frame) with a screen callback: screen(sx, sy, sw, sh)
export function drawPhone(x, cx, cy, w, h, { a = 1, rot = 0, screen = null } = {}) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.rotate(rot)
  const P = 8, X = -w / 2, Y = -h / 2
  stepRect(x, X - P, Y - P, w + 2 * P, h + 2 * P, P, INK)
  stepRect(x, X, Y, w, h, P, '#3a2f66')
  stepRect(x, X + 2 * P, Y + 5 * P, w - 4 * P, h - 10 * P, P, '#120c2a')
  x.fillStyle = '#5b4f8c'; x.fillRect(-4 * P, Y + 2 * P, 8 * P, P)            // speaker
  x.fillStyle = '#5b4f8c'; x.fillRect(-3 * P, Y + h - 3.5 * P, 6 * P, 1.4 * P)  // home bar
  if (screen) { x.save(); x.beginPath(); x.rect(X + 2 * P, Y + 5 * P, w - 4 * P, h - 10 * P); x.clip(); screen(X + 2 * P, Y + 5 * P, w - 4 * P, h - 10 * P); x.restore() }
  x.restore()
}

// ── a score paddle chip ("10"), pixel panel with a stick
export function scoreChip(x, cx, cy, txt, k, col = GOLD) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const w = 132, h = 96, P = 6
  x.fillStyle = '#c9b48a'; x.fillRect(-6, h / 2 - 4, 12, 70)
  stepRect(x, -w / 2 - P, -h / 2 - P, w + 2 * P, h + 2 * P, P, INK)
  stepRect(x, -w / 2, -h / 2, w, h, P, '#fbf3e4')
  x.font = `700 64px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = col === GOLD ? '#2a1d52' : col
  x.fillText(txt, 0, 4)
  x.restore()
}
