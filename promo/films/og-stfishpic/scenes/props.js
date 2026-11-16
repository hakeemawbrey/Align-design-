// stfishpic props: small pixel drawings on canvas, shared inside this film (STARTALK2.md: "props are shared helpers
// inside your own film folder"). Pure functions of their arguments; nothing touches `document` at module load.
//
//   starFrame(x, y, size, t, opts) / inSprite(ctx, F, fn) / cellToWorld(F, i, j)
//        the exact transform drawStarChar uses for a frame (same maths as startalk.js), so props drawn in sprite CELLS
//        (the 36-cell grid) stay seated on a star through hops and squash.
//   tearsCells(ctx, t, k)        happy/sad tears from both eyes, k: 0 none · 1 sniffle · 2 streams · 3 fountains
//   pearlsCells(ctx, t, jig)     Pisces' pearl necklace (jig 0…1 = the clutch jiggle)
//   bibCells(ctx)                Taurus' dinner bib          glassesCells(ctx)   Virgo's reading glasses
//   crownCells(ctx)              Leo's crown                 sunhatCells(ctx) / backpackCells(ctx)   Sag's travel kit
//   sweatCells(ctx, t, k)        a sweat drop                blinkersCells(ctx) Aquarius' tie-dye headband
//   drawPaddle(ctx, P)           a judge's score paddle (glyph back, score face, ✕, plane, picket), flips + droops
//   drawFork / drawShaker(ctx, x, y, s, rot)  Taurus' dinner kit  drawPen(ctx, x, y, s, rot)   Virgo's red pen
//   drawMirror(ctx, x, y, s, rot, t, F?)  Leo's hand mirror (with a tiny Leo in it)
//   drawDesk(ctx, x0, x1, y, h)  the long judges' desk       drawPlate(ctx, cx, y, glyph, name, color)  a name plate
//   drawDustStar(ctx, x, y, s, k)  the star-shaped dust cloud Aries leaves behind
//   drawHand(ctx, x, y, s, alpha)  the swiping finger
//   confetti(ctx, t, t0, opts)   a confetti cannon burst (analytic drag, pure f(t))
import { clamp, rng } from '../../../src/lib.js'

const TAU = Math.PI * 2
const INK = '#1b1236'
const G = 36, HALF = 18
const SC_Y = 19.6, SC_R = 17.6
const FOOT_ROW = SC_Y + SC_R * Math.cos(Math.PI / 5)
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', 'DejaVu Sans', serif"

// ─────────────────────────────────────────────── star transform (mirrors startalk.js drawStarChar)
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
/** sprite cell → world point (ignores squash; for spawning things that leave the star) */
export const cellToWorld = (F, i, j) => [F.ox - F.S / 2 + i * F.cell, F.oy - F.S / 2 - F.base + j * F.cell]

// ─────────────────────────────────────────────── cell painters
function paintCells(ctx, cells, outline = INK) {
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  if (outline) {
    ctx.fillStyle = outline
    for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b))) ctx.fillRect(i + a, j + b, 1.02, 1.02)
  }
  for (const [i, j, c] of cells) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) }
}
const fromRows = (rows, x0, y0, pal) => {
  const out = []
  rows.forEach((r, j) => [...r].forEach((ch, i) => { if (pal[ch]) out.push([x0 + i, y0 + j, pal[ch]]) }))
  return out
}
const CACHE = new Map()
const cached = (k, f) => { if (!CACHE.has(k)) CACHE.set(k, f()); return CACHE.get(k) }

// ── tears (eyes sit at (13.4, 19.2) and (22.6, 19.2); drops leave the outer corners)
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
// ── Pisces' pearls: a string across the lower body that bounces when it clutches them
export function pearlsCells(ctx, t, jig = 0) {
  const cells = []
  for (let k = 0; k < 9; k++) {
    const u = k / 8, i = 9.6 + u * 16.8
    const sag = 4.6 * Math.sin(Math.PI * u)
    const j = 25.2 + sag + jig * 1.3 * Math.sin(t * 38 + k * 1.1)
    cells.push([Math.round(i), Math.round(j)])
  }
  ctx.fillStyle = INK
  for (const [i, j] of cells) ctx.fillRect(i - 0.5, j - 0.5, 3, 3)
  for (const [i, j] of cells) { ctx.fillStyle = '#f6f1ff'; ctx.fillRect(i, j, 2, 2); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 1, 1); ctx.fillStyle = '#c9c0e6'; ctx.fillRect(i + 1, j + 1, 1, 1) }
}
// ── Taurus' bib: a white napkin with a red check, tucked under the eyes
export function bibCells(ctx) {
  paintCells(ctx, cached('bib', () => fromRows([
    '...WWWWWWWWWW...',
    '..WRWWRWWRWWRW..',
    '..WWWWWWWWWWWW..',
    '..WRWWRWWRWWRW..',
    '...WWWWWWWWWW...',
    '....WRWWRWWR....',
    '.....WWWWWW.....',
  ], 10, 25, { W: '#fbf6ec', R: '#e8495a' })))
}
// ── Virgo's reading glasses: two big frames around the eyes (left eye cells 10–15 × 15–22, right 20–25 × 15–22)
export function glassesCells(ctx) {
  const F = '#3a2457'
  ctx.fillStyle = 'rgba(200,230,255,0.16)'; ctx.fillRect(9, 14, 8, 10); ctx.fillRect(19, 14, 8, 10)
  ctx.fillStyle = F
  for (const x0 of [8, 18]) { ctx.fillRect(x0, 13, 10, 1.02); ctx.fillRect(x0, 23, 10, 1.02); ctx.fillRect(x0, 13, 1.02, 11); ctx.fillRect(x0 + 9, 13, 1.02, 11) }
  ctx.fillRect(17, 16, 2, 1.02)
  ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.fillRect(9, 14, 2, 1); ctx.fillRect(19, 14, 2, 1)
}
// ── Leo's crown (on the top point)
export function crownCells(ctx) {
  paintCells(ctx, cached('crown', () => fromRows([
    'Y...Y...Y',
    'YH.YHY.YY',
    'YHYYYYYYY',
    'YYYYYYYYY',
    'YRYYBYYRY',
    'DDDDDDDDD',
  ], 14, -1, { Y: '#f7c948', H: '#fff4b8', R: '#ff4d6d', B: '#5ec8ff', D: '#c98a1c' })), '#3a1c08')
}
// ── Sag's travel kit: a sun hat and a backpack strap
export function sunhatCells(ctx) {
  paintCells(ctx, cached('sunhat', () => fromRows([
    '.....TTTTTT.....',
    '....TTTTTTTT....',
    '....BBBBBBBB....',
    'TTTTTTTTTTTTTTTT',
  ], 10, 0, { T: '#f0d58c', B: '#e8495a' })), '#4a2e0a')
}
export function backpackCells(ctx) {
  paintCells(ctx, cached('pack', () => fromRows([
    '.GGGGG.',
    'GGHGGGG',
    'GGGGGGG',
    'GYYYYYG',
    'GGGGGGG',
    'GGGGGGG',
    '.GGGGG.',
  ], 1, 18, { G: '#4f9a6a', H: '#7fd09a', Y: '#f7c948' })))
  // the strap over the body
  ctx.fillStyle = '#2f6b48'
  for (let k = 0; k < 9; k++) ctx.fillRect(7 + k, 19 + k * 0.9, 1.02, 1.02)
}
// ── Aquarius' headband (a little activist energy)
export function blinkersCells(ctx) {
  paintCells(ctx, cached('band', () => {
    const out = [], cols = ['#ff6b8b', '#ffd25a', '#7dffb0', '#7fe0ff', '#c9a6ff']
    for (let i = 13; i <= 22; i++) out.push([i, 12, cols[(i - 13) % 5]])
    out.push([23, 12, '#ff6b8b'], [24, 13, '#ffd25a'], [24, 14, '#7dffb0'])
    return out
  }))
}
// ── a sweat drop on the upper right
export function sweatCells(ctx, t, k = 1) {
  if (k <= 0) return
  const y = 9 + ((t * 0.8) % 1) * 3 * k
  paintCells(ctx, [[27, Math.round(y), '#bfefff'], [27, Math.round(y) + 1, '#8fe3ff'], [26, Math.round(y) + 1, '#8fe3ff'], [26, Math.round(y) + 2, '#5fc8f0'], [27, Math.round(y) + 2, '#5fc8f0']])
}

// ─────────────────────────────────────────────── the score paddle
// P = { x, y (paddle head centre), w = 84, h = 68, pivot: [px, py] (handle base; droop rotates about it), rot,
//       flip 0…1 (0 = front, 1 = turned over), front: face, back: face, color, alpha }
// face = { kind: 'glyph' | 'score' | 'x' | 'plane' | 'picket', text, glyph }
const rr = (ctx, x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r) }
function paddleFace(ctx, face, w, h, color) {
  const k = face.kind
  if (k === 'picket') {
    // a hand-lettered protest board: wider, cardboard
    const pw = w * 1.34, ph = h * 1.08
    ctx.fillStyle = INK; rr(ctx, -pw / 2 - 4, -ph / 2 - 4, pw + 8, ph + 8, 6); ctx.fill()
    ctx.fillStyle = '#e9d3a6'; rr(ctx, -pw / 2, -ph / 2, pw, ph, 3); ctx.fill()
    ctx.fillStyle = '#d4b880'; ctx.fillRect(-pw / 2, ph / 2 - 6, pw, 6)
    ctx.font = `900 ${Math.round(h * 0.34)}px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = '#d6303f'; ctx.fillText('FISH', 0, -h * 0.17)
    ctx.fillStyle = '#2a58c8'; ctx.fillText('RIGHTS', 0, h * 0.22)
    return
  }
  // board: ink outline, sign-colour rim, face
  ctx.fillStyle = INK; rr(ctx, -w / 2 - 4, -h / 2 - 4, w + 8, h + 8, 16); ctx.fill()
  ctx.fillStyle = color; rr(ctx, -w / 2, -h / 2, w, h, 13); ctx.fill()
  if (k === 'glyph') {
    ctx.fillStyle = 'rgba(255,255,255,0.22)'; rr(ctx, -w / 2 + 5, -h / 2 + 5, w - 10, h * 0.36, 9); ctx.fill()
    ctx.font = `700 ${Math.round(h * 0.66)}px ${GLYPH_FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = 'rgba(27,18,54,0.55)'; ctx.fillText(face.glyph + '︎', 2, 4)
    ctx.fillStyle = '#fffaf0'; ctx.fillText(face.glyph + '︎', 0, 1)
    return
  }
  const m = 7
  ctx.fillStyle = '#fbf6ec'; rr(ctx, -w / 2 + m, -h / 2 + m, w - 2 * m, h - 2 * m, 8); ctx.fill()
  ctx.fillStyle = 'rgba(27,18,54,0.08)'; ctx.fillRect(-w / 2 + m, h / 2 - m - 6, w - 2 * m, 6)
  if (k === 'score') {
    const txt = String(face.text), fs = txt.length >= 2 ? h * 0.66 : h * 0.74
    ctx.font = `900 ${Math.round(fs)}px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    const tw = ctx.measureText(txt).width, maxW = w - 2 * m - 6
    if (tw > maxW) ctx.font = `900 ${Math.round(fs * maxW / tw)}px ${INTER}`
    ctx.fillStyle = face.ink || INK; ctx.fillText(txt, 0, h * 0.04)
  } else if (k === 'x') {
    ctx.strokeStyle = '#e8344e'; ctx.lineWidth = h * 0.15; ctx.lineCap = 'square'
    const a = h * 0.22
    ctx.beginPath(); ctx.moveTo(-a, -a); ctx.lineTo(a, a); ctx.moveTo(a, -a); ctx.lineTo(-a, a); ctx.stroke()
  } else if (k === 'plane') {
    const c = h / 15
    const rows = ['..X..........', '..XX.........', '..XXX....XX..', 'XXXXXXXXXXXXX', '.XXXXXXXXXXXX', '......XXX....', '.....XXX.....', '....XX.......']
    rows.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'X') { ctx.fillStyle = j === 3 && i > 9 ? '#9fd0ff' : '#3a6bd8'; ctx.fillRect((i - 6.5) * c, (j - 4) * c, c + 0.5, c + 0.5) } }))
  }
}
export function drawPaddle(ctx, P) {
  const { x, y, w = 84, h = 68, pivot, rot = 0, flip = 0, front, back, color, alpha = 1, handle = true } = P
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  if (pivot) { ctx.translate(pivot[0], pivot[1]); ctx.rotate(rot); ctx.translate(-pivot[0], -pivot[1]) }
  // handle (from the head down to the pivot)
  if (handle) {
    const hx = x, hy0 = y + h / 2 - 4, hy1 = pivot ? pivot[1] : y + h / 2 + 80
    ctx.fillStyle = INK; ctx.fillRect(hx - 8, hy0, 16, hy1 - hy0)
    ctx.fillStyle = '#b07a45'; ctx.fillRect(hx - 4, hy0, 8, hy1 - hy0)
    ctx.fillStyle = '#d9a46a'; ctx.fillRect(hx - 4, hy0, 3, hy1 - hy0)
  }
  // the head, flipping around its vertical axis
  const sx = Math.cos(clamp(flip) * Math.PI)
  ctx.translate(x, y); ctx.scale(Math.max(0.04, Math.abs(sx)), 1)
  paddleFace(ctx, sx >= 0 ? front : back, w, h, color)
  ctx.restore()
}

// ─────────────────────────────────────────────── hand props (world px, s = scale of the art)
export function drawShaker(ctx, x, y, s, rot = 0, t = 0, shake = 0) {
  // a salt shaker (x, y = centre), seasoning in progress when shake > 0
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot + shake * 0.35 * Math.sin(t * 30)); ctx.scale(s, s)
  const P = 4
  const rows = ['..MMMM..', '.MmMMmM.', '.MMMMMM.', 'XWWWWWWX', 'XWWWWWWX', 'XWWSSWWX', 'XWSWWWWX', 'XWWSSWWX', 'XWWWWSWX', 'XWWSSWWX', 'XWWWWWWX', '.XXXXXX.']
  ctx.fillStyle = INK; rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') ctx.fillRect(i * P - 2 - 16, j * P - 2 - 24, P + 4, P + 4) }))
  const col = { M: '#c9cbe0', m: '#5d6288', W: '#fbf6ec', S: '#8fa0d8', X: '#e9e2f5' }
  rows.forEach((r, j) => [...r].forEach((c, i) => { if (col[c]) { ctx.fillStyle = col[c]; ctx.fillRect(i * P - 16, j * P - 24, P, P) } }))
  ctx.restore()
  // salt grains
  if (shake > 0) {
    ctx.save(); ctx.fillStyle = '#ffffff'
    for (let k = 0; k < 7; k++) { const ph = (t * 2.2 + k / 7) % 1; ctx.globalAlpha = (1 - ph) * shake; ctx.fillRect(x - 10 * s + (k % 3) * 8 * s, y - 34 * s - ph * 0 + ph * 60 * s * -1 + 0, 3 * s, 3 * s) }
    ctx.restore()
  }
}
export function drawFork(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s)
  const P = 4, fork = ['X.X.X', 'X.X.X', 'XXXXX', '.XXX.', '..X..', '..X..', '..X..', '..X..', '..X..']
  ctx.fillStyle = INK; fork.forEach((r, j) => [...r].forEach((c, i) => { if (c === 'X') ctx.fillRect(i * P - 2 - 10, j * P - 2 - 16, P + 4, P + 4) }))
  fork.forEach((r, j) => [...r].forEach((c, i) => { if (c === 'X') { ctx.fillStyle = j < 2 ? '#ffffff' : '#c9cbe0'; ctx.fillRect(i * P - 10, j * P - 16, P, P) } }))
  ctx.restore()
}
export function drawPen(ctx, x, y, s, rot = 0) {
  // a red marker; (x, y) = the tip
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s)
  ctx.fillStyle = INK; ctx.fillRect(-7, -4, 14, 66); ctx.fillRect(-4, -10, 8, 8)
  ctx.fillStyle = '#e8344e'; ctx.fillRect(-4, 0, 8, 58); ctx.fillStyle = '#ff7a86'; ctx.fillRect(-4, 0, 3, 58)
  ctx.fillStyle = '#fbf6ec'; ctx.fillRect(-4, 18, 8, 10)
  ctx.fillStyle = '#e8344e'; ctx.fillRect(-2, -8, 4, 7)
  ctx.restore()
}
export function drawMirror(ctx, x, y, s, rot, t, inner) {
  // a gold hand mirror; (x, y) = glass centre. `inner(ctx)` paints the reflection (clipped to the glass)
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s)
  ctx.fillStyle = INK; ctx.fillRect(-8, 30, 16, 52)
  ctx.fillStyle = '#d9a12a'; ctx.fillRect(-4, 32, 8, 48); ctx.fillStyle = '#ffe08a'; ctx.fillRect(-4, 32, 3, 48)
  ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(0, 0, 40, 46, 0, 0, TAU); ctx.fill()
  ctx.fillStyle = '#f2c75c'; ctx.beginPath(); ctx.ellipse(0, 0, 36, 42, 0, 0, TAU); ctx.fill()
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, 29, 35, 0, 0, TAU); ctx.clip()
  const g = ctx.createLinearGradient(-30, -36, 30, 36); g.addColorStop(0, '#d8f1ff'); g.addColorStop(1, '#8bb8e8'); ctx.fillStyle = g; ctx.fillRect(-30, -36, 60, 72)
  if (inner) inner(ctx)
  ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillRect(-20 + ((t * 40) % 60) - 10, -36, 8, 72)
  ctx.restore()
  ctx.restore()
}

// ─────────────────────────────────────────────── the judges' desk + name plates
export function drawDesk(ctx, x0, x1, y, h) {
  const P = 8
  ctx.fillStyle = INK; ctx.fillRect(x0, y - P, x1 - x0, h + 2 * P)
  // top surface
  ctx.fillStyle = '#5b4690'; ctx.fillRect(x0, y, x1 - x0, 14)
  ctx.fillStyle = '#8a72c8'; ctx.fillRect(x0, y, x1 - x0, 4)
  ctx.fillStyle = '#f2c75c'; ctx.fillRect(x0, y + 14, x1 - x0, 6)
  ctx.fillStyle = '#fff1c8'; for (let xx = x0 + 40; xx < x1; xx += 254) ctx.fillRect(xx, y + 14, 36, 2)
  // front panel
  ctx.fillStyle = '#2c1f4e'; ctx.fillRect(x0, y + 20, x1 - x0, h - 20)
  ctx.fillStyle = '#3d2c68'; ctx.fillRect(x0, y + 24, x1 - x0, 4)
  ctx.fillStyle = '#1f1538'; ctx.fillRect(x0, y + h - 14, x1 - x0, 14)
  // gold studs along the bottom
  ctx.fillStyle = '#c98a1c'; for (let xx = x0 + 20; xx < x1; xx += 42) ctx.fillRect(xx, y + h - 10, 6, 6)
}
export function drawPlate(ctx, cx, y, glyph, name, color, { w = 112, h = 40, dim = 0 } = {}) {
  ctx.save()
  ctx.fillStyle = INK; ctx.fillRect(cx - w / 2 - 4, y - 4, w + 8, h + 8)
  ctx.fillStyle = '#f2c75c'; ctx.fillRect(cx - w / 2, y, w, h)
  ctx.fillStyle = '#140d26'; ctx.fillRect(cx - w / 2 + 3, y + 3, w - 6, h - 6)
  ctx.font = `700 ${Math.round(h * 0.5)}px ${GLYPH_FONT}`; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'
  const gw = ctx.measureText(glyph + '︎').width
  ctx.font = `700 ${Math.round(h * 0.38)}px ${MONO}`
  const nw = ctx.measureText(name).width
  const tot = gw + 6 + nw, sx = cx - tot / 2
  ctx.font = `700 ${Math.round(h * 0.5)}px ${GLYPH_FONT}`; ctx.fillStyle = color; ctx.fillText(glyph + '︎', sx, y + h / 2 + 1)
  ctx.font = `700 ${Math.round(h * 0.38)}px ${MONO}`; ctx.fillStyle = '#efe6d6'; ctx.fillText(name, sx + gw + 6, y + h / 2 + 2)
  if (dim > 0) { ctx.fillStyle = `rgba(6,4,16,${dim})`; ctx.fillRect(cx - w / 2 - 4, y - 4, w + 8, h + 8) }
  ctx.restore()
}

// ─────────────────────────────────────────────── Aries' exit: a star-shaped dust cloud + speed lines
export function drawDustStar(ctx, x, y, s, k) {
  if (k <= 0) return
  ctx.save(); ctx.globalAlpha *= clamp(k)
  const pts = []
  for (let kk = 0; kk < 10; kk++) { const a = -Math.PI / 2 + kk * Math.PI / 5, rad = (kk % 2 ? 0.21 : 0.48) * s; pts.push([x + Math.cos(a) * rad, y + 4 + Math.sin(a) * rad]) }
  // puffs along the outline
  const r = rng(41)
  for (let kk = 0; kk < 10; kk++) {
    const [ax, ay] = pts[kk], [bx, by] = pts[(kk + 1) % 10]
    for (let q = 0; q < 3; q++) {
      const u = (q + 0.5) / 3, px = ax + (bx - ax) * u + (r() - 0.5) * 6, py = ay + (by - ay) * u + (r() - 0.5) * 6
      ctx.fillStyle = (kk + q) % 3 ? 'rgba(201,191,216,0.85)' : 'rgba(169,156,192,0.85)'
      ctx.beginPath(); ctx.arc(px, py, s * (0.05 + r() * 0.035) * (1.25 - 0.25 * k), 0, TAU); ctx.fill()
    }
  }
  ctx.strokeStyle = 'rgba(255,248,230,0.9)'; ctx.lineWidth = 4; ctx.setLineDash([10, 8]); ctx.lineJoin = 'round'
  ctx.beginPath(); pts.forEach(([px, py], kk) => kk ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.closePath(); ctx.stroke(); ctx.setLineDash([])
  // speed lines toward the exit (right)
  ctx.fillStyle = 'rgba(255,248,230,0.75)'
  for (let q = 0; q < 4; q++) ctx.fillRect(x + s * 0.55 + q * 10, y - 22 + q * 15, 70 - q * 8, 4)
  ctx.restore()
}

// ─────────────────────────────────────────────── the VIBE METER on the desk front (v 0…1)
export function drawVibeMeter(ctx, cx, y, t, v) {
  const N = 16, sw = 36, gap = 7, w = N * sw + (N - 1) * gap + 56, h = 128, x0 = cx - w / 2
  ctx.save()
  ctx.fillStyle = INK; ctx.fillRect(x0 - 6, y - 6, w + 12, h + 12)
  ctx.fillStyle = '#f2c75c'; ctx.fillRect(x0, y, w, h)
  ctx.fillStyle = '#120a26'; ctx.fillRect(x0 + 5, y + 5, w - 10, h - 10)
  ctx.font = `700 22px ${MONO}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#f2c75c'
  ctx.fillText('V I B E   M E T E R', x0 + 28, y + 28)
  const lit = clamp(v) * N
  const max = v > 0.97, low = v < 0.08
  ctx.textAlign = 'right'
  if (max && Math.floor(t * 6) % 2 === 0) { ctx.fillStyle = '#7dffb0'; ctx.fillText('M A X', x0 + w - 28, y + 28) }
  if (low && Math.floor(t * 4) % 2 === 0) { ctx.fillStyle = '#ff5a6a'; ctx.fillText('L O W', x0 + w - 28, y + 28) }
  for (let k = 0; k < N; k++) {
    const sx = x0 + 28 + k * (sw + gap), sy = y + 52
    const col = k < 4 ? '#ff4d5e' : k < 7 ? '#ff9a3c' : k < 11 ? '#ffd84a' : '#5fe08a'
    const on = k < Math.floor(lit) || (k === Math.floor(lit) && lit % 1 > 0.5) || (low && k === 0 && Math.floor(t * 4) % 2 === 0)
    ctx.fillStyle = on ? col : '#2a1d48'; ctx.fillRect(sx, sy, sw, 52)
    if (on) { ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(sx, sy, sw, 8) }
  }
  ctx.restore()
}

// ─────────────────────────────────────────────── the swiping finger (a pixel pointer hand)
const HAND = [
  '....XX......',
  '...XWWX.....',
  '...XWWX.....',
  '...XWWXXX...',
  '...XWWXWWXX.',
  'XX.XWWXWWXWX',
  'XWXXWWWWWWWX',
  'XWWXWWWWWWWX',
  '.XWWWWWWWWWX',
  '..XWWWWWWWX.',
  '...XWWWWWWX.',
  '....XXXXXX..',
]
export function drawHand(ctx, x, y, s, alpha = 1) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  HAND.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; ctx.fillStyle = ch === 'X' ? INK : '#fbf6ec'; ctx.fillRect(x + (i - 4.5) * s, y + j * s, s + 0.5, s + 0.5) }))
  ctx.restore()
}

// ─────────────────────────────────────────────── confetti cannon (pure f(t): analytic drag)
const CONF_COLS = ['#f2c75c', '#ff8fb1', '#c9a6ff', '#7fe0ff', '#efe6d6', '#ff6b5b', '#9cf08a']
export function confetti(ctx, t, t0, { x0 = 540, y0 = 1300, n = 80, spread = 1, up = 1, seed = 1, life = 5.5 } = {}) {
  const dt0 = t - t0
  if (dt0 < 0 || dt0 > life) return
  const r = rng(seed * 977 + 3)
  const k = 1.5, vty = 330
  for (let i = 0; i < n; i++) {
    const delay = r() * 0.18, vx0 = (r() - 0.5) * 2100 * spread, vy0 = -(1500 + r() * 1300) * up, spin = 4 + r() * 9, sz = 12 + r() * 12, col = CONF_COLS[Math.floor(r() * CONF_COLS.length)], ph = r() * TAU, sway = 30 + r() * 50
    const dt = dt0 - delay
    if (dt < 0) continue
    const e = (1 - Math.exp(-k * dt)) / k
    const x = x0 + vx0 * e + Math.sin(dt * 3 + ph) * sway * clamp(dt)
    const y = y0 + vty * dt + (vy0 - vty) * e
    if (y > 2000) continue
    const a = clamp((life - dt0) / 0.6)
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.rotate(ph + dt * spin * 0.4); ctx.scale(Math.cos(dt * spin + ph), 1)
    ctx.fillStyle = col; ctx.fillRect(-sz / 2, -sz * 0.35, sz, sz * 0.7)
    ctx.restore()
  }
}
