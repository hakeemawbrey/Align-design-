// sxfriendmirror props: small pixel drawings on canvas (Star Talk Shows · FRIENDS & SELF-LOVE · "Your Own Biggest Fan.").
// Pure functions of their arguments; nothing touches `document` at module top level. Crisp rectangles only.
//   bitmap(ctx, rows, pal, x, y, px)                 rows of chars → pal colours, (x, y) = top-left, px = one art pixel
//   drawCloud(ctx, x, y, s, t, { mood, cute, blush }) the inner critic: a grumpy pixel rain cloud (s = width); cute → a soft puff
//   drawRain(ctx, x, y, w, t, k)                     drizzle falling from a cloud's belly (k = strength)
//   drawRainbow(ctx, x, y, r, k)                     a tiny pixel rainbow arc (k = reveal 0…1)
//   drawHat(ctx, x, y, px)                           a red beret, (x, y) = where it sits (the star's top tip)
//   drawScarf(ctx, x, y, w, px, t)                   a striped scarf across the star (x = centre, y = the band's top)
//   drawSweater(ctx, x, y, w, h, px)                 a cosy beige knit sweater over the star's lower body
//   drawMic(ctx, x, y, px, rot)                      a handheld mic, (x, y) = the grille
//   drawBubble(ctx, x, y, text, k, opts)             a pixel speech bubble; k = pop scale
//   drawChatPhone(ctx, x, y, s, text, { caret, sent, t })  a phone with one draft message (s = scale)
//   drawDealPanel(ctx, x, y, k, ticks, t)            the dealbreakers picker card; ticks = 0…3 chips stamped
import { clamp } from '../../../src/lib.js'

const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const OUT = '#1a1030'
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }

export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) R(ctx, x + i * px, y + j * px, px, px, c) } })
}

const CLOUD = [
  '.......oooo.........',
  '.....ooLLLLoo.......',
  '....oLLLLLLLLo.ooo..',
  '..oooLLLLLLLLLoLLLo.',
  '.oLLLLLLLLLLLLLLLLLo',
  'oLLLLLLLLLLLLLLLLLLo',
  'oLLLLLLLLLLLLLLLLLLo',
  'oLLLLLLLLLLLLLLLLLLo',
  'oDDLLLLLLLLLLLLLLDDo',
  '.oDDDDDDDDDDDDDDDDo.',
  '..oooooooooooooooo..',
]
/** mood: 'grump' | 'shock' | 'sad' | 'happy' */
export function drawCloud(ctx, x, y, s, t, { mood = 'grump', cute = 0, blush = 0 } = {}) {
  if (s <= 4) return
  const px = s / 20, w = 20 * px, h = 11 * px
  const ox = x - w / 2, oy = y - h / 2
  const L = cute > 0.5 ? '#f4eefe' : '#9a9fb8', D = cute > 0.5 ? '#d9cff2' : '#6c7090', Lh = cute > 0.5 ? '#ffffff' : '#b9bdd2'
  bitmap(ctx, CLOUD, { o: OUT, L, D }, ox, oy, px)
  R(ctx, ox + 6 * px, oy + 2 * px, 3 * px, px, Lh)
  // face (cells relative to the cloud's top-left)
  const ink = '#1b1236', ex1 = ox + 7 * px, ex2 = ox + 12 * px, ey = oy + 5.5 * px
  if (mood === 'happy') {
    R(ctx, ex1, ey, px, px, ink); R(ctx, ex1 - px, ey + px, px, px, ink); R(ctx, ex1 + px, ey + px, px, px, ink)
    R(ctx, ex2, ey, px, px, ink); R(ctx, ex2 - px, ey + px, px, px, ink); R(ctx, ex2 + px, ey + px, px, px, ink)
  } else if (mood === 'shock') {
    R(ctx, ex1 - px / 2, ey - px / 2, px * 2, px * 2, '#ffffff'); R(ctx, ex1, ey, px, px, ink)
    R(ctx, ex2 - px / 2, ey - px / 2, px * 2, px * 2, '#ffffff'); R(ctx, ex2, ey, px, px, ink)
    R(ctx, ox + 9.5 * px, oy + 8 * px, px, px, ink)
  } else {
    R(ctx, ex1, ey, px, px * 1.4, ink); R(ctx, ex2, ey, px, px * 1.4, ink)
    if (mood === 'grump') {                              // angry brows + a frown
      R(ctx, ex1 - px, ey - 1.6 * px, px, px * 0.8, ink); R(ctx, ex1, ey - 1.1 * px, px, px * 0.8, ink)
      R(ctx, ex2 + px, ey - 1.6 * px, px, px * 0.8, ink); R(ctx, ex2, ey - 1.1 * px, px, px * 0.8, ink)
      R(ctx, ox + 9 * px, oy + 8 * px, px * 2, px * 0.7, ink); R(ctx, ox + 8 * px, oy + 8.5 * px, px, px * 0.7, ink); R(ctx, ox + 11 * px, oy + 8.5 * px, px, px * 0.7, ink)
    } else {                                             // sad: worried brows, a wobble mouth, a tear
      R(ctx, ex1 + px, ey - 1.6 * px, px, px * 0.8, ink); R(ctx, ex1, ey - 1.1 * px, px, px * 0.8, ink)
      R(ctx, ex2 - px, ey - 1.6 * px, px, px * 0.8, ink); R(ctx, ex2, ey - 1.1 * px, px, px * 0.8, ink)
      R(ctx, ox + 9 * px, oy + 8.2 * px, px * 2, px * 0.7, ink)
      const k = (t * 1.6) % 1
      R(ctx, ex1, ey + 2 * px + k * 3 * px, px, px * 1.4, '#5cc6ff')
    }
  }
  if (blush > 0) { ctx.save(); ctx.globalAlpha *= clamp(blush); R(ctx, ox + 5 * px, oy + 7.3 * px, px * 1.5, px, '#ff8fb1'); R(ctx, ox + 13.5 * px, oy + 7.3 * px, px * 1.5, px, '#ff8fb1'); ctx.restore() }
}

export function drawRain(ctx, x, y, w, t, k) {
  if (k <= 0) return
  ctx.save(); ctx.globalAlpha *= clamp(k)
  const n = Math.max(3, Math.round(w / 26)), px = Math.max(3, Math.round(w / 60))
  for (let i = 0; i < n; i++) {
    const ph = (t * 1.5 + i * 0.37) % 1, dx = x - w / 2 + (i + 0.5) * w / n
    R(ctx, dx, y + ph * w * 0.9, px, px * 3, '#5cc6ff'); R(ctx, dx, y + ph * w * 0.9, px, px, '#e6f8ff')
  }
  ctx.restore()
}

export function drawRainbow(ctx, x, y, r, k) {
  if (k <= 0) return
  const cols = ['#ff5a6e', '#ffb35c', '#f7e05c', '#7dffb0', '#5cc6ff', '#c9a6ff'], px = Math.max(4, r / 12)
  const a1 = Math.PI + Math.PI * clamp(k)
  cols.forEach((c, i) => {
    const rr = r - i * px
    for (let a = Math.PI; a <= a1; a += 0.09) R(ctx, x + Math.cos(a) * rr - px / 2, y + Math.sin(a) * rr - px / 2, px, px, c)
  })
}

export function drawHat(ctx, x, y, px) {
  bitmap(ctx, ['.....oo.....', '.....oRo....', '..ooooooo...', '.oRRRRRRRoo.', 'oRRWRRRRRRRo', 'oRRRRRRRRRRo', '.oddddddddo.', '..oooooooo..'],
    { o: OUT, R: '#e23d4e', W: '#ff8f9c', d: '#a8203a' }, x - 6 * px, y - 7 * px, px)
}

export function drawScarf(ctx, x, y, w, px, t = 0) {
  const h = px * 3
  R(ctx, x - w / 2 - px, y - px, w + px * 2, h + px * 2, OUT)
  for (let i = 0; i < w; i += px * 2) R(ctx, x - w / 2 + i, y, px * 2, h, (i / (px * 2)) % 2 ? '#f2c75c' : '#3fb07a')
  // the tail, swinging
  const sw = Math.round(Math.sin(t * 3) * 1) * px
  for (let j = 0; j < 5; j++) { R(ctx, x + w * 0.22 + sw * (j / 5) - px, y + h + j * px * 2, px * 4, px * 2, OUT); R(ctx, x + w * 0.22 + sw * (j / 5), y + h + j * px * 2, px * 2, px * 2, j % 2 ? '#f2c75c' : '#3fb07a') }
}

export function drawSweater(ctx, x, y, w, h, px) {
  R(ctx, x - w / 2 - px, y - px, w + px * 2, h + px * 2, OUT)
  R(ctx, x - w / 2, y, w, h, '#e8d6b0')
  for (let i = px; i < w - px; i += px * 3) R(ctx, x - w / 2 + i, y + px, px, h - px * 3, 'rgba(160,120,70,0.35)')
  R(ctx, x - w / 2, y + h - px * 2, w, px * 2, '#c9ad80')
  R(ctx, x - w / 2, y, w, px, '#f6ead0')
  // a little heart on the chest
  bitmap(ctx, ['o.o', 'ooo', '.o.'], { o: '#ff6f9a' }, x - 1.5 * px, y + h * 0.35, px)
}

export function drawMic(ctx, x, y, px, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, ['.ooo.', 'oggwo', 'ogggo', 'oggo.', '.oo..', '.kk..', '.kk..', '.kk..', '.kk..', '.kk..', '.oo..'], { o: OUT, g: '#f2c75c', w: '#fff6c8', k: '#2b2a3a' }, -2.5 * px, -1.5 * px, px)
  ctx.restore()
}

export function drawBubble(ctx, x, y, text, k, { size = 44, tail = 'left', col = '#fff6e6', ink = '#1b1236' } = {}) {
  if (k <= 0.02) return
  ctx.save()
  ctx.font = `800 ${size}px ${INTER}`
  const tw = ctx.measureText(text).width, w = tw + size * 0.9, h = size * 1.5, px = 6
  ctx.translate(x, y); ctx.scale(k, k)
  const bx = -w / 2, by = -h / 2
  R(ctx, bx - px, by + px, w + px * 2, h - px * 2, OUT); R(ctx, bx + px, by - px, w - px * 2, h + px * 2, OUT)
  R(ctx, bx, by + px, w, h - px * 2, col); R(ctx, bx + px, by, w - px * 2, h, col)
  const tx = tail === 'left' ? bx + w * 0.22 : tail === 'right' ? bx + w * 0.78 : 0
  for (let i = 0; i < 4; i++) { R(ctx, tx - (4 - i) * px / 1.2 - px, by + h + i * px - px, (4 - i) * px * 1.6 + px * 2, px, OUT); R(ctx, tx - (4 - i) * px / 1.2, by + h + i * px - px, (4 - i) * px * 1.6, px, col) }
  ctx.fillStyle = ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(text, 0, size * 0.06)
  ctx.restore()
}

export function drawChatPhone(ctx, x, y, s, text, { caret = false, sent = false } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s)
  const w = 360, h = 300, r = 40
  ctx.fillStyle = '#140d2a'; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h + 200, r); ctx.fill()
  ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(239,230,214,0.85)'; ctx.stroke()
  ctx.save(); ctx.beginPath(); ctx.roundRect(-w / 2 + 12, -h / 2 + 12, w - 24, h + 176, r - 10); ctx.clip()
  const g = ctx.createLinearGradient(0, -h / 2, 0, h / 2 + 200); g.addColorStop(0, '#2a1a5c'); g.addColorStop(1, '#1a1040')
  ctx.fillStyle = g; ctx.fillRect(-w / 2, -h / 2, w, h + 200)
  ctx.fillStyle = 'rgba(239,230,214,0.6)'; ctx.font = `700 18px ${MONO}`; ctx.textAlign = 'center'; ctx.fillText('11:02 PM · after the date', 0, -h / 2 + 46)
  // the message (a draft in the input, or a sent bubble)
  ctx.font = `600 30px ${INTER}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
  const tw = Math.max(40, ctx.measureText(text).width)
  if (sent) {
    ctx.fillStyle = '#9a6cff'; ctx.beginPath(); ctx.roundRect(w / 2 - 36 - tw - 36, -10, tw + 36, 64, 24); ctx.fill()
    ctx.fillStyle = '#ffffff'; ctx.fillText(text, w / 2 - 36 - tw - 18, 23)
    ctx.fillStyle = 'rgba(239,230,214,0.7)'; ctx.font = `700 16px ${MONO}`; ctx.textAlign = 'right'; ctx.fillText('SENT ✓', w / 2 - 40, 76)
  } else {
    ctx.fillStyle = 'rgba(239,230,214,0.12)'; ctx.beginPath(); ctx.roundRect(-w / 2 + 30, 120, w - 60, 70, 35); ctx.fill()
    ctx.fillStyle = '#efe6d6'; ctx.fillText(text, -w / 2 + 54, 156)
    if (caret) { ctx.fillStyle = '#9fe8ff'; ctx.fillRect(-w / 2 + 56 + ctx.measureText(text).width, 138, 4, 36) }
  }
  ctx.restore()
  ctx.restore()
}

const CHIPS = ['✕ makes me feel small', '✕ mean about my sweater', '✕ “just joking” 24/7']
export function drawDealPanel(ctx, x, y, k, ticks, t) {
  if (k <= 0.02) return
  const w = 700, h = 420, px = 8
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k)
  R(ctx, -w / 2 - px, -h / 2, w + px * 2, h, OUT); R(ctx, -w / 2, -h / 2 - px, w, h + px * 2, OUT)
  R(ctx, -w / 2, -h / 2, w, h, '#f2c75c'); R(ctx, -w / 2 + px, -h / 2 + px, w - px * 2, h - px * 2, '#1d1240')
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = 'rgba(239,230,214,0.6)'; ctx.font = `700 22px ${MONO}`; ctx.fillText('DEALBREAKERS', 0, -h / 2 + 56)
  ctx.fillStyle = '#efe6d6'; ctx.font = `italic 500 44px ${SERIF}`; ctx.fillText('What ends it before it starts?', 0, -h / 2 + 112)
  CHIPS.forEach((c, i) => {
    const on = i < ticks, cy = -h / 2 + 170 + i * 74
    ctx.font = `700 28px ${INTER}`
    const tw = ctx.measureText(c).width + 56
    const sc = on ? 1 + 0.12 * Math.max(0, Math.sin(Math.min(1, (t * 7) % 1) * Math.PI)) * 0 : 1
    ctx.save(); ctx.translate(0, cy + 26); ctx.scale(sc, sc)
    ctx.fillStyle = on ? '#ff8fb1' : 'rgba(239,230,214,0.1)'; ctx.beginPath(); ctx.roundRect(-tw / 2, -28, tw, 56, 28); ctx.fill()
    ctx.lineWidth = 3; ctx.strokeStyle = on ? '#ffd0de' : 'rgba(239,230,214,0.35)'; ctx.stroke()
    ctx.fillStyle = on ? '#1b1236' : 'rgba(239,230,214,0.75)'; ctx.textBaseline = 'middle'; ctx.fillText(c, 0, 2)
    ctx.restore()
  })
  ctx.restore()
}
