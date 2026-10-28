// stlightyears props: small pixel drawings on canvas (Star Talk season 3). Pure functions of their arguments; no `document`
// at module top level. Every prop is a bitmap of cells drawn with fillRect at a whole-pixel cell size, so it stays crisp.
//   drawBitmap(ctx, rows, x, y, cell, pal, { ax, ay, rot, flip, alpha })   rows: strings, '.' = empty, other chars → pal[ch]
//   ICON.moon / ICON.heart / ICON.cake                                     7–9 cell message icons (pal ICON_PAL)
//   drawPlane(ctx, x, y, cell, rot, droop)                                 a paper plane (nose right), droop 0…1 sags the nose
//   drawPigeon(ctx, x, y, cell, t, { flap, look })                         a pigeon in a tiny glass space helmet
//   drawPartyHat(ctx, x, y, cell, rot)                                     (x, y) = the hat's base centre
//   drawCobweb(ctx, cx, cy, r, a0, a1, alpha)                              a corner web from (cx, cy), spokes a0…a1
//   drawSpider(ctx, x, y0, len, cell, t)                                   a tiny spider dangling on a thread
//   drawTears(ctx, eyes, t, t0, { cell, strength })                        cartoon fountain tears from [[x, y], …] eyes
import { clamp } from '../../src/lib.js'

export function drawBitmap(ctx, rows, x, y, cell, pal, { ax = 0.5, ay = 0.5, rot = 0, flip = false, alpha = 1 } = {}) {
  if (alpha <= 0) return
  const w = rows[0].length, h = rows.length, c = Math.max(1, Math.round(cell))
  ctx.save()
  ctx.globalAlpha *= alpha
  ctx.translate(Math.round(x), Math.round(y))
  if (rot) ctx.rotate(rot)
  if (flip) ctx.scale(-1, 1)
  const ox = -Math.round(w * c * ax), oy = -Math.round(h * c * ay)
  rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) { const col = pal[r[i]]; if (!col) continue; ctx.fillStyle = col; ctx.fillRect(ox + i * c, oy + j * c, c, c) } })
  ctx.restore()
}

// ── message icons (what each photon carries)
export const ICON_PAL = { M: '#e9dcff', m: '#a98be8', H: '#ff5c8e', h: '#ffd0de', C: '#fff1dc', c: '#ff8fb1', F: '#ffd24a', K: '#1b1236', S: '#c08850' }
export const ICON = {
  moon: ['..MMM..', '.MMmm..', 'MMm....', 'MMm....', 'MMm....', '.MMmm..', '..MMM..'],
  heart: ['.HH.HH.', 'HhHHHHH', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'],
  cake: ['....F....', '....K....', '.CCCCCCC.', '.CcCcCcC.', '.CCCCCCC.', 'SSSSSSSSS', 'SCCCCCCCS', 'SSSSSSSSS'],
}

// ── paper plane (nose points right); droop rotates the nose down a touch more each second it stalls
const PLANE = [
  '.............WW',
  '..........WWWWL',
  '.......WWWWWWL.',
  '....WWWWWWWWL..',
  '.WWWWWWWWWWL...',
  'WWWWWWDDDLL....',
  '..DDDDDDDL.....',
  '....DDDDL......',
  '......DL.......',
]
export function drawPlane(ctx, x, y, cell, rot = 0, droop = 0, alpha = 1) {
  drawBitmap(ctx, PLANE, x, y, cell, { W: '#fbf6ec', D: '#b9b2c8', L: '#8c84a3' }, { rot: rot + droop * 0.5, alpha })
}

// ── pigeon (faces right) + a tiny glass space helmet
const PIGEON = [
  '.....GGG......',
  '....GGGGK.....',
  '....GGGGGY....',
  '.....GGG......',
  '.....PPGG.....',
  '...GGGGGGGG...',
  '.GGGGGGGGGGG..',
  'DDGGGGGGGGGGD.',
  '..DDGGGGGGGD..',
  '....DDDDDD....',
  '.....R..R.....',
  '.....RR.RR....',
]
const WING_UP = ['..WW....', '.WWWW...', 'WWWWWW..', '.WWWWWW.']
const WING_DN = ['.WWWWWW.', 'WWWWWW..', '.WWWW...', '..WW....']
export function drawPigeon(ctx, x, y, cell, t, { flap = 1, alpha = 1 } = {}) {
  const c = Math.max(2, Math.round(cell))
  const pal = { G: '#a7a9c4', D: '#6f7194', K: '#1b1236', Y: '#ffb84a', P: '#7fd0b0', R: '#ff8f6a', W: '#c9cbe0' }
  const up = flap > 0 && Math.sin(t * 26) > 0
  drawBitmap(ctx, PIGEON, x, y, c, pal, { alpha })
  drawBitmap(ctx, up ? WING_UP : WING_DN, x - c, y + (up ? -3 * c : 1 * c), c, pal, { alpha })
  // helmet: a glass dome around the head (+ a glint, + a collar ring)
  const hx = Math.round(x + 0.5 * c), hy = Math.round(y - 3.6 * c), r = 3.6 * c
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.fillStyle = 'rgba(160,220,255,0.22)'; ctx.beginPath(); ctx.arc(hx, hy, r, 0, Math.PI * 2); ctx.fill()
  ctx.lineWidth = Math.max(2, c * 0.6); ctx.strokeStyle = 'rgba(220,245,255,0.9)'; ctx.stroke()
  ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(hx - r * 0.55), Math.round(hy - r * 0.6), c, c); ctx.fillRect(Math.round(hx - r * 0.3), Math.round(hy - r * 0.78), c, c)
  ctx.fillStyle = '#d9dde8'; ctx.fillRect(Math.round(hx - r * 0.8), Math.round(hy + r * 0.82), Math.round(r * 1.6), c)
  ctx.restore()
}

// ── party hat: a striped cone, a pom-pom, an elastic (x, y = base centre)
const HAT = ['...YY...', '..YYYY..', '...PP...', '...PB...', '..PBBP..', '..BBPP..', '.PPBBBP.', '.BBPPBB.', 'PPBBBPPP', 'BBPPPBBB']
export function drawPartyHat(ctx, x, y, cell, rot = 0, alpha = 1) {
  drawBitmap(ctx, HAT, x, y, cell, { Y: '#ffd24a', P: '#ff8fb1', B: '#7fe0ff' }, { ax: 0.5, ay: 1, rot, alpha })
}

// ── cobwebs + a dangling spider (bone hairlines)
export function drawCobweb(ctx, cx, cy, r, a0, a1, alpha = 1) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.strokeStyle = 'rgba(239,230,214,0.75)'; ctx.lineWidth = 2
  const n = 5, pts = k => Array.from({ length: n }, (_, i) => { const a = a0 + (a1 - a0) * i / (n - 1); return [cx + Math.cos(a) * r * k, cy + Math.sin(a) * r * k] })
  ctx.beginPath()
  for (const [px, py] of pts(1)) { ctx.moveTo(cx, cy); ctx.lineTo(px, py) }
  for (const k of [0.35, 0.62, 0.9]) {
    const P = pts(k)
    ctx.moveTo(P[0][0], P[0][1])
    for (let i = 1; i < P.length; i++) { const mx = (P[i - 1][0] + P[i][0]) / 2, my = (P[i - 1][1] + P[i][1]) / 2; ctx.quadraticCurveTo(mx + (cx - mx) * 0.18, my + (cy - my) * 0.18, P[i][0], P[i][1]) }
  }
  ctx.stroke(); ctx.restore()
}
const SPIDER = ['K.K.K.K', '.KKKKK.', 'KKWKWKK', '.KKKKK.', 'K.K.K.K']
export function drawSpider(ctx, x, y0, len, cell, t, alpha = 1) {
  if (alpha <= 0) return
  const sway = Math.sin(t * 2.4) * 6, y = y0 + len
  ctx.save(); ctx.globalAlpha *= alpha; ctx.strokeStyle = 'rgba(239,230,214,0.7)'; ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x + sway, y); ctx.stroke(); ctx.restore()
  drawBitmap(ctx, SPIDER, x + sway, y + cell * 2, cell, { K: '#1b1236', W: '#ffffff' }, { alpha })
}

// ── tears: arcs of blue pixel drops spurting sideways from each eye
export function drawTears(ctx, eyes, t, t0, { cell = 6, strength = 1, alpha = 1 } = {}) {
  if (t < t0 || strength <= 0) return
  const c = Math.max(2, Math.round(cell))
  ctx.save(); ctx.globalAlpha *= alpha
  eyes.forEach(([ex, ey], side) => {
    const dir = side === 0 ? -1 : 1
    for (let k = 0; k < 9; k++) {
      const ph = ((t - t0) * 2.1 + k / 9) % 1
      const vx = dir * (60 + 40 * strength) * c / 6, vy = -40 * c / 6
      const px = ex + vx * ph * 1.6, py = ey + vy * ph * 1.6 + 260 * c / 6 * ph * ph
      const a = (1 - ph) * clamp(strength)
      if (a <= 0.03) continue
      ctx.globalAlpha = alpha * a
      const X = Math.round(px), Y = Math.round(py)
      ctx.fillStyle = '#16204a'; ctx.fillRect(X - 1, Y - 1, c + 2, 2 * c + 2)
      ctx.fillStyle = '#5cc6ff'; ctx.fillRect(X, Y, c, 2 * c)
      ctx.fillStyle = '#e6f8ff'; ctx.fillRect(X, Y, Math.ceil(c / 2), Math.ceil(c / 2))
    }
  })
  ctx.restore()
}
