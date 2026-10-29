// st9virgohome — Virgo's home for Star Talk season 9, "A Day in the Life" (promo/films/STARTALK10.md), S9 E26–E30.
// Drawn once here and reused by st9virgoam, st9virgowork, st9virgolove, st9virgocrew and st9virgo3am (set continuity).
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { VIRGOHOME, drawVirgoHome, virgoSpots, drawVirgoStar, drawLabel, drawLabelMaker, drawWheat, drawTodoBoard } from '../../st9virgohome.js'
//
// drawVirgoHome(ctx, t, { room, ep, dark = 0, sky = null, light = 1, zoom = null })
//   paints one full-frame (1080×1920) room of Virgo's flat, opaque, pixel style (6 px cells). Sage walls, cream trim,
//   pale oak, and a label on everything.
//   room  'bedroom' | 'kitchen' | 'desk' | 'window'
//   ep    'am' | 'work' | 'love' | 'crew' | '3am'   the binge detail: the day's to-do board (on the fridge in the kitchen,
//         over the desk) gains a tick per episode (am 1 · work 3 · love 4 · crew 5 · 3am still 5: "REST" stays open),
//         and the label maker labels one new thing a day: am "MUGS" · work "STAPLER" · love "PISCES' MUG" · crew "SAG'S
//         SNACKS" (all of them stay on, so later episodes show the earlier labels too).
//   sky   (ctx, rect) => void   paints the view inside the window (clip set to rect). null = a plain night gradient.
//   dark  0…1   lights out (3 AM): indigo wash except the window, a moonbeam on the floor.   light 0…1 the sunbeam.
// virgoSpots(room) → { floor, win, stand: [x, y], board?, hide: [{ x, y, from, where }] }
// drawVirgoStar(ctx, x, y, size, t, opts)   drawStarChar in Virgo's colour with the ♍ badge (+ opts.pencil: a pencil
//   tucked behind the upper-left point). All drawStarChar opts pass through.
// drawLabel(ctx, cx, cy, text, { size = 22, rot = 0, alpha = 1 })   one label-maker tape strip (cream tape, Space Mono ink).
// drawLabelMaker(ctx, cx, cy, cell, t, { print = 0 })   the handheld label maker (print 0…1 feeds a tape out of its side).
// drawWheat(ctx, x, baseY, cell, t)   the bud vase with one ear of wheat (Spica's wheat, the binge-proof constant).
// drawTodoBoard(ctx, x, y, w, h, t, { items, done, title })   the to-do board; done = number of ticked rows.
// TODO = the day's six items · VIRGOHOME = the palette.
//
// Pure f(t). Nothing touches `document` at module top level.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp } from '../src/lib.js'
import { drawStarChar, signStar } from './startalk.js'

export const VIRGOHOME = {
  wall: '#24382f', wall2: '#29402f', trim: '#e9dfc6', trimDk: '#b8ab8a', floor: '#a07a4c', floor2: '#8a6640', floorHi: '#b88e5c',
  sage: '#7fa88a', sageDk: '#4c6e58', cream: '#f4ecd6', ink: '#1b1236', tape: '#f7f0dc', red: '#e0525a', blue: '#5f8fd6',
  yellow: '#f2c75c', pink: signStar('virgo').color, oak: '#c49a64', oakDk: '#8f6a3e', steel: '#2b2440', steelLt: '#4a4166',
}
const H = VIRGOHOME
const CELL = 6
const W = 1080, HH = 1920
const FLOOR = 1380
const MONO = "'Space Mono', monospace"

const R = (x, px, py, w, h, c) => { x.fillStyle = c; x.fillRect(Math.round(px), Math.round(py), Math.round(w), Math.round(h)) }
function box(x, px, py, w, h, c, { edge = H.ink, hi = null, lo = null, e = CELL } = {}) {
  R(x, px - e, py - e, w + 2 * e, h + 2 * e, edge); R(x, px, py, w, h, c)
  if (hi) R(x, px, py, w, e, hi)
  if (lo) R(x, px, py + h - e, w, e, lo)
}
const bitsAt = (x, rows, cols, px, py, c) => { rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const ch = row[i]; if (ch !== '.') R(x, px + i * c, py + j * c, c + 0.5, c + 0.5, cols[ch]) } }) }

// ── Virgo
const VIR = signStar('virgo')
export function drawVirgoStar(x, px, py, size, t, opts = {}) {
  const { pencil = false, ...rest } = opts
  const r = drawStarChar(x, px, py, size, t, { color: VIR.color, glyph: size >= 120 ? VIR.glyph : null, ...rest })
  if (pencil && (rest.pop ?? 1) > 0.05) {
    const c = Math.max(3, Math.round(size * (rest.pop ?? 1) / 40))
    x.save(); x.translate(r.x - size * 0.2, r.top + size * 0.26); x.rotate(-0.7)
    R(x, -6 * c, -c, 9 * c, 2 * c, H.ink); R(x, -5 * c, -c / 2, 7 * c, c, H.yellow); R(x, 2 * c, -c / 2, c, c, '#f0c8a0'); R(x, 3 * c, -c / 2, c, c, H.ink); R(x, -6 * c, -c / 2, c, c, '#ff8fb1')
    x.restore()
  }
  return r
}

// ── props
export function drawLabel(x, cx, cy, text, { size = 22, rot = 0, alpha = 1, tape = H.tape } = {}) {
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `700 ${size}px ${MONO}`
  const w = Math.ceil(x.measureText(text).width) + size, h = Math.round(size * 1.35)
  R(x, -w / 2 - 3, -h / 2 - 3, w + 6, h + 6, H.ink); R(x, -w / 2, -h / 2, w, h, tape)
  R(x, -w / 2, -h / 2, w, 3, '#fffaf0')
  x.fillStyle = H.ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
  return { w, h }
}
export function drawLabelMaker(x, cx, cy, c, t, { print = 0, text = '' } = {}) {
  // body
  bitsAt(x, [
    '.kkkkkkkkkk.',
    'kPPPPPPPPPPk',
    'kPggggggggPk',
    'kPgGGGGGGgPk',
    'kPggggggggPk',
    'kPPPPPPPPPPk',
    'kPwkwkwkwkPk',
    'kPkwkwkwkwPk',
    'kPwkwkwkwkPk',
    'kPPPPPPPPPPk',
    'kPPPPPPPPPPk',
    '.kkkkkkkkkk.',
  ], { k: H.ink, P: H.pink, g: '#183028', G: '#7fe0a0', w: '#f4ecd6' }, cx - 6 * c, cy - 6 * c, c)
  const p = clamp(print)
  if (p > 0) {
    const len = Math.round(p * 14) * c
    R(x, cx + 6 * c, cy - 4 * c, len + c, 3 * c, H.ink); R(x, cx + 6 * c, cy - 3.5 * c, len, 2 * c, H.tape)
    if (text && p > 0.6) { x.save(); x.beginPath(); x.rect(cx + 6 * c, cy - 4 * c, len, 3 * c); x.clip(); x.fillStyle = H.ink; x.font = `700 ${Math.round(c * 1.6)}px ${MONO}`; x.textBaseline = 'middle'; x.fillText(text, cx + 7 * c, cy - 2.4 * c); x.restore() }
  }
}
export function drawWheat(x, px, baseY, c, t) {
  bitsAt(x, ['.kkk.', 'kGGGk', 'kGgGk', 'kGGGk', '.kGk.', 'kGGGk', 'kkkkk'], { k: H.ink, G: '#9fd0e0', g: '#e6f6fa' }, px - 2.5 * c, baseY - 7 * c, c)
  const sw = Math.sin(t * 1.1) * 0.6
  for (let j = 0; j < 12; j++) R(x, px - c / 2 + Math.round(sw * j / 12) * c, baseY - 7 * c - (j + 1) * c, c, c, '#b89a4a')
  const hx = px + Math.round(sw) * c, hy = baseY - 19 * c
  for (let j = 0; j < 6; j++) for (const s of [-1, 1]) R(x, hx + (s < 0 ? -2 * c : c), hy - j * 1.5 * c, c, c, j % 2 ? '#e8c76a' : '#d8ae4a')
  R(x, hx - c / 2, hy - 10 * c, c, 3 * c, '#e8c76a')
}
export const TODO = ['wake 6:00', 'make bed', 'emails', 'groceries', 'trip plan', 'rest']
const DONE = { am: 1, work: 3, love: 4, crew: 5, '3am': 5 }
export function drawTodoBoard(x, px, py, w, h, t, { items = TODO, done = 1, title = 'TODAY', size = 22, ticks = null } = {}) {
  box(x, px, py, w, h, '#f7f4ea', { edge: H.ink, e: 6 })
  R(x, px, py, w, size * 1.8, H.sage)
  x.font = `700 ${size}px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'
  x.fillStyle = H.ink; x.fillText(title, px + 12, py + size * 0.95)
  const rowH = (h - size * 2.2) / items.length
  items.forEach((it, i) => {
    const ry = py + size * 2.1 + i * rowH + rowH / 2
    const cb = Math.round(size * 0.8)
    R(x, px + 12, ry - cb / 2, cb, cb, H.ink); R(x, px + 15, ry - cb / 2 + 3, cb - 6, cb - 6, '#fff')
    const k = ticks ? clamp(ticks[i] ?? 0) : (i < done ? 1 : 0)
    if (k > 0) { x.save(); x.strokeStyle = [H.red, H.blue, '#3f9a5a', H.pink, '#c98a1f', H.red][i % 6]; x.lineWidth = 4; x.beginPath(); x.moveTo(px + 15, ry); x.lineTo(px + 12 + cb * 0.4, ry + cb * 0.35 * Math.min(1, k * 2)); if (k > 0.5) x.lineTo(px + 12 + cb * 0.4 + (k - 0.5) * 2 * cb * 0.8, ry - cb * 0.6 * (k - 0.5) * 2); x.stroke(); x.restore() }
    x.fillStyle = k >= 1 ? '#8a8478' : H.ink; x.font = `700 ${size * 0.9}px ${MONO}`; x.fillText(it, px + 22 + cb, ry + 1)
    if (k >= 1) R(x, px + 22 + cb, ry, x.measureText(it).width, 2, '#8a8478')
  })
}
const LABELS = ['MUGS', 'STAPLER', "PISCES' MUG", "SAG'S SNACKS"]
const NLAB = { am: 1, work: 2, love: 3, crew: 4, '3am': 4 }

// ── rooms
function wall(x) {
  R(x, 0, 0, W, FLOOR, H.wall)
  for (let i = 0; i < W; i += 120) R(x, i + 56, 0, 8, FLOOR, H.wall2)
  R(x, 0, 1000, W, 12, H.trimDk); R(x, 0, 1000, W, 6, H.trim)
  R(x, 0, 1012, W, FLOOR - 1012, '#1f3128')
  for (let i = 30; i < W; i += 150) { R(x, i, 1046, 108, 290, '#1b2b23'); R(x, i + 6, 1052, 96, 278, '#1f3128') }
  R(x, 0, FLOOR - 24, W, 24, H.ink); R(x, 0, FLOOR - 20, W, 14, H.trim)
}
function floor(x) {
  R(x, 0, FLOOR, W, HH - FLOOR, H.floor)
  for (let j = FLOOR + 36, row = 0; j < HH; j += 36 + row * 6, row++) {
    R(x, 0, j, W, 6, H.floor2)
    const off = (row * 131) % 240
    for (let i = off; i < W; i += 240) R(x, i, j - 36 - row * 6 + 6, 6, 36 + row * 6, H.floor2)
  }
  R(x, 0, FLOOR, W, 6, H.floorHi)
}
function rug(x, cx, cy, w, h) {      // a perfectly centred, perfectly straight rug
  R(x, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12, H.ink); R(x, cx - w / 2, cy - h / 2, w, h, H.cream)
  R(x, cx - w / 2 + 18, cy - h / 2 + 18, w - 36, h - 36, H.sage); R(x, cx - w / 2 + 30, cy - h / 2 + 30, w - 60, h - 60, H.cream)
  for (let i = -w / 2; i <= w / 2; i += 24) { R(x, cx + i - 2, cy - h / 2 - 18, 4, 12, H.cream); R(x, cx + i - 2, cy + h / 2 + 6, 4, 12, H.cream) }
}
function windowFrame(x, t, rect, sky, { blinds = true } = {}) {
  const { x: wx, y: wy, w, h } = rect
  R(x, wx - 24, wy - 24, w + 48, h + 48, H.ink); R(x, wx - 18, wy - 18, w + 36, h + 36, H.trim)
  x.save(); x.beginPath(); x.rect(wx, wy, w, h); x.clip()
  if (sky) sky(x, rect)
  else { const g = x.createLinearGradient(0, wy, 0, wy + h); g.addColorStop(0, '#120c2e'); g.addColorStop(1, '#2a1a4a'); x.fillStyle = g; x.fillRect(wx, wy, w, h) }
  // rooftops + one tree (a quieter street than Leo's)
  const base = wy + h
  const roofs = [[0, 0.22, 0.3], [0.3, 0.3, 0.26], [0.6, 0.2, 0.4]]
  for (const [fx, fh, fw] of roofs) {
    const tx = wx + fx * w, th = fh * h, tw = fw * w
    R(x, tx, base - th, tw, th, '#14201c'); for (let i = 0; i < tw / 2; i += 6) R(x, tx + i, base - th - i * 0.5, tw - 2 * i, 6, '#14201c')
    R(x, tx + tw * 0.3, base - th * 0.6, 12, 14, '#ffd98a')
  }
  x.restore()
  // tidy blinds pulled to exactly the same height
  if (blinds) { R(x, wx - 10, wy - 10, w + 20, 40, H.ink); R(x, wx - 6, wy - 6, w + 12, 32, H.trim); for (let i = 0; i < 3; i++) R(x, wx, wy + 30 + i * 10, w, 4, H.trimDk) }
  R(x, wx + w / 2 - 5, wy + 30, 10, h - 30, H.trim)
  R(x, wx - 36, wy + h + 18, w + 72, 24, H.ink); R(x, wx - 30, wy + h + 18, w + 60, 16, H.trim)
}
function labels(x, ep, spots) {
  const n = NLAB[ep] ?? 1
  for (let i = 0; i < n; i++) { const s = spots[i]; if (s) drawLabel(x, s[0], s[1], LABELS[i], { size: s[2] || 18, rot: 0 }) }   // spots: { labelIndex: [x, y, size] }
}

function bedroom(x, t, o) {
  const win = SPOTS.bedroom.win
  windowFrame(x, t, win, o.sky)
  // framed print: a pixel ear of wheat over the bed
  box(x, 150, 560, 210, 260, '#f4ecd6', { e: 10, edge: H.oakDk }); drawWheat(x, 255, 790, 6, 0)
  // the bed: hospital corners, a ruler-straight fold
  const bx = 60, by = 1130
  box(x, bx, by - 200, 400, 210, H.oak, { hi: '#d8b07a', lo: H.oakDk })
  box(x, bx, by, 420, 140, '#fbf6ea', { hi: '#ffffff' })
  box(x, bx + 30, by - 46, 150, 56, '#fbf6ea', { hi: '#fff' }); box(x, bx + 210, by - 46, 150, 56, '#fbf6ea', { hi: '#fff' })
  box(x, bx, by + 40, 420, 100, H.sage, { hi: '#9cc4a6', lo: H.sageDk })
  R(x, bx, by + 40, 420, 14, '#fbf6ea')
  R(x, bx, by + 146, 18, 90, H.ink); R(x, bx + 402, by + 146, 18, 90, H.ink)
  drawLabel(x, bx + 105, by - 20, 'L', { size: 16 }); drawLabel(x, bx + 285, by - 20, 'R', { size: 16 })
  // nightstand with labelled drawers + lamp
  const nx = 820
  box(x, nx, 1110, 200, 230, H.oak, { hi: '#d8b07a', lo: H.oakDk })
  R(x, nx, 1220, 200, 6, H.ink)
  drawLabel(x, nx + 100, 1165, 'SOCKS', { size: 18 }); drawLabel(x, nx + 100, 1280, 'OTHER SOCKS', { size: 16 })
  R(x, nx + 90, 990, 20, 120, H.ink); box(x, nx + 40, 930, 120, 70, o.dark > 0.5 ? '#6a6450' : '#f7e7b0', { hi: '#fff6d0' })
}
function kitchen(x, t, o) {
  const win = SPOTS.kitchen.win
  // open shelves with jars, every one labelled
  for (const sy of [420, 600]) { R(x, 40, sy, 330, 14, H.ink); R(x, 40, sy, 330, 8, H.oak) }
  const jar = (jx, jy, c, lab) => { box(x, jx, jy, 66, 100, '#d8e8e0', { e: 4 }); R(x, jx, jy, 66, 14, H.oakDk); R(x, jx + 6, jy + 40, 54, 54, c); drawLabel(x, jx + 33, jy + 66, lab, { size: 13 }) }
  jar(60, 310, '#f4ecd6', 'RICE'); jar(160, 310, '#c98a1f', 'OATS'); jar(260, 310, '#6b3a1c', 'BEANS')
  jar(60, 490, '#e6c08a', 'TEA'); jar(160, 490, '#3a2418', 'COFFEE'); jar(260, 490, '#f7f0dc', 'SUGAR')
  windowFrame(x, t, win, o.sky)
  for (let j = 900; j < 1120; j += 36) for (let i = 0; i < W; i += 54) R(x, i + ((j / 36) % 2) * 27, j, 48, 30, '#2f4a3c')
  box(x, 0, 1110, W, 40, '#e9e4d4', { hi: '#fff' })
  R(x, 0, 1156, W, FLOOR - 1156, H.oak)
  for (let i = 30; i < W; i += 210) { box(x, i, 1180, 180, 170, H.oak, { hi: '#d8b07a', lo: H.oakDk, e: 4 }); R(x, i + 80, 1200, 20, 6, H.ink) }
  // fridge with the to-do board
  box(x, 820, 600, 240, 510, '#e4e8e2', { hi: '#fff' }); R(x, 820, 840, 240, 8, H.ink); R(x, 840, 660, 8, 120, H.ink); R(x, 840, 880, 8, 160, H.ink)
  drawTodoBoard(x, 870, 630, 180, 200, t, { done: DONE[o.ep] ?? 1, size: 14 })
  // mug tree with labelled mugs, the label maker parked square to the counter edge
  R(x, 470, 950, 8, 160, H.ink); for (const [mx, my] of [[430, 990], [490, 1030], [430, 1060]]) box(x, mx, my, 40, 40, H.cream, { e: 3 })
  drawLabelMaker(x, 640, 1070, 4, t)
  box(x, 260, 1050, 80, 60, '#e6c08a', { e: 4 }); R(x, 260, 1050, 80, 10, '#c98a1f')                              // the snack tin
  labels(x, o.ep, { 0: [474, 930, 16], 2: [450, 1118, 13], 3: [300, 1092, 13] })
}
function desk(x, t, o) {
  const win = SPOTS.desk.win
  windowFrame(x, t, win, o.sky)
  // pegboard with outlined tools, and the to-do board
  box(x, 70, 380, 380, 300, '#c9b48a', { e: 6 })
  for (let j = 400; j < 680; j += 24) for (let i = 90; i < 450; i += 24) R(x, i, j, 4, 4, '#8f7a52')
  const tool = (tx, ty, w, h, c) => { R(x, tx - 4, ty - 4, w + 8, h + 8, '#ffffff'); R(x, tx, ty, w, h, c) }
  tool(110, 430, 20, 120, H.red); tool(170, 430, 60, 16, H.blue); tool(170, 480, 60, 16, '#3f9a5a'); tool(270, 430, 16, 100, H.yellow); tool(330, 430, 80, 40, H.pink)
  drawTodoBoard(x, 70, 720, 380, 250, t, { done: DONE[o.ep] ?? 1, size: 22 })
  // desk + monitor + colour-coded binders
  box(x, 60, 1150, 960, 40, H.oak, { hi: '#d8b07a' })
  R(x, 80, 1196, 24, 180, H.ink); R(x, 976, 1196, 24, 180, H.ink)
  box(x, 700, 1196, 260, 150, H.oakDk, { e: 4 }); drawLabel(x, 830, 1270, 'PAPERS (A–Z)', { size: 16 })
  box(x, 400, 960, 300, 180, H.steel, { hi: H.steelLt }); R(x, 540, 1140, 20, 10, H.ink)
  ;[H.red, '#e89a4a', H.yellow, '#3f9a5a', H.blue, '#8a6ad6'].forEach((c, i) => box(x, 760 + i * 36, 1040, 28, 104, c, { e: 3 }))
  drawWheat(x, 140, 1150, 5, t)
  box(x, 250, 1110, 90, 34, H.steelLt, { e: 4 }); R(x, 250, 1110, 90, 10, '#8a82a6')                              // the stapler
  labels(x, o.ep, { 1: [295, 1094, 13] })
}
function windowRoom(x, t, o) {
  const win = SPOTS.window.win
  windowFrame(x, t, win, o.sky)
  box(x, 150, 1240, 780, 110, H.sage, { hi: '#9cc4a6', lo: H.sageDk })
  for (let i = 190; i < 900; i += 120) box(x, i, 1196, 90, 50, H.cream, { hi: '#fff', e: 4 })
  drawWheat(x, 840, win.y + win.h + 18, 7, t)
}

export const SPOTS = {
  bedroom: { floor: FLOOR, win: { x: 520, y: 470, w: 300, h: 340 }, stand: [600, 1320], hide: [{ x: 820, y: 1110, from: 'below', where: 'rising behind the nightstand lamp' }, { x: 60, y: 940, from: 'left', where: 'behind the headboard, left' }] },
  kitchen: { floor: FLOOR, win: { x: 470, y: 380, w: 280, h: 360 }, stand: [520, 1320], board: { x: 870, y: 630, w: 180, h: 200 }, hide: [{ x: 820, y: 960, from: 'left', where: 'leaning out from behind the fridge' }, { x: 370, y: 600, from: 'below', where: 'between the jars on the top shelf' }] },
  desk: { floor: FLOOR, win: { x: 560, y: 380, w: 400, h: 420 }, stand: [540, 1300], board: { x: 70, y: 720, w: 380, h: 250 }, hide: [{ x: 450, y: 520, from: 'right', where: 'leaning out from behind the pegboard' }, { x: 400, y: 960, from: 'below', where: 'rising behind the monitor' }] },
  window: { floor: FLOOR, win: { x: 170, y: 420, w: 740, h: 700 }, stand: [540, 1300], hide: [{ x: 170, y: 760, from: 'left', where: 'behind the left window frame' }] },
}
export const virgoSpots = room => SPOTS[room]

export function drawVirgoHome(x, t, { room = 'bedroom', ep = 'am', dark = 0, sky = null, light = 1, zoom = null } = {}) {
  x.save()
  if (zoom) { x.translate(zoom.x, zoom.y); x.scale(zoom.s, zoom.s); x.translate(-zoom.x, -zoom.y) }
  wall(x); floor(x)
  const o = { ep, dark, sky }
  if (room === 'bedroom') { rug(x, 560, 1560, 600, 150); bedroom(x, t, o) }
  else if (room === 'kitchen') kitchen(x, t, o)
  else if (room === 'desk') desk(x, t, o)
  else windowRoom(x, t, o)
  const win = SPOTS[room].win
  const sun = clamp(light) * (1 - dark)
  if (sun > 0 && room !== 'window') {
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.14 * sun; x.fillStyle = '#ffe2b0'
    x.beginPath(); x.moveTo(win.x, win.y + win.h); x.lineTo(win.x + win.w, win.y + win.h); x.lineTo(win.x + win.w + 220, HH); x.lineTo(win.x - 140, HH); x.closePath(); x.fill(); x.restore()
  }
  if (dark > 0) {
    x.save(); x.globalAlpha = 0.78 * clamp(dark); x.fillStyle = '#070523'
    x.beginPath(); x.rect(0, 0, W, HH); x.rect(win.x + win.w, win.y, -win.w, win.h); x.fill('evenodd'); x.restore()
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.12 * clamp(dark); x.fillStyle = '#8fa8ff'
    x.beginPath(); x.moveTo(win.x, win.y + win.h); x.lineTo(win.x + win.w, win.y + win.h); x.lineTo(win.x + win.w + 160, HH); x.lineTo(win.x - 80, HH); x.closePath(); x.fill(); x.restore()
  }
  x.restore()
}
