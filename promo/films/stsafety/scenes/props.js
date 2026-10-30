// stsafety props: the little pixel drawings of the glass-roofed star liner (Star Talk "Wild Lessons", "Safety
// Demonstration."). Every prop is a pure draw call; one art pixel = px screen px, crisp rectangles, so they sit next to
// the pixel stars.
//   bitmap(ctx, rows, pal, x, y, px)              rows of chars → pixels; (x, y) = top-left; '.' = empty
//   drawCabin(ctx, t)                             the glass dome's ribs, the floor, the aisle carpet
//   drawSeatBack(ctx, x, y, s) / drawSeatFront(ctx, x, y, s)   a seat behind / in front of a seated star (s = star size)
//   drawHatch(ctx, x, y, px, open)                the little oxygen hatch the masks fall out of
//   drawMask(ctx, x, y, w, rot)                   the yellow oxygen cup; (x, y) = its centre; drawTube(ctx, x0, y0, x1, y1, t)
//   drawPillbox(ctx, x, y, px, col)               the attendant's pillbox hat (y = its bottom)   drawCaptainHat(ctx, x, y, px)
//   drawScarf(ctx, x, y, px)                      the attendant's neck bow
//   drawBelt(ctx, x, y, gap, px)                  two belt halves meeting at a buckle (gap 0 = clicked)
//   drawVest(ctx, x, y, s, inflate)               the yellow life vest round a star (s = star size)
//   drawExitSign(ctx, x, y, lit)                  a green EXIT box; drawSeatbeltSign(ctx, x, y, lit)
//   drawBubble / drawTear / drawSweat / drawPixelHeart / drawTissue / drawPeanuts      the small stuff
// Pure functions of their arguments; nothing touches `document`.
const OUT = '#1a1030'
const MONO = "'Space Mono', ui-monospace, monospace"
const YEL = '#ffd23f', YEL_D = '#e09a1a', YEL_L = '#fff2a0'

export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }

// ─────────────────────────────── the cabin
export const FLOOR_Y = 850
export function drawCabin(ctx, t) {
  // the glass dome's ribs (the sky shows through)
  for (const [rx, ry, a] of [[640, 760, 0.55], [600, 700, 0.75], [560, 640, 0.95]]) {
    ctx.save(); ctx.globalAlpha = a
    ctx.lineWidth = 16; ctx.strokeStyle = '#2a1a4e'
    ctx.beginPath(); ctx.ellipse(540, FLOOR_Y, rx, ry, 0, Math.PI, 2 * Math.PI); ctx.stroke()
    ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(201,166,255,0.45)'
    ctx.beginPath(); ctx.ellipse(540, FLOOR_Y, rx - 6, ry - 6, 0, Math.PI * 1.08, Math.PI * 1.42); ctx.stroke()
    ctx.restore()
  }
  // a glint sliding across the glass
  const g = ((t * 0.09) % 1.4) - 0.2
  ctx.save(); ctx.globalAlpha = 0.07; ctx.fillStyle = '#ffffff'
  ctx.beginPath(); ctx.moveTo(g * 1400 - 200, 300); ctx.lineTo(g * 1400 - 120, 300); ctx.lineTo(g * 1400 - 380, FLOOR_Y); ctx.lineTo(g * 1400 - 460, FLOOR_Y); ctx.fill()
  ctx.restore()
  // the floor and the side walls (low cabin walls with a trim rail)
  const fg = ctx.createLinearGradient(0, FLOOR_Y - 60, 0, 1920)
  fg.addColorStop(0, '#2a1a52'); fg.addColorStop(1, '#120a26')
  ctx.fillStyle = fg; ctx.fillRect(0, FLOOR_Y - 60, 1080, 1920 - FLOOR_Y + 60)
  R(ctx, 0, FLOOR_Y - 64, 1080, 8, '#5a3f96'); R(ctx, 0, FLOOR_Y - 56, 1080, 4, 'rgba(255,255,255,0.12)')
  // the aisle carpet (a trapezoid toward the back), with a diamond pattern
  ctx.fillStyle = '#4a2a7e'
  ctx.beginPath(); ctx.moveTo(490, FLOOR_Y - 52); ctx.lineTo(590, FLOOR_Y - 52); ctx.lineTo(780, 1920); ctx.lineTo(300, 1920); ctx.closePath(); ctx.fill()
  ctx.fillStyle = '#6a3fa8'
  for (let j = 0; j < 14; j++) {
    const y = FLOOR_Y - 30 + j * j * 6.4, w = 100 + (j * j * 6.4) * 0.36, px = 4 + j * 0.5
    for (let i = -1; i <= 1; i++) R(ctx, 540 + i * w * 0.28 - px / 2, y, px, px, '#6a3fa8')
  }
  // little floor lights along the aisle
  for (let j = 0; j < 9; j++) {
    const y = FLOOR_Y - 20 + j * j * 13, k = (j * j * 13) / 1070
    const on = 0.6 + 0.4 * Math.sin(t * 3 - j * 0.7)
    for (const s of [-1, 1]) { ctx.save(); ctx.globalAlpha = on; R(ctx, 540 + s * (50 + k * 190) - 4, y, 8, 6, '#ffd98a'); ctx.restore() }
  }
}

// ─────────────────────────────── seats
const SEAT = { base: '#2c5f9e', dark: '#1d3f6e', light: '#4a86c8', cover: '#f2ece0' }
export function drawSeatBack(ctx, x, y, s) {
  const w = s * 0.98, top = y - s * 0.58, bot = y + s * 0.42, px = Math.max(3, Math.round(s / 40))
  R(ctx, x - w / 2 - px, top - px + px * 2, w + 2 * px, bot - top, OUT)
  R(ctx, x - w / 2 + px * 2, top - px, w - px * 4, px * 3, OUT)
  R(ctx, x - w / 2, top + px * 2, w, bot - top - px * 2, SEAT.base)
  R(ctx, x - w / 2 + px * 2, top, w - px * 4, px * 3, SEAT.base)
  R(ctx, x - w / 2 + px, top + px * 3, px * 2, bot - top - px * 4, SEAT.light)
  R(ctx, x + w / 2 - px * 3, top + px * 3, px * 2, bot - top - px * 4, SEAT.dark)
  // the headrest cover
  R(ctx, x - w * 0.3, top + px, w * 0.6, s * 0.14, SEAT.cover)
  R(ctx, x - w * 0.3, top + px + s * 0.14 - px, w * 0.6, px, '#c9c0b0')
}
export function drawSeatFront(ctx, x, y, s) {
  const w = s * 1.06, top = y + s * 0.3, h = s * 0.3, px = Math.max(3, Math.round(s / 40))
  R(ctx, x - w / 2 - px, top - px, w + 2 * px, h + 2 * px, OUT)
  R(ctx, x - w / 2, top, w, h, SEAT.base)
  R(ctx, x - w / 2, top, w, px * 2, SEAT.light)
  R(ctx, x - w / 2, top + h - px * 2, w, px * 2, SEAT.dark)
  // armrests
  for (const sx of [-1, 1]) { R(ctx, x + sx * w / 2 - px * 2 - px, top - s * 0.12 - px, px * 4 + 2 * px, s * 0.14 + 2 * px, OUT); R(ctx, x + sx * w / 2 - px * 2, top - s * 0.12, px * 4, s * 0.14, '#8a8fa8') }
}
export function drawHatch(ctx, x, y, px, open = 0) {
  R(ctx, x - 12 * px, y - 3 * px, 24 * px, 6 * px, OUT)
  R(ctx, x - 11 * px, y - 2 * px, 22 * px, 4 * px, '#4a3a72')
  if (open > 0) R(ctx, x - 9 * px, y + 2 * px, 18 * px, Math.max(px, 4 * px * open), '#0a0614')
  for (let i = -2; i <= 2; i++) R(ctx, x + i * 4 * px - px / 2, y - px / 2, px, px, '#8a7ac0')
}

// ─────────────────────────────── oxygen masks
export function drawTube(ctx, x0, y0, x1, y1, t, px = 5) {
  const n = Math.max(6, Math.round(Math.hypot(x1 - x0, y1 - y0) / (px * 2.2)))
  for (let i = 0; i <= n; i++) {
    const u = i / n, sw = Math.sin(u * Math.PI) * 6 * Math.sin(t * 2.4 + x0 * 0.01)
    const cx = x0 + (x1 - x0) * u + sw, cy = y0 + (y1 - y0) * u
    R(ctx, cx - px * 0.7 - 1, cy - px * 0.7 - 1, px * 1.4 + 2, px * 1.4 + 2, OUT)
    R(ctx, cx - px * 0.7, cy - px * 0.7, px * 1.4, px * 1.4, i % 2 ? '#f0f0f6' : '#d8dcec')
  }
}
const MASK = [
  '..OOOOOOO..',
  '.OLLYYYYYO.',
  'OLYYYYYYYDO',
  'OYYYYYYYYDO',
  'OYYYYYYYYDO',
  '.OYYYYYYDO.',
  '..OODDDOO..',
]
export function drawMask(ctx, x, y, w, rot = 0, alpha = 1) {
  if (alpha <= 0) return
  const px = w / 11
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, MASK, { O: OUT, Y: YEL, L: YEL_L, D: YEL_D }, -5.5 * px, -3.5 * px, px)
  ctx.restore()
}
/** the elastic strap across the face (drawn under the cup) */
export function drawStrap(ctx, x, y, s) {
  const px = Math.max(2, Math.round(s / 60))
  R(ctx, x - s * 0.36, y - px, s * 0.72, px * 2, 'rgba(240,240,246,0.9)')
}

// ─────────────────────────────── hats, scarf, belt, vest
const PILL = ['..OOOOOOOO..', '.OHHHHHHHHO.', 'OHHHHBBHHHHO', 'OHHHBGGBHHHO', 'OSSSSSSSSSSO', '.OOOOOOOOOO.']
export function drawPillbox(ctx, x, y, px, col = '#c8324a', rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, PILL, { O: OUT, H: col, B: '#f2c75c', G: '#fff1c8', S: '#8a1c34' }, -6 * px, -6 * px, px)
  ctx.restore()
}
const CAPT = ['...OOOOOOOO...', '..OHHHHHHHHO..', '.OHHHHGGHHHHO.', 'OHHHHGWWGHHHHO', 'OGGGGGGGGGGGGO', '.OBBBBBBBBBBO.', '..OOOOOOOOOO..']
export function drawCaptainHat(ctx, x, y, px, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, CAPT, { O: OUT, H: '#1e2a5a', G: '#f2c75c', W: '#fff1c8', B: '#0e1430' }, -7 * px, -7 * px, px)
  ctx.restore()
}
const BOW = ['OO.....OO', 'ORRO.ORRO', 'ORWRORWRO', 'ORRRKRRRO', 'ORWROWRRO', 'OO..O..OO']
export function drawScarf(ctx, x, y, px) {
  bitmap(ctx, BOW, { O: OUT, R: '#c8324a', W: '#f2ece0', K: '#8a1c34' }, x - 4.5 * px, y - 3 * px, px)
}
export function drawBelt(ctx, x, y, gap, px) {
  const half = 22 * px
  for (const s of [-1, 1]) {
    const x0 = s < 0 ? x - gap / 2 - half : x + gap / 2
    R(ctx, x0 - px, y - 3 * px, half + 2 * px, 6 * px, OUT)
    R(ctx, x0, y - 2 * px, half, 4 * px, '#5a6a8a')
    R(ctx, x0, y - 2 * px, half, px, '#7a8aaa')
  }
  // buckle (right half) + tongue (left half)
  const bx = x + gap / 2
  R(ctx, bx - px, y - 5 * px, 8 * px, 10 * px, OUT); R(ctx, bx, y - 4 * px, 6 * px, 8 * px, '#d8dce8'); R(ctx, bx + px, y - 3 * px, 4 * px, 2 * px, '#ffffff')
  const tx = x - gap / 2
  R(ctx, tx - 5 * px, y - 3 * px, 6 * px, 6 * px, OUT); R(ctx, tx - 4 * px, y - 2 * px, 5 * px, 4 * px, '#b8bccc')
}
export function drawSeatBelt(ctx, x, y, s) {
  const px = Math.max(2, Math.round(s / 46)), w = s * 0.86
  R(ctx, x - w / 2, y - 3 * px, w, 6 * px, OUT); R(ctx, x - w / 2, y - 2 * px, w, 4 * px, '#5a6a8a')
  R(ctx, x - 4 * px, y - 5 * px, 8 * px, 10 * px, OUT); R(ctx, x - 3 * px, y - 4 * px, 6 * px, 8 * px, '#d8dce8')
}
export function drawVest(ctx, x, y, s, inflate = 0) {
  const px = Math.max(3, Math.round(s / 36)), k = 1 + 0.35 * inflate
  for (const side of [-1, 1]) {
    const cx = x + side * s * (0.27 + 0.03 * inflate), cy = y + s * 0.44, w = s * 0.11 * k, h = s * 0.15 * (1 + 0.12 * inflate)
    ctx.save(); ctx.fillStyle = OUT; ctx.beginPath(); ctx.ellipse(cx, cy, w + px, h + px, side * 0.25, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = YEL; ctx.beginPath(); ctx.ellipse(cx, cy, w, h, side * 0.25, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = YEL_L; ctx.beginPath(); ctx.ellipse(cx - side * w * 0.35, cy - h * 0.35, w * 0.3, h * 0.25, 0, 0, Math.PI * 2); ctx.fill()
    ctx.restore()
  }
  // the collar strap and the red tab + whistle
  R(ctx, x - s * 0.24, y + s * 0.34, s * 0.48, px * 2, '#e09a1a')
  R(ctx, x + s * 0.24, y + s * 0.56, px * 2, px * 4, '#c8324a')
  R(ctx, x - s * 0.36, y + s * 0.34, px * 3, px * 2, '#ff6f4a')
}

// ─────────────────────────────── signs
export function drawExitSign(ctx, x, y, lit = 0) {
  const w = 168, h = 62
  R(ctx, x - w / 2 - 6, y - h / 2 - 6, w + 12, h + 12, OUT)
  R(ctx, x - w / 2, y - h / 2, w, h, lit > 0.5 ? '#1f8f4e' : '#163a2a')
  if (lit > 0) { ctx.save(); ctx.globalAlpha = 0.45 * lit; ctx.shadowColor = '#5dff9a'; ctx.shadowBlur = 40; R(ctx, x - w / 2, y - h / 2, w, h, '#2fbf6a'); ctx.restore() }
  ctx.save(); ctx.font = `700 40px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = lit > 0.5 ? '#eafff0' : 'rgba(160,220,180,0.45)'
  if ('letterSpacing' in ctx) ctx.letterSpacing = '6px'
  ctx.fillText('EXIT', x + 3, y + 2)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  ctx.restore()
}
export function drawSeatbeltSign(ctx, x, y, lit = 0) {
  const w = 230, h = 76
  R(ctx, x - 4, y - h / 2 - 50, 8, 50, '#2a1a4e')
  R(ctx, x - w / 2 - 6, y - h / 2 - 6, w + 12, h + 12, OUT)
  R(ctx, x - w / 2, y - h / 2, w, h, '#26184a')
  ctx.save(); ctx.globalAlpha = 0.35 + 0.65 * lit
  if (lit > 0.5) { ctx.shadowColor = '#ffd98a'; ctx.shadowBlur = 30 }
  // a seatbelt icon (a tiny seated figure with a strap) and a heart
  bitmap(ctx, ['..OO..', '..OO..', '.OOOO.', 'OYYYYO', '.OOOO.', '.O..O.', '.O..O.'], { O: lit > 0.5 ? '#ffe9a8' : '#8a7ac0', Y: '#ffd23f' }, x - 74, y - 22, 6)
  bitmap(ctx, ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'], { X: lit > 0.5 ? '#ff6f9a' : '#7a5a8a' }, x + 18, y - 18, 7)
  ctx.restore()
}

// ─────────────────────────────── the small stuff
export function drawBubble(ctx, x, y, w, h, { tail = 'down', tailX = 40, px = 5, fill = '#fffaf0', alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const step = (o, col) => {
    ctx.fillStyle = col
    ctx.fillRect(Math.round(x + 2 * px - o), Math.round(y - o), Math.round(w - 4 * px + 2 * o), Math.round(h + 2 * o))
    ctx.fillRect(Math.round(x - o), Math.round(y + 2 * px - o), Math.round(w + 2 * o), Math.round(h - 4 * px + 2 * o))
    ctx.fillRect(Math.round(x + px - o), Math.round(y + px - o), Math.round(w - 2 * px + 2 * o), Math.round(h - 2 * px + 2 * o))
  }
  step(px, OUT)
  const tx = x + tailX
  for (let k = 0; k < 4; k++) {
    const ty = tail === 'down' ? y + h + k * px : y - (k + 1) * px
    R(ctx, tx - (4 - k) * px * 0.5 - px, ty - (tail === 'down' ? px : 0), (4 - k) * px + 2 * px, px * 2, OUT)
  }
  for (let k = 0; k < 3; k++) {
    const ty = tail === 'down' ? y + h - px + k * px : y - k * px
    R(ctx, tx - (3 - k) * px * 0.5, ty, (3 - k) * px, px, fill)
  }
  step(0, fill)
  ctx.restore()
}
export function drawTear(ctx, x, y, px) {
  bitmap(ctx, ['.T.', 'TWT', 'TTT', '.T.'], { T: '#6fd3ff', W: '#e6f8ff' }, x - 1.5 * px, y - 2 * px, px)
}
export function drawSweat(ctx, x, y, px) {
  bitmap(ctx, ['..O..', '.OSO.', '.OSO.', 'OSWSO', 'OSSSO', '.OOO.'], { O: '#1f3a6e', S: '#7fd6ff', W: '#ffffff' }, x - 2.5 * px, y - 3 * px, px)
}
export function drawPixelHeart(ctx, x, y, px, col = '#ff4f7e') {
  bitmap(ctx, ['.XX.XX.', 'XWXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'], { X: col, W: '#ffd0dc' }, x - 3.5 * px, y - 3 * px, px)
}
export function drawTissue(ctx, x, y, px, t) {
  const f = Math.floor(t * 6) % 2
  bitmap(ctx, f ? ['..OOOO.', '.OWWWWO', 'OWWSWWO', 'OWWWWO.', '.OOOO..'] : ['.OOOO..', 'OWWWWO.', 'OWWSWWO', '.OWWWWO', '..OOOO.'], { O: '#5a5478', W: '#ffffff', S: '#dcd6ee' }, x - 3.5 * px, y - 2.5 * px, px)
}
export function drawPeanuts(ctx, x, y, px) {
  bitmap(ctx, ['.OOOOO.', 'OBBBBBO', 'OBWWWBO', 'OBWNWBO', 'OBWWWBO', 'OBBBBBO', '.OOOOO.'], { O: OUT, B: '#3f7cf0', W: '#f2ece0', N: '#c88a4a' }, x - 3.5 * px, y - 3.5 * px, px)
}
export function drawDizzy(ctx, x, y, r, t, px = 5) {
  for (let i = 0; i < 3; i++) {
    const a = t * 5 + i * 2.1, sx = x + Math.cos(a) * r, sy = y + Math.sin(a) * r * 0.3
    bitmap(ctx, ['.X.', 'XXX', '.X.'], { X: i % 2 ? '#fff1c8' : '#f2c75c' }, sx - 1.5 * px, sy - 1.5 * px, px)
  }
}
