// stabducted props: small pixel drawings on canvas (Star Talk "Wild Lessons" #4 "Abducted."). Every function is a pure
// function of its arguments; nothing touches `document` at module top level.
//   starFrame / inSprite        the transform drawStarChar uses (same maths as startalk.js), so props drawn in sprite
//                               CELLS (the 36-cell grid) stay seated through hops and squash
//   tearsCells · sweatCell      props in sprite cells
//   drawAlien                   a pixel alien (big head, almond eyes, antennae) with moods, arm poses, faint, hops
//   drawUFO · drawBeam          the saucer (dome contents via a callback) and its tractor beam
//   drawMonitor · drawBubble · drawStatus · drawTape · drawSiren   the scanner screen, chat bubbles, the printer tape
//   drawJar                     Pisces' specimen jar (the running gag), with a tear level
//   drawBinder                  the "FULL REPORT" binder: closed cover → flips open → one page: "be clear."
//   drawPhone · drawQMark · drawHeart · dustPuff · confetti · drawDealCard
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'

const TAU = Math.PI * 2
export const INK = '#1b1236'
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
export const SCREEN_GREEN = '#7dffb0'
export const ERR_RED = '#ff4a5e'
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

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
export { hopState }
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
/** happy tears from both eyes, k: 1 sniffle · 2 streams · 3 fountains */
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
/** a nervous sweat drop on the upper-left of the head (k 0…1 slides down) */
export function sweatCell(ctx, k) {
  if (k <= 0) return
  const y = 9 + 4 * clamp(k)
  ctx.fillStyle = INK; ctx.fillRect(6.6, y - 0.4, 2.8, 3.6)
  ctx.fillStyle = '#9fe9ff'; ctx.fillRect(7, y, 2, 2.8); ctx.fillRect(7.5, y - 0.6, 1, 0.8)
  ctx.fillStyle = '#ffffff'; ctx.fillRect(7.2, y + 0.4, 0.6, 0.8)
}

// ─────────────────────────────────────────────── pixel grid helper
/** cells: Map "i,j" → colour. Draws a 1-cell ink outline, then the cells. Coordinates in cells, scaled by px. */
function paintGrid(ctx, cells, px, outline = INK) {
  if (outline) {
    ctx.fillStyle = outline
    for (const k of cells.keys()) {
      const [i, j] = k.split(',').map(Number)
      for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!cells.has((i + a) + ',' + (j + b))) ctx.fillRect((i + a) * px, (j + b) * px, px + 0.5, px + 0.5)
    }
  }
  for (const [k, c] of cells) { const [i, j] = k.split(',').map(Number); ctx.fillStyle = c; ctx.fillRect(i * px, j * px, px + 0.5, px + 0.5) }
}
const rowsTo = (cells, rows, pal, i0 = 0, j0 = 0, mirror = false, W = 14) => rows.forEach((r, j) => [...r].forEach((ch, i) => { if (pal[ch]) cells.set((mirror ? W - 1 - (i0 + i) : i0 + i) + ',' + (j0 + j), pal[ch]) }))

// ─────────────────────────────────────────────── the alien
const HEAD = [
  '....GGGGGG....',
  '..GGGGGGGGGG..',
  '.GGGGGGGGGGGG.',
  'GGGGGGGGGGGGGG',
  'GGGGGGGGGGGGGG',
  'GGGGGGGGGGGGGG',
  'GGGGGGGGGGGGGG',
  'GGGGGGGGGGGGGG',
  '.GGGGGGGGGGGG.',
  '..GGGGGGGGGG..',
  '...GGGGGGGG...',
  '.....GGGG.....',
]
const BODY = [
  '....BBBBBB....',
  '...BBBBBBBB...',
  '...BBBBBBBB...',
  '...BBBBBBBB...',
  '...BBBBBBBB...',
  '...BBBBBBBB...',
  '....LL..LL....',
  '...LLL..LLL...',
]
const EYE = {
  almond: ['EE...', 'EEEE.', 'EWEEE', '.EEEE', '..EE.'],
  wide: ['WWW..', 'WWWW.', 'WWPPW', '.WPPW', '..WW.'],
  heart: ['HH.HH', 'HHHHH', 'HHHHH', '.HHH.', '..H..'],
  x: ['E...E', '.E.E.', '..E..', '.E.E.', 'E...E'],
  squint: ['.....', '.....', 'EEEEE', '.....', '.....'],
  happy: ['.....', '.EEE.', 'E...E', '.....', '.....'],
  shut: ['.....', '.....', '.....', 'EEEEE', '.....'],
}
const ARMS = {
  down: [[2, 14], [1, 15], [1, 16]],
  up: [[2, 13], [1, 12], [0, 11]],
  wave: null,
  hip: [[2, 14], [1, 15], [2, 16]],
  point: [[2, 14], [1, 14], [0, 14]],
}
/** a pixel alien standing with its feet centred on (x, y). px = cell size. Pure f(t).
 *  opts: color (skin), suit, mood (almond|wide|heart|x|squint|happy), mouth (dot|open|smile|o), arms ('down'|'up'|'wave'|'hip'),
 *        armsR (right arm pose override), antennae (1|2), wob (antenna wobble amp), droop (0…1 antennae flop), hearts (antenna
 *        balls become hearts), rot (radians about the feet), lift (px up), squash, alpha, coat (lab coat lapels), clip (clipboard),
 *        blink (bool auto-blink), seed, spin (antenna spin 0…1: crackle sparks) */
export function drawAlien(ctx, x, y, px, t, o = {}) {
  const { color = '#8be36b', suit = '#c9d2e6', mood = 'almond', mouth = 'dot', arms = 'down', armsR = null, antennae = 2, wob = 0.6, droop = 0, hearts = false,
    rot = 0, lift = 0, squash = 0, alpha = 1, coat = false, clip = false, blink = true, seed = 1, spin = 0, ball = '#ff8fd0', pop = 1 } = o
  if (alpha <= 0 || pop <= 0) return
  const cells = new Map()
  const dark = mix(color, '#123018', 0.35), light = mix(color, '#ffffff', 0.35)
  rowsTo(cells, HEAD, { G: color }, 0, 0)
  // head gloss
  for (const [i, j] of [[3, 2], [4, 1], [2, 3], [5, 1]]) cells.set(i + ',' + j, light)
  for (let i = 1; i <= 12; i++) if (cells.has(i + ',9')) cells.set(i + ',9', cells.get(i + ',9'))
  // eyes
  let em = mood
  if (blink && (em === 'almond' || em === 'wide')) { const ph = ((t + seed * 0.83) % 3.7); if (ph < 0.12) em = 'shut' }
  const eye = EYE[em] || EYE.almond
  const epal = { E: INK, W: em === 'wide' ? '#ffffff' : '#ffffff', P: INK, H: '#ff3d6e' }
  rowsTo(cells, eye, epal, 1, 4, false)
  rowsTo(cells, eye, epal, 1, 4, true)
  if (em === 'heart') { cells.set('2,5', '#ffffff'); cells.set('9,5', '#ffffff') }
  // mouth
  const M = { dot: [[6, 10], [7, 10]], open: [[6, 9], [7, 9], [6, 10], [7, 10]], smile: [[5, 9], [8, 9], [6, 10], [7, 10]], o: [[6, 9], [7, 9], [6, 10], [7, 10]], flat: [[5, 10], [6, 10], [7, 10], [8, 10]] }[mouth] || []
  for (const [i, j] of M) cells.set(i + ',' + j, mouth === 'open' ? '#5a1030' : dark)
  if (mouth === 'open') cells.set('6,10', '#ff6b8a')
  // body / suit
  rowsTo(cells, BODY, { B: suit, L: color }, 0, 12)
  if (coat) { for (const [i, j] of [[5, 13], [5, 14], [8, 13], [8, 14], [6, 15], [7, 15]]) cells.set(i + ',' + j, '#9aa6c4'); cells.set('9,15', '#ff6b8a') }
  else { cells.set('6,14', GOLD); cells.set('7,14', GOLD); cells.set('6,13', '#fff1b0') }
  // arms (left = mirror of right poses)
  const armR = armsR || arms
  const poseCells = (pose, side) => {
    let P = ARMS[pose] || ARMS.down
    if (pose === 'wave') { const up = Math.sin(t * 14 + seed) > 0; P = up ? [[2, 13], [1, 12], [0, 11]] : [[2, 13], [1, 12], [1, 11]] }
    for (const [i, j] of P) cells.set((side > 0 ? 13 - i : i) + ',' + j, color)
  }
  poseCells(arms === 'wave' ? 'down' : arms, -1)
  poseCells(armR, 1)

  ctx.save(); ctx.globalAlpha *= alpha
  ctx.translate(Math.round(x), Math.round(y - lift)); ctx.rotate(rot); ctx.scale((1 + squash) * pop, (1 - squash * 0.9) * pop)
  ctx.translate(-7 * px, -20 * px)
  // antennae (behind the head): stalks from the top of the head
  const stalks = antennae === 1 ? [[6.5, 0]] : [[4, -1], [9, 1]]
  for (const [i0, d] of stalks) {
    const w = Math.sin(t * 5.2 + seed + i0) * wob, fl = droop
    const pts = []
    for (let k = 1; k <= 4; k++) {
      const ux = d * k * 0.45 * (1 - fl) + w * k * 0.35 + d * fl * k * 1.1
      const uy = -k * (1 - fl) + fl * (k * 0.4 - 0.4)
      pts.push([Math.round(i0 + ux), Math.round(uy)])
    }
    ctx.fillStyle = INK
    for (const [i, j] of pts) ctx.fillRect((i - 1) * px, (j - 0) * px, 3 * px, px)
    for (const [i, j] of pts) ctx.fillRect(i * px, (j - 1) * px, px, 3 * px)
    ctx.fillStyle = dark
    for (const [i, j] of pts) ctx.fillRect(i * px, j * px, px, px)
    const [bi, bj] = pts[pts.length - 1]
    if (hearts) {
      const H = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
      ctx.fillStyle = INK; H.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'H') ctx.fillRect((bi - 3 + i) * px - px * 0.35, (bj - 5 + j) * px - px * 0.35, px * 1.7, px * 1.7) }))
      H.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'H') { ctx.fillStyle = i === 1 && j === 1 ? '#ffffff' : '#ff3d6e'; ctx.fillRect((bi - 3 + i) * px, (bj - 5 + j) * px, px, px) } }))
    } else {
      const glow = 0.5 + 0.5 * Math.sin(t * 6 + i0)
      ctx.save(); ctx.globalCompositeOperation = 'lighter'
      const g = ctx.createRadialGradient((bi + 0.5) * px, (bj - 0.5) * px, 0, (bi + 0.5) * px, (bj - 0.5) * px, px * 4)
      g.addColorStop(0, rgba(ball, 0.55 * glow)); g.addColorStop(1, rgba(ball, 0))
      ctx.fillStyle = g; ctx.fillRect((bi - 4) * px, (bj - 5) * px, px * 9, px * 9); ctx.restore()
      ctx.fillStyle = INK; ctx.fillRect((bi - 1) * px, (bj - 2) * px, px * 3, px * 3)
      ctx.fillStyle = ball; ctx.fillRect((bi - 0.5) * px, (bj - 1.5) * px, px * 2, px * 2)
      ctx.fillStyle = '#ffffff'; ctx.fillRect((bi - 0.5) * px, (bj - 1.5) * px, px * 0.8, px * 0.8)
    }
    if (spin > 0) {                                               // crackle: little sparks around the ball
      const r = rng(Math.floor(t * 14) + i0 * 7)
      for (let k = 0; k < 4; k++) { const a = r() * TAU, d2 = 1.5 + r() * 2.5; ctx.fillStyle = k % 2 ? '#fff6a0' : '#7fe0ff'; ctx.fillRect((bi + Math.cos(a) * d2) * px, (bj - 1 + Math.sin(a) * d2) * px, px, px) }
    }
  }
  paintGrid(ctx, cells, px)
  if (clip) {                                                     // a clipboard held in the right hand
    const cx0 = 11.5 * px, cy0 = 13.5 * px, w = 5.5 * px, h = 7 * px
    ctx.fillStyle = INK; ctx.fillRect(cx0 - px * 0.6, cy0 - px * 0.6, w + px * 1.2, h + px * 1.2)
    ctx.fillStyle = '#b07a3c'; ctx.fillRect(cx0, cy0, w, h)
    ctx.fillStyle = '#fbf6ec'; ctx.fillRect(cx0 + px * 0.6, cy0 + px * 1.2, w - px * 1.2, h - px * 1.8)
    ctx.fillStyle = '#9aa6c4'; for (let k = 0; k < 3; k++) ctx.fillRect(cx0 + px, cy0 + px * (2.2 + k * 1.4), w - px * 2, px * 0.5)
    ctx.fillStyle = '#d8d8e4'; ctx.fillRect(cx0 + px * 1.6, cy0 - px * 0.4, w - px * 3.2, px * 1.1)
  }
  ctx.restore()
}
function mix(a, b, k) {
  const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16)
  const ch = s => Math.round(lerp((A >> s) & 255, (B >> s) & 255, k))
  return '#' + [16, 8, 0].map(s => ch(s).toString(16).padStart(2, '0')).join('')
}
/** the alien's head-top position (world) for placing "?" marks etc. */
export const alienTop = (x, y, px) => [x, y - 20 * px]

// ─────────────────────────────────────────────── the UFO
/** a pixel saucer centred on the body disc at (x, y). px = cell. dome(cx, cy, rx, ry) draws what's inside the glass. */
export function drawUFO(ctx, x, y, px, t, { dome = null, alpha = 1, rot = 0, lights = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(Math.round(x), Math.round(y)); ctx.rotate(rot)
  const W = 44, CX = 22
  // glow underneath
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(0, px * 3, 0, 0, px * 3, px * 26)
  g.addColorStop(0, 'rgba(127,255,176,0.35)'); g.addColorStop(1, 'rgba(127,255,176,0)')
  ctx.fillStyle = g; ctx.fillRect(-px * 26, -px * 20, px * 52, px * 46); ctx.restore()
  ctx.translate(-CX * px, -10 * px)
  // dome back (glass), then contents, then glass front
  const domeCells = []
  for (let j = 0; j <= 9; j++) for (let i = 0; i < W; i++) { const dx = (i + 0.5 - CX) / 10.5, dy = (j + 0.5 - 9.5) / 9; if (dx * dx + dy * dy <= 1) domeCells.push([i, j]) }
  ctx.fillStyle = INK
  for (const [i, j] of domeCells) ctx.fillRect((i - 0.6) * px, (j - 0.6) * px, px * 2.2, px * 2.2)
  ctx.fillStyle = 'rgba(40,90,120,0.95)'
  for (const [i, j] of domeCells) ctx.fillRect(i * px, j * px, px + 0.5, px + 0.5)
  if (dome) {
    ctx.save(); ctx.beginPath(); for (const [i, j] of domeCells) ctx.rect(i * px, j * px, px + 0.5, px + 0.5); ctx.clip()
    dome(CX * px, 9.5 * px, 10.5 * px, 9 * px)
    ctx.restore()
  }
  ctx.fillStyle = 'rgba(160,240,255,0.18)'
  for (const [i, j] of domeCells) ctx.fillRect(i * px, j * px, px + 0.5, px + 0.5)
  ctx.fillStyle = 'rgba(255,255,255,0.75)'
  for (const [i, j] of [[16, 2], [15, 3], [14, 4], [14, 5], [17, 1], [18, 1]]) ctx.fillRect(i * px, j * px, px, px)
  // body disc
  const disc = []
  for (let j = 8; j <= 15; j++) for (let i = 0; i < W; i++) { const dx = (i + 0.5 - CX) / 22, dy = (j + 0.5 - 11.5) / 3.8; if (dx * dx + dy * dy <= 1) disc.push([i, j]) }
  const set = new Set(disc.map(([i, j]) => i + ',' + j))
  ctx.fillStyle = INK
  for (const [i, j] of disc) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!set.has((i + a) + ',' + (j + b))) ctx.fillRect((i + a) * px, (j + b) * px, px + 0.5, px + 0.5)
  for (const [i, j] of disc) { ctx.fillStyle = j <= 9 ? '#e3e8f6' : j <= 11 ? '#aab3d3' : j <= 13 ? '#7a83a8' : '#565d80'; ctx.fillRect(i * px, j * px, px + 0.5, px + 0.5) }
  // rim lights
  for (let k = 0; k < 8; k++) {
    const i = 3 + k * 5.4, on = ((Math.floor(t * 6) + k) % 3) === 0 || lights > 1
    const col = ['#ffd84a', '#ff8fd0', '#7fe0ff'][k % 3]
    ctx.fillStyle = INK; ctx.fillRect((i - 0.4) * px, 10.6 * px, px * 1.8, px * 1.8)
    ctx.fillStyle = on ? col : mix(col, '#2a2440', 0.6); ctx.fillRect(i * px, 11 * px, px, px)
    if (on) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = rgba(col, 0.35 * lights); ctx.fillRect((i - 1) * px, 10 * px, px * 3, px * 3); ctx.restore() }
  }
  // the hatch
  ctx.fillStyle = INK; ctx.fillRect(16 * px, 14.6 * px, 12 * px, 2 * px)
  ctx.fillStyle = '#9dffc8'; ctx.fillRect(17 * px, 15 * px, 10 * px, 1 * px)
  ctx.restore()
}
/** tractor beam from (x, y0) down to y1, top width w0 → bottom width w1, strength k 0…1 */
export function drawBeam(ctx, x, y0, y1, w0, w1, k, t) {
  if (k <= 0) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createLinearGradient(0, y0, 0, y1)
  g.addColorStop(0, `rgba(160,255,200,${0.5 * k})`); g.addColorStop(1, `rgba(127,255,176,${0.12 * k})`)
  ctx.fillStyle = g
  ctx.beginPath(); ctx.moveTo(x - w0 / 2, y0); ctx.lineTo(x + w0 / 2, y0); ctx.lineTo(x + w1 / 2, y1); ctx.lineTo(x - w1 / 2, y1); ctx.closePath(); ctx.fill()
  // rising rings
  for (let q = 0; q < 6; q++) {
    const ph = ((q / 6 - t * 0.9) % 1 + 1) % 1, yy = lerp(y1, y0, ph), ww = lerp(w1, w0, ph)
    ctx.fillStyle = `rgba(220,255,235,${0.28 * k * Math.sin(Math.PI * ph)})`
    ctx.fillRect(Math.round(x - ww / 2), Math.round(yy), Math.round(ww), 8)
  }
  // sparkles
  const r = rng(91)
  for (let q = 0; q < 14; q++) {
    const ph = ((r() - t * (0.4 + r() * 0.4)) % 1 + 1) % 1, u = r() - 0.5, yy = lerp(y1, y0, ph), ww = lerp(w1, w0, ph)
    ctx.fillStyle = `rgba(255,255,255,${0.8 * k * Math.sin(Math.PI * ph)})`
    ctx.fillRect(Math.round(x + u * ww * 0.85), Math.round(yy), 8, 8)
  }
  ctx.restore()
}

// ─────────────────────────────────────────────── the scanner monitor
/** a hanging pixel CRT; returns the screen rect. alarm 0…1 tints the bezel red; shake px */
export function drawMonitor(ctx, cx, cy, w, h, t, { alarm = 0, label = 'SCANNER · SPECIMEN 001' } = {}) {
  const x0 = cx - w / 2, y0 = cy - h / 2, P = 8
  // cables to the ceiling
  ctx.fillStyle = INK; ctx.fillRect(x0 + 90, -10, 18, y0 + 20); ctx.fillRect(x0 + w - 108, -10, 18, y0 + 20)
  ctx.fillStyle = '#4a4f72'; ctx.fillRect(x0 + 94, -10, 10, y0 + 20); ctx.fillRect(x0 + w - 104, -10, 10, y0 + 20)
  // bezel (stepped corners)
  const step = (o, col) => { ctx.fillStyle = col; ctx.fillRect(x0 + o + 2 * P, y0 + o, w - 2 * o - 4 * P, h - 2 * o); ctx.fillRect(x0 + o, y0 + o + 2 * P, w - 2 * o, h - 2 * o - 4 * P); ctx.fillRect(x0 + o + P, y0 + o + P, w - 2 * o - 2 * P, h - 2 * o - 2 * P) }
  step(-P, INK)
  step(0, mix('#8a93b8', '#ff4a5e', alarm * 0.7))
  step(P, mix('#5e6690', '#a0203a', alarm * 0.7))
  ctx.fillStyle = mix('#c3cae6', '#ffb0b8', alarm * 0.7); ctx.fillRect(x0 + 3 * P, y0 + P * 0.5, w - 6 * P, P * 0.6)
  // screen
  const sx = x0 + 3 * P, sy = y0 + 3 * P, sw = w - 6 * P, sh = h - 6 * P
  const g = ctx.createRadialGradient(cx, cy, 40, cx, cy, sw * 0.7)
  g.addColorStop(0, '#0f3a2c'); g.addColorStop(1, '#061a14')
  ctx.fillStyle = g; ctx.fillRect(sx, sy, sw, sh)
  ctx.fillStyle = 'rgba(125,255,176,0.05)'
  for (let yy = sy + ((t * 40) % 6); yy < sy + sh; yy += 6) ctx.fillRect(sx, Math.round(yy), sw, 2)
  // header
  ctx.font = `700 24px ${MONO}`; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = 'rgba(125,255,176,0.7)'
  ctx.fillText(label, sx + 22, sy + 38)
  ctx.textAlign = 'right'; ctx.fillStyle = Math.floor(t * 2) % 2 ? 'rgba(255,74,94,0.95)' : 'rgba(255,74,94,0.35)'
  ctx.fillText('● REC', sx + sw - 22, sy + 38)
  ctx.fillStyle = 'rgba(125,255,176,0.25)'; ctx.fillRect(sx + 22, sy + 52, sw - 44, 2)
  return { x: sx, y: sy, w: sw, h: sh }
}
/** chat bubble centred on (cx, cy). side 'r' sent / 'l' received */
export function drawBubble(ctx, cx, cy, w, h, { fill = '#fbf6ec', text = '', color = INK, font = `700 40px ${INTER}`, side = 'r', alpha = 1, sc = 1, rot = 0, label = null, labelColor = 'rgba(239,230,214,0.7)' } = {}) {
  if (alpha <= 0 || sc <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(sc, sc)
  const r = Math.min(h / 2, 30)
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, r)
  if (side) { const sx = side === 'r' ? w / 2 - 26 : -w / 2 + 26, d = side === 'r' ? 1 : -1; ctx.moveTo(sx - 12 * d, h / 2 - 2); ctx.lineTo(sx + 16 * d, h / 2 + 14); ctx.lineTo(sx + 6 * d, h / 2 - 2) }
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 12; ctx.shadowOffsetY = 4; ctx.fillStyle = fill; ctx.fill(); ctx.restore()
  if (text) { ctx.fillStyle = color; ctx.font = font; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 3) }
  if (label) { ctx.font = `700 18px ${MONO}`; ctx.textAlign = side === 'r' ? 'right' : 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = labelColor; ctx.fillText(label, side === 'r' ? w / 2 - 10 : -w / 2 + 10, -h / 2 - 10) }
  ctx.restore()
}
/** the status line at the bottom of the screen: typed text with a block cursor (k 0…1 of the text), colour, optional flash */
export function drawStatus(ctx, x, y, text, k, t, { color = SCREEN_GREEN, size = 40, flash = false, center = false } = {}) {
  if (k <= 0) return
  const n = Math.round(text.length * clamp(k)), s = text.slice(0, n)
  ctx.save()
  ctx.font = `700 ${size}px ${MONO}`; ctx.textAlign = center ? 'center' : 'left'; ctx.textBaseline = 'alphabetic'
  const on = !flash || Math.floor(t * 5) % 2 === 0
  ctx.shadowColor = color; ctx.shadowBlur = 16
  ctx.fillStyle = on ? color : rgba(color, 0.35)
  ctx.fillText(s, x, y)
  ctx.shadowBlur = 0
  if (k < 1 || Math.floor(t * 2.5) % 2 === 0) { const wv = ctx.measureText(s).width; const cx0 = center ? x + wv / 2 : x + wv; ctx.fillStyle = rgba(color, 0.9); ctx.fillRect(cx0 + 6, y - size * 0.78, size * 0.5, size * 0.86) }
  ctx.restore()
}
/** paper printer tape out of a slot at (x, y0), unrolling down by len px, with lines of text printed every `gap` px */
export function drawTape(ctx, x, y0, w, len, t, { lines = ['ERROR:', 'MIXED SIGNAL'], rot = 0, color = ERR_RED } = {}) {
  if (len <= 0) return
  ctx.save(); ctx.translate(x, y0); ctx.rotate(rot)
  // slot
  ctx.fillStyle = INK; ctx.fillRect(-w / 2 - 14, -14, w + 28, 22)
  ctx.fillStyle = '#2a2a44'; ctx.fillRect(-w / 2 - 8, -8, w + 16, 10)
  // paper (slightly wavy edge)
  ctx.beginPath(); ctx.moveTo(-w / 2, 0)
  for (let yy = 0; yy <= len; yy += 20) ctx.lineTo(-w / 2 + 4 * Math.sin(yy * 0.03 + t * 3), yy)
  for (let yy = len; yy >= 0; yy -= 20) ctx.lineTo(w / 2 + 4 * Math.sin(yy * 0.03 + t * 3), yy)
  ctx.closePath()
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.45)'; ctx.shadowBlur = 10; ctx.fillStyle = '#fbf6ec'; ctx.fill(); ctx.restore()
  ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.stroke()
  ctx.save(); ctx.clip()
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
  let yy = 46
  for (let k = 0; yy < len + 60; k++) {
    const L = lines[k % lines.length]
    ctx.font = `700 ${L.length > 10 ? 30 : 34}px ${MONO}`; ctx.fillStyle = k % lines.length === 0 ? color : INK
    ctx.fillText(L, 0, yy)
    yy += k % lines.length === lines.length - 1 ? 64 : 40
  }
  // perforation dashes
  ctx.fillStyle = 'rgba(27,18,54,0.18)'; for (let q = 20; q < len; q += 22) { ctx.fillRect(-w / 2 + 10, q, 6, 6); ctx.fillRect(w / 2 - 16, q, 6, 6) }
  ctx.restore()
  ctx.restore()
}
/** a rotating siren light (on top of the monitor) + returns nothing; k 0…1 */
export function drawSiren(ctx, x, y, k, t) {
  if (k <= 0) return
  ctx.save()
  const a = t * 9
  ctx.globalCompositeOperation = 'lighter'
  for (const s of [0, Math.PI]) {
    const ang = a + s
    const g = ctx.createRadialGradient(x, y, 0, x, y, 700)
    g.addColorStop(0, `rgba(255,60,80,${0.4 * k})`); g.addColorStop(1, 'rgba(255,60,80,0)')
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, 700, ang - 0.28, ang + 0.28); ctx.closePath(); ctx.fill()
  }
  ctx.restore()
  ctx.fillStyle = INK; ctx.fillRect(x - 40, y - 8, 80, 30); ctx.fillRect(x - 30, y - 46, 60, 44)
  ctx.fillStyle = '#8a93b8'; ctx.fillRect(x - 34, y - 2, 68, 18)
  ctx.fillStyle = Math.sin(a) > 0 ? '#ff6070' : '#c0203a'; ctx.fillRect(x - 24, y - 40, 48, 38)
  ctx.fillStyle = '#ffd0d6'; ctx.fillRect(x - 18, y - 34, 10, 10)
}

// ─────────────────────────────────────────────── Pisces' specimen jar
/** the jar centred at (cx, cy) w × h; level 0…1 of happy tears; inner(cx, cy) draws Pisces before the glass front */
export function drawJar(ctx, cx, cy, w, h, t, { level = 0.2, inner = null, label = 'SPECIMEN #2', sub = 'CRIES A LOT' } = {}) {
  const x0 = cx - w / 2, y0 = cy - h / 2
  // shelf
  ctx.fillStyle = INK; ctx.fillRect(cx - w * 0.85, y0 + h + 4, w * 1.7, 22)
  ctx.fillStyle = '#7a83a8'; ctx.fillRect(cx - w * 0.85 + 4, y0 + h + 8, w * 1.7 - 8, 10)
  // back glass
  ctx.fillStyle = 'rgba(40,90,120,0.55)'; ctx.beginPath(); ctx.roundRect(x0, y0 + 26, w, h - 26, 22); ctx.fill()
  // tears
  const lv = clamp(level), wy = y0 + h - (h - 40) * lv
  if (lv > 0) {
    ctx.save(); ctx.beginPath(); ctx.roundRect(x0, y0 + 26, w, h - 26, 22); ctx.clip()
    ctx.fillStyle = 'rgba(143,227,255,0.55)'
    ctx.beginPath(); ctx.moveTo(x0, y0 + h)
    for (let xx = 0; xx <= w; xx += 10) ctx.lineTo(x0 + xx, wy + 4 * Math.sin(xx * 0.08 + t * 4))
    ctx.lineTo(x0 + w, y0 + h); ctx.closePath(); ctx.fill()
    ctx.restore()
  }
  if (inner) { ctx.save(); ctx.beginPath(); ctx.roundRect(x0, y0 + 26, w, h - 26, 22); ctx.clip(); inner(cx, cy + 14); ctx.restore() }
  // front glass
  ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.beginPath(); ctx.roundRect(x0, y0 + 26, w, h - 26, 22); ctx.stroke()
  ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(200,245,255,0.7)'; ctx.beginPath(); ctx.roundRect(x0 + 4, y0 + 30, w - 8, h - 34, 18); ctx.stroke()
  ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.fillRect(x0 + 14, y0 + 46, 8, h * 0.45); ctx.fillRect(x0 + 14, y0 + 46 + h * 0.5, 8, 14)
  // lid
  ctx.fillStyle = INK; ctx.fillRect(x0 - 8, y0 + 2, w + 16, 34)
  ctx.fillStyle = '#9aa3c7'; ctx.fillRect(x0 - 4, y0 + 6, w + 8, 26)
  ctx.fillStyle = '#d8deef'; ctx.fillRect(x0, y0 + 8, w, 6)
  // label
  const lw = w + 44
  ctx.fillStyle = INK; ctx.fillRect(cx - lw / 2 - 3, y0 + h + 32, lw + 6, 58)
  ctx.fillStyle = '#fbf6ec'; ctx.fillRect(cx - lw / 2, y0 + h + 35, lw, 52)
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = INK
  ctx.font = `700 19px ${MONO}`; ctx.fillText(label, cx, y0 + h + 56)
  ctx.font = `700 17px ${MONO}`; ctx.fillStyle = '#c0203a'; ctx.fillText(sub, cx, y0 + h + 78)
}

// ─────────────────────────────────────────────── the report binder
/** the binder centred on (cx, cy): w × h when OPEN (closed = right half). open 0…1 flips the cover over the spine. */
export function drawBinder(ctx, cx, cy, w, h, t, { open = 0, write = 1, alpha = 1, sc = 1, rot = 0 } = {}) {
  if (alpha <= 0 || sc <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(sc, sc)
  const hw = w / 2, hh = h / 2, thick = 26
  const cover = (x0, flip) => {
    // the cover: deep purple, a gold frame, the label
    ctx.fillStyle = INK; ctx.fillRect(x0 - 5, -hh - 5, hw + 10, h + 10)
    ctx.fillStyle = '#4b2a86'; ctx.fillRect(x0, -hh, hw, h)
    ctx.fillStyle = '#3a1f6c'; ctx.fillRect(x0, -hh, 18, h)
    ctx.strokeStyle = GOLD; ctx.lineWidth = 4; ctx.strokeRect(x0 + 34, -hh + 22, hw - 56, h - 44)
    if (!flip) {
      ctx.fillStyle = '#fbf6ec'; ctx.fillRect(x0 + 56, -hh + 74, hw - 100, 150)
      ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
      ctx.font = `700 22px ${MONO}`; ctx.fillText('REPORT ON', x0 + hw / 2 + 6, -hh + 112)
      ctx.font = `800 40px ${INTER}`; ctx.fillText('HUMAN', x0 + hw / 2 + 6, -hh + 160)
      ctx.fillText('DATING', x0 + hw / 2 + 6, -hh + 204)
      ctx.font = `700 20px ${MONO}`; ctx.fillStyle = GOLD; ctx.fillText('VOL. 1 OF 1', x0 + hw / 2 + 6, -hh + 270)
      ctx.fillStyle = 'rgba(242,199,92,0.8)'; ctx.fillText('TOP SECRET', x0 + hw / 2 + 6, hh - 46)
    }
  }
  // thickness (pages edge) under the right half
  ctx.fillStyle = INK; ctx.fillRect(-5, -hh + thick - 5, hw + 10 + thick * 0.3, h + 10)
  ctx.fillStyle = '#e8dcc4'; ctx.fillRect(0, -hh + thick, hw + thick * 0.3, h)
  for (let q = 0; q < 6; q++) { ctx.fillStyle = 'rgba(27,18,54,0.18)'; ctx.fillRect(hw, -hh + thick + 12 + q * (h / 6), thick * 0.3, 3) }
  const p = clamp(open)
  if (p <= 0) { cover(0, false); ctx.restore(); return }
  // open: the left board + the two pages
  const pages = () => {
    ctx.fillStyle = INK; ctx.fillRect(-hw - 5, -hh - 5, w + 10, h + 10)
    ctx.fillStyle = '#4b2a86'; ctx.fillRect(-hw, -hh, w, h)
    ctx.fillStyle = '#fbf6ec'; ctx.fillRect(-hw + 16, -hh + 14, hw - 20, h - 28); ctx.fillRect(4, -hh + 14, hw - 20, h - 28)
    ctx.fillStyle = 'rgba(27,18,54,0.15)'; ctx.fillRect(-10, -hh + 14, 20, h - 28)
    // rings
    for (const ry of [-hh + 70, 0, hh - 70]) { ctx.fillStyle = INK; ctx.fillRect(-22, ry - 12, 44, 24); ctx.fillStyle = '#c3cae6'; ctx.fillRect(-18, ry - 8, 36, 16) }
    // left page: findings header + lots of crossed-out notes
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = INK
    ctx.font = `700 22px ${MONO}`; ctx.fillText('FINDINGS', -hw + 44, -hh + 64)
    ctx.fillStyle = 'rgba(27,18,54,0.25)'; ctx.fillRect(-hw + 44, -hh + 76, hw - 90, 3)
    const notes = ["'whatever' =?", "'maybe' =??", "':)' = ???", 'mixed signal', 'mixed signal']
    ctx.font = `600 22px ${INTER}`
    notes.forEach((n, k) => { const yy = -hh + 118 + k * 46; ctx.fillStyle = 'rgba(27,18,54,0.6)'; ctx.fillText(n, -hw + 44, yy); ctx.fillStyle = ERR_RED; ctx.fillRect(-hw + 40, yy - 8, ctx.measureText(n).width + 10, 4) })
    // right page: the one finding
    const wk = clamp(write)
    if (wk > 0) {
      ctx.save(); ctx.globalAlpha *= clamp(wk * 2); ctx.textAlign = 'center'
      const s = 1 + 0.25 * (1 - easeOutBack(wk, 2.4))
      ctx.translate(hw / 2 - 4, 10); ctx.scale(s, s); ctx.rotate(-0.06)
      ctx.font = `italic 600 96px ${SERIF}`; ctx.fillStyle = INK
      ctx.fillText('be', 0, -30); ctx.fillText('clear.', 0, 60)
      ctx.restore()
    }
  }
  pages()
  // the cover swinging over (from the right half to the left)
  if (p < 1) {
    const sx = Math.cos(Math.PI * ease.inOutQuad(p))
    ctx.save(); ctx.scale(sx >= 0 ? sx : -sx, 1)
    if (sx >= 0) cover(0, false); else { ctx.scale(-1, 1); cover(0, true) }
    ctx.restore()
  }
  ctx.restore()
}

// ─────────────────────────────────────────────── small stuff
/** a little phone with a glowing screen, centred */
export function drawPhone(ctx, x, y, w, t, { rot = 0, alpha = 1, glow = 1 } = {}) {
  if (alpha <= 0) return
  const h = w * 1.85
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot)
  ctx.fillStyle = INK; ctx.beginPath(); ctx.roundRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10, 16); ctx.fill()
  ctx.fillStyle = '#4a4f72'; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 12); ctx.fill()
  ctx.fillStyle = `rgba(127,224,255,${0.75 + 0.25 * glow})`; ctx.beginPath(); ctx.roundRect(-w / 2 + 5, -h / 2 + 8, w - 10, h - 16, 8); ctx.fill()
  ctx.fillStyle = '#fbf6ec'; ctx.beginPath(); ctx.roundRect(-w / 2 + 10, -h * 0.25, w * 0.6, h * 0.12, 6); ctx.fill()
  ctx.fillStyle = GOLD; ctx.beginPath(); ctx.roundRect(-w / 2 + w * 0.3, -h * 0.05, w * 0.6, h * 0.12, 6); ctx.fill()
  ctx.restore()
}
/** a pixel "?" (s = px per cell), pop scale k */
export function drawQMark(ctx, x, y, s, k = 1, col = GOLD, rot = 0) {
  if (k <= 0) return
  const Q = ['.XXX.', 'X...X', '....X', '...X.', '..X..', '.....', '..X..']
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k)
  ctx.fillStyle = INK; Q.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'X') ctx.fillRect((i - 2.5) * s - s * 0.4, (j - 3.5) * s - s * 0.4, s * 1.8, s * 1.8) }))
  ctx.fillStyle = col; Q.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'X') ctx.fillRect((i - 2.5) * s, (j - 3.5) * s, s, s) }))
  ctx.restore()
}
export function drawHeart(ctx, x, y, px, col = '#ff4f7e') {
  const H = ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...']
  ctx.fillStyle = INK; H.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'X') ctx.fillRect(Math.round(x + (i - 3.5) * px - px * 0.4), Math.round(y + (j - 3) * px - px * 0.4), Math.ceil(px * 1.8), Math.ceil(px * 1.8)) }))
  H.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'X') { ctx.fillStyle = i === 1 && j === 1 ? '#ffffff' : col; ctx.fillRect(Math.round(x + (i - 3.5) * px), Math.round(y + (j - 3) * px), Math.ceil(px), Math.ceil(px)) } }))
}
/** a puff of smoke / dust (k 0 → 1), rising when rise > 0 */
export function dustPuff(ctx, x, y, k, { n = 7, spread = 110, seed = 3, col = '#d8cfe8', rise = 18 } = {}) {
  if (k <= 0 || k >= 1) return
  const r = rng(seed)
  ctx.save(); ctx.globalAlpha *= (1 - ease.inQuad(k)) * 0.9
  for (let i = 0; i < n; i++) {
    const a = Math.PI + (r() - 0.5) * 2.2 + (rise > 30 ? Math.PI / 2 : 0), d = spread * (0.35 + r() * 0.65) * ease.outCubic(k), s = (16 + r() * 22) * (0.6 + 0.8 * k)
    const px = x + Math.cos(a) * d, py = y + Math.sin(a) * d * 0.45 - k * rise
    ctx.fillStyle = INK; ctx.fillRect(Math.round(px - s / 2 - 4), Math.round(py - s / 2 - 4), Math.round(s + 8), Math.round(s + 8))
    ctx.fillStyle = col; ctx.fillRect(Math.round(px - s / 2), Math.round(py - s / 2), Math.round(s), Math.round(s))
    ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(px - s / 2), Math.round(py - s / 2), Math.round(s * 0.4), Math.round(s * 0.3))
  }
  ctx.restore()
}
/** pixel confetti falling from the top since t0 */
export function confetti(ctx, t, t0, { n = 40, seed = 7, W = 1080, alpha = 1 } = {}) {
  const d0 = t - t0
  if (d0 < 0 || alpha <= 0) return
  const r = rng(seed), cols = [GOLD, PINK, '#7fe0ff', '#7dffb0', '#c9a6ff', '#ffffff']
  ctx.save(); ctx.globalAlpha *= alpha
  for (let k = 0; k < n; k++) {
    const x0 = r() * W, sp = 300 + r() * 380, ph = r() * TAU, delay = r() * 0.5, d = d0 - delay
    if (d < 0) continue
    const y = -30 + d * sp
    if (y > 2000) continue
    ctx.fillStyle = cols[k % cols.length]
    const w = 14 * (0.5 + 0.5 * Math.abs(Math.sin(d * 6 + ph)))
    ctx.fillRect(Math.round(x0 + Math.sin(d * 3 + ph) * 50), Math.round(y), Math.round(w), 14)
  }
  ctx.restore()
}
/** the dealbreakers card (tie-in): a pixel panel with a header and up to 3 stamped chips. chips: [{ text, kind: 'yes'|'no', k }] */
export function drawDealCard(ctx, cx, cy, w, h, t, { k = 1, chips = [], title = 'DEALBREAKERS', who = '♎︎ LIBRA' } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k); ctx.rotate(0.015 * Math.sin(t * 1.3))
  const P = 8, x0 = -w / 2, y0 = -h / 2
  const step = (o, col) => { ctx.fillStyle = col; ctx.fillRect(x0 + o + 2 * P, y0 + o, w - 2 * o - 4 * P, h - 2 * o); ctx.fillRect(x0 + o, y0 + o + 2 * P, w - 2 * o, h - 2 * o - 4 * P); ctx.fillRect(x0 + o + P, y0 + o + P, w - 2 * o - 2 * P, h - 2 * o - 2 * P) }
  ctx.save(); ctx.shadowColor = 'rgba(242,199,92,0.5)'; ctx.shadowBlur = 40; step(0, GOLD); ctx.restore()
  step(P, '#1a1036')
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
  ctx.font = `700 30px ${MONO}`; ctx.fillStyle = GOLD; ctx.fillText(who, 0, y0 + 74)
  ctx.font = `700 24px ${MONO}`; ctx.fillStyle = 'rgba(239,230,214,0.75)'; ctx.fillText(title, 0, y0 + 114)
  ctx.fillStyle = 'rgba(242,199,92,0.35)'; ctx.fillRect(x0 + 50, y0 + 134, w - 100, 3)
  chips.forEach((c, i) => {
    const kk = clamp(c.k)
    if (kk <= 0) return
    const s = 1 + 0.5 * (1 - easeOutBack(kk, 2.6)), yy = y0 + 196 + i * 104
    ctx.save(); ctx.translate(0, yy); ctx.scale(s, s); ctx.globalAlpha *= clamp(kk * 3)
    const col = c.kind === 'yes' ? '#46cf82' : '#ff5c78', cw = w - 90
    ctx.fillStyle = INK; ctx.beginPath(); ctx.roundRect(-cw / 2 - 4, -38, cw + 8, 76, 38); ctx.fill()
    ctx.fillStyle = rgba(col, 0.22); ctx.beginPath(); ctx.roundRect(-cw / 2, -34, cw, 68, 34); ctx.fill()
    ctx.lineWidth = 4; ctx.strokeStyle = col; ctx.stroke()
    ctx.fillStyle = col; ctx.font = `800 34px ${INTER}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
    ctx.fillText(c.kind === 'yes' ? '✓' : '✕', -cw / 2 + 30, 2)
    ctx.fillStyle = BONE; ctx.font = `700 32px ${INTER}`; ctx.fillText(c.text, -cw / 2 + 80, 2)
    ctx.restore()
  })
  ctx.restore()
}
