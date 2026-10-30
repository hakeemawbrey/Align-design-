// srhtxhumidity props — pixel drawings for this film only. Pure f(args); nothing touches `document` at load.
//   starFrame / inSprite / tearsCells / sweatCells / drawBits   (the stlive5th helpers, same maths as startalk.js)
//   drawMane(x, F, f, t)        Leo's hair, drawn BEHIND the star: f 0 = a sleek quiff on the top tip → 1 = a full frizz cloud
//   bagCells(x, t)              a paper bag over the star (sprite cells) with eye holes the star's own eyes look through
//   drawThermo(x, cx, top, bot, level, t)   a pixel thermometer · drawSteam(x, t, a) · drawSkyline(x, t)
//   drawComb(x, cx, cy, cell, rot)
import { clamp, lerp } from '../../../src/lib.js'

const INK = '#1b1236'
export const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', HAIR = '#f39a3a', FIRE = '#f0603a', WATER = '#7fd0f0'
export const MONO = "'Space Mono', ui-monospace, monospace"
const G = 36, HALF = 18
const SC_Y = 19.6, SC_R = 17.6
const FOOT_ROW = SC_Y + SC_R * Math.cos(Math.PI / 5)

// ── star transform (mirrors startalk.js drawStarChar)
function hopState(t, hops) {
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
export function starFrame(x, y, size, t, { pop = 1, bob, squash = 0, hops = null, seed = 1 } = {}) {
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const S = cell * G
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  return { cell, S, cy, base, ox: Math.round(x), oy: Math.round(cy + base), sx: 1 + sq, sy: 1 - sq * 0.9 }
}
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
export const cellToWorld = (F, i, j) => [F.ox - F.S / 2 + i * F.cell, F.oy - F.S / 2 - F.base + j * F.cell]

function paintCells(ctx, cells, outline = INK) {
  const key = new Set(cells.map(([i, j]) => i + ',' + j))
  if (outline) {
    ctx.fillStyle = outline
    for (const [i, j] of cells) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!key.has((i + a) + ',' + (j + b))) ctx.fillRect(i + a, j + b, 1.02, 1.02)
  }
  for (const [i, j, c] of cells) { ctx.fillStyle = c; ctx.fillRect(i, j, 1.02, 1.02) }
}

// ── tears (cells): k 1 sniffle · 2 streams · 3 fountains
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      if (k === 1 && ph > 0.75) continue
      let x, y
      if (k >= 3) { x = ex + d * 15 * ph; y = 20 - 9 * ph + 24 * ph * ph }
      else if (k === 2) { x = ex + d * 3.5 * ph; y = 20.5 + 15 * ph * ph }
      else { x = ex + d * 0.6 * ph; y = 21 + 8 * ph * ph }
      drop(Math.round(x * 2) / 2, Math.round(y * 2) / 2)
    }
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
// sweat drop on the right temple (cells)
export function sweatCells(ctx, t) {
  const ph = (t * 1.3) % 1
  const j = 12 + ph * 6
  ctx.fillStyle = INK; ctx.fillRect(28.6, j - 1.2, 1.8, 2.6)
  ctx.fillStyle = '#8fe3ff'; ctx.fillRect(28.9, j - 0.9, 1.2, 2); ctx.fillStyle = '#fff'; ctx.fillRect(28.9, j - 0.9, 0.5, 0.5)
}

/** bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
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


// ── Leo's hair (behind the star). Blobs of pixel curls around the centre, snapped to the star's cell grid.
const HC = { ink: INK, dark: '#6e3416', mid: '#a9581f', hi: '#e08a3c' }
const hash = i => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }
export function drawMane(x, F, f, t, { alpha = 1, quiver = 0 } = {}) {
  if (alpha <= 0) return
  const c = F.cell, S = F.S
  const cx = F.ox, cy = F.oy - F.base + (SC_Y - HALF) * c
  const span = lerp(0.42, Math.PI, clamp(f)), N = 30
  const blobs = []
  for (let i = 0; i < N; i++) {
    const u = N === 1 ? 0.5 : i / (N - 1)
    const a = -Math.PI / 2 + (u - 0.5) * 2 * span + (hash(i) - 0.5) * 0.12 * f
    const rr = S * (lerp(0.47, 0.6, f) + 0.06 * f * (hash(i + 9) - 0.5)) + quiver * c * Math.sin(t * 40 + i)
    const br = S * lerp(0.05, 0.135, f) * (0.8 + 0.4 * hash(i + 3))
    blobs.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * lerp(1, 0.92, f), br, a])
  }
  const disc = (X, Y, r, col) => {
    x.fillStyle = col
    const n = Math.ceil(r / c)
    const gx0 = Math.round(X / c), gy0 = Math.round(Y / c)
    for (let j = -n; j <= n; j++) for (let i = -n; i <= n; i++) if (i * i + j * j <= (r / c) * (r / c)) x.fillRect((gx0 + i) * c, (gy0 + j) * c, c + 0.5, c + 0.5)
  }
  x.save(); x.globalAlpha *= alpha
  for (const [X, Y, r] of blobs) disc(X, Y, r + c, HC.ink)
  // frizz strands: zigzags sticking out (from f > 0.35)
  const zf = clamp((f - 0.35) / 0.65)
  if (zf > 0) {
    for (let i = 0; i < 22; i++) {
      const a = -Math.PI / 2 + ((i + 0.5) / 22 - 0.5) * 2 * span
      const r0 = S * lerp(0.47, 0.6, f) + S * 0.1
      let px = cx + Math.cos(a) * r0, py = cy + Math.sin(a) * r0
      const len = S * 0.07 * zf * (0.7 + 0.6 * hash(i + 40))
      for (let k = 0; k < 4; k++) {
        const side = (k % 2 ? 1 : -1) * 0.7
        const nx = px + Math.cos(a + side) * len, ny = py + Math.sin(a + side) * len
        for (let q = 0; q <= 4; q++) { const qx = lerp(px, nx, q / 4), qy = lerp(py, ny, q / 4); x.fillStyle = HC.ink; x.fillRect(Math.round(qx / c) * c - c / 2, Math.round(qy / c) * c - c / 2, c * 2, c * 2) }
        for (let q = 0; q <= 4; q++) { const qx = lerp(px, nx, q / 4), qy = lerp(py, ny, q / 4); x.fillStyle = k % 2 ? HC.dark : HC.mid; x.fillRect(Math.round(qx / c) * c, Math.round(qy / c) * c, c, c) }
        px = nx; py = ny
      }
    }
  }
  for (const [X, Y, r] of blobs) disc(X, Y, r, HC.dark)
  for (const [X, Y, r, a] of blobs) disc(X - Math.cos(a) * r * 0.15, Y - r * 0.18, r * 0.78, HC.mid)
  for (const [X, Y, r] of blobs) disc(X - r * 0.3, Y - r * 0.38, r * 0.3, HC.hi)
  x.restore()
}

// ── paper bag over the star (sprite cells). Eye holes are left open so the star's own eyes show through.
export function bagCells(x, { holes = true } = {}) {
  const EYES = [[13.4, 19.2], [22.6, 19.2]]
  const inHole = (i, j) => holes && EYES.some(([ex, ey]) => ((i + 0.5 - ex) / 3.6) ** 2 + ((j + 0.5 - ey) / 4.2) ** 2 <= 1)
  const x0 = 4, x1 = 32, y0 = 3, y1 = 35
  // outline
  x.fillStyle = INK
  for (let j = y0 - 1; j <= y1; j++) for (let i = x0 - 1; i <= x1; i++) {
    const zig = j === y0 - 1 && (i % 2 === 0)
    if (inHole(i, j)) continue
    const edge = i === x0 - 1 || i === x1 || j === y1 || (j === y0 - 1 && !zig)
    if (edge) x.fillRect(i, j, 1.02, 1.02)
  }
  for (let j = y0; j < y1; j++) for (let i = x0; i < x1; i++) {
    if (j === y0 && i % 2) continue                           // the torn top edge
    if (inHole(i, j)) continue
    const fold = i === 9 || i === 27
    x.fillStyle = j >= y1 - 3 ? '#a8794a' : fold ? '#b88a58' : (i < 9 ? '#d6ac78' : '#c99a64')
    x.fillRect(i, j, 1.02, 1.02)
  }
  // hole rims
  x.fillStyle = INK
  for (let j = y0; j < y1; j++) for (let i = x0; i < x1; i++) if (!inHole(i, j) && [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([a, b]) => inHole(i + a, j + b))) x.fillRect(i, j, 1.02, 1.02)
  // a little doodled heart on the bag
  x.fillStyle = '#e8628a'; for (const [i, j] of [[16, 27], [18, 27], [15, 28], [16, 28], [17, 28], [18, 28], [19, 28], [16, 29], [17, 29], [18, 29], [17, 30]]) x.fillRect(i, j, 1.02, 1.02)
}

// ── thermometer (pixel), level 0…1
export function drawThermo(x, cx, top, bot, level, t, P = 8) {
  const w = 5 * P
  x.fillStyle = INK; x.fillRect(cx - w / 2 - P, top - P, w + 2 * P, bot - top + 2 * P)
  x.fillStyle = '#efe6d6'; x.fillRect(cx - w / 2, top, w, bot - top)
  x.fillStyle = '#2a2140'; x.fillRect(cx - P, top + P, 2 * P, bot - top - P)
  const ly = lerp(bot, top + 2 * P, clamp(level))
  x.fillStyle = FIRE; x.fillRect(cx - P, ly, 2 * P, bot - ly)
  for (let k = 1; k < 8; k++) { x.fillStyle = '#8c826f'; x.fillRect(cx + w / 2 - 2 * P, top + k * (bot - top) / 8, P, P / 2) }
  // bulb
  const BULB = ['..ffff..', '.ffwfff.', 'ffwfffff', 'ffffffff', 'ffffffff', '.ffffff.', '..ffff..']
  drawBits(x, BULB, { f: FIRE, w: '#ffc8a0' }, cx, bot + 3 * P, P)
  // sweat drop sliding down when maxed
  if (level > 0.95) {
    const ph = (t * 0.8) % 1, dy = top + ph * (bot - top)
    x.fillStyle = INK; x.fillRect(cx + w / 2 + P, dy - P, 2 * P + 4, 3 * P)
    x.fillStyle = WATER; x.fillRect(cx + w / 2 + P + 2, dy - P + 2, 2 * P, 3 * P - 4)
  }
}
// ── steam wisps rising from the bottom (pixel squiggles)
export function drawSteam(x, t, a) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  for (let i = 0; i < 9; i++) {
    const bx = 70 + i * 118 + (i % 2) * 30, ph = (t * 0.25 + i * 0.37) % 1
    const y0 = 1700 - ph * 520
    x.globalAlpha = a * Math.sin(Math.PI * ph) * 0.5
    x.fillStyle = '#d8cfe8'
    for (let k = 0; k < 18; k++) { const yy = y0 - k * 8, xx = bx + Math.sin(k * 0.55 + t * 2 + i) * 16; x.fillRect(Math.round(xx / 6) * 6, Math.round(yy / 6) * 6, 6, 6) }
  }
  x.restore()
}
// ── a generic pixel skyline along the bottom (lit windows twinkle)
export function drawSkyline(x, t, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  const B = [[0, 120], [90, 190], [170, 150], [250, 260], [340, 210], [430, 300], [520, 180], [600, 330], [700, 230], [790, 280], [880, 170], [960, 240], [1040, 140]]
  B.forEach(([bx, h], i) => {
    const w = (B[i + 1] ? B[i + 1][0] : 1080) - bx + 8, top = 1920 - h
    x.fillStyle = INK; x.fillRect(bx, top, w, h)
    x.fillStyle = '#241a48'; x.fillRect(bx + 6, top + 6, w - 12, h)
    for (let wy = top + 24; wy < 1910; wy += 30) for (let wx = bx + 18; wx < bx + w - 22; wx += 26) {
      const on = hash(wx * 3 + wy) > 0.72 + 0.08 * Math.sin(t * 0.7 + wx)
      if (on) { x.fillStyle = hash(wx + wy) > 0.5 ? '#f2c75c' : '#ffd99a'; x.fillRect(wx, wy, 10, 12) }
    }
  })
  x.restore()
}
// ── a pixel comb
export function drawComb(x, cx, cy, cell, rot = 0) {
  const COMB = ['pppppppppppppp', 'pPPPPPPPPPPPPp', 't.t.t.t.t.t.t.', 't.t.t.t.t.t.t.', 't.t.t.t.t.t.t.']
  drawBits(x, COMB, { p: '#ff8fb1', P: '#ffc6d6', t: '#ff8fb1' }, cx, cy, cell, { rot })
}
