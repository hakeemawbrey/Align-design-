// sr01blind props: small pixel helpers (cells on canvas), all pure f(t).
import { clamp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff'

export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}
export const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
export const QMARK = ['.YYYYY.', 'YYgggYY', 'YY...YY', '.....YY', '...YYY.', '..YY...', '..YY...', '.......', '..YY...', '..YY...']

/** startalk's hop maths, mirrored so props can ride a star's squash */
export function hopState(t, hops) {
  if (!hops || !hops.length) return { lift: 0, sq: 0 }
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt > 0.6) return { lift: 0, sq: 0 }
  const AIR = 0.26
  if (dt < 0.05) return { lift: 0, sq: 0.12 * Math.sin(Math.PI * dt / 0.05) }
  if (dt < 0.05 + AIR) { const p = (dt - 0.05) / AIR; return { lift: Math.sin(Math.PI * p), sq: -0.1 * Math.sin(Math.PI * Math.min(1, p * 1.6)) } }
  const d = dt - 0.05 - AIR
  return { lift: 0, sq: 0.16 * Math.exp(-d * 11) * Math.cos(d * 26) }
}
/** the star's geometry this frame (drawStarChar's 36-cell sprite): eye centre y, tip y, cell, vertical scale */
export function starGeom(t, r, size, { pop = 1, squash = 0, hops, seed = 1 } = {}) {
  const s = size * pop, cell = s >= 100 ? Math.max(1, Math.round(s / 36)) : s / 36
  const sq = squash + hopState(t, hops).sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const sy = 1 - sq * 0.9, sx = 1 + sq, base = 15.84 * cell
  return { cell, sx, sy, eyeY: r.y + base - (base - 1.2 * cell) * sy, eyeDX: 4.6 * cell * sx, tipY: r.y + base - (base + 16 * cell) * sy }
}

/** happy tears streaming from both eyes (Pisces) */
export function tears(x, t, g, cx, t0, { rate = 0.12, col = '#8fd8ff' } = {}) {
  if (t < t0) return
  const c = Math.max(3, Math.round(g.cell * 0.9))
  for (const sd of [-1, 1]) for (let i = 0; i < 6; i++) {
    const born = t0 + i * rate + (sd > 0 ? rate / 2 : 0), life = rate * 6
    let k = (t - born) / life
    if (k < 0) continue
    k = k % 1
    const px = cx + sd * (g.eyeDX + g.cell * 2 + k * g.cell * 5), py = g.eyeY + g.cell * 2 + k * k * g.cell * 16
    x.globalAlpha = 1 - k
    x.fillStyle = col; x.fillRect(Math.round(px), Math.round(py), c, c * 1.4)
    x.globalAlpha = 1
  }
}

export function sparkles(x, t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
  x.restore()
}
export function floatHearts(x, t, cx, cy, t0, t1, seed, cell = 7, spread = 220) {
  for (let i = 0; i < 8; i++) {
    const born = t0 + i * 0.2, p = (t - born) / 1.1
    if (born > t1 || p <= 0 || p >= 1) continue
    const side = ((i * 37 + seed) % 7) / 6 - 0.5
    drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * spread + Math.sin(p * 7 + i) * 16), Math.round(cy - 60 - p * 240), cell, { alpha: Math.sin(Math.PI * p) })
  }
}
/** tiny pixel reading glasses (frames only, so the eyes show through) */
export function glasses(x, cx, g, { col = GOLD } = {}) {
  const c = g.cell, y = g.eyeY
  const frame = (x0, y0, w, h, th, fc) => { x.fillStyle = fc; x.fillRect(x0, y0, w, th); x.fillRect(x0, y0 + h - th, w, th); x.fillRect(x0, y0, th, h); x.fillRect(x0 + w - th, y0, th, h) }
  x.save()
  for (const sd of [-1, 1]) {
    const ex = cx + sd * g.eyeDX
    frame(ex - 4.6 * c, y - 5.1 * c, 9.2 * c, 10.2 * c, 2.4 * c, INK)
    frame(ex - 3.8 * c, y - 4.3 * c, 7.6 * c, 8.6 * c, 0.9 * c, col)
  }
  x.fillStyle = INK; x.fillRect(cx - 1.6 * c, y - 2.6 * c, 3.2 * c, 2.4 * c)
  x.fillStyle = col; x.fillRect(cx - 1.6 * c, y - 2.0 * c, 3.2 * c, 0.9 * c)
  x.restore()
}
export { clamp }
