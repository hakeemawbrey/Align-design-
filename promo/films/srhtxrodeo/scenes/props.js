// srhtxrodeo props — drawings for this film only. Pure f(args); nothing touches `document` at load.
//   starFrame / inSprite / tearsCells / sweatCells / drawBits   star-seated pixel helpers (same maths as startalk.js)
//   drawHat(x, col, s, a)    the original htxrodeo's cowboy hat (crown base at 0,0, ~200 px wide at s = 1)
//   tagChip(...)             a little pixel name-tag chip ("RENTED BOOTS")
//   drawLasso(...)           a gold rope: a spinning loop plus the line back to the thrower
//   ink / sparkle / heart    line-art helpers
import { clamp, lerp, rng, hexToRgb } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

const INK = '#1b1236'
export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', FIRE = '#f0603a', RED = '#ff4d3a', GREEN = '#7be08a', CYAN = '#8fd8f6', TAN = '#d99a52', VIOLET = '#c9a6ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
const TAU = Math.PI * 2
export const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
export const mixHex = (a, b, k) => { const A = hexToRgb(a), B = hexToRgb(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], clamp(k)))).join(',')})` }
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


const glowStroke = (x, color, w, blur = 16) => { x.strokeStyle = color; x.lineWidth = w; x.shadowColor = rgba(color === BONE ? GOLD : color, 0.7); x.shadowBlur = blur; x.lineCap = 'round'; x.lineJoin = 'round' }
// ── a cowboy hat (from htxrodeo), centred on the crown's base (0,0), ~200 px wide at s = 1
export function drawHat(x, col, s = 1, a = 1) {
  if (a <= 0 || s <= 0) return
  x.save(); x.scale(s, s); x.globalAlpha *= a
  const band = mixHex(col, '#140f2a', 0.55)
  x.beginPath()
  x.moveTo(-50, 2); x.bezierCurveTo(-58, -40, -52, -78, -36, -86); x.quadraticCurveTo(-16, -74, 0, -64)
  x.quadraticCurveTo(16, -74, 36, -86); x.bezierCurveTo(52, -78, 58, -40, 50, 2); x.closePath()
  x.fillStyle = col; x.fill(); glowStroke(x, BONE, 6, 12); x.stroke(); x.shadowBlur = 0
  x.save(); x.clip(); x.fillStyle = band; x.fillRect(-60, -26, 120, 20); x.restore()
  x.beginPath()
  x.moveTo(-104, -26); x.quadraticCurveTo(-92, 6, -40, 10); x.quadraticCurveTo(0, 16, 40, 10); x.quadraticCurveTo(92, 6, 104, -26)
  x.quadraticCurveTo(84, -4, 40, -4); x.quadraticCurveTo(0, 2, -40, -4); x.quadraticCurveTo(-84, -4, -104, -26); x.closePath()
  x.fillStyle = mixHex(col, '#ffffff', 0.12); x.fill(); glowStroke(x, BONE, 6, 12); x.stroke()
  x.restore()
}

// ── a pixel name-tag chip, centred
export function tagChip(x, cx, cy, txt, k, col = GOLD, size = 28) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const w = x.measureText(txt).width + 32, h = size + 24, P = 5
  stepRect(x, -w / 2 - P, -h / 2 - P, w + 2 * P, h + 2 * P, P, col)
  stepRect(x, -w / 2, -h / 2, w, h, P, 'rgba(16,9,38,0.95)')
  x.fillStyle = col; x.fillText(txt, 0, 2)
  x.restore()
}

// ── the lasso: a loop (ellipse rx×ry at cx,cy, spinning by `spin`) and a rope back to (hx, hy)
export function drawLasso(x, hx, hy, cx, cy, rx, ry, spin, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  const ROPE = '#f2c75c', DARK = '#a8792c'
  // rope: from the hand to the loop's knot (the loop's nearest point), sagging a little
  const ka = Math.atan2(hy - cy, hx - cx)
  const kx = cx + Math.cos(ka) * rx, ky = cy + Math.sin(ka) * ry
  const mx = (hx + kx) / 2, my = (hy + ky) / 2 + Math.min(120, Math.hypot(hx - kx, hy - ky) * 0.15)
  x.lineCap = 'round'
  x.shadowColor = rgba(GOLD, 0.7); x.shadowBlur = 16
  x.strokeStyle = ROPE; x.lineWidth = 8
  x.beginPath(); x.moveTo(hx, hy); x.quadraticCurveTo(mx, my, kx, ky); x.stroke()
  // the loop, with a twisted-rope dash that runs round as it spins
  x.beginPath(); x.ellipse(cx, cy, rx, ry, 0, 0, TAU); x.lineWidth = 9; x.stroke()
  x.shadowBlur = 0
  x.setLineDash([10, 14]); x.lineDashOffset = -spin * 60; x.strokeStyle = DARK; x.lineWidth = 4
  x.beginPath(); x.ellipse(cx, cy, rx, ry, 0, 0, TAU); x.stroke(); x.setLineDash([])
  // the honda knot
  x.fillStyle = BONE; x.fillRect(kx - 7, ky - 7, 14, 14)
  x.restore()
}
