// srhtxlatenight props — pixel drawings for this film only. Pure f(args); nothing touches `document` at load.
//   starFrame / inSprite / tearsCells / sweatCells   the stlive5th star-seated helpers (same maths as startalk.js).
//   taco / drawTruck / heart                         the film's props.
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
export const VIOLET = '#c9a6ff', AMBER = '#ffb36b', TEAL = '#7fe0c8', BLUE = '#8fd8f6'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const TAU = Math.PI * 2
export const rgba = (hex, a) => `rgba(${[1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)).join(',')},${clamp(a)})`

export function ink(x, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { x.fillStyle = rgba(fill, fa); x.fill() }
  x.lineJoin = 'round'; x.lineCap = 'round'
  x.shadowColor = col; x.shadowBlur = glow
  x.strokeStyle = col; x.lineWidth = w; x.stroke()
  x.shadowBlur = 0
}

/** a taco (shell down, fillings up) centred on (px, py) at scale s (≈ 130 px wide at 1), optional steam */
export function taco(x, px, py, s, { rot = 0, a = 1, steam = 0, t = 0 } = {}) {
  if (s <= 0 || a <= 0) return
  x.save(); x.translate(px, py); x.rotate(rot); x.scale(s, s); x.globalAlpha *= a
  const bumps = [[-48, 0, 18], [-24, -8, 20], [2, -10, 21], [28, -7, 19], [50, 0, 15]]
  for (const [bx, by, r] of bumps) { x.beginPath(); x.arc(bx, by, r, Math.PI, 0); x.closePath(); ink(x, '#7fe0a8', { w: 5, fa: 0.85, fill: '#2fc79a', glow: 8 }) }
  ;[[-30, -14, '#ff6b6b'], [12, -18, '#ff6b6b'], [38, -10, '#fff3e0'], [-8, -16, '#fff3e0']].forEach(([dx, dy, c]) => { x.beginPath(); x.arc(dx, dy, 7, 0, TAU); x.fillStyle = c; x.fill() })
  x.beginPath(); x.moveTo(-66, 0); x.arc(0, 0, 66, Math.PI, 0, true); x.closePath()
  x.fillStyle = '#e8a23a'; x.fill()
  ink(x, '#ffd27a', { w: 7, fa: 0, glow: 16 })
  x.fillStyle = 'rgba(140,70,20,0.55)'
  ;[[-30, 22], [6, 40], [30, 18], [-8, 16], [-40, 6], [22, 44]].forEach(([dx, dy]) => { x.beginPath(); x.arc(dx, dy, 4, 0, TAU); x.fill() })
  if (steam > 0) {
    x.strokeStyle = 'rgba(255,240,225,0.6)'; x.lineWidth = 6; x.lineCap = 'round'
    for (let k = 0; k < 3; k++) {
      const ph = ((t * 0.9 + k * 0.33) % 1)
      x.globalAlpha = a * steam * Math.sin(Math.PI * ph) * 0.9
      x.beginPath()
      for (let j = 0; j <= 10; j++) { const yy = -40 - j * 9 - ph * 60, xx = (k - 1) * 34 + 9 * Math.sin(j * 0.8 + t * 5 + k); j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) }
      x.stroke()
    }
  }
  x.restore()
}

/** a pixel heart centred on (px, py), cell size c */
export function heart(x, px, py, c, a = 1, col = PINK) {
  const B = ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...']
  x.save(); x.globalAlpha *= a
  for (let j = 0; j < B.length; j++) for (let i = 0; i < 7; i++) if (B[j][i] === 'X') {
    x.fillStyle = INK; x.fillRect(px + (i - 3.5) * c - 2, py + (j - 3) * c - 2, c + 4, c + 4)
  }
  for (let j = 0; j < B.length; j++) for (let i = 0; i < 7; i++) if (B[j][i] === 'X') {
    x.fillStyle = (i === 1 && j === 1) ? '#fff' : col; x.fillRect(px + (i - 3.5) * c, py + (j - 3) * c, c, c)
  }
  x.restore()
}

// the truck: body box, serving window, awning, wheels, string lights, neon roof sign (letters 0…4 lit per `lit`)
export const TRUCK = { x: 180, y: 860, w: 720, h: 400, win: { x: 400, y: 925, w: 330, h: 160 }, counter: 1100, ground: 1330 }
export function drawTruck(x, t, { dy = 0, k = 1, lit = [1, 1, 1, 1, 1], glowWin = 1 } = {}) {
  if (k <= 0) return
  const { x: X, y: Y, w: Wd, h: Hh, win } = TRUCK
  x.save(); x.translate(540, TRUCK.ground + dy); x.scale(k, k); x.translate(-540, -TRUCK.ground)
  // ground + pool of light
  x.save(); x.globalCompositeOperation = 'lighter'
  const pg = x.createRadialGradient(540, TRUCK.ground, 40, 540, TRUCK.ground, 620)
  pg.addColorStop(0, rgba(AMBER, 0.32 * glowWin)); pg.addColorStop(1, rgba(AMBER, 0))
  x.fillStyle = pg; x.fillRect(-100, TRUCK.ground - 620, 1280, 900); x.restore()
  x.fillStyle = '#0c0720'; x.fillRect(-100, TRUCK.ground, 1280, 700)
  x.fillStyle = rgba(VIOLET, 0.5); x.fillRect(-100, TRUCK.ground, 1280, 5)
  // body
  x.beginPath(); x.roundRect(X, Y, Wd, Hh, 34); x.fillStyle = '#1c1238'; x.fill(); ink(x, VIOLET, { w: 8, fa: 0.12, glow: 18 })
  // cab on the right
  x.beginPath(); x.moveTo(X + Wd, Y + 120); x.lineTo(X + Wd + 120, Y + 170); x.lineTo(X + Wd + 130, Y + Hh); x.lineTo(X + Wd, Y + Hh); x.closePath()
  x.fillStyle = '#1c1238'; x.fill(); ink(x, VIOLET, { w: 8, fa: 0.12, glow: 14 })
  x.beginPath(); x.moveTo(X + Wd + 14, Y + 142); x.lineTo(X + Wd + 104, Y + 182); x.lineTo(X + Wd + 108, Y + 240); x.lineTo(X + Wd + 14, Y + 240); x.closePath()
  x.fillStyle = rgba(BLUE, 0.18); x.fill(); ink(x, BLUE, { w: 4, fa: 0, glow: 8 })
  // window (lit)
  x.beginPath(); x.roundRect(win.x, win.y, win.w, win.h, 14)
  x.fillStyle = rgba(AMBER, 0.55 + 0.1 * Math.sin(t * 3)); x.fill(); ink(x, '#ffd27a', { w: 6, fa: 0, glow: 26 * glowWin })
  // awning stripes
  for (let i = 0; i < 8; i++) {
    const ax = win.x - 30 + i * ((win.w + 60) / 8)
    x.beginPath(); x.moveTo(ax, win.y - 34); x.lineTo(ax + (win.w + 60) / 8, win.y - 34); x.lineTo(ax + (win.w + 60) / 8, win.y - 4); x.quadraticCurveTo(ax + (win.w + 60) / 16, win.y + 14, ax, win.y - 4); x.closePath()
    x.fillStyle = i % 2 ? '#ff8fb1' : '#efe6d6'; x.fill()
  }
  // counter
  x.fillStyle = '#3a2a66'; x.fillRect(win.x - 40, TRUCK.counter - 12, win.w + 80, 22)
  x.fillStyle = rgba(BONE, 0.7); x.fillRect(win.x - 40, TRUCK.counter - 12, win.w + 80, 4)
  // wheels
  for (const wx of [X + 150, X + Wd - 40]) {
    x.beginPath(); x.arc(wx, Y + Hh + 8, 62, 0, TAU); x.fillStyle = '#0a0618'; x.fill(); ink(x, BONE, { w: 7, fa: 0, glow: 8 })
    x.beginPath(); x.arc(wx, Y + Hh + 8, 22, 0, TAU); x.fillStyle = '#3a2a66'; x.fill()
  }
  // string lights along the roof
  for (let i = 0; i <= 12; i++) {
    const lx = X + 20 + i * (Wd - 40) / 12, ly = Y + 12 + 16 * Math.sin(Math.PI * ((i % 4) / 4))
    const on = 0.6 + 0.4 * Math.sin(t * 4 + i * 1.3)
    x.fillStyle = rgba([AMBER, PINK, TEAL, GOLD][i % 4], on); x.fillRect(lx - 7, ly - 7, 14, 14)
  }
  // the neon roof sign
  const L = 'TACOS', size = 104
  x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'alphabetic'
  const sw = x.measureText(L).width, sx = 540 - sw / 2
  x.beginPath(); x.roundRect(540 - sw / 2 - 30, Y - 150, sw + 60, 140, 20); x.fillStyle = '#120a28'; x.fill(); ink(x, VIOLET, { w: 5, fa: 0, glow: 8 })
  let cx = sx
  for (let i = 0; i < L.length; i++) {
    const cw = x.measureText(L[i]).width, on = lit[i]
    x.textAlign = 'left'
    x.fillStyle = on > 0.5 ? '#ffe3ef' : 'rgba(80,50,90,0.85)'
    x.shadowColor = PINK; x.shadowBlur = on > 0.5 ? 28 : 0
    x.fillText(L[i], cx, Y - 40)
    x.shadowBlur = 0
    cx += cw
  }
  x.restore()
}
