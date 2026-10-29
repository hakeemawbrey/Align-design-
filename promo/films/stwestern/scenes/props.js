// stwestern props: the little pixel drawings of the space-saloon town (Star Talk "Wild Lessons", "High Noon."). Every prop
// is a pure draw call; one art pixel = px screen px, crisp rectangles where they don't rotate, so they sit next to the
// pixel stars.
//   bitmap(ctx, rows, pal, x, y, px)                 rows of chars → pixels; (x, y) = top-left; '.' = empty
//   drawHat(ctx, x, y, px, { hat, band, rot })       a cowboy hat; (x, y) = the middle of the brim's underside
//   drawPhone(ctx, x, y, px, { mode, t, glow })      a pixel phone; (x, y) = centre. mode 'off' | 'lit' | 'type' | 'sent'
//   drawHolster(ctx, x, y, px)                       the leather holster pocket (drawn over the phone's lower half)
//   drawTumbleweed(ctx, x, y, r, rot)                a ball of dry twigs; (x, y) = centre
//   drawMesas(ctx, y, w)                             distant purple mesas along the horizon (y = their foot)
//   drawGround(ctx, y, w, h)                         the dusty street: ruts, pebbles
//   drawSaloon(ctx, x0, x1, top, ground, night)      the saloon (left); returns its window centre
//   drawStore(ctx, x0, x1, top, ground, night)       the TELEGRAPH office (right); returns its window centre
//   drawShutters(ctx, cx, cy, w, h, open, night)     the window's two shutters, open 0…1 (drawn over whoever's inside)
//   drawWindowBack(ctx, cx, cy, w, h, night)         the window's lit inside
//   drawClockTower(ctx, cx, top, ground, minutes, night)   the clock tower; minutes = minutes after midnight
//   drawSun(ctx, x, y, r)  drawCactus(ctx, x, y, px)  drawPopcorn(ctx, x, y, px)  drawGlasses(ctx, x, y, size)
//   drawBubble / drawTear / drawSweat / drawPixelHeart / drawTissue      the small stuff
// Pure functions of their arguments; nothing touches `document`.
const OUT = '#1a1030'
const MONO = "'Space Mono', ui-monospace, monospace"

export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }

// ─────────────────────────────── hats
const HAT = [
  '......OOOOOOO......',
  '.....OHHHLHHHO.....',
  '....OHHHHLHHHHO....',
  '....OHHHHHHHHHO....',
  '....OHHHHHHHHHO....',
  'OO..OBBBBBBBBBO..OO',
  'OHO.OBBBBBBBBBO.OHO',
  'OHHOOHHHHHHHHHOOHHO',
  '.OHHHHHHHHHHHHHHHO.',
  '..OOSSSSSSSSSSSOO..',
  '....OOOOOOOOOOO....',
]
export function drawHat(ctx, x, y, px, { hat = '#e9cf98', band = '#c8324a', rot = 0, alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, HAT, { O: OUT, H: hat, L: shade(hat, 0.25), B: band, S: shade(hat, -0.35) }, -9.5 * px, -10 * px, px)
  ctx.restore()
}
function shade(hex, k) {
  const n = parseInt(hex.slice(1), 16), c = [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.round(k > 0 ? v + (255 - v) * k : v * (1 + k)))
  return '#' + c.map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('')
}

// ─────────────────────────────── the phone + holster
export function drawPhone(ctx, x, y, px, { mode = 'off', t = 0, glow = 0, rot = 0 } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  const w = 9, h = 15, L = -w / 2 * px, T = -h / 2 * px
  if (glow > 0) {
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, px * 16)
    g.addColorStop(0, `rgba(160,230,255,${0.35 * glow})`); g.addColorStop(1, 'rgba(160,230,255,0)')
    ctx.fillStyle = g; ctx.fillRect(-px * 16, -px * 16, px * 32, px * 32)
  }
  R(ctx, L - px, T, (w + 2) * px, h * px, OUT); R(ctx, L, T - px, w * px, (h + 2) * px, OUT)
  R(ctx, L, T, w * px, h * px, '#3b3456')
  const sx = L + px, sy = T + 2 * px, sw = (w - 2) * px, sh = (h - 4) * px
  R(ctx, sx, sy, sw, sh, mode === 'off' ? '#141026' : '#bff0ff')
  if (mode === 'off') R(ctx, sx + px, sy + px, px, 3 * px, 'rgba(255,255,255,0.18)')
  if (mode === 'lit' || mode === 'type' || mode === 'sent') {
    // a header bar + a couple of chat rows
    R(ctx, sx, sy, sw, px, '#7fc7e6')
    R(ctx, sx + px, sy + 2 * px, 3 * px, px, '#ffffff')
    if (mode === 'sent') { R(ctx, sx + 2 * px, sy + 4 * px, 4 * px, 2 * px, '#4f8dff'); R(ctx, sx + 4 * px, sy + 7 * px, 2 * px, px, '#46cf82') }
    if (mode === 'type') {
      // the keyboard, keys lighting up as thumbs fly
      for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
        const on = (Math.floor(t * 14) + r * 2 + c * 5) % 7 === 0
        R(ctx, sx + (c * 2 + 0.5) * px, sy + (6 + r * 1.5) * px, px, px, on ? '#ffd23f' : '#6aa8c6')
      }
    }
  }
  R(ctx, -px, T + (h - 1.5) * px, 2 * px, px * 0.8, '#6c6490')
  ctx.restore()
}
export function drawHolster(ctx, x, y, px) {
  bitmap(ctx, [
    'OOOOOOOOOOO',
    'OLLLLLLLLLO',
    'OBBBBBBBBBO',
    'OBBYBBBYBBO',
    'OBBBBBBBBBO',
    'OBBBBBBBBBO',
    '.OBBBBBBBO.',
    '..OOOOOOO..',
  ], { O: OUT, L: '#c98a52', B: '#8a5530', Y: '#f2c75c' }, x - 5.5 * px, y, px)
}

// ─────────────────────────────── tumbleweed
const TW = Array.from({ length: 190 }, (_, i) => {
  const a = i * 2.39996, rr = Math.sqrt(((i * 0.7548776 + 0.13) % 1) * 0.97 + 0.03)
  return [a, rr, (i * 7) % 3]
})
export function drawTumbleweed(ctx, x, y, r, rot = 0, { alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const px = Math.max(3, Math.round(r / 11))
  ctx.fillStyle = 'rgba(20,10,30,0.35)'; ctx.beginPath(); ctx.ellipse(x, y + r * 0.95, r * 0.8, r * 0.16, 0, 0, Math.PI * 2); ctx.fill()
  // twig arcs: short pixel strokes around rings
  const cols = ['#7a5636', '#b5895a', '#d6b07a']
  for (const [a, rr, k] of TW) {
    const aa = a + rot, d = rr * r
    for (let s = 0; s < 5; s++) {
      const b = aa + s * 0.12, dd = d * (1 - s * 0.06)
      R(ctx, x + Math.cos(b) * dd - px / 2, y + Math.sin(b) * dd - px / 2, px, px, cols[(k + s) % 3])
    }
  }
  ctx.restore()
}

// ─────────────────────────────── the town
export function drawMesas(ctx, y, w) {
  ctx.fillStyle = '#2c1a48'
  const mesa = (x0, x1, h) => { ctx.fillRect(x0, y - h, x1 - x0, h); ctx.fillRect(x0 - 18, y - h + 24, x1 - x0 + 36, h - 24); ctx.fillRect(x0 - 36, y - h + 60, x1 - x0 + 72, h - 60) }
  mesa(60, 260, 150); mesa(700, 880, 120); mesa(380, 470, 80); mesa(960, 1100, 170)
  ctx.fillStyle = '#3c2460'; ctx.fillRect(60, y - 150, 200, 6); ctx.fillRect(700, y - 120, 180, 6); ctx.fillRect(960, y - 170, 140, 6)
  ctx.fillStyle = '#24163c'; ctx.fillRect(0, y - 40, w, 40)
}
export function drawGround(ctx, y, w, h) {
  const g = ctx.createLinearGradient(0, y, 0, y + h)
  g.addColorStop(0, '#8a4f48'); g.addColorStop(0.18, '#6a3a42'); g.addColorStop(1, '#22122e')
  ctx.fillStyle = g; ctx.fillRect(0, y, w, h)
  R(ctx, 0, y, w, 6, '#b36e58'); R(ctx, 0, y + 6, w, 4, '#9a5a4c')
  // wagon ruts
  ctx.fillStyle = 'rgba(40,18,40,0.35)'
  for (const [yy, ww] of [[y + 70, 6], [y + 96, 6], [y + 170, 8], [y + 210, 8]]) ctx.fillRect(0, yy, w, ww)
  // pebbles
  for (let i = 0; i < 46; i++) {
    const px = (i * 157.3) % w, py = y + 20 + ((i * 61.7) % (h - 40)) * ((i % 3) ? 0.5 : 1)
    R(ctx, px, py, 6 + (i % 2) * 6, 6, i % 4 ? 'rgba(200,140,110,0.35)' : 'rgba(30,14,36,0.4)')
  }
}
function planks(ctx, x0, x1, y0, y1, base, dark, light) {
  R(ctx, x0, y0, x1 - x0, y1 - y0, base)
  for (let y = y0 + 30; y < y1; y += 30) R(ctx, x0, y, x1 - x0, 4, dark)
  for (let i = 0, y = y0; y < y1; y += 30, i++) R(ctx, x0 + ((i * 97) % (x1 - x0 - 40)) + 10, y + 10, 24, 4, light)
}
export const WOOD = { base: '#6e3f2c', dark: '#4a2820', light: '#8e5638', trim: '#a8683c' }
export const WOOD2 = { base: '#5a3a52', dark: '#3c2440', light: '#76506c', trim: '#946a88' }
function facade(ctx, x0, x1, top, ground, W, sign, night) {
  R(ctx, x0 - 6, top - 6, x1 - x0 + 12, ground - top + 6, OUT)
  planks(ctx, x0, x1, top, ground, W.base, W.dark, W.light)
  R(ctx, x0, top, x1 - x0, 10, W.trim)
  // sign board
  const sw = Math.min(x1 - x0 - 50, 290), sx = (x0 + x1) / 2 - sw / 2, sy = top + 26
  R(ctx, sx - 6, sy - 6, sw + 12, 76, OUT); R(ctx, sx, sy, sw, 64, '#efd9a8'); R(ctx, sx, sy + 58, sw, 6, '#c9a46a')
  ctx.fillStyle = '#3a1c18'; ctx.font = `700 ${sign.length > 7 ? 36 : 44}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  if ('letterSpacing' in ctx) ctx.letterSpacing = '4px'
  ctx.fillText(sign, (x0 + x1) / 2 + 2, sy + 33)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  // porch roof + posts
  const py = top + 250
  R(ctx, x0 - 20, py - 6, x1 - x0 + 40, 34, OUT); R(ctx, x0 - 14, py, x1 - x0 + 28, 22, W.trim); R(ctx, x0 - 14, py + 16, x1 - x0 + 28, 6, W.dark)
  for (const px of [x0 + 10, x1 - 28]) { R(ctx, px - 4, py + 22, 26, ground - py - 22, OUT); R(ctx, px, py + 22, 18, ground - py - 22, W.light) }
  // boardwalk
  R(ctx, x0 - 20, ground - 18, x1 - x0 + 40, 18, OUT); R(ctx, x0 - 14, ground - 14, x1 - x0 + 28, 10, W.trim)
  void night
}
export function drawWindowBack(ctx, cx, cy, w, h, night = 0) {
  R(ctx, cx - w / 2 - 8, cy - h / 2 - 8, w + 16, h + 16, OUT)
  const g = ctx.createLinearGradient(0, cy - h / 2, 0, cy + h / 2)
  g.addColorStop(0, night > 0.5 ? '#ffcf6a' : '#3a2450'); g.addColorStop(1, night > 0.5 ? '#e08a3c' : '#22163a')
  ctx.fillStyle = g; ctx.fillRect(cx - w / 2, cy - h / 2, w, h)
}
export function drawWindowSill(ctx, cx, cy, w, h) {
  R(ctx, cx - w / 2 - 16, cy + h / 2, w + 32, 14, OUT); R(ctx, cx - w / 2 - 12, cy + h / 2 + 2, w + 24, 8, '#a8683c')
}
export function drawShutters(ctx, cx, cy, w, h, open = 0, wood = WOOD) {
  // each shutter swings on its outer hinge: shut = covering half the window, open = folded flat outside the frame
  const c = Math.cos(Math.min(1, Math.max(0, open)) * Math.PI * 0.92)
  for (const side of [-1, 1]) {
    const hinge = cx + side * (w / 2), sw = Math.max(6, (w / 2) * Math.abs(c))
    const xs = c >= 0 ? (side < 0 ? hinge : hinge - sw) : (side < 0 ? hinge - sw : hinge)
    R(ctx, xs - 4, cy - h / 2 - 4, sw + 8, h + 8, OUT)
    R(ctx, xs, cy - h / 2, sw, h, wood.trim)
    for (let y = cy - h / 2 + 12; y < cy + h / 2 - 6; y += 16) R(ctx, xs + 3, y, Math.max(1, sw - 6), 5, wood.dark)
  }
}
export function drawSaloon(ctx, x0, x1, top, ground, night = 0) {
  facade(ctx, x0, x1, top, ground, WOOD, 'SALOON', night)
  // swinging doors
  const dx = x0 + 72, dy = ground - 150
  R(ctx, dx - 56, dy - 30, 112, 150, '#1a0e22')
  for (const s of [-1, 1]) { R(ctx, dx + (s < 0 ? -52 : 4), dy + 10, 48, 76, OUT); R(ctx, dx + (s < 0 ? -48 : 8), dy + 14, 40, 68, '#a8683c'); for (let k = 0; k < 3; k++) R(ctx, dx + (s < 0 ? -44 : 12), dy + 24 + k * 18, 32, 5, '#6e3f2c') }
  return { door: [dx, dy], win: [(x0 + x1) / 2 + 20, top + 160] }
}
export function drawStore(ctx, x0, x1, top, ground, night = 0) {
  facade(ctx, x0, x1, top, ground, WOOD2, 'TELEGRAPH', night)
  // a door + the wire on the roof
  const dx = x1 - 80, dy = ground - 140
  R(ctx, dx - 40, dy - 6, 80, 128, OUT); R(ctx, dx - 34, dy, 68, 122, '#3c2440'); R(ctx, dx + 18, dy + 60, 8, 8, '#f2c75c')
  R(ctx, x0 + 40, top - 70, 8, 70, OUT); R(ctx, x0 + 22, top - 66, 44, 6, OUT)
  ctx.strokeStyle = 'rgba(26,16,48,0.8)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0 + 26, top - 63); ctx.quadraticCurveTo(x0 - 60, top - 20, x0 - 160, top - 55); ctx.stroke()
  return { win: [(x0 + x1) / 2 - 20, top + 160] }
}
export function drawClockTower(ctx, cx, top, ground, minutes, night = 0) {
  const w = 150, x0 = cx - w / 2
  // spire
  for (let k = 0; k < 9; k++) { const ww = 20 + k * 20; R(ctx, cx - ww / 2 - 4, top - 90 + k * 10 - 4, ww + 8, 14, OUT); R(ctx, cx - ww / 2, top - 90 + k * 10, ww, 10, k % 2 ? '#7a3044' : '#94405a') }
  R(ctx, cx - 4, top - 120, 8, 30, OUT); R(ctx, cx - 10, top - 128, 20, 12, '#f2c75c')
  // body
  R(ctx, x0 - 6, top - 4, w + 12, ground - top + 4, OUT)
  planks(ctx, x0, x0 + w, top, ground, '#7a4a52', '#563040', '#94606a')
  R(ctx, x0 - 16, top, w + 32, 14, OUT); R(ctx, x0 - 12, top + 2, w + 24, 8, '#a8683c')
  // belfry arch with a little bell
  const by = top + 200
  R(ctx, cx - 40, by - 40, 80, 80, OUT); R(ctx, cx - 34, by - 34, 68, 74, night > 0.5 ? '#2a1838' : '#1c1030')
  bitmap(ctx, ['..OOO..', '.OYYYO.', '.OYWYO.', '.OYYYO.', 'OYYYYYO', 'OOOOOOO', '...O...'], { O: OUT, Y: '#e2a93c', W: '#fff1b0' }, cx - 3.5 * 7, by - 22, 7)
  // the clock face
  const fy = top + 76, r = 60
  ctx.fillStyle = OUT; ctx.beginPath(); ctx.arc(cx, fy, r + 9, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#f6ead0'; ctx.beginPath(); ctx.arc(cx, fy, r, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#d8c8a8'; ctx.beginPath(); ctx.arc(cx, fy + 4, r - 6, 0.1, Math.PI - 0.1); ctx.fill()
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6, big = k % 3 === 0; R(ctx, cx + Math.sin(a) * (r - 12) - (big ? 4 : 3), fy - Math.cos(a) * (r - 12) - (big ? 4 : 3), big ? 8 : 6, big ? 8 : 6, '#3a2030') }
  const hA = ((minutes / 60) % 12) / 12 * Math.PI * 2, mA = ((minutes % 60) / 60) * Math.PI * 2
  ctx.lineCap = 'round'
  ctx.strokeStyle = '#2a1424'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(cx, fy); ctx.lineTo(cx + Math.sin(hA) * 30, fy - Math.cos(hA) * 30); ctx.stroke()
  ctx.strokeStyle = '#c8324a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(cx, fy); ctx.lineTo(cx + Math.sin(mA) * 46, fy - Math.cos(mA) * 46); ctx.stroke()
  ctx.fillStyle = '#2a1424'; ctx.beginPath(); ctx.arc(cx, fy, 7, 0, Math.PI * 2); ctx.fill()
  return { face: [cx, fy, r] }
}
export function drawSun(ctx, x, y, r) {
  const g = ctx.createRadialGradient(x, y, r * 0.6, x, y, r * 3.2)
  g.addColorStop(0, 'rgba(255,190,90,0.45)'); g.addColorStop(1, 'rgba(255,120,80,0)')
  ctx.fillStyle = g; ctx.fillRect(x - r * 3.2, y - r * 3.2, r * 6.4, r * 6.4)
  const px = Math.max(4, Math.round(r / 9))
  for (let j = -r; j <= r; j += px) {
    const half = Math.sqrt(Math.max(0, r * r - j * j))
    const k = (j + r) / (2 * r)
    ctx.fillStyle = k < 0.35 ? '#fff0a8' : k < 0.6 ? '#ffd060' : k < 0.8 ? '#ffa048' : '#ff7444'
    ctx.fillRect(Math.round(x - half), Math.round(y + j), Math.round(half * 2), px)
  }
}
export function drawCactus(ctx, x, y, px) {
  bitmap(ctx, [
    '....OOO.....',
    '...OGLGO....',
    '...OGLGO.OOO',
    'OOO.OGLGOOGGO',
    'OGGOOGLGOOGLO',
    'OGLGGGLGGGGO.',
    '.OGGGGLGGOO..',
    '..OOOGLGO....',
    '....OGLGO....',
    '....OGLGO....',
    '...OOOOOOO...',
  ], { O: OUT, G: '#3f8a5a', L: '#6cc08a' }, x - 6 * px, y - 11 * px, px)
}
export function drawPopcorn(ctx, x, y, px) {
  bitmap(ctx, ['.WYW.WY.', 'WWYWWWYW', 'OOOOOOOO', 'ORWRWRWO', 'ORWRWRWO', '.ORWRWO.', '.OOOOOO.'], { O: OUT, W: '#fffaf0', Y: '#ffd23f', R: '#e8344e' }, x - 4 * px, y - 7 * px, px)
}
/** tiny pixel reading glasses on a star's face; (x, y) = the star's centre, size = its sprite size */
export function drawGlasses(ctx, x, y, size) {
  const px = Math.max(2, Math.round(size / 40)), ey = y + size * 0.04, w = size * 0.15, h = size * 0.12
  ctx.save(); ctx.strokeStyle = OUT; ctx.lineWidth = px
  for (const s of [-1, 1]) ctx.strokeRect(Math.round(x + s * size * 0.13 - w / 2), Math.round(ey - h / 2), Math.round(w), Math.round(h))
  ctx.fillStyle = OUT; ctx.fillRect(Math.round(x - size * 0.055), Math.round(ey - h / 2 + px), Math.round(size * 0.11), px)
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
