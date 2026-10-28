// sthey props: small pixel drawings on canvas (Star Talk season 3, #8 "hey"). Everything is a pure function of its
// arguments; nothing touches `document` at module top level (rapidBox builds DOM only when called from build()).
//   starFrame / inSprite / cellToWorld   the transform drawStarChar uses (same maths as startalk.js), so props drawn in
//                                        sprite CELLS (the 36-cell grid) stay seated through hops and squash
//   crownCells · tieCells · tiaraCells · veilCells · tearsCells · dropCell     props in sprite cells
//   drawHeyNotif     the "hey" notification card (avatar, "your match", "now", hey)
//   drawBubble       a chat bubble (sent / received / draft), drawTyping a "•••" typing bubble
//   drawCroissant · drawRedPen · drawCoffee · drawSuitcase · drawPlane · drawMiniPhone · drawMemeCat · drawHeart
//   drawMarquee · drawSpotlight · drawBoard · drawPlanner · dustPuff · speedLines
//   rapidBox(parent, opts)   the Star Talk RPG text box for the rapid fire: the same pixel panel and name tags as
//                            startalk.js dialogueBox, but each line types in one quick burst (no punctuation pauses)
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'

const TAU = Math.PI * 2
export const INK = '#1b1236'
const GOLD = '#f2c75c', BONE = '#efe6d6'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }

// ─────────────────────────────────────────────── the star transform (mirrors startalk.js drawStarChar)
const G = 36, HALF = 18, SC_Y = 19.6, SC_R = 17.6
const FOOT_ROW = SC_Y + SC_R * Math.cos(Math.PI / 5)
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
/** sprite cell → world point (ignores squash) */
export const cellToWorld = (F, i, j) => [F.ox - F.S / 2 + i * F.cell, F.oy - F.S / 2 - F.base + j * F.cell]

/** cells [[i, j, colour]] with a 1-cell ink outline */
export function paintCells(ctx, cells, outline = INK) {
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  if (outline) {
    ctx.fillStyle = outline
    for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b))) ctx.fillRect(i + a, j + b, 1.02, 1.02)
  }
  for (const [i, j, c] of cells) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) }
}
const fromRows = (rows, pal, i0, j0) => { const out = []; rows.forEach((r, j) => [...r].forEach((ch, i) => { if (pal[ch]) out.push([i0 + i, j0 + j, pal[ch]]) })); return out }
/** bitmap in world px: rows of chars, pal maps char → colour, (x, y) = top-left */
export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}

// ─────────────────────────────────────────────── props in sprite cells
// Leo's crown: sits on the top point (the tip is at row 2)
const CROWN = fromRows([
  'r...c...r',
  'G..GGG..G',
  'GG.GGG.GG',
  'GGGGGGGGG',
  'HHHHHHHHH',
  'GgGgGgGgG',
], { r: '#ff4f6e', c: '#7fe0ff', G: '#f7c948', H: '#fff1b0', g: '#c98a1f' }, 13.5, -3)
export function crownCells(ctx) { ctx.save(); ctx.translate(18, 2); ctx.rotate(-0.12); ctx.translate(-18, -2); paintCells(ctx, CROWN); ctx.restore() }
// Capricorn's tie: under the eyes, down the middle
const TIE = fromRows(['WW..WW', '.WkkW.', '..kk..', '..TT..', '.TTsT.', '.TsTT.', '.TTsT.', '..TT..'], { W: '#ffffff', k: '#1c2050', T: '#2f3a8a', s: '#f2c75c' }, 15, 25)
export function tieCells(ctx) { paintCells(ctx, TIE) }
// Pisces: a pearl tiara on the top point + (behind the star) a tulle veil
const TIARA = fromRows(['.p.p.p.', 'PPPPPPP'], { p: '#ffffff', P: '#ffd6f0' }, 14.5, 2)
export function tiaraCells(ctx) { paintCells(ctx, TIARA) }
export function veilCells(ctx, k = 1) {
  if (k <= 0) return
  ctx.save(); ctx.globalAlpha *= 0.55 * clamp(k)
  for (let j = 3; j <= 28; j++) {
    const half = 3 + (j - 3) * 0.62, wav = Math.sin(j * 0.7) * 0.6
    for (let i = Math.round(18 - half + wav); i <= Math.round(18 + half + wav); i++) { ctx.fillStyle = (i + j) % 5 === 0 ? '#ffffff' : '#f4ecff'; ctx.fillRect(i, j, 1.02, 1.02) }
  }
  ctx.restore()
}
/** happy tears from both eyes, k: 1 sniffle · 2 streams · 3 fountains (side: -1 left only, 1 right only, 0 both) */
export function tearsCells(ctx, t, k, side = 0) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    if (side && d !== side) continue
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
/** one big single tear, p 0…1 down the cheek from the right eye (welling first) */
export function dropCell(ctx, p) {
  if (p <= 0) return
  const well = clamp(p * 3), fall = clamp((p - 0.33) / 0.67)
  const x = 25.4 + fall * 1.2, y = 21.2 + 9 * fall * fall
  const s = 0.8 + 0.7 * well
  ctx.fillStyle = INK; ctx.fillRect(x - 0.25, y - 0.25, 1.1 * s + 0.5, 1.6 * s + 0.5)
  ctx.fillStyle = '#8fe3ff'; ctx.fillRect(x, y, 1.1 * s, 1.6 * s)
  ctx.fillStyle = '#ffffff'; ctx.fillRect(x, y, 0.5, 0.5)
}

// ─────────────────────────────────────────────── the "hey" notification (scale 1: 500 × 140, centred on cx, cy)
export const NOTIF = { w: 500, h: 140 }
export function drawHeyNotif(ctx, cx, cy, sc = 1, { alpha = 1, rot = 0, flash = 0, glow = 1, text = 'hey' } = {}) {
  if (alpha <= 0 || sc <= 0) return
  const { w, h } = NOTIF
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(sc, sc)
  // glow + body
  ctx.save(); ctx.shadowColor = `rgba(201,166,255,${0.45 * glow})`; ctx.shadowBlur = 40
  ctx.fillStyle = 'rgba(30,19,64,0.96)'; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 34); ctx.fill(); ctx.restore()
  const g = ctx.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, 'rgba(255,255,255,0.08)'); g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 34); ctx.fill()
  ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(239,230,214,0.32)'; ctx.beginPath(); ctx.roundRect(-w / 2 + 1.5, -h / 2 + 1.5, w - 3, h - 3, 33); ctx.stroke()
  // avatar: a hidden face (card first, face last): a soft silhouette behind frosted glass
  const ax = -w / 2 + 70
  ctx.fillStyle = '#3a2a6e'; ctx.beginPath(); ctx.arc(ax, 0, 42, 0, TAU); ctx.fill()
  ctx.save(); ctx.beginPath(); ctx.arc(ax, 0, 42, 0, TAU); ctx.clip()
  ctx.fillStyle = '#6a58a8'; ctx.beginPath(); ctx.arc(ax, -8, 15, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(ax, 34, 28, 22, 0, 0, TAU); ctx.fill()
  ctx.restore()
  ctx.lineWidth = 4; ctx.strokeStyle = GOLD; ctx.beginPath(); ctx.arc(ax, 0, 42, 0, TAU); ctx.stroke()
  ctx.fillStyle = GOLD; ctx.font = `700 34px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('?', ax, -6)
  // header + time + message
  ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'
  ctx.font = `700 23px ${MONO}`; ctx.fillStyle = GOLD; ctx.fillText('YOUR MATCH', ax + 66, -16)
  ctx.textAlign = 'right'; ctx.fillStyle = 'rgba(239,230,214,0.55)'; ctx.font = `400 22px ${MONO}`; ctx.fillText('now', w / 2 - 30, -16)
  ctx.textAlign = 'left'; ctx.fillStyle = BONE; ctx.font = `700 62px ${INTER}`; ctx.fillText(text, ax + 64, 44)
  if (flash > 0) { ctx.fillStyle = `rgba(255,255,255,${0.85 * flash})`; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 34); ctx.fill(); ctx.lineWidth = 10; ctx.strokeStyle = `rgba(255,255,255,${flash})`; ctx.beginPath(); ctx.roundRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8, 38); ctx.stroke() }
  ctx.restore()
}
/** where the word "hey" sits inside the notification (notification-local, scale 1) */
export const HEY_AT = { x: -250 + 70 + 64 + 52, y: 24, rx: 92, ry: 50 }

// ─────────────────────────────────────────────── chat bubbles
/** a rounded chat bubble centred on (cx, cy). side: 'r' sent (tail bottom-right), 'l' received, null none */
export function drawBubble(ctx, cx, cy, w, h, { fill = '#fbf6ec', text = '', color = INK, font = `700 40px ${INTER}`, side = 'r', alpha = 1, sc = 1, rot = 0, dashed = false, stroke = null } = {}) {
  if (alpha <= 0 || sc <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(sc, sc)
  const r = Math.min(h / 2, 30)
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, r)
  if (side) { const sx = side === 'r' ? w / 2 - 26 : -w / 2 + 26, d = side === 'r' ? 1 : -1; ctx.moveTo(sx - 12 * d, h / 2 - 2); ctx.lineTo(sx + 16 * d, h / 2 + 14); ctx.lineTo(sx + 6 * d, h / 2 - 2) }
  ctx.save(); ctx.shadowColor = 'rgba(6,4,18,0.55)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 5; ctx.fillStyle = fill; ctx.fill(); ctx.restore()
  if (dashed || stroke) { ctx.lineWidth = 3; ctx.strokeStyle = stroke || 'rgba(255,255,255,0.8)'; if (dashed) ctx.setLineDash([10, 7]); ctx.beginPath(); ctx.roundRect(-w / 2 + 2, -h / 2 + 2, w - 4, h - 4, r - 2); ctx.stroke(); ctx.setLineDash([]) }
  if (text) { ctx.fillStyle = color; ctx.font = font; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 3) }
  ctx.restore()
}
/** a "•••" typing bubble (s = scale), dots bounce in turn */
export function drawTyping(ctx, cx, cy, s, t, { alpha = 1, fill = '#fbf6ec', dot = '#5b4a8c' } = {}) {
  if (alpha <= 0 || s <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(cx, cy); ctx.scale(s, s)
  ctx.save(); ctx.shadowColor = 'rgba(6,4,18,0.6)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 4
  ctx.fillStyle = fill; ctx.beginPath(); ctx.roundRect(-46, -28, 92, 56, 28); ctx.fill()
  ctx.beginPath(); ctx.arc(-36, 26, 9, 0, TAU); ctx.fill(); ctx.restore()
  ctx.beginPath(); ctx.arc(-50, 40, 5, 0, TAU); ctx.fillStyle = fill; ctx.fill()
  for (let k = 0; k < 3; k++) {
    const ph = ((t * 2.6 - k * 0.22) % 1 + 1) % 1, up = ph < 0.4 ? Math.sin(ph / 0.4 * Math.PI) : 0
    ctx.fillStyle = dot; ctx.globalAlpha *= 1; ctx.beginPath(); ctx.arc(-22 + k * 22, 2 - up * 9, 8, 0, TAU); ctx.fill()
  }
  ctx.restore()
}

// ─────────────────────────────────────────────── food, pens, cups
const CROI = [
  '.......aaaa.......',
  '.....aabbbbaa.....',
  '...aabcbbbbcbaa...',
  '..abbcbbbbbbcbba..',
  '.abbbcbbbbbbcbbba.',
  'abbbbcbbbbbbcbbbba',
  'abhbbcbbhbbbcbbhba',
  '.abbbcbbbbbbcbbba.',
  '..aaacbbbbbbcaaa..',
  '.....aabbbbaa.....',
  '.......aaaa.......',
]
/** a croissant (18×11 art px) centred on (x, y); bites 0…3 take chunks off the right end */
export function drawCroissant(ctx, x, y, px, bites = 0, rot = -0.2) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  const pal = { a: '#8a4b1c', b: '#e3a24a', c: '#b8702c', h: '#ffd58a' }
  const cut = 18 - Math.round(bites * 3.2)
  const rows = CROI.map((r, j) => [...r].map((ch, i) => { if (i < cut) return ch; const bite = Math.hypot(i - cut, (j - 5) * 0.8) < 2.6; return bite ? '.' : ch }).join('').slice(0, Math.min(18, cut + 3)))
  // outline
  rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) if (pal[r[i]]) { ctx.fillStyle = INK; ctx.fillRect(Math.round((i - 9) * px - px * 0.5), Math.round((j - 5.5) * px - px * 0.5), Math.ceil(px * 2), Math.ceil(px * 2)) } })
  bitmap(ctx, rows, pal, -9 * px, -5.5 * px, px)
  ctx.restore()
}
/** a red marker pen, tip at (x, y), pointing along ang (rad) */
export function drawRedPen(ctx, x, y, px, ang = -0.9) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang)
  const rows = ['.t.', 'ttt', 'RRR', 'RHR', 'RRR', 'RRR', 'RRR', 'RRR', 'WWW', 'RRR', 'RRR', 'DDD', 'DDD']
  const pal = { t: '#ff2e4a', R: '#e8344e', H: '#ff8a9a', W: '#ffffff', D: '#8a1a2c' }
  rows.forEach((r, j) => { for (let i = 0; i < 3; i++) if (pal[r[i]]) { ctx.fillStyle = INK; ctx.fillRect((i - 1.5) * px - px * 0.5, j * px - px * 0.5, px * 2, px * 2) } })
  bitmap(ctx, rows, pal, -1.5 * px, 0, px)
  ctx.restore()
}
/** a takeaway coffee cup (10×13 art px), bottom centre at (x, y) */
export function drawCoffee(ctx, x, y, px, t = 0, steam = true) {
  const rows = ['.LLLLLLLL.', 'LLLLLLLLLL', '.WWWWWWWW.', '.WWWWWWWW.', '.SSSSSSSS.', '.SsSSSSSS.', '.SSSSSSSS.', '..WWWWWW..', '..WWWWWW..', '..WWWWWW..', '...WWWW...']
  const pal = { L: '#5b3a2e', W: '#f6efe2', S: '#b06a3a', s: '#e6a26a' }
  const x0 = x - 5 * px, y0 = y - rows.length * px
  rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) if (pal[r[i]]) { ctx.fillStyle = INK; ctx.fillRect(Math.round(x0 + i * px - px * 0.5), Math.round(y0 + j * px - px * 0.5), Math.ceil(px * 2), Math.ceil(px * 2)) } })
  bitmap(ctx, rows, pal, x0, y0, px)
  if (steam) for (let k = 0; k < 2; k++) { const ph = (t * 0.8 + k * 0.5) % 1; ctx.globalAlpha = Math.sin(Math.PI * ph) * 0.7; R(ctx, x0 + (3 + k * 3) * px + Math.sin(t * 4 + k) * px, y0 - (1 + ph * 4) * px, px, px * 1.5, BONE); ctx.globalAlpha = 1 }
}
/** a pixel heart centred on (x, y) */
export function drawHeart(ctx, x, y, px, col = '#ff4f7e') {
  bitmap(ctx, ['.XX.XX.', 'XWXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'], { X: col, W: '#ffd0dc' }, x - 3.5 * px, y - 3 * px, px)
}
/** a rolling suitcase with a luggage tag, bottom centre at (x, y) */
export function drawSuitcase(ctx, x, y, px, { tag = 'LIS' } = {}) {
  const rows = [
    '....hhhhhh....',
    '....h....h....',
    '..PPPPPPPPPP..',
    '.PQQQQQQQQQQP.',
    '.PQyyQQQQQQQP.',
    '.PQyyQQQQrrQP.',
    '.PQQQQQQQrrQP.',
    '.PQQQQQQQQQQP.',
    '.PbbbbbbbbbbP.',
    '.PQQQQQQQQQQP.',
    '.PQQQQQgggQQP.',
    '.PQQQQQgggQQP.',
    '.PQQQQQQQQQQP.',
    '..PPPPPPPPPP..',
    '..ww......ww..',
  ]
  const pal = { h: '#6e6a8a', P: '#4a2a86', Q: '#8d5bd8', y: '#ffd95a', r: '#ff6b8a', b: '#5d3aa0', g: '#7dffb0', w: '#2a2140' }
  const x0 = x - 7 * px, y0 = y - rows.length * px
  rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) if (pal[r[i]]) { ctx.fillStyle = INK; ctx.fillRect(Math.round(x0 + i * px - px * 0.5), Math.round(y0 + j * px - px * 0.5), Math.ceil(px * 2), Math.ceil(px * 2)) } })
  bitmap(ctx, rows, pal, x0, y0, px)
  // tag on a string
  ctx.strokeStyle = INK; ctx.lineWidth = Math.max(2, px * 0.4); ctx.beginPath(); ctx.moveTo(x0 + 9 * px, y0 + 1 * px); ctx.lineTo(x0 + 13 * px, y0 + 4 * px); ctx.stroke()
  const tx = x0 + 13.5 * px, ty = y0 + 4 * px
  ctx.save(); ctx.translate(tx, ty); ctx.rotate(0.25)
  ctx.fillStyle = INK; ctx.fillRect(-px * 0.5, -px * 0.5, px * 7, px * 4)
  ctx.fillStyle = '#fff6e0'; ctx.fillRect(0, 0, px * 6, px * 3)
  ctx.fillStyle = INK; ctx.font = `700 ${Math.round(px * 2.2)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(tag, px * 3, px * 1.6)
  ctx.restore()
}
/** a pixel airliner (side view, facing right), centred on (x, y) */
export function drawPlane(ctx, x, y, px, { dir = 1 } = {}) {
  const rows = [
    '..........T.............',
    '.........TT.............',
    '........TTT.............',
    '..BBBBBBBBBBBBBBBBBBB...',
    '.BWWWWwWWwWWwWWwWWWWBB..',
    'BWWWWWWWWWWWWWWWWWWWWWB.',
    'BWWWWWWWWWWWWWWWWWWWWWWB',
    '.BBBBBBBBSSSSBBBBBBBBBB.',
    '.........SSSSS..........',
    '..........SSSS..........',
  ]
  const pal = { B: '#c9c3e0', W: '#f4f1ff', w: '#5aa8e0', T: '#e8344e', S: '#9a92c0' }
  ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1)
  rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) if (pal[r[i]]) { ctx.fillStyle = INK; ctx.fillRect(Math.round((i - 12) * px - px * 0.5), Math.round((j - 5) * px - px * 0.5), Math.ceil(px * 2), Math.ceil(px * 2)) } })
  bitmap(ctx, rows, pal, -12 * px, -5 * px, px)
  ctx.restore()
}
/** a small phone with a "hey" thumbnail on its screen + an optional SENT chip */
export function drawMiniPhone(ctx, x, y, w, { rot = 0, sent = 0, alpha = 1, sc = 1 } = {}) {
  if (alpha <= 0 || sc <= 0) return
  const h = w * 1.9
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc)
  ctx.fillStyle = INK; ctx.beginPath(); ctx.roundRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10, 20); ctx.fill()
  ctx.fillStyle = '#4a4f72'; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 16); ctx.fill()
  ctx.fillStyle = '#1d1440'; ctx.beginPath(); ctx.roundRect(-w / 2 + 6, -h / 2 + 6, w - 12, h - 12, 11); ctx.fill()
  // the screenshot on screen
  ctx.fillStyle = '#3a2a6e'; ctx.beginPath(); ctx.roundRect(-w / 2 + 12, -h * 0.18, w - 24, h * 0.22, 8); ctx.fill()
  ctx.fillStyle = BONE; ctx.font = `700 ${Math.round(w * 0.2)}px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('hey', 0, -h * 0.07)
  ctx.fillStyle = 'rgba(242,199,92,0.8)'; ctx.fillRect(-w / 2 + 16, -h * 0.15, w * 0.3, 4)
  if (sent > 0) {
    const k = easeOutBack(clamp(sent), 2.6)
    ctx.save(); ctx.translate(0, h * 0.27); ctx.scale(k, k)
    ctx.fillStyle = INK; ctx.beginPath(); ctx.roundRect(-w * 0.42 - 3, -17, w * 0.84 + 6, 34, 17); ctx.fill()
    ctx.fillStyle = '#46cf82'; ctx.beginPath(); ctx.roundRect(-w * 0.42, -14, w * 0.84, 28, 14); ctx.fill()
    ctx.fillStyle = '#ffffff'; ctx.font = `700 ${Math.round(w * 0.14)}px ${MONO}`; ctx.fillText('SENT ✓', 0, 1)
    ctx.restore()
  }
  ctx.restore()
}
/** Aquarius's meme from 2014: a crusty low-res pixel cat in pixel sunglasses ("MOOD"), size s px square */
export function drawMemeCat(ctx, x, y, s, t = 0) {
  const N = 16, px = s / N, x0 = x - s / 2, y0 = y - s / 2
  const rows = [
    'kkkkkkkkkkkkkkkk',
    'kkkkkkkkkkkkkkkk',
    'kkkooookkooookkk',
    'kkoOOOokkoOOOokk',
    'kkoOOOOOOOOOOokk',
    'kkoOOOOOOOOOOokk',
    'koOssssOOssssOok',
    'koOsSssssSsssOok',
    'koOssssOOssssOok',
    'koOOOOOppOOOOOok',
    'koOOOwOOOOwOOOok',
    'kkoOOOwwwwOOOokk',
    'kkkoOOOOOOOOokkk',
    'kkkkooooooookkkk',
    'kkkkkkkkkkkkkkkk',
    'kkkkkkkkkkkkkkkk',
  ]
  const pal = { k: '#3b6d8f', o: '#6b3a12', O: '#e08a3c', s: '#111111', S: '#cfd8ff', p: '#ff8fb1', w: '#fff3e0' }
  bitmap(ctx, rows, pal, x0, y0, px)
  // jpeg crust: blocky tinted squares, deterministic
  const r = rng(2014)
  for (let i = 0; i < 26; i++) { const bx = Math.floor(r() * 4) * s / 4, by = Math.floor(r() * 4) * s / 4; ctx.fillStyle = `rgba(${r() < 0.5 ? '120,255,140' : '255,90,200'},${0.05 + r() * 0.07})`; ctx.fillRect(x0 + bx, y0 + by, s / 4, s / 4) }
  // caption + watermark
  ctx.font = `900 ${Math.round(s * 0.2)}px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
  ctx.lineWidth = s * 0.03; ctx.strokeStyle = '#000'; ctx.strokeText('MOOD', x, y0 + s * 0.96); ctx.fillStyle = '#fff'; ctx.fillText('MOOD', x, y0 + s * 0.96)
  ctx.font = `700 ${Math.round(s * 0.075)}px ${MONO}`; ctx.textAlign = 'right'; ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.fillText('2014', x0 + s - 6, y0 + s * 0.1)
}

// ─────────────────────────────────────────────── stagecraft
/** a theatre marquee with chasing bulbs, centred on (cx, cy) */
export function drawMarquee(ctx, cx, cy, w, h, t, text, { k = 1 } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k)
  ctx.fillStyle = INK; ctx.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  ctx.fillStyle = '#c0283c'; ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.fillStyle = '#fff3d6'; ctx.fillRect(-w / 2 + 26, -h / 2 + 26, w - 52, h - 52)
  const n = Math.round((w + h) * 2 / 34), per = (w + h) * 2 / n
  for (let i = 0; i < n; i++) {
    let d = i * per, bx, by
    if (d < w) { bx = -w / 2 + d; by = -h / 2 + 13 } else if ((d -= w) < h) { bx = w / 2 - 13; by = -h / 2 + d } else if ((d -= h) < w) { bx = w / 2 - d; by = h / 2 - 13 } else { d -= w; bx = -w / 2 + 13; by = h / 2 - d }
    const on = (i + Math.floor(t * 9)) % 3 === 0
    ctx.fillStyle = on ? '#fff6b0' : '#e0a83c'; ctx.beginPath(); ctx.arc(bx, by, on ? 7 : 5.5, 0, TAU); ctx.fill()
  }
  ctx.fillStyle = '#1b1236'; ctx.font = `800 ${Math.round(h * 0.42)}px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 3)
  ctx.restore()
}
/** a warm spotlight cone (additive) from (cx, top) widening to w1 at bottom */
export function drawSpotlight(ctx, cx, top, bottom, w0, w1, a) {
  if (a <= 0) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createLinearGradient(0, top, 0, bottom); g.addColorStop(0, `rgba(255,236,190,${0.42 * a})`); g.addColorStop(1, `rgba(255,214,150,${0.1 * a})`)
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - w0 / 2, top); ctx.lineTo(cx + w0 / 2, top); ctx.lineTo(cx + w1 / 2, bottom); ctx.lineTo(cx - w1 / 2, bottom); ctx.closePath(); ctx.fill()
  const p = ctx.createRadialGradient(cx, bottom, 0, cx, bottom, w1 * 0.55); p.addColorStop(0, `rgba(255,236,190,${0.28 * a})`); p.addColorStop(1, 'rgba(255,236,190,0)')
  ctx.fillStyle = p; ctx.save(); ctx.translate(cx, bottom); ctx.scale(1, 0.25); ctx.beginPath(); ctx.arc(0, 0, w1 * 0.55, 0, TAU); ctx.restore(); ctx.fill()
  ctx.restore()
}
/** an airport departures board (amber LEDs) centred on (cx, cy) */
export function drawBoard(ctx, cx, cy, w, h, t, rows, { k = 1 } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k)
  ctx.fillStyle = INK; ctx.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  ctx.fillStyle = '#2b2f4a'; ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.fillStyle = '#10121f'; ctx.fillRect(-w / 2 + 12, -h / 2 + 50, w - 24, h - 62)
  ctx.fillStyle = '#ffcf5a'; ctx.font = `700 26px ${MONO}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('DEPARTURES', -w / 2 + 22, -h / 2 + 27)
  ctx.textAlign = 'right'; ctx.fillText('✈', w / 2 - 22, -h / 2 + 27)
  rows.forEach((r, i) => {
    const yy = -h / 2 + 50 + 46 + i * 52
    ctx.font = `700 46px ${MONO}`; ctx.textAlign = 'left'; ctx.fillStyle = '#ffb23a'; ctx.fillText(r[0], -w / 2 + 28, yy)
    const blink = r[2] && Math.floor(t * 3) % 2 === 0
    ctx.textAlign = 'right'; ctx.fillStyle = r[2] ? (blink ? '#7dffb0' : 'rgba(125,255,176,0.35)') : '#ffb23a'; ctx.fillText(r[1], w / 2 - 28, yy)
  })
  ctx.restore()
}
/** a wall planner centred on (cx, cy): month label, a 7×4 day grid; flip 0…1 lifts the current page; write 0…1 pencils a
 *  reply into one cell; check 0…1 stamps a tick */
export function drawPlanner(ctx, cx, cy, w, h, { month = 'JUL', next = null, flip = 0, write = 0, check = 0, label = 'reply' } = {}) {
  ctx.save(); ctx.translate(cx, cy)
  const page = (m, extra) => {
    ctx.fillStyle = INK; ctx.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
    ctx.fillStyle = '#fbf6ec'; ctx.fillRect(-w / 2, -h / 2, w, h)
    ctx.fillStyle = '#2fc79a'; ctx.fillRect(-w / 2, -h / 2, w, 74)
    ctx.fillStyle = '#ffffff'; ctx.font = `800 46px ${INTER}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(m, -w / 2 + 22, -h / 2 + 40)
    ctx.fillStyle = INK; ctx.fillRect(w / 2 - 82, -h / 2 + 20, 62, 38); ctx.fillStyle = '#ffd95a'; ctx.fillRect(w / 2 - 79, -h / 2 + 23, 56, 32)
    ctx.fillStyle = INK; ctx.font = `700 24px ${MONO}`; ctx.textAlign = 'center'; ctx.fillText('Q3', w / 2 - 51, -h / 2 + 40)
    const gx = -w / 2 + 16, gy = -h / 2 + 90, cw = (w - 32) / 7, ch = (h - 106) / 4
    ctx.strokeStyle = 'rgba(27,18,54,0.25)'; ctx.lineWidth = 2
    for (let i = 0; i <= 7; i++) { ctx.beginPath(); ctx.moveTo(gx + i * cw, gy); ctx.lineTo(gx + i * cw, gy + 4 * ch); ctx.stroke() }
    for (let j = 0; j <= 4; j++) { ctx.beginPath(); ctx.moveTo(gx, gy + j * ch); ctx.lineTo(gx + 7 * cw, gy + j * ch); ctx.stroke() }
    ctx.fillStyle = 'rgba(27,18,54,0.45)'; ctx.font = `700 15px ${MONO}`; ctx.textAlign = 'left'
    for (let n = 0; n < 28; n++) ctx.fillText(String(n + 1), gx + (n % 7) * cw + 5, gy + Math.floor(n / 7) * ch + 12)
    if (extra) extra(gx, gy, cw, ch)
  }
  // binding rings
  const rings = () => { for (let i = 0; i < 5; i++) { const rx = -w / 2 + 34 + i * (w - 68) / 4; ctx.fillStyle = INK; ctx.fillRect(rx - 5, -h / 2 - 22, 10, 30); ctx.fillStyle = '#c4bce0'; ctx.fillRect(rx - 3, -h / 2 - 20, 6, 26) } }
  if (next && flip > 0) {
    page(next, null)
    // the old page lifting up and over (squashes towards the top edge)
    const k = 1 - ease.inOutQuad(clamp(flip))
    if (k > 0.02) { ctx.save(); ctx.translate(0, -h / 2); ctx.scale(1, k); ctx.translate(0, h / 2); page(month, null); ctx.fillStyle = `rgba(27,18,54,${0.25 * (1 - k)})`; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.restore() }
  } else page(month, (gx, gy, cw, ch) => {
    if (write > 0) {
      const X = gx + 4 * cw, Y = gy + 2 * ch, ww = cw * 3 - 4
      ctx.fillStyle = 'rgba(47,199,154,0.18)'; ctx.fillRect(X + 2, Y + 2, ww * clamp(write * 1.4), ch - 4)
      ctx.save(); ctx.beginPath(); ctx.rect(X, Y, ww * clamp(write), ch); ctx.clip()
      ctx.fillStyle = '#3a3a50'; ctx.font = `italic 600 30px ${SERIF}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(label, X + 10, Y + ch / 2 + 2)
      ctx.restore()
    }
    if (check > 0) {
      const k = easeOutBack(clamp(check), 2.6), X = gx + 7 * cw - 10, Y = gy + 2 * ch + ch / 2
      ctx.save(); ctx.translate(X, Y); ctx.scale(k, k); ctx.rotate(-0.15)
      ctx.strokeStyle = '#e8344e'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-18, 0); ctx.lineTo(-4, 15); ctx.lineTo(24, -20); ctx.stroke()
      ctx.restore()
    }
  })
  rings()
  ctx.restore()
}
/** a pencil (tip at x, y) */
export function drawPencil(ctx, x, y, px, ang = -2.4) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang)
  const rows = ['.k.', 'kwk', 'www', 'YYY', 'YyY', 'YYY', 'YyY', 'YYY', 'YyY', 'YYY', 'SSS', 'PPP']
  const pal = { k: '#2a2a3a', w: '#f2d2a0', Y: '#ffcf3a', y: '#e0a020', S: '#b8b8c8', P: '#ff8fb1' }
  rows.forEach((r, j) => { for (let i = 0; i < 3; i++) if (pal[r[i]]) { ctx.fillStyle = INK; ctx.fillRect((i - 1.5) * px - px * 0.5, j * px - px * 0.5, px * 2, px * 2) } })
  bitmap(ctx, rows, pal, -1.5 * px, 0, px)
  ctx.restore()
}
/** a puff of dust (k: 0 → 1 over its life), at (x, y) */
export function dustPuff(ctx, x, y, k, { n = 7, spread = 110, seed = 3, col = '#d8cfe8' } = {}) {
  if (k <= 0 || k >= 1) return
  const r = rng(seed)
  ctx.save(); ctx.globalAlpha *= (1 - ease.inQuad(k)) * 0.9
  for (let i = 0; i < n; i++) {
    const a = Math.PI + (r() - 0.5) * 2.2, d = spread * (0.35 + r() * 0.65) * ease.outCubic(k), s = (16 + r() * 22) * (0.6 + 0.8 * k)
    const px = x + Math.cos(a) * d, py = y + Math.sin(a) * d * 0.45 - k * 18
    ctx.fillStyle = INK; ctx.fillRect(Math.round(px - s / 2 - 4), Math.round(py - s / 2 - 4), Math.round(s + 8), Math.round(s + 8))
    ctx.fillStyle = col; ctx.fillRect(Math.round(px - s / 2), Math.round(py - s / 2), Math.round(s), Math.round(s))
    ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(px - s / 2), Math.round(py - s / 2), Math.round(s * 0.4), Math.round(s * 0.3))
  }
  ctx.restore()
}
/** horizontal speed lines from x0 to x1 around y (fading with k 0 → 1) */
export function speedLines(ctx, x0, x1, y, k, { n = 6, h = 220, seed = 5 } = {}) {
  if (k <= 0 || k >= 1) return
  const r = rng(seed)
  ctx.save(); ctx.globalAlpha *= 1 - k
  for (let i = 0; i < n; i++) {
    const yy = y - h / 2 + r() * h, a = x0 + (x1 - x0) * r() * 0.3, b = x1 - (x1 - x0) * r() * 0.2
    ctx.fillStyle = i % 2 ? BONE : '#ffd0c0'; ctx.fillRect(Math.round(Math.min(a, b) + (b - a) * k * 0.5), Math.round(yy), Math.round(Math.abs(b - a) * (1 - k * 0.5)), 6)
  }
  ctx.restore()
}

// ─────────────────────────────────────────────── the rapid-fire text box (DOM)
const PX = 6
function drawPanel(cv, w, h, { m = 24, fill = 'rgba(13,8,32,0.86)', border = GOLD, hair = 'rgba(239,230,214,0.5)' } = {}) {
  const rgbaG = a => `rgba(242,199,92,${a})`
  cv.width = w + 2 * m; cv.height = h + 2 * m
  const x = cv.getContext('2d')
  x.translate(m, m)
  const P = PX
  const stepRect = (o, col) => { x.fillStyle = col; x.fillRect(o + 2 * P, o, w - 2 * o - 4 * P, h - 2 * o); x.fillRect(o, o + 2 * P, w - 2 * o, h - 2 * o - 4 * P); x.fillRect(o + P, o + P, w - 2 * o - 2 * P, h - 2 * o - 2 * P) }
  x.save(); x.shadowColor = rgbaG(0.45); x.shadowBlur = 22; stepRect(0, rgbaG(0.9)); x.restore()
  x.clearRect(P, P, w - 2 * P, h - 2 * P)
  stepRect(0, border)
  x.globalCompositeOperation = 'destination-out'; stepRect(P, '#000'); x.globalCompositeOperation = 'source-over'
  stepRect(P, fill)
  x.strokeStyle = hair; x.lineWidth = P / 2
  const o = 2 * P + P / 4, ww = w - 2 * o, hh = h - 2 * o
  x.beginPath()
  x.moveTo(o + P, o); x.lineTo(o + ww - P, o); x.lineTo(o + ww - P, o + P / 2); x.moveTo(o + ww, o + P); x.lineTo(o + ww, o + hh - P)
  x.moveTo(o + ww - P, o + hh); x.lineTo(o + P, o + hh); x.moveTo(o, o + hh - P); x.lineTo(o, o + P)
  x.stroke()
  x.fillStyle = '#fff1c8'; x.fillRect(2 * P, 0, P * 3, P / 2); x.fillRect(0, 2 * P, P / 2, P * 2)
}
const parseAcc = text => { const out = []; let acc = false; for (const ch of text) { if (ch === '*') { acc = !acc; continue } out.push({ ch, acc }) } return out }
/** the rapid-fire box: lines [{ t, speaker, color, text, rev }] — each line types in `rev` s (one quick burst, no pauses),
 *  shows the ▼ when done and stays until the next line's t (or close). The box itself pops open at `open` and is cut
 *  away at `close` (a hard cut: no close pop). times[i] = { start, done } */
export function rapidBox(parent, { lines, y = 1480, width = 960, height = 250, open, close, size = 52, W = 1080 }) {
  const times = lines.map(L => { const n = parseAcc(L.text).length; return { start: L.t, done: +(L.t + (L.rev ?? 0.2)).toFixed(4), n } })
  const tOpen = open ?? lines[0].t - 0.12, tClose = close
  const M = 24
  const root = el('div', { position: 'absolute', left: ((W - width) / 2) + 'px', top: y + 'px', width: width + 'px', height: height + 'px', transformOrigin: '50% 60%', display: 'none', pointerEvents: 'none' }, parent)
  el('div', { position: 'absolute', left: '6px', top: '6px', right: '6px', bottom: '6px', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }, root)
  const cv = el('canvas', { position: 'absolute', left: -M + 'px', top: -M + 'px', width: (width + 2 * M) + 'px', height: (height + 2 * M) + 'px', imageRendering: 'pixelated' }, root)
  drawPanel(cv, width, height, { m: M })
  const PAD_X = 52, PAD_TOP = 58
  const texts = lines.map((L, n) => {
    const box = el('div', { position: 'absolute', left: PAD_X + 'px', top: PAD_TOP + 'px', width: (width - 2 * PAD_X) + 'px', font: `700 ${size}px ${MONO}`, lineHeight: '1.28',
      color: BONE, letterSpacing: '-0.01em', textShadow: '0 3px 0 rgba(6,4,18,0.85)', display: 'none', whiteSpace: 'normal' }, root)
    const cs = parseAcc(L.text), spans = []
    let word = null
    cs.forEach(({ ch, acc }) => {
      if (ch === ' ') { word = null; box.appendChild(document.createTextNode(' ')); spans.push(null); return }
      if (!word) word = el('span', { display: 'inline-block', whiteSpace: 'nowrap' }, box)
      spans.push(el('span', { visibility: 'hidden', color: acc ? (L.color || GOLD) : BONE }, word, ch === '<' ? '&lt;' : ch === '&' ? '&amp;' : ch))
    })
    return { box, spans, n: cs.length, L }
  })
  // name tags
  const tags = new Map()
  const tagFor = L => {
    const key = L.speaker + '|' + (L.color || '')
    if (tags.has(key)) return tags.get(key)
    const meas = document.createElement('canvas').getContext('2d')
    meas.font = `700 32px ${MONO}`
    const tw = Math.ceil(meas.measureText(L.speaker).width + 0.12 * 32 * L.speaker.length)
    const w = Math.round((tw + 64) / PX) * PX, h = 66
    const t = el('div', { position: 'absolute', left: '40px', top: (-h / 2 - 4) + 'px', width: w + 'px', height: h + 'px', transformOrigin: '20% 100%', display: 'none' }, root)
    const c = el('canvas', { position: 'absolute', left: -M + 'px', top: -M + 'px', width: (w + 2 * M) + 'px', height: (h + 2 * M) + 'px' }, t)
    drawPanel(c, w, h, { m: M, fill: 'rgba(20,12,44,0.97)', hair: 'rgba(239,230,214,0)' })
    el('div', { position: 'absolute', left: 0, top: 0, width: w + 'px', height: h + 'px', display: 'grid', placeItems: 'center', font: `700 32px ${MONO}`, letterSpacing: '0.12em',
      color: L.color || GOLD, textShadow: '0 2px 0 rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, t, L.speaker)
    const rec = { el: t }
    tags.set(key, rec); return rec
  }
  lines.forEach(tagFor)
  const arrow = el('canvas', { position: 'absolute', right: '40px', bottom: '30px', width: (7 * PX) + 'px', height: (5 * PX) + 'px', display: 'none' }, root)
  arrow.width = 7 * PX; arrow.height = 5 * PX
  { const a = arrow.getContext('2d'); ['XXXXXXX', '.XXXXX.', '..XXX..', '...X...'].forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'X') { a.fillStyle = j === 0 && i < 3 ? '#fff1c8' : GOLD; a.fillRect(i * PX, j * PX, PX, PX) } })); a.fillStyle = 'rgba(6,4,18,0.8)'; a.fillRect(PX, 4 * PX, PX * 5, PX) }

  return {
    root, times,
    update(t) {
      const show = t >= tOpen && t < tClose
      root.style.display = show ? 'block' : 'none'
      if (!show) return
      const po = prog(t, tOpen, tOpen + 0.26)
      let cur = -1, seg = -1
      for (let i = 0; i < lines.length; i++) { if (t >= lines[i].t) cur = i; if (t >= (lines[i].seg ?? lines[i].t)) seg = i }
      const bumpT = seg >= 0 ? (lines[seg].seg ?? lines[seg].t) : -9
      const bump = seg > 0 ? 0.035 * Math.sin(Math.PI * prog(t, bumpT, bumpT + 0.16)) : 0
      const sc = lerp(0.6, 1, easeOutBack(po, 2.2)) + bump
      root.style.opacity = String(clamp(po * 3))
      root.style.transform = `scale(${sc.toFixed(4)})`
      texts.forEach((T, i) => {
        const on = i === cur && cur === seg
        T.box.style.display = on ? 'block' : 'none'
        if (!on) return
        const tm = times[i]
        T.spans.forEach((s, k) => { if (s) s.style.visibility = t >= tm.start + (tm.done - tm.start) * (k / Math.max(1, T.n)) ? 'visible' : 'hidden' })
      })
      // the tag: re-pops on every segment (each sign's beat)
      const Lseg = seg >= 0 ? lines[seg] : lines[0]
      const tg = tagFor(Lseg)
      for (const r of tags.values()) r.el.style.display = r === tg ? 'block' : 'none'
      const t0 = seg >= 0 ? Math.max(tOpen + 0.05, bumpT) : tOpen + 0.05
      const pt = easeOutBack(prog(t, t0, t0 + 0.2), 2.6)
      tg.el.style.transform = `scale(${pt.toFixed(4)}) rotate(${((1 - pt) * -6).toFixed(2)}deg)`
      const done = cur >= 0 ? times[cur].done : Infinity
      const aOn = cur >= 0 && cur === seg && t >= done + 0.08
      arrow.style.display = aOn ? 'block' : 'none'
      if (aOn) { const ph = (t - done - 0.08) % 0.6; arrow.style.opacity = ph < 0.4 ? '1' : '0.15'; arrow.style.transform = `translateY(${(Math.round(Math.sin((t - done) * 7) * 1.5) * 3)}px)` }
    },
  }
}
void lerp; void SERIF
