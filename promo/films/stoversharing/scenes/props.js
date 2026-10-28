// stoversharing props: small pixel drawings on canvas, shared inside this film (STARTALK2.md: "props are shared helpers
// inside your own film folder"). Every prop is a pure function of its arguments; nothing touches `document` at load.
//
//   starFrame(x, y, size, t, opts) / inSprite(ctx, F, fn) / cellToWorld(F, i, j)
//        the exact transform drawStarChar uses for that frame (same maths as startalk.js), so props drawn in sprite CELLS
//        (the 36-cell grid) stay seated through hops and squash.
//   bowCells(ctx)            Cancer's date-night hair bow on the top point (cells)
//   beanieCells(ctx)         Aquarius' knit beanie with a pom-pom on the top point (cells)
//   bowTieCells(ctx)         Taurus the waiter's bow tie (cells)        towelCells(ctx)   the towel over its left arm
//   tearsCells(ctx, t, k)    tears from both eyes: k 0 none · 1 sniffle · 2 streams · 3 fountains
//   sweatCells(ctx, t, k)    a nervous sweat drop sliding down the right temple (k = alpha)
//   drawTable(ctx, cx, top, rx, bottom)   the little bistro table with a scalloped cream tablecloth
//   drawCandle(ctx, x, y, t)              a red glass candle (flickering flame + warm glow)
//   drawProjector(ctx, x, y, on, t)       a carousel slide projector, lens up (on: the lamp glows)
//   drawCake(ctx, x, y, px)               a cake slice on a plate (x, y = plate centre)
//   drawChair(ctx, x, seatY, side)        a bistro chair seen from the side, backrest on `side` (−1 left, +1 right)
//   drawBooth(ctx, x0, x1, top, bottom)   the next booth's tufted back
//   drawLaserPen(ctx, x, y, ang, k)       the laser pointer (x, y = its butt; it points along ang)
//   drawTray(ctx, x, y, k)                a waiter's silver tray (x, y = centre of its top)
//   drawGoldfish(ctx, x, y, px, t)        a pixel goldfish (slide 9)    drawDiary(ctx, x, y, px)   a diary + open padlock
//   drawMedal(ctx, x, y, r, col, n)       a ranking medal              drawPixelHeart(ctx, x, y, px, col)
import { clamp } from '../../../src/lib.js'

const TAU = Math.PI * 2
const INK = '#1b1236'
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
/** run fn with the context mapped to sprite cells (0…36) of the star drawn with the same args */
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
/** sprite cell → world point (follows the squash, so a prop pinned there stays put) */
export const cellToWorld = (F, i, j) => [F.ox + (i * F.cell - F.S / 2) * F.sx, F.oy + (j * F.cell - F.S / 2 - F.base) * F.sy]

// ── tiny cell painter with a 1-cell ink outline
function paintCells(ctx, cells, outline = INK) {
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  if (outline) {
    ctx.fillStyle = outline
    for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b))) ctx.fillRect(i + a, j + b, 1.02, 1.02)
  }
  for (const [i, j, c] of cells) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) }
}
/** bitmap rows → cells at (x0, y0) with a palette */
const CACHE = new Map()
function bmpCells(key, rows, pal, x0, y0) {
  if (CACHE.has(key)) return CACHE.get(key)
  const out = []
  rows.forEach((r, j) => [...r].forEach((ch, i) => { if (pal[ch]) out.push([x0 + i, y0 + j, pal[ch]]) }))
  CACHE.set(key, out); return out
}

// ── outfits (cells)
export function bowCells(ctx) {
  paintCells(ctx, bmpCells('bow', [
    '.PP.......PP.',
    'PhPP.....PPpP',
    'PhppP.K.PppdP',
    'PppppKKKppppP',
    'PppdP.K.PpddP',
    'PpdP.....PddP',
    '.PP.......PP.',
  ], { P: '#ff4f93', p: '#ff8fbd', h: '#ffd0e4', d: '#d0306f', K: '#a81f58' }, 11, 0))
}
export function beanieCells(ctx) {
  paintCells(ctx, bmpCells('beanie', [
    '....WW....',
    '...WWWW...',
    '....WW....',
    '..OOOOOO..',
    '.OoOOOOOO.',
    '.OOOOOOdO.',
    'RRRRRRRRRR',
    'RrRrRrRrRr',
  ], { W: '#fff3dc', O: '#ff9440', o: '#ffc28a', d: '#d9681c', R: '#ff6a2a', r: '#c24814' }, 13, -1))
}
export function bowTieCells(ctx) {
  paintCells(ctx, bmpCells('bowtie', [
    'KK.....KK',
    'KhKK.KKkK',
    'KkkKRKkkK',
    'KhKK.KKkK',
    'KK.....KK',
  ], { K: '#14102a', k: '#2e2650', h: '#6b5fa0', R: '#e8344e' }, 14, 25))
}
export function towelCells(ctx) {
  paintCells(ctx, bmpCells('towel', [
    'WWWWW',
    'WWWWW',
    'WgWWW',
    'WWWWW',
    'WWWgW',
    'WWWWW',
    '.WWW.',
  ], { W: '#fbf7ee', g: '#d9d2e6' }, 0, 14))
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
      if (k >= 3) { x = ex + d * 15 * ph; y = 20 - 9 * ph + 24 * ph * ph }        // fountain arcs
      else if (k === 2) { x = ex + d * 3.5 * ph; y = 20.5 + 15 * ph * ph }      // streams down the cheeks
      else { x = ex + d * 0.6 * ph; y = 21 + 8 * ph * ph }                      // a sniffle
      drop(Math.round(x * 2) / 2, Math.round(y * 2) / 2)
    }
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
/** a nervous sweat drop on the right temple, sliding down and re-forming (k = alpha 0…1) */
export function sweatCells(ctx, t, k) {
  if (k <= 0) return
  const ph = (t * 0.9) % 1, y = 11 + 7 * ph * ph
  ctx.save(); ctx.globalAlpha *= clamp(k) * (ph > 0.85 ? (1 - ph) / 0.15 : 1)
  const x = 28.5
  ctx.fillStyle = INK; ctx.fillRect(x - 0.6, y - 1.6, 2.2, 3.6); ctx.fillRect(x - 0.1, y - 2.4, 1.2, 1)
  ctx.fillStyle = '#8fe3ff'; ctx.fillRect(x - 0.1, y - 1.4, 1.6, 3); ctx.fillRect(x + 0.2, y - 2, 0.9, 0.8)
  ctx.fillStyle = '#ffffff'; ctx.fillRect(x + 0.1, y - 0.9, 0.5, 0.9)
  ctx.restore()
}

// ── world props
const step = (ctx, x, y, w, h, P, col) => { ctx.fillStyle = col; ctx.fillRect(x + 2 * P, y, w - 4 * P, h); ctx.fillRect(x, y + 2 * P, w, h - 4 * P); ctx.fillRect(x + P, y + P, w - 2 * P, h - 2 * P) }
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }
export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}
export function drawPixelHeart(ctx, x, y, px, col = '#ff4f7e') {
  bitmap(ctx, ['.XX.XX.', 'XWXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'], { X: col, W: '#ffd0dc' }, x - 3.5 * px, y - 3 * px, px)
}

/** the bistro table: a cream tablecloth over a round top (cx, top = cloth top, rx = half width), a pedestal to `bottom` */
export function drawTable(ctx, cx, top, rx, bottom) {
  const P = 6
  // pedestal + foot
  step(ctx, cx - 16 - P, top + 40, 32 + 2 * P, bottom - top - 40, P, INK)
  R(ctx, cx - 16, top + 40, 32, bottom - top - 46, '#3d2a55'); R(ctx, cx - 16, top + 40, 8, bottom - top - 46, '#5d4580')
  step(ctx, cx - 90 - P, bottom - 22 - P, 180 + 2 * P, 22 + 2 * P, P, INK)
  step(ctx, cx - 90, bottom - 22, 180, 22, P, '#3d2a55'); R(ctx, cx - 84, bottom - 22, 168, 5, '#6a5194')
  // cloth: a slab plus a scalloped drape
  const drop = 62
  step(ctx, cx - rx - P, top - P, 2 * rx + 2 * P, 26 + 2 * P, P, INK)
  ctx.fillStyle = INK
  for (let x = cx - rx - P; x < cx + rx + P; x += 4) {
    const u = (x - (cx - rx)) / (2 * rx), sc = Math.abs(Math.sin(u * Math.PI * 6)) * 12
    ctx.fillRect(x, top + 20, 4, drop + P - sc)
  }
  for (let x = cx - rx; x < cx + rx; x += 4) {
    const u = (x - (cx - rx)) / (2 * rx), sc = Math.abs(Math.sin(u * Math.PI * 6)) * 12
    const shade = u > 0.72 ? '#d9c4ac' : u < 0.1 ? '#fff6ea' : '#f3e5d1'
    ctx.fillStyle = shade; ctx.fillRect(x, top + 20, 4, drop - sc)
    if ((Math.floor(u * 12)) % 2 === 0) { ctx.fillStyle = 'rgba(232,80,120,0.16)'; ctx.fillRect(x, top + 20, 4, drop - sc) }
  }
  step(ctx, cx - rx, top, 2 * rx, 26, P, '#fbf2e4')
  R(ctx, cx - rx + 2 * P, top + 2, 2 * rx - 4 * P, 4, '#fffaf2')
  R(ctx, cx - rx + P, top + 20, 2 * rx - 2 * P, 4, '#d9c4ac')
}

export function drawCandle(ctx, x, y, t) {
  const fl = 0.85 + 0.15 * Math.sin(t * 23) * Math.sin(t * 7.3 + 1)
  // glow
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(x, y - 50, 0, x, y - 50, 190 * fl)
  g.addColorStop(0, 'rgba(255,190,110,0.30)'); g.addColorStop(0.4, 'rgba(255,150,90,0.10)'); g.addColorStop(1, 'rgba(255,150,90,0)')
  ctx.fillStyle = g; ctx.fillRect(x - 200, y - 250, 400, 400); ctx.restore()
  // holder (red glass) + candle
  const P = 4
  step(ctx, x - 17 - P, y - 34 - P, 34 + 2 * P, 34 + 2 * P, P, INK)
  step(ctx, x - 17, y - 34, 34, 34, P, '#c8344f'); R(ctx, x - 13, y - 30, 6, 22, '#ff7088'); R(ctx, x + 7, y - 30, 4, 26, '#9c2440')
  R(ctx, x - 9, y - 40, 18, 8, '#fbf2e4'); R(ctx, x - 1, y - 48, 2, 8, INK)
  // flame
  const fx = x + Math.sin(t * 9) * 1.5, h = 22 * fl
  ctx.fillStyle = '#ff9a3c'; ctx.beginPath(); ctx.ellipse(fx, y - 50 - h / 2, 7, h / 2 + 2, 0, 0, TAU); ctx.fill()
  ctx.fillStyle = '#ffe9a8'; ctx.beginPath(); ctx.ellipse(fx, y - 47 - h / 3, 3.5, h / 3, 0, 0, TAU); ctx.fill()
}

/** carousel slide projector on its side, lens up-right (x, y = bottom centre). Returns the lens point. */
export function drawProjector(ctx, x, y, on, t) {
  const P = 4
  // the slide carousel (a ring of slots seen edge-on) on top
  step(ctx, x - 44 - P, y - 62 - P, 88 + 2 * P, 20 + 2 * P, P, INK)
  step(ctx, x - 44, y - 62, 88, 20, P, '#7d83ad')
  for (let i = 0; i < 9; i++) R(ctx, x - 38 + i * 9, y - 58 + (i % 2), 4, 12, '#2c2f4c')
  R(ctx, x - 40, y - 62, 80, 3, '#b9bde0')
  // body
  step(ctx, x - 54 - P, y - 42 - P, 108 + 2 * P, 42 + 2 * P, P, INK)
  step(ctx, x - 54, y - 42, 108, 42, P, '#4a4f72'); R(ctx, x - 50, y - 42, 100, 6, '#7d83ad'); R(ctx, x - 50, y - 10, 100, 5, '#2c2f4c')
  R(ctx, x - 44, y - 30, 26, 4, '#2c2f4c'); R(ctx, x - 44, y - 22, 26, 4, '#2c2f4c')                 // vents
  R(ctx, x + 22, y - 32, 10, 10, on ? '#7dffb0' : '#3a3f60')                                       // power light
  // lens barrel, tilted up toward the screen
  const lx = x + 42, ly = y - 46
  ctx.save(); ctx.translate(lx, ly); ctx.rotate(-0.55)
  step(ctx, -12 - P, -30 - P, 24 + 2 * P, 32 + 2 * P, P, INK)
  step(ctx, -12, -30, 24, 32, P, '#5d6288'); R(ctx, -12, -30, 24, 6, '#9aa0c8')
  R(ctx, -8, -34, 16, 6, on ? '#fff6d8' : '#6b7090')
  ctx.restore()
  const tip = [lx + Math.sin(0.55) * 33, ly - Math.cos(0.55) * 33]
  if (on) {
    ctx.save(); ctx.globalCompositeOperation = 'lighter'
    const g = ctx.createRadialGradient(tip[0], tip[1], 0, tip[0], tip[1], 60)
    g.addColorStop(0, 'rgba(255,248,220,0.85)'); g.addColorStop(0.3, 'rgba(255,240,200,0.25)'); g.addColorStop(1, 'rgba(255,240,200,0)')
    ctx.fillStyle = g; ctx.fillRect(tip[0] - 60, tip[1] - 60, 120, 120); ctx.restore()
  }
  return tip
}

/** a cake slice on a plate, x, y = plate centre (px = art pixel) */
export function drawCake(ctx, x, y, px = 4) {
  // plate
  step(ctx, x - 9 * px - px, y - px * 1.5 - px, 18 * px + 2 * px, 3 * px + 2 * px, px, INK)
  step(ctx, x - 9 * px, y - px * 1.5, 18 * px, 3 * px, px, '#fbf7ee'); R(ctx, x - 8 * px, y + px * 0.5, 16 * px, px, '#cfc6dc')
  // the slice (side view: a wedge) + a cherry
  bitmap(ctx, [
    '.......CC.',
    '......CCWC',
    '...KKKKCCK',
    '.KKFFFFFFK',
    'KFFfFFFFFK',
    'KccccccccK',
    'KSSSSSSSSK',
    'KssssssssK',
    'KccccccccK',
    'KSSSSSSSSK',
    'KKKKKKKKKK',
  ], { K: INK, F: '#ff8fb1', f: '#ffd0e0', c: '#fff3dc', S: '#e8b070', s: '#c98a4a', C: '#e8344e', W: '#ffd0d8' }, x - 5 * px, y - 12.5 * px, px)
}

/** bistro chair from the side: seat at seatY under the star, the backrest rising on `side` */
export function drawChair(ctx, x, seatY, side = -1) {
  const P = 6, IRON = '#2c2346', HI = '#c79a48'
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  const bx = x + side * 112
  const path = () => {
    ctx.beginPath()
    ctx.moveTo(bx, seatY + 150)                                       // back leg
    ctx.lineTo(bx, seatY)
    ctx.quadraticCurveTo(bx + side * 14, seatY - 120, bx - side * 4, seatY - 210)   // backrest post
    ctx.quadraticCurveTo(bx - side * 26, seatY - 236, bx - side * 34, seatY - 210)  // the scroll
    ctx.moveTo(x - side * 90, seatY + 150); ctx.lineTo(x - side * 84, seatY + 6)    // front leg
  }
  ctx.strokeStyle = INK; ctx.lineWidth = 18; path(); ctx.stroke()
  ctx.strokeStyle = IRON; ctx.lineWidth = 10; path(); ctx.stroke()
  ctx.strokeStyle = HI; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx + side * 3, seatY - 30); ctx.quadraticCurveTo(bx + side * 15, seatY - 120, bx - side * 1, seatY - 200); ctx.stroke()
  // seat slab
  step(ctx, Math.min(bx, x - side * 96) - P - 6, seatY - 6 - P, Math.abs(bx - (x - side * 96)) + 12 + 2 * P, 16 + 2 * P, P, INK)
  step(ctx, Math.min(bx, x - side * 96) - 6, seatY - 6, Math.abs(bx - (x - side * 96)) + 12, 16, P, '#5b3a6e')
  R(ctx, Math.min(bx, x - side * 96), seatY - 6, Math.abs(bx - (x - side * 96)), 4, '#8a5aa0')
  ctx.restore()
}

/** the next booth's tufted back panel (x0…x1, rounded top at `top`) */
export function drawBooth(ctx, x0, x1, top, bottom) {
  const P = 8, w = x1 - x0
  step(ctx, x0 - P, top - P, w + 2 * P, bottom - top + 2 * P, P, INK)
  step(ctx, x0, top, w, bottom - top, P, '#6b2a5e')
  // top roll + highlight
  step(ctx, x0, top, w, 34, P, '#8e3a7c'); R(ctx, x0 + 3 * P, top + 6, w - 6 * P, 5, '#c060a8')
  // tufting: diamond seams with buttons
  ctx.strokeStyle = '#4e1c46'; ctx.lineWidth = 3
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
    const bx = x0 + 24 + c * (w - 48) / 3, by = top + 66 + r * 52
    if (by > bottom - 20) continue
    R(ctx, bx - 4, by - 4, 8, 8, '#2e0f2a'); R(ctx, bx - 2, by - 3, 3, 3, '#a04a8e')
  }
}

/** the laser pointer: a slim silver pen, butt at (x, y), pointing along ang; k = pop scale */
export function drawLaserPen(ctx, x, y, ang, k = 1) {
  if (k <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(k, k)
  const P = 4
  R(ctx, -2, -9, 70, 18, INK)
  R(ctx, 0, -6, 62, 12, '#c4bce0'); R(ctx, 0, -6, 62, 4, '#ffffff'); R(ctx, 0, 3, 62, 3, '#8d84ab')
  R(ctx, 20, -10, 12, 5, INK); R(ctx, 22, -9, 8, 3, '#ff4a5e')                    // the button
  R(ctx, 62, -7, 10, 14, INK); R(ctx, 63, -5, 7, 10, '#ff2a3c'); R(ctx, 64, -4, 3, 3, '#ffd0d6')
  void P
  ctx.restore()
}

/** a silver waiter's tray, (x, y) = centre of its top surface */
export function drawTray(ctx, x, y, k = 1) {
  if (k <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k)
  R(ctx, -70, -4, 140, 16, INK); R(ctx, -76, 0, 152, 8, INK)
  R(ctx, -68, -2, 136, 10, '#d6dbe8'); R(ctx, -72, 2, 144, 4, '#d6dbe8'); R(ctx, -64, -2, 128, 3, '#ffffff'); R(ctx, -68, 6, 136, 3, '#8d93b0')
  ctx.restore()
}

/** a pixel goldfish facing right (x, y = centre) with a wiggling tail */
export function drawGoldfish(ctx, x, y, px, t) {
  const wig = Math.sin(t * 9) > 0
  bitmap(ctx, [
    '.....OOOOO.....',
    '...OOOOOOOOO...',
    wig ? 'TT.OOoOOOOOOO..' : '.TTOOoOOOOOOO..',
    'TTTOooOOOOOWKO.',
    'TTTOoOOOOOOKKOO',
    'TTTOOOOOOOOOOO.',
    wig ? 'TT.OOOOOOOOOO..' : '.TTOOOOOOOOOO..',
    '...OOOOOOOOO...',
    '.....OOdOO.....',
  ], { O: '#ff8a2a', o: '#ffc06a', T: '#ff6a1a', K: INK, W: '#ffffff', d: '#d0581a' }, x - 7.5 * px, y - 4.5 * px, px)
}
/** a pink diary with an open padlock hanging off it (x, y = centre) */
export function drawDiary(ctx, x, y, px) {
  bitmap(ctx, [
    'KKKKKKKKKKKKK.....',
    'KPPPPPPPPPPPPK....',
    'KPpPPPPPPPPPPK....',
    'KPPPPPHHPPPPPK....',
    'KPPPPHHHHPPPPK....',
    'KPPPPPHHPPPPPK.SS.',
    'KPPPPPPPPPPPPKS..S',
    'KPPPPPPPPPPPPKS..S',
    'KPPPPPPPPPPPPGGGG.',
    'KPPPPPPPPPPPGGkGG.',
    'KPPPPPPPPPPPGGkGG.',
    'KPPPPPPPPPPPPGGGG.',
    'KWWWWWWWWWWWWK....',
    'KKKKKKKKKKKKKK....',
  ], { K: INK, P: '#ff6fa5', p: '#ffb3cf', H: '#ffffff', W: '#fff3dc', G: '#ffd23f', k: '#7a4a10', S: '#c4bce0' }, x - 9 * px, y - 7 * px, px)
}
export function drawMedal(ctx, x, y, r, col, n) {
  // ribbon
  ctx.fillStyle = '#e8508a'; ctx.beginPath(); ctx.moveTo(x - r * 0.7, y - r * 1.9); ctx.lineTo(x - r * 0.1, y - r * 0.6); ctx.lineTo(x + r * 0.5, y - r * 0.6); ctx.lineTo(x - r * 0.1, y - r * 1.9); ctx.fill()
  ctx.fillStyle = '#5a8ee8'; ctx.beginPath(); ctx.moveTo(x + r * 0.7, y - r * 1.9); ctx.lineTo(x + r * 0.1, y - r * 0.6); ctx.lineTo(x - r * 0.5, y - r * 0.6); ctx.lineTo(x + r * 0.1, y - r * 1.9); ctx.fill()
  ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(x, y, r + 4, 0, TAU); ctx.fill()
  ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill()
  ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.beginPath(); ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.35, 0, TAU); ctx.fill()
  ctx.fillStyle = INK; ctx.font = `800 ${Math.round(r * 1.15)}px Inter, Arial, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(String(n), x, y + r * 0.06)
}
