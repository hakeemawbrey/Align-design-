// srelements props — small pixel drawings on canvas (pure f(t), no document access at module top level).
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

/** a gold stopwatch: r = face radius; n = number shown; ring = 0…1 alarm shake */
export function stopwatch(x, cx, cy, r, n, sweep, { ring = 0, t = 0, alpha = 1 } = {}) {
  if (r <= 1 || alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  const sh = ring > 0 ? Math.sin(t * 70) * 0.12 * ring : 0
  x.translate(cx, cy); x.rotate(sh)
  const lw = Math.max(3, r * 0.14)
  // crown + side button
  x.fillStyle = GOLD
  x.fillRect(-r * 0.16, -r * 1.36, r * 0.32, r * 0.22)
  x.fillRect(-r * 0.07, -r * 1.18, r * 0.14, r * 0.2)
  x.save(); x.rotate(0.75); x.fillRect(-r * 0.08, -r * 1.24, r * 0.16, r * 0.22); x.restore()
  // face
  x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fillStyle = 'rgba(16,9,38,0.92)'; x.fill()
  x.shadowColor = 'rgba(242,199,92,0.7)'; x.shadowBlur = r * 0.3
  x.lineWidth = lw; x.strokeStyle = GOLD; x.stroke(); x.shadowBlur = 0
  // remaining-time wedge
  x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r * 0.82, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * clamp(sweep), false); x.closePath()
  x.fillStyle = 'rgba(242,199,92,0.16)'; x.fill()
  // ticks
  x.fillStyle = 'rgba(239,230,214,0.7)'
  for (let i = 0; i < 12; i++) { x.save(); x.rotate(i * Math.PI / 6); x.fillRect(-lw * 0.2, -r * 0.86, lw * 0.4, r * 0.12); x.restore() }
  // hand
  x.save(); x.rotate(Math.PI * 2 * clamp(sweep)); x.fillStyle = '#ff6a4a'; x.fillRect(-lw * 0.22, -r * 0.74, lw * 0.44, r * 0.74); x.restore()
  // number
  x.font = `700 ${Math.round(r * 0.78)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.lineWidth = r * 0.12; x.strokeStyle = 'rgba(16,9,38,0.95)'; x.strokeText(String(n), 0, r * 0.06)
  x.fillStyle = n <= 3 ? '#ff8a6a' : BONE; x.fillText(String(n), 0, r * 0.06)
  x.restore()
  // alarm lines
  if (ring > 0) {
    x.save(); x.globalAlpha *= alpha * ring; x.fillStyle = GOLD
    for (let i = 0; i < 6; i++) {
      const a = -Math.PI / 2 + (i - 2.5) * 0.42, ph = (t * 3 + i * 0.17) % 1
      const d0 = r * (1.35 + ph * 0.5)
      for (let k = 0; k < 3; k++) x.fillRect(Math.round(cx + Math.cos(a) * (d0 + k * 7) - 3), Math.round(cy + Math.sin(a) * (d0 + k * 7) - 3), 7, 7)
    }
    x.restore()
  }
}

// ── element props
export const FLAME = [
  '...F....',
  '...FF...',
  '..FFF.F.',
  '.FFOFFF.',
  '.FOOOFF.',
  'FFOYYOFF',
  'FOYYYYOF',
  'FOYWWYOF',
  '.FOYYOF.',
  '..FFFF..',
]
export const FLAME_C = { F: '#f0603a', O: '#ffa23a', Y: '#ffe58a', W: '#fff7dc' }
export const SPROUT = ['L...L', 'LL.LL', '.LGL.', '..G..', '..G..']
export const FLOWER = ['.P.P.', 'PPYPP', '.PPP.', 'L.G.L', 'LLGLL', '..G..', '..G..']
export const FLOWER_C = { P: '#ff8fb1', Y: '#ffe58a', G: '#5bcf72', L: '#8fe39a' }
export const SMOKE_C = ['rgba(239,230,214,0.55)', 'rgba(180,170,190,0.5)']

/** a brick wall (cols × rows) centred at cx with its base at y; rowsK[r] 0…1 = each row's drop-in progress */
export function bricks(x, cx, y, cols, rowsK, { bw = 64, bh = 30, col = '#e9b24a', dark = '#a8742a', light = '#ffd98a' } = {}) {
  const W = cols * bw
  rowsK.forEach((k, r) => {
    if (k <= 0) return
    const off = r % 2 ? bw / 2 : 0
    const dy = (1 - bounce(clamp(k))) * -160
    x.save(); x.globalAlpha *= clamp(k * 4)
    for (let c = 0; c < cols + (r % 2 ? 0 : 0); c++) {
      let bx = cx - W / 2 + c * bw + off
      let w = bw
      if (r % 2 && c === cols - 1) w = bw / 2
      const by = Math.round(y - (r + 1) * bh + dy)
      x.fillStyle = INK; x.fillRect(Math.round(bx), by, Math.round(w), bh)
      x.fillStyle = col; x.fillRect(Math.round(bx) + 4, by + 4, Math.round(w) - 8, bh - 8)
      x.fillStyle = light; x.fillRect(Math.round(bx) + 4, by + 4, Math.round(w) - 8, 4)
      x.fillStyle = dark; x.fillRect(Math.round(bx) + 4, by + bh - 8, Math.round(w) - 8, 4)
    }
    if (r % 2) { // the half brick on the left
      const by = Math.round(y - (r + 1) * bh + dy), bx = cx - W / 2
      x.fillStyle = INK; x.fillRect(Math.round(bx), by, bw / 2, bh)
      x.fillStyle = col; x.fillRect(Math.round(bx) + 4, by + 4, bw / 2 - 8, bh - 8)
    }
    x.restore()
  })
}

/** a pixel sea: columns of cells from x0 to x1, surface at y (plus a moving swell), down to the bottom yb */
export function sea(x, t, x0, x1, y, yb, { amp = 18, cell = 12, alpha = 1, surge = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  for (let px = x0; px < x1; px += cell) {
    const h = y - amp * Math.sin(px * 0.014 + t * 3.2) - amp * 0.5 * Math.sin(px * 0.031 - t * 2.1) - surge * Math.exp(-((px - 540) ** 2) / 90000)
    const top = Math.round(h / cell) * cell
    x.fillStyle = 'rgba(30,58,160,0.9)'; x.fillRect(px, top, cell, yb - top)
    x.fillStyle = 'rgba(63,124,240,0.92)'; x.fillRect(px, top, cell, Math.min(yb - top, cell * 7))
    x.fillStyle = '#6f9dff'; x.fillRect(px, top, cell, cell * 2)
    x.fillStyle = '#d8ecff'; x.fillRect(px, top, cell, cell * 0.5 + 1)
    // drifting glints
    const g = Math.floor(px / cell)
    if ((g * 7 + Math.floor(t * 4)) % 11 === 0) { x.fillStyle = 'rgba(216,236,255,0.7)'; x.fillRect(px, top + cell * (3 + g % 4), cell * 2, cell / 2) }
  }
  x.restore()
}

/** wind gust dashes drifting right across a band */
export function gusts(x, t, y0, y1, k, { col = '#7fd0f0' } = {}) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= k * 0.85
  for (let i = 0; i < 9; i++) {
    const yy = lerp(y0, y1, i / 8) + Math.sin(i * 2.3) * 14
    const len = 90 + (i * 47) % 120
    const xx = ((t * 620 + i * 173) % 1400) - 200
    x.fillStyle = i % 3 ? col : BONE
    x.fillRect(Math.round(xx), Math.round(yy), len, 8)
    x.fillRect(Math.round(xx + len), Math.round(yy - 8), 8, 8)
  }
  x.restore()
}

/** out-bounce 0…1 */
export function bounce(x) { const n = 7.5625, d = 2.75; if (x < 1 / d) return n * x * x; if (x < 2 / d) return n * (x -= 1.5 / d) * x + 0.75; if (x < 2.5 / d) return n * (x -= 2.25 / d) * x + 0.9375; return n * (x -= 2.625 / d) * x + 0.984375 }

export const pop01 = (t, t0, d = 0.32, s = 1.9) => { const p = prog(t, t0, t0 + d); return p <= 0 ? 0 : 1 + (s + 1) * Math.pow(p - 1, 3) + s * Math.pow(p - 1, 2) }
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
