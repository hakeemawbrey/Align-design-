// st9aquahome — Aquarius's home for Star Talk season 9, "A Day in the Life" (promo/films/STARTALK10.md, E51–E55).
// Drawn once here and reused by st9aquaam, st9aquawork, st9aqualove, st9aquacrew and st9aqua3am (set continuity).
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { AQUA, AQUA_ROOMS, drawAquaHome, drawAquaHeadphones, drawAquaWindow } from '../../st9aquahome.js'
//
// drawAquaHome(ctx, t, { room, ep = 0, dark = 0, warm = 0, lamp = 1, board = null })
//   Paints one room over the full 1080 × 1920 frame. The window is left OPEN (nothing drawn there), so paint the sky first
//   (sky.js drawSky, then st9day's daySky) and the room on top: the in-world hour shows through the glass.
//     room   'bedroom' | 'kitchen' | 'desk' | 'window'
//     ep     0…4 = am · work · love · crew · 3am: the tiny per-episode change (the whiteboard's theory number counts
//            up #47 → #51, the fridge note changes, a new glow sticker joins the ceiling each episode)
//     dark   0…1 night: the room sinks to indigo and only the lava lamp, the monitor and the star stickers glow
//     warm   0…1 a peach morning wash on the walls (dawn light through the window)
//     lamp   0…1 the lava lamp's glow (it is always on: Aquarius never turns it off)
//     board  optional array of ≤ 4 short strings for the whiteboard (desk room; default: the episode's theories)
//   Pure f(t). The lava lamp's blobs, the monitor's waveform and the sticker twinkle all move with t.
//
// AQUA_ROOMS[room] = { floor, window: { x, y, w, h }, stand: [x, y], spots: { name: [x, y, from] } }
//   floor = the floor line's y; stand = a good centre for a 300 px star standing on the floor; spots = ghost hiding
//   places (pass to stlore's drawGhostCameo as { x, y, from }).
//
// drawAquaHeadphones(ctx, r, size, { k = 0, alpha = 1 })   the pink headphones (season 3) on a drawStarChar result r
//   (k = 0 on its head, 1 slid down round its neck; k > 1.6 = held in front, off).
//
// drawAquaWindow(ctx, t, x, y, w, h, { lit = 1 })   a small night window of this home, seen from outside (for the
//   season finale's twelve windows): the lava lamp glowing cyan-violet, headphones on the sill.
//
// AQUA = the palette { wall, wall2, trim, floor, floor2, ink, cyan, violet, pink, lime, bone, gold }
// Nothing touches `document` at module top level.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp } from '../src/lib.js'
import { drawPixelStar } from './sky.js'

export const AQUA = {
  wall: '#1f2f55', wall2: '#243866', trim: '#3c5a95', floor: '#2a2148', floor2: '#352a5a', ink: '#120c26',
  cyan: '#38c4ec', violet: '#9a7bff', pink: '#ff8fb1', lime: '#b6f36a', bone: '#efe6d6', gold: '#f2c75c', steel: '#8fa3c8',
}
const A = AQUA, INK = A.ink
const MONO = "'Space Mono', ui-monospace, monospace"
const FLOOR = 1330

export const AQUA_ROOMS = {
  bedroom: { floor: FLOOR, window: { x: 600, y: 440, w: 380, h: 430 }, stand: [700, 1190], spots: { bed: [520, 1110, 'right'], lamp: [900, 1010, 'below'], curtain: [600, 700, 'left'] } },
  kitchen: { floor: FLOOR, window: { x: 330, y: 470, w: 400, h: 360 }, stand: [560, 1000], spots: { fridge: [826, 900, 'right'], contraption: [270, 1080, 'below'], cabinet: [300, 700, 'left'] } },
  desk: { floor: FLOOR, window: { x: 700, y: 440, w: 300, h: 380 }, stand: [520, 1150], spots: { board: [640, 640, 'left'], telescope: [960, 1100, 'below'], monitor: [380, 1000, 'right'] } },
  window: { floor: 1250, window: { x: 110, y: 360, w: 860, h: 840 }, stand: [540, 1080], spots: { sill: [860, 1210, 'below'], curtain: [110, 820, 'left'], roof: [300, 1150, 'below'] } },
}

// ─────────────────────────────────────────────── pixel helpers
const R = Math.round
function rect(x, X, Y, w, h, col) { x.fillStyle = col; x.fillRect(R(X), R(Y), R(w), R(h)) }
/** an outlined pixel block with a top highlight and a bottom shade */
function block(x, X, Y, w, h, col, { hi = null, lo = null, o = 4, line = INK } = {}) {
  if (line) rect(x, X - o, Y - o, w + 2 * o, h + 2 * o, line)
  rect(x, X, Y, w, h, col)
  if (hi) rect(x, X, Y, w, Math.max(4, o), hi)
  if (lo) rect(x, X, Y + h - Math.max(6, o + 2), w, Math.max(6, o + 2), lo)
}
function bits(x, bm, cols, X, Y, c) {
  for (let j = 0; j < bm.length; j++) for (let i = 0; i < bm[j].length; i++) { const ch = bm[j][i]; if (ch !== '.') rect(x, X + i * c, Y + j * c, c, c, cols[ch]) }
}
function mono(x, s, X, Y, { size = 22, color = A.bone, align = 'left', weight = 700 } = {}) {
  x.save(); x.font = `${weight} ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = color; x.fillText(s, R(X), R(Y)); x.restore()
}
const glow = (x, X, Y, r, rgb, a) => {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(X, Y, 0, X, Y, r); g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(1, `rgba(${rgb},0)`)
  x.fillStyle = g; x.fillRect(X - r, Y - r, 2 * r, 2 * r); x.restore()
}

// ─────────────────────────────────────────────── shell: walls with a window hole, floor, baseboard
function shell(x, t, win, floorY, { warm, dark, ep }) {
  x.save()
  x.beginPath(); x.rect(0, 0, 1080, floorY); x.rect(win.x, win.y, win.w, win.h); x.clip('evenodd')
  rect(x, 0, 0, 1080, floorY, A.wall)
  for (let i = 0; i < 1080; i += 72) rect(x, i, 0, 36, floorY, A.wall2)                 // wallpaper stripes
  for (let j = 60; j < floorY; j += 144) for (let i = (j / 144 % 2) * 36 + 18; i < 1080; i += 72) rect(x, i - 3, j, 6, 6, '#2e4a80')
  x.restore()
  // the window frame + a cross mullion
  const o = 14
  rect(x, win.x - o - 4, win.y - o - 4, win.w + 2 * o + 8, o + 4, INK); rect(x, win.x - o - 4, win.y + win.h, win.w + 2 * o + 8, o + 4, INK)
  rect(x, win.x - o - 4, win.y - o, o + 4, win.h + 2 * o, INK); rect(x, win.x + win.w, win.y - o, o + 4, win.h + 2 * o, INK)
  rect(x, win.x - o, win.y - o, win.w + 2 * o, o, A.trim); rect(x, win.x - o, win.y + win.h, win.w + 2 * o, o, A.trim)
  rect(x, win.x - o, win.y, o, win.h, A.trim); rect(x, win.x + win.w, win.y, o, win.h, A.trim)
  rect(x, win.x + win.w / 2 - 5, win.y, 10, win.h, INK); rect(x, win.x + win.w / 2 - 3, win.y, 6, win.h, A.trim)
  rect(x, win.x, win.y + win.h * 0.45 - 5, win.w, 10, INK); rect(x, win.x, win.y + win.h * 0.45 - 3, win.w, 6, A.trim)
  rect(x, win.x - 34, win.y + win.h + o, win.w + 68, 18, INK); rect(x, win.x - 30, win.y + win.h + o, win.w + 60, 12, '#5a78b4')    // sill
  // glass glint
  x.save(); x.globalAlpha = 0.12; rect(x, win.x + 16, win.y + 16, 10, win.h * 0.3, '#ffffff'); rect(x, win.x + 34, win.y + 16, 6, win.h * 0.18, '#ffffff'); x.restore()
  // floor + baseboard
  rect(x, 0, floorY, 1080, 1920 - floorY, A.floor)
  for (let j = floorY + 18; j < 1920; j += 54) { rect(x, 0, j, 1080, 4, '#21193b'); for (let i = ((j / 54) % 3) * 120; i < 1080; i += 360) rect(x, i, j - 50, 4, 50, '#21193b') }
  rect(x, 0, floorY - 22, 1080, 22, INK); rect(x, 0, floorY - 18, 1080, 14, A.trim)
  // the rug (Aquarius: the water-bearer's wavy lines, ♒)
  const ry = floorY + 120
  rect(x, 160, ry, 760, 150, INK); rect(x, 166, ry + 6, 748, 138, '#30487c')
  for (let k = 0; k < 2; k++) for (let i = 0; i < 700; i += 6) { const yy = ry + 52 + k * 40 + (Math.floor(i / 60) % 2 ? 10 : 0); rect(x, 190 + i, yy, 6, 8, A.cyan) }
  // the glow-in-the-dark ceiling stickers: the real Aquarius pattern (simplified), one new sticker per episode
  stickers(x, t, ep, dark)
  if (warm > 0) { x.save(); x.globalAlpha = 0.22 * warm; x.globalCompositeOperation = 'soft-light'; rect(x, 0, 0, 1080, floorY, '#ffb38a'); x.restore() }
}
const STICK = [[120, 92], [176, 70], [236, 96], [300, 84], [346, 120], [262, 150], [210, 186], [150, 206], [372, 176]]
function stickers(x, t, ep, dark) {
  const n = 4 + clamp(ep, 0, 4)
  x.save()
  for (let i = 0; i < n; i++) {
    const [sx, sy] = STICK[i]
    const tw = 0.55 + 0.45 * Math.sin(t * 2.1 + i * 1.7)
    x.globalAlpha = lerp(0.35, 0.95, dark) * (0.7 + 0.3 * tw)
    drawPixelStar(x, sx + 560, sy + 300, 16 + (i % 3) * 4, i % 2, A.lime)
    if (dark > 0.2 && i > 0) { const [px, py] = STICK[i - 1]; x.globalAlpha = 0.18 * dark; x.strokeStyle = A.lime; x.lineWidth = 2; x.beginPath(); x.moveTo(px + 560, py + 300); x.lineTo(sx + 560, sy + 300); x.stroke() }
  }
  x.restore()
}

// ─────────────────────────────────────────────── the recurring props
/** prop 1: the lava lamp (always on) */
function lavaLamp(x, t, X, Y, s = 1, lampK = 1) {
  const w = 56 * s, h = 150 * s
  rect(x, X - w / 2 - 8 * s, Y + h - 30 * s, w + 16 * s, 34 * s, INK); rect(x, X - w / 2 - 4 * s, Y + h - 26 * s, w + 8 * s, 26 * s, '#6f7fa8')
  rect(x, X - w / 2 + 4 * s, Y - 18 * s, w - 8 * s, 22 * s, INK); rect(x, X - w / 2 + 8 * s, Y - 14 * s, w - 16 * s, 14 * s, '#6f7fa8')
  rect(x, X - w / 2 - 4, Y + 4 * s - 4, w + 8, h - 30 * s + 8, INK)
  const gg = x.createLinearGradient(0, Y, 0, Y + h); gg.addColorStop(0, '#3b2a8a'); gg.addColorStop(1, '#1d6e9a')
  x.fillStyle = gg; x.fillRect(R(X - w / 2), R(Y + 4 * s), R(w), R(h - 30 * s))
  for (let i = 0; i < 4; i++) {
    const ph = (t * 0.09 + i * 0.27) % 1, by = Y + h - 40 * s - ph * (h - 60 * s), bx = X + Math.sin(t * 0.8 + i * 2) * w * 0.18
    const br = (10 + (i % 2) * 6) * s * (0.8 + 0.3 * Math.sin(t + i))
    rect(x, bx - br, by - br * 1.2, br * 2, br * 2.4, i % 2 ? A.pink : A.lime)
  }
  glow(x, X, Y + h * 0.4, 220 * s, '154,123,255', 0.32 * lampK)
}
/** prop 2: the theory whiteboard (desk room). Its theory number counts up each episode. */
const BOARD_LINES = [
  ['THEORY #47', 'cereal = soup?', 'pigeons: govt?', 'uranus tilt: 98°'],
  ['THEORY #48', 'meetings → memos', 'stand-ups: sit?', 'ASK TEAM FIRST'],
  ['THEORY #49', 'leo + me =', 'sun + sideways', 'planet ✓'],
  ['THEORY #50', '12 chats ≠', '1 close friend', 'call gemini ✓'],
  ['THEORY #51', 'overwhelm ≠', 'distance', 'headphones off'],
]
function whiteboard(x, t, X, Y, w, h, ep, lines) {
  block(x, X, Y, w, h, '#e9eef6', { o: 8 })
  rect(x, X, Y + h - 4, w, 8, '#9aa9c6')
  rect(x, X + 20, Y + h + 4, w - 40, 14, INK); rect(x, X + 24, Y + h + 4, w - 48, 8, '#6f7fa8')       // the marker tray
  rect(x, X + 60, Y + h - 2, 40, 10, A.violet); rect(x, X + 120, Y + h - 2, 40, 10, A.cyan)
  const L = lines || BOARD_LINES[clamp(ep, 0, 4)]
  L.forEach((s, i) => mono(x, s, X + 28, Y + 44 + i * 58, { size: i === 0 ? 30 : 26, color: i === 0 ? '#3b2a8a' : i % 2 ? '#1d6e9a' : '#7a3a9a' }))
  // a sideways-ringed Uranus doodle (it spins tipped on its side: real), top right
  const ux = X + w - 80, uy = Y + 78
  x.save(); x.strokeStyle = '#1d6e9a'; x.lineWidth = 4
  x.beginPath(); x.arc(ux, uy, 26, 0, Math.PI * 2); x.stroke()
  x.beginPath(); x.ellipse(ux, uy, 12, 50, 0.2, 0, Math.PI * 2); x.stroke()
  // arrows and a swirl, the "theory" look
  x.strokeStyle = '#7a3a9a'; x.lineWidth = 3
  x.beginPath(); x.moveTo(X + w - 150, Y + h - 60); x.quadraticCurveTo(X + w - 60, Y + h - 140, X + w - 40, Y + h - 70); x.stroke()
  x.restore()
}
/** prop 3: the brass telescope at the window, always pointed up */
function telescope(x, X, Y, s = 1) {
  x.save(); x.translate(X, Y)
  rect(x, -4 * s, 0, 8 * s, 120 * s, INK)
  x.save(); x.rotate(-0.5); rect(x, -10 * s, -3 * s, 10 * s, 120 * s, INK); x.restore()
  x.save(); x.rotate(0.5); rect(x, 0, -3 * s, 10 * s, 120 * s, INK); x.restore()
  x.rotate(-0.62)
  rect(x, -70 * s, -20 * s, 170 * s, 40 * s, INK); rect(x, -66 * s, -16 * s, 162 * s, 32 * s, '#c99a4a')
  rect(x, -66 * s, -16 * s, 162 * s, 8 * s, '#f0cf86'); rect(x, 70 * s, -24 * s, 34 * s, 48 * s, INK); rect(x, 74 * s, -20 * s, 26 * s, 40 * s, '#b0843a')
  rect(x, -96 * s, -10 * s, 30 * s, 20 * s, INK); rect(x, -92 * s, -6 * s, 24 * s, 12 * s, '#8fa3c8')
  x.restore()
}

// ─────────────────────────────────────────────── rooms
function bedroom(x, t, o) {
  const W_ = AQUA_ROOMS.bedroom.window
  shell(x, t, W_, FLOOR, o)
  // poster: a UFO, "OUT THERE"
  block(x, 90, 420, 230, 300, '#1a1440', { o: 6 }); rect(x, 100, 430, 210, 280, '#2b1f66')
  bits(x, ['....AAAA....', '...AAAAAA...', '.CCCCCCCCCC.', 'CCYCCYCCYCCC', '.CCCCCCCCCC.', '....L..L....', '...L....L...', '..L......L..'], { A: '#a6e3ff', C: A.steel, Y: A.lime, L: '#b6f36a66' }, 130, 480, 13)
  mono(x, 'OUT THERE', 205, 670, { size: 26, color: A.lime, align: 'center' })
  // the bed (left)
  const by = 1080
  block(x, 60, by - 150, 40, 400, '#5a4a8a', { o: 5 })                              // headboard post
  block(x, 60, by - 110, 460, 70, '#3a2f6a', { o: 5, hi: '#5a4a8a' })                 // headboard
  block(x, 60, by - 40, 470, 140, '#2a6fb0', { o: 5, hi: '#4a9be0', lo: '#1d4f86' })   // duvet
  for (let i = 0; i < 4; i++) bits(x, ['RR...', '.PPP.', 'PPPPP', '.PPP.', '...RR'], { P: A.lime, R: '#ffd1de' }, 130 + i * 100, by + 22 + (i % 2) * 22, 7)   // ringed-planet print
  block(x, 90, by - 70, 140, 50, '#efe6f8', { o: 4 })                                 // pillow
  rect(x, 70, by + 100, 30, 150, INK); rect(x, 490, by + 100, 30, 150, INK)           // legs
  // nightstand + the lava lamp (right)
  block(x, 820, 1150, 190, 180, '#4a3a7a', { o: 5, hi: '#6a5aa0' }); rect(x, 900, 1210, 30, 10, A.gold)
  lavaLamp(x, t, 915, 990, 1, o.lamp)
  // headphones hanging off the bedpost
  hangingPhones(x, 80, 930)
}
function hangingPhones(x, X, Y) {
  x.save(); x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.arc(X, Y + 40, 34, Math.PI * 1.05, Math.PI * 1.95); x.stroke()
  x.strokeStyle = '#ff6f9f'; x.lineWidth = 9; x.beginPath(); x.arc(X, Y + 40, 34, Math.PI * 1.05, Math.PI * 1.95); x.stroke(); x.restore()
  block(x, X - 48, Y + 34, 22, 40, A.pink, { o: 4 }); block(x, X + 26, Y + 34, 22, 40, A.pink, { o: 4 })
}
const FRIDGE_NOTES = ['buy oat milk', 'ask team 1st', 'leo: thurs ♡', 'call gemini', 'you are ok']
function kitchen(x, t, o) {
  const W_ = AQUA_ROOMS.kitchen.window
  shell(x, t, W_, FLOOR, o)
  // upper cabinets either side of the window
  for (const [cx, cw] of [[40, 230], [790, 0]]) if (cw) { block(x, cx, 470, cw, 230, '#2c4f7c', { o: 5, hi: '#3f6ea8', lo: '#223f66' }); rect(x, cx + cw / 2 - 2, 470, 4, 230, INK); rect(x, cx + cw / 2 - 26, 650, 14, 6, A.gold); rect(x, cx + cw / 2 + 12, 650, 14, 6, A.gold) }
  // the fridge (right), magnets + today's note
  block(x, 820, 600, 230, 730, '#cfd8ea', { o: 6, hi: '#eef3fb', lo: '#a9b6d0' }); rect(x, 820, 900, 230, 8, INK)
  rect(x, 1020, 680, 10, 120, '#8fa3c8'); rect(x, 1020, 960, 10, 160, '#8fa3c8')
  bits(x, ['C.C.C', 'CCCCC', '.....', 'C.C.C', 'CCCCC'], { C: A.cyan }, 860, 650, 8)           // a ♒ magnet
  block(x, 862, 720, 170, 90, '#fff3a8', { o: 3 }); mono(x, FRIDGE_NOTES[clamp(o.ep, 0, 4)], 947, 765, { size: 22, color: '#3b2a8a', align: 'center' })
  drawPixelStar(x, 870, 990, 22, 1, A.gold)
  // counter + the coffee contraption (a Rube Goldberg machine: tubes, a flask, a dripping spiral)
  block(x, 0, 1100, 800, 40, '#8fa3c8', { o: 5, hi: '#c0cde6' }); block(x, 0, 1140, 800, 190, '#2c4f7c', { o: 5, lo: '#223f66' })
  for (let i = 100; i < 800; i += 200) { rect(x, i, 1140, 4, 190, INK); rect(x, i - 30, 1200, 18, 6, A.gold) }
  contraption(x, t, 170, 860)
  // sink under the window
  rect(x, 420, 1086, 220, 14, INK); rect(x, 520, 1030, 12, 60, '#8fa3c8'); rect(x, 520, 1030, 50, 12, '#8fa3c8')
}
function contraption(x, t, X, Y) {
  // flask on a stand
  rect(x, X - 6, Y + 60, 12, 180, INK); rect(x, X - 60, Y + 236, 120, 10, INK)
  block(x, X - 40, Y, 80, 70, '#bfe9ff', { o: 4 })
  const lv = 0.5 + 0.2 * Math.sin(t * 1.4)
  rect(x, X - 40, Y + 70 * (1 - lv), 80, 70 * lv, '#6b3f22')
  for (let i = 0; i < 3; i++) { const ph = (t * 1.3 + i * 0.33) % 1; rect(x, X - 20 + i * 18, Y + 60 - ph * 50, 6, 6, '#efe6d6') }
  // tube: flask → spiral → mug
  x.save(); x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.moveTo(X + 40, Y + 20); x.lineTo(X + 120, Y + 20); x.lineTo(X + 120, Y + 120); x.stroke()
  x.strokeStyle = A.steel; x.lineWidth = 6; x.stroke(); x.restore()
  for (let i = 0; i < 4; i++) { x.save(); x.strokeStyle = i % 2 ? A.violet : A.cyan; x.lineWidth = 6; x.beginPath(); x.ellipse(X + 120, Y + 140 + i * 22, 30, 8, 0, 0, Math.PI * 2); x.stroke(); x.restore() }
  const dp = (t * 1.6) % 1; rect(x, X + 116, Y + 220 + dp * 14, 8, 10, '#6b3f22')
  block(x, X + 94, Y + 190, 52, 48, A.pink, { o: 4, hi: '#ffc2d6' }); rect(x, X + 148, Y + 200, 14, 24, INK)    // the mug
  mono(x, 'COFFEE v3', X + 30, Y - 30, { size: 20, color: A.lime, align: 'center' })
}
function desk(x, t, o) {
  const W_ = AQUA_ROOMS.desk.window
  shell(x, t, W_, FLOOR, o)
  whiteboard(x, t, 70, 470, 560, 330, o.ep, o.board)
  // the desk, monitor + waveform, lava lamp mini
  block(x, 60, 1110, 900, 34, '#6a5aa0', { o: 5, hi: '#8a7ac0' }); rect(x, 90, 1144, 26, 186, INK); rect(x, 904, 1144, 26, 186, INK)
  block(x, 160, 880, 300, 190, '#141a33', { o: 6 }); rect(x, 300, 1070, 20, 40, INK); rect(x, 250, 1100, 120, 10, INK)
  x.save(); x.strokeStyle = A.cyan; x.lineWidth = 4; x.beginPath()
  for (let i = 0; i <= 260; i += 6) { const v = Math.sin(i * 0.08 + t * 4) * Math.sin(i * 0.021 + t) * 50; i ? x.lineTo(180 + i, 975 + v) : x.moveTo(180 + i, 975 + v) }
  x.stroke(); x.restore()
  glow(x, 310, 975, 200, '56,196,236', 0.18 + 0.2 * o.dark)
  lavaLamp(x, t, 540, 1000, 0.7, o.lamp)
  rect(x, 640, 1090, 90, 20, INK); rect(x, 644, 1092, 82, 14, '#8fa3c8')        // keyboard
  telescope(x, 900, 990, 1)
}
function windowRoom(x, t, o) {
  const r = AQUA_ROOMS.window, W_ = r.window
  // rooftops across the street, in front of the sky, behind the glass
  x.save(); x.beginPath(); x.rect(W_.x, W_.y, W_.w, W_.h); x.clip()
  const roofs = [[110, 980, 160], [250, 930, 140], [380, 1010, 200], [560, 900, 150], [700, 960, 180], [860, 1000, 140]]
  for (const [rx, ry, rw] of roofs) {
    rect(x, rx, ry, rw, 400, '#151032')
    for (let j = ry + 30; j < 1200; j += 60) for (let i = rx + 20; i < rx + rw - 20; i += 44) {
      const on = Math.sin(i * 12.9 + j * 7.3) > 0.1
      if (on) rect(x, i, j, 18, 24, lerp(0, 1, o.dark) > 0.5 ? '#ffd98a' : '#3a3260')
    }
  }
  // a water tower (the water-bearer joke)
  rect(x, 600, 820, 90, 70, '#151032'); rect(x, 594, 810, 102, 14, '#151032'); rect(x, 610, 890, 8, 30, '#151032'); rect(x, 672, 890, 8, 30, '#151032')
  x.restore()
  shell(x, t, W_, r.floor, o)
  // curtains
  for (const [cx, sd] of [[60, 1], [1020, -1]]) { block(x, cx - 50, 330, 100, 900, '#7a4fd0', { o: 5, hi: '#9a7bff' }); for (let i = 0; i < 4; i++) rect(x, cx - 40 + i * 24, 340, 6, 880, '#6340b0') ; void sd }
  // the sill: telescope + a small spiky plant + the headphones
  telescope(x, 820, 1160, 0.9)
  block(x, 230, 1150, 70, 60, '#c96a4a', { o: 4, hi: '#e88a6a' }); bits(x, ['.G.G.', 'GGGGG', '.GGG.'], { G: A.lime }, 240, 1110, 10)
  hangingPhones(x, 450, 1150)
}
const ROOM_FN = { bedroom, kitchen, desk, window: windowRoom }

export function drawAquaHome(ctx, t, { room = 'bedroom', ep = 0, dark = 0, warm = 0, lamp = 1, board = null } = {}) {
  const o = { ep, dark, warm, lamp, board }
  ROOM_FN[room](ctx, t, o)
  if (dark > 0) {
    const W_ = AQUA_ROOMS[room].window
    ctx.save()
    ctx.beginPath(); ctx.rect(0, 0, 1080, 1920); ctx.rect(W_.x, W_.y, W_.w, W_.h); ctx.clip('evenodd')
    ctx.globalAlpha = 0.74 * clamp(dark); ctx.fillStyle = '#070520'; ctx.fillRect(0, 0, 1080, 1920)
    ctx.restore()
    // what still glows at night
    if (room === 'bedroom') { glow(ctx, 915, 1050, 300, '154,123,255', 0.42 * dark * lamp); lavaLamp(ctx, t, 915, 990, 1, 0) }
    if (room === 'desk') { glow(ctx, 310, 975, 260, '56,196,236', 0.3 * dark); glow(ctx, 540, 1040, 200, '154,123,255', 0.3 * dark * lamp) }
    stickers(ctx, t, ep, dark)
  }
}

/** the pink headphones (season 3), on a star: k 0 = on its head, 1 = round its neck, >1.6 = lifted off in front */
export function drawAquaHeadphones(ctx, r, size, { k = 0, alpha = 1 } = {}) {
  if (alpha <= 0) return
  const c = Math.max(4, Math.round(size / 30)), kk = Math.min(k, 1)
  const lift = k > 1 ? (k - 1) : 0
  const cupY = r.y - size * 0.06 + kk * size * 0.42 - lift * size * 0.5, cupX = size * 0.4 * (1 + lift * 0.1), ry = -size * 0.44 * (1 - kk * 1.6)
  ctx.save(); ctx.globalAlpha *= alpha
  const band = (col, w) => { for (let i = 0; i <= 26; i++) { const a = Math.PI * i / 26, bx = r.x - Math.cos(a) * cupX, by = cupY + Math.sin(a) * ry; ctx.fillStyle = col; ctx.fillRect(R(bx - w / 2), R(by - w / 2), w, w) } }
  band(INK, c * 3); band('#ff6f9f', c * 2)
  for (const sd of [-1, 1]) {
    const cx = r.x + sd * cupX
    ctx.fillStyle = INK; ctx.fillRect(R(cx - 2.5 * c), R(cupY - 3.5 * c), 5 * c, 7 * c)
    ctx.fillStyle = A.pink; ctx.fillRect(R(cx - 1.5 * c), R(cupY - 2.5 * c), 3 * c, 5 * c)
    ctx.fillStyle = '#ffd1de'; ctx.fillRect(R(cx - 1.5 * c), R(cupY - 2.5 * c), c, 2 * c)
  }
  ctx.restore()
}

/** a small night window of this home, from outside (the season finale) */
export function drawAquaWindow(ctx, t, X, Y, w, h, { lit = 1 } = {}) {
  ctx.save()
  rect(ctx, X - 8, Y - 8, w + 16, h + 16, INK)
  const g = ctx.createLinearGradient(0, Y, 0, Y + h)
  g.addColorStop(0, `rgba(58,40,140,${0.25 + 0.75 * lit})`); g.addColorStop(1, `rgba(29,110,154,${0.25 + 0.75 * lit})`)
  rect(ctx, X, Y, w, h, '#0c0a22'); ctx.fillStyle = g; ctx.fillRect(R(X), R(Y), R(w), R(h))
  ctx.globalAlpha = lit
  ctx.beginPath(); ctx.rect(X, Y, w, h); ctx.clip()
  lavaLamp(ctx, t, X + w * 0.72, Y + h * 0.3, h / 260, 1)
  for (let i = 0; i < 3; i++) drawPixelStar(ctx, X + 20 + i * w * 0.18, Y + 18 + (i % 2) * 14, 10, 0, A.lime)
  ctx.restore()
  ctx.save(); ctx.globalAlpha = lit
  rect(ctx, X + w / 2 - 3, Y, 6, h, INK); rect(ctx, X, Y + h * 0.45 - 3, w, 6, INK)
  ctx.restore()
  glow(ctx, X + w / 2, Y + h / 2, Math.max(w, h) * 0.9, '120,160,255', 0.3 * lit)
}
