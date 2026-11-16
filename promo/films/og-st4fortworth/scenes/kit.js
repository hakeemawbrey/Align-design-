// kit — small pure helpers this film shares with its scene (pixel bitmaps, pop-ins, sparkles, hearts, word-pop sounds).
// A per-folder copy (Star Talk season 4, drop 5). Nothing touches `document` at module top level.
import { clamp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
export const BEAT = n => 0.6 + n * 0.5556            // the 108 bpm grid every style shares
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
export const HEART_C = { H: '#ff4f86', W: '#ffd1de' }

/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, flip = false } = {}) {
  if (alpha <= 0 || cell <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); if (flip) x.scale(-1, 1)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.' || !cols[ch]) continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

/** a ring burst of pixel sparkles over 0.7 s from t0 */
export function sparkles(x, t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}

/** pixel hearts rising from (cx, cy), born from t0 until t1 */
export function floatHearts(x, t, cx, cy, t0, t1, seed, cell = 7, spread = 260) {
  for (let i = 0; i < 9; i++) {
    const born = t0 + i * 0.17, life = 1.1
    if (t < born || born > t1) continue
    const p = (t - born) / life
    if (p >= 1) continue
    const side = ((i * 37 + seed) % 7) / 6 - 0.5
    const hx = cx + side * spread + Math.sin(p * 7 + i) * 18, hy = cy - 60 - p * 260
    drawBits(x, HEART, HEART_C, Math.round(hx), Math.round(hy), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
  }
}

/** a soft additive glow disc */
export function glow(x, cx, cy, r, rgb, a) {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
  g.addColorStop(0, `rgba(${rgb},${0.5 * a})`); g.addColorStop(0.45, `rgba(${rgb},${0.18 * a})`); g.addColorStop(1, `rgba(${rgb},0)`)
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r)
  x.restore()
}

/** a squiggle of "!" / "?" pixel marks over a star (surprise / question) */
const BANG = ['XX', 'XX', 'XX', 'XX', '..', 'XX']
const QMARK = ['.XXX.', 'X...X', '...X.', '..X..', '.....', '..X..']
export function mark(x, t, kind, cx, cy, t0, dur = 0.9, cell = 8, col = '#fff1c8') {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const k = easeOutBack(clamp(tt / 0.2), 2.6) * (1 - ease.inQuad(prog(tt, dur - 0.2, dur)))
  const bm = kind === '?' ? QMARK : BANG
  if (kind === '!!') { drawBits(x, BANG, { X: col }, cx - cell * 2, cy - k * 10, cell * k, { rot: -0.15 }); drawBits(x, BANG, { X: col }, cx + cell * 2, cy - k * 14, cell * k, { rot: 0.15 }); return }
  drawBits(x, bm, { X: col }, cx, cy - k * 12, cell * k, { rot: Math.sin(tt * 9) * 0.08 })
}

// ── sound helpers
export const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
export const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
