// srhtxproblem props — pixel drawings for this film only (STARTALK2.md: props live in your own folder). Pure f(args);
// nothing touches `document` at load.
//
//   starFrame / inSprite / headsetCells / headsetWorld / tearsCells   the stlive5th helpers (same maths as startalk.js),
//                                    so the headsets and tears stay seated on a star through its hops and squash.
//   drawBits(x, rows, cols, cx, cy, cell, opts)   a bitmap of cells with a 1-cell ink outline.
//   drawConsole(x, t, opts)          the pixel Mission Control console: beacon, CRT monitor (screen drawn by the film
//                                    through opts.screen(sx, sy, sw, sh)), desk with blinking buttons + the ABORT button.
//   drawFaceCard(x, cx, cy, w, h, hue, rot, a)   a generic faceless profile card (photo blob + bio bars).
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
const HEADSET = new Map()
function headsetList(accent) {
  const out = [], seen = new Set()
  const put = (i, j, c) => { const k = i + ',' + j; if (seen.has(k)) return; seen.add(k); out.push([i, j, c]) }
  for (let a = 0; a <= 180; a += 2) {
    const r = a * Math.PI / 180, i = Math.round(17.5 - Math.cos(r) * 6.2), j = Math.round(11 - Math.sin(r) * 10.6)
    put(i, j, a > 60 && a < 120 ? '#9aa0c8' : '#5d6288')
  }
  for (const [x0, d] of [[9, 1], [23, -1]]) {
    for (let j = 8; j <= 14; j++) for (let i = 0; i < 4; i++) {
      if ((j === 8 || j === 14) && (i === 0 || i === 3)) continue
      const c = (i === (d > 0 ? 3 : 0)) ? accent : (j === 9 && i === (d > 0 ? 1 : 2)) ? '#6e7399' : '#2c2f4c'
      put(x0 + i, j, c)
    }
  }
  // boom mic: from the left cup down toward the "mouth"
  for (const [i, j] of [[10, 15], [10, 16], [11, 17], [12, 18], [13, 18]]) put(i, j, '#5d6288')
  put(14, 18, accent); put(14, 17, accent); put(15, 18, accent); put(15, 17, accent)
  return out
}
export function headsetCells(ctx, accent) {
  if (!HEADSET.has(accent)) HEADSET.set(accent, headsetList(accent))
  paintCells(ctx, HEADSET.get(accent))
}
export function headsetWorld(ctx, x, y, rot, cell, accent, alpha = 1) {
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(cell, cell); ctx.translate(-18, -11)
  headsetCells(ctx, accent); ctx.restore()
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
const mix = (a, b, k) => {
  const A = [1, 3, 5].map(i => parseInt(a.slice(i, i + 2), 16)), B = [1, 3, 5].map(i => parseInt(b.slice(i, i + 2), 16))
  return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], clamp(k)))).join(',')})`
}
const rgba = (hex, a) => `rgba(${[1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)).join(',')},${a})`

// ── the console. geo: monitor (MX, MY, MW, MH), desk below. opts.g 0 → 1 = red alarm → green all-clear.
export const CON = { MX: 190, MY: 640, MW: 700, MH: 380, DY: 1040, DH: 110 }
export function drawConsole(x, t, { k = 1, g = 0, screen = null, press = 0, abortK = 1 } = {}) {
  if (k <= 0) return
  const P = 8
  const { MX, MY, MW, MH, DY, DH } = CON
  const alarm = mix(RED, GREEN, g)
  const flash = g < 0.5 ? (Math.sin(t * Math.PI * 2 * 2.2) > -0.1 ? 1 : 0.2) : 1
  x.save()
  x.translate(540, MY + MH); x.scale(k, k); x.translate(-540, -(MY + MH))
  x.globalAlpha *= clamp(k * 2)
  // beacon light (additive, two rotating beams + halo)
  const bx = 540, by = MY - 4
  x.save(); x.globalCompositeOperation = 'lighter'
  const rot = t * 5.2, col = g < 0.5 ? RED : GREEN
  for (const side of [-1, 1]) {
    const len = 440 * Math.max(0, Math.cos(rot + (side > 0 ? 0 : Math.PI)))
    if (len < 10) continue
    const gr = x.createLinearGradient(bx, by, bx + side * len, by)
    gr.addColorStop(0, rgba(col, 0.5 * flash)); gr.addColorStop(1, rgba(col, 0))
    x.fillStyle = gr; x.beginPath(); x.moveTo(bx, by - 30); x.lineTo(bx + side * len, by - 110); x.lineTo(bx + side * len, by + 50); x.lineTo(bx, by - 6); x.closePath(); x.fill()
  }
  const hg = x.createRadialGradient(bx, by - 36, 8, bx, by - 36, 170)
  hg.addColorStop(0, rgba(col, 0.55 * flash)); hg.addColorStop(1, rgba(col, 0))
  x.fillStyle = hg; x.beginPath(); x.arc(bx, by - 36, 170, 0, Math.PI * 2); x.fill()
  x.restore()
  // beacon dome (pixel)
  const DOME = ['...dddd...', '.ddwdddd..', 'ddwdddddd.', 'dddddddddd', 'dddddddddd', 'bbbbbbbbbb', 'BBBBBBBBBB']
  drawBits(x, DOME, { d: g < 0.5 ? (flash > 0.5 ? RED : '#8a2228') : GREEN, w: '#fff3e0', b: '#5d6288', B: '#2c2f4c' }, bx, by - 22, P)
  // monitor body
  stepRect(x, MX - P, MY - P, MW + 2 * P, MH + 2 * P, P, INK)
  stepRect(x, MX, MY, MW, MH, P, '#d9cfbd')
  stepRect(x, MX + P, MY + P, MW - 2 * P, MH - 2 * P, P, '#b9ae9c')
  x.fillStyle = '#fff6e4'; x.fillRect(MX + 3 * P, MY + P, MW - 6 * P, P)
  // screen
  const sx = MX + 4 * P, sy = MY + 4 * P, sw = MW - 8 * P, sh = MH - 10 * P
  stepRect(x, sx - P, sy - P, sw + 2 * P, sh + 2 * P, P, INK)
  stepRect(x, sx, sy, sw, sh, P, mix('#1c0a12', '#07160f', g))
  x.save(); x.beginPath(); x.rect(sx, sy, sw, sh); x.clip()
  // phosphor grid
  x.fillStyle = rgba(g < 0.5 ? RED : GREEN, 0.12)
  for (let i = 1; i < 8; i++) x.fillRect(Math.round(sx + i * sw / 8), sy, 2, sh)
  for (let i = 1; i < 5; i++) x.fillRect(sx, Math.round(sy + i * sh / 5), sw, 2)
  if (screen) screen(sx, sy, sw, sh)
  // scanlines
  x.globalAlpha = 0.14; x.fillStyle = '#000'
  for (let yy = sy; yy < sy + sh; yy += 6) x.fillRect(sx, yy, sw, 2)
  x.restore()
  // little power LED + label strip under the screen
  x.fillStyle = INK; x.fillRect(MX + MW - 9 * P, MY + MH - 5 * P, 3 * P, 2 * P)
  x.fillStyle = alarm; x.fillRect(MX + MW - 9 * P + 2, MY + MH - 5 * P + 2, 3 * P - 4, 2 * P - 4)
  x.fillStyle = '#8c826f'; for (let i = 0; i < 6; i++) x.fillRect(MX + 6 * P + i * 4 * P, MY + MH - 4 * P, 2 * P, P)
  // neck
  x.fillStyle = INK; x.fillRect(500 - P, MY + MH, 80 + 2 * P, DY - MY - MH)
  x.fillStyle = '#8c826f'; x.fillRect(500, MY + MH, 80, DY - MY - MH)
  // desk (trapezoid of stepped rows)
  const rows = Math.round(DH / P)
  for (let r = 0; r < rows; r++) {
    const inset = Math.round((rows - r) * 0.55) * P
    x.fillStyle = INK; x.fillRect(110 + inset - P, DY + r * P, 860 - 2 * inset + 2 * P, P + 1)
  }
  for (let r = 1; r < rows - 1; r++) {
    const inset = Math.round((rows - r) * 0.55) * P
    x.fillStyle = r < 2 ? '#7d84b8' : r > rows - 4 ? '#2c2f4c' : '#4a4f7c'
    x.fillRect(110 + inset, DY + r * P, 860 - 2 * inset, P + 1)
  }
  // button grid (blinking, pixel squares) on the left half
  const BC = [RED, GOLD, CYAN, PINK, GREEN, '#b07cff']
  for (let j = 0; j < 2; j++) for (let i = 0; i < 9; i++) {
    const on = Math.sin(t * (3 + (i * 7 + j * 3) % 5) + i * 1.7 + j) > 0.1
    const c = g > 0.5 ? GREEN : BC[(i + j * 2) % BC.length]
    const X = 205 + i * 4 * P, Y = DY + 4 * P + j * 4 * P
    x.fillStyle = INK; x.fillRect(X - 2, Y - 2, 2 * P + 4, 2 * P + 4)
    x.fillStyle = on ? c : mix(c.startsWith('#') && c.length === 7 ? c : '#888888', '#1b1236', 0.65); x.fillRect(X, Y, 2 * P, 2 * P)
  }
  // dials on the right half
  for (const [dx, sp] of [[640, 1.3], [880, -0.9]]) {
    const R = 4 * P, cy = DY + 7 * P
    x.fillStyle = INK; x.beginPath(); x.arc(dx, cy, R + 4, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#d9cfbd'; x.beginPath(); x.arc(dx, cy, R, 0, Math.PI * 2); x.fill()
    const a = g > 0.5 ? -Math.PI / 2 : -Math.PI / 2 + 1.2 * Math.sin(t * 9 * sp) + (g < 0.5 ? 1.1 : 0)
    x.strokeStyle = g > 0.5 ? '#1c8a52' : RED; x.lineWidth = 6; x.lineCap = 'square'
    x.beginPath(); x.moveTo(dx, cy); x.lineTo(dx + Math.cos(a) * (R - 6), cy + Math.sin(a) * (R - 6)); x.stroke()
  }
  // the big ABORT button (between the dials): a red pixel mushroom on a yellow-black hazard base
  if (abortK > 0) {
    const ax = 760, ay = DY + 2 * P, pr = clamp(press)
    x.save(); x.globalAlpha *= abortK
    const BASE = ['YKYKYKYKYKYK', 'KYKYKYKYKYKY']
    drawBits(x, BASE, { Y: GOLD, K: '#2a2140' }, ax, ay + 3 * P, P)
    const CAP = ['..rrrrrr..', '.rwwrrrrr.', 'rrrrrrrrrr', 'RRRRRRRRRR']
    drawBits(x, CAP, { r: '#ff5a5a', w: '#ffd0c8', R: '#a8202a' }, ax, ay - P + pr * 2 * P, P)
    x.restore()
  }
  x.restore()
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
