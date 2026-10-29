// stspy props — small pixel drawings on canvas, shared inside this film (STARTALK2.md: "props are shared helpers inside
// your own film folder"). Pure functions of their arguments; nothing touches `document` at module load.
//
//   starFrame / inSprite        the exact transform drawStarChar uses (same maths as startalk.js), so overlays drawn in
//                               sprite CELLS (the 36-cell grid) stay seated through hops, bobs and squash
//   shadesCells / bowTieCells / gogglesCells / tearsCells / hankieCells / watchCells    face + body overlays (cells)
//   spr(ctx, rows, x, y, u, pal)   a char-map pixel sprite with an ink outline, centred on (x, y)
//   drawHeli / drawViolin / drawCello / drawMug / drawCouch / drawTable / drawWindow / drawLampshade / drawBlanket /
//   drawDesk / drawCart / drawBench / drawClipboard / drawSynthSun / drawGridFloor / drawRope    the sets and gadgets
//   makeTalkCard(doc, img, lines)  card-talk-6.png with our own question set in (call in build only)
import { clamp, lerp, rng } from '../../../src/lib.js'

const TAU = Math.PI * 2
export const INK = '#1b1236'
const BONE = '#efe6d6'
const G = 36, HALF = 18
const SC_Y = 19.6, SC_R = 17.6
const FOOT_ROW = SC_Y + SC_R * Math.cos(Math.PI / 5)

// ── colour helpers
export const hexRgb = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255] }
const toHex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('')
export const mixHex = (a, b, k) => { const A = hexRgb(a), B = hexRgb(b); return toHex(...A.map((v, i) => lerp(v, B[i], clamp(k)))) }
export const rgba = (hex, a) => { const [r, g, b] = hexRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }

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
/** run fn with the context mapped to sprite cells (0…36) of the star drawn with the same args */
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
/** sprite cell → canvas px (in the same space the star was drawn in) */
export const cellPt = (F, i, j) => ({ x: F.ox + (i - F.S / F.cell / 2) * F.cell * F.sx, y: F.oy + (j - F.S / F.cell / 2) * F.cell * F.sy - F.base * F.sy })

/** cells with a 1-cell outline */
function paintCells(ctx, cells, outline = INK) {
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  if (outline) {
    ctx.fillStyle = outline
    for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b))) ctx.fillRect(i + a, j + b, 1.02, 1.02)
  }
  for (const [i, j, c] of cells) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) }
}
const mapCells = (rows, x0, y0, pal) => { const out = []; rows.forEach((r, j) => [...r].forEach((ch, i) => { if (pal[ch]) out.push([x0 + i, y0 + j, pal[ch]]) })); return out }

// ═══════════════════════ face + body overlays (sprite cells) ═══════════════════════
/** spy shades over the eyes; glint 0…1 sweeps a white streak across the lenses */
export function shadesCells(ctx, glint = -1, dy = 0) {
  const L = '#120c24', E = '#2c2350'
  const cells = []
  for (let i = 8; i <= 27; i++) cells.push([i, 15 + dy, L])
  for (const x0 of [9, 19]) for (let j = 16; j <= 21; j++) for (let i = 0; i < 8; i++) {
    if (j === 21 && (i === 0 || i === 7)) continue
    cells.push([x0 + i, j + dy, j === 16 ? E : L])
  }
  paintCells(ctx, cells, BONE)
  ctx.fillStyle = '#ffffff'
  for (const x0 of [9, 19]) { ctx.fillRect(x0 + 1, 17 + dy, 2, 1); ctx.fillRect(x0 + 1, 18 + dy, 1, 1) }
  if (glint >= 0 && glint <= 1) {
    const gx = lerp(6, 30, glint)
    ctx.fillStyle = 'rgba(255,255,255,0.95)'
    for (let j = 15; j <= 21; j++) { const i = Math.round(gx - (j - 15) * 0.8); if ((i >= 9 && i <= 16) || (i >= 19 && i <= 26)) ctx.fillRect(i, j + dy, 1.02, 1.02) }
  }
}
/** a tuxedo bow tie under the cheeks */
export function bowTieCells(ctx) {
  const pal = { B: '#1a1430', K: '#4a3d78', w: '#fbf3e6' }
  paintCells(ctx, mapCells(['BB.....BB', 'BBB.w.BBB', 'BBBBKBBBB', 'BBB.w.BBB', 'BB.....BB'], 13.5, 24.5, pal), BONE)
}
/** clear safety goggles (Virgo, Pisces in the lab) */
export function gogglesCells(ctx, tint = '#7fe0ff') {
  const F = '#3fae9a', cells = []
  for (const x0 of [8, 19]) for (let j = 14; j <= 22; j++) for (let i = 0; i < 9; i++) {
    const edge = i === 0 || i === 8 || j === 14 || j === 22
    if ((i === 0 || i === 8) && (j === 14 || j === 22)) continue
    if (edge) cells.push([x0 + i, j, F])
  }
  for (let i = 3; i <= 7; i++) cells.push([i, 17, F]); for (let i = 28; i <= 32; i++) cells.push([i, 17, F])
  cells.push([17, 17, F], [18, 17, F])
  paintCells(ctx, cells, INK)
  ctx.fillStyle = rgba(tint, 0.25)
  for (const x0 of [8, 19]) ctx.fillRect(x0 + 1, 15, 7, 7)
  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  for (const x0 of [8, 19]) { ctx.fillRect(x0 + 1.2, 15.2, 1.6, 0.8); ctx.fillRect(x0 + 1.2, 16, 0.8, 1) }
}
/** a tiny wrist radio on the left point */
export function watchCells(ctx, blink = 0) {
  const cells = mapCells(['SSS', 'SgS', 'SSS'], 4, 14, { S: '#8a93b8', g: blink ? '#7dffb0' : '#2a6a52' })
  paintCells(ctx, cells, INK)
}
/** happy tears (cells). k: 1 sniffle · 2 streams · 3 fountains */
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
export function hankieCells(ctx, side) {
  const x0 = side < 0 ? 9 : 20, cells = []
  for (let j = 0; j < 5; j++) for (let i = 0; i < 6; i++) cells.push([x0 + i, 19 + j, (i === 0 || j === 0 || i === 5 || j === 4) ? '#ff8fb1' : (i + j) % 3 ? '#fff6ee' : '#ffd6e2'])
  paintCells(ctx, cells)
}

// ═══════════════════════ generic char-map sprite ═══════════════════════
/** draws rows (strings) with pal {char: colour}, unit u px, centred on (x, y), with a 1-unit ink outline */
export function spr(ctx, rows, x, y, u, pal, { outline = INK, anchor = 'center' } = {}) {
  const w = rows[0].length, h = rows.length
  const ox = Math.round(x - w * u / 2), oy = Math.round(anchor === 'bottom' ? y - h * u : y - h * u / 2)
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && !!pal[rows[j][i]]
  if (outline) {
    ctx.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) {
      if (on(i, j)) continue
      if (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1)) ctx.fillRect(ox + i * u, oy + j * u, u + 0.5, u + 0.5)
    }
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const c = pal[rows[j][i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(ox + i * u, oy + j * u, u + 0.5, u + 0.5) } }
  return { x: ox, y: oy, w: w * u, h: h * u }
}

// ═══════════════════════ the gadgets ═══════════════════════
const HELI = [
  '...................GG...........',
  '..............RRRRRRRRRR........',
  '............RRRRRRRRRRRRWW......',
  '...........RRRRRRRRRRRRRWWWW....',
  'RR.........RRRRP.PRRRRRRWWWWW...',
  'RRR........RRRPPPPPRRRRRWWWWWW..',
  'RRRRRRRRRRRRRRRPPPRRRRRRRWwWWWW.',
  'RRRRRRRRRRRRRRRRPRRRRRRRRRRRRRR.',
  'R..........rrrrrrrrrrrrrrrrrrrr.',
  '.............rrrrrrrrrrrrrrrrr..',
  '...............G.........G......',
  '...........GGGGGGGGGGGGGGGGGGGG.',
]
const HELI_PAL = { R: '#ff4f7a', r: '#c23060', W: '#9fe8ff', w: '#ffffff', P: '#ffd0e0', G: '#9aa3c8' }
/** the helicopter (32 × 12 units), centred on (x, y); tilt in rad; pilot = draw fn(cx, cy, u) for whoever's flying */
export function drawHeli(ctx, x, y, u, t, { tilt = 0, alpha = 1, pilot = null } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(tilt)
  // main rotor: two blades flashing past (+ a motion blur disc)
  const ry = -6 * u - u * 0.8
  ctx.fillStyle = 'rgba(200,210,240,0.16)'; ctx.beginPath(); ctx.ellipse(u * 3, ry, 19 * u, 1.6 * u, 0, 0, TAU); ctx.fill()
  for (const ph of [0, Math.PI / 2]) {
    const c = Math.cos(t * 38 + ph), L = 19 * u * c
    ctx.fillStyle = INK; ctx.fillRect(u * 3 + Math.min(0, L) - 2, ry - u * 0.5 - 2, Math.abs(L) + 4, u + 4)
    ctx.fillStyle = '#c9d0ee'; ctx.fillRect(u * 3 + Math.min(0, L), ry - u * 0.5, Math.abs(L), u)
  }
  if (pilot) pilot(u * 9.5, -2.2 * u, u)
  spr(ctx, HELI, 0, 0, u, HELI_PAL)
  // tail rotor
  const tr = Math.sin(t * 44)
  ctx.fillStyle = '#c9d0ee'; ctx.fillRect(-16 * u, -2.5 * u - Math.abs(tr) * 2.4 * u, u, Math.abs(tr) * 4.8 * u + u)
  ctx.restore()
}
const VIOLIN = ['..n..', '..n..', '..n..', '.BBB.', 'BBBBB', '.BkB.', 'BBBBB', '.BBB.']
const V_PAL = { n: '#4a2a1a', B: '#c8743a', k: '#4a2a1a' }
/** a violin held at an angle + a bow sawing across it (ph = sawing phase) */
export function drawViolin(ctx, x, y, u, ph, { rot = -0.7 } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  spr(ctx, VIOLIN, 0, 0, u, V_PAL)
  ctx.restore()
  const off = Math.sin(ph) * u * 3.5
  ctx.save(); ctx.translate(x + off * Math.cos(rot + 1.2), y + off * Math.sin(rot + 1.2)); ctx.rotate(rot + 1.2)
  ctx.fillStyle = INK; ctx.fillRect(-u * 6 - 2, -u * 0.35 - 2, u * 12 + 4, u * 0.7 + 4)
  ctx.fillStyle = '#f4e6c8'; ctx.fillRect(-u * 6, -u * 0.35, u * 12, u * 0.7)
  ctx.restore()
}
export function drawCello(ctx, x, y, u, ph) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(0.12)
  spr(ctx, ['..n..', '..n..', '..n..', '..n..', '.BBB.', 'BBBBB', 'BBkBB', '.BBB.', 'BBBBB', 'BBBBB', '.BBB.', '..n..'], 0, 0, u, V_PAL)
  ctx.restore()
  const off = Math.sin(ph) * u * 3
  ctx.fillStyle = INK; ctx.fillRect(x - u * 5 + off - 2, y + u * 0.5 - 2, u * 10 + 4, u * 0.7 + 4)
  ctx.fillStyle = '#f4e6c8'; ctx.fillRect(x - u * 5 + off, y + u * 0.5, u * 10, u * 0.7)
}
/** one firework: a ring of pixel sparks that expands, droops and fades (pure f(t)) */
export function drawFirework(ctx, cx, cy, t, t0, { R = 180, n = 22, cols = ['#ff8fb1', '#f2c75c', '#7fe0ff'], seed = 1, heart = false, dur = 1.5, drawStar, size = 20 } = {}) {
  const dt = t - t0
  if (dt < -0.35 || dt > dur) return
  if (dt < 0) {   // the rising trail
    const p = 1 + dt / 0.35
    ctx.fillStyle = '#fff3c4'
    for (let k = 0; k < 6; k++) ctx.fillRect(Math.round(cx - 3), Math.round(cy + (1 - p) * 520 + k * 14), 6, 8)
    return
  }
  const p = dt / dur, e = 1 - Math.pow(1 - Math.min(1, dt / 0.55), 3), a = 1 - p * p
  const r = rng(seed)
  ctx.save(); ctx.globalAlpha *= a
  if (dt < 0.12) { const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.9); g.addColorStop(0, 'rgba(255,250,230,0.8)'); g.addColorStop(1, 'rgba(255,250,230,0)'); ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R) }
  for (let i = 0; i < n; i++) {
    const th = i / n * TAU
    let dx = Math.cos(th), dy = Math.sin(th)
    if (heart) { const s = th; dx = (16 * Math.sin(s) ** 3) / 17; dy = -(13 * Math.cos(s) - 5 * Math.cos(2 * s) - 2 * Math.cos(3 * s) - Math.cos(4 * s)) / 17 }
    const rr = R * e * (0.9 + 0.2 * r())
    const px = cx + dx * rr, py = cy + dy * rr + 60 * p * p
    const c = cols[i % cols.length]
    for (let k = 1; k <= 3; k++) { ctx.fillStyle = rgba(c, 0.35 / k); const q = rr * (1 - k * 0.09); ctx.fillRect(Math.round(cx + dx * q - 3), Math.round(cy + dy * q + 60 * p * p - 3), 6, 6) }
    if (drawStar) drawStar(ctx, px, py, size, i % 2 ? 1 : 2, c)
    else { ctx.fillStyle = c; ctx.fillRect(Math.round(px - 5), Math.round(py - 5), 10, 10) }
  }
  ctx.restore()
}

// ═══════════════════════ the sets ═══════════════════════
/** the synthwave sun: a striped half-disc on the horizon */
export function drawSynthSun(ctx, cx, hy, R, t, alpha = 1) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.beginPath(); ctx.rect(cx - R - 4, hy - R - 4, 2 * R + 8, R + 4); ctx.clip()
  const g = ctx.createLinearGradient(0, hy - R, 0, hy); g.addColorStop(0, '#ffd36e'); g.addColorStop(0.55, '#ff7a8a'); g.addColorStop(1, '#c23a9a')
  const glow = ctx.createRadialGradient(cx, hy - R * 0.4, R * 0.6, cx, hy - R * 0.4, R * 1.6); glow.addColorStop(0, 'rgba(255,120,170,0.35)'); glow.addColorStop(1, 'rgba(255,120,170,0)')
  ctx.restore(); ctx.save(); ctx.globalAlpha *= alpha
  ctx.fillStyle = glow; ctx.fillRect(cx - R * 1.8, hy - R * 2, R * 3.6, R * 2)
  ctx.beginPath(); ctx.rect(cx - R - 4, hy - R - 4, 2 * R + 8, R + 4); ctx.clip()
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, hy, R, Math.PI, TAU); ctx.fill()
  // stripes (gaps scroll down slowly)
  ctx.globalCompositeOperation = 'destination-out'
  for (let k = 0; k < 7; k++) { const f = ((k + (t * 0.25) % 1) / 7), yy = hy - R * 0.55 + f * R * 0.55, hh = 3 + f * 12; ctx.fillRect(cx - R, Math.round(yy), 2 * R, Math.round(hh)) }
  ctx.restore()
}
/** the neon perspective grid floor from the horizon hy down to the bottom */
export function drawGridFloor(ctx, hy, t, { W = 1080, H = 1920, col = '#ff4fd8', alpha = 1, speed = 0.6 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const g = ctx.createLinearGradient(0, hy, 0, H); g.addColorStop(0, 'rgba(40,8,60,0.0)'); g.addColorStop(0.15, 'rgba(30,6,52,0.85)'); g.addColorStop(1, 'rgba(14,4,30,0.95)')
  ctx.fillStyle = g; ctx.fillRect(0, hy, W, H - hy)
  ctx.strokeStyle = col; ctx.lineWidth = 3
  ctx.shadowColor = col; ctx.shadowBlur = 14
  const cx = W / 2
  for (let i = -14; i <= 14; i++) { ctx.globalAlpha = alpha * 0.55; ctx.beginPath(); ctx.moveTo(cx + i * 22, hy); ctx.lineTo(cx + i * 190, H); ctx.stroke() }
  for (let k = 0; k < 12; k++) {
    const f = (k + (t * speed) % 1) / 12, yy = hy + (H - hy) * f * f
    ctx.globalAlpha = alpha * (0.2 + 0.6 * f); ctx.beginPath(); ctx.moveTo(0, yy); ctx.lineTo(W, yy); ctx.stroke()
  }
  ctx.shadowBlur = 0; ctx.globalAlpha = alpha * 0.9; ctx.fillStyle = col; ctx.fillRect(0, hy - 2, W, 4)
  ctx.restore()
}
export function drawRope(ctx, x, y0, y1, sway = 0) {
  ctx.fillStyle = INK; ctx.fillRect(Math.round(x - 5 + sway), y0, 10, y1 - y0)
  for (let y = y0; y < y1; y += 12) { ctx.fillStyle = (y / 12) % 2 < 1 ? '#e8d7a8' : '#b89a62'; ctx.fillRect(Math.round(x - 3 + sway * (y - y0) / Math.max(1, y1 - y0)), y, 6, 12) }
}
/** a box with an ink outline, snapped to px */
export function box(ctx, x, y, w, h, fill, line = INK, lw = 5) {
  x = Math.round(x); y = Math.round(y); w = Math.round(w); h = Math.round(h)
  if (line) { ctx.fillStyle = line; ctx.fillRect(x - lw, y - lw, w + 2 * lw, h + 2 * lw) }
  ctx.fillStyle = fill; ctx.fillRect(x, y, w, h)
}
export function drawDesk(ctx, x, y, w, label, glyph) {
  box(ctx, x - w / 2, y, w, 26, '#5a3a6e'); box(ctx, x - w / 2 + 20, y + 26, w - 40, 90, '#3f2752')
  ctx.fillStyle = '#6c4a84'; ctx.fillRect(Math.round(x - w / 2 + 20), y + 26, Math.round(w - 40), 8)
  box(ctx, x - 92, y - 46, 184, 42, '#f2c75c', INK, 4)
  ctx.fillStyle = INK; ctx.font = "700 24px 'Space Mono', monospace"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(label + (glyph ? ' ' + glyph : ''), x, y - 24)
}
export function drawCart(ctx, x, y, u, t) {
  box(ctx, x - 9 * u, y - 4 * u, 18 * u, 2 * u, '#c9d0ee'); box(ctx, x - 8 * u, y + 2 * u, 16 * u, u, '#8a93b8')
  ctx.fillStyle = INK; ctx.fillRect(x - 8 * u, y - 2 * u, u, 4 * u); ctx.fillRect(x + 7 * u, y - 2 * u, u, 4 * u)
  for (const dx of [-6, 6]) { ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(x + dx * u, y + 4.5 * u, 1.6 * u, 0, TAU); ctx.fill(); ctx.fillStyle = '#5c6488'; ctx.beginPath(); ctx.arc(x + dx * u, y + 4.5 * u, 0.9 * u, 0, TAU); ctx.fill() }
  // the coffee pot + two cups
  spr(ctx, ['.KK.', 'CCCC', 'CBBC', 'CBBC', 'CCCC'], x - 3 * u, y - 7 * u, u, { K: '#2a2140', C: '#c9d0ee', B: '#6a3b22' })
  spr(ctx, ['WW', 'WW'], x + 2 * u, y - 5 * u, u, { W: '#fbf3e6' }); spr(ctx, ['WW', 'WW'], x + 5 * u, y - 5 * u, u, { W: '#ffd0e0' })
  for (let k = 0; k < 2; k++) { const ph = (t * 0.8 + k * 0.5) % 1; ctx.fillStyle = `rgba(255,255,255,${0.5 * (1 - ph)})`; ctx.fillRect(Math.round(x - 3 * u + Math.sin(ph * 6 + k) * u), Math.round(y - 10 * u - ph * 5 * u), u, u) }
}
/** Q-branch's bench with three labelled gadgets */
export function drawBench(ctx, x, y, w, t) {
  box(ctx, x - w / 2, y, w, 22, '#8a93b8'); box(ctx, x - w / 2 + 16, y + 22, 16, 80, '#5c6488'); box(ctx, x + w / 2 - 32, y + 22, 16, 80, '#5c6488')
  const u = 5
  // shoe phone
  spr(ctx, ['......a.', '......a.', '..KKKKK.', '.KKKKKKK', 'KKKKKKKK', 'SSSSSSSS'], x - w / 2 + 70, y, u, { K: '#7a4a2a', S: '#2a1a12', a: '#c9d0ee' }, { anchor: 'bottom' })
  // bow-tie cam
  spr(ctx, ['BB...BB', 'BBBrBBB', 'BBBRBBB', 'BBBrBBB', 'BB...BB'], x, y - 4, u, { B: '#1a1430', r: '#ff4f7a', R: (Math.floor(t * 2) % 2 ? '#ff4f7a' : '#7a1a30') }, { anchor: 'bottom' })
  // emergency roses
  spr(ctx, ['.R.R.', 'RRRRR', '.RgR.', '..g..', '.gg..', '..g..'], x + w / 2 - 70, y, u, { R: '#ff4f7a', g: '#56c46a' }, { anchor: 'bottom' })
  ctx.font = "700 17px 'Space Mono', monospace"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  const tag = (s, tx, dy) => { ctx.font = "700 19px 'Space Mono', monospace"; const tw = ctx.measureText(s).width + 14; box(ctx, tx - tw / 2, y + 34 + dy, tw, 28, '#fbf3e6', INK, 3); ctx.fillStyle = INK; ctx.fillText(s, tx, y + 49 + dy) }
  tag('SHOE PHONE', x - w / 2 + 70, 0); tag('BOW-TIE CAM', x, 40); tag('BACKUP ROSES', x + w / 2 - 70, 0)
}
export function drawClipboard(ctx, x, y, s, rot, lines, { bar = -1 } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  box(ctx, -40 * s, -54 * s, 80 * s, 108 * s, '#b07a44', INK, 4)
  box(ctx, -32 * s, -44 * s, 64 * s, 92 * s, '#fbf3e6', null)
  box(ctx, -16 * s, -60 * s, 32 * s, 14 * s, '#9aa3c8', INK, 3)
  ctx.fillStyle = '#9a8f80'
  lines.forEach((on, i) => { if (on) ctx.fillRect(-24 * s, (-30 + i * 14) * s, (on === 2 ? 30 : 46) * s, 4 * s) })
  if (bar >= 0) {
    ctx.fillStyle = INK; ctx.font = `700 ${Math.round(11 * s)}px 'Space Mono', monospace`; ctx.textAlign = 'center'; ctx.fillText('BUDGET', 0, 18 * s)
    box(ctx, -26 * s, 24 * s, 52 * s, 12 * s, '#e8e0d0', INK, 2)
    ctx.fillStyle = bar > 1 ? '#ff4058' : '#56c46a'; ctx.fillRect(-26 * s, 24 * s, 52 * s * Math.min(1, bar), 12 * s)
    if (bar > 1) { ctx.fillRect(26 * s, 24 * s, 52 * s * Math.min(1.6, bar - 1), 12 * s) }
  }
  ctx.restore()
}
/** the briefing monitor */
export function drawScreen(ctx, x, y, w, h, t, on = 1) {
  box(ctx, x, y, w, h, '#0b1430', '#7fe0ff', 6)
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip()
  ctx.globalAlpha = on
  const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#0f2048'); g.addColorStop(1, '#0a1230'); ctx.fillStyle = g; ctx.fillRect(x, y, w, h)
  ctx.strokeStyle = 'rgba(127,224,255,0.16)'; ctx.lineWidth = 2
  for (let gx = x + 30; gx < x + w; gx += 48) { ctx.beginPath(); ctx.moveTo(gx, y); ctx.lineTo(gx, y + h); ctx.stroke() }
  for (let gy = y + 70; gy < y + h; gy += 48) { ctx.beginPath(); ctx.moveTo(x, gy); ctx.lineTo(x + w, gy); ctx.stroke() }
  // a constellation map on the right
  const pts = [[0.62, 0.42], [0.7, 0.3], [0.8, 0.38], [0.86, 0.55], [0.74, 0.7], [0.66, 0.6]].map(([a, b]) => [x + a * w, y + b * h])
  ctx.strokeStyle = 'rgba(127,224,255,0.5)'; ctx.lineWidth = 3; ctx.beginPath(); pts.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.stroke()
  for (const [px, py] of pts) { ctx.fillStyle = '#cfefff'; ctx.fillRect(Math.round(px - 5), Math.round(py - 5), 10, 10) }
  // title bar
  ctx.fillStyle = 'rgba(127,224,255,0.18)'; ctx.fillRect(x, y, w, 56)
  ctx.fillStyle = '#7fe0ff'; ctx.font = "700 28px 'Space Mono', monospace"; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
  ctx.fillText('OPERATION: DATE NIGHT', x + 22, y + 29)
  if (Math.floor(t * 2) % 2) { ctx.fillStyle = '#ff4058'; ctx.fillRect(x + w - 40, y + 20, 16, 16) }
  // scanlines
  ctx.globalAlpha = 0.12 * on; ctx.fillStyle = '#000'
  for (let sy = y; sy < y + h; sy += 6) ctx.fillRect(x, sy, w, 2)
  ctx.restore()
}
/** a red rubber stamp, k = slam 0…1 */
export function drawStamp(ctx, text, x, y, rot, k, { col = '#ff4058', size = 46 } = {}) {
  if (k <= 0) return
  const s = 1 + 1.4 * (1 - Math.min(1, k)) ** 2
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= Math.min(1, k * 1.5)
  ctx.font = `700 ${size}px 'Space Mono', monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  const tw = ctx.measureText(text).width + 30, th = size * 1.35
  ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.strokeRect(-tw / 2, -th / 2, tw, th)
  ctx.fillStyle = col; ctx.fillText(text, 0, 2)
  ctx.restore()
}
/** the living room couch (seat top at y) */
export function drawCouch(ctx, x, y, w) {
  const C = '#8a3d6e', c = '#6a2a54', h = '#a8558a'
  box(ctx, x - w / 2 + 40, y - 170, w - 80, 150, C)                      // back
  ctx.fillStyle = h; ctx.fillRect(Math.round(x - w / 2 + 40), y - 170, Math.round(w - 80), 10)
  ctx.fillStyle = c; ctx.fillRect(Math.round(x - 4), y - 160, 8, 140)
  box(ctx, x - w / 2 + 40, y - 20, w - 80, 70, C)                         // seat
  ctx.fillStyle = h; ctx.fillRect(Math.round(x - w / 2 + 40), y - 20, Math.round(w - 80), 8)
  ctx.fillStyle = c; ctx.fillRect(Math.round(x - 4), y - 12, 8, 62)
  box(ctx, x - w / 2, y - 90, 60, 160, C); box(ctx, x + w / 2 - 60, y - 90, 60, 160, C)   // arms
  ctx.fillStyle = h; ctx.fillRect(Math.round(x - w / 2), y - 90, 60, 10); ctx.fillRect(Math.round(x + w / 2 - 60), y - 90, 60, 10)
  box(ctx, x - w / 2 + 20, y + 70, 20, 24, '#3a1a2e'); box(ctx, x + w / 2 - 40, y + 70, 20, 24, '#3a1a2e')
  // a throw pillow
  box(ctx, x + w / 2 - 150, y - 90, 80, 70, '#f2c75c'); ctx.fillStyle = '#d9a83e'; ctx.fillRect(Math.round(x + w / 2 - 150), y - 32, 80, 12)
}
export function drawTable(ctx, x, y, w, t, { mugs = 2, shades = 0 } = {}) {
  box(ctx, x - w / 2, y, w, 22, '#7a4a2a'); box(ctx, x - w / 2 + 18, y + 22, 18, 50, '#5a3420'); box(ctx, x + w / 2 - 36, y + 22, 18, 50, '#5a3420')
  const u = 6
  const mug = (mx, col) => {
    spr(ctx, ['MMMM.', 'MMMMh', 'MMMMh', 'MMMM.'], mx, y, u, { M: col, h: col }, { anchor: 'bottom' })
    for (let k = 0; k < 2; k++) { const ph = (t * 0.7 + k * 0.5) % 1; ctx.fillStyle = `rgba(255,255,255,${0.55 * (1 - ph)})`; ctx.fillRect(Math.round(mx - 6 + Math.sin(ph * 6 + k + mx) * 6), Math.round(y - 30 - ph * 46), 6, 6) }
  }
  if (mugs >= 1) mug(x - 60, '#ff8fb1')
  if (mugs >= 2) mug(x + 40, '#7dffb0')
  if (shades > 0) {
    ctx.save(); ctx.globalAlpha *= shades
    spr(ctx, ['LLLL..LLLL', 'LLLLLLLLLL', 'LLLL..LLLL', '.LL....LL.'], x + 140, y, 5, { L: '#120c24' }, { outline: BONE, anchor: 'bottom' })
    ctx.restore()
  }
}
/** a window floating in the sky (inside drawn by fn, clipped) */
export function drawWindow(ctx, x, y, w, h, inside) {
  box(ctx, x, y, w, h, '#0b0a24', '#c9a6ff', 8)
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip()
  const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#1a1050'); g.addColorStop(1, '#3a1d6a'); ctx.fillStyle = g; ctx.fillRect(x, y, w, h)
  const r = rng(9)
  for (let i = 0; i < 18; i++) { ctx.fillStyle = i % 4 ? 'rgba(255,255,255,0.6)' : '#f2c75c'; ctx.fillRect(Math.round(x + r() * w), Math.round(y + r() * h), 4, 4) }
  if (inside) inside()
  ctx.restore()
  ctx.fillStyle = '#c9a6ff'; ctx.fillRect(Math.round(x + w / 2 - 4), y, 8, h); ctx.fillRect(x, Math.round(y + h / 2 - 4), w, 8)
  box(ctx, x - 16, y + h + 4, w + 32, 16, '#c9a6ff')
}
/** a lampshade (top-centre at x, y; w = bottom width), tilt in rad, on = glow 0…1 */
export function drawLampshade(ctx, x, y, w, tilt, on = 1) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(tilt)
  if (on > 0) {
    const g = ctx.createRadialGradient(0, 120, 20, 0, 160, 420); g.addColorStop(0, `rgba(255,220,140,${0.38 * on})`); g.addColorStop(1, 'rgba(255,220,140,0)')
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-w * 0.45, 130); ctx.lineTo(w * 0.45, 130); ctx.lineTo(w * 1.4, 620); ctx.lineTo(-w * 1.4, 620); ctx.fill()
  }
  const top = w * 0.55, h = 140
  ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-top / 2 - 6, -6); ctx.lineTo(top / 2 + 6, -6); ctx.lineTo(w / 2 + 8, h + 6); ctx.lineTo(-w / 2 - 8, h + 6); ctx.closePath(); ctx.fill()
  const g2 = ctx.createLinearGradient(-w / 2, 0, w / 2, 0); g2.addColorStop(0, '#f6d9a0'); g2.addColorStop(0.5, '#fff1cf'); g2.addColorStop(1, '#e8bf7a')
  ctx.fillStyle = g2; ctx.beginPath(); ctx.moveTo(-top / 2, 0); ctx.lineTo(top / 2, 0); ctx.lineTo(w / 2, h); ctx.lineTo(-w / 2, h); ctx.closePath(); ctx.fill()
  ctx.fillStyle = '#d99a55'; for (let i = -w / 2; i < w / 2; i += 16) ctx.fillRect(Math.round(i), h, 8, 18)   // fringe
  ctx.fillStyle = '#d99a55'; ctx.fillRect(-top / 2 + 4, 26, top - 8, 6); ctx.fillRect(-w / 2 + 16, h - 26, w - 32, 6)
  ctx.restore()
}
export function drawBlanket(ctx, x, y, w, h, k = 1) {
  if (k <= 0) return
  ctx.save(); ctx.globalAlpha *= Math.min(1, k * 2)
  const yy = y - (1 - k) * 260
  box(ctx, x - w / 2, yy, w, h, '#4a6ad8')
  for (let j = 0; j < h; j += 24) for (let i = 0; i < w; i += 24) if (((i + j) / 24) % 2 === 0) { ctx.fillStyle = '#5f80ea'; ctx.fillRect(Math.round(x - w / 2 + i), Math.round(yy + j), 24, 24) }
  ctx.fillStyle = '#f2c75c'; ctx.fillRect(Math.round(x - w / 2), Math.round(yy), w, 10)
  for (let i = 0; i < w; i += 20) { ctx.fillStyle = '#f2c75c'; ctx.fillRect(Math.round(x - w / 2 + i), Math.round(yy + h), 8, 14) }
  ctx.restore()
}
/** a phone held up (small, in px) */
export function drawPhone(ctx, x, y, s, rot = 0, lit = 1) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  box(ctx, -18 * s, -32 * s, 36 * s, 64 * s, '#241a44', INK, 4)
  ctx.fillStyle = `rgba(160,220,255,${0.5 + 0.4 * lit})`; ctx.fillRect(-13 * s, -26 * s, 26 * s, 50 * s)
  ctx.restore()
}

// ═══════════════════════ the talk card ═══════════════════════
export function makeTalkCard(doc, img, lines, { label = 'QUESTION' } = {}) {
  if (!img) return null
  const c = doc.createElement('canvas'); c.width = img.width; c.height = img.height
  const x = c.getContext('2d'); x.drawImage(img, 0, 0)
  const g = x.createLinearGradient(0, 822, 0, 990); g.addColorStop(0, 'rgb(17,9,45)'); g.addColorStop(1, 'rgb(15,8,40)')
  x.fillStyle = g; x.fillRect(114, 822, 504, 162)
  x.fillStyle = '#efe6d6'; x.font = "italic 500 58px 'EB Garamond', Georgia, serif"; x.textAlign = 'center'; x.textBaseline = 'alphabetic'
  lines.forEach((s, i) => x.fillText(s, 366, 874 + i * 62))
  x.fillStyle = 'rgb(14,7,38)'; x.fillRect(340, 1036, 250, 23)
  x.font = "400 21px 'Space Mono', monospace"; x.letterSpacing = '4px'; x.textAlign = 'right'; x.fillStyle = 'rgb(166,144,105)'
  x.fillText(label, 574, 1055)
  x.letterSpacing = '0px'
  return c
}
