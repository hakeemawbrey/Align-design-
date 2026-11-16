// srmoonphases props — small pixel drawings on canvas (pure f(t), no document access at module top level).
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

const R8 = v => Math.round(v)
/** pixel caption with ink stroke (Space Mono) */
export function label(x, text, cx, cy, size, col, { alpha = 1, rot = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `700 ${R8(size)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.lineWidth = size * 0.24; x.lineJoin = 'round'; x.strokeStyle = 'rgba(8,5,20,0.92)'; x.strokeText(text, 0, 0)
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}

// ── moon-phase props
/** a moon face: phase 0 = new (dark disc + rim), 1 = full; eyes 0 = shut (asleep) … 1 = wide; s = radius */
export function moon(x, t, cx, cy, r, phase, { eyes = 0, alpha = 1, glow = 1, look = [0, 0], wink = 0 } = {}) {
  if (r <= 1 || alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  // glow grows with the light
  const g = x.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * 2.2)
  g.addColorStop(0, `rgba(255,240,200,${0.35 * phase * glow})`); g.addColorStop(1, 'rgba(255,240,200,0)')
  x.fillStyle = g; x.fillRect(cx - r * 2.3, cy - r * 2.3, r * 4.6, r * 4.6)
  x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.closePath()
  x.save(); x.clip()
  x.fillStyle = '#1d1840'; x.fillRect(cx - r, cy - r, 2 * r, 2 * r)
  if (phase > 0.01) {
    x.fillStyle = '#f3ead2'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
    // craters
    x.fillStyle = 'rgba(190,170,140,0.55)'
    for (const [u, v, k] of [[-0.35, -0.3, 0.2], [0.3, 0.25, 0.16], [-0.1, 0.45, 0.12], [0.42, -0.35, 0.1]]) { x.beginPath(); x.arc(cx + u * r, cy + v * r, k * r, 0, Math.PI * 2); x.fill() }
    // the shadow slides off to the left as it waxes
    if (phase < 0.999) { x.fillStyle = '#1d1840'; x.beginPath(); x.arc(cx - 2 * r * phase, cy, r * 1.02, 0, Math.PI * 2); x.fill() }
  } else {
    x.fillStyle = 'rgba(120,110,190,0.25)'
    for (const [u, v, k] of [[-0.35, -0.3, 0.2], [0.3, 0.25, 0.16], [-0.1, 0.45, 0.12]]) { x.beginPath(); x.arc(cx + u * r, cy + v * r, k * r, 0, Math.PI * 2); x.fill() }
  }
  x.restore()
  x.lineWidth = Math.max(3, r * 0.035); x.strokeStyle = phase > 0.5 ? 'rgba(255,246,220,0.9)' : 'rgba(201,166,255,0.75)'
  x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke()
  // pixel eyes
  const c = Math.max(4, R8(r * 0.075)), ex = r * 0.3, ey = cy - r * 0.02
  const ink = phase > 0.3 ? '#2a1f45' : '#cfc6ff'
  for (const side of [-1, 1]) {
    const px = R8(cx + side * ex)
    x.fillStyle = ink
    const shut = side === 1 ? Math.max(1 - eyes, wink) : 1 - eyes
    if (shut > 0.6) { x.fillRect(px - c * 1.5, R8(ey), c * 3, c) }    // a sleepy line
    else {
      x.fillRect(px - c, R8(ey - c * 1.5), c * 2, c * 3)
      x.fillStyle = '#ffffff'; x.fillRect(px - c + R8(look[0] * c * 0.5) + c, R8(ey - c * 1.5 + look[1] * c * 0.5), c, c)
    }
  }
  x.restore()
}
/** a dirt mound centred at cx with its base at y */
export function mound(x, cx, y, w, h, { alpha = 1 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  const cell = 10
  for (let px = -w / 2; px < w / 2; px += cell) {
    const k = 1 - (px / (w / 2)) ** 2
    const top = R8((y - h * Math.sqrt(Math.max(0, k))) / cell) * cell
    x.fillStyle = INK; x.fillRect(R8(cx + px), top - 6, cell, y - top + 6)
    x.fillStyle = '#7a4a2a'; x.fillRect(R8(cx + px), top, cell, y - top)
    x.fillStyle = '#a8693a'; x.fillRect(R8(cx + px), top, cell, cell)
    if (((px / cell) | 0) % 5 === 0) { x.fillStyle = '#5b351d'; x.fillRect(R8(cx + px), top + 30, cell, cell) }
  }
  x.fillStyle = '#f2c75c'; x.fillRect(R8(cx - w / 2 - 20), y, w + 40, 6)
  x.restore()
}
const SEED = ['.SS.', 'SHSS', 'SSSS', '.SS.']
const LEAF = ['LL..', 'LLLL', '.LLL']
const BLOOM = ['..P.P..', '.PPPPP.', 'PPPYPPP', 'PPYYYPP', 'PPPYPPP', '.PPPPP.', '..P.P..']
/** the plant: g 0 = a seed, 0…0.6 = sprouting stem, 0.6…1 = leaves + the flower opens; base at (cx, y) */
export function plant(x, t, cx, y, g, { alpha = 1, cell = 10, glow = 0 } = {}) {
  if (alpha <= 0) return
  if (glow > 0) { x.save(); x.globalAlpha *= alpha * glow; const gr = x.createRadialGradient(cx, y - 20, 4, cx, y - 20, 90); gr.addColorStop(0, 'rgba(160,255,170,0.7)'); gr.addColorStop(1, 'rgba(160,255,170,0)'); x.fillStyle = gr; x.fillRect(cx - 90, y - 110, 180, 180); x.restore() }
  if (g <= 0.02) { drawBits(x, SEED, { S: '#c98a4a', H: '#ffd98a' }, R8(cx), R8(y - cell * 1.5), cell, { alpha }); return }
  const H = 260 * Math.min(1, g / 0.75)
  const sway = Math.sin(t * 2) * 4 * Math.min(1, g)
  x.save(); x.globalAlpha *= alpha
  for (let k = 0; k < H; k += cell) {
    const sx = R8(cx + sway * (k / 260))
    x.fillStyle = INK; x.fillRect(sx - cell, R8(y - k - cell), cell * 2 + 4, cell)
    x.fillStyle = '#5bcf72'; x.fillRect(sx - cell / 2, R8(y - k - cell), cell, cell)
  }
  x.restore()
  const lk = prog(g, 0.3, 0.6)
  if (lk > 0) {
    drawBits(x, LEAF, { L: '#8fe39a' }, R8(cx - cell * 3), R8(y - H * 0.45), cell * lk, { alpha })
    drawBits(x, LEAF, { L: '#8fe39a' }, R8(cx + cell * 3), R8(y - H * 0.65), cell * lk, { alpha, flip: true })
  }
  const bk = prog(g, 0.7, 1)
  if (bk > 0) drawBits(x, BLOOM, { P: '#ff8fb1', Y: '#ffe58a' }, R8(cx + sway), R8(y - H - cell * 2), cell * (0.4 + 1.2 * bk), { alpha })
  else if (g > 0.5) drawBits(x, ['.G.', 'GPG', 'GPG'], { G: '#5bcf72', P: '#ff8fb1' }, R8(cx + sway), R8(y - H - cell), cell * 1.2, { alpha })
}
const CAN = ['......WW.', '.SSSSS.W.', 'HSSSSSSW.', 'H.SSSSSSS', 'H.SSSSS..', 'HSSSSSS..', '.SSSSS...']
export function wateringCan(x, cx, cy, cell, tilt, { alpha = 1 } = {}) { drawBits(x, CAN, { S: '#7fd0f0', W: '#cfefff', H: '#4a9cc4' }, R8(cx), R8(cy), cell, { rot: tilt, alpha }) }
