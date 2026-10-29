// st9pisceshome — Pisces's home for Star Talk season 9, "A Day in the Life" (promo/films/STARTALK10.md, E56–E60).
// Drawn once here and reused by st9piscesam, st9pisceswork, st9pisceslove, st9piscescrew and st9pisces3am.
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { PISCES, PISCES_ROOMS, drawPiscesHome, drawPiscesCats, drawFishbowl, drawPiscesWindow } from '../../st9pisceshome.js'
//
// drawPiscesHome(ctx, t, { room, ep = 0, dark = 0, warm = 0, cats = true })
//   Paints one room over the full 1080 × 1920 frame, the window left OPEN (paint drawSky + st9day's daySky first).
//     room   'bedroom' | 'kitchen' | 'desk' | 'window'
//     ep     0…4 = am · work · love · crew · 3am: the tiny per-episode change (one more polaroid on the string of
//            photos over the bed, and the fridge's sticky note changes: "drink water" → … → "you're allowed to rest")
//     dark   0…1 night: the room sinks to indigo; the fishbowl's night light and the fairy lights still glow
//     warm   0…1 a peach morning wash on the walls
//     cats   draw the two cats (season 4) in their spot for this room (false = the episode draws them itself)
//   Pure f(t): the fish circle the bowl, the cats' tails flick, the fairy lights twinkle.
//
// PISCES_ROOMS[room] = { floor, window: { x, y, w, h }, stand: [x, y], cats: [[x, y], [x, y]], spots: { name: [x, y, from] } }
//
// drawPiscesCats(ctx, t, x, y, { cell = 16, sleepy = false, gap = 150 })   the two cats (orange + grey, st6pisces's sprite)
// drawFishbowl(ctx, t, x, y, s = 1)   the round bowl with two fish swimming in a circle (the sign's two fish)
// drawPiscesWindow(ctx, t, x, y, w, h, { lit = 1 })   a small night window of this home from outside (the season finale)
// PISCES = the palette.  Nothing touches `document` at module top level.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp } from '../src/lib.js'
import { drawPixelStar } from './sky.js'

export const PISCES = {
  wall: '#2c2858', wall2: '#332e66', trim: '#5f58b0', floor: '#272247', ink: '#120c26',
  peri: '#7c74f0', sea: '#5fd6c4', coral: '#ff9fb8', lilac: '#c9a6ff', bone: '#efe6d6', gold: '#f2c75c', water: '#7fc8ff',
}
const P = PISCES, INK = P.ink
const MONO = "'Space Mono', ui-monospace, monospace"
const FLOOR = 1330

export const PISCES_ROOMS = {
  bedroom: { floor: FLOOR, window: { x: 110, y: 450, w: 360, h: 420 }, stand: [640, 1180], cats: [[200, 1290], [350, 1290]], spots: { bowl: [930, 1010, 'below'], bed: [1000, 1120, 'right'], curtain: [470, 640, 'right'] } },
  kitchen: { floor: FLOOR, window: { x: 600, y: 470, w: 380, h: 360 }, stand: [470, 1000], cats: [[760, 1066], [900, 1066]], spots: { fridge: [250, 900, 'left'], kettle: [560, 1080, 'below'], cabinet: [590, 700, 'right'] } },
  desk: { floor: FLOOR, window: { x: 640, y: 440, w: 360, h: 380 }, stand: [470, 1150], cats: [[840, 1296], [980, 1296]], spots: { piano: [160, 1100, 'below'], board: [560, 600, 'right'], window: [640, 760, 'left'] } },
  window: { floor: 1250, window: { x: 110, y: 360, w: 860, h: 840 }, stand: [540, 1080], cats: [[260, 1176], [820, 1176]], spots: { sill: [700, 1210, 'below'], curtain: [970, 820, 'right'], cushion: [180, 1150, 'below'] } },
}

const R = Math.round
function rect(x, X, Y, w, h, col) { x.fillStyle = col; x.fillRect(R(X), R(Y), R(w), R(h)) }
function block(x, X, Y, w, h, col, { hi = null, lo = null, o = 4, line = INK } = {}) {
  if (line) rect(x, X - o, Y - o, w + 2 * o, h + 2 * o, line)
  rect(x, X, Y, w, h, col)
  if (hi) rect(x, X, Y, w, Math.max(4, o), hi)
  if (lo) rect(x, X, Y + h - Math.max(6, o + 2), w, Math.max(6, o + 2), lo)
}
function bits(x, bm, cols, X, Y, c, flip = false) {
  const w = bm[0].length
  for (let j = 0; j < bm.length; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch !== '.') rect(x, X + (flip ? w - 1 - i : i) * c, Y + j * c, c, c, cols[ch]) }
}
function mono(x, s, X, Y, { size = 22, color = P.bone, align = 'left' } = {}) {
  x.save(); x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = color; x.fillText(s, R(X), R(Y)); x.restore()
}
const glow = (x, X, Y, r, rgb, a) => {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(X, Y, 0, X, Y, r); g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(1, `rgba(${rgb},0)`)
  x.fillStyle = g; x.fillRect(X - r, Y - r, 2 * r, 2 * r); x.restore()
}

// ─────────────────────────────────────────────── the cats (season 4, st6pisces's sprite) and the fish
const CAT = ['O...O..', 'OO.OO..', 'OOOOO..', 'OeOeO..', 'OOpOO..', '.OOO...', 'OOOOO..', 'OOOOOO.', 'OOOOO.O', 'OOOOOOO']
const CAT_SLEEP = ['.......', '.......', 'O...O..', 'OOOOO..', 'OzOzO..', 'OOpOO..', 'OOOOOOO', 'OOOOOOO', 'OOOOOOO', 'OOOOOOO']
const CAT_O = { O: '#f2a65a', e: INK, p: '#ff8fb1', z: '#a8622a' }, CAT_G = { O: '#8a82a8', e: INK, p: '#ff8fb1', z: '#5a5478' }
function outlined(x, bm, cols, X, Y, c, flip) {
  const w = bm[0].length, h = bm.length, on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][flip ? w - 1 - i : i] !== '.'
  for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) rect(x, X + i * c, Y + j * c, c, c, INK)
  bits(x, bm, cols, X, Y, c, flip)
}
/** the two cats sitting side by side; (x, y) = the midpoint of their feet */
export function drawPiscesCats(ctx, t, X, Y, { cell = 16, sleepy = false, gap = 150 } = {}) {
  ;[[CAT_O, false, -1], [CAT_G, true, 1]].forEach(([col, flip, sd], i) => {
    let bm = sleepy ? CAT_SLEEP : CAT
    if (!sleepy && Math.sin(t * 3 + i * 2) > 0.3) bm = bm.map((r, j) => j === 8 ? 'OOOOOO.' : r)
    if (!sleepy && Math.sin(t * 0.9 + i * 4) > 0.97) bm = bm.map((r, j) => j === 3 ? 'OOOOO..' : r)   // a blink
    outlined(ctx, bm, col, X + sd * gap / 2 - 3.5 * cell, Y - 10 * cell, cell, flip)
  })
  if (sleepy) mono(ctx, 'z', X + gap / 2 + 40, Y - 190 - 10 * Math.sin(t * 2), { size: 30, color: P.lilac })
}
const FISH = ['.OO..O', 'OOOOOO', 'OeOO.O', '.OO...']
/** the bowl: two fish chasing each other round in a circle */
export function drawFishbowl(ctx, t, X, Y, s = 1) {
  const r = 70 * s
  ctx.save()
  ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(X, Y, r + 6, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = 'rgba(160,200,255,0.35)'; ctx.beginPath(); ctx.arc(X, Y, r, 0, Math.PI * 2); ctx.fill()
  ctx.beginPath(); ctx.arc(X, Y, r, 0, Math.PI * 2); ctx.clip()
  rect(ctx, X - r, Y - r * 0.45, 2 * r, 2 * r, 'rgba(95,214,196,0.55)'); rect(ctx, X - r, Y - r * 0.45, 2 * r, 4 * s, '#bff3ea')
  rect(ctx, X - r, Y + r * 0.6, 2 * r, r, '#c9a6ff')
  for (let k = 0; k < 2; k++) {
    const a = t * 1.3 + k * Math.PI, fx = X + Math.cos(a) * r * 0.5, fy = Y + 10 * s + Math.sin(a) * r * 0.22
    bits(ctx, FISH, { O: k ? P.coral : P.gold, e: INK }, fx - 18 * s, fy - 8 * s, 6 * s, Math.sin(a) < 0)
  }
  ctx.restore()
  rect(ctx, X - r * 0.5, Y - r - 10 * s, r, 12 * s, INK); rect(ctx, X - r * 0.45, Y - r - 8 * s, r * 0.9, 6 * s, '#bfe2ff')
  ctx.save(); ctx.globalAlpha = 0.5; rect(ctx, X - r * 0.6, Y - r * 0.5, 8 * s, 30 * s, '#ffffff'); ctx.restore()
}

// ─────────────────────────────────────────────── shell
function shell(x, t, win, floorY, { warm }) {
  x.save(); x.beginPath(); x.rect(0, 0, 1080, floorY); x.rect(win.x, win.y, win.w, win.h); x.clip('evenodd')
  rect(x, 0, 0, 1080, floorY, P.wall)
  for (let j = 40; j < floorY; j += 110) for (let i = 0; i < 1080; i += 12) rect(x, i, j + R(Math.sin(i / 40 + j) * 10), 12, 6, P.wall2)   // wave wallpaper
  x.restore()
  const o = 14
  x.save(); x.beginPath(); x.rect(win.x - o - 4, win.y - o - 4, win.w + 2 * o + 8, win.h + 2 * o + 8); x.rect(win.x, win.y, win.w, win.h); x.clip('evenodd')
  rect(x, win.x - o - 4, win.y - o - 4, win.w + 2 * o + 8, win.h + 2 * o + 8, INK)
  rect(x, win.x - o, win.y - o, win.w + 2 * o, win.h + 2 * o, P.trim); rect(x, win.x - 4, win.y - 4, win.w + 8, win.h + 8, INK); x.restore()
  // an arched top bar, a mullion
  rect(x, win.x + win.w / 2 - 4, win.y, 8, win.h, INK); rect(x, win.x + win.w / 2 - 2, win.y, 4, win.h, P.trim)
  rect(x, win.x - 34, win.y + win.h + o, win.w + 68, 18, INK); rect(x, win.x - 30, win.y + win.h + o, win.w + 60, 12, '#8a82d8')
  x.save(); x.globalAlpha = 0.12; rect(x, win.x + 16, win.y + 16, 10, win.h * 0.3, '#ffffff'); x.restore()
  // fairy lights along the ceiling
  for (let i = 0; i < 18; i++) {
    const lx = 30 + i * 60, ly = 330 + Math.sin(i * 0.9) * 14 + (i % 2) * 10
    rect(x, lx - 2, ly - 10, 4, 10, INK)
    const on = 0.6 + 0.4 * Math.sin(t * 2.4 + i * 1.3)
    x.save(); x.globalAlpha = on; rect(x, lx - 6, ly, 12, 12, [P.gold, P.coral, P.sea, P.lilac][i % 4]); x.restore()
  }
  x.save(); x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); for (let i = 0; i < 18; i++) { const lx = 30 + i * 60, ly = 320 + Math.sin(i * 0.9) * 14 + (i % 2) * 10; i ? x.lineTo(lx, ly) : x.moveTo(lx, ly) } x.stroke(); x.restore()
  // floor + baseboard + a round rug with a two-fish ring
  rect(x, 0, floorY, 1080, 1920 - floorY, P.floor)
  for (let j = floorY + 18; j < 1920; j += 54) rect(x, 0, j, 1080, 4, '#1e1a3a')
  rect(x, 0, floorY - 22, 1080, 22, INK); rect(x, 0, floorY - 18, 1080, 14, P.trim)
  x.save(); x.fillStyle = INK; x.beginPath(); x.ellipse(540, floorY + 190, 400, 92, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#3a3478'; x.beginPath(); x.ellipse(540, floorY + 190, 392, 86, 0, 0, Math.PI * 2); x.fill()
  x.strokeStyle = P.sea; x.lineWidth = 6; x.beginPath(); x.ellipse(540, floorY + 190, 300, 60, 0, 0, Math.PI * 2); x.stroke(); x.restore()
  bits(x, FISH, { O: P.coral, e: INK }, 220, floorY + 176, 7); bits(x, FISH, { O: P.gold, e: INK }, 818, floorY + 176, 7, true)
  if (warm > 0) { x.save(); x.globalAlpha = 0.22 * warm; x.globalCompositeOperation = 'soft-light'; rect(x, 0, 0, 1080, floorY, '#ffb38a'); x.restore() }
}
const POLAROIDS = [P.coral, P.sea, P.gold, P.lilac, '#8fd8f6']
function polaroids(x, t, ep, X0, Y0) {
  x.save(); x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); x.moveTo(X0, Y0); x.quadraticCurveTo(X0 + 220, Y0 + 50, X0 + 440, Y0); x.stroke(); x.restore()
  const n = 1 + clamp(ep, 0, 4)
  for (let i = 0; i < n; i++) {
    const px = X0 + 40 + i * 88, py = Y0 + 10 + Math.sin((i + 0.5) / 5 * Math.PI) * 30
    block(x, px - 30, py, 60, 70, '#f5f0ff', { o: 3 }); rect(x, px - 24, py + 6, 48, 42, POLAROIDS[i])
    if (i === 0) bits(x, ['O...O', 'OOOOO', 'OeOeO', 'OOOOO'], { O: '#f2a65a', e: INK }, px - 15, py + 14, 6)     // the cats
    if (i === 3) bits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '...H...'], { H: '#ff4f86' }, px - 21, py + 14, 6)
    rect(x, px - 3, py - 6, 6, 10, P.gold)
  }
}
const NOTES = ['drink water ♡', 'send the song', 'virgo 7pm ♡', 'call back ALL', 'rest is ok']

// ─────────────────────────────────────────────── rooms
function bedroom(x, t, o) {
  const W_ = PISCES_ROOMS.bedroom.window
  shell(x, t, W_, FLOOR, o)
  polaroids(x, t, o.ep, 560, 470)
  // the bed (right), fish-scale quilt
  const by = 1090
  block(x, 560, by - 110, 470, 70, '#4a3f8a', { o: 5, hi: '#6a5fb0' })
  block(x, 550, by - 40, 490, 140, P.peri, { o: 5, hi: '#a39cff', lo: '#5a52c8' })
  for (let j = 0; j < 2; j++) for (let i = 0; i < 9; i++) { x.save(); x.strokeStyle = '#c9c4ff'; x.lineWidth = 4; x.beginPath(); x.arc(585 + i * 52 + j * 26, by + 20 + j * 40, 20, 0, Math.PI); x.stroke(); x.restore() }
  block(x, 600, by - 72, 150, 52, '#f5f0ff', { o: 4 }); block(x, 780, by - 72, 150, 52, '#f5f0ff', { o: 4 })
  rect(x, 560, by + 100, 30, 150, INK); rect(x, 1000, by + 100, 30, 150, INK)
  // nightstand + the fishbowl (its night light)
  // guitar leaning by the window, the dream journal on the floor
  guitar(x, 470, 1000)
  block(x, 90, 1250, 120, 30, P.coral, { o: 4, hi: '#ffc2d0' }); mono(x, 'DREAMS', 150, 1265, { size: 16, color: INK, align: 'center' })
  drawFishbowl(x, t, 300, 1180, 0.9)
  if (o.cats) drawPiscesCats(x, t, 300, 1330, { cell: 13, sleepy: o.dark > 0.5, gap: 260 })
}
function guitar(x, X, Y) {
  x.save(); x.translate(X, Y); x.rotate(0.18)
  rect(x, -10, -240, 20, 220, INK); rect(x, -6, -236, 12, 216, '#8a5a2a'); rect(x, -16, -270, 32, 40, INK); rect(x, -12, -266, 24, 32, '#5a3a1a')
  x.fillStyle = INK; x.beginPath(); x.arc(0, 30, 64, 0, Math.PI * 2); x.arc(0, -40, 48, 0, Math.PI * 2); x.fill()
  x.fillStyle = P.coral; x.beginPath(); x.arc(0, 30, 58, 0, Math.PI * 2); x.arc(0, -40, 42, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 18, 0, Math.PI * 2); x.fill()
  rect(x, -20, 50, 40, 10, INK)
  x.restore()
}
function kitchen(x, t, o) {
  const W_ = PISCES_ROOMS.kitchen.window
  shell(x, t, W_, FLOOR, o)
  // the fridge (left) and today's note
  block(x, 40, 600, 230, 730, '#d8d2f5', { o: 6, hi: '#f3f0ff', lo: '#b2aade' }); rect(x, 40, 900, 230, 8, INK)
  rect(x, 50, 680, 10, 120, '#9a92c8'); rect(x, 50, 960, 10, 160, '#9a92c8')
  block(x, 78, 710, 180, 92, '#ffe0ea', { o: 3 }); mono(x, NOTES[clamp(o.ep, 0, 4)], 168, 756, { size: 21, color: '#5a2a6a', align: 'center' })
  bits(x, FISH, { O: P.sea, e: INK }, 100, 640, 8); bits(x, FISH, { O: P.coral, e: INK }, 190, 640, 8, true)
  // counter, kettle, a mug, hanging plants
  block(x, 290, 1100, 790, 40, '#b2aade', { o: 5, hi: '#d8d2f5' }); block(x, 290, 1140, 790, 190, '#4a3f8a', { o: 5, lo: '#3a3070' })
  for (let i = 480; i < 1080; i += 200) { rect(x, i, 1140, 4, 190, INK); rect(x, i - 30, 1200, 18, 6, P.gold) }
  block(x, 340, 1020, 90, 80, P.sea, { o: 5, hi: '#a0f0e4' }); rect(x, 370, 1000, 30, 20, INK); rect(x, 430, 1040, 30, 10, INK)   // kettle
  block(x, 470, 1050, 46, 50, P.coral, { o: 4 }); rect(x, 516, 1060, 12, 22, INK)                                                    // mug
  for (const px of [330, 520]) { rect(x, px + 30, 470, 4, 90, INK); block(x, px, 560, 64, 50, '#c96a4a', { o: 4 }); bits(x, ['G.G.G', '.GGG.', 'G.G.G', '.G.G.', 'G...G'], { G: '#7fd68a' }, px + 2, 610, 12) }
  // a big glass of water on the sill (drink water)
  block(x, 640, 790, 44, 60, 'rgba(127,200,255,0.6)', { o: 4 })
  if (o.cats) drawPiscesCats(x, t, 830, 1100, { cell: 9, sleepy: o.dark > 0.5, gap: 140 })
}
function desk(x, t, o) {
  const W_ = PISCES_ROOMS.desk.window
  shell(x, t, W_, FLOOR, o)
  // the lyric board: torn pages, a heart, "SONG #212"
  block(x, 70, 470, 480, 330, '#c9a06a', { o: 8 })
  const pages = [[100, 500, 'SONG #212', P.coral], [300, 520, 'ocean eyes?', P.sea], [120, 650, 'la la la…', P.lilac], [330, 660, '♡ ♡ ♡', P.gold]]
  pages.forEach(([px, py, s, c], i) => { block(x, px, py, 180, 110, '#fbf7ee', { o: 3 }); rect(x, px + 80, py - 6, 14, 14, c); mono(x, s, px + 90, py + 58, { size: 22, color: '#3a2a6a', align: 'center' }); void i })
  // the desk + a little keyboard + headphones-free laptop with a playlist
  block(x, 60, 1110, 900, 34, '#7a6aba', { o: 5, hi: '#9a8ad8' }); rect(x, 90, 1144, 26, 186, INK); rect(x, 904, 1144, 26, 186, INK)
  block(x, 100, 1046, 380, 60, '#f5f0ff', { o: 5 }); for (let i = 0; i < 12; i++) rect(x, 112 + i * 30, 1046, 4, 60, INK)
  for (let i = 0; i < 11; i++) if (i % 7 !== 2 && i % 7 !== 6) rect(x, 128 + i * 30, 1046, 14, 34, INK)
  block(x, 560, 960, 230, 140, '#1c1840', { o: 6 }); rect(x, 540, 1100, 270, 12, INK)
  for (let i = 0; i < 4; i++) { rect(x, 580, 990 + i * 26, 16, 16, [P.coral, P.sea, P.gold, P.lilac][i]); rect(x, 606, 994 + i * 26, 140 - (i * 23) % 60, 8, '#8a82d8') }
  drawFishbowl(x, t, 880, 1030, 0.7)
  if (o.cats) drawPiscesCats(x, t, 900, 1330, { cell: 10, sleepy: o.dark > 0.5, gap: 150 })
}
function windowRoom(x, t, o) {
  const r = PISCES_ROOMS.window, W_ = r.window
  x.save(); x.beginPath(); x.rect(W_.x, W_.y, W_.w, W_.h); x.clip()
  // the sea across the road: a horizon, a pier, the Moon's path
  rect(x, W_.x, 960, W_.w, 300, '#1a2a66')
  for (let j = 970; j < 1200; j += 18) for (let i = W_.x + ((j / 18) % 2) * 20; i < W_.x + W_.w; i += 60) rect(x, i, j, 26, 4, '#3a5aa0')
  for (let j = 970; j < 1200; j += 14) rect(x, 520 + Math.sin(j * 0.3 + t * 2) * 16, j, 50 - (j - 970) * 0.1, 4, '#cfe0ff')
  rect(x, 760, 930, 220, 30, '#120c26'); for (let i = 780; i < 980; i += 50) rect(x, i, 960, 10, 60, '#120c26')
  x.restore()
  shell(x, t, W_, r.floor, o)
  for (const cx of [60, 1020]) { block(x, cx - 50, 330, 100, 900, P.lilac, { o: 5, hi: '#e2d0ff' }); for (let i = 0; i < 4; i++) rect(x, cx - 40 + i * 24, 340, 6, 880, '#a98ae0') }
  // window seat cushions
  block(x, 110, 1210, 860, 40, P.coral, { o: 5, hi: '#ffc2d0' })
  if (o.cats) drawPiscesCats(x, t, 540, 1206, { cell: 11, sleepy: o.dark > 0.5, gap: 560 })
}
const ROOM_FN = { bedroom, kitchen, desk, window: windowRoom }

export function drawPiscesHome(ctx, t, { room = 'bedroom', ep = 0, dark = 0, warm = 0, cats = true } = {}) {
  ROOM_FN[room](ctx, t, { ep, dark, warm, cats })
  if (dark > 0) {
    const W_ = PISCES_ROOMS[room].window
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1080, 1920); ctx.rect(W_.x, W_.y, W_.w, W_.h); ctx.clip('evenodd')
    ctx.globalAlpha = 0.74 * clamp(dark); ctx.fillStyle = '#070520'; ctx.fillRect(0, 0, 1080, 1920); ctx.restore()
    if (room === 'bedroom') { glow(ctx, 300, 1180, 240, '95,214,196', 0.4 * dark); drawFishbowl(ctx, t, 300, 1180, 0.9) }
    if (room === 'desk') glow(ctx, 880, 1030, 200, '95,214,196', 0.35 * dark)
    for (let i = 0; i < 18; i++) { const lx = 30 + i * 60, ly = 336 + Math.sin(i * 0.9) * 14 + (i % 2) * 10; glow(ctx, lx, ly, 26, '255,210,150', 0.35 * dark * (0.6 + 0.4 * Math.sin(t * 2.4 + i * 1.3))) }
  }
}

/** a small night window of this home, from outside (the season finale) */
export function drawPiscesWindow(ctx, t, X, Y, w, h, { lit = 1 } = {}) {
  rect(ctx, X - 8, Y - 8, w + 16, h + 16, INK)
  rect(ctx, X, Y, w, h, '#0c0a22')
  ctx.save(); ctx.globalAlpha = 0.25 + 0.75 * lit
  const g = ctx.createLinearGradient(0, Y, 0, Y + h); g.addColorStop(0, '#5a4fb0'); g.addColorStop(1, '#2a7a8a')
  ctx.fillStyle = g; ctx.fillRect(R(X), R(Y), R(w), R(h))
  ctx.globalAlpha = lit; ctx.beginPath(); ctx.rect(X, Y, w, h); ctx.clip()
  drawFishbowl(ctx, t, X + w * 0.3, Y + h * 0.62, h / 300)
  for (let i = 0; i < 5; i++) rect(ctx, X + 10 + i * w / 5, Y + 10 + (i % 2) * 8, 8, 8, [P.gold, P.coral, P.sea, P.lilac, P.gold][i])
  ctx.restore()
  ctx.save(); ctx.globalAlpha = lit; rect(ctx, X + w / 2 - 3, Y, 6, h, INK); ctx.restore()
  glow(ctx, X + w / 2, Y + h / 2, Math.max(w, h) * 0.9, '150,140,255', 0.3 * lit)
}
void lerp; void drawPixelStar
