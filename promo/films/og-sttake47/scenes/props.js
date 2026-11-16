// sttake47 props: small pixel drawings on canvas, shared inside this film (STARTALK2.md: props are helpers inside your
// own film folder). Every function is a pure draw call; nothing touches `document` at module top level.
//
//   starFrame(x, y, size, t, opts) / inSprite(ctx, F, fn) / cellToWorld(F, i, j)
//        the exact drawStarChar transform (same maths as startalk.js), so props drawn in sprite CELLS (the 36-cell grid)
//        stay seated through hops, bobs and squash.
//   cell props (call inside inSprite):
//     beretCells(ctx, { slide })      the director's black beret on the top point; slide 0…1 pulls it down over the eyes
//     shadesCells(ctx, { askew })      Gemini's "mysterious" sunglasses
//     bibCells(ctx)                    Taurus' red-check napkin, tucked in: ready to eat
//     costumeCells(ctx, kind)          montage costumes: 'tophat' · 'mustache' · 'rose' · 'monocle' · 'bowtie'
//     tearsCells(ctx, t, k)            Pisces' happy tears, k: 1 sniffle · 2 streams · 3 fountains
//   world props:
//     drawSlate(ctx, cx, cy, o)        the clapperboard: YOUR FIRST DATE · SCENE 1 · TAKE nn (open 0…1 = clapstick angle)
//     drawMegaphone(ctx, x, y, ang, P) a cream director's megaphone, mouthpiece at (x, y), pointing along ang
//     drawClipboard(ctx, x, y, P, o)   the script on a clipboard (page 1 = script on, 0 = torn off: a talk card under it)
//     drawDonut(ctx, x, y, P, o)       Taurus' pink donut (bites 0…3)
//     drawTable / drawCandle / drawChair / drawBoom / drawFilmCamera / drawSpotlight   the set
//     drawBurst(ctx, text, x, y, o)    "ACTION!" / "CUT." megaphone bursts
//     drawBubble(ctx, x, y, k, icon)   little chat bubbles with pixel icons ('?', '!', 'cal', 'plane', 'heart')
import { clamp, lerp, rng } from '../../../src/lib.js'

const TAU = Math.PI * 2
export const INK = '#1b1236'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const G = 36, HALF = 18
const SC_Y = 19.6, SC_R = 17.6
const FOOT_ROW = SC_Y + SC_R * Math.cos(Math.PI / 5)
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)) }

// ─────────────────────────────────────────────── the star transform (mirrors startalk.js drawStarChar)
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
/** sprite cell → local point (ignores squash), in the same space the star was drawn in */
export const cellToWorld = (F, i, j) => [F.ox - F.S / 2 + i * F.cell, F.oy - F.S / 2 - F.base + j * F.cell]

// ─────────────────────────────────────────────── cell painting
function paintCells(ctx, cells, outline = INK) {
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  if (outline) {
    ctx.fillStyle = outline
    for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b))) ctx.fillRect(i + a, j + b, 1.02, 1.02)
  }
  for (const [i, j, c] of cells) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) }
}
const ART = new Map()
/** rows of chars → cells (cached per art); pal maps char → colour; '.' = empty */
function art(ctx, id, rows, pal, x0, y0, outline = INK) {
  if (!ART.has(id)) {
    const cells = []
    rows.forEach((row, j) => [...row].forEach((ch, i) => { if (pal[ch]) cells.push([i, j, pal[ch]]) }))
    ART.set(id, cells)
  }
  ctx.save(); ctx.translate(x0, y0); paintCells(ctx, ART.get(id), outline); ctx.restore()
}

// ─────────────────────────────────────────────── cell props
const BERET = ['..........KK....', '.....KKKKKKKK...', '...KKHHKKKKKKK..', '..KHHKKKKKKKKKK.', '.KKKKKKKKKKKKKKK', '..RRRRRRRRRRRRR.']
export function beretCells(ctx, { slide = 0 } = {}) {
  const s = clamp(slide)
  ctx.save()
  ctx.translate(18, 3); ctx.rotate(0.16 - s * 0.32); ctx.translate(-18, -3)
  art(ctx, 'beret', BERET, { K: '#2b2140', H: '#4b3e70', R: '#7a2242' }, 10 - s * 2, -1.5 + s * 13.5)
  ctx.restore()
}
const SHADES = ['XXXXXXXXXXXXXXXXXXXX', 'XLLLLLLLX..XLLLLLLLX', 'XLWLLLLLXXXXLWLLLLLX', 'XLLWLLLLX..XLLWLLLLX', '.XLLLLLX....XLLLLLX.', '..XXXXX......XXXXX..']
export function shadesCells(ctx, { askew = 0 } = {}) {
  ctx.save(); ctx.translate(18, 19); ctx.rotate(askew * 0.32); ctx.translate(-18, -19)
  art(ctx, 'shades', SHADES, { X: '#0d0a1a', L: '#2a2450', W: '#ffffff' }, 8, 15.5, null)
  ctx.restore()
}
const BIB = ['WRWRWRWRWRWR', '.RWRWRWRWRW.', '..WRWRWRWR..', '...RWRWRW...', '....WRWR....', '.....RW.....']
export function bibCells(ctx) { art(ctx, 'bib', BIB, { W: '#fbf5ea', R: '#ff6b7f' }, 12, 25) }

const COSTUME = {
  tophat: { rows: ['...KKKKKKKKKKK...', '...KHKKKKKKKKK...', '...KHKKKKKKKKK...', '...KHKKKKKKKKK...', '...KHKKKKKKKKK...', '...RRRRRRRRRRR...', '...KKKKKKKKKKK...', 'KKKKKKKKKKKKKKKKK', '.KKKKKKKKKKKKKKK.'], pal: { K: '#221a36', H: '#4b3e70', R: '#e8344e' }, x: 9.5, y: -5.5 },
  mustache: { rows: ['...MMMM.MMMM...', '.MMMMMMMMMMMMM.', 'MM..MMM.MMM..MM', 'M.............M'], pal: { M: '#5a3218' }, x: 10.5, y: 23.5 },
  rose: { rows: ['...........RRR.', '..........RRPRR', '.......L..RPRRR', 'GGGGGGGGGGRRRRR', '....L.....RRRR.', '...........RR..'], pal: { R: '#e8344e', P: '#ff8fa3', G: '#2f8a44', L: '#5ccf6a' }, x: 10, y: 21.5 },
  bowtie: { rows: ['BB.....BB', 'BBB...BBB', 'BBBBKBBBB', 'BBB...BBB', 'BB.....BB'], pal: { B: '#e8344e', K: '#9a1c38' }, x: 13.5, y: 26 },
}
export function costumeCells(ctx, kind) {
  if (kind === 'shades') return shadesCells(ctx)
  if (kind === 'monocle') {
    if (!ART.has('monocle')) {
      const cells = []
      for (let j = 12; j <= 27; j++) for (let i = 17; i <= 30; i++) { const d = Math.hypot(i + 0.5 - 23.4, j + 0.5 - 19.2); if (Math.abs(d - 4.6) < 0.62) cells.push([i, j, '#f2c75c']) }
      for (const [i, j] of [[27, 23], [28, 24], [28, 25], [29, 26], [29, 27], [29, 28], [30, 29]]) cells.push([i, j, '#d9a640'])
      ART.set('monocle', cells)
    }
    paintCells(ctx, ART.get('monocle'))
    ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(20.5, 16, 1, 2)
    return
  }
  const c = COSTUME[kind]
  if (c) art(ctx, 'c-' + kind, c.rows, c.pal, c.x, c.y)
}

/** happy tears (cells). Eyes sit at (13.4, 19.2) and (22.6, 19.2); drops leave the outer corners. */
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

// ─────────────────────────────────────────────── the clapperboard
const CHALK = '#f3eef8'
function stripes(ctx, x, y, w, h, phase) {
  R(ctx, x - 5, y - 5, w + 10, h + 10, INK)
  R(ctx, x, y, w, h, '#f6f1fa')
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip()
  ctx.fillStyle = '#16121f'
  for (let k = -1; k < w / 56 + 2; k++) {
    const x0 = x + k * 56 + phase * 28
    ctx.beginPath(); ctx.moveTo(x0, y + h); ctx.lineTo(x0 + 28, y + h); ctx.lineTo(x0 + 28 + h * 0.8, y); ctx.lineTo(x0 + h * 0.8, y); ctx.closePath(); ctx.fill()
  }
  ctx.restore()
}
export function drawSlate(ctx, cx, cy, { k = 1, rot = 0, open = 0, take = '47', title = 'YOUR FIRST DATE', impact = 0, alpha = 1 } = {}) {
  if (k <= 0.01 || alpha <= 0) return
  const BW = 520, BH = 300, SH = 34
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(k, k)
  // drop shadow
  ctx.fillStyle = 'rgba(4,2,12,0.45)'; ctx.fillRect(-BW / 2 + 14, -BH / 2 - SH + 18, BW + 6, BH + SH + 6)
  // board
  R(ctx, -BW / 2 - 6, -BH / 2 - 6, BW + 12, BH + 12, INK)
  R(ctx, -BW / 2, -BH / 2, BW, BH, '#28232f')
  R(ctx, -BW / 2, -BH / 2, BW, 6, '#3a3446')
  ctx.fillStyle = 'rgba(243,238,248,0.85)'
  ctx.fillRect(-BW / 2 + 16, -BH / 2 + 78, BW - 32, 4)
  ctx.fillRect(-BW / 2 + 16, BH / 2 - 64, BW - 32, 4)
  ctx.fillRect(-22, -BH / 2 + 82, 4, BH - 146)
  ctx.textBaseline = 'middle'; ctx.textAlign = 'center'; ctx.fillStyle = CHALK
  ctx.font = `700 40px ${MONO}`; ctx.fillText(title, 0, -BH / 2 + 42)
  ctx.font = `700 22px ${MONO}`; ctx.fillStyle = 'rgba(243,238,248,0.7)'
  ctx.fillText('S C E N E', -136, -BH / 2 + 104); ctx.fillText('T A K E', 124, -BH / 2 + 104)
  ctx.fillStyle = CHALK
  ctx.font = `700 92px ${MONO}`; ctx.fillText('1', -136, 22)
  ctx.font = `700 112px ${MONO}`; ctx.fillText(String(take), 124, 24)
  ctx.font = `700 24px ${MONO}`; ctx.textAlign = 'left'; ctx.fillStyle = 'rgba(243,238,248,0.8)'
  ctx.fillText('DIR. VIRGO', -BW / 2 + 26, BH / 2 - 31)
  ctx.textAlign = 'right'; ctx.fillText('CAM. A', BW / 2 - 26, BH / 2 - 31)
  // the fixed stick + the hinged clapstick
  stripes(ctx, -BW / 2, -BH / 2 - SH - 4, BW, SH, 0)
  ctx.save(); ctx.translate(-BW / 2, -BH / 2 - SH - 4); ctx.rotate(-clamp(open) * 0.5)
  stripes(ctx, 0, -SH - 8, BW, SH, 1)
  ctx.restore()
  R(ctx, -BW / 2 - 12, -BH / 2 - SH - 18, 24, 24, INK); R(ctx, -BW / 2 - 7, -BH / 2 - SH - 13, 14, 14, '#9aa0c8')
  // clap impact lines
  if (impact > 0) {
    ctx.strokeStyle = `rgba(255,248,224,${clamp(impact)})`; ctx.lineWidth = 7; ctx.lineCap = 'round'
    const L = 26 + 40 * (1 - impact)
    for (const [ax, ay] of [[0.2, -1], [0.75, -0.75], [1, -0.15]]) {
      const n = Math.hypot(ax, ay), ux = ax / n, uy = ay / n, x0 = BW / 2 + 16 + ux * 18, y0 = -BH / 2 - SH - 10 + uy * 18
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + ux * L, y0 + uy * L); ctx.stroke()
    }
  }
  ctx.restore()
}

// ─────────────────────────────────────────────── the megaphone
export function drawMegaphone(ctx, x, y, ang, P = 6, { alpha = 1 } = {}) {
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(ang)
  const L = 14 * P, r0 = 1.5 * P, r1 = 5.2 * P
  // handle
  R(ctx, 1.2 * P, 0.8 * P, 2.2 * P, 3.6 * P, INK); R(ctx, 1.6 * P, 1 * P, 1.4 * P, 3 * P, '#4a3d6a')
  // cone
  ctx.lineJoin = 'round'
  const cone = () => { ctx.beginPath(); ctx.moveTo(0, -r0); ctx.lineTo(L, -r1); ctx.lineTo(L, r1); ctx.lineTo(0, r0); ctx.closePath() }
  cone(); ctx.lineWidth = P * 1.3; ctx.strokeStyle = INK; ctx.stroke()
  cone(); ctx.fillStyle = '#f4ead4'; ctx.fill()
  ctx.save(); cone(); ctx.clip()
  ctx.fillStyle = '#dccdb0'; ctx.fillRect(0, 0.6 * P, L, r1)
  ctx.fillStyle = '#fffaf0'; ctx.fillRect(P, -r1, L, 0.8 * P)
  ctx.fillStyle = '#e8344e'; ctx.fillRect(L - 4.2 * P, -r1, 1.6 * P, 2 * r1)
  ctx.fillStyle = '#b8243c'; ctx.fillRect(L - 4.2 * P, 0.6 * P, 1.6 * P, r1)
  ctx.restore()
  // the bell + mouthpiece
  ctx.beginPath(); ctx.ellipse(L, 0, 1.3 * P, r1, 0, 0, TAU); ctx.fillStyle = INK; ctx.fill()
  ctx.beginPath(); ctx.ellipse(L, 0, 0.8 * P, r1 - 0.8 * P, 0, 0, TAU); ctx.fillStyle = '#4a3550'; ctx.fill()
  R(ctx, -1.8 * P, -1.8 * P, 2 * P, 3.6 * P, INK); R(ctx, -1.4 * P, -1.3 * P, 1.4 * P, 2.6 * P, '#5d6288')
  ctx.restore()
}

// ─────────────────────────────────────────────── the clipboard (the script, and the talk card under it)
export function drawClipboard(ctx, x, y, P, { rot = 0, page = 1, card = null, cardBody = 1, glow = 0, alpha = 1 } = {}) {
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot)
  const w = 16, h = 21, ox = -w / 2 * P, oy = -h / 2 * P
  R(ctx, ox - P, oy - P, (w + 2) * P, (h + 2) * P, INK)
  R(ctx, ox, oy, w * P, h * P, '#a8693a'); R(ctx, ox, oy, w * P, P, '#d08a50'); R(ctx, ox, oy + (h - 1) * P, w * P, P, '#7d4a26')
  if (glow > 0) {
    const g = ctx.createRadialGradient(0, P, 0, 0, P, 16 * P)
    g.addColorStop(0, `rgba(255,226,140,${0.75 * glow})`); g.addColorStop(1, 'rgba(255,226,140,0)')
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.fillRect(-18 * P, -18 * P, 36 * P, 38 * P); ctx.restore()
  }
  if (card && page < 1) {
    const cw = 12.2 * P / cardBody, ch = cw * card.height / card.width
    ctx.drawImage(card, -cw / 2, oy + 1.4 * P + (h * P - 1.4 * P) / 2 - ch / 2 + P * 0.3, cw, ch)
  }
  if (page >= 1) {
    R(ctx, ox + 2 * P, oy + 2 * P, (w - 4) * P, (h - 3) * P, '#fbf3e2')
    ctx.fillStyle = '#e8344e'; ctx.font = `700 ${Math.round(2.2 * P)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText('SCRIPT', 0, oy + 5.2 * P)
    const lines = [10, 7, 9, 11, 6, 9]
    lines.forEach((L, k) => R(ctx, ox + 3.2 * P, oy + (8 + k * 2) * P, L * P, P * 0.8, '#5b4a7a'))
  }
  // the clip
  R(ctx, ox + 4.5 * P, oy - 2 * P, 7 * P, 4 * P, INK); R(ctx, ox + 5 * P, oy - 1.5 * P, 6 * P, 3 * P, '#c4bce0'); R(ctx, ox + 5 * P, oy - 1.5 * P, 6 * P, P, '#ffffff')
  ctx.restore()
}
/** one torn half of the script page, tumbling (x, y = centre) */
export function drawPageHalf(ctx, x, y, P, rot, side) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  const w = 6, h = 18, ox = -w / 2 * P, oy = -h / 2 * P
  R(ctx, ox - P * 0.6, oy - P * 0.6, (w + 1.2) * P, (h + 1.2) * P, INK)
  R(ctx, ox, oy, w * P, h * P, '#fbf3e2')
  for (let k = 0; k < 6; k++) R(ctx, ox + (side < 0 ? 1.2 : 0.4) * P, oy + (5 + k * 2) * P, (3 + (k * 7 % 3)) * P, P * 0.8, '#5b4a7a')
  // the torn edge
  ctx.fillStyle = INK
  for (let k = 0; k < h; k += 2) ctx.fillRect(side < 0 ? -ox - P * 0.4 : ox - P * 0.2, oy + k * P, P * 0.6, P)
  ctx.restore()
}

// ─────────────────────────────────────────────── pixel masks with an outline (world px)
function pixelMask(ctx, x0, y0, P, w, h, colorAt) {
  const C = new Array(w * h)
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) C[j * w + i] = colorAt(i, j)
  const on = (i, j) => i >= 0 && j >= 0 && i < w && j < h && !!C[j * w + i]
  ctx.fillStyle = INK
  for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) {
    if (on(i, j)) continue
    if (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1)) ctx.fillRect(x0 + i * P, y0 + j * P, P, P)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const c = C[j * w + i]; if (c) { ctx.fillStyle = c; ctx.fillRect(x0 + i * P, y0 + j * P, P, P) } }
}

// ─────────────────────────────────────────────── the donut
const SPR = ['#7fe0ff', '#ffffff', '#f2c75c', '#9cf08a', '#c9a6ff']
const BITES = [[13.6, 4.2, 2.7], [14.6, 8.2, 2.6], [12.2, 1.2, 2.5]]
export function drawDonut(ctx, x, y, P = 4, { bites = 0, rot = 0 } = {}) {
  ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.rotate(rot)
  const N = 15, hb = Math.floor(clamp(bites, 0, 3))
  pixelMask(ctx, -N / 2 * P, -N / 2 * P, P, N, N, (i, j) => {
    const dx = i + 0.5 - 7.5, dy = j + 0.5 - 7.5, d = Math.hypot(dx, dy)
    if (d > 7.3 || d < 2.7) return null
    for (let b = 0; b < hb; b++) { const [bx, by, br] = BITES[b]; if (Math.hypot(i + 0.5 - bx, j + 0.5 - by) < br) return null }
    const frost = dy < 1.6 + Math.sin(i * 1.7) * 0.9 && d < 6.9
    if (!frost) return d > 6.2 ? '#b8743c' : '#e3a25a'
    const h = (i * 7 + j * 13) % 11
    if (h === 0 || h === 5) return SPR[(i + j) % SPR.length]
    return d < 3.6 || (dx < -2 && dy < -2) ? '#ffc2d6' : '#ff8fb1'
  })
  ctx.restore()
}

// ─────────────────────────────────────────────── the set
export function drawTable(ctx, x, top, w, floorY) {
  const rx = w / 2
  // pedestal + foot
  R(ctx, x - 17, top + 40, 34, floorY - top - 50, INK); R(ctx, x - 11, top + 40, 22, floorY - top - 50, '#3a2a52'); R(ctx, x - 11, top + 40, 6, floorY - top - 50, '#57437a')
  ctx.beginPath(); ctx.ellipse(x, floorY - 8, 78, 13, 0, 0, TAU); ctx.fillStyle = INK; ctx.fill()
  ctx.beginPath(); ctx.ellipse(x, floorY - 10, 70, 9, 0, 0, TAU); ctx.fillStyle = '#4a3868'; ctx.fill()
  // the cloth skirt (scalloped hem)
  ctx.beginPath(); ctx.moveTo(x - rx, top)
  const hem = top + 52
  for (let i = 0; i <= 10; i++) { const xx = x - rx + (i / 10) * w; ctx.lineTo(xx, hem + (i % 2 ? 9 : 0)) }
  ctx.lineTo(x + rx, top); ctx.closePath()
  ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.stroke()
  ctx.fillStyle = '#f7dbe6'; ctx.fill()
  ctx.save(); ctx.clip()
  ctx.fillStyle = '#ebc3d4'; ctx.fillRect(x - rx, hem - 18, w, 40)
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  for (let i = 1; i < 10; i += 2) ctx.fillRect(x - rx + (i / 10) * w - 2, top + 8, 4, 40)
  ctx.restore()
  // the top
  ctx.beginPath(); ctx.ellipse(x, top, rx + 4, 15, 0, 0, TAU); ctx.fillStyle = INK; ctx.fill()
  ctx.beginPath(); ctx.ellipse(x, top - 1, rx, 11, 0, 0, TAU); ctx.fillStyle = '#fff4f8'; ctx.fill()
  ctx.beginPath(); ctx.ellipse(x - 30, top - 4, rx * 0.55, 4, 0, 0, TAU); ctx.fillStyle = '#ffffff'; ctx.fill()
}
/** a candle in a brass dish standing on (x, y); h = wax height px; flare 0…1 = a big happy flame (heart at 1) */
export function drawCandle(ctx, x, y, t, { h = 56, flare = 0, dim = 0 } = {}) {
  const P = 4
  // glow
  const fy = y - 10 - h - 14
  const gk = (0.55 + 0.45 * flare) * (1 - 0.6 * dim) * (0.92 + 0.08 * Math.sin(t * 13) * Math.sin(t * 7.3))
  const g = ctx.createRadialGradient(x, fy, 0, x, fy, 150 + 90 * flare)
  g.addColorStop(0, `rgba(255,200,110,${0.42 * gk})`); g.addColorStop(1, 'rgba(255,200,110,0)')
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.fillRect(x - 260, fy - 260, 520, 520); ctx.restore()
  // dish
  R(ctx, x - 26, y - 12, 52, 12, INK); R(ctx, x - 22, y - 10, 44, 6, '#e0b04a'); R(ctx, x - 22, y - 10, 44, 2, '#ffe08a')
  // wax
  const hh = Math.max(6, Math.round(h / P) * P)
  R(ctx, x - 12, y - 10 - hh - 2, 24, hh + 2, INK); R(ctx, x - 9, y - 10 - hh, 18, hh, '#f6ecd8'); R(ctx, x - 9, y - 10 - hh, 5, hh, '#fffaf0')
  R(ctx, x + 2, y - 10 - hh, 5, Math.min(hh, 14), '#e9dcc0')
  if (hh > 20) { R(ctx, x - 13, y - 10 - hh + 6, 6, 12, INK); R(ctx, x - 12, y - 10 - hh + 6, 4, 10, '#f6ecd8') }
  // wick + flame
  R(ctx, x - 1, y - 10 - hh - 8, 3, 8, '#2a2030')
  const fl = 1 + 0.9 * flare, wob = Math.round(Math.sin(t * 17) * 1.2)
  const by = y - 10 - hh - 6
  ctx.save(); ctx.translate(x + wob, by); ctx.scale(fl, fl)
  if (flare > 0.75) {
    // a little heart-shaped flame
    for (const [rows, col] of [[['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'], '#ff8a3a'], [['.......', '.YY.YY.', '.YYYYY.', '..YYY..', '...Y...', '.......'], '#ffd95a']])
      rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') { ctx.fillStyle = col; ctx.fillRect((i - 3.5) * 3, (j - 7) * 3, 3, 3) } }))
  } else {
    const rows = ['...O...', '..OOO..', '..OYO..', '.OOYOO.', '.OYWYO.', '.OYWYO.', '..OYO..']
    rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') { ctx.fillStyle = c === 'O' ? '#ff8a3a' : c === 'Y' ? '#ffd95a' : '#fffbe8'; ctx.fillRect((i - 3.5) * 3, (j - 7) * 3, 3, 3) } }))
  }
  ctx.restore()
}
/** a bistro chair; the seat top at seatY; side = which side the back hoop is on (−1 left, +1 right) */
export function drawChair(ctx, x, seatY, floorY, side = -1) {
  const M = '#2c2147', MH = '#6a5a9a'
  ctx.lineCap = 'round'
  const line = (x0, y0, x1, y1, w, c) => { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke() }
  // back hoop (behind the sitter)
  const bx = x + side * 40
  ctx.beginPath(); ctx.ellipse(bx, seatY - 92, 58, 92, 0, Math.PI, TAU); ctx.lineWidth = 15; ctx.strokeStyle = INK; ctx.stroke()
  ctx.lineWidth = 8; ctx.strokeStyle = M; ctx.stroke()
  line(bx - 58, seatY - 92, bx - 58, seatY, 15, INK); line(bx + 58, seatY - 92, bx + 58, seatY, 15, INK)
  line(bx - 58, seatY - 92, bx - 58, seatY, 8, M); line(bx + 58, seatY - 92, bx + 58, seatY, 8, M)
  // legs (back pair darker)
  for (const [dx, f, c] of [[-46, 0.6, '#1e1733'], [46, 0.6, '#1e1733'], [-66, 1, M], [66, 1, M]]) {
    line(x + dx * 0.9, seatY + 8, x + dx, floorY - 2, 13, INK); line(x + dx * 0.9, seatY + 8, x + dx, floorY - 2, 7, c)
    if (f === 1) line(x + dx * 0.9 - 2, seatY + 12, x + dx - 2, floorY - 10, 2, MH)
  }
  line(x - 60, seatY + 70, x + 60, seatY + 70, 10, INK); line(x - 60, seatY + 70, x + 60, seatY + 70, 5, M)
  // seat
  R(ctx, x - 84, seatY - 4, 168, 22, INK); R(ctx, x - 80, seatY, 160, 14, '#a8693a'); R(ctx, x - 80, seatY, 160, 4, '#d08a50')
}
/** the boom: a pole from tail through the grip to the mic (a fuzzy windscreen) */
export function drawBoom(ctx, tail, mic, t) {
  const ang = Math.atan2(mic[1] - tail[1], mic[0] - tail[0])
  ctx.lineCap = 'round'
  ctx.strokeStyle = INK; ctx.lineWidth = 15; ctx.beginPath(); ctx.moveTo(tail[0], tail[1]); ctx.lineTo(mic[0], mic[1]); ctx.stroke()
  ctx.strokeStyle = '#8d93bd'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(tail[0], tail[1]); ctx.lineTo(mic[0], mic[1]); ctx.stroke()
  ctx.strokeStyle = '#c6cbeb'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(tail[0], tail[1] - 2); ctx.lineTo(mic[0], mic[1] - 2); ctx.stroke()
  // the windscreen ("dead cat"), hanging under the pole end
  ctx.save(); ctx.translate(mic[0], mic[1]); ctx.rotate(ang)
  const r = rng(5)
  ctx.fillStyle = INK
  for (let i = 0; i < 46; i++) { const a = (i / 46) * TAU, l = 7 + r() * 9, ex = Math.cos(a) * (50 + l), ey = Math.sin(a) * (22 + l * 0.7); ctx.fillRect(ex - 4, ey - 4, 8, 8) }
  ctx.beginPath(); ctx.ellipse(0, 0, 54, 26, 0, 0, TAU); ctx.fill()
  for (let i = 0; i < 46; i++) { const a = (i / 46) * TAU + 0.07, w2 = Math.sin(t * 3 + i) * 2, l = 4 + ((i * 7) % 6), ex = Math.cos(a) * (46 + l + w2), ey = Math.sin(a) * (19 + l * 0.6); ctx.fillStyle = i % 3 ? '#b9b1cb' : '#d8d1e6'; ctx.fillRect(ex - 3, ey - 3, 6, 6) }
  ctx.beginPath(); ctx.ellipse(0, 0, 47, 20, 0, 0, TAU); ctx.fillStyle = '#a49bb9'; ctx.fill()
  ctx.fillStyle = '#c9c1da'; for (let i = 0; i < 9; i++) ctx.fillRect(-36 + i * 8, -14 + ((i * 5) % 7), 5, 5)
  ctx.restore()
}
export function drawFilmCamera(ctx, x, y, t, { spin = 0, tally = 0, floorY = 1488 } = {}) {
  const line = (x0, y0, x1, y1, w, c) => { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke() }
  // tripod
  for (const [dx, c] of [[0, '#2a1d48'], [-62, '#3e2c66'], [62, '#3e2c66']]) { line(x, y + 40, x + dx, floorY, 15, INK); line(x, y + 40, x + dx, floorY, 8, c) }
  R(ctx, x - 22, y + 30, 44, 18, INK); R(ctx, x - 18, y + 33, 36, 12, '#5b4690')
  // reels (behind the body top)
  for (const [rx, ry, rr, ph] of [[x - 38, y - 76, 38, 0], [x + 44, y - 70, 32, 0.6]]) {
    ctx.beginPath(); ctx.arc(rx, ry, rr + 5, 0, TAU); ctx.fillStyle = INK; ctx.fill()
    ctx.beginPath(); ctx.arc(rx, ry, rr, 0, TAU); ctx.fillStyle = '#4a3a78'; ctx.fill()
    ctx.beginPath(); ctx.arc(rx, ry, rr * 0.62, 0, TAU); ctx.fillStyle = '#2a1d48'; ctx.fill()
    for (let k = 0; k < 3; k++) {
      const a = spin * (rr > 35 ? 1 : 1.3) + ph + k * TAU / 3
      ctx.beginPath(); ctx.arc(rx + Math.cos(a) * rr * 0.62, ry + Math.sin(a) * rr * 0.62, rr * 0.2, 0, TAU); ctx.fillStyle = '#8a72c8'; ctx.fill()
    }
    ctx.beginPath(); ctx.arc(rx, ry, 6, 0, TAU); ctx.fillStyle = '#f2c75c'; ctx.fill()
  }
  line(x - 38, y - 38, x + 44, y - 38, 5, INK)
  // body
  R(ctx, x - 86, y - 46, 172, 98, INK); R(ctx, x - 80, y - 40, 160, 86, '#3e2c66')
  R(ctx, x - 80, y - 40, 160, 8, '#5b4690'); R(ctx, x - 80, y + 38, 160, 8, '#2a1d48')
  R(ctx, x - 60, y - 22, 90, 34, '#2a1d48'); R(ctx, x - 56, y - 18, 82, 4, '#5b4690')
  // lens (pointing left, at the set)
  R(ctx, x - 132, y - 30, 50, 60, INK); R(ctx, x - 126, y - 24, 44, 48, '#5b4690'); R(ctx, x - 126, y - 24, 44, 6, '#7a63b4')
  R(ctx, x - 150, y - 38, 22, 76, INK); R(ctx, x - 146, y - 32, 14, 64, '#2a1d48')
  ctx.fillStyle = '#7fe0ff'; ctx.globalAlpha = 0.6; ctx.fillRect(x - 146, y - 20, 4, 18); ctx.globalAlpha = 1
  // tally light
  const on = tally > 0 && Math.floor(t * 2.4) % 2 === 0
  R(ctx, x + 46, y - 26, 22, 22, INK); R(ctx, x + 50, y - 22, 14, 14, on ? '#ff4a5e' : '#5a2434')
  if (on) { const g = ctx.createRadialGradient(x + 57, y - 15, 0, x + 57, y - 15, 40); g.addColorStop(0, 'rgba(255,74,94,0.5)'); g.addColorStop(1, 'rgba(255,74,94,0)'); ctx.fillStyle = g; ctx.fillRect(x + 17, y - 55, 80, 80) }
}
/** the stage light: a hanging can light at (x, y) and its cone down to the floor pool */
export function drawSpotlight(ctx, x, y, floorY, { k = 1, t = 0 } = {}) {
  const kk = clamp(k) * (0.96 + 0.04 * Math.sin(t * 9.1) * Math.sin(t * 5.3))
  if (kk > 0) {
    ctx.save(); ctx.globalCompositeOperation = 'lighter'
    const g = ctx.createLinearGradient(0, y, 0, floorY)
    g.addColorStop(0, `rgba(255,240,205,${0.2 * kk})`); g.addColorStop(1, `rgba(255,236,200,${0.07 * kk})`)
    ctx.fillStyle = g
    ctx.beginPath(); ctx.moveTo(x - 30, y + 24); ctx.lineTo(x + 30, y + 24); ctx.lineTo(x + 370, floorY); ctx.lineTo(x - 370, floorY); ctx.closePath(); ctx.fill()
    const p = ctx.createRadialGradient(x, floorY, 0, x, floorY, 380)
    p.addColorStop(0, `rgba(255,236,200,${0.22 * kk})`); p.addColorStop(1, 'rgba(255,236,200,0)')
    ctx.fillStyle = p; ctx.save(); ctx.translate(x, floorY); ctx.scale(1, 0.13); ctx.beginPath(); ctx.arc(0, 0, 380, 0, TAU); ctx.restore(); ctx.fill()
    ctx.restore()
  }
  // the fixture
  R(ctx, x - 3, y - 80, 6, 60, INK)
  R(ctx, x - 40, y - 26, 80, 46, INK); R(ctx, x - 34, y - 20, 68, 34, '#3e2c66'); R(ctx, x - 34, y - 20, 68, 6, '#5b4690')
  R(ctx, x - 46, y + 14, 92, 14, INK); R(ctx, x - 40, y + 17, 80, 8, kk > 0.3 ? '#fff1c8' : '#7a6a8a')
}

// ─────────────────────────────────────────────── type on the canvas
/** a megaphone burst: thick ink outline, bright fill, a light top edge */
export function drawBurst(ctx, text, x, y, { size = 120, fill = '#ffd95a', k = 1, rot = 0, alpha = 1, font = INTER, weight = 800 } = {}) {
  if (k <= 0.01 || alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= clamp(alpha); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k)
  ctx.font = `${weight} ${size}px ${font}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'
  ctx.lineWidth = size * 0.2; ctx.strokeStyle = INK; ctx.strokeText(text, 0, size * 0.06)
  ctx.strokeText(text, 0, 0)
  ctx.fillStyle = fill; ctx.fillText(text, 0, 0)
  ctx.restore()
}

// ─────────────────────────────────────────────── chat bubbles with pixel icons
const ICONS = {
  '?': { rows: ['.XXXX.', 'XX..XX', '....XX', '...XX.', '..XX..', '..XX..', '......', '..XX..'], c: '#6a4cff' },
  '!': { rows: ['..XX..', '..XX..', '..XX..', '..XX..', '..XX..', '......', '..XX..', '..XX..'], c: '#e8344e' },
  heart: { rows: ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'], c: '#ff4f7f' },
  cal: { rows: ['.X...X.', 'RRRRRRR', 'RRRRRRR', 'WWWWWWW', 'WXWXWXW', 'WWWWWWW', 'WXWXWWW', 'WWWWWWW'], c: '#e8344e' },
  plane: { rows: ['......X', '....XXX', '..XXXX.', 'XXXXXX.', '..XXXX.', '...XX..', '...X...'], c: '#3fb6f0' },
}
export function drawBubble(ctx, x, y, k, icon, { flip = false } = {}) {
  if (k <= 0.01) return
  ctx.save(); ctx.translate(x, y); ctx.scale(k * (flip ? -1 : 1), k)
  const w = 84, h = 74
  ctx.fillStyle = INK; ctx.beginPath(); ctx.roundRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12, 20); ctx.fill()
  ctx.beginPath(); ctx.moveTo(-12, h / 2); ctx.lineTo(-30, h / 2 + 30); ctx.lineTo(8, h / 2); ctx.fill()
  ctx.fillStyle = '#fbf6ec'; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 15); ctx.fill()
  ctx.beginPath(); ctx.moveTo(-8, h / 2 - 2); ctx.lineTo(-22, h / 2 + 18); ctx.lineTo(2, h / 2 - 2); ctx.fill()
  ctx.scale(flip ? -1 : 1, 1)
  const ic = ICONS[icon], P = 6
  if (ic) {
    const rw = ic.rows[0].length, rh = ic.rows.length
    ic.rows.forEach((r, j) => [...r].forEach((ch, i) => {
      if (ch === '.') return
      ctx.fillStyle = ch === 'W' ? '#ffffff' : ch === 'R' ? ic.c : ch === 'X' && icon === 'cal' ? INK : ic.c
      ctx.fillRect((i - rw / 2) * P, (j - rh / 2) * P, P, P)
    }))
  }
  ctx.restore()
}
export { lerp }
