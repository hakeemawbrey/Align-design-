// Film 2 · f6 THE FACE, LAST (real time 20.0–24.55; after 24.0 only CAP2, above f7). Continues f5's last frame exactly (same S1 nebula + camera drift,
// full moon, Juniper's veiled card at 960,440 already pushing in), then the first film's reveal WITHOUT a flip (the
// film's only true flip is the hook): a straight push-in — the mystery card dissolves into her reveal card under a
// soft bloom while the camera keeps pushing into the photo window — the veil lifts, the aura-camera sweep runs the
// chakra spectrum over her portrait and resolves (flash) to the real photo; pull back with a gold-foil sweep while the
// card slides left, then a still hold on her face before "Then you see each other."; then the match phone lands.
//
// Beat map (sound) — the reveal runs on the first film's S3 clock shifted by O = +10.82s:
//   20.00–20.52  straight push-in (continues f5's APPROACH, sine-eased) · 19.98–20.50 bloom, 20.06–20.41 mystery → reveal
//                dissolve (reveal comes up under it, both blurred at the crossing) · lower body text fades during the push
//   20.32–20.77  veil lifts · 20.38–20.84 aura-cam sweep red → violet (AURA READING tag)
//   20.89        resolve flash to the real photo + sparkles
//   20.94–21.42  pull back to the whole card, drifting left to x≈620 · 21.22–21.58 gold-foil sweep
//   21.04–21.37  echo: 3 hits of f1's cold grey Juniper photo in the photo window (glitch ticks)
//   21.42–22.30  still hold on the revealed card
//   21.55–23.09  "✦ THE VEIL LIFTS / Then you see each other." (right)
//   23.10–23.60  card recedes left + fades; match phone (screen-match.png) drops in from 23.15, lands 23.60 at x 960
//   23.20–23.95  the moon travels home (1716,122 r52), waning to f7's .14 crescent
//   23.35–24.55  "IT’S MUTUAL / You both aligned." (right, capLayer above f7) · 23.60–23.90 phone settles to f7's
//                opening state (centred 960,540, 880 tall, no tilt); from 24.0 f7 owns sky, moon and phone
import { clamp, lerp, prog, ease, rng, el, C } from '../../src/lib.js'
import { W, H, A, IMG, SERIF, MONO, SANS, fill, img } from '../../src/scenes/common.js'
import { veilCanvas } from '../../src/scenes/s3-veil.js'
import { CC, skyCanvas, paintSkyF5, grainCanvas, drawOneMoon, homeMoon, lerpLog, R_BIG, mysteryCard, rimGlow, JUL_RIM, julPose, drawAmbient, drawBurst } from './f5-stars.js'
import { COLD_FILTER } from './f1-old.js'

const O = 10.82                                   // s3 clock → film 2 clock
// card-reveal.png 1560×2740 geometry (from the first film's S3)
const REV = { w: 1560, h: 2740, win: { x: 118, y: 314, w: 1325, h: 893 }, imgTop: 582 }
const D = 0.35
const WIN = { x: (REV.win.x - REV.w / 2) * D, y: (REV.win.y - REV.h / 2) * D, w: REV.win.w * D, h: REV.win.h * D }
const INSET = 2
const IMG_END_SCALE = WIN.w / 1920
const IMG_END_TY = (REV.win.w * 4 / 3 / 2 - (REV.imgTop + REV.win.h / 2)) * D
const VPAD = { x: 96, y: 54 }
const IW = W, IH = H, IVW = IW + VPAD.x * 2, IVH = IH + VPAD.y * 2
// s3 timing (s3 clock)
const LIFT = { a: 9.5, b: 9.95 }
const SWEEP = { a: 9.56, b: 10.02 }
const RES = { a: 10.0, peak: 10.07, b: 10.22 }
const Z_PUSH = 1.6
const MYS_BW = 1254                              // mystery card body width (card-profile-3 px)
const REV_BW = (1494 - 66) * D                   // reveal card body width at Z = 1
const DISS = { a: 20.06, b: 20.41 }              // mystery → reveal dissolve, centred on the bloom peak (20.24)
const BLOOM = { a: 19.98, b: 20.5 }
const ECHO = 21.04                               // 3 hits of f1's cold photo in the photo window
// film-2 clock beats
const SHIFT = { a: 20.98, b: 21.42 }              // card drifts left during/after the pull back
const CARD_X = -340                              // card centre offset at rest (screen x ≈ 620)
const CAP1 = { a: 21.55, out: 22.95 }            // fully gone by 23.09
const T_A = 23.15, T_A_END = 23.6               // match phone lands
const CAP2 = 23.35, CAP2_OUT = 24.45             // f6 shows ONLY this caption after 24.0 (above f7), gone by 24.55
const END = 24.55
const MOON_HOME = { a: 23.2, b: 23.95 }          // the full moon travels home, waning to f7's .14 crescent
const PH = 880, PW = Math.round(PH * 1170 / 2532)
const PX = 960                                   // phone resting centre x

const CHAKRA = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff'].map((h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)))
const LAG = 1.25
function chakraAt(x) {
  x = clamp(x, 0, 6); const i = Math.min(5, Math.floor(x)), f = x - i
  const a = CHAKRA[i], b = CHAKRA[i + 1]
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]
}
function sweepAt(u) {
  const x = prog(u, SWEEP.a, SWEEP.b) * (6 + LAG)
  const i = Math.floor(x), f = x - i
  return i + lerp(f, f * f * (3 - 2 * f), 0.55)
}
const rgbS = (c, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`
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
const liftEase = bezier(0.42, 0, 0.38, 1)

/** aura-camera print of a photo (first film's S3): luminance gradient map whose hue radiates outward */
function makeAuraPrint(src) {
  const cv = document.createElement('canvas')
  let L = null, band = null, id = null, w = 0, h = 0, lastS = null
  const NB = 40, DK = [10, 5, 30], HOT = [255, 250, 240]
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
      const stops = [[0, mixc(DK, c, 0.12)], [0.24, mixc(DK, c, 0.55)], [0.46, c], [0.7, mixc(c, HOT, 0.5)], [0.88, HOT], [1, HOT]]
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
function sparkle(g, x, y, s, rgb, a) {
  g.fillStyle = `rgba(${rgb},${a})`
  g.beginPath(); g.moveTo(x, y - s)
  g.quadraticCurveTo(x + s * 0.12, y - s * 0.12, x + s, y); g.quadraticCurveTo(x + s * 0.12, y + s * 0.12, x, y + s)
  g.quadraticCurveTo(x - s * 0.12, y + s * 0.12, x - s, y); g.quadraticCurveTo(x - s * 0.12, y - s * 0.12, x, y - s); g.fill()
}

export default function build(stage) {
  // root is a static wrapper (no stacking context): `body` takes main.js's z-index; `capLayer` sits above f7 so CAP2
  // stays up 24.0–24.55 while f7 owns the phone, and keeps the captions off the grain
  const root = el('div', {}, stage)
  const body = fill(root, { background: C.void })
  const capLayer = fill(root, { zIndex: 40, pointerEvents: 'none', overflow: 'hidden' })
  const sky = skyCanvas(body)
  const shakeBox = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, body)
  const Z0 = MYS_BW * julPose(20.0).s / REV_BW
  // camera (world origin = screen centre; translate(tx, ty) scale(Z))
  const cam = el('div', { position: 'absolute', left: W / 2 + 'px', top: H / 2 + 'px', width: 0, height: 0 }, shakeBox)
  // ── reveal card (front), world coords
  const world = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0 }, cam)
  const front = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, opacity: 0 }, world)
  const cardShadow = el('div', { position: 'absolute', left: (64 - REV.w / 2) * D + 'px', top: (123 - REV.h / 2) * D + 'px', width: 1431 * D + 'px', height: 2498 * D + 'px', borderRadius: 100 * D + 'px', boxShadow: '0 0 34px 4px rgba(255,150,232,0.32), 0 30px 80px rgba(5,2,18,0.55)' }, front)
  const revImg = img(front, A + 'card-reveal.png', { left: -REV.w * D / 2 + 'px', top: -REV.h * D / 2 + 'px', width: REV.w * D + 'px', height: REV.h * D + 'px', clipPath: `inset(${123 * D}px ${65 * D}px ${119 * D}px ${64 * D}px round ${100 * D}px)` })
  const BODY = { x: 66 * D, y: 123 * D, w: (1494 - 66) * D, h: (2620 - 123) * D, r: 100 * D }
  const bodyBox = (z) => el('div', {
    position: 'absolute', left: (-REV.w * D / 2 + BODY.x) + 'px', top: (-REV.h * D / 2 + BODY.y) + 'px', width: BODY.w + 'px', height: BODY.h + 'px',
    borderRadius: BODY.r + 'px', overflow: 'hidden', pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0, zIndex: z,
  }, front)
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
  const sB = Math.max(fw / IW, fh / IH)
  const inner = el('div', { position: 'absolute', left: (fw - IW) / 2 + 'px', top: (fh - IH) / 2 + 'px', width: IW + 'px', height: IH + 'px', transform: `scale(${sB})` }, frame)
  const flash = el('div', { position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0, background: 'radial-gradient(60% 75% at 48% 30%, rgba(255,252,244,1) 0%, rgba(255,244,228,0.85) 45%, rgba(255,236,250,0.5) 100%)' }, inner)
  const veil = el('div', { position: 'absolute', left: -VPAD.x + 'px', top: -VPAD.y + 'px', width: IVW + 'px', height: IVH + 'px', willChange: 'transform, filter' }, inner)
  const veilCvB = el('canvas', { position: 'absolute', left: 0, top: 0, width: IVW + 'px', height: IVH + 'px' }, veil)
  veilCvB.width = IVW; veilCvB.height = IVH
  let veilDrawn = false
  const seam = el('div', {
    position: 'absolute', left: '-10%', right: '-10%', top: 0, height: '200px', opacity: 0, pointerEvents: 'none', mixBlendMode: 'screen',
    background: 'radial-gradient(50% 50% at 50% 50%, rgba(255,250,235,0.9) 0%, rgba(255,189,246,0.5) 35%, rgba(242,199,92,0.16) 60%, transparent 75%)',
  }, inner)
  const SPK = (() => { const r = rng(77); return Array.from({ length: 14 }, (_, i) => ({ x: lerp(380, 1540, r()), y: lerp(90, 900, r()), s: lerp(30, 80, r()), d: r() * 0.22, rot: r() * 40 - 20, gold: i % 3 === 0 })) })()
  const sparks = SPK.map((k) => {
    const e = el('div', { position: 'absolute', left: (k.x - 50) + 'px', top: (k.y - 50) + 'px', width: '100px', height: '100px', opacity: 0, mixBlendMode: 'screen', pointerEvents: 'none' }, inner)
    const col = k.gold ? '255,228,160' : '255,236,250'
    e.innerHTML = `<svg viewBox="-50 -50 100 100" width="100" height="100" style="overflow:visible"><defs><radialGradient id="sg6"><stop offset="0" stop-color="rgba(${col},0.9)"/><stop offset="1" stop-color="rgba(${col},0)"/></radialGradient></defs>` +
      `<circle r="22" fill="url(#sg6)"/><path d="M0,-50 C3,-6 6,-3 50,0 C6,3 3,6 0,50 C-3,6 -6,3 -50,0 C-6,-3 -3,-6 0,-50Z" fill="rgb(${col})"/></svg>`
    return e
  })
  const GR = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'), d = g.createImageData(256, 256), r = rng(7); for (let i = 0; i < 65536; i++) { const v = clamp(Math.round(128 + (r() + r() + r() - 1.5) * 120), 0, 255); d.data[i * 4] = d.data[i * 4 + 1] = d.data[i * 4 + 2] = v; d.data[i * 4 + 3] = 255 } g.putImageData(d, 0, 0); return c.toDataURL() })()
  const grainB = el('div', { position: 'absolute', inset: 0, backgroundImage: `url(${GR})`, backgroundSize: '256px 256px', mixBlendMode: 'overlay', opacity: 0, pointerEvents: 'none' }, frame)
  const glintBox = bodyBox(3)
  const glint = el('div', {
    position: 'absolute', top: '-30%', left: 0, width: '220px', height: '160%',
    background: 'linear-gradient(90deg, rgba(242,199,92,0) 0%, rgba(242,199,92,0.14) 36%, rgba(255,228,160,0.6) 48.5%, rgba(255,246,220,0.95) 50%, rgba(255,228,160,0.6) 51.5%, rgba(242,199,92,0.14) 64%, rgba(242,199,92,0) 100%)',
    transform: 'skewX(-24deg)',
  }, glintBox)
  const holoBox = bodyBox(2)
  const holo = el('div', { position: 'absolute', left: '-60%', top: '-60%', width: '220%', height: '220%',
    background: 'linear-gradient(115deg, rgba(255,45,58,0) 30%, rgba(255,122,46,0.16) 36%, rgba(255,210,63,0.18) 40%, rgba(95,220,84,0.16) 44%, rgba(47,208,230,0.18) 48%, rgba(74,114,255,0.16) 52%, rgba(180,92,255,0.16) 56%, rgba(180,92,255,0) 62%)' }, holoBox)
  const cardDim = el('div', { position: 'absolute', left: (66 - REV.w / 2) * D + 'px', top: (123 - REV.h / 2) * D + 'px', width: BODY.w + 'px', height: BODY.h + 'px', borderRadius: BODY.r + 'px', background: 'rgba(11,6,32,1)', opacity: 0, pointerEvents: 'none', zIndex: 4 }, front)
  // echo: f1's cold, desaturated Juniper photo (the face we swiped past) hits the photo window 3 times — same crop as
  // the warm photo, so the face lands exactly on hers; no label
  const echo = el('div', { position: 'absolute', overflow: 'hidden', borderRadius: '14px', background: '#1a1d24', opacity: 0, display: 'none', pointerEvents: 'none', zIndex: 5,
    left: (WIN.x + INSET) + 'px', top: (WIN.y + INSET) + 'px', width: (WIN.w - INSET * 2) + 'px', height: (WIN.h - INSET * 2) + 'px' }, front)
  img(echo, IMG + 'juniper.jpg', { left: '50%', top: '50%', width: '1920px', height: '2560px', objectFit: 'cover', filter: COLD_FILTER,
    transform: `translate(-50%,-50%) translateY(${IMG_END_TY}px) scale(${IMG_END_SCALE})` })
  el('div', { position: 'absolute', inset: 0, background: 'rgba(84,110,150,0.24)', mixBlendMode: 'color' }, echo)
  const ECHO_HITS = [[0, 0.62], [1, 0.5], [5, 0.55], [6, 0.4], [10, 0.38]]   // frame offset → opacity (3 hits, ~7.5 Hz)
  // the lower body (badges, bio, facts) fades to the card's ink while the camera is pushed into the photo window
  const lowFade = el('div', { position: 'absolute', left: (104 - REV.w / 2) * D + 'px', top: (1200 - REV.h / 2) * D + 'px', width: (1456 - 104) * D + 'px', height: (2560 - 1200) * D + 'px',
    background: 'linear-gradient(180deg, rgba(25,12,50,0) 0%, rgba(25,12,50,1) 4%, rgba(22,10,46,1) 100%)', borderRadius: `0 0 ${80 * D}px ${80 * D}px`, opacity: 0, pointerEvents: 'none', zIndex: 4 }, front)

  // ── Juniper's mystery card (screen space; continues f5)
  const pre = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, shakeBox)
  const mys = mysteryCard(pre)

  // ── canvas fx (sparkles)
  const fxCv = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, shakeBox)
  fxCv.width = W; fxCv.height = H
  const fx = fxCv.getContext('2d')
  const SPK2 = (() => { const r = rng(616); return Array.from({ length: 18 }, () => ({ a: r() * 6.2832, r0: 380 + r() * 80, r1: 560 + r() * 160, d: r() * 0.16, s: 10 + r() * 16, gold: r() < 0.45 })) })()

  // ── the match phone (as the first film's S7 beat A)
  const persp = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', perspective: '2000px' }, body)
  const AUW = 900, AUH = 1100
  const pAura = el('div', { position: 'absolute', left: (PX - AUW / 2) + 'px', top: (H / 2 - AUH / 2) + 'px', width: AUW + 'px', height: AUH + 'px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(214,190,255,0.85), rgba(180,120,255,0.38) 55%, rgba(180,92,255,0) 100%)', opacity: 0 }, persp)
  const phone = el('div', { position: 'absolute', left: -PW / 2 + 'px', top: (H / 2 - PH / 2) + 'px', width: PW + 'px', height: PH + 'px', opacity: 0, willChange: 'transform' }, persp)
  const scr = el('div', { position: 'absolute', inset: 0, borderRadius: '52px', overflow: 'hidden', background: C.canvas, boxShadow: '0 60px 120px rgba(4,2,14,0.7), 0 18px 40px rgba(4,2,14,0.45), 0 0 60px rgba(180,92,255,0.18), 0 0 0 1.5px rgba(239,230,214,0.35)' }, phone)
  img(scr, A + 'screen-match.png', { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover' })
  const hs = [[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y]) => el('div', { position: 'absolute', left: (x * PW - 8) + 'px', top: (y * PH - 8) + 'px', width: '16px', height: '16px', background: C.bone, boxShadow: '0 0 0 2px rgba(20,10,46,0.85), 0 0 10px rgba(239,230,214,0.45)', opacity: 0 }, phone))
  const psp = [[-64, PH * 0.2, 44], [PW + 54, PH * 0.72, 32]].map(([x, y, s]) => el('div', { position: 'absolute', left: x + 'px', top: y + 'px', width: '60px', height: '60px', marginLeft: '-30px', marginTop: '-30px', textAlign: 'center', lineHeight: '60px', fontSize: s + 'px', color: C.gold, textShadow: '0 0 16px rgba(242,199,92,0.9), 0 0 3px rgba(120,60,10,0.6)', opacity: 0 }, phone, '✦'))

  // ── captions (right side)
  function caption(left, top, eyebrowTxt, lineHtml, size) {
    const box = el('div', { position: 'absolute', left: left + 'px', top: top + 'px', textAlign: 'left', opacity: 0, isolation: 'isolate' }, capLayer)
    el('div', { position: 'absolute', left: '-220px', right: '-220px', top: '-160px', bottom: '-160px', background: `radial-gradient(closest-side, ${[[0, 1], [25, 0.95], [48, 0.76], [66, 0.48], [82, 0.2], [100, 0]].map(([o, k]) => `rgba(11,6,32,${(0.6 * k).toFixed(3)}) ${o}%`).join(', ')})`, zIndex: -1 }, box)
    el('div', { fontFamily: MONO, fontSize: '26px', letterSpacing: '0.24em', textTransform: 'uppercase', color: C.bone, textShadow: '0 0 16px rgba(8,4,24,0.85), 0 0 5px rgba(8,4,24,0.6)', marginBottom: '18px', whiteSpace: 'nowrap' }, box, eyebrowTxt)
    el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: size + 'px', lineHeight: 1.02, color: C.bone, whiteSpace: 'nowrap', textShadow: '0 0 26px rgba(8,4,24,0.75), 0 0 8px rgba(8,4,24,0.6), 0 2px 3px rgba(4,2,14,0.5)' }, box, lineHtml)
    return box
  }
  const cap1 = caption(1010, H / 2, '✦&nbsp;&nbsp;The veil lifts', 'Then you see<br>each other.', 104)
  // CAP2's lines straddle the phone's own "You both aligned." headline (y≈668) instead of sharing its baseline
  const CAP2_TOP = 470
  const cap2 = caption(PX + PW / 2 + 110, CAP2_TOP, 'It’s mutual', 'You both<br>aligned.', 104)
  // aura-cam readout
  const tag = el('div', { position: 'absolute', left: '72px', top: '64px', opacity: 0, fontFamily: MONO, fontSize: '26px', letterSpacing: '0.28em', color: 'rgba(239,230,214,0.92)', textShadow: '0 1px 10px rgba(11,6,32,0.65)', textTransform: 'uppercase' }, body)
  const tagRow = el('div', { display: 'flex', alignItems: 'center', gap: '14px' }, tag)
  const tagDot = el('div', { width: '14px', height: '14px', borderRadius: '50%' }, tagRow)
  el('div', {}, tagRow, 'Aura reading')
  const tagBar = el('div', { display: 'flex', gap: '6px', marginTop: '14px', marginLeft: '28px' }, tag)
  const tagSegs = CHAKRA.map((c) => el('div', { width: '30px', height: '5px', borderRadius: '2px', background: rgbS(c), opacity: 0.25 }, tagBar))
  const grain = grainCanvas(body, 0.55)

  const capStyle = (box, t0, t1, ty, outLen = 0.14) => {
    const t = capT
    const i = ease.outCubic(prog(t, t0, t0 + 0.32)), o = ease.inQuad(prog(t, t1, t1 + outLen))
    box.style.opacity = String(Math.min(prog(t, t0, t0 + 0.14), 1 - o))
    box.style.transform = `translate(${lerp(36, 0, i) - 40 * o}px, ${ty})`
  }
  let capT = 0

  return {
    start: 20.0, end: END, root, fxStart: 20.0, fxEnd: 24.0,
    fx(ctx, t) {
      drawAmbient(ctx, t, 1 - prog(t, 23.5, 24.0))
      // match phone lands: white/gold pixel ring hugging the phone (clear of the caption)
      drawBurst(ctx, { t: T_A_END - 0.08, x: PX, y: H / 2, r0: 380, r1: 520, n: 16, px: 4, life: 0.85, pal: ['#ffffff', '#ffe6a0', '#ffffff', '#efe6d6'], centre: '#ffffff', sx: 0.62, sy: 1.08, seed: 7 }, t)
    },
    update(t) {
      if (!veilDrawn) { const vc = veilCanvas(); if (vc) { veilCvB.getContext('2d').drawImage(vc, 0, 0); veilDrawn = true } }
      body.style.zIndex = root.style.zIndex
      capT = t
      // from 24.0 f7 (opaque, above) owns sky, moon and phone: f6 keeps only CAP2 (capLayer)
      body.style.display = t >= 24.0 ? 'none' : 'block'
      capStyle(cap1, CAP1.a, CAP1.out, '-50%')
      capStyle(cap2, CAP2, CAP2_OUT, '0px', 0.1)
      if (t >= 24.0) return
      paintSkyF5(sky.bx, t, { crescent: 0 })
      const u = t - O                                     // s3 clock
      const fi = Math.round(t * 30)
      const gr = rng(fi * 131 + 17), grainPos = `${Math.floor(gr() * 256)}px ${Math.floor(gr() * 256)}px`

      // ── camera: a straight push-in. Before the dissolve the reveal card is sized to the mystery card (julPose keeps
      //    pushing from f5); then the push carries on into the photo window; pull back to the whole card.
      const jp = julPose(t)
      const Zm = MYS_BW * jp.s / REV_BW
      const sine = (x) => 0.5 - 0.5 * Math.cos(Math.PI * x)          // continuous acceleration (no jerk at mid-push)
      const push = sine(prog(u, 9.36, 9.72)), pull = ease.inOutCubic(prog(u, 10.12, 10.44))
      const winCy = WIN.y + WIN.h / 2
      const Z = lerp(lerp(Zm, Z_PUSH, push), 1, pull)
      const tx = (jp.x - W / 2) * (1 - push)
      const ty = lerp(lerp(jp.y - H / 2, -Z * winCy, push), 0, pull)
      cam.style.transform = `translate(${tx}px, ${ty}px) scale(${Z})`

      // ── mystery card dissolves into the reveal card under a soft bloom (no flip)
      //    the reveal card comes up UNDER the mystery card first, then the mystery card fades off it, both softened
      //    (blur) and washed (brightness + bloom) through the crossing so the two text layers never read doubled
      const dz = prog(t, DISS.a + 0.06, DISS.b)
      const bl = Math.sin(Math.PI * prog(t, BLOOM.a, BLOOM.b))
      const soft = Math.sin(Math.PI * prog(t, DISS.a, DISS.b))
      pre.style.display = dz >= 1 ? 'none' : 'block'
      pre.style.opacity = String(1 - ease.inOutQuad(dz))
      // the mystery card rides the same camera as the reveal card (identical to julPose until the push starts)
      mys.holder.style.transform = `translate(${W / 2 + tx}px, ${H / 2 + ty}px) perspective(1600px) rotateY(${jp.ry}deg) rotate(${jp.rz}deg) scale(${jp.s * Z / Zm})`
      mys.card.style.filter = bl > 0.002 ? `brightness(${1 + 0.42 * bl}) blur(${(7 * soft / jp.s * 0.33).toFixed(2)}px)` : 'none'
      mys.glow.style.boxShadow = rimGlow(JUL_RIM, bl * 0.6, jp.s)
      const fIn = ease.outQuad(prog(t, DISS.a, DISS.a + 0.16))
      front.style.opacity = String(fIn)
      front.style.filter = bl > 0.002 ? `brightness(${1 + 0.42 * bl}) blur(${(2.2 * soft).toFixed(2)}px)` : 'none'
      lowFade.style.opacity = String(ease.inOutQuad(prog(u, 9.34, 9.52)) * (1 - ease.inOutQuad(prog(u, 10.16, 10.4))))

      // ── reveal card: veil lift, aura-cam, resolve
      const tiltU = prog(t, 21.3, 23.1)
      const tilt = 2.5 * Math.sin(Math.PI * tiltU) * Math.sin(2 * Math.PI * 0.75 * tiltU)
      const tiltX = 1 * Math.sin(Math.PI * tiltU) * Math.cos(2 * Math.PI * 0.6 * tiltU)
      // the phone beat: the card recedes left, turning slightly toward the phone
      const rec = ease.inOutCubic(prog(t, T_A - 0.05, T_A + 0.42))
      front.style.transform = `perspective(1800px) rotateX(${tiltX}deg) rotateY(${tilt + 12 * rec}deg)`
      const showCard = fIn > 0
      front.style.display = showCard ? 'block' : 'none'
      const p = liftEase(prog(u, LIFT.a, LIFT.b))
      const fb = Math.pow(1 - prog(u, LIFT.a + 0.05, LIFT.b + 0.12), 2)
      const auraO = 1 - ease.inOutQuad(prog(u, RES.a + 0.02, RES.b - 0.04))
      const rfl = u < RES.peak ? ease.inQuad(prog(u, RES.a, RES.peak)) : 1 - ease.outQuad(prog(u, RES.peak, RES.peak + 0.2))
      const after = u < RES.peak ? 0 : 1 - ease.outCubic(prog(u, RES.peak, RES.peak + 0.35))
      if (showCard) {
        real.style.filter = `blur(${40 * fb}px) saturate(${lerp(0.6, 1.08, p)}) brightness(${1 + 0.3 * after})`
        flash.style.opacity = String(0.85 * rfl)
        const sw = sweepAt(u)
        veil.style.display = p >= 1 ? 'none' : 'block'
        const edge = lerp(0, 135, p)
        veil.style.webkitMaskImage = veil.style.maskImage = p <= 0 ? 'none' : `linear-gradient(to top, transparent ${edge - 35}%, #000 ${edge}%)`
        veil.style.transform = `translateY(${-IH * 0.18 * p}px) scale(${1 + 0.04 * p})`
        veil.style.filter = p <= 0 ? 'none' : `blur(${lerp(0, 22, p)}px) brightness(${1 + 0.12 * Math.sin(Math.PI * clamp(p * 1.4))})`
        const seamO = p < 0.08 ? p / 0.08 : p < 0.75 ? lerp(1, 0.9, (p - 0.08) / 0.67) : lerp(0.9, 0, (p - 0.75) / 0.25)
        seam.style.opacity = String(p <= 0 ? 0 : seamO)
        seam.style.transform = `translateY(${IH * (1 - (p * 1.35 - 0.175)) - 100}px)`
        const pk = prog(u, RES.peak - 0.04, RES.peak + 0.51)
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
          leak.style.left = lerp(-10, 85, ease.inOutQuad(prog(u, SWEEP.a - 0.1, RES.b))) + '%'
          leak.style.background = `radial-gradient(closest-side, rgba(255,246,232,0.35) 0%, ${rgbS(cLeak, 0.4)} 35%, ${rgbS(cLeak, 0)} 100%)`
          leak.style.transform = `rotate(${lerp(-14, 10, prog(u, SWEEP.a - 0.1, RES.b))}deg)`
        }
        const tagO = ease.outQuad(prog(u, SWEEP.a - 0.05, SWEEP.a + 0.1)) * (1 - ease.inQuad(prog(u, RES.a, RES.peak + 0.02)))
        tag.style.opacity = String(tagO)
        if (tagO > 0) {
          const cur = Math.round(clamp(sw, 0, 6))
          tagDot.style.background = rgbS(chakraAt(sw)); tagDot.style.boxShadow = `0 0 14px 3px ${rgbS(chakraAt(sw), 0.8)}`
          tagSegs.forEach((s, i) => { s.style.opacity = String(i < cur ? 0.6 : i === cur ? 1 : 0.18); s.style.boxShadow = i === cur ? `0 0 10px 1px ${rgbS(CHAKRA[i], 0.9)}` : 'none' })
        }
        const gp = prog(t, 21.22, 21.58)
        glintBox.style.opacity = gp > 0 && gp < 1 ? String(Math.sin(Math.PI * gp) * 0.9 + 0.1) : '0'
        glint.style.transform = `translateX(${lerp(-300, BODY.w + 140, ease.inOutCubic(gp))}px) skewX(-24deg)`
        holoBox.style.opacity = String(0.85 * Math.sin(Math.PI * tiltU))
        holo.style.transform = `translate(${lerp(-18, 22, tiltU) + tilt * 3}%, ${tiltX * 2}%)`
        cardDim.style.opacity = String(0.42 * rec)
        const ef = Math.round((t - ECHO) * 30), hit = ECHO_HITS.find(([f]) => f === ef)
        echo.style.display = hit ? 'block' : 'none'
        if (hit) echo.style.opacity = String(hit[1])
        cardShadow.style.boxShadow = `0 0 ${34 + 30 * Math.sin(Math.PI * prog(t, 21.2, 21.8))}px 4px rgba(255,150,232,${0.32 + 0.2 * Math.sin(Math.PI * prog(t, 21.2, 21.8))}), 0 30px 80px rgba(5,2,18,0.55)`
      } else tag.style.opacity = '0'
      // world: slide left for the caption (during the pull back), still hold, then recede + fade for the phone
      const sh = ease.inOutCubic(prog(t, SHIFT.a, SHIFT.b))
      const life = lerp(1, 0.97, ease.inOutQuad(prog(t, SHIFT.b, T_A)))
      const S = life * lerp(1, 0.78, rec)
      const wx = CARD_X * sh + lerp(0, -170, rec), wy = lerp(0, 30, rec)
      world.style.transform = `translate(${wx}px, ${wy}px) scale(${S})`
      world.style.opacity = String(1 - ease.inOutQuad(prog(t, 23.45, 23.92)))

      // ── the one moon: full, behind the card with parallax; then (23.2–23.95) it travels home to (1716,122) r52,
      //    waning to f7's .14 crescent (drawn there exactly as f7's paintSky draws it)
      const csx = W / 2 + tx + Z * wx, csy = H / 2 + ty + Z * wy
      const hm = homeMoon(t), kh = ease.inOutCubic(prog(t, MOON_HOME.a, MOON_HOME.b)), khr = ease.inOutQuad(prog(t, MOON_HOME.a, MOON_HOME.b))
      const mR = lerpLog(R_BIG * Math.pow(Z / Z0, 0.6), hm.r, khr)
      const mx = lerp(CC.x + 0.6 * (csx - CC.x), hm.x, kh), my = lerp(CC.y + 0.6 * (csy - CC.y), hm.y, kh)
      const mA = lerp(0.82, 1, khr)
      drawOneMoon(sky.bx, mx, my, mR, lerp(0.5, 0.14, kh), { alpha: mA, glow: lerp(0.75, 3, khr) })
      void revImg
      // grain: thinned to ≤ .2 on the visible moon disc, never on the card
      const wo = 1 - ease.inOutQuad(prog(t, 23.45, 23.92))
      const cw = BODY.w * Z * S, ch = BODY.h * Z * S
      grain.update(t, { holes: [{ x: mx, y: my, R: mR, k: 1 - khr }], keep: wo > 0.4 ? [{ x: csx, y: csy, w: cw, h: ch }] : [] })

      // ── resolve sparkles around the photo window (camera parked on it)
      fx.clearRect(0, 0, W, H)
      fx.globalCompositeOperation = 'lighter'
      if (bl > 0.01) {                                    // the bloom the cards dissolve under
        const G = 520 * Z / Z0
        const gg = fx.createRadialGradient(csx, csy - 40, 0, csx, csy - 40, G)
        gg.addColorStop(0, `rgba(255,240,250,${(0.42 * bl).toFixed(3)})`); gg.addColorStop(0.5, `rgba(255,190,240,${(0.16 * bl).toFixed(3)})`); gg.addColorStop(1, 'rgba(255,190,240,0)')
        fx.fillStyle = gg; fx.fillRect(csx - G, csy - 40 - G, G * 2, G * 2)
      }
      const rk = prog(u, RES.peak - 0.03, RES.peak + 0.75)
      if (rk > 0 && rk < 1) {
        SPK2.forEach((k) => {
          const q = prog(rk, k.d, k.d + 0.75)
          if (q <= 0 || q >= 1) return
          const R = lerp(k.r0, k.r1, ease.outCubic(q))
          const x = W / 2 + Math.cos(k.a) * R + wx * 0.5, y = H / 2 + Math.sin(k.a) * R * 0.66
          sparkle(fx, x, y, k.s * Math.sin(Math.PI * q), k.gold ? '255,226,150' : '255,244,236', Math.min(1, Math.sin(Math.PI * q) * 1.5))
        })
      }
      fx.globalCompositeOperation = 'source-over'

      // ── match phone falls into place
      const La = ease.outQuart(prog(t, T_A, T_A_END + 0.1)), Sa = ease.spring(prog(t, T_A, T_A_END + 0.3), 0.04)
      const hold = Math.sin((t - T_A) * 1.6)
      // settles to f7's opening state (centred, 880 tall, no tilt) by 23.9
      const st = 1 - ease.inOutQuad(prog(t, T_A_END, 23.9))
      const sA = lerp(1, lerp(0.7, 1, Sa), st)
      const rxA = (lerp(26, 3, La) + 0.8 * hold) * st
      const ryA = (lerp(-26, -6, La) + 1.2 * Math.sin((t - T_A) * 1.1)) * st
      const rzA = lerp(-8, -1.2, La) * st
      const tyA = (lerp(220, 0, La) + 5 * hold) * st
      phone.style.opacity = String(ease.outQuad(prog(t, T_A, T_A + 0.12)))
      phone.style.transform = `translate(${PX}px, ${tyA}px) rotateX(${rxA}deg) rotateY(${ryA}deg) rotateZ(${rzA}deg) scale(${sA})`
      const hA = prog(t, T_A_END - 0.06, T_A_END + 0.04) * (1 - prog(t, 23.75, 23.9))
      hs.forEach(h => { h.style.opacity = String(hA) })
      psp.forEach((s, i) => {
        const tw_ = 0.65 + 0.35 * Math.sin(t * 3.2 + i * 2.1)
        s.style.opacity = String(prog(t, T_A_END + i * 0.1, T_A_END + 0.2 + i * 0.1) * tw_ * (1 - prog(t, 23.75, 23.9)))
        s.style.transform = `translateY(${Math.sin(t * 1.4 + i) * 6}px) rotate(${(t - T_A) * 40 * (i ? -1 : 1)}deg) scale(${lerp(0.4, 1, ease.outBack(prog(t, T_A_END + i * 0.1, T_A_END + 0.3 + i * 0.1)))})`
      })
      const bloom = t < T_A + 0.2 ? 0 : t < T_A + 0.42 ? ease.outQuad(prog(t, T_A + 0.2, T_A + 0.42)) : lerp(1, 0.35, ease.inOutQuad(prog(t, T_A + 0.42, T_A + 1.0)))
      pAura.style.opacity = String(bloom)
      pAura.style.transform = `scale(${lerp(0.85, 1.08, bloom)})`

    },
  }
}

export const cues = [
  ['whoosh', 20.0, 0.5, 0.07],                                            // push-in continues from f5
  ['bell', 20.2, 739.99, 0.04, 1.6, -0.2], ['bell', 20.27, 1108.73, 0.035, 1.6, 0.2], // bloom: mystery card becomes her card
  ['whoosh', 20.22, 0.5, 0.06],                                           // push into the photo window
  ['whoosh', 20.6, 0.7, 0.06],                                            // veil rising
  // aura-cam sweep: a bell per chakra hue, panning across
  ...[261.63, 293.66, 329.63, 392, 440, 523.25, 587.33].map((f, i) => ['bell', 20.38 + i * 0.066, f, 0.045, 0.9, (i - 3) * 0.15]),
  ['glitter', 20.84, 21.3], ['boom', 20.89, 0.18], ['bell', 20.89, 1318.51, 0.05, 2.0, 0], ['bell', 20.95, 1975.53, 0.035, 2.0, 0], // resolve flash
  ['whoosh', 20.98, 0.55, 0.05],                                          // pull back, card drifts left
  ...[1174.66, 1318.51, 1479.98, 1760, 1975.53, 2349.32, 2637.02, 2959.96, 3520].map((f, k) => ['bell', 21.22 + k * 0.045, f, 0.02, 0.6, k / 4 - 1]), // gold-foil sweep
  ['tick', ECHO, 0.05], ['tick', ECHO + 5 / 30, 0.04], ['tick', ECHO + 10 / 30, 0.03],   // cold echo of f1's photo: 3 hits
  ['bell', CAP1.a + 0.02, 587.33, 0.035, 1.4, 0.3],                        // "Then you see each other."
  ['bell', CAP2 + 0.02, 880, 0.025, 1.4, 0.3],                             // "You both aligned." 
  ['whoosh', T_A - 0.06, 0.5, 0.1],                                       // phone drops in
  ['boom', T_A_END - 0.06, 0.32], ['tick', T_A_END - 0.06, 0.14],         // phone lands
  ['bell', T_A_END - 0.04, 587.33, 0.05, 2.2, 0], ['bell', T_A_END - 0.03, 880, 0.04, 2.2, -0.2], ['bell', T_A_END - 0.02, 1108.73, 0.03, 2.2, 0.2],
  ['glitter', T_A_END - 0.06, T_A_END + 0.6],
]
