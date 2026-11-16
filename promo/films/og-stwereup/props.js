// stwereup props: small pixel drawings on canvas (Star Talk season 2). Pure functions of their arguments; no `document`
// at module top level. Every prop is a bitmap of cells, drawn with fillRect at a whole-pixel cell size so it stays crisp.
//   drawBitmap(ctx, rows, x, y, cell, pal, { ax, ay, rot, flip, alpha })   rows: strings, '.' = empty, other chars → pal[ch]
//   drawNightcap(ctx, x, y, size, { color, rot, alpha })                 floppy pixel nightcap; (x, y) = the band's centre
//   drawWhistle(ctx, x, y, cell, { blow, t, flip })                       coach's whistle; (x, y) = mouthpiece tip
//   drawTears(ctx, eyes, t, t0, { cell, strength })                        cartoon fountain tears from [[x, y], …] eyes
//   drawSun(ctx, x, y, r, t, { pop })                                      a smug pixel sun in pixel shades
//   drawBandage(ctx, x, y, cell, rot)                                      a little crossed band-aid
//   drawPanelCanvas(cv, w, h, { m, fill, border, glow })                   a stepped-corner pixel panel (for the LESSON banner)
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

// ── nightcap: a floppy cone leaning right, stripes, a white band and a pom-pom
const CAP = [
  '..........WWW.',
  '.........WWWWW',
  '........DWWWW.',
  '.......DDDWW..',
  '......BBBD....',
  '.....BBBBD....',
  '....DDDDDD....',
  '...BBBBBBD....',
  '..BBBBBBBBD...',
  '.DDDDDDDDDDD..',
  'SSSSSSSSSSSSS.',
  'SSSSSSSSSSSSS.',
]
export function drawNightcap(ctx, x, y, size, { color = '#6f7cf2', stripe = '#3f3a9e', rot = -0.18, alpha = 1 } = {}) {
  const cell = Math.max(2, Math.round(size / 13))
  drawBitmap(ctx, CAP, x, y, cell, { B: color, D: stripe, S: '#f4ecdc', W: '#ffffff' }, { ax: 0.45, ay: 0.92, rot, alpha })
}

// ── whistle: chamber + mouthpiece tube (mouthpiece points LEFT, at the origin) + a red lanyard loop
const WHISTLE = [
  'XXXXXXXX......',
  'XLLLLLLLXXXX..',
  'XLHHLLLLLLLLX.',
  'XXXXXXLLLLLLLX',
  '.....XLLHLLLLX',
  '.....XLLLDDLLX',
  '.....XLLDDDLLX',
  '......XLLLLLX.',
  '.......XXXXX..',
]
export function drawWhistle(ctx, x, y, cell, { blow = 0, t = 0, flip = false, alpha = 1 } = {}) {
  const c = Math.max(2, Math.round(cell))
  const jig = blow > 0 ? Math.round(Math.sin(t * 80) * c * 0.5) : 0
  drawBitmap(ctx, WHISTLE, x, y + jig, c, { X: '#2a2440', L: '#d9dde8', H: '#ffffff', D: '#7d8396' }, { ax: 0, ay: 0.25, flip, alpha })
  // lanyard: a red cord dropping from the ring
  ctx.save(); ctx.globalAlpha *= alpha; ctx.fillStyle = '#e8484f'
  const lx = x + (flip ? -1 : 1) * 12 * c
  for (let k = 0; k < 6; k++) ctx.fillRect(Math.round(lx + (flip ? -1 : 1) * k * c * 0.6), Math.round(y + 6 * c + k * c), c, c)
  ctx.restore()
  // air puffs when blowing: little lines out of the far end
  if (blow > 0) {
    ctx.save(); ctx.globalAlpha *= alpha * clamp(blow); ctx.fillStyle = '#ffffff'
    const sx = x + (flip ? -1 : 1) * 15 * c
    for (let k = 0; k < 3; k++) {
      const ph = (t * 6 + k / 3) % 1, len = 3 + Math.round(ph * 3)
      const dy = (k - 1) * 3 * c - (k - 1) * ph * 2 * c
      for (let i = 0; i < len; i++) ctx.fillRect(Math.round(sx + (flip ? -1 : 1) * (ph * 6 + i) * c), Math.round(y + c + dy), c, c)
    }
    ctx.restore()
  }
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

// ── the sun: pixel disc, rotating chunky rays, a pair of pixel shades and a smug glint
export function drawSun(ctx, x, y, r, t, { pop = 1, alpha = 1 } = {}) {
  if (pop <= 0.01 || alpha <= 0) return
  const R = r * pop, c = Math.max(2, Math.round(R / 9))
  ctx.save(); ctx.globalAlpha *= alpha
  // glow
  const g = ctx.createRadialGradient(x, y, R * 0.3, x, y, R * 3.2)
  g.addColorStop(0, 'rgba(255,214,90,0.55)'); g.addColorStop(0.4, 'rgba(255,170,60,0.18)'); g.addColorStop(1, 'rgba(255,170,60,0)')
  ctx.fillStyle = g; ctx.fillRect(x - R * 3.2, y - R * 3.2, R * 6.4, R * 6.4)
  // rays
  const rot = t * 0.6
  for (let k = 0; k < 12; k++) {
    const a = rot + k * Math.PI / 6, long = k % 2 === 0
    for (let s = 0; s < (long ? 4 : 2); s++) {
      const d = R + c * (1.5 + s * 1.1)
      ctx.fillStyle = s === 0 ? '#ffd24a' : '#ffb43a'
      ctx.fillRect(Math.round(x + Math.cos(a) * d - c / 2), Math.round(y + Math.sin(a) * d - c / 2), c, c)
    }
  }
  // disc (cells)
  const n = Math.round(R / c)
  for (let j = -n; j <= n; j++) for (let i = -n; i <= n; i++) {
    const d = Math.hypot(i + 0.5, j + 0.5)
    if (d > n) continue
    ctx.fillStyle = d > n - 1 ? '#f39a2a' : (i + j < -n * 0.6 ? '#fff0a0' : '#ffd24a')
    ctx.fillRect(Math.round(x + i * c), Math.round(y + j * c), c, c)
  }
  // shades
  const sy = Math.round(y - c * 2), lw = Math.round(n * 0.75)
  ctx.fillStyle = '#1b1236'
  ctx.fillRect(Math.round(x - lw * c - c * 0.5), sy, lw * c, c * 3)
  ctx.fillRect(Math.round(x + c * 0.5), sy, lw * c, c * 3)
  ctx.fillRect(Math.round(x - n * c * 0.95), sy, Math.round(n * c * 1.9), c)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(Math.round(x - lw * c + c * 0.5), sy + c, c, c)
  ctx.fillRect(Math.round(x + c * 1.5), sy + c, c, c)
  // smirk
  ctx.fillStyle = '#b8541a'
  for (let i = 0; i < 4; i++) ctx.fillRect(Math.round(x - c + i * c), Math.round(y + c * 3 - (i === 3 ? c : 0)), c, c)
  ctx.restore()
}

// ── band-aid
const BAND = ['.TTTTTTT.', 'TTTPPPTTT', 'TTTPPPTTT', '.TTTTTTT.']
export function drawBandage(ctx, x, y, cell, rot = -0.6) {
  const pal = { T: '#f0c49a', P: '#fbe6d0' }
  drawBitmap(ctx, BAND, x, y, cell, pal, { rot })
  drawBitmap(ctx, BAND, x, y, cell, pal, { rot: rot + Math.PI / 2 })
}

// ── a stepped-corner pixel panel on a canvas sized (w + 2m) × (h + 2m)
export function drawPanelCanvas(cv, w, h, { m = 28, P = 8, fill = 'rgba(16,10,38,0.94)', border = '#f2c75c', hair = 'rgba(255,241,200,0.55)', glow = 'rgba(242,199,92,0.6)' } = {}) {
  cv.width = w + 2 * m; cv.height = h + 2 * m
  const x = cv.getContext('2d')
  x.translate(m, m)
  const stepRect = (o, col) => {
    x.fillStyle = col
    x.fillRect(o + 2 * P, o, w - 2 * o - 4 * P, h - 2 * o)
    x.fillRect(o, o + 2 * P, w - 2 * o, h - 2 * o - 4 * P)
    x.fillRect(o + P, o + P, w - 2 * o - 2 * P, h - 2 * o - 2 * P)
  }
  x.save(); x.shadowColor = glow; x.shadowBlur = 30; stepRect(0, border); x.restore()
  stepRect(0, border)
  x.globalCompositeOperation = 'destination-out'; stepRect(P, '#000'); x.globalCompositeOperation = 'source-over'
  stepRect(P, fill)
  // inner hairline
  x.strokeStyle = hair; x.lineWidth = P / 2
  x.strokeRect(2.5 * P, 2.5 * P, w - 5 * P, h - 5 * P)
  // highlight pixels
  x.fillStyle = '#fff1c8'; x.fillRect(2 * P, 0, P * 4, P / 2); x.fillRect(0, 2 * P, P / 2, P * 3)
  // corner gems
  x.fillStyle = '#fff1c8'
  for (const [cx, cy] of [[P * 1.5, P * 1.5], [w - P * 2.5, P * 1.5], [P * 1.5, h - P * 2.5], [w - P * 2.5, h - P * 2.5]]) x.fillRect(cx, cy, P, P)
}
