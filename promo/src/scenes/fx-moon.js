import { clamp, lerp, prog, ease, rng } from '../lib.js'

// ───────────────────────────────────────────── moon motif (shared renderer + the global "moon clock")
// Phase convention everywhere in this file: p = fraction of the lunar month, 0..1
//   0 new · 0.125 waxing crescent · 0.25 first quarter · 0.375 waxing gibbous · 0.5 full · 0.75 last quarter …
// lit = illuminated fraction (0 new → 1 full). Waxing moons are lit on the right (northern hemisphere),
// matching app/src/components/sky/MoonPhase.tsx.
//
// Story arc: blind (new moon) → aligned (full). S1 has a real crescent rising (drawn inside s1-imagine.js),
// then a small corner "moon clock" (glyph + mono label) waxes scene by scene; S3 owns its own full moon so the
// clock hides there; full at the S7 match payoff; the S8 end card has its own row of phases.
//
// Moon-clock moments, REAL time (for sound) — each entry: fade in, then the phase ticks p0→p1 over TICK s:
//   S2   in 3.95  · tick 4.05–4.75  (lit  6% → 13%, waxing crescent)           · out 6.00–6.15
//   S4   in 11.75 · tick 11.85–12.55 (lit 21% → 50%, first quarter)             · out 15.20–15.45
//   S5   (clock hidden — S5 shows its own phase strip under the sign card, see s5-reading.js)
//   S6   in 19.55 · tick 19.65–20.35 (lit 75% → 93%, waxing gibbous)            · out 23.55–23.80
//   S7   in 25.80 · tick 25.90–26.60 (lit 96% → 100%, FULL MOON; bloom peaks 26.60) · out 27.75–28.00
// Position: top-left (glyph centre 92,86; label to its right, ≤ x 420, ≤ y 120) in every scene — a keep-out
// for anything else in those scenes.

export const litOf = (p) => (1 - Math.cos(2 * Math.PI * p)) / 2
const frac = (p) => ((p % 1) + 1) % 1
export function phaseName(p) {
  p = frac(p)
  const k = litOf(p), wax = p < 0.5
  if (k < 0.015) return 'NEW MOON'
  if (k > 0.985) return 'FULL MOON'
  if (Math.abs(k - 0.5) < 0.035) return wax ? 'FIRST QUARTER' : 'LAST QUARTER'
  return (wax ? 'WAXING ' : 'WANING ') + (k < 0.5 ? 'CRESCENT' : 'GIBBOUS')
}

// ── deterministic 2D value noise (local)
function hash2(x, y, s) {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(s, 982451653)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}
function vnoise(x, y, s) {
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy)
  const a = hash2(ix, iy, s), b = hash2(ix + 1, iy, s), c = hash2(ix, iy + 1, s), d = hash2(ix + 1, iy + 1, s)
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy
}
function fbm(x, y, s, oct = 4) {
  let v = 0, amp = 0.5, f = 1, n = 0
  for (let o = 0; o < oct; o++) { v += amp * vnoise(x * f, y * f, s + o * 31); n += amp; amp *= 0.5; f *= 2.07 }
  return v / n
}
const sstep = (a, b, x) => { const k = clamp((x - a) / (b - a)); return k * k * (3 - 2 * k) }

// maria, roughly where they sit on the real near side (disc coords, x right, y down, radius 1)
const MARIA = [
  [-0.38, -0.36, 0.3, 0.26], [0.19, -0.3, 0.17, 0.16], [0.33, -0.02, 0.22, 0.2], [0.7, -0.24, 0.1, 0.12],
  [0.55, 0.2, 0.12, 0.17], [0.32, 0.33, 0.09, 0.09], [-0.62, 0.06, 0.28, 0.46], [-0.2, 0.38, 0.18, 0.13],
  [-0.5, 0.46, 0.1, 0.1], [-0.3, -0.66, 0.22, 0.07], [0.12, -0.63, 0.2, 0.06], [-0.02, 0.05, 0.12, 0.1],
]
const CRATERS = (() => {
  const r = rng(4242), out = [[-0.12, 0.72, 0.055, 1.6], [-0.3, -0.12, 0.05, 1.2], [-0.62, -0.34, 0.035, 1]]   // Tycho, Copernicus, Aristarchus-ish
  for (let i = 0; i < 46; i++) {
    const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 0.93
    out.push([Math.cos(a) * d, Math.sin(a) * d, 0.012 + Math.pow(r(), 2.2) * 0.05, 0.5 + r() * 0.5])
  }
  return out
})()
/** albedo 0..1 at disc point (x, y) */
function albedo(x, y) {
  // domain-warped placement → organic, merged mare edges instead of blobs
  const wx = x + 0.16 * (fbm(x * 3.1 + 5, y * 3.1 + 1, 41) - 0.5), wy = y + 0.16 * (fbm(x * 3.1 + 9, y * 3.1 + 4, 43) - 0.5)
  let m = 0
  for (const [mx, my, rx, ry] of MARIA) m += Math.exp(-(((wx - mx) / rx) ** 2 + ((wy - my) / ry) ** 2) * 1.4)
  const edge = fbm(x * 6 + 3, y * 6 + 7, 17)
  m = sstep(0.22, 0.95, m * (0.7 + 0.6 * edge))
  const mott = fbm(x * 9 + 1, y * 9 + 5, 61, 3)
  let a = 0.88 + 0.1 * (fbm(x * 3 + 11, y * 3 + 2, 5) - 0.5) - m * (0.2 + 0.08 * mott)
  a += 0.06 * (fbm(x * 16, y * 16, 29, 3) - 0.5)
  for (const [cx, cy, cr, s] of CRATERS) {
    const d = Math.hypot(x - cx, y - cy) / cr
    if (d > 1.6) continue
    a += s * (0.035 * Math.exp(-(((d - 1) / 0.3) ** 2)) - 0.03 * sstep(1, 0.6, d)) * (1 - 0.5 * m)
  }
  // faint Tycho rays
  const tx = x + 0.12, ty = y - 0.72, td = Math.hypot(tx, ty)
  if (td > 0.07 && td < 0.9) {
    const ang = Math.atan2(ty, tx)
    a += 0.035 * Math.pow(Math.max(0, Math.sin(ang * 7 + 1.3) * Math.sin(ang * 11 + 0.4)), 6) * (1 - td / 0.9)
  }
  return clamp(a)
}
const albCache = new Map()
function albedoGrid(R) {
  let g = albCache.get(R)
  if (g) return g
  const S = 2 * R + 2
  g = new Float32Array(S * S)
  for (let j = 0; j < S; j++) for (let i = 0; i < S; i++) g[j * S + i] = albedo((i + 0.5 - S / 2) / R, (j + 0.5 - S / 2) / R)
  albCache.set(R, g)
  return g
}

const PEARL = [255, 251, 240], BONE = [239, 230, 214], MARE = [176, 168, 194], RIM = [201, 188, 228]
const DARK = [20, 14, 44], EARTH = [46, 38, 88]
const cvs = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
const tiles = new Map()

/** realistic moon disc as a canvas (cached per radius/phase/options) */
export function moonCanvas(R, p, { earthshine = 0.6, darkAlpha = 0.92 } = {}) {
  R = Math.max(4, Math.round(R))
  const key = `${R}|${p.toFixed(4)}|${earthshine}|${darkAlpha}`
  let c = tiles.get(key)
  if (c) return c
  if (tiles.size > 64) tiles.clear()
  const S = 2 * R + 2
  c = cvs(S, S)
  const x2 = c.getContext('2d'), id = x2.createImageData(S, S), px = id.data
  const alb = albedoGrid(R)
  const e = 2 * Math.PI * frac(p), k = litOf(p)
  // sun direction: viewer looks down −z; slight tilt so the terminator is never a perfectly vertical line
  const Lx = Math.sin(e), Ly = -0.12 * Math.sin(e), Lz = -Math.cos(e)
  for (let j = 0; j < S; j++) for (let i = 0; i < S; i++) {
    const x = (i + 0.5 - S / 2) / R, y = (j + 0.5 - S / 2) / R, rr = Math.hypot(x, y)
    const edgeA = clamp((1 - rr) * R + 0.5)
    const o = (j * S + i) * 4
    if (edgeA <= 0) { px[o + 3] = 0; continue }
    const nz = Math.sqrt(Math.max(0, 1 - rr * rr))
    const a = alb[j * S + i]
    // rough terminator: albedo/relief nudges where light starts
    const d = x * Lx + y * Ly + nz * Lz + (a - 0.75) * 0.05
    const term = sstep(-0.015, 0.04, d)
    const ls = Math.min(1.15, (2 * Math.max(d, 0)) / (Math.max(d, 0) + nz + 0.02))  // Lommel–Seeliger: flat full disc, dark terminator
    const shade = term * (0.3 + 0.7 * Math.min(1, ls * 1.05)) * (0.86 + 0.14 * Math.sqrt(nz))
    const rim = sstep(0.78, 1, rr) * 0.45
    let lit = [0, 1, 2].map(k => {
      const base = lerp(MARE[k], lerp(BONE[k], PEARL[k], sstep(0.8, 0.95, a)), sstep(0.55, 0.9, a))
      return lerp(base, RIM[k], rim)
    })
    const es = earthshine * (1 - k) ** 2 * (0.55 + 0.45 * a)
    const dark = [0, 1, 2].map(k => lerp(DARK[k], EARTH[k], es) + RIM[k] * 0.12 * sstep(0.9, 1, rr) * earthshine)
    const al = lerp(darkAlpha, 1, term)
    for (let k = 0; k < 3; k++) px[o + k] = clamp((lit[k] * shade + dark[k] * (1 - term)) / 255) * 255
    px[o + 3] = al * edgeA * 255
  }
  x2.putImageData(id, 0, 0)
  tiles.set(key, c)
  return c
}

/** realistic moon with halo. opts: alpha, glow (0..1+), earthshine, darkAlpha */
export function drawMoon(ctx, cx, cy, R, p, { alpha = 1, glow = 1, earthshine = 0.6, darkAlpha = 0.92 } = {}) {
  if (alpha <= 0.002) return
  const k = litOf(p), e = 2 * Math.PI * frac(p)
  ctx.save()
  ctx.globalAlpha = alpha
  if (glow > 0) {
    // halo biased toward the lit limb; grows with illumination
    const ox = cx + Math.sin(e) * R * 0.45 * (1 - k), gR = R * (2 + 1.1 * k)
    const g = ctx.createRadialGradient(ox, cy, R * 0.6, ox, cy, gR)
    const a0 = glow * (0.08 + 0.22 * k)
    g.addColorStop(0, `rgba(244,234,216,${a0})`); g.addColorStop(0.35, `rgba(214,200,240,${a0 * 0.45})`); g.addColorStop(1, 'rgba(201,188,228,0)')
    ctx.globalCompositeOperation = 'lighter'
    ctx.fillStyle = g; ctx.fillRect(ox - gR, cy - gR, gR * 2, gR * 2)
    ctx.globalCompositeOperation = 'source-over'
  }
  const c = moonCanvas(R, p, { earthshine, darkAlpha })
  ctx.drawImage(c, cx - c.width / 2, cy - c.height / 2)
  ctx.restore()
}

/** lit-region path for a glyph (MoonPhase.tsx geometry) */
function litPath(ctx, cx, cy, r, p) {
  const k = litOf(p), wax = frac(p) < 0.5
  ctx.save(); ctx.translate(cx, cy); if (!wax) ctx.scale(-1, 1)
  ctx.beginPath()
  if (k >= 0.995) ctx.arc(0, 0, r, 0, Math.PI * 2)
  else {
    ctx.arc(0, 0, r, -Math.PI / 2, Math.PI / 2, false)
    ctx.ellipse(0, 0, Math.abs(1 - 2 * k) * r, r, 0, Math.PI / 2, -Math.PI / 2, k < 0.5)
    ctx.closePath()
  }
  ctx.restore()
}

/** minimal line-icon moon: thin outline + filled phase. opts: color, lw, alpha, fillAlpha, discAlpha, glow */
export function drawMoonGlyph(ctx, cx, cy, r, p, { color = '#efe6d6', lw = 1.5, alpha = 1, fillAlpha = 1, discAlpha = 0.1, glow = 0 } = {}) {
  if (alpha <= 0.002) return
  const k = litOf(p)
  ctx.save()
  ctx.globalAlpha = alpha
  if (glow > 0 && k > 0.01) {
    const g = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 2.6)
    g.addColorStop(0, `rgba(244,234,216,${0.35 * glow * k})`); g.addColorStop(1, 'rgba(244,234,216,0)')
    ctx.fillStyle = g; ctx.fillRect(cx - r * 3, cy - r * 3, r * 6, r * 6)
  }
  ctx.fillStyle = color; ctx.strokeStyle = color; ctx.lineWidth = lw
  if (discAlpha > 0) { ctx.globalAlpha = alpha * discAlpha; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill() }
  if (k > 0.004) { ctx.globalAlpha = alpha * fillAlpha; litPath(ctx, cx, cy, r, p); ctx.fill() }
  ctx.globalAlpha = alpha
  ctx.beginPath(); ctx.arc(cx, cy, r - lw / 2, 0, Math.PI * 2); ctx.stroke()
  ctx.restore()
}

// ── global moon clock (main.js draws it on #fx, under the transitions). REAL time.
const TICK = 0.7
const CLOCK = [
  { a: 3.95, b: 6.15, p0: 0.08, p1: 0.12 },              // S2
  { a: 11.75, b: 15.45, p0: 0.152, p1: 0.25 },           // S4
  { a: 19.55, b: 23.8, p0: 0.333, p1: 0.415 },           // S6
  { a: 25.8, b: 28.0, p0: 0.44, p1: 0.5, full: true },   // S7 match payoff
]
const GX = 92, GY = 86, GR = 20
export function fxMoonClock(ctx, t) {
  const c = CLOCK.find(s => t >= s.a && t < s.b)
  if (!c) return
  const al = ease.inOutQuad(prog(t, c.a, c.a + 0.35)) * (1 - ease.inOutQuad(prog(t, c.b - 0.25, c.b)))
  if (al <= 0.003) return
  const tk = ease.inOutCubic(prog(t, c.a + 0.1, c.a + 0.1 + TICK))
  const p = lerp(c.p0, c.p1, tk) + 0.004 * Math.max(0, t - c.a - 0.1 - TICK) * (c.full ? 0 : 1)   // keeps creeping
  const bloom = c.full ? Math.exp(-(((t - (c.a + 0.1 + TICK)) / 0.35) ** 2)) : 0
  const y = GY + (1 - ease.outCubic(prog(t, c.a, c.a + 0.45))) * 8
  ctx.save()
  // soft indigo pocket so the label holds on any background
  const pg = ctx.createRadialGradient(GX + 90, y, 10, GX + 90, y, 230)
  pg.addColorStop(0, `rgba(11,6,32,${0.38 * al})`); pg.addColorStop(1, 'rgba(11,6,32,0)')
  ctx.fillStyle = pg; ctx.fillRect(GX + 90 - 230, y - 230, 460, 460)
  drawMoonGlyph(ctx, GX, y, GR, p, { alpha: al, lw: 1.6, discAlpha: 0.12, glow: 0.6 + 1.6 * bloom + (c.full ? 0.5 * tk : 0) })
  ctx.globalAlpha = al
  ctx.font = "400 17px 'Space Mono', monospace"
  try { ctx.letterSpacing = '3px' } catch {}
  ctx.textBaseline = 'alphabetic'
  ctx.shadowColor = 'rgba(11,6,32,0.8)'; ctx.shadowBlur = 10
  ctx.fillStyle = 'rgba(239,230,214,0.9)'
  ctx.fillText(phaseName(p), GX + GR + 18, y - 3)
  ctx.font = "400 14px 'Space Mono', monospace"
  ctx.fillStyle = 'rgba(239,230,214,0.55)'
  ctx.fillText(`${Math.round(litOf(p) * 100)}% LIT`, GX + GR + 18, y + 18)
  try { ctx.letterSpacing = '0px' } catch {}
  ctx.restore()
}
