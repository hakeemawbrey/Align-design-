// stcartoon props: small pixel drawings on canvas (Star Talk "Wild Lessons" #7, "Saturday Morning Stars."). Every prop is
// a pure draw call; one art pixel = px screen px, crisp rectangles, so they sit next to the pixel stars.
//   bitmap(ctx, rows, pal, x, y, px)                 rows of chars → pixels; (x, y) = top-left; '.' = empty
//   drawBubble(ctx, x, y, w, h, { tail, tailX, px }) a pixel speech bubble; (x, y) = top-left
//   drawTear / drawSweat / drawPixelHeart / drawCrown / drawTissue    the small stuff (from stick)
//   drawMug(ctx, cx, by, px, t, { steam, fill })      a heart mug with steam; (cx, by) = bottom centre
//   drawPot(ctx, x, y, px, tilt)                      a glass coffee pot; (x, y) = the handle grip
//   drawTable(ctx, cx, top, px)                       a little round-top side table; top = table-top y
//   drawFridge(ctx, cx, by, px, open, t, { slice })   a chubby retro fridge; open 0…1 swings the door; the slice + its
//                                                     sticky note sit on the middle shelf when slice is true
//   drawSlice(ctx, x, y, px)                          a pizza slice, point down; (x, y) = top-left
//   drawPhone(ctx, x, y, px, rot, { notif, t })       a phone; notif 0…1 pops the DENTIST reminder on its screen
//   drawCalendar(ctx, cx, cy, px, circle)            a wall calendar page (FRI), circle 0…1 draws the red ring on
//   drawMirror(ctx, x, y, px, rot)                    a hand mirror; (x, y) = the handle end
//   drawPencil(ctx, x, y, px, rot)                    a pencil; (x, y) = the tip
//   drawCloudFloor(ctx, x0, x1, y, px)               the floating pixel cloud the home sits on; y = its top
//   drawBurst(ctx, cx, cy, t, a, { n, cols })         the cartoon starburst (rotating rays) behind the theme + moral
// Pure functions of their arguments; nothing touches `document`.
import { clamp } from '../../../src/lib.js'

const OUT = '#1a1030'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"

export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }

// ─────────────────────────────── bubbles, drops, the small stuff (stick's)
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
export function drawCrown(ctx, x, y, px, rot = -0.12) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, [
    'L...L...L',
    'GL.LGL.LG',
    'GGLGGGLGG',
    'GGGGGGGGG',
    'GRGGBGGRG',
    'GGGGGGGGG',
    'LLLLLLLLL',
  ], { L: '#7a4a10', G: '#ffd23f', R: '#ff3d6e', B: '#38c4ec' }, -4.5 * px, -7 * px, px)
  R(ctx, -3.5 * px, -5 * px, px, px, '#fff6c0')
  ctx.restore()
}
export function drawTissue(ctx, x, y, px, t) {
  const f = Math.floor(t * 6) % 2
  bitmap(ctx, f ? ['..OOOO.', '.OWWWWO', 'OWWSWWO', 'OWWWWO.', '.OOOO..'] : ['.OOOO..', 'OWWWWO.', 'OWWSWWO', '.OWWWWO', '..OOOO.'], { O: '#5a5478', W: '#ffffff', S: '#dcd6ee' }, x - 3.5 * px, y - 2.5 * px, px)
}

// ─────────────────────────────── Monday: the coffee
export function drawMug(ctx, cx, by, px, t, { steam = 1, fill = 1 } = {}) {
  const rows = [
    'OOOOOOOOO...',
    'OWWWWWWWO...',
    'OWWWWWWWOOO.',
    'OWWPWPWWO.O.',
    'OWPPPPPWO.O.',
    'OWWPPPWWO.O.',
    'OWWWPWWWOOO.',
    'OWWWWWWWO...',
    'OSSSSSSSO...',
    '.OOOOOOO....',
  ]
  const x0 = cx - 4.5 * px, y0 = by - rows.length * px
  bitmap(ctx, rows, { O: OUT, W: '#fff6ea', P: '#ff5c8e', S: '#d9cbe8' }, x0, y0, px)
  if (fill > 0) R(ctx, x0 + px, y0 + px, 7 * px, px, '#6b3a1e')
  if (steam > 0) {
    ctx.save(); ctx.globalAlpha *= 0.75 * clamp(steam)
    for (let k = 0; k < 3; k++) {
      const ph = (t * 0.9 + k * 0.33) % 1
      const sx = x0 + (2 + k * 2.5) * px + Math.sin((t + k) * 5) * px, sy = y0 - px - ph * 9 * px
      ctx.globalAlpha = 0.75 * clamp(steam) * (1 - ph)
      R(ctx, sx, sy, px, 2 * px, '#efe6d6')
    }
    ctx.restore()
  }
}
/** a glass coffee pot; (x, y) = the handle grip; tilt rotates the spout down to the left */
export function drawPot(ctx, x, y, px, tilt = 0, { pour = 0, t = 0 } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(-tilt)
  bitmap(ctx, [
    '...OOOOOO..',
    '..OKKKKKKO.',
    '.OOOOOOOOOO',
    'OGGGGGGGGOO',
    'OGWGGGGGGO.O',
    'OCCCCCCCCO.O',
    'OCCCCCCCCO.O',
    'OCCCCCCCCOOO',
    '.OCCCCCCO...',
    '..OOOOOO....',
  ], { O: OUT, K: '#2b2340', G: '#cfe8ff', W: '#ffffff', C: '#7a4220' }, -11 * px, -5 * px, px)
  ctx.restore()
  void pour; void t
}
export function drawTable(ctx, cx, top, px) {
  bitmap(ctx, [
    'OOOOOOOOOOOOOOOO',
    'OTTTTTTTTTTTTTTO',
    'OBBBBBBBBBBBBBBO',
    '.OOOOOOOOOOOOOO.',
    '......OBBO......',
    '......OBBO......',
    '......OBBO......',
    '......OBBO......',
    '......OBBO......',
    '......OBBO......',
    '....OOOOOOOO....',
    '...OBBBBBBBBO...',
    '...OOOOOOOOOO...',
  ], { O: OUT, T: '#e7a35c', B: '#a8612c' }, cx - 8 * px, top, px)
}
/** a hand mirror; (x, y) = the handle end, rot rotates the whole thing (0 = glass straight up) */
export function drawMirror(ctx, x, y, px, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, [
    '..OOOO..',
    '.OGGGGO.',
    'OGWCCCGO',
    'OGWCCCGO',
    'OGCCCCGO',
    'OGCCCCGO',
    '.OGGGGO.',
    '..OOOO..',
    '...OGO..',
    '...OGO..',
    '...OGO..',
    '...OOO..',
  ], { O: OUT, G: '#ffd23f', C: '#a9e4ff', W: '#ffffff' }, -4 * px, -12 * px, px)
  ctx.restore()
}

// ─────────────────────────────── Wednesday: the fridge and the last slice
export function drawSlice(ctx, x, y, px) {
  bitmap(ctx, [
    'BBBBBBBBB',
    'BCCCCCCCB',
    '.CCRCCCC.',
    '.CRRCCRC.',
    '..CCCRR..',
    '..CCCCC..',
    '...CRC...',
    '...CCC...',
    '....C....',
  ], { B: '#c8782e', C: '#ffd65a', R: '#e8344e' }, x, y, px)
}
/** a chubby retro fridge, (cx, by) = bottom centre; open 0…1 swings the door (hinged on the left) */
export function drawFridge(ctx, cx, by, px, open, t, { slice = false, note = 'SAVED 4 U' } = {}) {
  const w = 30 * px, h = 50 * px, x0 = cx - w / 2, y0 = by - h
  // body
  R(ctx, x0 - px, y0 + px, w + 2 * px, h - px, OUT); R(ctx, x0, y0, w, h, OUT)
  R(ctx, x0 + px, y0 + px, w - 2 * px, h - 2 * px, '#bfe9e2')
  // inside (visible when open)
  const ix = x0 + 2 * px, iy = y0 + 2 * px, iw = w - 4 * px, ih = h - 4 * px
  if (open > 0.02) {
    R(ctx, ix, iy, iw, ih, '#fff6d8')
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha *= 0.25 * clamp(open * 2); R(ctx, ix, iy, iw, ih * 0.4, '#fff6d8'); ctx.restore()
    for (const s of [0.33, 0.62]) R(ctx, ix, iy + ih * s, iw, px, '#9fcfc6')
    // a jar and a carton on the top shelf
    bitmap(ctx, ['.OOO.', 'OPPPO', 'OPPPO', 'OOOOO'], { O: OUT, P: '#ff9fbf' }, ix + 3 * px, iy + ih * 0.33 - 4 * px, px)
    bitmap(ctx, ['.OO.', 'OWWO', 'OBBO', 'OWWO', 'OOOO'], { O: OUT, W: '#ffffff', B: '#7fb8ff' }, ix + 11 * px, iy + ih * 0.33 - 5 * px, px)
    if (slice) {
      drawSlice(ctx, ix + 8 * px, iy + ih * 0.62 - 9 * px, px)
      // the sticky note, slightly tilted
      ctx.save(); ctx.translate(ix + 3 * px, iy + ih * 0.62 + 3 * px); ctx.rotate(-0.05)
      R(ctx, -px, -px, 22 * px, 13 * px, '#c9a21c'); R(ctx, 0, 0, 20 * px, 11 * px, '#ffe56b')
      ctx.fillStyle = '#7a2a3a'; ctx.font = `700 ${Math.round(3.2 * px)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText(note, 10 * px, 3.6 * px)
      drawPixelHeart(ctx, 10 * px, 7.8 * px, Math.max(2, px * 0.6))
      ctx.restore()
    }
  } else {
    // closed: the door face
  }
  // the door: a panel that narrows as it swings open (hinge on the left)
  const dw = iw * (1 - clamp(open)) + 0.001
  if (open < 0.98) {
    R(ctx, ix, iy, dw, ih, OUT)
    R(ctx, ix + px * 0.5, iy + px * 0.5, Math.max(0, dw - px), ih - px, '#d8f6f0')
    R(ctx, ix + px * 0.5, iy + ih * 0.3, Math.max(0, dw - px), px, '#9fcfc6')
    // handle + a fridge magnet
    if (dw > 6 * px) { R(ctx, ix + dw - 4 * px, iy + ih * 0.12, 2 * px, 9 * px, OUT); R(ctx, ix + dw - 3.5 * px, iy + ih * 0.12 + 0.5 * px, px, 8 * px, '#efe6d6') }
    if (dw > 14 * px) { drawPixelHeart(ctx, ix + dw * 0.45, iy + ih * 0.55, px * 0.9, '#ff5c8e'); R(ctx, ix + dw * 0.3, iy + ih * 0.75, 4 * px, 3 * px, '#ffd23f') }
  } else {
    // the open door seen edge-on, to the left of the body
    R(ctx, x0 - 6 * px, y0 + 2 * px, 5 * px, h - 4 * px, OUT); R(ctx, x0 - 5 * px, y0 + 3 * px, 3 * px, h - 6 * px, '#d8f6f0')
  }
  // feet
  R(ctx, x0 + 2 * px, by, 3 * px, 2 * px, OUT); R(ctx, x0 + w - 5 * px, by, 3 * px, 2 * px, OUT)
  void t
}

// ─────────────────────────────── Friday: the dentist
/** a phone; (x, y) = centre; notif 0…1 pops the reminder banner on its screen */
export function drawPhone(ctx, x, y, px, rot = 0, { notif = 0, t = 0 } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  const w = 16 * px, h = 28 * px
  R(ctx, -w / 2 - px, -h / 2 - px, w + 2 * px, h + 2 * px, OUT)
  R(ctx, -w / 2, -h / 2, w, h, '#3b2f63')
  R(ctx, -w / 2 + px, -h / 2 + 2 * px, w - 2 * px, h - 4 * px, '#9fd8ff')
  R(ctx, -w / 2 + px, -h / 2 + 2 * px, w - 2 * px, 3 * px, '#c4e8ff')
  if (notif > 0) {
    const k = clamp(notif)
    ctx.save(); ctx.translate(0, -h / 2 + 9 * px); ctx.scale(k, k)
    R(ctx, -w / 2 + 0.5 * px, -5 * px, w - px, 10 * px, OUT); R(ctx, -w / 2 + 1.5 * px, -4 * px, w - 3 * px, 8 * px, '#fffaf0')
    // a tiny tooth
    bitmap(ctx, ['OOOO', 'OWWO', 'OWWO', 'O..O'], { O: OUT, W: '#ffffff' }, -w / 2 + 2.5 * px, -2.5 * px, px)
    ctx.fillStyle = OUT; ctx.font = `700 ${Math.round(2.3 * px)}px ${MONO}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
    ctx.fillText('DENTIST', -w / 2 + 7.5 * px, -1.6 * px); ctx.fillStyle = '#d0307a'; ctx.fillText('FRI 3PM', -w / 2 + 7.5 * px, 1.8 * px)
    ctx.restore()
  }
  // buzz lines
  if (notif > 0 && notif < 1.6) {
    const b = Math.floor(t * 14) % 2
    R(ctx, -w / 2 - 4 * px - b * px, -4 * px, px, 8 * px, '#efe6d6'); R(ctx, w / 2 + 3 * px + b * px, -4 * px, px, 8 * px, '#efe6d6')
  }
  ctx.restore()
}
export function drawCalendar(ctx, cx, cy, px, circle = 0) {
  const w = 34 * px, h = 30 * px, x0 = cx - w / 2, y0 = cy - h / 2
  R(ctx, x0 - px, y0 - px, w + 2 * px, h + 2 * px, OUT); R(ctx, x0, y0, w, h, '#fffaf0')
  R(ctx, x0, y0, w, 7 * px, '#e8344e')
  for (const rx of [0.25, 0.75]) { R(ctx, x0 + w * rx - px, y0 - 3 * px, 2 * px, 5 * px, OUT) }
  ctx.fillStyle = '#fff1ea'; ctx.font = `700 ${Math.round(4 * px)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('THIS WEEK', cx, y0 + 3.8 * px)
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  ctx.font = `700 ${Math.round(3.4 * px)}px ${MONO}`
  days.forEach((d, i) => { const dx = x0 + (i + 0.5) * w / 7; ctx.fillStyle = 'rgba(26,16,48,0.55)'; ctx.fillText(d, dx, y0 + 11 * px); R(ctx, dx - 1.8 * px, y0 + 15 * px, 3.6 * px, 3.6 * px, i === 4 ? '#ffd0dc' : '#e8e0f0') })
  // tooth on Friday's square
  const fx = x0 + 4.5 * w / 7
  bitmap(ctx, ['OOO', 'OWO', 'O.O'], { O: OUT, W: '#ffffff' }, fx - 1.5 * px, y0 + 15.4 * px, px)
  ctx.fillStyle = 'rgba(26,16,48,0.35)'
  for (let k = 0; k < 3; k++) R(ctx, x0 + 3 * px, y0 + (21 + k * 2.6) * px, w - 6 * px - (k % 2) * 8 * px, px, 'rgba(26,16,48,0.25)')
  if (circle > 0) {
    ctx.strokeStyle = '#ff2e4f'; ctx.lineWidth = 1.4 * px; ctx.lineCap = 'round'
    ctx.beginPath(); ctx.ellipse(fx, y0 + 16.8 * px, 4.4 * px, 4 * px, -0.1, -1.9, -1.9 + Math.PI * 2.15 * clamp(circle)); ctx.stroke()
  }
}
export function drawPencil(ctx, x, y, px, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, ['.O.', 'OKO', 'OTO', 'OYO', 'OYO', 'OYO', 'OYO', 'OYO', 'OMO', 'OPO', 'OOO'], { O: OUT, K: '#2b2340', T: '#f2cf9a', Y: '#ffd23f', M: '#bfbfbf', P: '#ff8fb1' }, -1.5 * px, 0, px)
  ctx.restore()
}

// ─────────────────────────────── the set
/** the floating cloud the home sits on: a long soft pixel cloud, y = its top surface */
export function drawCloudFloor(ctx, x0, x1, y, px) {
  const w = x1 - x0
  ctx.save()
  R(ctx, x0 + 4 * px, y + 7 * px, w - 8 * px, 5 * px, 'rgba(10,6,24,0.35)')
  R(ctx, x0 + 2 * px, y, w - 4 * px, 8 * px, OUT)
  R(ctx, x0, y + 2 * px, w, 4 * px, OUT)
  R(ctx, x0 + 2 * px, y + px, w - 4 * px, 6 * px, '#e9defa')
  R(ctx, x0 + px, y + 2 * px, w - 2 * px, 4 * px, '#e9defa')
  R(ctx, x0 + 3 * px, y + px, w - 6 * px, 2 * px, '#ffffff')
  R(ctx, x0 + 2 * px, y + 5 * px, w - 4 * px, 2 * px, '#c3b2e6')
  // puffs underneath
  for (let k = 0; k < 7; k++) {
    const cx = x0 + (k + 0.5) * w / 7, r = (4 + (k * 3) % 3) * px
    R(ctx, cx - r - px, y + 7 * px, 2 * r + 2 * px, r + px, OUT); R(ctx, cx - r, y + 7 * px, 2 * r, r, '#d8cbf2')
    R(ctx, cx - r + px, y + 7 * px + r - 2 * px, 2 * r - 2 * px, px, '#b8a6e0')
  }
  ctx.restore()
}
/** the cartoon starburst: alternating rays turning slowly around (cx, cy); a = alpha */
export function drawBurst(ctx, cx, cy, t, a, { n = 18, cols = ['#ff6fb5', '#ffd23f'], R0 = 2400, spin = 0.25 } = {}) {
  if (a <= 0) return
  ctx.save(); ctx.globalAlpha *= a
  const rot = t * spin
  for (let i = 0; i < n; i++) {
    const a0 = rot + (i / n) * Math.PI * 2, a1 = a0 + Math.PI / n
    ctx.fillStyle = cols[i % cols.length]
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a0) * R0, cy + Math.sin(a0) * R0); ctx.lineTo(cx + Math.cos(a1) * R0, cy + Math.sin(a1) * R0); ctx.closePath(); ctx.fill()
  }
  ctx.restore()
}
/** a chalkboard sign, (x, y) = top-left */
export function drawBoardPanel(ctx, x, y, w, h, px = 6) {
  R(ctx, x - px, y + px, w + 2 * px, h - 2 * px, OUT); R(ctx, x + px, y - px, w - 2 * px, h + 2 * px, OUT)
  R(ctx, x, y, w, h, '#a8612c'); R(ctx, x, y, w, px, '#e7a35c'); R(ctx, x, y + h - px, w, px, '#6b3a1e')
  R(ctx, x + 2 * px, y + 2 * px, w - 4 * px, h - 4 * px, OUT)
  R(ctx, x + 3 * px, y + 3 * px, w - 6 * px, h - 6 * px, '#244a3c')
  ctx.save(); ctx.globalAlpha *= 0.08; R(ctx, x + 6 * px, y + 8 * px, w * 0.5, px * 2, '#ffffff'); R(ctx, x + w * 0.4, y + h * 0.7, w * 0.4, px * 2, '#ffffff'); ctx.restore()
}
export { INTER, MONO, OUT }
