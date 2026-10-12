import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'
import { VERT, W, H, A, IMG, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks, makeCard, makeStars } from "./common.js"

// ── real card geometry (measured in the PNGs) ───────────────────────────────
// card-reveal.png 1560×2740: card body x 66..1494; photo window x 118..1443, y 314..1207.
// The window shows juniper.jpg cover-fitted to the window width (1325px → image
// 1325×1767), with the window top sitting 312px below the image top.
const REV = { w: 1560, h: 2740, win: { x: 118, y: 314, w: 1325, h: 893 }, imgTop: 582 } // imgTop raised (was 312) so her head sits higher in the window with headroom, chin clear
const D = VERT ? 0.53 : 0.35 // display scale → card body ≈ 500px wide, 959px PNG tall (vertical: ≈ 757px wide)
// card-back.png 1528×2347: body x 120..1439 (1320 wide) → match the front body width
const BACK = { w: 1528, h: 2347, markX: 782, markY: 1134 }
const DB = 1430 * D / 1320
// photo window rect in world coords (world origin = screen centre = card centre)
const WIN = {
  x: (REV.win.x - REV.w / 2) * D, y: (REV.win.y - REV.h / 2) * D,
  w: REV.win.w * D, h: REV.win.h * D,
}
const INSET = 2 // land just inside the window so the card's own window edge-glow shows
const IMG_END_SCALE = WIN.w / 1920 // the <img> is laid out 1920×2560
const IMG_END_TY = (REV.win.w * 4 / 3 / 2 - (REV.imgTop + REV.win.h / 2)) * D // image centre below window centre
const MARK = { x: (BACK.markX - BACK.w / 2) * DB, y: (BACK.markY - BACK.h / 2) * DB }

/** tiling film grain (deterministic), as a data URL */
function grainURL(size = 256, seed = 7) {
  const c = document.createElement('canvas'); c.width = c.height = size
  const g = c.getContext('2d'); const d = g.createImageData(size, size); const r = rng(seed)
  for (let i = 0; i < size * size; i++) {
    const v = Math.round(128 + (r() + r() + r() - 1.5) * 120)
    d.data[i * 4] = d.data[i * 4 + 1] = d.data[i * 4 + 2] = clamp(v, 0, 255); d.data[i * 4 + 3] = 255
  }
  g.putImageData(d, 0, 0)
  return c.toDataURL()
}

// ── the mystery card: Juniper (Libra) behind her aura veil, as in app VeilPhoto.tsx ──
export const S3_FIRST = 6.867            // first visible S3 frame (frame 206)
// ── S3 beat map (REAL time; S3 owns 6.867 → 11.52, S4 fades in over it from 11.31) ──
//   6.867        blind full-frame Libra veil (identical to the frame S2's pixel mound resolves into)
//   6.95–7.75    PULL back: the veil is the art window of Juniper's mystery card, floating in deep space
//   7.0 –8.80    a moon behind the card waxes from a thin crescent to FULL exactly at the lock
//   7.35–7.80    seven chakra stars streak in from scattered points; orbit / wobble
//   7.95–8.77    they glide into one vertical column through the card (bottom red → top violet),
//                each one clicking into place at STAR_LOCK[i]; card trembles + charges, sky dims, dust is pulled in
//   8.80         LOCK: white flash, shockwave rings, god-rays, gold pixel burst (fx), 3-frame shake, chroma punch
//   8.86–9.88    "The stars aligned."
//   9.10–9.42    the mystery card flips over into Juniper's reveal card; the stars sink into it
//   9.30–9.62    camera pushes into the photo window · veil dissolves upward (LIFT) · aura-cam sweep (SWEEP)
//   10.03        resolve flash to the real photo (RES.peak) + sparkles
//   10.08–10.42  camera pulls back to the whole card · 10.38 gold-foil sweep · holo tilt · hold to 11.10
//   11.10–11.34  flip to the card back · 11.14–11.44 push into the indigo mark → S4
const PULL = { a: 6.92, b: 7.75 }
const LOCK = 8.72
const STAR_LOCK = Array.from({ length: 7 }, (_, i) => 8.36 + i * 0.055) // red → violet, 8.36 … 8.69
const STAR_IN = 7.35                      // first star streak (stagger 0.065, streak 0.42s)
const FLIP_IN = { a: 9.22, m: 9.36, b: 9.52 }
const LIFT = { a: 9.5, b: 9.95 }          // veil lift inside the reveal card's photo window
const SWEEP = { a: 9.56, b: 10.02 }         // aura-cam hue sweep red → violet
const RES = { a: 10.0, peak: 10.07, b: 10.22 } // resolve to real colour with a bloom flash at peak
const BACK_FLIP = 11.1
const CHAKRA = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff'].map((h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)))
const LAG = 1.25                          // outer aura lags the body's colour by this many hues (colour radiates outward)
/** chakra colour at continuous position x (0 = red … 6 = violet) */
function chakraAt(x) {
  x = clamp(x, 0, 6); const i = Math.min(5, Math.floor(x)), f = x - i
  const a = CHAKRA[i], b = CHAKRA[i + 1]
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]
}
/** sweep position at time t: 0 → 6 + LAG, lingering slightly on each hue so every colour registers */
function sweepAt(t) {
  const u = prog(t, SWEEP.a, SWEEP.b) * (6 + LAG)
  const i = Math.floor(u), f = u - i
  return i + lerp(f, f * f * (3 - 2 * f), 0.55)
}
const rgbS = (c, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`
const VPAD = { x: 96, y: 54 }            // veil canvas overscan so its blur never pulls in dark edges
const VW = W + VPAD.x * 2, VH = H + VPAD.y * 2
const VEIL_SRC = IMG + 'aura/libra.jpg'
// placement of libra.jpg (640×585; crop its dark 12px border) inside the visible frame
const VEIL_IMG = VERT ? { sw: 628, sh: 572, h: 1760, top: 70 } : { sw: 628, sh: 572, h: 1180, top: -150 }
// the reveal card's photo-window layer is always laid out in 16:9 frame coords (IW×IH); in vertical the
// veil drawn into it is a cover-crop of the tall veil (band centred at IVY of the visible frame)
const IW = VERT ? 1920 : W, IH = VERT ? 1080 : H, IVW = IW + VPAD.x * 2, IVH = IH + VPAD.y * 2, IVY = 900

/** cubic-bezier easing (same curve the app uses: [0.65, 0, 0.25, 1]) */
function bezier(x1, y1, x2, y2) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by
  return (x) => {
    if (x <= 0) return 0
    if (x >= 1) return 1
    let u = x
    for (let i = 0; i < 8; i++) { const fx = ((ax * u + bx) * u + cx) * u - x, d = (3 * ax * u + 2 * bx) * u + cx; if (Math.abs(fx) < 1e-6 || !d) break; u -= fx / d }
    return ((ay * u + by) * u + cy) * u
  }
}
const liftEase = bezier(0.42, 0, 0.38, 1)  // app uses [0.65,0,0.25,1]; softened so the dissolve reads over the whole 1.1s
const CAP = { eyebrow: 7.5, line: 7.62, out: 8.48, lock: 8.78, lockOut: 9.56 }   // caption beats

const veilSrc = typeof document !== 'undefined' ? document.createElement('img') : null
if (veilSrc) {
  veilSrc.src = VEIL_SRC; veilSrc.decoding = 'sync'
  Object.assign(veilSrc.style, { position: 'absolute', width: '1px', height: '1px', opacity: '0', pointerEvents: 'none', left: '-10px', top: '-10px' })
  document.body.appendChild(veilSrc) // main.js waits for document images
}
let veilCache = null
/** the static mystery-card veil (aura art, bloom, mauve vignette) as a VW×VH canvas; the
 *  visible frame is the centre W×H crop at (VPAD.x, VPAD.y). S2's pixel mound samples this too. */
export function veilCanvas() {
  if (veilCache) return veilCache
  if (!veilSrc || !veilSrc.complete || !veilSrc.naturalWidth) return null
  const c = document.createElement('canvas'); c.width = VW; c.height = VH
  const g = c.getContext('2d')
  g.fillStyle = '#120a2a'; g.fillRect(0, 0, VW, VH)
  // aura art, feathered at its sides so it melts into the indigo
  const ih = VEIL_IMG.h, iw = ih * VEIL_IMG.sw / VEIL_IMG.sh
  const ix = VW / 2 - iw / 2, iy = VPAD.y + VEIL_IMG.top
  const o = document.createElement('canvas'); o.width = VW; o.height = VH
  const og = o.getContext('2d')
  og.filter = 'blur(7px) saturate(1.3) brightness(1.1)'
  og.drawImage(veilSrc, 6, 2, VEIL_IMG.sw, VEIL_IMG.sh, ix, iy, iw, ih)
  og.filter = 'none'
  og.globalCompositeOperation = 'destination-in'
  const fx = og.createLinearGradient(ix, 0, ix + iw, 0)
  fx.addColorStop(0, 'rgba(0,0,0,0)'); fx.addColorStop(0.16, '#000'); fx.addColorStop(0.84, '#000'); fx.addColorStop(1, 'rgba(0,0,0,0)')
  og.fillStyle = fx; og.fillRect(0, 0, VW, VH)
  og.globalCompositeOperation = 'destination-in'
  const fy = og.createLinearGradient(0, iy, 0, iy + ih)
  fy.addColorStop(0, 'rgba(0,0,0,0)'); fy.addColorStop(0.1, '#000'); fy.addColorStop(0.92, '#000'); fy.addColorStop(1, 'rgba(0,0,0,0)')
  og.fillStyle = fy; og.fillRect(0, 0, VW, VH)
  g.drawImage(o, 0, 0)
  // glow: a wide soft bloom of the same art
  g.globalCompositeOperation = 'screen'
  g.filter = 'blur(60px)'; g.globalAlpha = 0.7; g.drawImage(o, 0, 0)
  g.filter = 'blur(18px)'; g.globalAlpha = 0.35; g.drawImage(o, 0, 0)
  g.filter = 'none'; g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'
  // the app's vignette: radial-gradient(70% 80% at 50% 40%, transparent 40%, rgba(77,26,73,0.6) 100%)
  g.save()
  g.translate(VW / 2, VPAD.y + H * 0.4); g.scale(1, (0.8 * H) / (0.7 * W))
  const rg = g.createRadialGradient(0, 0, 0, 0, 0, 0.7 * W)
  rg.addColorStop(0.4, 'rgba(77,26,73,0)'); rg.addColorStop(1, 'rgba(77,26,73,0.6)')
  g.fillStyle = rg; g.fillRect(-VW, -VH * 3, VW * 2, VH * 6)
  g.restore()
  return (veilCache = c)
}

/** Aura-camera print of a photo: a luminance gradient map (deep indigo → aura colour → white-hot)
 *  whose colour is chosen per radial band, so the hue radiates from the body out to the edges.
 *  Pure function of the sweep position s. */
function makeAuraPrint(src) {
  const cv = document.createElement('canvas')
  let L = null, band = null, id = null, w = 0, h = 0, lastS = null
  const NB = 40, D = [10, 5, 30], HOT = [255, 250, 240]
  const lut = new Uint8ClampedArray(NB * 256 * 3)
  function init() {
    if (L) return true
    if (!src.complete || !src.naturalWidth) return false
    w = src.naturalWidth; h = src.naturalHeight; cv.width = w; cv.height = h
    const g = cv.getContext('2d', { willReadFrequently: true })
    g.drawImage(src, 0, 0, w, h)
    const d = g.getImageData(0, 0, w, h).data
    const n = w * h, raw = new Float32Array(n), hist = new Uint32Array(256)
    for (let i = 0; i < n; i++) { const v = 0.3 * d[i * 4] + 0.59 * d[i * 4 + 1] + 0.11 * d[i * 4 + 2]; raw[i] = v; hist[v | 0]++ }
    // auto-levels (1st–99.5th percentile) so the map spans the whole ramp
    let acc = 0, lo = 0, hi = 255
    for (let v = 0; v < 256; v++) { acc += hist[v]; if (acc < n * 0.01) lo = v; if (acc < n * 0.995) hi = v }
    L = new Uint8Array(n); band = new Uint8Array(n)
    const cx = w * 0.47, cy = h * 0.6, rx = w * 0.62, ry = h * 0.62
    for (let y = 0, i = 0; y < h; y++) for (let x = 0; x < w; x++, i++) {
      L[i] = clamp((raw[i] - lo) / (hi - lo)) * 255
      const r = clamp(Math.hypot((x - cx) / rx, (y - cy) / ry))
      band[i] = Math.min(NB - 1, Math.floor(r * r * (3 - 2 * r) * NB))
    }
    id = g.createImageData(w, h)
    for (let i = 0; i < n; i++) id.data[i * 4 + 3] = 255
    return true
  }
  const mixc = (a, b, f) => [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]
  function draw(s) {
    if (!init() || s === lastS) return
    lastS = s
    for (let b = 0; b < NB; b++) {
      const r = (b + 0.5) / NB, c = chakraAt(s - LAG * r)
      // gradient-map stops: shadow (indigo, faint hue) → aura colour → film-burnt pastel → white-hot
      const stops = [[0, mixc(D, c, 0.12)], [0.24, mixc(D, c, 0.55)], [0.46, c], [0.7, mixc(c, HOT, 0.5)], [0.88, HOT], [1, HOT]]
      for (let v = 0, k = 0; v < 256; v++) {
        const l = v / 255
        while (k < stops.length - 2 && l > stops[k + 1][0]) k++
        const [l0, c0] = stops[k], [l1, c1] = stops[k + 1], f = clamp((l - l0) / (l1 - l0)), o = (b * 256 + v) * 3
        const ff = f * f * (3 - 2 * f)
        lut[o] = c0[0] + (c1[0] - c0[0]) * ff; lut[o + 1] = c0[1] + (c1[1] - c0[1]) * ff; lut[o + 2] = c0[2] + (c1[2] - c0[2]) * ff
      }
    }
    const px = id.data, n = w * h
    for (let i = 0, j = 0; i < n; i++, j += 4) { const o = (band[i] * 256 + L[i]) * 3; px[j] = lut[o]; px[j + 1] = lut[o + 1]; px[j + 2] = lut[o + 2] }
    cv.getContext('2d').putImageData(id, 0, 0)
  }
  return { cv, draw }
}

// ───────────────────────────────────────────────────── S3 · the stars align (mystery card → reveal)
// card-profile-3.png 1496×2238 (Juniper's veiled deck card): opaque body x 120..1374, y 114..2116; art window x 213..1296, y 337..916
const MYS = { w: 1496, h: 2238, win: { x: 213, y: 337, w: 1083, h: 579 } }
const M = VERT ? 0.58 : 0.33                                   // mystery card display scale once pulled back (≈ 494×739)
const M0 = Math.max(W / MYS.win.w, H / MYS.win.h) // scale at which its art window covers the whole frame
const WCX = MYS.win.x + MYS.win.w / 2 - MYS.w / 2, WCY = MYS.win.y + MYS.win.h / 2 - MYS.h / 2
const CC = VERT ? { x: 540, y: 780 } : { x: 960, y: 440 }                    // mystery card centre on screen (= world origin while the camera sits at fy = 100)
const MOON_R = VERT ? 480 : 400
const MOON_DY = VERT ? -300 : 0                 // moon centre relative to the card centre (vertical: centred above it)
const CHAKRA_HEX = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
const COL_Y = VERT ? (i) => CC.y + 480 - i * 160 : (i) => CC.y + 264 - i * 88     // the aligned column: red at the bottom … violet at the top
// where each star wanders before it aligns (screen px), streak order
const ANCHOR = VERT ? [[170, 1180], [900, 420], [260, 330], [860, 1130], [150, 640], [950, 800], [640, 160]]
  : [[300, 650], [1590, 250], [500, 170], [1430, 720], [230, 330], [1700, 560], [1260, 110]]
const ENTER_ORDER = [3, 0, 5, 2, 6, 1, 4]
const SQ = VERT ? 1.5 : 0.62                                  // orbit ellipse squash (vertical: tall)
const SZ = VERT ? 1.35 : 1                       // star size multiplier
const Z_PUSH = VERT ? 1.42 : 1.6                 // camera zoom when parked on the photo window

function starState(i, t) {
  const L = STAR_LOCK[i]
  const e = STAR_IN + ENTER_ORDER[i] * 0.065
  if (t < e) return null
  const [ax, ay] = ANCHOR[i]
  const dx = ax - CC.x, dy = (ay - CC.y) / SQ
  const r0 = Math.hypot(dx, dy), th0 = Math.atan2(dy, dx)
  // orbit slows down as the stars commit to the line
  const tt = t - 7.4
  const th = th0 + 0.24 * tt - 0.1 * Math.max(0, t - 8.2) * Math.max(0, t - 8.2)
  const wob = 1 - prog(t, 8.1, L)
  let ox = CC.x + r0 * Math.cos(th) + (noise1(t * 1.3, i * 7 + 1) - 0.5) * 36 * wob
  let oy = CC.y + SQ * r0 * Math.sin(th) + (noise1(t * 1.1, i * 7 + 3) - 0.5) * 30 * wob
  // streak in from beyond the frame along a gentle arc
  const v = ease.outCubic(prog(t, e, e + 0.42))
  if (v < 1) {
    const a0 = th0 + 0.55, R = 1500
    const px = CC.x + R * Math.cos(a0), py = CC.y + SQ * 1.25 * R * Math.sin(a0)
    const nx = -(oy - py), ny = ox - px, nl = Math.hypot(nx, ny) || 1
    const bulge = 140 * Math.sin(Math.PI * v)
    ox = lerp(px, ox, v) + nx / nl * bulge; oy = lerp(py, oy, v) + ny / nl * bulge
  }
  // glide into the column, then snap the last stretch
  const u = prog(t, 7.95, L - 0.1)
  const c = t < L - 0.1 ? 0.9 * ease.inOutQuad(u) : 0.9 + 0.1 * ease.inQuad(prog(t, L - 0.1, L))
  let x = lerp(ox, CC.x, c), y = lerp(oy, COL_Y(i), c)
  if (t > L) { const k = t - L; x += (i % 2 ? 1 : -1) * 9 * Math.exp(-k * 22) * Math.sin(k * 55) }
  return { x, y, c, enter: v, locked: t >= L }
}

/** the moon texture (pearl disc, maria, craters, limb darkening), drawn once */
function moonTexture(R) {
  const S = R * 2 + 4, c = document.createElement('canvas'); c.width = c.height = S
  const g = c.getContext('2d'), o = S / 2
  g.save(); g.beginPath(); g.arc(o, o, R, 0, 6.2832); g.clip()
  const base = g.createRadialGradient(o - R * 0.22, o - R * 0.26, R * 0.05, o, o, R)
  base.addColorStop(0, '#fbf6ec'); base.addColorStop(0.55, '#efe6d6'); base.addColorStop(0.88, '#ddd1c0'); base.addColorStop(1, '#c4b7a8')
  g.fillStyle = base; g.fillRect(0, 0, S, S)
  // maria (roughly where they sit on the real near side)
  const MARIA = [[-0.32, -0.3, 0.3, 0.24], [0.05, -0.38, 0.17, 0.14], [0.2, -0.12, 0.2, 0.17], [0.52, -0.22, 0.13, 0.11], [-0.55, 0.05, 0.28, 0.36],
    [-0.15, 0.2, 0.22, 0.16], [0.28, 0.24, 0.14, 0.12], [-0.05, -0.06, 0.12, 0.1], [0.42, 0.06, 0.1, 0.12]]
  g.filter = `blur(${R * 0.05}px)`
  for (const [x, y, rx, ry] of MARIA) { g.fillStyle = 'rgba(132,118,138,0.34)'; g.beginPath(); g.ellipse(o + x * R, o + y * R, rx * R, ry * R, 0.3, 0, 6.2832); g.fill() }
  g.filter = `blur(${R * 0.012}px)`
  const r = rng(4242)
  for (let k = 0; k < 46; k++) {
    const a = r() * 6.2832, d = Math.sqrt(r()) * 0.92, cr = (0.012 + r() * r() * 0.06) * R
    const x = o + Math.cos(a) * d * R, y = o + Math.sin(a) * d * R
    g.strokeStyle = 'rgba(120,104,120,0.28)'; g.lineWidth = cr * 0.35; g.beginPath(); g.arc(x, y, cr, 0, 6.2832); g.stroke()
    g.strokeStyle = 'rgba(255,252,244,0.35)'; g.lineWidth = cr * 0.2; g.beginPath(); g.arc(x - cr * 0.12, y - cr * 0.12, cr * 0.9, 3.4, 5.4); g.stroke()
  }
  // Tycho + rays
  g.filter = 'none'
  const tx = o - 0.12 * R, ty = o + 0.62 * R
  for (let k = 0; k < 14; k++) {
    const a = r() * 6.2832, l = (0.2 + r() * 0.5) * R
    const lg = g.createLinearGradient(tx, ty, tx + Math.cos(a) * l, ty + Math.sin(a) * l)
    lg.addColorStop(0, 'rgba(255,252,246,0.22)'); lg.addColorStop(1, 'rgba(255,252,246,0)')
    g.strokeStyle = lg; g.lineWidth = R * 0.008; g.beginPath(); g.moveTo(tx, ty); g.lineTo(tx + Math.cos(a) * l, ty + Math.sin(a) * l); g.stroke()
  }
  g.fillStyle = 'rgba(255,253,248,0.6)'; g.beginPath(); g.arc(tx, ty, R * 0.022, 0, 6.2832); g.fill()
  // limb darkening
  const limb = g.createRadialGradient(o, o, R * 0.6, o, o, R)
  limb.addColorStop(0, 'rgba(70,50,90,0)'); limb.addColorStop(1, 'rgba(70,50,90,0.28)')
  g.fillStyle = limb; g.fillRect(0, 0, S, S)
  g.restore()
  return c
}

/** 4-point sparkle (vector) */
function sparkle(g, x, y, s, rgb, a) {
  g.fillStyle = `rgba(${rgb},${a})`
  g.beginPath(); g.moveTo(x, y - s)
  g.quadraticCurveTo(x + s * 0.12, y - s * 0.12, x + s, y); g.quadraticCurveTo(x + s * 0.12, y + s * 0.12, x, y + s)
  g.quadraticCurveTo(x - s * 0.12, y + s * 0.12, x - s, y); g.quadraticCurveTo(x - s * 0.12, y - s * 0.12, x, y - s); g.fill()
}

export function sceneVeil(stage) {
  const root = fill(stage, { background: C.void })
  // ── deep space
  const sky = el('div', { position: 'absolute', inset: 0, background: 'radial-gradient(70% 80% at 50% 42%, #24124a 0%, #150b33 55%, #0b0620 100%)' }, root)
  const stars = makeStars(sky, 140, 21)
  const nebula = el('div', { position: 'absolute', inset: 0, mixBlendMode: 'screen', background: 'radial-gradient(40% 50% at 22% 70%, rgba(180,92,255,0.16), rgba(180,92,255,0) 70%), radial-gradient(36% 44% at 82% 26%, rgba(232,98,138,0.12), rgba(232,98,138,0) 70%)' }, sky)
  const dim = el('div', { position: 'absolute', inset: 0, background: '#07041a', opacity: 0 }, root)

  const shakeBox = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  // ── camera (world origin = screen centre; transform translate(-Z·fx, -Z·fy) scale(Z))
  const cam = el('div', { position: 'absolute', left: W / 2 + 'px', top: H / 2 + 'px', width: 0, height: 0 }, shakeBox)
  // moon
  const moonGlow = el('div', { position: 'absolute', left: -MOON_R * 2.2 + 'px', top: MOON_DY - MOON_R * 2.2 + 'px', width: MOON_R * 4.4 + 'px', height: MOON_R * 4.4 + 'px', borderRadius: '50%', mixBlendMode: 'screen', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(255,244,226,0.55) 40%, rgba(232,214,255,0.22) 52%, rgba(180,140,255,0.08) 70%, rgba(180,140,255,0) 100%)' }, cam)
  const MS = MOON_R * 2 + 40
  const moonCv = el('canvas', { position: 'absolute', left: -MS / 2 + 'px', top: MOON_DY - MS / 2 + 'px', width: MS + 'px', height: MS + 'px', opacity: 0 }, cam)
  moonCv.width = moonCv.height = MS
  const moonMask = document.createElement('canvas'); moonMask.width = moonMask.height = MS
  let moonTex = null, moonLast = -1
  function drawMoon(f) {
    if (!moonTex) moonTex = moonTexture(MOON_R)
    if (f === moonLast) return
    moonLast = f
    const g = moonCv.getContext('2d'), m = moonMask.getContext('2d'), o = MS / 2, R = MOON_R
    g.clearRect(0, 0, MS, MS)
    // earthshine on the dark limb
    g.globalAlpha = 0.05; g.drawImage(moonTex, o - moonTex.width / 2, o - moonTex.height / 2); g.globalAlpha = 1
    // lit region: right half-disc ± terminator half-ellipse (waxing, lit from the right)
    const cphi = 1 - 2 * f
    m.clearRect(0, 0, MS, MS)
    m.filter = `blur(${R * 0.022}px)`
    m.fillStyle = '#fff'; m.beginPath(); m.moveTo(o, o - R)
    m.arc(o, o, R, -Math.PI / 2, Math.PI / 2, false)
    m.ellipse(o, o, Math.max(0.01, Math.abs(cphi) * R), R, 0, Math.PI / 2, -Math.PI / 2, cphi > 0)
    m.closePath(); m.fill(); m.filter = 'none'
    m.globalCompositeOperation = 'source-in'; m.drawImage(moonTex, o - moonTex.width / 2, o - moonTex.height / 2); m.globalCompositeOperation = 'source-over'
    g.drawImage(moonMask, 0, 0)
  }
  // god-rays from the column (irregular conic spokes, radially faded)
  const rr = rng(909); let stops = [], ang = 0
  while (ang < 360) { const w = 1 + rr() * 3.2, gap = 2 + rr() * 9, a = (0.25 + rr() * 0.75).toFixed(2); stops.push(`rgba(255,240,214,0) ${ang.toFixed(1)}deg`, `rgba(255,240,214,${a}) ${(ang + w / 2).toFixed(1)}deg`, `rgba(255,240,214,0) ${(ang + w).toFixed(1)}deg`); ang += w + gap }
  const RAYS = VERT ? 3000 : 2600
  const rays = el('div', { position: 'absolute', left: -RAYS / 2 + 'px', top: -RAYS / 2 + 'px', width: RAYS + 'px', height: RAYS + 'px', mixBlendMode: 'screen', opacity: 0, pointerEvents: 'none',
    background: `conic-gradient(from 0deg, ${stops.join(',')})`,
    webkitMaskImage: 'radial-gradient(closest-side, #000 6%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0) 100%)', maskImage: 'radial-gradient(closest-side, #000 6%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0) 100%)' }, cam)
  // ── the reveal card (front) / card back, in world coords
  const world = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0 }, cam)
  const front = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, backfaceVisibility: 'hidden' }, world)
  el('div', { position: 'absolute', left: (64 - REV.w / 2) * D + 'px', top: (123 - REV.h / 2) * D + 'px', width: 1431 * D + 'px', height: 2498 * D + 'px', borderRadius: 100 * D + 'px', boxShadow: '0 0 34px 4px rgba(255,150,232,0.32), 0 30px 80px rgba(5,2,18,0.55)' }, front)
  img(front, A + 'card-reveal.png', { left: -REV.w * D / 2 + 'px', top: -REV.h * D / 2 + 'px', width: REV.w * D + 'px', height: REV.h * D + 'px', clipPath: `inset(${123 * D}px ${65 * D}px ${119 * D}px ${64 * D}px round ${100 * D}px)` })
  const BODY = { x: 66 * D, y: 123 * D, w: (1494 - 66) * D, h: (2620 - 123) * D, r: 100 * D }
  const bodyBox = (z) => el('div', {
    position: 'absolute', left: (-REV.w * D / 2 + BODY.x) + 'px', top: (-REV.h * D / 2 + BODY.y) + 'px', width: BODY.w + 'px', height: BODY.h + 'px',
    borderRadius: BODY.r + 'px', overflow: 'hidden', pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0, zIndex: z,
  }, front)
  // photo window frame: the veil (mystery) → aura-cam print → real photo
  const frame = el('div', { position: 'absolute', overflow: 'hidden', background: C.raised, borderRadius: '14px',
    left: (WIN.x + INSET) + 'px', top: (WIN.y + INSET) + 'px', width: (WIN.w - INSET * 2) + 'px', height: (WIN.h - INSET * 2) + 'px' }, front)
  const fw = WIN.w - INSET * 2, fh = WIN.h - INSET * 2
  const real = img(frame, IMG + 'juniper.jpg', { left: '50%', top: '50%', width: '1920px', height: '2560px', objectFit: 'cover' })
  real.style.transform = `translate(-50%,-50%) translateY(${IMG_END_TY}px) scale(${IMG_END_SCALE})`
  const aura = makeAuraPrint(real)
  const auraCv = aura.cv
  Object.assign(auraCv.style, { position: 'absolute', left: '50%', top: '50%', width: '1920px', height: '2560px', display: 'none', transform: real.style.transform })
  frame.appendChild(auraCv)
  const auraFx = el('div', { position: 'absolute', inset: 0, pointerEvents: 'none', display: 'none' }, frame)
  const halo = el('div', { position: 'absolute', inset: 0, mixBlendMode: 'screen' }, auraFx)
  const edgeField = el('div', { position: 'absolute', inset: 0, mixBlendMode: 'screen' }, auraFx)
  const leak = el('div', { position: 'absolute', left: '-20%', top: '-30%', width: '70%', height: '160%', mixBlendMode: 'screen' }, auraFx)
  el('div', { position: 'absolute', inset: 0, background: 'radial-gradient(75% 95% at 50% 42%, rgba(10,5,30,0) 55%, rgba(10,5,30,0.55) 100%)' }, auraFx)
  // a full-frame-sized layer scaled to cover the window: veil, seam, sparkles, flash use 1920×1080 coords
  const sB = Math.max(fw / IW, fh / IH)
  const inner = el('div', { position: 'absolute', left: (fw - IW) / 2 + 'px', top: (fh - IH) / 2 + 'px', width: IW + 'px', height: IH + 'px', transform: `scale(${sB})` }, frame)
  const flash = el('div', { position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0, background: 'radial-gradient(60% 75% at 48% 30%, rgba(255,252,244,1) 0%, rgba(255,244,228,0.85) 45%, rgba(255,236,250,0.5) 100%)' }, inner)
  const veil = el('div', { position: 'absolute', left: -VPAD.x + 'px', top: -VPAD.y + 'px', width: IVW + 'px', height: IVH + 'px', willChange: 'transform, filter' }, inner)
  const veilCvB = el('canvas', { position: 'absolute', left: 0, top: 0, width: IVW + 'px', height: IVH + 'px' }, veil)
  veilCvB.width = IVW; veilCvB.height = IVH
  const seam = el('div', {
    position: 'absolute', left: '-10%', right: '-10%', top: 0, height: '200px', opacity: 0, pointerEvents: 'none', mixBlendMode: 'screen',
    background: 'radial-gradient(50% 50% at 50% 50%, rgba(255,250,235,0.9) 0%, rgba(255,189,246,0.5) 35%, rgba(242,199,92,0.16) 60%, transparent 75%)',
  }, inner)
  const SPK = (() => {
    const r = rng(77)
    return Array.from({ length: 14 }, (_, i) => ({ x: lerp(380, 1540, r()), y: lerp(90, 900, r()), s: lerp(30, 80, r()), d: r() * 0.22, rot: r() * 40 - 20, gold: i % 3 === 0 }))
  })()
  const sparks = SPK.map((k) => {
    const e = el('div', { position: 'absolute', left: (k.x - 50) + 'px', top: (k.y - 50) + 'px', width: '100px', height: '100px', opacity: 0, mixBlendMode: 'screen', pointerEvents: 'none' }, inner)
    const col = k.gold ? '255,228,160' : '255,236,250'
    e.innerHTML = `<svg viewBox="-50 -50 100 100" width="100" height="100" style="overflow:visible"><defs><radialGradient id="sg"><stop offset="0" stop-color="rgba(${col},0.9)"/><stop offset="1" stop-color="rgba(${col},0)"/></radialGradient></defs>` +
      `<circle r="22" fill="url(#sg)"/><path d="M0,-50 C3,-6 6,-3 50,0 C6,3 3,6 0,50 C-3,6 -6,3 -50,0 C-6,-3 -3,-6 0,-50Z" fill="rgb(${col})"/></svg>`
    return e
  })
  const grainB = el('div', { position: 'absolute', inset: 0, backgroundImage: `url(${grainURL()})`, backgroundSize: '256px 256px', mixBlendMode: 'overlay', opacity: 0, pointerEvents: 'none' }, frame)
  // gold-foil sweep + holo sheen over the card body
  const glintBox = bodyBox(3)
  const glint = el('div', {
    position: 'absolute', top: '-30%', left: 0, width: '220px', height: '160%',
    background: 'linear-gradient(90deg, rgba(242,199,92,0) 0%, rgba(242,199,92,0.14) 36%, rgba(255,228,160,0.6) 48.5%, rgba(255,246,220,0.95) 50%, rgba(255,228,160,0.6) 51.5%, rgba(242,199,92,0.14) 64%, rgba(242,199,92,0) 100%)',
    transform: 'skewX(-24deg)',
  }, glintBox)
  const holoBox = bodyBox(2)
  const holo = el('div', { position: 'absolute', left: '-60%', top: '-60%', width: '220%', height: '220%',
    background: 'linear-gradient(115deg, rgba(255,45,58,0) 30%, rgba(255,122,46,0.16) 36%, rgba(255,210,63,0.18) 40%, rgba(95,220,84,0.16) 44%, rgba(47,208,230,0.18) 48%, rgba(74,114,255,0.16) 52%, rgba(180,92,255,0.16) 56%, rgba(180,92,255,0) 62%)' }, holoBox)
  // card back (seed of life + chakra column)
  const back = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, backfaceVisibility: 'hidden' }, world)
  el('div', { position: 'absolute', left: (120 - BACK.w / 2) * DB + 'px', top: (119 - BACK.h / 2) * DB + 'px', width: 1320 * DB + 'px', height: 2108 * DB + 'px', borderRadius: 84 * DB + 'px', boxShadow: '0 0 34px 4px rgba(170,140,255,0.35)' }, back)
  img(back, A + 'card-back.png', { left: -BACK.w * DB / 2 + 'px', top: -BACK.h * DB / 2 + 'px', width: BACK.w * DB + 'px', height: BACK.h * DB + 'px', clipPath: `inset(${119 * DB}px ${88 * DB}px ${120 * DB}px ${120 * DB}px round ${84 * DB}px)` })
  const backDim = el('div', { position: 'absolute', left: -BACK.w * DB / 2 + 'px', top: -BACK.h * DB / 2 + 'px', width: BACK.w * DB + 'px', height: BACK.h * DB + 'px', background: 'radial-gradient(closest-side, rgba(20,10,46,0.9), rgba(20,10,46,1))', opacity: 0, pointerEvents: 'none' }, back)

  // ── the mystery card (screen space) + the full-frame veil window it pulls back from
  const pre = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, shakeBox)
  const mHolder = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0 }, pre)
  // the PNGs carry a dark semi-transparent haze around the body that reads as a grey box over the moon:
  // clip every card to its opaque body and give it a clean rim glow of our own
  const mGlow = el('div', { position: 'absolute', left: (120 - MYS.w / 2) + 'px', top: (114 - MYS.h / 2) + 'px', width: '1254px', height: '2002px', borderRadius: '84px' }, mHolder)
  const mCard = img(mHolder, A + 'card-profile-3.png', { left: -MYS.w / 2 + 'px', top: -MYS.h / 2 + 'px', width: MYS.w + 'px', height: MYS.h + 'px', clipPath: 'inset(114px 122px 122px 120px round 84px)' })
  const frameA = el('div', { position: 'absolute', overflow: 'hidden', background: '#120a2a' }, pre)
  const veilA = el('canvas', { position: 'absolute', left: 0, top: 0, width: VW + 'px', height: VH + 'px', transformOrigin: '50% 50%' }, frameA)
  veilA.width = VW; veilA.height = VH
  const grainA = el('div', { position: 'absolute', inset: 0, backgroundImage: `url(${grainURL()})`, backgroundSize: '256px 256px', mixBlendMode: 'overlay', opacity: 0.30, pointerEvents: 'none' }, frameA)
  let veilDrawn = false

  // ── stars / lines / dust / rings (screen space, rides the shake)
  const fxCv = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, shakeBox)
  fxCv.width = W; fxCv.height = H
  const fx = fxCv.getContext('2d')
  const DUST = (() => { const r = rng(515); return Array.from({ length: 170 }, (_, i) => ({ x: r() * W, y: r() * H, s: 0.7 + r() * 1.8, a: 0.35 + r() * 0.65, col: i % 5 === 0 ? '242,199,92' : i % 7 === 0 ? CHAKRA[i % 7].join(',') : '255,246,234', ph: r() * 6.28 })) })()
  const SPK2 = (() => { const r = rng(616); return Array.from({ length: 18 }, () => ({ a: r() * 6.2832, r0: 380 + r() * 80, r1: 560 + r() * 160, d: r() * 0.16, s: 10 + r() * 16, gold: r() < 0.45 })) })()

  // flash over everything in the scene
  const bigFlash = el('div', { position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0,
    background: `radial-gradient(55% 75% at 50% ${CC.y / H * 100}%, rgba(255,253,248,1) 0%, rgba(255,246,232,0.92) 40%, rgba(240,226,255,0.7) 100%)` }, root)

  // ── captions
  const scrim = el('div', { position: 'absolute', left: 0, right: 0, bottom: 0, height: VERT ? '820px' : '420px', background: 'linear-gradient(180deg, rgba(11,6,32,0.000) 0%, rgba(11,6,32,0.022) 10%, rgba(11,6,32,0.083) 20%, rgba(11,6,32,0.173) 30%, rgba(11,6,32,0.282) 40%, rgba(11,6,32,0.400) 50%, rgba(11,6,32,0.518) 60%, rgba(11,6,32,0.627) 70%, rgba(11,6,32,0.717) 80%, rgba(11,6,32,0.778) 90%, rgba(11,6,32,0.800) 100%)', opacity: 0 }, root)
  const capBox = el('div', { position: 'absolute', left: '50%', bottom: VERT ? '330px' : '74px', transform: 'translateX(-50%)', textAlign: 'center', whiteSpace: 'nowrap' }, root)
  const eyebrow = el('div', { fontFamily: MONO, fontSize: VERT ? '27px' : '21px', letterSpacing: '0.28em', color: 'rgba(239,230,214,0.92)', textShadow: '0 1px 12px rgba(11,6,32,0.8)', marginBottom: VERT ? '20px' : '14px', textTransform: 'uppercase', opacity: 0 }, capBox, '✦&nbsp;&nbsp;Blind by design&nbsp;&nbsp;✦')
  const capLine = el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: VERT ? '84px' : '72px', lineHeight: 1.05, color: C.bone, textShadow: '0 2px 30px rgba(11,6,32,0.85), 0 1px 3px rgba(11,6,32,0.7)', opacity: 0 }, capBox, VERT ? 'The stars are giving<br>you a chance.' : 'The stars are giving you a chance.')
  const lockBox = el('div', { position: 'absolute', left: '50%', bottom: VERT ? '362px' : '70px', transform: 'translateX(-50%)', textAlign: 'center', whiteSpace: 'nowrap' }, root)
  const lockLine = el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: VERT ? '104px' : '112px', lineHeight: 1, color: C.bone, opacity: 0,
    textShadow: '0 0 40px rgba(255,236,200,0.45), 0 2px 34px rgba(11,6,32,0.9), 0 1px 3px rgba(11,6,32,0.7)' }, lockBox, 'The stars aligned.')
  // aura-cam readout
  const tag = el('div', { position: 'absolute', left: '72px', top: VERT ? '250px' : '64px', opacity: 0, fontFamily: MONO, fontSize: VERT ? '24px' : '18px', letterSpacing: '0.28em', color: 'rgba(239,230,214,0.92)', textShadow: '0 1px 10px rgba(11,6,32,0.65)', textTransform: 'uppercase' }, root)
  const tagRow = el('div', { display: 'flex', alignItems: 'center', gap: '14px' }, tag)
  const tagDot = el('div', { width: '12px', height: '12px', borderRadius: '50%' }, tagRow)
  el('div', {}, tagRow, 'Aura reading')
  const tagBar = el('div', { display: 'flex', gap: '5px', marginTop: '14px', marginLeft: '26px' }, tag)
  const tagSegs = CHAKRA.map((c) => el('div', { width: '26px', height: '4px', borderRadius: '2px', background: rgbS(c), opacity: 0.25 }, tagBar))

  return {
    start: 6.8, end: 11.52, root,
    update(t) {
      if (!veilDrawn) { const vc = veilCanvas(); if (vc) { veilA.getContext('2d').drawImage(vc, 0, 0); if (VERT) { const k = IVW / VW, sh = IVH / k; veilCvB.getContext('2d').drawImage(vc, 0, VPAD.y + IVY - sh / 2, VW, sh, 0, 0, IVW, IVH) } else veilCvB.getContext('2d').drawImage(vc, 0, 0); veilDrawn = true } }
      const fi = Math.round(t * 30), lockF = Math.round(LOCK * 30)
      const gr = rng(fi * 131 + 17), grainPos = `${Math.floor(gr() * 256)}px ${Math.floor(gr() * 256)}px`

      // ══ 1 · pull back from the full-frame veil to the mystery card ══
      const e = ease.inOutCubic(prog(t, PULL.a, PULL.b))
      const m = Math.exp(lerp(Math.log(M0), Math.log(M), e))
      const wcx = lerp(W / 2, CC.x + WCX * M, e), wcy = lerp(H / 2, CC.y + WCY * M, e)  // art-window centre on screen
      const cx = wcx - WCX * m, cy = wcy - WCY * m                                      // card centre
      const ww = MYS.win.w * m, wh = MYS.win.h * m
      const fx0 = Math.max(0, wcx - ww / 2), fy0 = Math.max(0, wcy - wh / 2)
      const fx1 = Math.min(W, wcx + ww / 2), fy1 = Math.min(H, wcy + wh / 2)
      const faw = fx1 - fx0, fah = fy1 - fy0
      const artX = prog(t, 7.5, 7.78)      // the card's own window art takes over from the full-frame veil
      frameA.style.display = artX >= 1 ? 'none' : 'block'
      if (artX < 1) {
        Object.assign(frameA.style, { left: fx0 + 'px', top: fy0 + 'px', width: faw + 'px', height: fah + 'px', opacity: String(1 - ease.inOutQuad(artX)), borderRadius: lerp(0, 12, e) + 'px' })
        const breath = 1 + 0.018 * ease.inOutQuad(prog(t, S3_FIRST, PULL.a + 0.15)) * (1 - e)
        const s = Math.max(m / M0, faw / VW, fah / VH) * breath
        veilA.style.left = (wcx - fx0 - VW / 2) + 'px'; veilA.style.top = (wcy - fy0 - VH / 2) + 'px'
        veilA.style.transform = `scale(${s})`
        grainA.style.backgroundPosition = grainPos
        grainA.style.opacity = String(lerp(0.30, 0.12, prog(t, PULL.a, PULL.a + 0.4)))
      }

      // ══ 2 · anticipation: tension curve ══
      const ten = ease.inQuad(prog(t, 7.95, LOCK))        // 0 → 1 into the lock
      const post = t >= LOCK ? 1 - ease.outCubic(prog(t, LOCK, LOCK + 0.5)) : 0
      // card float, tremble, charge glow
      const floatA = prog(t, PULL.b, PULL.b + 0.4)
      const bob = Math.sin((t - PULL.b) * 2.4) * 5 * floatA
      const trem = ten * ten * 4.5 * (t < LOCK ? 1 : 0)
      const jx = (noise1(t * 38, 5) - 0.5) * 2 * trem, jy = (noise1(t * 41, 9) - 0.5) * 2 * trem, jr = (noise1(t * 33, 13) - 0.5) * 1.2 * trem / 4.5
      // flip-out: mystery card turns edge-on (then the reveal card turns in)
      const fo = ease.inQuad(prog(t, FLIP_IN.a, FLIP_IN.m))
      pre.style.display = t >= FLIP_IN.m ? 'none' : 'block'
      const kick = t >= LOCK ? 0.035 * Math.sin(Math.PI * prog(t, LOCK, LOCK + 0.3)) : 0
      mHolder.style.transform = `translate(${cx + jx}px, ${cy + jy + bob}px) perspective(1600px) rotateY(${90 * fo}deg) rotate(${jr}deg) scale(${m * (1 + kick + 0.04 * fo)})`
      const glow = Math.max(ten, post)
      mCard.style.filter = glow > 0.002 ? `brightness(${1 + 0.22 * glow + 0.5 * post})` : 'none'
      mGlow.style.boxShadow = `0 0 ${(lerp(36, 110, glow) / m).toFixed(1)}px ${(lerp(4, 22, glow) / m).toFixed(1)}px rgba(255,${Math.round(lerp(150, 228, glow))},${Math.round(lerp(232, 246, glow))},${(0.4 + 0.5 * glow).toFixed(3)}), 0 ${(30 / m).toFixed(1)}px ${(80 / m).toFixed(1)}px rgba(5,2,18,0.55)`
      dim.style.opacity = String(0.55 * ten * (t < LOCK ? 1 : 0) + (t >= LOCK ? 0.55 * (1 - ease.outQuad(prog(t, LOCK, LOCK + 0.5))) * 0.4 : 0))
      stars.style.opacity = String(1 - 0.5 * ten * (t < LOCK ? 1 : 0))

      // ══ moon: crescent → full exactly at the lock ══
      const lit = 0.045 + 0.955 * Math.pow(prog(t, 7.0, LOCK), 2)
      drawMoon(Math.round(lit * 400) / 400)
      const moonIn = ease.inOutQuad(prog(t, 7.05, 7.7)) * (1 - ease.inOutQuad(prog(t, BACK_FLIP + 0.02, BACK_FLIP + 0.26)))
      const mScale = lerp(1.12, 1, ease.outCubic(prog(t, PULL.a, PULL.b + 0.3)))
      moonCv.style.opacity = String(0.82 * moonIn)
      moonCv.style.transform = `scale(${mScale})`
      moonGlow.style.opacity = String(moonIn * (0.12 + 0.55 * lit * lit + 0.5 * post))
      moonGlow.style.transform = `scale(${mScale * (1 + 0.15 * post)})`

      // ══ camera ══
      const push = ease.inOutCubic(prog(t, 9.4, 9.7)), pull = ease.inOutCubic(prog(t, 10.12, 10.44))
      const winCy = WIN.y + WIN.h / 2
      const Z = lerp(lerp(1, Z_PUSH, push), 1, pull)
      // camera focus fy = world point placed at screen centre; the mystery phase puts world origin at CC.y
      const fyUse = t < 9.4 ? -(CC.y - H / 2) : lerp(lerp(-(CC.y - H / 2), winCy, push), 0, pull)
      cam.style.transform = `translate(0px, ${-Z * fyUse}px) scale(${Z})`
      // shake (3 frames) + chromatic punch on the lock
      const sf = fi - lockF
      const SH = [[-16, 10], [12, -8], [-6, 5]]
      const sh = sf >= 0 && sf < 3 ? SH[sf] : [0, 0]
      shakeBox.style.transform = `translate(${sh[0]}px, ${sh[1]}px)`
      const CH = [14, 9, 5, 2]
      shakeBox.style.filter = sf >= 0 && sf < 4 ? `drop-shadow(${CH[sf]}px 0 0 rgba(255,40,90,0.6)) drop-shadow(${-CH[sf]}px 0 0 rgba(60,190,255,0.6))` : 'none'

      // ══ 3 · the lock: flash + rays ══
      const fl = t < LOCK ? ease.inQuad(prog(t, LOCK - 0.06, LOCK)) * 0.5 : 0.78 * (1 - ease.outCubic(prog(t, LOCK, LOCK + 0.32)))
      bigFlash.style.opacity = String(fl)
      const rayO = t < LOCK ? 0.2 * ease.inQuad(prog(t, 8.4, LOCK)) : 0.7 * (1 - ease.inOutQuad(prog(t, LOCK + 0.05, 9.6)))
      rays.style.opacity = String(rayO)
      rays.style.transform = `rotate(${(t - 8) * 7}deg) scale(${t < LOCK ? 0.7 : lerp(0.75, 1.15, ease.outCubic(prog(t, LOCK, 9.6)))})`

      // ══ reveal card: flip in, veil lift, aura-cam, resolve ══
      const fin = ease.outCubic(prog(t, FLIP_IN.m, FLIP_IN.b))
      const aIn = t < FLIP_IN.m ? -90 : -90 * (1 - fin)
      const tiltU = prog(t, 10.3, BACK_FLIP)
      const tilt = 7 * Math.sin(Math.PI * tiltU) * Math.sin(2 * Math.PI * 0.75 * tiltU)
      const tiltX = 2.5 * Math.sin(Math.PI * tiltU) * Math.cos(2 * Math.PI * 0.6 * tiltU)
      const a = 180 * ease.inOutCubic(prog(t, BACK_FLIP, BACK_FLIP + 0.24))
      const ang = aIn + tilt + a
      front.style.transform = `perspective(1800px) rotateX(${tiltX}deg) rotateY(${ang}deg)`
      back.style.transform = `perspective(1800px) rotateY(${ang - 180}deg)`
      const showCard = t >= FLIP_IN.m
      front.style.visibility = showCard && Math.abs(ang) < 90 ? 'visible' : 'hidden'
      back.style.visibility = showCard && ang >= 90 ? 'visible' : 'hidden'
      world.style.display = showCard ? 'block' : 'none'

      const p = liftEase(prog(t, LIFT.a, LIFT.b))
      const fb = Math.pow(1 - prog(t, LIFT.a + 0.05, LIFT.b + 0.12), 2)
      const auraO = 1 - ease.inOutQuad(prog(t, RES.a + 0.02, RES.b - 0.04))
      const rfl = t < RES.peak ? ease.inQuad(prog(t, RES.a, RES.peak)) : 1 - ease.outQuad(prog(t, RES.peak, RES.peak + 0.2))
      const after = t < RES.peak ? 0 : 1 - ease.outCubic(prog(t, RES.peak, RES.peak + 0.35))
      if (showCard) {
        real.style.filter = `blur(${40 * fb}px) saturate(${lerp(0.6, 1.08, p)}) brightness(${1 + 0.3 * after})`
        flash.style.opacity = String(0.85 * rfl)
        const sw = sweepAt(t)
        veil.style.display = p >= 1 ? 'none' : 'block'
        const edge = lerp(0, 135, p)
        veil.style.webkitMaskImage = veil.style.maskImage = p <= 0 ? 'none' : `linear-gradient(to top, transparent ${edge - 35}%, #000 ${edge}%)`
        veil.style.transform = `translateY(${-IH * 0.18 * p}px) scale(${1 + 0.04 * p})`
        veil.style.filter = p <= 0 ? 'none' : `blur(${lerp(0, 22, p)}px) brightness(${1 + 0.12 * Math.sin(Math.PI * clamp(p * 1.4))})`
        const seamO = p < 0.08 ? p / 0.08 : p < 0.75 ? lerp(1, 0.9, (p - 0.08) / 0.67) : lerp(0.9, 0, (p - 0.75) / 0.25)
        seam.style.opacity = String(p <= 0 ? 0 : seamO)
        seam.style.transform = `translateY(${IH * (1 - (p * 1.35 - 0.175)) - 100}px)`
        const pk = prog(t, RES.peak - 0.04, RES.peak + 0.51)
        SPK.forEach((k, i) => {
          const q = prog(pk, k.d, k.d + 0.6), s = sparks[i]
          if (q <= 0 || q >= 1) { s.style.opacity = '0'; return }
          s.style.opacity = String(Math.min(1, Math.sin(Math.PI * q) * 1.4))
          s.style.transform = `rotate(${k.rot + q * 45}deg) scale(${k.s / 50 * Math.sin(Math.PI * q)})`
        })
        grainB.style.backgroundPosition = grainPos
        grainB.style.opacity = String(0.14 * auraO)
        const showAura = auraO > 0.001
        auraCv.style.display = auraFx.style.display = showAura ? 'block' : 'none'
        if (showAura) {
          aura.draw(Math.round(sw * 1000) / 1000)
          auraCv.style.opacity = String(auraO)
          auraCv.style.filter = `blur(${40 * fb + 1}px) contrast(1.06)`
          auraFx.style.opacity = String(auraO)
          const hx = fw / 2 + (335 * 8 / 3 - 960) * IMG_END_SCALE, hy = fh / 2 + IMG_END_TY + (520 * 8 / 3 - 1280) * IMG_END_SCALE
          const cIn = chakraAt(sw), cOut = chakraAt(sw - LAG - 0.2), cLeak = chakraAt(sw + 0.9)
          const is = IMG_END_SCALE
          halo.style.background = `radial-gradient(${560 * is}px ${640 * is}px at ${hx}px ${hy + 120 * is}px, rgba(255,250,240,0.0) 0%, rgba(255,250,240,0.18) 26%, ${rgbS(cIn, 0.42)} 44%, ${rgbS(cIn, 0.22)} 66%, ${rgbS(cIn, 0)} 100%)`
          edgeField.style.background = `radial-gradient(78% 105% at 50% 40%, ${rgbS(cOut, 0)} 48%, ${rgbS(cOut, 0.5)} 100%)`
          leak.style.left = lerp(-10, 85, ease.inOutQuad(prog(t, SWEEP.a - 0.1, RES.b))) + '%'
          leak.style.background = `radial-gradient(closest-side, rgba(255,246,232,0.35) 0%, ${rgbS(cLeak, 0.4)} 35%, ${rgbS(cLeak, 0)} 100%)`
          leak.style.transform = `rotate(${lerp(-14, 10, prog(t, SWEEP.a - 0.1, RES.b))}deg)`
        }
        const tagO = ease.outQuad(prog(t, SWEEP.a - 0.05, SWEEP.a + 0.1)) * (1 - ease.inQuad(prog(t, RES.a, RES.peak + 0.02)))
        tag.style.opacity = String(tagO)
        if (tagO > 0) {
          const cur = Math.round(clamp(sw, 0, 6))
          tagDot.style.background = rgbS(chakraAt(sw)); tagDot.style.boxShadow = `0 0 14px 3px ${rgbS(chakraAt(sw), 0.8)}`
          tagSegs.forEach((s, i) => { s.style.opacity = String(i < cur ? 0.6 : i === cur ? 1 : 0.18); s.style.boxShadow = i === cur ? `0 0 10px 1px ${rgbS(CHAKRA[i], 0.9)}` : 'none' })
        }
        // gold-foil sweep + holo sheen
        const gp = prog(t, 10.4, 10.76)
        glintBox.style.opacity = gp > 0 && gp < 1 ? String(Math.sin(Math.PI * gp) * 0.9 + 0.1) : '0'
        glint.style.transform = `translateX(${lerp(-300, BODY.w + 140, ease.inOutCubic(gp))}px) skewX(-24deg)`
        const ho = Math.sin(Math.PI * tiltU)
        holoBox.style.opacity = String(0.85 * ho)
        holo.style.transform = `translate(${lerp(-18, 22, tiltU) + tilt * 3}%, ${tiltX * 2}%)`
      } else tag.style.opacity = '0'
      backDim.style.opacity = String(0.8 * ease.inOutQuad(prog(t, 11.22, 11.42)))
      // push into the card back's mark (handoff to S4's indigo sky)
      const ps = Math.pow(8, ease.inQuad(prog(t, 11.14, 11.44)))
      const life = lerp(1, 0.97, ease.inOutQuad(prog(t, 10.6, BACK_FLIP)))
      const c2 = ease.inOutQuad(prog(t, 11.14, 11.44))
      const pop = t < FLIP_IN.b + 0.25 ? 1 + 0.05 * Math.sin(Math.PI * prog(t, FLIP_IN.m, FLIP_IN.b + 0.25)) : 1
      const S = ps * life * pop
      world.style.transform = `translate(${MARK.x * life * (1 - c2) - S * MARK.x}px, ${MARK.y * life * (1 - c2) - S * MARK.y}px) scale(${S})`

      // ══ canvas: dust, trails, lines, stars, rings, resolve sparkles ══
      fx.setTransform(1, 0, 0, 1, 0, 0); fx.clearRect(0, 0, W, H)
      fx.globalCompositeOperation = 'lighter'
      // dust pulled toward the line, then blown out by the shockwave
      const dustIn = prog(t, 7.75, 8.1) * (1 - ease.outQuad(prog(t, LOCK, LOCK + 0.45)))
      if (dustIn > 0) {
        const pullAt = (tt) => ease.inCubic(prog(tt, 7.9, LOCK)) * 0.94
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
      // stars
      const collapse = ease.inCubic(prog(t, FLIP_IN.a, FLIP_IN.m + 0.04))
      if (t < FLIP_IN.m + 0.05) {
        const SS = CHAKRA_HEX.map((_, i) => starState(i, t))
        // constellation lines snapping between neighbours, then the column beam
        for (let i = 0; i < 6; i++) {
          const A1 = SS[i], B1 = SS[i + 1]
          if (!A1 || !B1) continue
          const mc = Math.min(A1.c, B1.c)
          const lockT = Math.max(STAR_LOCK[i], STAR_LOCK[i + 1])
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
        // column beam after the lock
        if (t >= LOCK - 0.04) {
          const bo = (t < LOCK ? prog(t, LOCK - 0.04, LOCK) : lerp(1, 0.35, ease.outQuad(prog(t, LOCK, LOCK + 0.45)))) * (1 - collapse)
          const BW = VERT ? 85 : 60
          const bg = fx.createLinearGradient(CC.x - BW, 0, CC.x + BW, 0)
          bg.addColorStop(0, 'rgba(255,240,214,0)'); bg.addColorStop(0.5, `rgba(255,244,226,${(0.55 * bo).toFixed(3)})`); bg.addColorStop(1, 'rgba(255,240,214,0)')
          fx.fillStyle = bg; fx.fillRect(CC.x - BW, -20, BW * 2, H + 40)
        }
        SS.forEach((s, i) => {
          if (!s) return
          const rgb = CHAKRA[i].join(',')
          // trail
          const e0 = STAR_IN + ENTER_ORDER[i] * 0.065
          let prev = [s.x, s.y]
          for (let j = 1; j <= 14; j++) {
            const tj = t - j * 0.016
            if (tj < e0) break
            const q = starState(i, tj); if (!q) break
            const al = (1 - j / 15) * 0.7 * (1 - collapse)
            fx.strokeStyle = `rgba(${rgb},${al.toFixed(3)})`; fx.lineWidth = lerp(7, 1, j / 14) * SZ
            fx.beginPath(); fx.moveTo(prev[0], prev[1]); fx.lineTo(q.x, q.y); fx.stroke()
            prev = [q.x, q.y]
          }
          const L = STAR_LOCK[i]
          const flare = t >= L ? 1 - ease.outQuad(prog(t, L, L + 0.35)) : 0
          const lockFlare = t >= LOCK ? 1 - ease.outQuad(prog(t, LOCK, LOCK + 0.6)) : 0
          let sz = SZ * (1 + 0.14 * Math.sin(t * 9 + i * 1.7)) * (0.85 + 0.35 * ten) * (1 + 0.9 * flare + 1.2 * lockFlare)
          let x = s.x, y = s.y
          if (collapse > 0) { x = lerp(x, CC.x, collapse); y = lerp(y, CC.y - 40, collapse * 0.6); sz *= 1 - collapse }
          const ent = Math.min(1, s.enter * 3)
          if (sz <= 0.01) return
          const G = 46 * sz
          const gg = fx.createRadialGradient(x, y, 0, x, y, G)
          gg.addColorStop(0, `rgba(${rgb},${0.75 * ent})`); gg.addColorStop(0.3, `rgba(${rgb},${0.28 * ent})`); gg.addColorStop(1, `rgba(${rgb},0)`)
          fx.fillStyle = gg; fx.fillRect(x - G, y - G, G * 2, G * 2)
          // diffraction spikes
          const sp = (22 + 30 * ten + 70 * flare + 90 * lockFlare) * sz
          fx.strokeStyle = `rgba(255,250,240,${(0.55 * ent).toFixed(3)})`; fx.lineWidth = 1.4
          fx.beginPath(); fx.moveTo(x - sp, y); fx.lineTo(x + sp, y); fx.moveTo(x, y - sp * 0.7); fx.lineTo(x, y + sp * 0.7); fx.stroke()
          const cg = fx.createRadialGradient(x, y, 0, x, y, 10 * sz)
          cg.addColorStop(0, `rgba(255,255,255,${ent})`); cg.addColorStop(0.45, `rgba(${rgb},${0.9 * ent})`); cg.addColorStop(1, `rgba(${rgb},0)`)
          fx.fillStyle = cg; fx.beginPath(); fx.arc(x, y, 10 * sz, 0, 6.2832); fx.fill()
        })
      }
      // shockwave rings
      if (t >= LOCK && t < LOCK + 0.9) {
        const RINGS = VERT ? [[0, 1250, 34, '255,246,230'], [0.07, 1000, 20, '201,166,255'], [0.15, 780, 9, '242,199,92']]
          : [[0, 1150, 30, '255,246,230'], [0.07, 900, 18, '201,166,255'], [0.15, 700, 8, '242,199,92']]
        const RY = VERT ? 1.3 : 0.92, R0 = VERT ? 130 : 90
        RINGS.forEach(([d, R1, w0, rgb]) => {
          const q = prog(t, LOCK + d, LOCK + d + 0.7)
          if (q <= 0 || q >= 1) return
          const R = lerp(R0, R1, ease.outCubic(q))
          fx.strokeStyle = `rgba(${rgb},${(0.85 * (1 - ease.inQuad(q))).toFixed(3)})`; fx.lineWidth = lerp(w0, 1.5, q)
          fx.beginPath(); fx.ellipse(CC.x, CC.y, R, R * RY, 0, 0, 6.2832); fx.stroke()
        })
      }
      // resolve sparkles around the photo window (camera is parked on it: window centre = screen centre)
      const rk = prog(t, RES.peak - 0.03, RES.peak + 0.75)
      if (rk > 0 && rk < 1) {
        SPK2.forEach((k) => {
          const q = prog(rk, k.d, k.d + 0.75)
          if (q <= 0 || q >= 1) return
          const R = VERT ? lerp(k.r0 * 1.15, k.r1 * 1.1, ease.outCubic(q)) : lerp(k.r0, k.r1, ease.outCubic(q))
          const x = W / 2 + Math.cos(k.a) * R * (VERT ? 0.98 : 1), y = H / 2 + Math.sin(k.a) * R * (VERT ? 0.85 : 0.66)
          sparkle(fx, x, y, k.s * SZ * Math.sin(Math.PI * q), k.gold ? '255,226,150' : '255,244,236', Math.min(1, Math.sin(Math.PI * q) * 1.5))
        })
      }
      fx.globalCompositeOperation = 'source-over'

      // ══ captions ══
      const out = 1 - ease.inQuad(prog(t, CAP.out, CAP.out + 0.18))
      const e1 = ease.outQuad(prog(t, CAP.eyebrow, CAP.eyebrow + 0.22)), e2 = ease.outQuad(prog(t, CAP.line, CAP.line + 0.3))
      eyebrow.style.opacity = String(e1 * out)
      eyebrow.style.transform = `translateY(${(1 - ease.outCubic(prog(t, CAP.eyebrow, CAP.eyebrow + 0.4))) * 10}px)`
      capLine.style.opacity = String(e2 * out)
      capLine.style.transform = `translateY(${(1 - ease.outCubic(prog(t, CAP.line, CAP.line + 0.5))) * 14}px)`
      const lo = ease.outQuad(prog(t, CAP.lock, CAP.lock + 0.22)) * (1 - ease.inQuad(prog(t, CAP.lockOut, CAP.lockOut + 0.16)))
      lockLine.style.opacity = String(lo)
      lockLine.style.transform = `scale(${lerp(1.06, 1, ease.outCubic(prog(t, CAP.lock, CAP.lock + 0.6)))})`
      lockLine.style.letterSpacing = lerp(0.04, 0, ease.outCubic(prog(t, CAP.lock, CAP.lock + 0.8))) + 'em'
      scrim.style.opacity = String(Math.max(e1 * out, lo))
    },
  }
}
