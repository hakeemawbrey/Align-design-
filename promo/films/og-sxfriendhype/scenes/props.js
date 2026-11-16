// sxfriendhype props: small pixel drawings on canvas (Star Talk Shows · FRIENDS & SELF-LOVE · "The Hype Friend.").
// Pure functions of their arguments; nothing touches `document` at module top level. Crisp rectangles only, so they sit
// next to the pixel stars.
//   bitmap(ctx, rows, pal, x, y, px)            rows of chars → pal colours, (x, y) = top-left, px = one art pixel
//   drawPomPom(ctx, x, y, r, t, { c1, c2, shake, seed })   a cheer pom-pom (a burst of pixel strands) centred on (x, y)
//   drawMic(ctx, x, y, px, rot)                 a handheld mic, (x, y) = the grille
//   drawTrophy(ctx, x, y, px, shine)            a gold trophy cup, (x, y) = the base centre
//   drawDoor(ctx, { x, y, w, h, open, rattle, light })      a bedroom door; open 0…1 swings it into the room
//   drawMirror(ctx, { x, y, w, h, flash }, inside)          a tall gold-framed standing mirror; inside(ctx) paints the glass
//   drawBed(ctx, x, y, w)                       a little pixel bed (x, y = the mattress top-left)
//   drawBubble(ctx, x, y, text, k, { size, tail, col })     a pixel speech bubble; k = pop scale
//   drawLetterCard(ctx, x, y, ch, k, rot)       a big cheer letter on a gold card
//   drawCurtains(ctx, t, open)                  red stage curtains on both sides + a pelmet
//   drawPodium(ctx, x, y)                       the awards podium (x = centre, y = top)
//   drawCouch(ctx, x, y, w)                     a squashy purple couch (x = centre, y = seat top)
//   drawBowl(ctx, x, y, px, t)                  a giant snack bowl heaped with chips
//   drawBlanket(ctx, x, y, w, h, k)             a pink plaid blanket thrown over the couch (k = how far it has dropped)
//   drawClock(ctx, x, y, r, a)                  a wall clock; a = hand angle (radians, turns)
//   drawSweat(ctx, x, y, px)                    one pixel sweat drop
import { clamp } from '../../../src/lib.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const OUT = '#1a1030'
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }

export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) R(ctx, x + i * px, y + j * px, px, px, c) } })
}

export function drawPomPom(ctx, x, y, r, t, { c1 = '#ffd36a', c2 = '#ff8fb1', shake = 0, seed = 1 } = {}) {
  const N = 46, px = Math.max(4, Math.round(r / 9))
  ctx.save()
  // handle
  R(ctx, x - px, y + r * 0.55, px * 2, r * 0.5, OUT); R(ctx, x - px / 2, y + r * 0.55, px, r * 0.46, '#efe6d6')
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2 + seed, wob = 1 + 0.18 * Math.sin(t * 22 * (0.6 + shake) + i * 1.7) * (0.25 + shake)
    const len = r * (0.55 + 0.45 * ((i * 37) % 11) / 10) * wob
    const col = i % 3 === 0 ? c2 : i % 3 === 1 ? c1 : '#fff1c8'
    for (let s = 0.15; s <= 1; s += 0.17) {
      const qx = x + Math.cos(a) * len * s, qy = y + Math.sin(a) * len * s
      R(ctx, qx - px / 2, qy - px / 2, px, px, col)
    }
  }
  R(ctx, x - px * 1.5, y - px * 1.5, px * 3, px * 3, c1)
  ctx.restore()
}

export function drawMic(ctx, x, y, px, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, ['.ooo.', 'oggwo', 'ogggo', 'oggo.', '.oo..', '.kk..', '.kk..', '.kk..', '.kk..', '.kk..', '.oo..'], { o: OUT, g: '#9aa3b8', w: '#ffffff', k: '#2b2a3a' }, -2.5 * px, -1.5 * px, px)
  ctx.restore()
}

const TROPHY = [
  'o.ooooooooo.o',
  'oooYYYYYYYooo',
  'oYoYWYYYYYoYo',
  'oYoYWYYYYYoYo',
  '.ooYYYYYYdoo.',
  '...oYYYYdo...',
  '....oYYdo....',
  '.....oYo.....',
  '.....oYo.....',
  '...ooYYYoo...',
  '..oBBBBBBBo..',
  '..oBBwwwBBo..',
  '..ooooooooo..',
]
export function drawTrophy(ctx, x, y, px, shine = 0) {
  const w = TROPHY[0].length, h = TROPHY.length
  bitmap(ctx, TROPHY, { o: OUT, Y: '#f7c948', W: '#fff6c8', d: '#c98a1f', B: '#5b3a8a', w: '#efe6d6' }, x - (w * px) / 2, y - h * px, px)
  if (shine > 0) {
    ctx.save(); ctx.globalAlpha *= clamp(shine)
    const sx = x - 2 * px, sy = y - (h - 2) * px
    R(ctx, sx, sy - 3 * px, px, 7 * px, '#ffffff'); R(ctx, sx - 3 * px, sy, 7 * px, px, '#ffffff')
    ctx.restore()
  }
}

export function drawDoor(ctx, { x, y, w, h, open = 0, rattle = 0, light = 0 }) {
  const px = 6
  // frame + the dark doorway (lit warm when open)
  R(ctx, x - px * 2, y - px * 2, w + px * 4, h + px * 2, '#2a1c4a')
  R(ctx, x, y, w, h, light > 0 ? `rgba(255,214,140,${0.25 + 0.6 * light})` : '#0c0820')
  const dx = rattle ? Math.sin(rattle * 40) * 5 * rattle : 0
  const ww = w * (1 - 0.82 * clamp(open))
  R(ctx, x + dx, y, ww, h, '#6b4aa8'); R(ctx, x + dx, y, ww, px, '#8f6fd0')
  R(ctx, x + dx + ww - px, y, px, h, '#3f2a70')
  if (ww > w * 0.4) {
    R(ctx, x + dx + ww * 0.14, y + h * 0.1, ww * 0.72, h * 0.32, '#5a3c94'); R(ctx, x + dx + ww * 0.14, y + h * 0.52, ww * 0.72, h * 0.36, '#5a3c94')
    R(ctx, x + dx + ww * 0.8, y + h * 0.48, px * 2, px * 2, '#f2c75c')
  }
}

export function drawMirror(ctx, { x, y, w, h, flash = 0 }, inside) {
  const px = 8
  R(ctx, x - px * 3, y - px * 3, w + px * 6, h + px * 6, OUT)
  R(ctx, x - px * 2, y - px * 2, w + px * 4, h + px * 4, '#f2c75c')
  R(ctx, x - px * 2, y - px * 2, w + px * 4, px, '#fff1c8')
  R(ctx, x - px, y - px, w + px * 2, h + px * 2, '#c98a1f')
  ctx.save()
  ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip()
  const g = ctx.createLinearGradient(x, y, x + w, y + h); g.addColorStop(0, '#2c2f5e'); g.addColorStop(0.5, '#1f2150'); g.addColorStop(1, '#2a1f56')
  ctx.fillStyle = g; ctx.fillRect(x, y, w, h)
  if (inside) inside(ctx)
  // glass sheen
  ctx.globalAlpha = 0.12; ctx.fillStyle = '#ffffff'
  ctx.beginPath(); ctx.moveTo(x, y + h * 0.15); ctx.lineTo(x + w * 0.35, y); ctx.lineTo(x + w * 0.55, y); ctx.lineTo(x, y + h * 0.45); ctx.fill()
  ctx.globalAlpha = 1
  if (flash > 0) { ctx.fillStyle = `rgba(255,236,170,${0.55 * clamp(flash)})`; ctx.fillRect(x, y, w, h) }
  ctx.restore()
  // stand feet
  R(ctx, x + w * 0.1, y + h + px * 3, px * 3, px * 3, '#c98a1f'); R(ctx, x + w * 0.9 - px * 3, y + h + px * 3, px * 3, px * 3, '#c98a1f')
}

export function drawBed(ctx, x, y, w) {
  const px = 6
  R(ctx, x - px, y - 60, px * 4, 60 + 60, '#4a3478')                 // headboard post
  R(ctx, x, y - 40, w * 0.2, 40, '#efe6d6')                          // pillow
  R(ctx, x, y, w, 30, '#8a5cc8'); R(ctx, x, y, w, px, '#b38ae8')      // duvet
  R(ctx, x, y + 30, w, 24, '#3a2862')                                // frame
  R(ctx, x + px, y + 54, px * 2, 18, '#2a1c4a'); R(ctx, x + w - px * 3, y + 54, px * 2, 18, '#2a1c4a')
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

export function drawLetterCard(ctx, x, y, ch, k, rot = 0) {
  if (k <= 0.02) return
  const w = 150, h = 190, px = 8
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k)
  R(ctx, -w / 2 - px, -h / 2, w + px * 2, h, OUT); R(ctx, -w / 2, -h / 2 - px, w, h + px * 2, OUT)
  R(ctx, -w / 2, -h / 2, w, h, '#f2c75c'); R(ctx, -w / 2 + px, -h / 2 + px, w - px * 2, h - px * 2, '#2a1757')
  R(ctx, -w / 2 + px, -h / 2 + px, w - px * 2, px, '#fff1c8')
  ctx.font = `800 132px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#ffe08a'
  ctx.fillText(ch, 0, 8)
  ctx.restore()
}

export function drawCurtains(ctx, t, open = 1, top = 470) {
  const W = 1080, cw = 110 + (1 - clamp(open)) * 430
  for (const side of [0, 1]) {
    const x0 = side ? W - cw : 0
    for (let i = 0; i < cw; i += 30) {
      const sway = Math.sin(t * 1.6 + i * 0.05) * 3
      R(ctx, x0 + i + sway, top, 30, 1500, i % 60 ? '#9a1f3c' : '#c42a4e')
      R(ctx, x0 + i + sway, top, 6, 1500, 'rgba(255,255,255,0.08)')
    }
  }
  R(ctx, 0, top - 10, W, 70, '#7a1530'); R(ctx, 0, top + 50, W, 10, '#f2c75c')
  for (let i = 0; i < W; i += 60) R(ctx, i + 20, top + 60, 20, 18, '#f2c75c')
}

export function drawPodium(ctx, x, y) {
  const w = 230, h = 300, px = 8
  R(ctx, x - w / 2 - px, y - px, w + px * 2, h + px, OUT)
  R(ctx, x - w / 2, y, w, h, '#3b2a6e'); R(ctx, x - w / 2, y, w, px * 2, '#6b4aa8')
  R(ctx, x - w / 2 - px * 2, y - px * 2, w + px * 4, px * 3, '#f2c75c')
  // a gold star emblem
  bitmap(ctx, ['...Y...', '..YYY..', 'YYYYYYY', '.YYYYY.', '.YY.YY.', 'Y.....Y'], { Y: '#f2c75c' }, x - 3.5 * px * 1.5, y + 90, px * 1.5)
}

export function drawCouch(ctx, x, y, w) {
  const px = 8, h = 150, bw = w
  R(ctx, x - bw / 2, y - 120, bw, 130, '#5a3c94'); R(ctx, x - bw / 2, y - 120, bw, px, '#7d5cc0')       // back
  R(ctx, x - bw / 2 - 40, y - 40, 60, h, '#4a3080'); R(ctx, x + bw / 2 - 20, y - 40, 60, h, '#4a3080')  // arms
  R(ctx, x - bw / 2 - 40, y - 40, 60, px, '#6b4aa8'); R(ctx, x + bw / 2 - 20, y - 40, 60, px, '#6b4aa8')
  R(ctx, x - bw / 2 + 20, y, bw - 40, 60, '#6b4aa8'); R(ctx, x - bw / 2 + 20, y, bw - 40, px, '#9a7be0')  // seat
  R(ctx, x - 2, y, 4, 60, '#4a3080')
  R(ctx, x - bw / 2 - 40, y + 60, bw + 80, 50, '#3a2862')
  R(ctx, x - bw / 2 - 20, y + 110, px * 2, 20, '#2a1c4a'); R(ctx, x + bw / 2, y + 110, px * 2, 20, '#2a1c4a')
}

export function drawBowl(ctx, x, y, px, t = 0) {
  // chips heap (above y), bowl (below)
  const chips = [[-5, -2], [-2, -3], [1, -3], [4, -2], [-3, -1], [0, -1], [3, -1], [-1, -4], [2, -4], [6, -1], [-6, -1]]
  for (const [i, j] of chips) {
    const wob = Math.round(Math.sin(t * 6 + i) * 0.4)
    R(ctx, x + i * px * 1.4 - px, y + (j + wob) * px * 1.2, px * 2.2, px * 1.4, '#f7c948')
    R(ctx, x + i * px * 1.4 - px, y + (j + wob) * px * 1.2, px * 2.2, px * 0.5, '#fff1a0')
  }
  bitmap(ctx, ['ooooooooooooooooooo', 'oCCCCCCCCCCCCCCCCCo', 'oCwCCCCCCCCCCCCCCdo', '.oCCCCCCCCCCCCCCdo.', '..ooCCCCCCCCCCdoo..', '....ooooooooooo....'],
    { o: OUT, C: '#4fc3f7', w: '#e6f8ff', d: '#2a8fc0' }, x - 9.5 * px, y, px)
}

export function drawBlanket(ctx, x, y, w, h, k) {
  if (k <= 0) return
  const hh = h * clamp(k), px = 10
  ctx.save()
  R(ctx, x - w / 2, y, w, hh, '#ff8fb1')
  for (let i = 0; i < w; i += 60) R(ctx, x - w / 2 + i, y, 18, hh, 'rgba(255,255,255,0.28)')
  for (let j = 0; j < hh; j += 60) R(ctx, x - w / 2, y + j, w, 18, 'rgba(200,60,120,0.3)')
  R(ctx, x - w / 2, y, w, px, '#ffc2d6')
  for (let i = 0; i < w; i += 30) R(ctx, x - w / 2 + i, y + hh, 12, 14, '#ff8fb1')       // fringe
  ctx.restore()
}

export function drawClock(ctx, x, y, r, a) {
  const px = 6
  ctx.save()
  ctx.fillStyle = OUT; ctx.beginPath(); ctx.arc(x, y, r + px * 2, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#f2c75c'; ctx.beginPath(); ctx.arc(x, y, r + px, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#fff6e6'; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
  for (let i = 0; i < 12; i++) { const q = i / 12 * Math.PI * 2; R(ctx, x + Math.sin(q) * r * 0.82 - px / 2, y - Math.cos(q) * r * 0.82 - px / 2, px, px, OUT) }
  const hand = (ang, len, wd, c) => { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); R(ctx, -wd / 2, -len, wd, len, c); ctx.restore() }
  hand(a / 12, r * 0.5, px * 1.4, OUT)
  hand(a, r * 0.78, px, '#e23d66')
  R(ctx, x - px, y - px, px * 2, px * 2, OUT)
  ctx.restore()
}

export function drawSweat(ctx, x, y, px) {
  bitmap(ctx, ['..o..', '.oBo.', 'oBWBo', 'oBBBo', '.ooo.'], { o: '#16204a', B: '#5cc6ff', W: '#e6f8ff' }, x - 2.5 * px, y, px)
}

export { MONO }
