// stpreviously props — small pixel drawings on canvas, kept inside this film's folder (STARTALK2.md: props are shared
// helpers inside your own film). Pure functions of their arguments; nothing touches `document` at module load.
//
//   starFrame(x, y, size, t, opts) / inSprite(ctx, F, fn) / cellToWorld(F, i, j)
//        the exact transform drawStarChar uses for a frame (same maths as startalk.js), so props drawn in sprite CELLS
//        (the 36-cell grid) stay seated on a star through hops and squash.
//   monocleCells(ctx, glint)          the narrator's gold monocle around the left eye (+ its little chain), in cells.
//   monocleWorld(ctx, x, y, cell, rot) the same monocle flying loose (world px, centred on the lens).
//   pillowCells(ctx, k, peek)         a throw pillow held up over the face (Capricorn can't watch). k 0…1 raised,
//                                     peek 0…1 drops it under the eyes for a look.
//   tearsCells(ctx, t, k)             happy/sad tears: 1 sniffle · 2 streams · 3 fountains.
//   tissueBoxCells(ctx, tissue)       a tissue box held in front of the lower body, a tissue poking out (cells).
//   tissueWorld(ctx, x, y, cell, rot, a)   a loose tissue (world px).
//   drawSofa(ctx, S, part)            the velvet binge-watching sofa: part 'back' (behind the cast) or 'front' (the seat
//                                     edge + arms, drawn over their lower points).
//   drawVintageMic(ctx, x, y, s, rot) a chrome announcer's mic on a short stand; (x, y) = the foot of the stand.
//   drawHeart(ctx, x, y, cell, t, crack, split)   the big pixel heart; crack 0…1 draws the zigzag, split 0…1 parts the halves.
//   drawBat(ctx, x, y, cell, t)       a flapping pixel bat.
//   drawReceipt(ctx, x, y, w, h)      Scorpio's receipt (tally marks: six days), (x, y) = top-left.
//   confetti(ctx, t, t0, opts)        a confetti burst (pure f(t)).
//   drawPixels(ctx, bm, x, y, cell, pal, opts)  generic bitmap painter ('.' = empty).
import { clamp, rng } from '../../../src/lib.js'

const TAU = Math.PI * 2
const INK = '#1b1236'
const G = 36, HALF = 18
const SC_Y = 19.6, SC_R = 17.6
const FOOT_ROW = SC_Y + SC_R * Math.cos(Math.PI / 5)
const BM = s => s.trim().split(/\s+/)

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
/** sprite cell → world point (ignores squash; for spawning things that leave the star) */
export const cellToWorld = (F, i, j) => [F.ox - F.S / 2 + i * F.cell, F.oy - F.S / 2 - F.base + j * F.cell]

// ── cell painter with a 1-cell ink outline
function paintCells(ctx, cells, outline = INK) {
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  if (outline) {
    ctx.fillStyle = outline
    for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b))) ctx.fillRect(i + a, j + b, 1.02, 1.02)
  }
  for (const [i, j, c] of cells) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) }
}

export function drawPixels(ctx, bm, x, y, cell, pal, { rot = 0, ax = 0.5, ay = 0.5, outline = null, alpha = 1, flip = false } = {}) {
  const w = bm[0].length, h = bm.length
  ctx.save()
  ctx.globalAlpha *= alpha
  ctx.translate(x, y); if (rot) ctx.rotate(rot); if (flip) ctx.scale(-1, 1)
  const ox = -w * cell * ax, oy = -h * cell * ay
  const c = Math.ceil(cell) + 0.5
  if (outline) {
    ctx.fillStyle = outline
    bm.forEach((row, j) => [...row].forEach((ch, i) => {
      if (ch === '.') return
      for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const r2 = bm[j + b], ch2 = r2 ? r2[i + a] : undefined
        if (!ch2 || ch2 === '.') ctx.fillRect(ox + (i + a) * cell, oy + (j + b) * cell, c, c)
      }
    }))
  }
  bm.forEach((row, j) => [...row].forEach((ch, i) => {
    if (ch === '.' || !pal[ch]) return
    ctx.fillStyle = pal[ch]; ctx.fillRect(ox + i * cell, oy + j * cell, c, c)
  }))
  ctx.restore()
}

// ── the monocle: a gold ring around the left eye (eye bitmap spans cells 10–15 × 15–22, centre ≈ 12.9, 18.9)
export const MON = { x: 12.9, y: 18.9, r0: 4.75, r1: 5.85 }
let MON_CELLS = null
function monocleList() {
  if (MON_CELLS) return MON_CELLS
  const out = []
  for (let j = 10; j < 30; j++) for (let i = 4; i < 23; i++) {
    const d = Math.hypot(i + 0.5 - MON.x, j + 0.5 - MON.y)
    if (d >= MON.r0 && d < MON.r1) out.push([i, j, (i + 0.5 - MON.x) + (j + 0.5 - MON.y) < -3 ? '#fff1c8' : (i + 0.5 - MON.x) + (j + 0.5 - MON.y) > 4 ? '#c98a1c' : '#f2c75c'])
  }
  MON_CELLS = out; return out
}
export function monocleCells(ctx, glint = 0) {
  // the chain: a little droop from the ring's lower right
  ctx.fillStyle = '#f2c75c'
  for (const [i, j] of [[17, 23], [17.6, 24.2], [18, 25.4], [18.2, 26.6], [18.1, 27.8], [17.8, 29]]) ctx.fillRect(i, j, 0.7, 0.7)
  paintCells(ctx, monocleList())
  // lens sheen
  ctx.fillStyle = 'rgba(255,255,255,0.16)'
  ctx.fillRect(9.5, 15.2, 2, 1); ctx.fillRect(9.2, 16.2, 1, 1.6)
  if (glint > 0) {
    ctx.save(); ctx.globalAlpha = clamp(glint)
    ctx.fillStyle = '#ffffff'
    const gx = 9.2, gy = 14.6, L = 2.6 * glint + 0.8
    ctx.fillRect(gx - 0.5, gy - L, 1, 2 * L); ctx.fillRect(gx - L, gy - 0.5, 2 * L, 1)
    ctx.restore()
  }
}
/** a monocle in flight, centred on its lens */
export function monocleWorld(ctx, x, y, cell, rot = 0, alpha = 1) {
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(cell, cell); ctx.translate(-MON.x, -MON.y)
  monocleCells(ctx, 0); ctx.restore()
}

// ── a throw pillow held up over the face (Capricorn can't watch). k: 0 in the lap … 1 over the eyes; peek drops it
//    below the eyes for a look. Cells; the pillow is 16 × 12 with gold piping and corner tassels.
const PILLOW = BM(`
MM............MM
MMMMMMMMMMMMMMMM
.MHHHHMMMMMMMMM.
.MHMMMMMMMMMMSM.
..MMMMMMMMMMMS..
..MMMMMMBMMMMS..
..MMMMMMMMMMMS..
.MMMMMMMMMMMMSM.
.MMMMMMMMMMMSSM.
MMMMMMMMMMMMMMMM
MM............MM`)
const PILLOW_PAL = { M: '#ffc9dc', H: '#ffffff', S: '#e88fb0', B: '#b04d78' }
export function pillowCells(ctx, k, peek = 0) {
  if (k <= 0) return
  const oy = Math.round((1 - k) * 14 + peek * 8), ox = 10, y0 = 14 + oy
  const cells = []
  PILLOW.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') cells.push([ox + i, y0 + j, PILLOW_PAL[ch]]) }))
  paintCells(ctx, cells)
}

// ── tears (cells). Eyes sit at (13.4, 19.2) and (22.6, 19.2); drops leave the outer corners.
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

// ── tissue box (cells), held in front of the lower body; tissue 0…1 = how far a tissue pokes out
const TBOX = BM(`
.LLLLLLLLLLLL.
LHHHHHDDHHHHHL
LHHHDDDDDDHHHL
LPPPPPPPPPPPPL
LPPWPPPPPPWPPL
LPPPPPPPPPPPPL
LPPPPWPPPWPPPL
LPPPPPPPPPPPPL
.LLLLLLLLLLLL.`)
const TBOX_PAL = { L: '#7fd6ff', H: '#c9eeff', D: '#1d2a52', P: '#5ab8ef', W: '#e9f8ff' }
export function tissueBoxCells(ctx, tissue = 0.5, x0 = 11, y0 = 25) {
  // tissue (behind the box top)
  const up = Math.round(1 + 4 * clamp(tissue))
  const cells = []
  for (let j = 0; j < up + 1; j++) for (let i = -1; i <= 1 + (j < 2 ? 1 : 0); i++) cells.push([x0 + 6 + i + (j > 2 ? 1 : 0), y0 + 1 - j, j === up ? '#ffffff' : '#f6f2ea'])
  paintCells(ctx, cells)
  TBOX.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; ctx.fillStyle = TBOX_PAL[ch]; ctx.fillRect(x0 + i, y0 + j, 1.02, 1.02) }))
  ctx.fillStyle = INK
  ctx.fillRect(x0, y0 + 9, 14, 0.5)
}
/** a loose tissue, world px */
export function tissueWorld(ctx, x, y, cell, rot = 0, a = 1) {
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot)
  const c = cell
  ctx.fillStyle = INK; ctx.fillRect(-3.5 * c, -2.5 * c, 7 * c, 5 * c)
  ctx.fillStyle = '#fbf7ee'; ctx.fillRect(-3 * c, -2 * c, 6 * c, 4 * c)
  ctx.fillStyle = '#ddd6e8'; ctx.fillRect(-3 * c, 1 * c, 6 * c, c); ctx.fillRect(1 * c, -2 * c, c, 3 * c)
  ctx.restore()
}

// ── the sofa. S = { x0, x1, backTop, seatTop, bottom, arm }
const VEL = { body: '#5b2a6e', hi: '#7d3f93', shade: '#3e1a4d', deep: '#2a1036', gold: '#f2c75c', goldD: '#b98a2a' }
const step = (ctx, x, y, w, h, P, col) => { ctx.fillStyle = col; ctx.fillRect(x + 2 * P, y, w - 4 * P, h); ctx.fillRect(x, y + 2 * P, w, h - 4 * P); ctx.fillRect(x + P, y + P, w - 2 * P, h - 2 * P) }
export function drawSofa(ctx, S, part) {
  const P = 8
  if (part === 'back') {
    const x = S.x0 + S.arm - 18, w = S.x1 - S.x0 - 2 * S.arm + 36, y = S.backTop, h = S.seatTop - S.backTop + 40
    step(ctx, x - P, y - P, w + 2 * P, h + 2 * P, P, INK)
    step(ctx, x, y, w, h, P, VEL.body)
    ctx.fillStyle = VEL.hi; ctx.fillRect(x + 3 * P, y + P, w - 6 * P, P)
    ctx.fillStyle = VEL.gold; ctx.fillRect(x + 2 * P, y, w - 4 * P, P / 2)
    // channel tufting: vertical seams + buttons
    const n = 8
    for (let k = 1; k < n; k++) {
      const sx = Math.round(x + (w * k) / n)
      ctx.fillStyle = VEL.shade; ctx.fillRect(sx - 2, y + 3 * P, 4, h - 6 * P)
      ctx.fillStyle = VEL.deep; ctx.fillRect(sx - 5, y + 9 * P - 5, 10, 10)
      ctx.fillStyle = VEL.hi; ctx.fillRect(sx - 5, y + 9 * P - 5, 4, 4)
    }
    ctx.fillStyle = VEL.deep; ctx.fillRect(x + P, y + h - 3 * P, w - 2 * P, 2 * P)
    return
  }
  // front: the seat edge and the arms
  const sx = S.x0 + S.arm - 10, sw = S.x1 - S.x0 - 2 * S.arm + 20, sy = S.seatTop, sh = S.bottom - S.seatTop
  step(ctx, sx - P, sy - P, sw + 2 * P, sh + 2 * P, P, INK)
  step(ctx, sx, sy, sw, sh, P, VEL.body)
  ctx.fillStyle = VEL.hi; ctx.fillRect(sx + 2 * P, sy + P, sw - 4 * P, P)
  ctx.fillStyle = VEL.gold; ctx.fillRect(sx + 2 * P, sy, sw - 4 * P, P * 0.6)
  ctx.fillStyle = VEL.shade; ctx.fillRect(sx + P, sy + sh - 2 * P, sw - 2 * P, P)
  for (let k = 1; k < 3; k++) { const cx = Math.round(sx + (sw * k) / 3); ctx.fillStyle = VEL.deep; ctx.fillRect(cx - 2, sy + P, 4, sh - 2 * P) }
  // gold feet
  for (const fx of [sx + 4 * P, sx + sw - 7 * P]) { ctx.fillStyle = INK; ctx.fillRect(fx - 2, S.bottom + P - 2, 3 * P + 4, 2 * P + 2); ctx.fillStyle = VEL.gold; ctx.fillRect(fx, S.bottom + P, 3 * P, 1.5 * P) }
  // arms (rolled tops)
  for (const [ax, dir] of [[S.x0, 1], [S.x1 - S.arm, -1]]) {
    const ay = S.armTop, ah = S.bottom - S.armTop
    step(ctx, ax - P, ay - P, S.arm + 2 * P, ah + 2 * P, P, INK)
    step(ctx, ax, ay, S.arm, ah, P, VEL.body)
    ctx.fillStyle = VEL.hi; ctx.fillRect(ax + 2 * P, ay + P, S.arm - 4 * P, P)
    ctx.fillStyle = VEL.gold; ctx.fillRect(ax + 2 * P, ay, S.arm - 4 * P, P * 0.6)
    ctx.fillStyle = VEL.shade; ctx.fillRect(dir > 0 ? ax + S.arm - 2 * P : ax + P, ay + 2 * P, P, ah - 3 * P)
    ctx.fillStyle = VEL.deep; ctx.fillRect(ax + P, ay + 4 * P, S.arm - 2 * P, P / 2)
  }
}

// ── a vintage announcer's mic on a short stand: (x, y) = the foot of the stand
export function drawVintageMic(ctx, x, y, s = 1, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s)
  const P = 5
  // base + stem
  ctx.fillStyle = INK; ctx.fillRect(-9 * P, -2 * P, 18 * P, 3 * P); ctx.fillRect(-1.5 * P, -12 * P, 3 * P, 11 * P)
  ctx.fillStyle = '#9aa0c0'; ctx.fillRect(-8 * P, -1.5 * P, 16 * P, 2 * P); ctx.fillStyle = '#d6daf0'; ctx.fillRect(-8 * P, -1.5 * P, 16 * P, P / 2)
  ctx.fillStyle = '#7d83ad'; ctx.fillRect(-0.75 * P, -11.5 * P, 1.5 * P, 10 * P)
  // yoke + capsule
  ctx.translate(0, -12 * P); ctx.rotate(rot)
  ctx.fillStyle = INK; ctx.fillRect(-5.5 * P, -7 * P, 11 * P, 2 * P); ctx.fillRect(-5.5 * P, -7 * P, 2 * P, 7 * P); ctx.fillRect(3.5 * P, -7 * P, 2 * P, 7 * P)
  ctx.fillStyle = '#b9bfdc'; ctx.fillRect(-4.8 * P, -6.4 * P, 1 * P, 6 * P); ctx.fillRect(3.8 * P, -6.4 * P, 1 * P, 6 * P)
  ctx.fillStyle = INK; ctx.beginPath(); ctx.roundRect(-4.6 * P, -19 * P, 9.2 * P, 15 * P, 4.4 * P); ctx.fill()
  const g = ctx.createLinearGradient(-4 * P, 0, 4 * P, 0); g.addColorStop(0, '#8a90b2'); g.addColorStop(0.35, '#f4f6ff'); g.addColorStop(1, '#6d7396')
  ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(-3.7 * P, -18.1 * P, 7.4 * P, 13.2 * P, 3.6 * P); ctx.fill()
  // grille: horizontal slots
  ctx.fillStyle = 'rgba(27,18,54,0.55)'
  for (let j = -16; j <= -7; j += 1.5) ctx.fillRect(-3 * P, j * P, 6 * P, P * 0.45)
  // gold band
  ctx.fillStyle = '#f2c75c'; ctx.fillRect(-3.7 * P, -11.9 * P, 7.4 * P, 1.1 * P); ctx.fillStyle = '#fff1c8'; ctx.fillRect(-3.2 * P, -11.9 * P, 2 * P, 0.4 * P)
  ctx.restore()
}

// ── the big pixel heart (13 × 12 cells), centred on (x, y)
const HEART = BM(`
..XXX...XXX..
.XHHXX.XXXXX.
XHHXXXXXXXXXS
XHXXXXXXXXXXS
XXXXXXXXXXXSS
XXXXXXXXXXXSS
.XXXXXXXXXSS.
..XXXXXXXSS..
...XXXXXSS...
....XXXSS....
.....XSS.....
......S......`)
const HEART_PAL = { X: '#ff3d6e', H: '#ffb3c8', S: '#c2185b' }
// the crack: a zigzag down the middle, in cells (x from the left of the 13-wide grid)
const CRACK = [[6.5, 1.6], [5.6, 3.2], [7.2, 4.8], [5.8, 6.4], [7, 8], [6.1, 9.6], [6.5, 12]]
export function drawHeart(ctx, x, y, cell, t, crack = 0, split = 0, beat = 1) {
  const w = 13 * cell, h = 12 * cell
  const pulse = 1 + beat * 0.05 * Math.max(0, Math.sin(t * TAU * 1.1)) ** 6
  const halves = split > 0 ? [-1, 1] : [0]
  for (const side of halves) {
    ctx.save()
    ctx.translate(x + side * split * 36, y + split * 8 * Math.abs(side))
    ctx.rotate(side * split * 0.16)
    ctx.scale(pulse, pulse)
    if (side) {
      // clip to one side of the crack (cell space → px)
      ctx.beginPath()
      const X = c => -w / 2 + c * cell, Y = r => -h / 2 + r * cell
      ctx.moveTo(X(side < 0 ? -2 : 15), Y(-2)); ctx.lineTo(X(6.5), Y(-2))
      for (const [cx, cy] of CRACK) ctx.lineTo(X(cx), Y(cy))
      ctx.lineTo(X(6.5), Y(14)); ctx.lineTo(X(side < 0 ? -2 : 15), Y(14)); ctx.closePath(); ctx.clip()
    }
    drawPixels(ctx, HEART, 0, 0, cell, HEART_PAL, { outline: INK })
    ctx.restore()
  }
  // the crack line (drawn while it's still whole)
  if (crack > 0 && split < 0.05) {
    ctx.save(); ctx.translate(x, y); ctx.scale(pulse, pulse)
    const n = Math.max(1, Math.ceil(crack * (CRACK.length - 1)))
    ctx.strokeStyle = INK; ctx.lineWidth = cell * 0.9; ctx.lineJoin = 'miter'; ctx.lineCap = 'square'
    ctx.beginPath()
    for (let i = 0; i <= n && i < CRACK.length; i++) { const [cx, cy] = CRACK[i]; const px = -w / 2 + cx * cell, py = -h / 2 + cy * cell; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py) }
    ctx.stroke(); ctx.restore()
  }
}

// ── a pixel bat (two flap frames)
const BAT = [BM(`
X.........X
XX..X.X..XX
XXX.XXX.XXX
XXXXXXXXXXX
.XXXXXXXXX.
..XX...XX..`), BM(`
...........
....X.X....
.XX.XXX.XX.
XXXXXXXXXXX
X..XXXXX..X
...........`)]
export function drawBat(ctx, x, y, cell, t) {
  const f = BAT[Math.floor(t * 10) % 2]
  drawPixels(ctx, f, x, y, cell, { X: '#140c26' }, { outline: '#7d6bb8' })
  ctx.fillStyle = '#ff5c7a'; ctx.fillRect(x - cell * 0.9, y - cell * 0.6, cell * 0.6, cell * 0.6); ctx.fillRect(x + cell * 0.3, y - cell * 0.6, cell * 0.6, cell * 0.6)
}

// ── Scorpio's receipt: header, a ruled list, tally marks for six days. (x, y) = top-left
export function drawReceipt(ctx, x, y, w, h, font) {
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(x, y)
  for (let i = 0; i <= 10; i++) ctx.lineTo(x + (w * i) / 10, y + (i % 2 ? 7 : 0))
  ctx.lineTo(x + w, y + h)
  for (let i = 10; i >= 0; i--) ctx.lineTo(x + (w * i) / 10, y + h + (i % 2 ? -7 : 0))
  ctx.closePath()
  ctx.fillStyle = INK; ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.stroke()
  ctx.fillStyle = '#fbf6ec'; ctx.fill()
  ctx.clip()
  ctx.fillStyle = '#e4dccb'; for (let j = y + 70; j < y + h - 20; j += 34) ctx.fillRect(x + 14, j, w - 28, 3)
  ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.font = `700 24px ${font}`; ctx.fillText('SWORE OFF', x + w / 2, y + 30); ctx.fillText('LOVE:', x + w / 2, y + 56)
  // tally: four strokes + a slash, then one
  const tx = x + w / 2 - 54, ty = y + 92
  ctx.fillStyle = '#e8344e'
  for (let i = 0; i < 4; i++) ctx.fillRect(tx + i * 16, ty, 7, 58)
  ctx.save(); ctx.translate(tx + 24, ty + 29); ctx.rotate(-0.95); ctx.fillRect(-42, -4, 84, 8); ctx.restore()
  ctx.fillRect(tx + 92, ty, 7, 58)
  ctx.fillStyle = INK; ctx.font = `700 34px ${font}`; ctx.fillText('6 DAYS', x + w / 2, y + h - 40)
  ctx.restore()
}

// ── knocked out: little pixel stars circling over a fainted head (world px, centred on (x, y))
export function dizzy(ctx, x, y, r, t, a = 1) {
  if (a <= 0) return
  ctx.save(); ctx.globalAlpha *= a
  for (let i = 0; i < 3; i++) {
    const an = t * 5 + i * TAU / 3, px = x + Math.cos(an) * r, py = y + Math.sin(an) * r * 0.32, s = Math.round(r * 0.16)
    const back = Math.sin(an) < 0
    ctx.fillStyle = INK; ctx.fillRect(px - s * 1.5 - 2, py - s / 2 - 2, s * 3 + 4, s + 4); ctx.fillRect(px - s / 2 - 2, py - s * 1.5 - 2, s + 4, s * 3 + 4)
    ctx.fillStyle = back ? '#c9a6ff' : '#ffe27a'; ctx.fillRect(px - s * 1.5, py - s / 2, s * 3, s); ctx.fillRect(px - s / 2, py - s * 1.5, s, s * 3)
  }
  ctx.restore()
}

// ── confetti (pure f(t): analytic drag)
const CONF_COLS = ['#f2c75c', '#ff8fb1', '#c9a6ff', '#7fe0ff', '#efe6d6', '#ff6b5b', '#9cf08a']
export function confetti(ctx, t, t0, { x0 = 540, y0 = 1300, n = 80, spread = 1, up = 1, seed = 1, life = 5 } = {}) {
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
