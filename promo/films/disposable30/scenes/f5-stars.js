// Film 2 · f5 READ THE STARS (real time 15.0–20.2). Two charts meet: your Taurus card and Juniper's
// veiled mystery card drift together in deep space under a waxing moon; a quick reading plays between
// them (SPARK / RUB / ALIGN), then the seven chakra stars streak in, glide into the column between the
// cards and LOCK (flash, rings, rays, gold pixel burst, 3-frame shake). "The stars aligned."
// The world (sky, grain, moon, Juniper's card pose) is exported so f6 can continue the exact frame.
//
// Beat map (sound):
//   15.00–15.95  cards drift in from f4's sea (from x≈400 / 1520, small) to x 610 / 1300
//   15.00–15.90  the shared S1 nebula (f3's getSky/drawSky) dims to ~35% under a centre vignette (grain .5/√dim, cap .8)
//   15.05–16.00  ONE moon: S1's crescent (1716,122 r52) itself travels to CC, grows to r400 and starts waxing
//   15.45        caption "✦ YOU × JUNIPER ✦ / Two charts meet." (out 16.95–17.13)
//   15.72 SPARK · 16.12 RUB · 16.52 ALIGN   beam draws across the gap (0.2s), dots pop at +0.16/+0.23/+0.30
//                each reading lights more of the moon (stepped waxing .10 → .22 → .34 → .62), each star lock a little more
//   17.02–17.28  readings retract into the column
//   17.08–17.9   seven chakra stars streak in (stagger 0.065) → orbit → glide 17.68–
//   18.09…18.42  stars click into the column (red bottom → violet top), STAR_LOCK[i] = 18.09 + i·0.055
//   18.36–18.45  flash rises (3 frames, cap .7, soft edges) · 18.45 LOCK: rings, rays, gold pixel burst, shake (3 frames), moon full
//   18.60–20.05  "The stars aligned." (after the flash has decayed; out 19.85–20.05 on capLayer, above f6)
//   19.45–19.95  your card drifts out left; Juniper's card glides to centre; the stars sink into her card
//   19.80→       Juniper's card starts a slow push-in that f6 carries on (no dead hold at 20.0)
//   20.00        hand-off: f6 draws the same frame (sky + full moon + Juniper's mystery card at 960,440, julPose(20).s)
// Sky camera: skyCam (f3) until 15.2, then skyPanF5 loops once (constant speed, never stops) and lands on f7's
// skyPan/skyZoom at 24.0 exactly — f6 paints the same sky, so f5→f6→f7 drift is one continuous move.
import { clamp, lerp, prog, ease, rng, noise1, el, C } from '../../../src/lib.js'
import { W, H, A, SERIF, MONO, fill, img } from '../../../src/scenes/common.js'
import { getSky, drawSky, drawGrain, skyCam, skyPan, HANDOFF, GRAIN_OPACITY } from './f3-chart.js'
import { drawMoon } from '../../../src/scenes/fx-moon.js'

export const CC = { x: 960, y: 440 }                // column centre / moon centre / Juniper's final card centre
export const LOCK = 18.45
const STAR_IN = 17.08
const GLIDE = 17.68
const STAR_LOCK = Array.from({ length: 7 }, (_, i) => 18.09 + i * 0.055)
export const CHAKRA_HEX = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
const CHAKRA = CHAKRA_HEX.map((h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)))
const COL_Y = (i) => CC.y + 264 - i * 88
const ANCHOR = [[300, 650], [1590, 250], [500, 170], [1430, 720], [230, 330], [1700, 560], [1260, 110]]
const ENTER_ORDER = [3, 0, 5, 2, 6, 1, 4]
const SQ = 0.62

// ── cards ─────────────────────────────────────────────────────────────────────
// card-profile-3.png 1496×2238 (Juniper, veiled) opaque body x 120..1373, y 114..2115
export const MYS = { w: 1496, h: 2238 }
export const M_END = 0.33                             // Juniper's card scale at the hand-off (= first film's S3)
const M5 = 0.30                                       // both cards while they sit side by side
// card-profile-me.png 1560×2345 (Hakeem, 28 · Taurus — YOUR mystery card, captured from the app's Your card sheet, same
// design as Juniper's) opaque body x 120..1440, y 119..2227 → drawn at the same body height as Juniper's
const SGN = { w: 1560, h: 2345 }
const S5 = 2002 * M5 / 2108
const L_X = 610, R_X = 1300, CARD_Y = 440
const CARD_IN = { a: 15.0, b: 15.95 }
const MOVE = { a: 19.45, b: 19.95 }

/** Juniper's mystery card pose (screen px / scale / deg) — f6 continues from julPose(20.0) */
export function julPose(t) {
  const e = ease.outCubic(prog(t, CARD_IN.a, CARD_IN.b))
  const mv = ease.inOutCubic(prog(t, MOVE.a, MOVE.b))
  const bobA = 1 - mv
  const bob = Math.sin((t - 15) * 2.1 + 1.3) * 6 * e * bobA
  let x = lerp(1540, R_X, e), y = lerp(480, CARD_Y, e) + bob
  let s = lerp(0.22, M5, e), ry = lerp(-24, -9, e), rz = lerp(5, 1.2, e)
  x = lerp(x, CC.x, mv); y = lerp(y, CC.y, mv); s = lerp(s, M_END, mv); ry = lerp(ry, 0, mv); rz = lerp(rz, 0, mv)
  s *= 1 + APPROACH(t)
  return { x, y, s, ry, rz }
}
/** slow push-in on Juniper's card from 19.8 on (f6 continues it, so the card never stops at the 20.0 hand-off) */
export const APPROACH = (t) => t > 19.8 ? 0.25 * (t - 19.8) ** 2 : 0
/** your card's pose (Hakeem · Taurus) — f4 imports this for its hand-off */
export function youPose(t) {
  const e = ease.outCubic(prog(t, CARD_IN.a, CARD_IN.b))
  const out = ease.inCubic(prog(t, MOVE.a - 0.02, MOVE.b - 0.05))
  const bob = Math.sin((t - 15) * 2.0) * 6 * e
  return {
    x: lerp(lerp(380, L_X, e), -260, out), y: lerp(490, CARD_Y, e) + bob + 40 * out,
    s: lerp(0.22, M5, e) * (S5 / M5) * lerp(1, 0.86, out), ry: lerp(24, 9, e) + 20 * out, rz: lerp(-5, -1.2, e) - 6 * out, op: 1 - ease.inQuad(prog(t, MOVE.a + 0.15, MOVE.b)),
  }
}

// ── shared world pieces ───────────────────────────────────────────────────────
// ONE SKY SPINE: the S1 nebula plate + star layers + grain from f3-chart.js. f5 and f6 paint it through paintSkyF5.
const P0 = skyPan(HANDOFF.cx, HANDOFF.cy)               // f4's constant drawSky pan (seamless at 15.0)
const LOOP = { a: 15.2, b: 24.0 }, V24 = [-7, 3.5]    // f7: skyPan(t) = [-(t-24)·7, (t-24)·3.5], skyZoom = 1 + .008(t-24)
/** extra pan on top of skyCam (which keeps drifting on its own after 15.2): constant before 15.2, then a cubic
 *  that leaves 15.2 with zero extra velocity and arrives at 24.0 on f7's exact pan (0) and velocity (V24) —
 *  it only ever slows skyCam's drift to ~half, never to a stop. After 24.0 it IS f7's skyPan. */
export function skyPanF5(t) {
  if (t <= LOOP.a) return P0
  if (t >= LOOP.b) return [V24[0] * (t - 24), V24[1] * (t - 24)]
  const T = LOOP.b - LOOP.a, k = (t - LOOP.a) / T, sm = k * k * (3 - 2 * k), c = T * (k * k * k - k * k)
  return [P0[0] * (1 - sm) + V24[0] * c, P0[1] * (1 - sm) + V24[1] * c]
}
/** relative sky zoom (×skyCam's): a slow breath in, back to 1 at 24.0; f7's slow push after */
export function skyZoomF5(t) {
  if (t >= LOOP.b) return 1 + 0.008 * (t - 24)
  return 1 + 0.014 * Math.sin(Math.PI * prog(t, LOOP.a, LOOP.b)) ** 2
}
// the centre dim — same recipe as f7's dimPlate (uniform .34 + an elliptical .5 core → ~33% plate under the cards)
let DIMP = null
function dimPlate() {
  if (DIMP) return DIMP
  DIMP = document.createElement('canvas'); DIMP.width = W; DIMP.height = H
  const x = DIMP.getContext('2d')
  x.fillStyle = 'rgba(11,6,32,0.34)'; x.fillRect(0, 0, W, H)
  x.save(); x.translate(W / 2, H / 2); x.scale(1, 0.6)
  const g = x.createRadialGradient(0, 0, 0, 0, 0, 1000)
  g.addColorStop(0, 'rgba(11,6,32,0.5)'); g.addColorStop(0.55, 'rgba(11,6,32,0.32)'); g.addColorStop(1, 'rgba(11,6,32,0)')
  x.fillStyle = g; x.fillRect(-1100, -1100, 2200, 2200); x.restore()
  return DIMP
}
/** paint the shared sky (opaque). moon = S1's crescent drawn by drawSky (under the vignette, as f3/f4);
 *  dimK = centre dim; crescent = the same crescent drawn over the dim exactly as f7's paintSky does */
export function paintSkyF5(bx, t, { moon = 0, dimK = 1, crescent = 0 } = {}) {
  const z = skyZoomF5(t), pan = skyPanF5(t), zt = () => bx.setTransform(z, 0, 0, z, W / 2 * (1 - z), H / 2 * (1 - z))
  bx.setTransform(1, 0, 0, 1, 0, 0); bx.fillStyle = C.void; bx.fillRect(0, 0, W, H)
  zt(); drawSky(bx, t, { pan, moon })
  bx.setTransform(1, 0, 0, 1, 0, 0)
  if (dimK > 0.001) { bx.globalAlpha = clamp(dimK); bx.drawImage(dimPlate(), 0, 0); bx.globalAlpha = 1 }
  if (crescent > 0.001) {
    const { zoom, dx, dy } = skyCam(t)
    zt(); drawMoon(bx, 1716 + (dx + pan[0]) * 1.3, 122 + (dy + pan[1]) * 1.3, 52 * zoom, 0.14, { alpha: crescent, glow: 3, earthshine: 1, darkAlpha: 0.62 })
    bx.setTransform(1, 0, 0, 1, 0, 0)
  }
}
/** sky canvas */
export function skyCanvas(parent) {
  getSky()
  const c = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, parent)
  c.width = W; c.height = H
  return { c, bx: c.getContext('2d') }
}
/** the shared clumped silver grain (f3's drawGrain), overlay.
 *  update(t, { op, holes, keep, free }): op = canvas opacity this frame;
 *  holes = [{ x, y, R, k }] thin the grain on the moon disc toward ≤ 0.2 effective (k = how much, feathered limb);
 *  keep  = [{ x, y, w, h, rz, r, inset, feather }] card bodies (rotated, rounded, inset, feathered) the holes skip;
 *  free  = [{ x, y, w, h, rz, r, inset, feather, k }] rounded-rect holes that ignore `keep` and remove k of the grain
 *          (e.g. a photo window) */
export function grainCanvas(parent, op = 0.55) {
  const c = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: 'overlay', opacity: op, pointerEvents: 'none', zIndex: 50 }, parent)
  c.width = W; c.height = H
  const gx = c.getContext('2d')
  const mk = document.createElement('canvas'); mk.width = W; mk.height = H
  const mx = mk.getContext('2d')
  const rrect = (g, r) => {
    const q = 1 - 2 * (r.inset || 0), w = r.w * q, h = r.h * q
    if (w < 2 || h < 2) return
    g.save(); g.translate(r.x, r.y); if (r.rz) g.rotate(r.rz * Math.PI / 180)
    g.filter = r.feather ? `blur(${r.feather}px)` : 'none'
    g.beginPath(); g.roundRect(-w / 2, -h / 2, w, h, Math.min((r.r || 0) * q, w / 2, h / 2)); g.fill()
    g.restore()
  }
  return {
    update(t, { op: o = op, holes = [], keep = [], free = [] } = {}) {
      c.style.opacity = String(o)
      drawGrain(gx, t)
      const a0 = clamp(1 - 0.2 / Math.max(0.2, o))
      const hs = holes.filter((hl) => a0 * hl.k >= 0.01 && hl.R >= 8), fr = free.filter((f) => f.k >= 0.01)
      if (!hs.length && !fr.length) return
      mx.setTransform(1, 0, 0, 1, 0, 0); mx.filter = 'none'; mx.globalCompositeOperation = 'source-over'; mx.clearRect(0, 0, W, H)
      for (const hl of hs) {
        const a = a0 * hl.k, e = Math.max(3, hl.R * 0.03)
        const g = mx.createRadialGradient(hl.x, hl.y, 0, hl.x, hl.y, hl.R + e)
        g.addColorStop(0, `rgba(0,0,0,${a})`); g.addColorStop(clamp((hl.R - e) / (hl.R + e)), `rgba(0,0,0,${a})`); g.addColorStop(1, 'rgba(0,0,0,0)')
        mx.fillStyle = g; mx.fillRect(hl.x - hl.R - e - 1, hl.y - hl.R - e - 1, 2 * (hl.R + e) + 2, 2 * (hl.R + e) + 2)
      }
      if (hs.length && keep.length) { mx.globalCompositeOperation = 'destination-out'; mx.fillStyle = '#000'; for (const r of keep) rrect(mx, r) }
      mx.globalCompositeOperation = 'source-over'
      for (const f of fr) { mx.fillStyle = `rgba(0,0,0,${clamp(f.k)})`; rrect(mx, f) }
      gx.globalCompositeOperation = 'destination-out'; gx.drawImage(mk, 0, 0); gx.globalCompositeOperation = 'source-over'
    },
  }
}

// ── the ONE moon ──────────────────────────────────────────────────────────────
// S1's crescent (drawSky's moon at 1716,122 r52, phase .14) IS the big moon: in f5 (15.05–16.0) it travels to CC,
// grows to full radius and waxes (stepped, with the readings + star locks); f6 carries it full behind the reveal and
// (23.2–23.95) sends it home, waning back to the .14 crescent f7 paints. Small sizes go through fx-moon's drawMoon
// (pixel-identical to f4/f7's crescent); big sizes use a copy of the same renderer with stronger maria and a dimmer
// lit side (~75% luminance at the 0.82 peak opacity) so card text in front stays dominant. Limb stays 1px crisp.
export const R_BIG = 400
/** f6's grain-canvas opacity (matches f4's sky-patch grain); f5 eases to it by the 20.0 hand-off */
export const F6_GRAIN = 0.42
const R_NATIVE = 90, R_TEX = 440
export const litOf = (p) => (1 - Math.cos(2 * Math.PI * p)) / 2
const pOfLit = (k) => Math.acos(clamp(1 - 2 * k, -1, 1)) / (2 * Math.PI)
// value noise / albedo (copied from src/scenes/fx-moon.js so the big disc matches the small one)
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
const MARIA = [
  [-0.38, -0.36, 0.3, 0.26], [0.19, -0.3, 0.17, 0.16], [0.33, -0.02, 0.22, 0.2], [0.7, -0.24, 0.1, 0.12],
  [0.55, 0.2, 0.12, 0.17], [0.32, 0.33, 0.09, 0.09], [-0.62, 0.06, 0.28, 0.46], [-0.2, 0.38, 0.18, 0.13],
  [-0.5, 0.46, 0.1, 0.1], [-0.3, -0.66, 0.22, 0.07], [0.12, -0.63, 0.2, 0.06], [-0.02, 0.05, 0.12, 0.1],
]
const CRATERS = (() => {
  const r = rng(4242), out = [[-0.12, 0.72, 0.055, 1.6], [-0.3, -0.12, 0.05, 1.2], [-0.62, -0.34, 0.035, 1]]
  for (let i = 0; i < 46; i++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 0.93; out.push([Math.cos(a) * d, Math.sin(a) * d, 0.012 + Math.pow(r(), 2.2) * 0.05, 0.5 + r() * 0.5]) }
  return out
})()
function albedo(x, y) {
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
  const tx = x + 0.12, ty = y - 0.72, td = Math.hypot(tx, ty)
  if (td > 0.07 && td < 0.9) { const ang = Math.atan2(ty, tx); a += 0.035 * Math.pow(Math.max(0, Math.sin(ang * 7 + 1.3) * Math.sin(ang * 11 + 0.4)), 6) * (1 - td / 0.9) }
  return clamp(a)
}
let ALB = null
const PEARL = [255, 251, 240], BONE_C = [239, 230, 214], MARE = [176, 168, 194], RIM = [201, 188, 228], DARK = [20, 14, 44], EARTH = [46, 38, 88]
const BIG = new Map()
/** fx-moon's moonCanvas at R_TEX (earthshine 1) + mk: maria/crater contrast → ~0.5, lit side → ~95% */
function bigMoonCanvas(p, darkAlpha, mk) {
  const key = `${p.toFixed(4)}|${darkAlpha.toFixed(2)}|${mk.toFixed(2)}`
  let c = BIG.get(key)
  if (c) return c
  if (BIG.size > 24) BIG.clear()
  const R = R_TEX, S = 2 * R + 2
  if (!ALB) { ALB = new Float32Array(S * S); for (let j = 0; j < S; j++) for (let i = 0; i < S; i++) ALB[j * S + i] = albedo((i + 0.5 - S / 2) / R, (j + 0.5 - S / 2) / R) }
  c = document.createElement('canvas'); c.width = c.height = S
  const x2 = c.getContext('2d'), id = x2.createImageData(S, S), px = id.data
  const e = 2 * Math.PI * p, k = litOf(p)
  const Lx = Math.sin(e), Ly = -0.12 * Math.sin(e), Lz = -Math.cos(e)
  const gain = lerp(1, 0.95, mk), mc = 1.3 * mk
  for (let j = 0; j < S; j++) for (let i = 0; i < S; i++) {
    const x = (i + 0.5 - S / 2) / R, y = (j + 0.5 - S / 2) / R, rr = Math.hypot(x, y)
    const edgeA = clamp((1 - rr) * R + 0.5), o = (j * S + i) * 4
    if (edgeA <= 0) { px[o + 3] = 0; continue }
    const nz = Math.sqrt(Math.max(0, 1 - rr * rr)), a = ALB[j * S + i]
    const d = x * Lx + y * Ly + nz * Lz + (a - 0.75) * 0.05
    const term = sstep(-0.015, 0.04, d)
    const ls = Math.min(1.15, (2 * Math.max(d, 0)) / (Math.max(d, 0) + nz + 0.02))
    const shade = term * (0.3 + 0.7 * Math.min(1, ls * 1.05)) * (0.86 + 0.14 * Math.sqrt(nz)) * gain * Math.max(0.3, 1 + mc * (a - 0.88))
    const rim = sstep(0.78, 1, rr) * 0.45
    const es = (1 - k) ** 2 * (0.55 + 0.45 * a)
    for (let q = 0; q < 3; q++) {
      const base = lerp(MARE[q], lerp(BONE_C[q], PEARL[q], sstep(0.8, 0.95, a)), sstep(0.55, 0.9, a))
      const lit = lerp(base, RIM[q], rim)
      const dark = lerp(DARK[q], EARTH[q], es) + RIM[q] * 0.12 * sstep(0.9, 1, rr)
      px[o + q] = clamp((lit * shade + dark * (1 - term)) / 255) * 255
    }
    px[o + 3] = lerp(darkAlpha, 1, term) * edgeA * 255
  }
  x2.putImageData(id, 0, 0)
  BIG.set(key, c)
  return c
}
/** draw the one moon in screen px (identity transform). R ≤ 90 → fx-moon's drawMoon (the f4/f7 crescent) */
export function drawOneMoon(bx, x, y, R, p, { alpha = 1, glow = 3 } = {}) {
  if (alpha <= 0.002) return
  const sk = clamp((R - 52) / (R_BIG - 52))
  const darkAlpha = sk < 0.001 ? 0.62 : Math.round(lerp(0.62, 0.15, sk) * 50) / 50
  p = Math.round(p * 1000) / 1000
  if (R <= R_NATIVE) { drawMoon(bx, x, y, R, p, { alpha, glow, earthshine: 1, darkAlpha }); return }
  const mk = Math.round(clamp((R - R_NATIVE) / (R_BIG - R_NATIVE)) * 20) / 20
  const k = litOf(p), e = 2 * Math.PI * p
  bx.save(); bx.globalAlpha = alpha
  if (glow > 0) {                                     // fx-moon's halo, biased to the lit limb
    const ox = x + Math.sin(e) * R * 0.45 * (1 - k), gR = R * (2 + 1.1 * k), a0 = glow * (0.08 + 0.22 * k)
    const g = bx.createRadialGradient(ox, y, R * 0.6, ox, y, gR)
    g.addColorStop(0, `rgba(244,234,216,${a0})`); g.addColorStop(0.35, `rgba(214,200,240,${a0 * 0.45})`); g.addColorStop(1, 'rgba(201,188,228,0)')
    bx.globalCompositeOperation = 'lighter'; bx.fillStyle = g; bx.fillRect(ox - gR, y - gR, gR * 2, gR * 2); bx.globalCompositeOperation = 'source-over'
  }
  const c = bigMoonCanvas(p, darkAlpha, mk), s = R / R_TEX
  bx.imageSmoothingQuality = 'high'
  bx.drawImage(c, x - c.width * s / 2, y - c.height * s / 2, c.width * s, c.height * s)
  bx.restore()
}
/** the crescent's home on screen at t (drawSky's / f7 paintSky's spot under f5's sky camera) */
export function homeMoon(t) {
  const { zoom, dx, dy } = skyCam(t), pan = skyPanF5(t), z = skyZoomF5(t)
  const x = 1716 + (dx + pan[0]) * 1.3, y = 122 + (dy + pan[1]) * 1.3
  return { x: W / 2 + (x - W / 2) * z, y: H / 2 + (y - H / 2) * z, r: 52 * zoom * z }
}
let VIG = null
/** drawSky's vignette alpha at a screen point (f4's crescent sits under it) */
function vigAt(x, y) {
  if (!VIG) VIG = getSky().vig.getContext('2d').getImageData(0, 0, W, H).data
  const i = (clamp(Math.round(y), 0, H - 1) * W + clamp(Math.round(x), 0, W - 1)) * 4
  return VIG[i + 3] / 255
}
export const lerpLog = (a, b, k) => Math.exp(lerp(Math.log(a), Math.log(b), k))
// waxing is a beat: each reading lights more of the moon, each star lock a little more, the lock fills it
const WAX = [[15.0, litOf(0.12)], [15.5, 0.21], [15.88, 0.28], [16.28, 0.4], [16.68, 0.62],
  ...[0, 1, 2, 3, 4, 5, 6].map((i) => [18.09 + i * 0.055, 0.62 + 0.04 * (i + 1)]), [18.45, 1]]
const TRAVEL = { a: 15.05, b: 16.0 }
/** the one moon at t in f5 (screen px): home crescent → CC full radius, stepped waxing; f6 continues it */
export function moonState(t) {
  let lit = WAX[0][1]
  for (let i = 1; i < WAX.length; i++) lit += (WAX[i][1] - WAX[i - 1][1]) * ease.outCubic(prog(t, WAX[i][0], WAX[i][0] + (i === WAX.length - 1 ? 0.12 : 0.24)))
  const post = t >= LOCK ? 1 - ease.outCubic(prog(t, LOCK, LOCK + 0.5)) : 0
  const h = homeMoon(t), k = ease.inOutCubic(prog(t, TRAVEL.a, TRAVEL.b)), kr = ease.inOutQuad(prog(t, TRAVEL.a, TRAVEL.b))
  const x = lerp(h.x, CC.x, k), y = lerp(h.y, CC.y, k), R = lerpLog(h.r, R_BIG, kr)
  const p = Math.max(lerp(0.09, 0.14, prog(t, 6.5, 15.2)), pOfLit(lit))
  const alpha = lerp(1, 0.82, kr) * (1 - vigAt(x, y))
  const glow = lerp(3, 0.5 + 0.25 * lit + 0.7 * post, kr)
  return { x, y, R, p, lit, alpha, glow, post }
}

/** Juniper's veiled mystery card (centred on its holder) */
export function mysteryCard(parent) {
  const holder = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0 }, parent)
  const glow = el('div', { position: 'absolute', left: (120 - MYS.w / 2) + 'px', top: (114 - MYS.h / 2) + 'px', width: '1254px', height: '2002px', borderRadius: '84px' }, holder)
  const card = img(holder, A + 'card-profile-3.png', { left: -MYS.w / 2 + 'px', top: -MYS.h / 2 + 'px', width: MYS.w + 'px', height: MYS.h + 'px', clipPath: 'inset(114px 122px 122px 120px round 84px)' })
  return { holder, glow, card }
}
/** rim glow for a card (body-local px, divided by the card's display scale so it reads constant on screen) */
export function rimGlow(rgb, k, s, extra = '') {
  return `0 0 ${(lerp(30, 110, k) / s).toFixed(1)}px ${(lerp(3, 22, k) / s).toFixed(1)}px rgba(${rgb},${(0.42 + 0.5 * k).toFixed(3)}), 0 ${(30 / s).toFixed(1)}px ${(80 / s).toFixed(1)}px rgba(5,2,18,0.55)${extra}`
}
export const JUL_RIM = '255,150,232'
/** the card transform (perspective inside the holder) */
export function poseTransform(p, extraRY = 0, kick = 0) {
  return `translate(${p.x}px, ${p.y}px) perspective(1600px) rotateY(${p.ry + extraRY}deg) rotate(${p.rz}deg) scale(${p.s * (1 + kick)})`
}

// ── pixel-art stars (same sprites as the first film's fx-stars.js) ───────────────
const SPRITES = [
  ['...X...', '...X...', '..XXX..', 'XXXCXXX', '..XXX..', '...X...', '...X...'],
  ['.......', '...X...', '..XXX..', '.XXCXX.', '..XXX..', '...X...', '.......'],
  ['.......', '.......', '...X...', '..XCX..', '...X...', '.......', '.......'],
  ['.......', '.X...X.', '...X...', '..XCX..', '...X...', '.X...X.', '.......'],
].map(rows => rows.flatMap((row, y) => [...row].map((ch, x) => ch === '.' ? null : [x - 3, y - 3, ch === 'C'])).filter(Boolean))
export function sprite(ctx, cx, cy, px, kind, color, centre) {
  const x0 = Math.round(cx) - Math.floor(px / 2), y0 = Math.round(cy) - Math.floor(px / 2)
  for (const [x, y, c] of SPRITES[kind]) { ctx.fillStyle = c ? centre : color; ctx.fillRect(x0 + x * px, y0 + y * px, px, px) }
}
const BONE = '#efe6d6', GOLD = '#f2c75c', VIOLET = '#c9a6ff', ROSE = '#ff8fb1', HOT = '#fff3e0'
/** a sparkle burst flying out from a ring (big → glint → tiny) */
export function drawBurst(ctx, B, t) {
  const r = rng(B.seed * 104729), f = Math.round(t * 30)
  for (let i = 0; i < B.n; i++) {
    const ang = (i / B.n) * 6.2832 + r() * 0.35, delay = r() * 0.12, rr = r(), col = B.pal[Math.floor(r() * B.pal.length)]
    const lp = (t - B.t - delay) / B.life
    if (lp <= 0 || lp >= 1) continue
    const rad = lerp(B.r0, B.r1 * (0.8 + 0.3 * rr), ease.outCubic(lp))
    const x = B.x + Math.cos(ang) * rad * (B.sx ?? 1), y = B.y + Math.sin(ang) * rad * B.sy
    const kind = lp < 0.3 ? 0 : lp < 0.6 ? (((f + i) >> 1) & 1 ? 3 : 1) : 2
    ctx.globalAlpha = lp < 0.08 ? lp / 0.08 : 1 - ease.inQuad(prog(lp, 0.55, 1))
    sprite(ctx, x, y, rr > 0.5 ? B.px : B.px - 1, kind, col, B.centre)
  }
  ctx.globalAlpha = 1
}
// ambient pixel stars around the edges (both f5 and f6 draw these; f5 until 20.0, f6 after)
const AMB = (() => {
  const r = rng(3131), out = []
  while (out.length < 22) {
    const x = r() * W, y = r() * H
    if (x > 330 && x < 1590 && y < 1000) continue        // keep the cards / column / captions clear
    out.push({ x, y, px: r() < 0.4 ? 4 : 3, kind: Math.floor(r() * 3), col: [BONE, BONE, GOLD, VIOLET, ROSE][Math.floor(r() * 5)], w: 1.5 + r() * 2.5, ph: r() * 6.28, fo: r() * 5, fp: 2.5 + r() * 3 })
  }
  return out
})()
export function drawAmbient(ctx, t, alpha = 1) {
  const f = Math.round(t * 30)
  for (const s of AMB) {
    const tw = 0.5 + 0.5 * Math.sin(t * s.w + s.ph)
    const fp = ((t + s.fo) % s.fp) / s.fp, flashing = fp < 0.07
    let kind = flashing ? (((f >> 1) & 1) ? 0 : 3) : tw < 0.22 ? 2 : s.kind
    ctx.globalAlpha = alpha * (flashing ? 1 : 0.4 + 0.55 * tw)
    sprite(ctx, s.x + Math.sin(t * 0.4 + s.ph) * 4, s.y - (t - 15) * 3, s.px, kind, s.col, HOT)
  }
  ctx.globalAlpha = 1
}

// ── readings ──────────────────────────────────────────────────────────────────
const READ = [
  { k: 'Spark', col: '#7fd8b0', rgb: '127,216,176', n: 3, t: 15.72, y: 318 },
  { k: 'Rub', col: '#e8628a', rgb: '232,98,138', n: 2, t: 16.12, y: 446 },
  { k: 'Align', col: '#f2c75c', rgb: '242,199,92', n: 3, t: 16.52, y: 574 },
]
const READ_OUT = { a: 17.02, b: 17.28 }
const GAP = { x0: 800, x1: 1124 }   // beams run under the cards' inner edges

function starState(i, t) {
  const L = STAR_LOCK[i]
  const e = STAR_IN + ENTER_ORDER[i] * 0.065
  if (t < e) return null
  const [ax, ay] = ANCHOR[i]
  const dx = ax - CC.x, dy = (ay - CC.y) / SQ
  const r0 = Math.hypot(dx, dy), th0 = Math.atan2(dy, dx)
  const tt = t - (STAR_IN + 0.05)
  const th = th0 + 0.24 * tt - 0.1 * Math.max(0, t - (GLIDE + 0.25)) ** 2
  const wob = 1 - prog(t, GLIDE + 0.15, L)
  let ox = CC.x + r0 * Math.cos(th) + (noise1(t * 1.3, i * 7 + 1) - 0.5) * 36 * wob
  let oy = CC.y + SQ * r0 * Math.sin(th) + (noise1(t * 1.1, i * 7 + 3) - 0.5) * 30 * wob
  const v = ease.outCubic(prog(t, e, e + 0.42))
  if (v < 1) {
    const a0 = th0 + 0.55, R = 1500
    const px = CC.x + R * Math.cos(a0), py = CC.y + SQ * 1.25 * R * Math.sin(a0)
    const nx = -(oy - py), ny = ox - px, nl = Math.hypot(nx, ny) || 1
    const bulge = 140 * Math.sin(Math.PI * v)
    ox = lerp(px, ox, v) + nx / nl * bulge; oy = lerp(py, oy, v) + ny / nl * bulge
  }
  const u = prog(t, GLIDE, L - 0.1)
  const c = t < L - 0.1 ? 0.9 * ease.inOutQuad(u) : 0.9 + 0.1 * ease.inQuad(prog(t, L - 0.1, L))
  let x = lerp(ox, CC.x, c), y = lerp(oy, COL_Y(i), c)
  if (t > L) { const k = t - L; x += (i % 2 ? 1 : -1) * 9 * Math.exp(-k * 22) * Math.sin(k * 55) }
  return { x, y, c, enter: v }
}

export default function build(stage) {
  // root is a static wrapper (no stacking context): `body` takes main.js's z-index, `capLayer` sits above the later
  // scenes so "The stars aligned." can finish its fade (to 20.05) over f6's first frames; captions stay off the grain
  const root = el('div', {}, stage)
  const body = fill(root, { background: C.void })
  const capLayer = fill(root, { zIndex: 40, pointerEvents: 'none', overflow: 'hidden' })
  const sky = skyCanvas(body)
  const shakeBox = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, body)
  // god-rays from the column
  const rr = rng(909); const stops = []; let ang = 0
  while (ang < 360) { const w = 1 + rr() * 3.2, gap = 2 + rr() * 9, a = (0.25 + rr() * 0.75).toFixed(2); stops.push(`rgba(255,240,214,0) ${ang.toFixed(1)}deg`, `rgba(255,240,214,${a}) ${(ang + w / 2).toFixed(1)}deg`, `rgba(255,240,214,0) ${(ang + w).toFixed(1)}deg`); ang += w + gap }
  const RAYS = 2600
  const rays = el('div', { position: 'absolute', left: CC.x - RAYS / 2 + 'px', top: CC.y - RAYS / 2 + 'px', width: RAYS + 'px', height: RAYS + 'px', mixBlendMode: 'screen', opacity: 0, pointerEvents: 'none',
    background: `conic-gradient(from 0deg, ${stops.join(',')})`,
    webkitMaskImage: 'radial-gradient(closest-side, #000 6%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0) 100%)', maskImage: 'radial-gradient(closest-side, #000 6%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0) 100%)' }, shakeBox)
  // beams under the cards
  const beamCv = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, shakeBox)
  beamCv.width = W; beamCv.height = H
  const bx = beamCv.getContext('2d')
  // your mystery card (Hakeem · Taurus, same design as hers) · Juniper's card
  const you = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0 }, shakeBox)
  const youGlow = el('div', { position: 'absolute', left: (120 - SGN.w / 2) + 'px', top: (119 - SGN.h / 2) + 'px', width: '1320px', height: '2108px', borderRadius: '88px' }, you)
  const youCard = img(you, A + 'card-profile-me.png', { left: -SGN.w / 2 + 'px', top: -SGN.h / 2 + 'px', width: SGN.w + 'px', height: SGN.h + 'px', clipPath: 'inset(119px 120px 118px 120px round 88px)' })
  const jul = mysteryCard(shakeBox)
  // reading labels (above the cards)
  const rows = READ.map((R) => {
    const box = el('div', { position: 'absolute', left: (CC.x - 160) + 'px', width: '320px', top: (R.y - 30) + 'px', textAlign: 'center', opacity: 0 }, shakeBox)
    const lab = el('div', { fontFamily: MONO, fontSize: '34px', letterSpacing: '0.24em', textIndent: '0.24em', textTransform: 'uppercase', color: R.col, lineHeight: '40px',
      textShadow: `0 0 14px rgba(${R.rgb},0.75), 0 0 3px rgba(8,4,24,0.9), 0 2px 10px rgba(8,4,24,0.9)` }, box, R.k)
    const dots = el('div', { display: 'flex', justifyContent: 'center', gap: '13px', marginTop: '16px' }, box)
    const ds = [0, 1, 2].map((j) => el('div', { width: '14px', height: '14px', borderRadius: '50%', boxSizing: 'border-box', border: `2px solid ${R.col}`, background: j < R.n ? R.col : 'rgba(11,6,32,0.7)', boxShadow: j < R.n ? `0 0 12px 2px rgba(${R.rgb},0.8)` : 'none', opacity: 0 }, dots))
    return { box, lab, ds }
  })
  const fxCv = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, shakeBox)
  fxCv.width = W; fxCv.height = H
  const fx = fxCv.getContext('2d')
  const DUST = (() => { const r = rng(515); return Array.from({ length: 170 }, (_, i) => ({ x: r() * W, y: r() * H, s: 0.7 + r() * 1.8, a: 0.35 + r() * 0.65, col: i % 5 === 0 ? '242,199,92' : i % 7 === 0 ? CHAKRA[i % 7].join(',') : '255,246,234', ph: r() * 6.28 })) })()

  const bigFlash = el('div', { position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0,
    background: `radial-gradient(55% 75% at 50% ${CC.y / H * 100}%, rgba(255,253,248,1) 0%, rgba(255,246,232,0.62) 34%, rgba(240,226,255,0.25) 100%)` }, body)
  // captions
  const scrim = el('div', { position: 'absolute', left: 0, right: 0, bottom: 0, height: '400px', background: 'linear-gradient(180deg, rgba(11,6,32,0) 0%, rgba(11,6,32,0.08) 20%, rgba(11,6,32,0.28) 40%, rgba(11,6,32,0.52) 60%, rgba(11,6,32,0.72) 80%, rgba(11,6,32,0.8) 100%)', opacity: 0 }, capLayer)
  const capBox = el('div', { position: 'absolute', left: '50%', bottom: '70px', transform: 'translateX(-50%)', textAlign: 'center', whiteSpace: 'nowrap' }, capLayer)
  const eyebrow = el('div', { fontFamily: MONO, fontSize: '26px', letterSpacing: '0.28em', textIndent: '0.28em', color: BONE, textShadow: '0 1px 12px rgba(11,6,32,0.8)', marginBottom: '12px', textTransform: 'uppercase', opacity: 0 }, capBox, '✦&nbsp;&nbsp;You&nbsp;&nbsp;×&nbsp;&nbsp;Juniper&nbsp;&nbsp;✦')
  const capLine = el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: '80px', lineHeight: 1.05, color: C.bone, textShadow: '0 2px 30px rgba(11,6,32,0.85), 0 1px 3px rgba(11,6,32,0.7)', opacity: 0 }, capBox, 'Two charts meet.')
  const lockBox = el('div', { position: 'absolute', left: '50%', bottom: '64px', transform: 'translateX(-50%)', textAlign: 'center', whiteSpace: 'nowrap' }, capLayer)
  const lockLine = el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: '116px', lineHeight: 1, color: C.bone, opacity: 0,
    textShadow: '0 0 40px rgba(255,236,200,0.45), 0 2px 34px rgba(11,6,32,0.9), 0 1px 3px rgba(11,6,32,0.7)' }, lockBox, 'The stars aligned.')
  const grain = grainCanvas(body, 0.55)

  return {
    start: 15.0, end: 20.2, root, fxEnd: 20.0,
    fx(ctx, t) {
      drawAmbient(ctx, t, prog(t, 15.0, 15.4))
      drawBurst(ctx, { t: LOCK, x: CC.x, y: CC.y, r0: 150, r1: 900, n: 30, px: 5, life: 1.0, pal: [GOLD, '#ffe6a0', GOLD, BONE], centre: HOT, sy: 0.78, seed: 3 }, t)
      drawBurst(ctx, { t: LOCK + 0.08, x: CC.x, y: CC.y, r0: 90, r1: 520, n: 16, px: 4, life: 0.8, pal: CHAKRA_HEX, centre: HOT, sy: 0.9, seed: 9 }, t)
    },
    update(t) {
      body.style.zIndex = root.style.zIndex                // main.js's scene order
      body.style.opacity = String(prog(t, 15.0, 15.2))     // the 0.2s fade-in over f4 (was main.js fadeIn)
      const dimK = ease.inOutQuad(prog(t, 15.0, 15.9))
      paintSkyF5(sky.bx, t, { moon: 0, dimK })
      const fi = Math.round(t * 30), lockF = Math.round(LOCK * 30)
      const ten = ease.inQuad(prog(t, GLIDE, LOCK))
      const post = t >= LOCK ? 1 - ease.outCubic(prog(t, LOCK, LOCK + 0.5)) : 0
      const trem = ten * ten * 4.5 * (t < LOCK ? 1 : 0)
      const kick = t >= LOCK ? 0.035 * Math.sin(Math.PI * prog(t, LOCK, LOCK + 0.3)) : 0

      // ── the one moon (S1's crescent travels in, grows, waxes to full at the lock) — on the sky canvas, over the dim
      const dimO = 0.45 * ten * (t < LOCK ? 1 : 0) + (t >= LOCK ? 0.2 * (1 - ease.outQuad(prog(t, LOCK, LOCK + 0.5))) : 0)
      if (dimO > 0.002) { sky.bx.fillStyle = `rgba(7,4,26,${dimO.toFixed(3)})`; sky.bx.fillRect(0, 0, W, H) }
      const ms = moonState(t)
      const sf0 = fi - lockF, SH0 = [[-16, 10], [12, -8], [-6, 5]], sh0 = sf0 >= 0 && sf0 < 3 ? SH0[sf0] : [0, 0]
      drawOneMoon(sky.bx, ms.x + sh0[0], ms.y + sh0[1], ms.R, ms.p, { alpha: ms.alpha, glow: ms.glow })

      // ── cards
      const lean = 10 * ten * (t < LOCK ? 1 : 0)       // drawn toward the column as the stars commit
      const jx = (noise1(t * 38, 5) - 0.5) * 2 * trem, jy = (noise1(t * 41, 9) - 0.5) * 2 * trem
      const yp = youPose(t)
      you.style.transform = poseTransform({ ...yp, x: yp.x + lean + jx, y: yp.y + jy }, 0, kick)
      you.style.opacity = String(yp.op)
      const glow = t < LOCK ? ten : 1 - ease.inOutQuad(prog(t, LOCK, MOVE.b - 0.05))   // charged into the lock, cooling off before the hand-off
      const mixRgb = (a, b, k) => a.map((v, i) => Math.round(lerp(v, b[i], k))).join(',')
      youCard.style.filter = glow > 0.002 ? `brightness(${1 + 0.18 * glow + 0.25 * post})` : 'none'
      youGlow.style.boxShadow = rimGlow(mixRgb([150, 240, 170], [255, 236, 180], post), glow, yp.s)
      const jp = julPose(t)
      jul.holder.style.transform = poseTransform({ ...jp, x: jp.x - lean - jx, y: jp.y - jy }, 0, kick)
      jul.card.style.filter = glow > 0.002 ? `brightness(${1 + 0.18 * glow + 0.25 * post})` : 'none'
      jul.glow.style.boxShadow = rimGlow(mixRgb([255, 150, 232], [255, 236, 200], post), glow, jp.s)

      // shake + chroma punch on the lock
      const sf = fi - lockF
      const SH = [[-16, 10], [12, -8], [-6, 5]]
      const sh = sf >= 0 && sf < 3 ? SH[sf] : [0, 0]
      shakeBox.style.transform = `translate(${sh[0]}px, ${sh[1]}px)`
      const CH = [14, 9, 5, 2]
      shakeBox.style.filter = sf >= 0 && sf < 4 ? `drop-shadow(${CH[sf]}px 0 0 rgba(255,40,90,0.6)) drop-shadow(${-CH[sf]}px 0 0 rgba(60,190,255,0.6))` : 'none'
      // lock flash: 3-frame rise to .7 (soft edges, never a white frame), decayed by ~18.6
      const fl = t < LOCK ? 0.7 * ease.inQuad(prog(t, LOCK - 0.1, LOCK)) : 0.7 * (1 - ease.outCubic(prog(t, LOCK, LOCK + 0.3)))
      bigFlash.style.opacity = String(fl)
      const rayO = t < LOCK ? 0.2 * ease.inQuad(prog(t, LOCK - 0.32, LOCK)) : 0.5 * (1 - ease.inOutQuad(prog(t, LOCK + 0.05, LOCK + 1.1)))
      rays.style.opacity = String(rayO)
      rays.style.transform = `rotate(${(t - 17.7) * 7}deg) scale(${t < LOCK ? 0.7 : lerp(0.75, 1.15, ease.outCubic(prog(t, LOCK, LOCK + 0.9)))})`

      // ── readings: beams across the gap, labels + dots
      bx.clearRect(0, 0, W, H)
      bx.globalCompositeOperation = 'lighter'
      const ro = ease.inOutCubic(prog(t, READ_OUT.a, READ_OUT.b))
      READ.forEach((R, k) => {
        const row = rows[k]
        const lt = t - R.t
        const draw = ease.outCubic(prog(lt, 0, 0.22))
        const op = ease.outQuad(prog(lt, 0.04, 0.22)) * (1 - ro)
        row.box.style.opacity = String(op)
        row.box.style.transform = `translateY(${(1 - ease.outCubic(prog(lt, 0, 0.4))) * 12 - ro * 10}px)`
        row.lab.style.letterSpacing = lerp(0.42, 0.26, ease.outCubic(prog(lt, 0, 0.5))) + 'em'
        row.ds.forEach((d, j) => {
          const q = prog(lt, 0.16 + j * 0.07, 0.26 + j * 0.07)
          d.style.opacity = String(ease.outQuad(q))
          d.style.transform = `scale(${q <= 0 ? 0.3 : q < 1 ? lerp(0.3, 1.35, ease.outQuad(q)) : 1 + 0.35 * Math.exp(-(lt - 0.26 - j * 0.07) * 14)})`
        })
        if (draw <= 0 || ro >= 1) return
        // beam from both card edges toward the middle; retracts into the column
        const by = R.y + 47
        const half = (GAP.x1 - GAP.x0) / 2 * (1 - ro)
        const xa = lerp(GAP.x0, CC.x - half, ro), xb = lerp(GAP.x1, CC.x + half, ro)
        const reach = (CC.x - xa) * draw
        const pulse = 0.75 + 0.25 * Math.sin(t * 9 + k * 2)
        const flash = 1 + 1.5 * Math.exp(-Math.max(0, lt - 0.18) * 7) * (lt > 0.18 ? 1 : 0)
        for (const side of [-1, 1]) {
          const x0 = side < 0 ? xa : xb, x1 = x0 - side * reach
          const seg = 26
          bx.beginPath()
          for (let s = 0; s <= seg; s++) {
            const u = s / seg, x = lerp(x0, x1, u)
            let y = by
            if (k === 0) y += Math.sin(u * 14 + t * 22) * 3 * (1 - u * 0.5) * (1 - ro)                         // spark: crackle
            if (k === 1) y += Math.sin(u * 7 - t * 9) * 9 * Math.sin(Math.PI * u) * (1 - ro)                    // rub: wavering push/pull
            s ? bx.lineTo(x, y) : bx.moveTo(x, y)
          }
          bx.strokeStyle = `rgba(${R.rgb},${(0.28 * pulse * flash).toFixed(3)})`; bx.lineWidth = 12; bx.lineCap = 'round'; bx.stroke()
          bx.strokeStyle = `rgba(255,250,240,${(0.75 * Math.min(1, pulse * flash)).toFixed(3)})`; bx.lineWidth = 2; bx.stroke()
          bx.strokeStyle = `rgba(${R.rgb},${(0.9 * pulse).toFixed(3)})`; bx.lineWidth = 4; bx.globalAlpha = 0.6; bx.stroke(); bx.globalAlpha = 1
        }
        // spark particles flicking along the spark beam
        if (k === 0 && ro < 1) {
          const r = rng(fi * 13 + 5)
          for (let q = 0; q < 6; q++) { const x = lerp(xa, xb, r()), y = by + (r() - 0.5) * 22; bx.fillStyle = `rgba(200,255,230,${(0.8 * draw * (1 - ro)).toFixed(3)})`; bx.fillRect(Math.round(x), Math.round(y), 3, 3) }
        }
      })
      // column glow left behind by the retracting readings (pre-figures the star column)
      const cg = Math.sin(Math.PI * prog(t, READ_OUT.a + 0.1, STAR_IN + 0.7)) * 0.5
      if (cg > 0.01) {
        const g = bx.createLinearGradient(CC.x - 50, 0, CC.x + 50, 0)
        g.addColorStop(0, 'rgba(255,240,214,0)'); g.addColorStop(0.5, `rgba(255,236,200,${(0.35 * cg).toFixed(3)})`); g.addColorStop(1, 'rgba(255,240,214,0)')
        bx.fillStyle = g; bx.fillRect(CC.x - 50, 260, 100, 380)
      }
      bx.globalCompositeOperation = 'source-over'

      // ── fx canvas: dust, stars, lines, beam, rings
      fx.clearRect(0, 0, W, H)
      fx.globalCompositeOperation = 'lighter'
      const dustIn = prog(t, GLIDE - 0.2, GLIDE + 0.15) * (1 - ease.outQuad(prog(t, LOCK, LOCK + 0.45)))
      if (dustIn > 0) {
        const pullAt = (tt) => ease.inCubic(prog(tt, GLIDE - 0.05, LOCK)) * 0.94
        const blow = ease.outCubic(prog(t, LOCK, LOCK + 0.75))
        for (const d of DUST) {
          const pos = (tt) => {
            const pl = pullAt(tt)
            let x = lerp(d.x, CC.x + (d.x - CC.x) * 0.03, pl), y = lerp(d.y, lerp(d.y, CC.y, 0.25), pl)
            if (tt > LOCK) { const dx = x - CC.x, dy = y - CC.y, l = Math.hypot(dx, dy) || 1; x += dx / l * 900 * blow; y += dy / l * 900 * blow }
            return [x, y]
          }
          const [x, y] = pos(t), [px, py] = pos(t - (t > LOCK ? 0.012 : 0.05))
          const al = d.a * dustIn * (0.35 + 0.65 * ten + 0.6 * post) * (0.6 + 0.4 * Math.sin(t * 6 + d.ph))
          if (al < 0.02) continue
          fx.strokeStyle = `rgba(${d.col},${al.toFixed(3)})`; fx.lineWidth = d.s; fx.lineCap = 'round'
          fx.beginPath(); fx.moveTo(px, py); fx.lineTo(x + (x === px ? 0.01 : 0), y); fx.stroke()
        }
      }
      // stars sink into Juniper's card as she glides to the centre
      const collapse = ease.inCubic(prog(t, MOVE.a + 0.12, MOVE.b))
      const colO = 1 - ease.inOutQuad(prog(t, 19.55, 19.7))   // the column is gone before her card glides through it
      if (colO > 0.001) {
        fx.globalAlpha = colO
        const SS = CHAKRA_HEX.map((_, i) => starState(i, t))
        for (let i = 0; i < 6; i++) {
          const A1 = SS[i], B1 = SS[i + 1]
          if (!A1 || !B1) continue
          const mc = Math.min(A1.c, B1.c), lockT = Math.max(STAR_LOCK[i], STAR_LOCK[i + 1])
          let al = 0.4 * clamp((mc - 0.4) / 0.45)
          if (t >= lockT) al = lerp(1, 0.45, ease.outQuad(prog(t, lockT, lockT + 0.3)))
          if (t >= LOCK) al = Math.max(al, lerp(1, 0.55, ease.outQuad(prog(t, LOCK, LOCK + 0.4))))
          al *= 1 - collapse
          if (al < 0.01) continue
          fx.strokeStyle = `rgba(255,236,200,${(al * 0.35).toFixed(3)})`; fx.lineWidth = 7
          fx.beginPath(); fx.moveTo(A1.x, A1.y); fx.lineTo(B1.x, B1.y); fx.stroke()
          fx.strokeStyle = `rgba(255,248,236,${al.toFixed(3)})`; fx.lineWidth = 1.6
          fx.beginPath(); fx.moveTo(A1.x, A1.y); fx.lineTo(B1.x, B1.y); fx.stroke()
        }
        if (t >= LOCK - 0.04) {
          const bo = (t < LOCK ? prog(t, LOCK - 0.04, LOCK) : lerp(1, 0.35, ease.outQuad(prog(t, LOCK, LOCK + 0.45)))) * (1 - collapse)
          const BW = 60
          const bg = fx.createLinearGradient(CC.x - BW, 0, CC.x + BW, 0)
          bg.addColorStop(0, 'rgba(255,240,214,0)'); bg.addColorStop(0.5, `rgba(255,244,226,${(0.55 * bo).toFixed(3)})`); bg.addColorStop(1, 'rgba(255,240,214,0)')
          fx.fillStyle = bg; fx.fillRect(CC.x - BW, -20, BW * 2, H + 40)
        }
        const target = [jp.x, jp.y - 40]
        SS.forEach((s, i) => {
          if (!s) return
          const rgb = CHAKRA[i].join(',')
          const e0 = STAR_IN + ENTER_ORDER[i] * 0.065
          let prev = [s.x, s.y]
          for (let j = 1; j <= 14; j++) {
            const tj = t - j * 0.016
            if (tj < e0) break
            const q = starState(i, tj); if (!q) break
            const al = (1 - j / 15) * 0.7 * (1 - collapse)
            fx.strokeStyle = `rgba(${rgb},${al.toFixed(3)})`; fx.lineWidth = lerp(7, 1, j / 14)
            fx.beginPath(); fx.moveTo(prev[0], prev[1]); fx.lineTo(q.x, q.y); fx.stroke()
            prev = [q.x, q.y]
          }
          const L = STAR_LOCK[i]
          const flare = t >= L ? 1 - ease.outQuad(prog(t, L, L + 0.35)) : 0
          const lockFlare = t >= LOCK ? 1 - ease.outQuad(prog(t, LOCK, LOCK + 0.6)) : 0
          let sz = (1 + 0.14 * Math.sin(t * 9 + i * 1.7)) * (0.85 + 0.35 * ten) * (1 + 0.9 * flare + 1.2 * lockFlare)
          let x = s.x, y = s.y
          if (collapse > 0) { x = lerp(x, target[0], collapse); y = lerp(y, target[1], collapse * 0.7); sz *= 1 - collapse }
          const ent = Math.min(1, s.enter * 3)
          if (sz <= 0.01) return
          const G = 46 * sz
          const gg = fx.createRadialGradient(x, y, 0, x, y, G)
          gg.addColorStop(0, `rgba(${rgb},${0.75 * ent})`); gg.addColorStop(0.3, `rgba(${rgb},${0.28 * ent})`); gg.addColorStop(1, `rgba(${rgb},0)`)
          fx.fillStyle = gg; fx.fillRect(x - G, y - G, G * 2, G * 2)
          const sp = (22 + 30 * ten + 70 * flare + 90 * lockFlare) * sz
          fx.strokeStyle = `rgba(255,250,240,${(0.55 * ent).toFixed(3)})`; fx.lineWidth = 1.4
          fx.beginPath(); fx.moveTo(x - sp, y); fx.lineTo(x + sp, y); fx.moveTo(x, y - sp * 0.7); fx.lineTo(x, y + sp * 0.7); fx.stroke()
          const cgr = fx.createRadialGradient(x, y, 0, x, y, 10 * sz)
          cgr.addColorStop(0, `rgba(255,255,255,${ent})`); cgr.addColorStop(0.45, `rgba(${rgb},${0.9 * ent})`); cgr.addColorStop(1, `rgba(${rgb},0)`)
          fx.fillStyle = cgr; fx.beginPath(); fx.arc(x, y, 10 * sz, 0, 6.2832); fx.fill()
        })
        fx.globalAlpha = 1
      }
      // the card takes in the stars: a soft bloom on Juniper's card as they sink
      if (collapse > 0 && collapse < 1) {
        const b = Math.sin(Math.PI * collapse) * 0.6, G = 260
        const gg = fx.createRadialGradient(jp.x, jp.y - 60, 0, jp.x, jp.y - 60, G)
        gg.addColorStop(0, `rgba(255,240,250,${b})`); gg.addColorStop(1, 'rgba(255,200,240,0)')
        fx.fillStyle = gg; fx.fillRect(jp.x - G, jp.y - 60 - G, G * 2, G * 2)
      }
      if (t >= LOCK && t < LOCK + 0.9) {
        const RINGS = [[0, 920, 30, '255,246,230'], [0.07, 720, 18, '201,166,255'], [0.15, 560, 8, '242,199,92']]   // ×0.8: clear of the caption
        RINGS.forEach(([d, R1, w0, rgb]) => {
          const q = prog(t, LOCK + d, LOCK + d + 0.7)
          if (q <= 0 || q >= 1) return
          const R = lerp(90, R1, ease.outCubic(q))
          fx.strokeStyle = `rgba(${rgb},${(0.85 * (1 - ease.inQuad(q))).toFixed(3)})`; fx.lineWidth = lerp(w0, 1.5, q)
          fx.beginPath(); fx.ellipse(CC.x, CC.y, R, R * 0.92, 0, 0, 6.2832); fx.stroke()
        })
      }
      fx.globalCompositeOperation = 'source-over'

      // ── grain: compensate the dimmed plate (GRAIN_OPACITY/√dim, cap .8), back to f6's .55 by the hand-off;
      //    thinned to ≤ .2 on the moon disc (not on the cards in front of it)
      //    the lock flash lifts the plate into overlay's steep range → grain eased off under it (no TV static)
      const plate = lerp(1, 0.35, dimK) * (1 - dimO)
      const gOp = lerp(Math.min(0.8, GRAIN_OPACITY / Math.sqrt(plate)), F6_GRAIN, ease.inOutQuad(prog(t, 19.4, 20.0))) * (1 - fl)
      // keep = the card bodies as drawn (rotated, rounded, foreshortened by the yaw), inset 3% and feathered so the
      // moon's thinned grain runs right up under the rim glow — no strip of full grain past the card, no square corner
      const sk = jp.s * (1 + kick)
      const keep = [{ x: jp.x - lean - jx, y: jp.y - jy, w: 1254 * sk * Math.cos(jp.ry * Math.PI / 180), h: 2002 * sk, rz: jp.rz, r: 84 * sk, inset: 0.03, feather: 5 }]
      if (yp.op > 0.05) { const sy = yp.s * (1 + kick); keep.push({ x: yp.x + lean + jx, y: yp.y + jy, w: 606 * sy * Math.cos(yp.ry * Math.PI / 180), h: 910 * sy, rz: yp.rz, r: 45 * sy, inset: 0.03, feather: 5 }) }
      // the hole only thins the lit part's worth: the dark side of a young moon keeps its grain
      grain.update(t, { op: gOp, holes: [{ x: ms.x, y: ms.y, R: ms.R, k: ms.alpha / 0.82 * ms.lit }], keep })

      // ── captions
      const out = 1 - ease.inQuad(prog(t, 16.95, 17.13))
      const e1 = ease.outQuad(prog(t, 15.45, 15.67)), e2 = ease.outQuad(prog(t, 15.55, 15.85))
      eyebrow.style.opacity = String(e1 * out)
      eyebrow.style.transform = `translateY(${(1 - ease.outCubic(prog(t, 15.45, 15.85))) * 10}px)`
      capLine.style.opacity = String(e2 * out)
      capLine.style.transform = `translateY(${(1 - ease.outCubic(prog(t, 15.55, 16.05))) * 14}px)`
      const CL = 18.6                                       // after the flash has decayed
      const lo = ease.outQuad(prog(t, CL, CL + 0.22)) * (1 - ease.inOutQuad(prog(t, 19.85, 20.05)))   // ≥ 1.1s readable
      lockLine.style.opacity = String(lo)
      lockLine.style.transform = `scale(${lerp(1.06, 1, ease.outCubic(prog(t, CL, CL + 0.6)))})`
      lockLine.style.letterSpacing = lerp(0.04, 0, ease.outCubic(prog(t, CL, CL + 0.8))) + 'em'
      // the plate is already dimmed under "Two charts meet." → a lighter scrim there, so the grain under it still reads
      scrim.style.opacity = String(Math.max(0.6 * e1 * out, lo))
    },
  }
}

export const cues = [
  ['whoosh', 15.0, 0.9, 0.07],                                           // two cards drift together
  ['bell', 15.47, 587.33, 0.035, 1.2, 0], ['bell', 15.58, 880, 0.03, 1.2, 0],  // "Two charts meet."
  // readings: a bell per reading + a tick per dot
  ...[[15.72, 739.99, -0.2], [16.12, 554.37, 0], [16.52, 987.77, 0.2]].flatMap(([t, hz, pan], k) => [
    ['whoosh', t - 0.02, 0.25, 0.035], ['bell', t + 0.04, hz, 0.045, 1.0, pan],
    ...[0, 1, 2].map((j) => ['tick', t + 0.18 + j * 0.07, k === 1 && j === 2 ? 0.025 : 0.06]),
  ]),
  ['whoosh', 17.02, 0.3, 0.04],                                          // readings retract
  // seven stars streak in
  ...[0, 1, 2, 3, 4, 5, 6].flatMap((k) => [['whoosh', STAR_IN + k * 0.065 + 0.32, 0.38, 0.035], ['bell', STAR_IN + k * 0.065 + 0.36, 2349.32, 0.012, 1.0, ((k % 3) - 1) * 0.5]]),
  ['riser', 17.6, LOCK, 0.12],                                           // tension into the lock
  // star snaps, red → violet
  ...[493.88, 587.33, 659.25, 739.99, 880, 987.77, 1174.66].flatMap((f, i) => [['tick', STAR_LOCK[i], 0.07], ['bell', STAR_LOCK[i], f, 0.05, 1.2, (i - 3) * 0.12]]),
  // LOCK
  ['boom', LOCK, 0.55], ['tick', LOCK, 0.22],
  ['bell', LOCK, 196, 0.08, 3.0, 0], ['bell', LOCK + 0.01, 587.33, 0.06, 2.6, -0.25], ['bell', LOCK + 0.02, 739.99, 0.05, 2.6, 0.25], ['bell', LOCK + 0.03, 1174.66, 0.035, 2.6, 0],
  ['glitter', LOCK, LOCK + 0.75],
  ['bell', 18.62, 293.66, 0.03, 2.0, 0],                                  // the stars aligned (caption)
  ['whoosh', MOVE.a, 0.55, 0.06],                                         // your card drifts off; hers glides to centre
  ['bell', MOVE.b - 0.1, 1318.51, 0.025, 1.2, 0],                          // stars sink into her card
]
