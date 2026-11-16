// sxfriendafter props: small pixel drawings on canvas (Star Talk Shows · FRIENDS & SELF-LOVE · "After the Breakup.").
// Pure functions of their arguments; nothing touches `document` at module top level. Crisp rectangles only.
//   bitmap(ctx, rows, pal, x, y, px)              rows of chars → pal colours, (x, y) = top-left, px = one art pixel
//   drawBurrito(ctx, R, k)                        the blanket burrito wrapped round a star (R = drawStarChar's return; k = 0…1 wrapped)
//   drawCape(ctx, R, t, k)                        the same blanket worn as a cape, trailing behind on the walk
//   drawFringe(ctx, R)                            new-haircut bangs across the top of a star's face
//   drawShades(ctx, R, down)                      pixel sunglasses; down 0…1 slides them down the "nose"
//   drawDog(ctx, x, y, px, t, walking)            a small pixel dog (x, y = its feet, centre)
//   drawSoup(ctx, x, y, px, t)                    a steaming soup bowl
//   drawLamp(ctx, x, y, px)                       a street lamp (x = post, y = ground)
//   drawBubble(ctx, x, y, text, k, opts)          a pixel speech bubble; k = pop scale
//   drawLink(ctx, a, b, k, alpha)                 a gold constellation line from a to b, drawn k (0…1) of the way
import { clamp, lerp } from '../../../src/lib.js'

const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const OUT = '#1a1030'
const R_ = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }

export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) R_(ctx, x + i * px, y + j * px, px, px, c) } })
}

function plaid(ctx, x, y, w, h, px) {
  R_(ctx, x - px, y - px, w + px * 2, h + px * 2, OUT)
  R_(ctx, x, y, w, h, '#ff8fb1')
  for (let i = 0; i < w; i += px * 6) R_(ctx, x + i, y, px * 2, h, 'rgba(255,255,255,0.3)')
  for (let j = 0; j < h; j += px * 6) R_(ctx, x, y + j, w, px * 2, 'rgba(190,50,110,0.3)')
}
export function drawBurrito(ctx, R, k = 1) {
  if (k <= 0) return
  const S = R.size, px = Math.max(3, Math.round(S / 40))
  const top = R.y + S * 0.17, h = (S * 0.36) * clamp(k)
  ctx.save()
  plaid(ctx, R.x - S * 0.5, top + S * 0.36 - h, S, h, px)
  // the rolled sides over the arms
  plaid(ctx, R.x - S * 0.56, R.y - S * 0.18 + (1 - k) * S * 0.4, S * 0.2, S * 0.5 * k, px)
  plaid(ctx, R.x + S * 0.36, R.y - S * 0.18 + (1 - k) * S * 0.4, S * 0.2, S * 0.5 * k, px)
  R_(ctx, R.x - S * 0.5, top + S * 0.36 - h, S, px * 2, '#ffc2d6')
  ctx.restore()
}

export function drawCape(ctx, R, t, k = 1) {
  if (k <= 0) return
  const S = R.size, px = Math.max(3, Math.round(S / 40))
  ctx.save(); ctx.globalAlpha *= clamp(k)
  for (let j = 0; j < 6; j++) {
    const wave = Math.sin(t * 6 - j * 0.8) * S * 0.03
    plaid(ctx, R.x - S * 0.42 - j * S * 0.09, R.y - S * 0.12 + j * S * 0.06 + wave, S * 0.14, S * 0.22, px)
  }
  ctx.restore()
}

export function drawFringe(ctx, R) {
  const S = R.size, px = Math.max(3, Math.round(S / 36))
  const rows = ['....hhhhhhh....', '..hhhHhhhhhhh..', '.hhhhhHhhhhhhh.', 'hhhhhhhHhhhhhhh', 'hhhh.hhh.hhh.hh', 'hh....h....h..h']
  bitmap(ctx, rows, { h: '#3a1450', H: '#7a3a9a' }, R.x - 7.5 * px, R.y - S * 0.2, px)
}

export function drawShades(ctx, R, down = 0) {
  const S = R.size, px = Math.max(3, Math.round(S / 36)), y = R.y + S * 0.03 + down * S * 0.08
  ctx.save()
  bitmap(ctx, ['oooooo.oooooo', 'oKKKKoooKKKKo', 'oKWKKo.oKWKKo', '.oooo...oooo.'], { o: OUT, K: '#121018', W: '#9fe8ff' }, R.x - 6.5 * px, y, px)
  ctx.restore()
}

export function drawDog(ctx, x, y, px, t, walking = true) {
  const step = walking ? Math.floor(t * 8) % 2 : 0
  const rows = [
    '........oo..',
    '.......oBBo.',
    'o......oBkBo',
    'oo.....oBBBN',
    '.oBBBBBBBBo.',
    '.oBBBBBBBBo.',
    '..oBooooBo..',
    step ? '..o....o....' : '...o....o...',
  ]
  bitmap(ctx, rows, { o: OUT, B: '#c98a4a', k: '#1b1236', N: '#1b1236' }, x - 6 * px, y - 8 * px, px)
  // a wagging tail
  if (Math.floor(t * 10) % 2) R_(ctx, x - 6 * px, y - 7 * px, px, px, OUT)
}

export function drawSoup(ctx, x, y, px, t) {
  for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; ctx.save(); ctx.globalAlpha *= 0.6 * (1 - ph); R_(ctx, x + (i - 1) * px * 3 + Math.sin(ph * 6 + i) * px, y - px * 3 - ph * px * 10, px, px * 2, '#efe6d6'); ctx.restore() }
  bitmap(ctx, ['ooooooooooo', 'oYYYYYYYYYo', 'oWWWWWWWWWo', '.oWWWWWWWo.', '..ooooooo..'], { o: OUT, Y: '#f7c948', W: '#f4ecff' }, x - 5.5 * px, y - px, px)
}

export function drawLamp(ctx, x, y, px) {
  R_(ctx, x - px, y - 60 * px, px * 2, 60 * px, '#2a1c4a')
  R_(ctx, x - px * 4, y - 64 * px, px * 8, px * 4, '#3a2862')
  R_(ctx, x - px * 3, y - 61 * px, px * 6, px * 2, '#ffe08a')
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(x, y - 58 * px, 4, x, y - 58 * px, 40 * px); g.addColorStop(0, 'rgba(255,224,138,0.35)'); g.addColorStop(1, 'rgba(255,224,138,0)')
  ctx.fillStyle = g; ctx.fillRect(x - 40 * px, y - 98 * px, 80 * px, 80 * px); ctx.restore()
}

export function drawBubble(ctx, x, y, text, k, { size = 44, tail = 'left', col = '#fff6e6', ink = '#1b1236' } = {}) {
  if (k <= 0.02) return
  ctx.save()
  ctx.font = `800 ${size}px ${INTER}`
  const tw = ctx.measureText(text).width, w = tw + size * 0.9, h = size * 1.5, px = 6
  ctx.translate(x, y); ctx.scale(k, k)
  const bx = -w / 2, by = -h / 2
  R_(ctx, bx - px, by + px, w + px * 2, h - px * 2, OUT); R_(ctx, bx + px, by - px, w - px * 2, h + px * 2, OUT)
  R_(ctx, bx, by + px, w, h - px * 2, col); R_(ctx, bx + px, by, w - px * 2, h, col)
  const tx = tail === 'left' ? bx + w * 0.22 : tail === 'right' ? bx + w * 0.78 : 0
  for (let i = 0; i < 4; i++) { R_(ctx, tx - (4 - i) * px / 1.2 - px, by + h + i * px - px, (4 - i) * px * 1.6 + px * 2, px, OUT); R_(ctx, tx - (4 - i) * px / 1.2, by + h + i * px - px, (4 - i) * px * 1.6, px, col) }
  ctx.fillStyle = ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(text, 0, size * 0.06)
  ctx.restore()
}

export function drawLink(ctx, a, b, k, alpha = 1) {
  if (k <= 0 || alpha <= 0) return
  const ex = lerp(a[0], b[0], clamp(k)), ey = lerp(a[1], b[1], clamp(k))
  ctx.save()
  ctx.globalAlpha *= alpha
  ctx.globalCompositeOperation = 'lighter'
  ctx.strokeStyle = 'rgba(242,199,92,0.35)'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(ex, ey); ctx.stroke()
  ctx.strokeStyle = 'rgba(255,236,170,0.95)'; ctx.lineWidth = 4; ctx.setLineDash([14, 10]); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(ex, ey); ctx.stroke()
  ctx.restore()
}
