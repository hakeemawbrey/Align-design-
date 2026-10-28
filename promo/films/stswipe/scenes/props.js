// stswipe props: small pixel drawings on canvas, shared inside this film only (Star Talk season 3 #3, "Swipe Fatigue.").
// Every helper is a pure function of its arguments (and t). Nothing touches `document` at module top level (the sound
// build imports scenes/index.js in node); faceSprite() bakes a canvas and is only called from build().
//
//   bmp(ctx, rows, x, y, px, pal, { alpha, ax, ay, rot })   a character bitmap ('.' = clear, other chars → pal[ch])
//   starFrame(x, y, size, t, opts) → F · inSprite(ctx, F, fn) · cellToWorld(F, i, j)
//        the 36-cell grid of a drawStarChar sprite drawn with the same args, so props squash, bob and hop with it
//   drawGlasses(ctx, F, opts) · drawGlassesAt(ctx, x, y, cell, rot, alpha)   tiny pixel reading glasses
//   drawVeil(ctx, F, alpha)                                  a little black mourning hat with a net veil
//   drawIcePack(ctx, x, y, px, rot, alpha)                   a gel ice pack with a snowflake (centre at x, y)
//   drawSmoke(ctx, t, x, y, t0, t1, opts)                    pixel puffs rising from (x, y), born in [t0, t1)
//   drawTears(ctx, eyes, t, t0, opts)                         cartoon fountain tears from [[x, y], …]
//   drawSpider(ctx, x, top, y, px, t, wave)                  a pixel spider on a thread from (x, top) down to y
//   drawCobweb(ctx, x, y, r, opts)                            a corner cobweb (corner at x, y; sx/sy pick the quadrant)
//   drawFlower(ctx, x, y, px, rot, alpha)                     a little pixel rose
//   drawHearts(ctx, t, t0, x, y, opts)                        pixel hearts floating up
//   pixelBox(ctx, x, y, w, h, opts)                           a stepped-corner pixel panel
//   drawGauge(ctx, cx, cy, k, t, opts)                        the SWIPES / MIN speedometer
//   sparkBurst(ctx, t, cx, cy, t0, opts)                      a ring of pixel stars bursting out
//   FACES, faceSprite(doc, i)                                 the profile portraits (20 × 22 cells, baked in build)
import { clamp, lerp, ease, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

export const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const BM = s => s.trim().split(/\s+/)
const INK = '#1b1236', MONO = "'Space Mono', ui-monospace, monospace"

/** char bitmap anchored at (ax, ay) of its box (0..1), optionally rotated about (x, y) */
export function bmp(ctx, rows, x, y, px, pal, { alpha = 1, ax = 0, ay = 0, rot = 0 } = {}) {
  if (alpha <= 0) return
  const w = rows[0].length, h = rows.length
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.translate(x, y); if (rot) ctx.rotate(rot)
  const ox = -w * px * ax, oy = -h * px * ay
  rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) { const c = pal[r[i]]; if (!c) continue; ctx.fillStyle = c; ctx.fillRect(Math.round(ox + i * px), Math.round(oy + j * px), Math.ceil(px), Math.ceil(px)) } })
  ctx.restore()
}

// ─────────────────────────────────────────────── the sprite grid (mirrors startalk.js drawStarChar)
const G = 36, HALF = 18
const FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
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
/** run fn with the context mapped to sprite cells (0…36) of the star drawn with the same args */
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
/** sprite cell → world point (with the squash) */
export const cellToWorld = (F, i, j) => [F.ox + F.sx * (-F.S / 2 + i * F.cell), F.oy + F.sy * (-F.S / 2 - F.base + j * F.cell)]

// ─────────────────────────────────────────────── reading glasses (cell space; lenses ring the eyes)
const LENS = [[8, 14], [19, 14]]
const RING = (() => {
  const out = []
  for (let j = 0; j < 9; j++) for (let i = 0; i < 9; i++) {
    const edge = i === 0 || j === 0 || i === 8 || j === 8, corner = (i === 0 || i === 8) && (j === 0 || j === 8)
    if (edge && !corner) out.push([i, j])
  }
  for (const c of [[1, 1], [7, 1], [1, 7], [7, 7]]) out.push(c)
  return out
})()
function paintGlasses(ctx, frame, hi) {
  for (const [lx, ly] of LENS) {
    ctx.fillStyle = 'rgba(191,239,255,0.2)'; ctx.fillRect(lx + 1, ly + 1, 7, 7)
    ctx.fillStyle = frame; for (const [i, j] of RING) ctx.fillRect(lx + i, ly + j, 1.03, 1.03)
    ctx.fillStyle = hi; ctx.fillRect(lx + 2, ly + 1, 1, 1); ctx.fillRect(lx + 1, ly + 2, 1, 1)
    ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.fillRect(lx + 6, ly + 6, 1, 1)
  }
  ctx.fillStyle = frame; ctx.fillRect(17, 16, 2, 1); ctx.fillRect(6, 16, 2, 1); ctx.fillRect(28, 16, 2, 1)
}
export function drawGlasses(ctx, F, { frame = '#8a2a4a', hi = '#ffd98a', alpha = 1 } = {}) {
  if (alpha <= 0) return
  inSprite(ctx, F, () => { ctx.globalAlpha *= alpha; paintGlasses(ctx, frame, hi) })
}
/** the same glasses floating free: (x, y) = the bridge, cell = sprite-cell size in px */
export function drawGlassesAt(ctx, x, y, cell, rot = 0, alpha = 1, { frame = '#8a2a4a', hi = '#ffd98a' } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(cell, cell); ctx.translate(-18, -16.5)
  paintGlasses(ctx, frame, hi); ctx.restore()
}

// ─────────────────────────────────────────────── a mourning hat + net veil (cell space)
export function drawVeil(ctx, F, alpha = 1) {
  if (alpha <= 0) return
  inSprite(ctx, F, () => {
    ctx.globalAlpha *= alpha
    // the net: a widening fan of checker dots from the hat brim to just under the eye-line
    for (let j = 8; j <= 19; j++) {
      const half = 2.2 + (j - 8) * 0.9
      for (let i = Math.ceil(18 - half); i <= Math.floor(18 + half); i++) {
        if ((i + j) % 2) continue
        ctx.fillStyle = j === 19 ? 'rgba(20,12,36,0.85)' : 'rgba(20,12,36,0.5)'
        ctx.fillRect(i, j, 1, 1)
      }
    }
    // a scalloped lace hem
    for (let i = 8; i <= 28; i += 2) { ctx.fillStyle = 'rgba(20,12,36,0.8)'; ctx.fillRect(i, 20, 1, 1) }
    // the pillbox hat on the top point
    ctx.fillStyle = '#120c22'; ctx.fillRect(13, 4, 10, 4); ctx.fillRect(12, 7, 12, 2)
    ctx.fillStyle = '#3a2f55'; ctx.fillRect(14, 4, 8, 1)
    // a little violet bow
    ctx.fillStyle = '#9a7be0'; ctx.fillRect(21, 5, 2, 2); ctx.fillRect(23, 4, 2, 1); ctx.fillRect(23, 7, 2, 1)
  })
}

// ─────────────────────────────────────────────── ice pack
const ICE = BM(`
.kkkkkkkkkk.
kLLLLLLLLLLk
kLWWLLLLLLLk
kLWLwLLwLLLk
kLLLLwwwLLLk
kLLwwwwwwwLk
kLLLLwwwLLLk
kLLLwLLwLLLk
kLLLLLLLLLLk
.kkkkkkkkkk.`)
export function drawIcePack(ctx, x, y, px, rot = 0, alpha = 1) {
  bmp(ctx, ICE, x, y, px, { k: '#1e3566', L: '#8fdcff', W: '#ffffff', w: '#f4fcff' }, { alpha, ax: 0.5, ay: 0.5, rot })
}

// ─────────────────────────────────────────────── smoke / steam
function pixelDisc(ctx, cx, cy, R, px, light, dark, a) {
  if (a <= 0.01 || R < px) return
  const n = Math.max(1, Math.round(R / px))
  ctx.globalAlpha = a
  for (let j = -n; j < n; j++) for (let i = -n; i < n; i++) {
    const d = Math.hypot(i + 0.5, j + 0.5)
    if (d > n) continue
    ctx.fillStyle = (i + j > n * 0.5 || d > n - 1) ? dark : light
    ctx.fillRect(Math.round(cx + i * px), Math.round(cy + j * px), px, px)
  }
}
export function drawSmoke(ctx, t, x, y, t0, t1, { rate = 7, px = 7, life = 1.15, steam = false, alpha = 1, seed = 3, rise = 190, grow = 1 } = {}) {
  if (t < t0) return
  ctx.save()
  const n0 = Math.max(0, Math.ceil((t - life - t0) * rate)), n1 = Math.floor((Math.min(t, t1) - t0) * rate)
  for (let n = n0; n <= n1; n++) {
    const tb = t0 + n / rate, age = (t - tb) / life
    if (age < 0 || age > 1 || tb >= t1) continue
    const r = rng(seed * 97 + n * 13); r()
    const dx = (r() - 0.5) * 46 + Math.sin(age * 5 + n) * 14 * age + 40 * age * (r() - 0.25)
    const R = (12 + 34 * age) * (0.75 + r() * 0.5) * grow
    pixelDisc(ctx, x + dx, y - rise * ease.outQuad(age), R, px, steam ? '#ffffff' : '#d6d0e2', steam ? '#cfeeff' : '#8f88a3', alpha * (1 - age) * 0.9)
  }
  ctx.restore()
}

// ─────────────────────────────────────────────── tears (as stwereup)
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

// ─────────────────────────────────────────────── spider + cobwebs
const SPIDER = [BM(`
k.........k
.k.......k.
..k.kkk.k..
k..kkkkk..k
.kkkWkWkkk.
k..kkkkk..k
..k.kkk.k..
.k.......k.`), BM(`
k........k.
.k.......k.
..k.kkk.k..
k..kkkkk..k
.kkkWkWkkkk
k..kkkkk...
..k.kkk.k..
.k.......k.`)]
export function drawSpider(ctx, x, top, y, px, t, wave = 0, alpha = 1) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.fillStyle = 'rgba(233,226,245,0.75)'; ctx.fillRect(Math.round(x - 1), Math.round(top), 2, Math.max(0, Math.round(y - top)))
  ctx.restore()
  const frame = wave > 0 && Math.floor(t * 6) % 2 ? 1 : 0
  bmp(ctx, SPIDER[frame], x, y, px, { k: '#130d24', W: '#ffffff' }, { alpha, ax: 0.5, ay: 0.15 })
}
export function drawCobweb(ctx, x, y, r, { sx = 1, sy = 1, alpha = 0.7, px = 3, col = '#ece6f6' } = {}) {
  if (alpha <= 0 || r <= 2) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.fillStyle = col
  const dot = (u, v) => ctx.fillRect(Math.round(x + sx * u - px / 2), Math.round(y + sy * v - px / 2), px, px)
  const A = [0, 0.33, 0.67, 1].map(k => k * Math.PI / 2)
  for (const a of A) for (let d = 0; d <= r; d += px * 1.4) dot(Math.cos(a) * d, Math.sin(a) * d)
  for (const f of [0.38, 0.7, 1]) {
    for (let k = 0; k < 3; k++) {
      const R = f * r, p0 = [Math.cos(A[k]) * R, Math.sin(A[k]) * R], p1 = [Math.cos(A[k + 1]) * R, Math.sin(A[k + 1]) * R]
      const L = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]), n = Math.max(2, Math.round(L / (px * 1.3)))
      for (let i = 0; i <= n; i++) {
        const u = i / n, mx = lerp(p0[0], p1[0], u), my = lerp(p0[1], p1[1], u), dl = Math.hypot(mx, my) || 1, sag = Math.sin(Math.PI * u) * R * 0.14
        dot(mx - mx / dl * sag, my - my / dl * sag)
      }
    }
  }
  ctx.restore()
}

// ─────────────────────────────────────────────── a rose
const ROSE = BM(`
.rRr..
rrRrr.
rRrrRr
.rrrr.
..g...
..g.l.
..gll.
.lg...
..g...
..g...`)
export function drawFlower(ctx, x, y, px, rot = 0, alpha = 1) {
  bmp(ctx, ROSE, x, y, px, { r: '#ff4f7e', R: '#c22a55', g: '#3f9a5a', l: '#6fdc8a' }, { alpha, ax: 0.5, ay: 0.2, rot })
}

// ─────────────────────────────────────────────── hearts
const HEART = BM(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
export function drawHearts(ctx, t, t0, x, y, { n = 6, px = 7, spread = 160, life = 1.6, rise = 260, cols = ['#ff5c8a', '#ff8fb1', '#f2c75c'], alpha = 1, every = 0.18 } = {}) {
  for (let i = 0; i < n; i++) {
    const k = (t - t0 - i * every) / life
    if (k < 0 || k > 1) continue
    const hx = x + (((i * 53) % 7) / 6 - 0.5) * spread + Math.sin(k * 6 + i) * 12
    bmp(ctx, HEART, hx - 3.5 * px, y - k * rise, px, { X: cols[i % cols.length] }, { alpha: alpha * Math.sin(Math.PI * k) })
  }
}
export function drawHeart(ctx, x, y, px, col = '#ff5c8a', alpha = 1) { bmp(ctx, HEART, x, y, px, { X: col }, { alpha, ax: 0.5, ay: 0.5 }) }

// ─────────────────────────────────────────────── a stepped-corner pixel panel
export function pixelBox(ctx, x, y, w, h, { P = 6, fill = 'rgba(13,8,32,0.94)', border = '#f2c75c', glow = 0.45 } = {}) {
  const step = (o, col) => {
    ctx.fillStyle = col
    ctx.fillRect(x + o + 2 * P, y + o, w - 2 * o - 4 * P, h - 2 * o)
    ctx.fillRect(x + o, y + o + 2 * P, w - 2 * o, h - 2 * o - 4 * P)
    ctx.fillRect(x + o + P, y + o + P, w - 2 * o - 2 * P, h - 2 * o - 2 * P)
  }
  if (glow > 0) { ctx.save(); ctx.shadowColor = rgba(border, glow); ctx.shadowBlur = 30; step(0, border); ctx.restore() }
  step(0, border)
  step(P, INK)
  step(2 * P, fill)
  ctx.fillStyle = '#fff1c8'; ctx.fillRect(x + 2 * P, y, P * 3, P / 2); ctx.fillRect(x, y + 2 * P, P / 2, P * 2)
}

// ─────────────────────────────────────────────── the speedometer
// opts: v (0…1+, the needle), label, read (the LCD text), hot (0…1 red-zone shake + glow), web (0…1 a cobweb grows),
//       flip (0…1: the label + readout panel flipping over, 0.5 = edge-on), readCol
export function drawGauge(ctx, cx, cy, k, t, { v = 0, label = 'SWIPES / MIN', read = '0', hot = 0, web = 0, flip = 0, readCol = null, heart = 0 } = {}) {
  if (k <= 0.01) return
  const shake = hot > 0 ? hot * 3 * Math.sin(t * 61) : 0
  ctx.save(); ctx.translate(Math.round(cx + shake), Math.round(cy)); ctx.scale(k, k)
  const Wd = 340, Hd = 262
  if (hot > 0) {
    const g = ctx.createRadialGradient(0, 0, 40, 0, 0, 260)
    g.addColorStop(0, rgba('#ff4f5e', 0.32 * hot)); g.addColorStop(1, rgba('#ff4f5e', 0))
    ctx.fillStyle = g; ctx.fillRect(-270, -270, 540, 540)
  }
  pixelBox(ctx, -Wd / 2, -Hd / 2, Wd, Hd, { P: 6, glow: 0.4 })
  // the dial: a chunky pixel arc, green → yellow → red
  const oy = 18, P = 8, N = 15
  for (let i = 0; i < N; i++) {
    const a = Math.PI + (i + 0.5) / N * Math.PI
    const col = i < 7 ? '#5fdc9a' : i < 11 ? '#ffd24a' : '#ff4f5e'
    const lit = (i + 0.5) / N <= v + 0.01
    ctx.fillStyle = lit ? col : rgba(col, 0.22)
    for (let rr = 78; rr <= 100; rr += P) ctx.fillRect(Math.round(Math.cos(a) * rr - P / 2), Math.round(oy + Math.sin(a) * rr - P / 2), P, P)
  }
  // ticks
  ctx.fillStyle = 'rgba(239,230,214,0.55)'
  for (let i = 0; i <= 6; i++) { const a = Math.PI + i / 6 * Math.PI; ctx.fillRect(Math.round(Math.cos(a) * 66 - 3), Math.round(oy + Math.sin(a) * 66 - 3), 6, 6) }
  // the needle (pixel squares along the ray) + hub
  const va = Math.PI + clamp(v, -0.02, 1.08) * Math.PI
  for (let d = 0; d <= 92; d += 5) {
    const s = d > 80 ? 6 : 8
    ctx.fillStyle = INK; ctx.fillRect(Math.round(Math.cos(va) * d - s / 2 - 2), Math.round(oy + Math.sin(va) * d - s / 2 - 2), s + 4, s + 4)
  }
  for (let d = 0; d <= 92; d += 5) {
    const s = d > 80 ? 6 : 8
    ctx.fillStyle = d > 70 ? '#ff6f7e' : '#fff6e6'; ctx.fillRect(Math.round(Math.cos(va) * d - s / 2), Math.round(oy + Math.sin(va) * d - s / 2), s, s)
  }
  ctx.fillStyle = INK; ctx.fillRect(-15, oy - 15, 30, 30)
  ctx.fillStyle = '#f2c75c'; ctx.fillRect(-11, oy - 11, 22, 22)
  ctx.fillStyle = '#fff1c8'; ctx.fillRect(-7, oy - 7, 6, 6)
  // the LCD readout + the label, on a little plate that flips over when the label changes
  const fs = Math.abs(Math.cos(Math.PI * clamp(flip)))
  ctx.save(); ctx.translate(0, 66); ctx.scale(1, Math.max(0.02, fs))
  ctx.fillStyle = '#0a0618'; ctx.fillRect(-92, -30, 184, 52)
  ctx.strokeStyle = 'rgba(239,230,214,0.35)'; ctx.lineWidth = 2; ctx.strokeRect(-92, -30, 184, 52)
  ctx.font = `700 40px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = readCol || (v > 0.74 ? '#ff6f7e' : '#7dffb0')
  ctx.fillText(read, 0, -3)
  ctx.font = `700 22px ${MONO}`; ctx.fillStyle = '#f2c75c'
  ctx.fillText(label, 0, 40)
  ctx.restore()
  if (heart > 0) drawHeart(ctx, 112, 74, 5 * clamp(heart * 1.4), '#ff5c8a', clamp(heart * 2))
  if (web > 0) drawCobweb(ctx, -Wd / 2 + 12, -Hd / 2 + 12, 96 * ease.outCubic(clamp(web)), { alpha: 0.8, px: 4 })
  ctx.restore()
}

// ─────────────────────────────────────────────── sparkles
export function sparkBurst(ctx, t, cx, cy, t0, { n = 12, R = 200, size = 28, seed = 1, cols = ['#f2c75c', '#efe6d6', '#ff8fb1', '#c9a6ff'], life = 0.8 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const p = ease.outCubic(tt / life)
  ctx.save(); ctx.globalAlpha *= 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    const rr = R * (0.45 + 0.75 * p) * (i % 2 ? 0.8 : 1)
    drawPixelStar(ctx, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, size * (1 - 0.45 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  ctx.restore()
}

// ─────────────────────────────────────────────── the profile portraits
const SKIN = ['#f6d5b8', '#e3a87e', '#c58658', '#94603f', '#6a4028', '#f0c3a0']
const HAIR = ['#2b1b14', '#5a3420', '#d29a42', '#f0d27a', '#b84a32', '#22244a', '#ff8fb1', '#7fd0f0', '#ddd6ec']
const SHIRT = ['#ff6f8e', '#5fdc9a', '#7fd0f0', '#ffd24a', '#c9a6ff', '#ff9a5a', '#4b7cf0', '#efe6d6']
const BG = [['#ff9ec4', '#7a4fd0'], ['#8fe6ff', '#3f5fd0'], ['#ffd27a', '#e8607a'], ['#a6ffcf', '#2f8a8a'], ['#d9b8ff', '#5a2a9a'], ['#ffb38a', '#c2456f'], ['#9fb8ff', '#6a3aa0']]
const GLYPHS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']
export const NFACE = 13
export const FACES = Array.from({ length: NFACE }, (_, i) => {
  const r = rng(i * 7 + 3); r()
  return {
    skin: SKIN[Math.floor(r() * SKIN.length)], hair: HAIR[(i * 5 + Math.floor(r() * 3)) % HAIR.length], style: i % 8,
    shirt: SHIRT[(i * 3 + 1) % SHIRT.length], bg: BG[i % BG.length], glyph: GLYPHS[(i * 7 + 2) % 12], age: 22 + ((i * 5 + 3) % 12),
    specs: i % 5 === 2, ear: i % 4 === 1,
  }
})
/** bake face i into a 20 × 22 canvas (one canvas pixel per cell): call from build() */
export function faceSprite(doc, i) {
  const f = FACES[i % NFACE]
  const c = doc.createElement('canvas'); c.width = 20; c.height = 22
  const x = c.getContext('2d')
  const px = (a, b, col) => { x.fillStyle = col; x.fillRect(a, b, 1, 1) }
  const shade = (hex, k) => { const n = parseInt(hex.slice(1), 16); const m = v => Math.round(v * k); return `rgb(${m(n >> 16)},${m((n >> 8) & 255)},${m(n & 255)})` }
  const inHead = (a, b) => ((a + 0.5 - 10) / 4.7) ** 2 + ((b + 0.5 - 9) / 5.6) ** 2 <= 1
  // back hair (long / curly / ponytail) behind everything
  for (let b = 0; b < 22; b++) for (let a = 0; a < 20; a++) {
    if (f.style === 1 && a >= 4 && a <= 15 && b >= 4 && b <= 16 && !(a > 5 && a < 14 && b > 9)) px(a, b, shade(f.hair, 0.85))
    if (f.style === 3 && Math.hypot(a + 0.5 - 10, b + 0.5 - 7.5) <= 7.4) px(a, b, f.hair)
  }
  if (f.style === 6) for (let b = 6; b <= 13; b++) px(16, b, f.hair), px(17, b + 1, shade(f.hair, 0.85))
  // shoulders + shirt
  for (let b = 16; b < 22; b++) for (let a = 1; a < 19; a++) {
    const w = 6 + (b - 16) * 1.6
    if (Math.abs(a + 0.5 - 10) <= w) px(a, b, b === 16 ? shade(f.shirt, 0.85) : f.shirt)
  }
  // neck
  for (let b = 13; b < 18; b++) for (let a = 8; a < 12; a++) px(a, b, shade(f.skin, b < 15 ? 0.8 : 1))
  if (f.shirt) { px(9, 17, shade(f.skin, 0.9)); px(10, 17, shade(f.skin, 0.9)) }
  // head
  for (let b = 2; b < 16; b++) for (let a = 4; a < 16; a++) if (inHead(a, b)) px(a, b, f.skin)
  for (let b = 2; b < 16; b++) for (let a = 4; a < 16; a++) if (inHead(a, b) && !inHead(a + 1, b) && b > 6) px(a, b, shade(f.skin, 0.86))
  // hair on top
  const cap = (rows, wid) => { for (let b = 2; b < 2 + rows; b++) for (let a = 4; a < 16; a++) if (inHead(a, b) || (b <= 4 && Math.abs(a + 0.5 - 10) < wid)) px(a, b, f.hair) }
  if (f.style === 0) { cap(3, 5); px(4, 6, f.hair); px(15, 6, f.hair) }
  if (f.style === 1) { cap(4, 5); for (let b = 5; b < 12; b++) { px(5, b, f.hair); px(14, b, f.hair) } }
  if (f.style === 2) { cap(3, 5); for (let b = 0; b < 3; b++) for (let a = 8; a < 12; a++) px(a, b, f.hair) }
  if (f.style === 3) { cap(4, 6) }
  if (f.style === 4) { cap(3, 5); for (let a = 5; a < 11; a++) px(a, 5, f.hair); px(5, 6, f.hair); px(6, 6, f.hair) }
  if (f.style === 5) { cap(2, 4) }
  if (f.style === 6) { cap(4, 5) }
  if (f.style === 7) { for (let b = 1; b < 6; b++) for (let a = 4; a < 16; a++) if (b > 1 || (a > 5 && a < 14)) px(a, b, b === 5 ? shade(f.shirt, 0.75) : f.shirt); px(10, 0, '#ffffff'); px(9, 0, '#ffffff') }
  // face
  px(7, 9, INK); px(12, 9, INK); px(7, 8, shade(f.skin, 0.6)); px(12, 8, shade(f.skin, 0.6))
  px(8, 12, shade(f.skin, 0.5)); px(9, 13, '#8a2a3a'); px(10, 13, '#8a2a3a'); px(11, 12, shade(f.skin, 0.5))
  px(6, 11, '#ff8fa8'); px(13, 11, '#ff8fa8')
  if (f.specs) { for (const a of [6, 7, 8, 11, 12, 13]) { px(a, 8, INK); px(a, 10, INK) } px(6, 9, INK); px(8, 9, INK); px(11, 9, INK); px(13, 9, INK); px(9, 9, INK); px(10, 9, INK); px(7, 9, INK); px(12, 9, INK) }
  if (f.ear) { px(4, 11, '#f2c75c'); px(15, 11, '#f2c75c') }
  return c
}
