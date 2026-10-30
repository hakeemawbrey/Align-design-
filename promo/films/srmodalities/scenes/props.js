// srmodalities props — small pixel drawings on canvas (pure f(t), no document access at module top level).
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
export const MONO = "'Space Mono', ui-monospace, monospace"
const G = 36, HALF = 18

/** draw a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, flip = false } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); if (flip) x.scale(-1, 1)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

/** eye geometry of a drawStarChar result */
export function eyesOf(r) { const cell = r.size / G; return { ex: r.x, ey: r.y + (19.2 - HALF) * cell, dx: 4.6 * cell, px: Math.max(4, Math.round(cell)), cell } }

/** tears: pixel drops springing sideways from both eyes (fountain) or dribbling down */
export function drawTears(ctx, t, r, { amount = 1, seed = 1, fountain = true, scale = 1.25 } = {}) {
  if (amount <= 0 || !r) return
  const { ex, ey, dx, cell } = eyesOf(r)
  const px = Math.max(6, Math.round(cell * scale))
  const rr = rng(seed * 991)
  const N = fountain ? 7 : 4
  for (const side of [-1, 1]) {
    for (let k = 0; k < N; k++) {
      const ph = ((t * (fountain ? 1.5 : 0.8)) + k / N + rr() * 0.05) % 1
      const vx = fountain ? (60 + 30 * ((k * 7) % 3)) : 10, vy = fountain ? -120 : 0
      const gx = ex + side * dx + side * vx * ph * px / 8
      const gy = ey + px * 2 + vy * ph * px / 8 + 380 * ph * ph * px / 8
      ctx.save(); ctx.globalAlpha *= amount * (1 - ph * 0.7)
      ctx.fillStyle = '#9fe4ff'; ctx.fillRect(Math.round(gx - px / 2), Math.round(gy - px), px, px * 2)
      ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(gx - px / 2), Math.round(gy - px), Math.ceil(px / 2), Math.ceil(px / 2))
      ctx.restore()
    }
  }
}

/** pixel-star sparkle burst from (cx, cy) starting at t0 */
export function sparkles(x, t, cx, cy, t0, { n = 10, R = 220, seed = 1, cols = [GOLD, BONE, PINK, '#c9a6ff'], size = 26 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha *= 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}

/** a pixel speech bubble (stepped corners, tail toward (tx, ty)), text in Space Mono; k = pop scale 0…1 */
export function bubble(x, cx, cy, text, k, { size = 34, fill = '#f6f1ff', ink = INK, border = INK, tail = -1, alpha = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= alpha
  x.translate(Math.round(cx), Math.round(cy)); x.scale(k, k)
  x.font = `700 ${size}px ${MONO}`
  const tw = x.measureText(text).width
  const P = 6, w = Math.round(tw + 44), h = Math.round(size * 1.7)
  const L = -w / 2, T = -h / 2
  const step = (o, col) => {
    x.fillStyle = col
    x.fillRect(L + o + 2 * P, T + o, w - 2 * o - 4 * P, h - 2 * o)
    x.fillRect(L + o, T + o + 2 * P, w - 2 * o, h - 2 * o - 4 * P)
    x.fillRect(L + o + P, T + o + P, w - 2 * o - 2 * P, h - 2 * o - 2 * P)
  }
  step(0, border); step(P, fill)
  // tail: a little pixel stair down-left (tail = -1) or down-right (1)
  const bx = tail * (w / 2 - 34)
  for (let i = 0; i < 3; i++) {
    x.fillStyle = border; x.fillRect(bx + tail * i * P - P, h / 2 - P + i * P, 3 * P, P + 1)
    x.fillStyle = fill; x.fillRect(bx + tail * i * P, h / 2 - P + i * P - 1, P, P)
  }
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(text, 0, 2)
  x.restore()
}

/** out-bounce 0…1 */
export function bounce(x) { const n = 7.5625, d = 2.75; if (x < 1 / d) return n * x * x; if (x < 2 / d) return n * (x -= 1.5 / d) * x + 0.75; if (x < 2.5 / d) return n * (x -= 2.25 / d) * x + 0.9375; return n * (x -= 2.625 / d) * x + 0.984375 }

export const pop01 = (t, t0, d = 0.32, s = 1.9) => { const p = prog(t, t0, t0 + d); return p <= 0 ? 0 : 1 + (s + 1) * Math.pow(p - 1, 3) + s * Math.pow(p - 1, 2) }
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

// ── modality props (pixel-ish, drawn on the canvas; s = scale, 1 ≈ 200 px wide)
const R8 = v => Math.round(v)
/** a stepped-corner block (2-cell corners) */
function block(x, L, T, w, h, P, col) {
  x.fillStyle = col
  x.fillRect(R8(L + 2 * P), R8(T), R8(w - 4 * P), R8(h))
  x.fillRect(R8(L), R8(T + 2 * P), R8(w), R8(h - 4 * P))
  x.fillRect(R8(L + P), R8(T + P), R8(w - 2 * P), R8(h - 2 * P))
}
/** the big red START button; press 0…1 pushes the dome down */
export function startButton(x, cx, cy, s, press = 0, { alpha = 1, glow = 0 } = {}) {
  if (s <= 0.01 || alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  const P = 6 * s, w = 210 * s, h = 64 * s
  // base
  block(x, cx - w / 2 - P, cy - P, w + 2 * P, h + 2 * P, P, INK)
  block(x, cx - w / 2, cy, w, h, P, '#4a3f6b')
  x.fillStyle = '#6d5f99'; x.fillRect(R8(cx - w / 2 + 2 * P), R8(cy + P), R8(w - 4 * P), R8(P))
  x.font = `700 ${R8(30 * s)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = BONE; x.fillText('START', cx, cy + h * 0.56)
  // dome
  const dw = 150 * s, dh = (52 - 30 * press) * s
  if (glow > 0) { x.save(); x.shadowColor = 'rgba(255,90,70,0.9)'; x.shadowBlur = 50 * s * glow; block(x, cx - dw / 2, cy - dh, dw, dh + P, P, '#ff5a46'); x.restore() }
  block(x, cx - dw / 2 - P, cy - dh - P, dw + 2 * P, dh + 2 * P, P, INK)
  block(x, cx - dw / 2, cy - dh, dw, dh + P, P, '#e8382c')
  x.fillStyle = '#ff8a6a'; x.fillRect(R8(cx - dw / 2 + 3 * P), R8(cy - dh + P), R8(dw * 0.4), R8(P * 1.5))
  x.restore()
}
/** a gold padlock; shut 0 (open, shackle up) … 1 (clicked shut) */
export function padlock(x, cx, cy, s, shut = 1, { alpha = 1 } = {}) {
  if (s <= 0.01 || alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  const P = 6 * s, w = 150 * s, h = 120 * s
  const lift = (1 - shut) * 46 * s
  // shackle (a thick U); when open, the right leg is lifted out
  const sw = 96 * s, th = 20 * s, top = cy - 82 * s - lift
  x.fillStyle = INK
  x.fillRect(R8(cx - sw / 2 - P), R8(top - P), R8(sw + 2 * P), R8(th + 2 * P))
  x.fillRect(R8(cx - sw / 2 - P), R8(top - P), R8(th + 2 * P), R8(90 * s + lift))
  x.fillRect(R8(cx + sw / 2 - th - P), R8(top - P), R8(th + 2 * P), R8(90 * s))
  x.fillStyle = '#cfd3e6'
  x.fillRect(R8(cx - sw / 2), R8(top), R8(sw), R8(th))
  x.fillRect(R8(cx - sw / 2), R8(top), R8(th), R8(88 * s + lift))
  x.fillRect(R8(cx + sw / 2 - th), R8(top), R8(th), R8(88 * s - P))
  x.fillStyle = '#ffffff'; x.fillRect(R8(cx - sw / 2 + P), R8(top + P * 0.5), R8(sw * 0.4), R8(P))
  // body
  block(x, cx - w / 2 - P, cy - P, w + 2 * P, h + 2 * P, P, INK)
  block(x, cx - w / 2, cy, w, h, P, GOLD)
  x.fillStyle = '#ffe08a'; x.fillRect(R8(cx - w / 2 + 2 * P), R8(cy + P), R8(w - 4 * P), R8(P * 1.5))
  x.fillStyle = '#b8862e'; x.fillRect(R8(cx - w / 2 + 2 * P), R8(cy + h - 2.5 * P), R8(w - 4 * P), R8(P * 1.5))
  // keyhole
  x.fillStyle = INK
  x.fillRect(R8(cx - 2 * P), R8(cy + h * 0.32), R8(4 * P), R8(4 * P))
  x.fillRect(R8(cx - P), R8(cy + h * 0.32 + 3 * P), R8(2 * P), R8(5 * P))
  x.restore()
}
/** shuffle arrows (two crossing paths with pixel arrowheads); flip −1…1 mirrors them */
export function shuffle(x, cx, cy, s, flip = 1, { alpha = 1 } = {}) {
  if (s <= 0.01 || alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.scale(flip * s, s)
  const path = (y0, y1, col) => {
    x.lineCap = 'butt'; x.lineJoin = 'miter'
    x.beginPath(); x.moveTo(-110, y0); x.lineTo(-50, y0); x.bezierCurveTo(-5, y0, 5, y1, 50, y1); x.lineTo(78, y1)
    x.strokeStyle = INK; x.lineWidth = 30; x.stroke()
    x.strokeStyle = col; x.lineWidth = 18; x.stroke()
    x.fillStyle = INK; x.beginPath(); x.moveTo(70, y1 - 30); x.lineTo(120, y1); x.lineTo(70, y1 + 30); x.closePath(); x.fill()
    x.fillStyle = col; x.beginPath(); x.moveTo(76, y1 - 20); x.lineTo(108, y1); x.lineTo(76, y1 + 20); x.closePath(); x.fill()
  }
  path(-44, 44, '#c9a6ff')
  path(44, -44, '#7fd0f0')
  x.restore()
}
/** a dotted loop arrow circling (cx, cy) at radius R */
export function loopArrow(x, t, cx, cy, R, k, { col = GOLD } = {}) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= k
  const a0 = t * 2.6, n = 16
  for (let i = 0; i < n; i++) {
    const a = a0 - i * 0.24, sz = R8(14 - i * 0.6)
    x.fillStyle = i ? col : BONE
    x.globalAlpha = k * (1 - i / n)
    x.fillRect(R8(cx + Math.cos(a) * R - sz / 2), R8(cy + Math.sin(a) * R * 0.45 - sz / 2), sz, sz)
  }
  x.restore()
}
/** a ▶ play triangle (pixel stair) */
export function playTri(x, cx, cy, s, { alpha = 1, col = '#ff6b5a' } = {}) {
  if (s <= 0.01 || alpha <= 0) return
  const BM = ['X.....', 'XXX...', 'XXXXX.', 'XXXXXX', 'XXXXX.', 'XXX...', 'X.....']
  drawBits(x, BM, { X: col }, cx, cy, 12 * s, { alpha })
}
/** pixel caption with ink stroke (Space Mono) */
export function label(x, text, cx, cy, size, col, { alpha = 1, rot = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `700 ${R8(size)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.lineWidth = size * 0.24; x.lineJoin = 'round'; x.strokeStyle = 'rgba(8,5,20,0.92)'; x.strokeText(text, 0, 0)
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
