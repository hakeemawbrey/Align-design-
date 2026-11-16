// srsaturnreturn props — the pixel kit for "the stars explain your Saturn return" (kept inside this film's folder).
// Pure functions of their arguments (and t); nothing touches `document` at module top level.
//   starFrame / cellToWorld / inSprite (mirror startalk.js drawStarChar) · tearsCells · bmp · sweatDrop · drawChip ·
//   tourFlag (the guide's little pennant on a stick)
import { rng } from '../../../src/lib.js'

export const INK = '#1b1236'
const G = 36, HALF = 18
const MONO = "'Space Mono', ui-monospace, monospace"
const GOLD = '#f2c75c', BONE = '#efe6d6'

// ───────────────────────────────────────── the star transform (mirrors startalk.js drawStarChar)
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
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
export const cellToWorld = (F, i, j) => [F.ox + (i - HALF) * F.cell * F.sx, F.oy + (j - HALF) * F.cell * F.sy - F.base * F.sy]

/** tears from both eyes (cells). k: 1 sniffle · 2 streams · 3 fountains */
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      let x, y
      if (k >= 3) { x = ex + d * 15 * ph; y = 20 - 9 * ph + 24 * ph * ph }
      else if (k === 2) { x = ex + d * 3.5 * ph; y = 20.5 + 15 * ph * ph }
      else { x = ex + d * 0.6 * ph; y = 21 + 8 * ph * ph }
      drop(Math.round(x * 2) / 2, Math.round(y * 2) / 2)
    }
  }
}

// ───────────────────────────────────────── bitmaps
export const BM = s => s.trim().split(/\s+/)
export function bmp(ctx, rows, x, y, px, pal, { rot = 0, ax = 0.5, ay = 0.5, outline = null, alpha = 1 } = {}) {
  if (alpha <= 0) return
  const w = rows[0].length, h = rows.length
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.translate(x, y); if (rot) ctx.rotate(rot)
  const ox = -w * px * ax, oy = -h * px * ay, c = px + 0.5
  if (outline) {
    ctx.fillStyle = outline
    rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) {
      if (row[i] === '.' || !pal[row[i]]) continue
      for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const r2 = rows[j + b], ch2 = r2 ? r2[i + a] : undefined; if (!ch2 || ch2 === '.' || !pal[ch2]) ctx.fillRect(ox + (i + a) * px, oy + (j + b) * px, c, c) }
    } })
  }
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const col = pal[row[i]]; if (!col) continue; ctx.fillStyle = col; ctx.fillRect(ox + i * px, oy + j * px, c, c) } })
  ctx.restore()
}
const DROP = BM(`..X.. .XWX. XWWXX XWXXX .XXX.`)
export function sweatDrop(ctx, t, x, y, px, alpha = 1) { const ph = (t * 1.4) % 1; bmp(ctx, DROP, x, y + ph * px * 6, px, { X: '#7fd0f0', W: '#ffffff' }, { alpha: alpha * (1 - ph * 0.6), outline: INK }) }

/** a small label chip (Space Mono on dark glass with a colour bar) */
export function drawChip(ctx, x, y, text, { k = 1, col = BONE, bar = GOLD, size = 30, rot = 0 } = {}) {
  if (k <= 0.01) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k)
  ctx.font = `700 ${size}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  const tw = ctx.measureText(text).width + 32, th = size + 22
  ctx.fillStyle = INK; ctx.fillRect(-tw / 2 - 4, -th / 2 - 4, tw + 8, th + 8)
  ctx.fillStyle = 'rgba(20,12,44,0.97)'; ctx.fillRect(-tw / 2, -th / 2, tw, th); ctx.fillStyle = bar; ctx.fillRect(-tw / 2, th / 2 - 5, tw, 5)
  ctx.fillStyle = col; ctx.fillText(text, 0, 2)
  ctx.restore()
}

/** the tour guide's pennant: a pixel stick (base at x, y) with a waving gold flag reading TOUR. wave = 0…1 speed */
export function tourFlag(ctx, t, x, y, px, { wave = 1, rot = 0, alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot)
  // the stick
  ctx.fillStyle = INK; ctx.fillRect(-px * 1.5, -px * 30, px * 3, px * 31)
  ctx.fillStyle = '#c99a5b'; ctx.fillRect(-px * 0.75, -px * 29.5, px * 1.5, px * 30)
  ctx.fillStyle = GOLD; ctx.fillRect(-px * 1.5, -px * 32, px * 3, px * 3)
  // the flag: columns that ripple
  const cols = 14, rows = 8
  for (let i = 0; i < cols; i++) {
    const dy = Math.round(Math.sin(t * 9 * wave - i * 0.55) * (i / cols) * 2.2) * px
    const x0 = px * 0.75 + i * px * 1.5
    ctx.fillStyle = INK; ctx.fillRect(x0, -px * 29.5 + dy - px * 0.75, px * 1.5 + 0.5, rows * px * 1.5 + px * 1.5)
  }
  for (let i = 0; i < cols; i++) {
    const dy = Math.round(Math.sin(t * 9 * wave - i * 0.55) * (i / cols) * 2.2) * px
    const x0 = px * 0.75 + i * px * 1.5
    ctx.fillStyle = i % 4 === 0 ? '#ffd98a' : '#ff8fb1'
    ctx.fillRect(x0, -px * 29.5 + dy, px * 1.5 + 0.5, rows * px * 1.5)
  }
  const mid = Math.round(Math.sin(t * 9 * wave - 7 * 0.55) * 0.5 * 2.2) * px
  ctx.font = `700 ${Math.round(px * 6.2)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = INK; ctx.fillText('TOUR', px * 11.25, -px * 23.4 + mid)
  ctx.restore()
}

/** speed streaks behind a running star (k = 0…1) */
export function speedStreaks(ctx, t, x, y, k, seed = 5) {
  if (k <= 0) return
  const r = rng(seed)
  ctx.save()
  for (let i = 0; i < 7; i++) {
    const yy = y - 90 + r() * 180, len = 60 + r() * 120, ph = (t * 3 + r()) % 1
    ctx.globalAlpha = k * (0.35 + 0.4 * r()) * Math.sin(Math.PI * ph)
    ctx.fillStyle = i % 2 ? BONE : GOLD
    ctx.fillRect(Math.round(x - 110 - ph * 120 - len), Math.round(yy), Math.round(len), 6)
  }
  ctx.restore()
}

const RED = '#ff5c5c', MINT = '#7dffb0', TAU = Math.PI * 2
/** pixel eyes on a planet (so Saturn can be a character). open 0…1 (lid), look [x, y] −1…1, mood 'neutral' | 'happy' |
 *  'squint'; glasses = tiny reading glasses (0…1 pop) */
export function planetEyes(ctx, x, y, r, { open = 1, look = [0, 0], mood = 'neutral', glasses = 0, alpha = 1 } = {}) {
  if (alpha <= 0 || open <= 0.01 && mood !== 'happy') return
  const p = Math.max(2, Math.round(r / 13))
  ctx.save(); ctx.globalAlpha *= alpha
  for (const d of [-1, 1]) {
    const ex = Math.round(x + d * r * 0.34), ey = Math.round(y - r * 0.12)
    if (mood === 'happy') {
      ctx.fillStyle = INK
      ctx.fillRect(ex - 2 * p, ey, p, p); ctx.fillRect(ex - p, ey - p, 2 * p, p); ctx.fillRect(ex + p, ey, p, p)
      continue
    }
    const h = Math.max(1, Math.round(6 * open * (mood === 'squint' ? 0.5 : 1)))
    ctx.fillStyle = INK; ctx.fillRect(ex - 2.5 * p - p * 0.5, ey - h * p / 2 - p * 0.5, 6 * p, (h + 1) * p)
    ctx.fillStyle = '#fffbea'; ctx.fillRect(ex - 2.5 * p, ey - h * p / 2, 5 * p, h * p)
    if (h >= 2) {
      const lx = Math.round(look[0] * 1.2), ly = Math.round(look[1] * 1)
      ctx.fillStyle = INK; ctx.fillRect(ex - p + lx * p, ey - p + ly * p * (h >= 4 ? 1 : 0), 2 * p, Math.min(2, h) * p)
      ctx.fillStyle = '#ffffff'; ctx.fillRect(ex - p + lx * p, ey - p + ly * p * (h >= 4 ? 1 : 0), Math.round(p / 2), Math.round(p / 2))
    }
  }
  if (glasses > 0.01) {
    ctx.save(); ctx.translate(x, y - r * 0.12); ctx.scale(glasses, glasses)
    ctx.strokeStyle = INK; ctx.lineWidth = p * 1.4
    for (const d of [-1, 1]) { ctx.strokeRect(d * r * 0.34 - 3.6 * p, -4.2 * p, 7.2 * p, 8.4 * p) }
    ctx.strokeStyle = GOLD; ctx.lineWidth = p * 0.7
    for (const d of [-1, 1]) { ctx.strokeRect(d * r * 0.34 - 3.6 * p, -4.2 * p, 7.2 * p, 8.4 * p) }
    ctx.fillStyle = GOLD; ctx.fillRect(-r * 0.34 + 3.6 * p, -p * 0.6, r * 0.68 - 7.2 * p, p)
    ctx.restore()
  }
  ctx.restore()
}

/** a rubber stamp: rotated bordered label that slams in (k: 0…1 time since slam, scaled) */
export function drawStamp(ctx, x, y, text, { k = 1, col = MINT, rot = -0.12, size = 40, alpha = 1 } = {}) {
  if (k <= 0 || alpha <= 0) return
  const s = 1 + 1.4 * Math.max(0, 1 - k * 4) ** 2
  ctx.save(); ctx.globalAlpha *= alpha * Math.min(1, k * 6); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s)
  ctx.font = `700 ${size}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  const tw = ctx.measureText(text).width + 40, th = size + 30
  ctx.fillStyle = 'rgba(13,8,32,0.82)'; ctx.fillRect(-tw / 2, -th / 2, tw, th)
  ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.strokeRect(-tw / 2, -th / 2, tw, th)
  ctx.lineWidth = 2; ctx.strokeRect(-tw / 2 + 9, -th / 2 + 9, tw - 18, th - 18)
  ctx.fillStyle = col; ctx.fillText(text, 0, 3)
  ctx.restore()
}
export const STAMP = { RED, MINT }

/** gold pixel question marks bobbing (hook) */
const QM = BM(`.XXX. X...X ....X ...X. ..X.. ..... ..X..`)
export function qmarks(ctx, t, pts, px, alpha = 1) {
  pts.forEach(([x, y, ph], i) => bmp(ctx, QM, x, y + Math.sin(t * 3 + ph) * 12, px, { X: i % 2 ? '#ffd98a' : GOLD }, { outline: INK, alpha, rot: 0.15 * Math.sin(t * 2 + ph) }))
}

/** the veiled mystery card (card first, face last) with text rows */
export function drawMysteryCard(ctx, x, y, w, h, t, { glyph = '♌', lines = [], badge = '#f7b733', k = 1, rot = 0, lineCols = [] } = {}) {
  if (k <= 0.01) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k)
  const rr = (X, Y, W2, H2, r) => { ctx.beginPath(); ctx.roundRect(X, Y, W2, H2, r) }
  rr(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16, 30); ctx.fillStyle = INK; ctx.fill()
  rr(-w / 2, -h / 2, w, h, 24); const g = ctx.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2c1f5e'); g.addColorStop(1, '#170f36'); ctx.fillStyle = g; ctx.fill()
  ctx.strokeStyle = GOLD; ctx.lineWidth = 4; rr(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 16); ctx.stroke()
  const fy = -h / 2 + h * 0.25, fr = w * 0.19
  ctx.save(); ctx.beginPath(); ctx.arc(0, fy, fr, 0, TAU); ctx.clip()
  ctx.fillStyle = '#3c2f74'; ctx.fillRect(-fr, fy - fr, 2 * fr, 2 * fr)
  for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) { const n = Math.sin(i * 7.1 + j * 3.3 + Math.floor(t * 4) * 1.7); if (n > 0.2) { ctx.fillStyle = `rgba(201,166,255,${0.18 + 0.2 * n})`; ctx.fillRect(-fr + i * fr * 2 / 9, fy - fr + j * fr * 2 / 9, fr * 2 / 9 + 1, fr * 2 / 9 + 1) } }
  ctx.restore()
  ctx.strokeStyle = 'rgba(242,199,92,0.7)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, fy, fr, 0, TAU); ctx.stroke()
  ctx.font = `800 64px Inter, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = 'rgba(239,230,214,0.85)'; ctx.fillText('?', 0, fy + 4)
  const bx = fr * 0.95, by = fy + fr * 0.75
  ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(bx, by, 29, 0, TAU); ctx.fill()
  ctx.fillStyle = badge; ctx.beginPath(); ctx.arc(bx, by, 25, 0, TAU); ctx.fill()
  ctx.font = `600 34px 'DejaVu Sans', 'Noto Sans Symbols', serif`; ctx.fillStyle = INK; ctx.fillText(glyph + '︎', bx, by + 2)
  ctx.font = `700 33px ${MONO}`
  lines.forEach((s, i) => { ctx.fillStyle = lineCols[i] || (i === 0 ? GOLD : BONE); ctx.fillText(s, 0, -h / 2 + h * 0.58 + i * 60) })
  ctx.restore()
}
