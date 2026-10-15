// Film 2 · f6 THE FACE, LAST (real time 20.0–24.2). Continues f5's last frame exactly (same sky, full moon,
// Juniper's veiled card at 960,440 ×0.33), then the first film's reveal: the card flips into her reveal
// card, the camera pushes into the photo window, the veil lifts, an aura-camera colour sweep runs the
// chakra spectrum over her portrait and resolves (flash) to the real photo; pull back with a gold-foil
// sweep while the card slides left for "Then you see each other."; then the match phone lands.
//
// Beat map (sound) — the reveal runs on the first film's S3 clock shifted by O = +10.82s:
//   20.04–20.34  mystery card turns edge-on (20.18) → reveal card turns in
//   20.22–20.52  camera pushes into the photo window
//   20.32–20.77  veil lifts · 20.38–20.84 aura-cam sweep red → violet (AURA READING tag)
//   20.89        resolve flash to the real photo + sparkles
//   20.94–21.30  pull back to the whole card, drifting left to x≈620 · 21.22–21.58 gold-foil sweep
//   21.30–22.28  "✦ NO PHOTO UNTIL YOU BOTH ALIGN ✦ / Then you see each other." (right)
//   22.30–22.80  card recedes left; match phone (screen-match.png) drops in and settles at x≈960 (22.80)
//   22.44        "IT’S MUTUAL / You both aligned." (right) · held to the end (24.2) for f7
import { clamp, lerp, prog, ease, rng, el, C } from '../../src/lib.js'
import { W, H, A, IMG, SERIF, MONO, fill, img } from '../../src/scenes/common.js'
import { veilCanvas } from '../../src/scenes/s3-veil.js'
import { CC, MYS, skyLayer, grainLayer, moonLayer, moonState, mysteryCard, rimGlow, JUL_RIM, julPose, drawAmbient, drawBurst } from './f5-stars.js'

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
const FLIP_IN = { a: 9.22, m: 9.36, b: 9.52 }
const LIFT = { a: 9.5, b: 9.95 }
const SWEEP = { a: 9.56, b: 10.02 }
const RES = { a: 10.0, peak: 10.07, b: 10.22 }
const Z_PUSH = 1.6
// film-2 clock beats
const SHIFT = { a: 20.98, b: 21.42 }              // card drifts left during/after the pull back
const CARD_X = -340                              // card centre offset at rest (screen x ≈ 620)
const CAP1 = { a: 21.3, out: 22.24 }
const T_A = 22.32, T_A_END = 22.78              // match phone lands
const CAP2 = 22.46
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
  const root = fill(stage, { background: C.void })
  const sky = skyLayer(root)
  const shakeBox = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  // camera (world origin = screen centre; translate(0, -Z·fy) scale(Z))
  const cam = el('div', { position: 'absolute', left: W / 2 + 'px', top: H / 2 + 'px', width: 0, height: 0 }, shakeBox)
  // ── reveal card (front), world coords; the full moon rides behind the card as its halo
  const world = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0 }, cam)
  const moon = moonLayer(world, 0, 0)
  const front = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, backfaceVisibility: 'hidden' }, world)
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

  // ── Juniper's mystery card (screen space; continues f5)
  const pre = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, shakeBox)
  const mys = mysteryCard(pre)

  // ── canvas fx (sparkles)
  const fxCv = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, shakeBox)
  fxCv.width = W; fxCv.height = H
  const fx = fxCv.getContext('2d')
  const SPK2 = (() => { const r = rng(616); return Array.from({ length: 18 }, () => ({ a: r() * 6.2832, r0: 380 + r() * 80, r1: 560 + r() * 160, d: r() * 0.16, s: 10 + r() * 16, gold: r() < 0.45 })) })()

  // ── the match phone (as the first film's S7 beat A)
  const persp = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', perspective: '2000px' }, root)
  const AUW = 900, AUH = 1100
  const pAura = el('div', { position: 'absolute', left: (PX - AUW / 2) + 'px', top: (H / 2 - AUH / 2) + 'px', width: AUW + 'px', height: AUH + 'px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(214,190,255,0.85), rgba(180,120,255,0.38) 55%, rgba(180,92,255,0) 100%)', opacity: 0 }, persp)
  const phone = el('div', { position: 'absolute', left: -PW / 2 + 'px', top: (H / 2 - PH / 2) + 'px', width: PW + 'px', height: PH + 'px', opacity: 0, willChange: 'transform' }, persp)
  const scr = el('div', { position: 'absolute', inset: 0, borderRadius: '52px', overflow: 'hidden', background: C.canvas, boxShadow: '0 60px 120px rgba(4,2,14,0.7), 0 18px 40px rgba(4,2,14,0.45), 0 0 60px rgba(180,92,255,0.18), 0 0 0 1.5px rgba(239,230,214,0.35)' }, phone)
  img(scr, A + 'screen-match.png', { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover' })
  const hs = [[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y]) => el('div', { position: 'absolute', left: (x * PW - 8) + 'px', top: (y * PH - 8) + 'px', width: '16px', height: '16px', background: C.bone, boxShadow: '0 0 0 2px rgba(20,10,46,0.85), 0 0 10px rgba(239,230,214,0.45)', opacity: 0 }, phone))
  const psp = [[-64, PH * 0.2, 44], [PW + 54, PH * 0.72, 32]].map(([x, y, s]) => el('div', { position: 'absolute', left: x + 'px', top: y + 'px', width: '60px', height: '60px', marginLeft: '-30px', marginTop: '-30px', textAlign: 'center', lineHeight: '60px', fontSize: s + 'px', color: C.gold, textShadow: '0 0 16px rgba(242,199,92,0.9), 0 0 3px rgba(120,60,10,0.6)', opacity: 0 }, phone, '✦'))

  // ── captions (right side)
  function caption(left, eyebrowTxt, lineHtml, size) {
    const box = el('div', { position: 'absolute', left: left + 'px', top: '50%', textAlign: 'left', opacity: 0, isolation: 'isolate' }, root)
    el('div', { position: 'absolute', left: '-220px', right: '-220px', top: '-160px', bottom: '-160px', background: `radial-gradient(closest-side, ${[[0, 1], [25, 0.95], [48, 0.76], [66, 0.48], [82, 0.2], [100, 0]].map(([o, k]) => `rgba(11,6,32,${(0.6 * k).toFixed(3)}) ${o}%`).join(', ')})`, zIndex: -1 }, box)
    el('div', { fontFamily: MONO, fontSize: '26px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,246,234,0.92)', textShadow: '0 0 16px rgba(8,4,24,0.85), 0 0 5px rgba(8,4,24,0.6)', marginBottom: '18px', whiteSpace: 'nowrap' }, box, eyebrowTxt)
    el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: size + 'px', lineHeight: 1.02, color: '#fff6ea', whiteSpace: 'nowrap', textShadow: '0 0 26px rgba(8,4,24,0.75), 0 0 8px rgba(8,4,24,0.6), 0 2px 3px rgba(4,2,14,0.5)' }, box, lineHtml)
    return box
  }
  const cap1 = caption(1010, '✦&nbsp;&nbsp;The veil lifts', 'Then you see<br>each other.', 104)
  const cap2 = caption(PX + PW / 2 + 110, 'It’s mutual', 'You both<br>aligned.', 104)
  // aura-cam readout
  const tag = el('div', { position: 'absolute', left: '72px', top: '64px', opacity: 0, fontFamily: MONO, fontSize: '26px', letterSpacing: '0.28em', color: 'rgba(239,230,214,0.92)', textShadow: '0 1px 10px rgba(11,6,32,0.65)', textTransform: 'uppercase' }, root)
  const tagRow = el('div', { display: 'flex', alignItems: 'center', gap: '14px' }, tag)
  const tagDot = el('div', { width: '14px', height: '14px', borderRadius: '50%' }, tagRow)
  el('div', {}, tagRow, 'Aura reading')
  const tagBar = el('div', { display: 'flex', gap: '6px', marginTop: '14px', marginLeft: '28px' }, tag)
  const tagSegs = CHAKRA.map((c) => el('div', { width: '30px', height: '5px', borderRadius: '2px', background: rgbS(c), opacity: 0.25 }, tagBar))
  const grain = grainLayer(root, 0.2)

  return {
    start: 20.0, end: 24.2, root, fxStart: 20.0,
    fx(ctx, t) {
      drawAmbient(ctx, t, 1)
      // match phone lands: white/gold pixel ring hugging the phone (clear of the caption)
      drawBurst(ctx, { t: T_A_END - 0.08, x: PX, y: H / 2, r0: 380, r1: 520, n: 16, px: 4, life: 0.85, pal: ['#ffffff', '#ffe6a0', '#ffffff', '#efe6d6'], centre: '#ffffff', sx: 0.62, sy: 1.08, seed: 7 }, t)
    },
    update(t) {
      if (!veilDrawn) { const vc = veilCanvas(); if (vc) { veilCvB.getContext('2d').drawImage(vc, 0, 0); veilDrawn = true } }
      sky.update(t); grain.update(t)
      const u = t - O                                     // s3 clock
      const fi = Math.round(t * 30)
      const gr = rng(fi * 131 + 17), grainPos = `${Math.floor(gr() * 256)}px ${Math.floor(gr() * 256)}px`

      // ── mystery card flips out
      const jp = julPose(t)
      const charge = ease.inQuad(prog(u, FLIP_IN.a - 0.04, FLIP_IN.m))
      const fo = ease.inQuad(prog(u, FLIP_IN.a, FLIP_IN.m))
      pre.style.display = u >= FLIP_IN.m ? 'none' : 'block'
      mys.holder.style.transform = `translate(${jp.x}px, ${jp.y}px) perspective(1600px) rotateY(${90 * fo}deg) rotate(${jp.rz}deg) scale(${jp.s * (1 + 0.04 * fo)})`
      mys.card.style.filter = charge > 0.002 ? `brightness(${1 + 0.35 * charge})` : 'none'
      mys.glow.style.boxShadow = rimGlow(JUL_RIM, charge * 0.6, jp.s)

      // ── moon: full, held; dims behind the phone beat
      const ms = moonState(t)
      const moonOut = 1 - 0.55 * ease.inOutQuad(prog(t, T_A, T_A_END + 0.3))
      moon.update(ms.lit, ms.op * moonOut, ms.glow * moonOut, 1, 1)

      // ── camera
      const push = ease.inOutCubic(prog(u, 9.4, 9.7)), pull = ease.inOutCubic(prog(u, 10.12, 10.44))
      const winCy = WIN.y + WIN.h / 2
      const Z = lerp(lerp(1, Z_PUSH, push), 1, pull)
      const fyUse = u < 9.4 ? -(CC.y - H / 2) : lerp(lerp(-(CC.y - H / 2), winCy, push), 0, pull)
      cam.style.transform = `translate(0px, ${-Z * fyUse}px) scale(${Z})`

      // ── reveal card: flip in, veil lift, aura-cam, resolve
      const fin = ease.outCubic(prog(u, FLIP_IN.m, FLIP_IN.b))
      const aIn = u < FLIP_IN.m ? -90 : -90 * (1 - fin)
      const tiltU = prog(t, 21.12, 22.4)
      const tilt = 7 * Math.sin(Math.PI * tiltU) * Math.sin(2 * Math.PI * 0.75 * tiltU)
      const tiltX = 2.5 * Math.sin(Math.PI * tiltU) * Math.cos(2 * Math.PI * 0.6 * tiltU)
      // the phone beat: the card recedes left, turning slightly toward the phone
      const rec = ease.inOutCubic(prog(t, T_A - 0.04, T_A + 0.42))
      front.style.transform = `perspective(1800px) rotateX(${tiltX}deg) rotateY(${aIn + tilt + 16 * rec}deg)`
      const showCard = u >= FLIP_IN.m
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
        cardShadow.style.boxShadow = `0 0 ${34 + 30 * Math.sin(Math.PI * prog(t, 21.2, 21.8))}px 4px rgba(255,150,232,${0.32 + 0.2 * Math.sin(Math.PI * prog(t, 21.2, 21.8))}), 0 30px 80px rgba(5,2,18,0.55)`
      } else tag.style.opacity = '0'
      // world: pop on landing, slide left for the caption, then recede for the phone
      const pop = u < FLIP_IN.b + 0.25 ? 1 + 0.05 * Math.sin(Math.PI * prog(u, FLIP_IN.m, FLIP_IN.b + 0.25)) : 1
      const sh = ease.inOutCubic(prog(t, SHIFT.a, SHIFT.b))
      const life = lerp(1, 0.96, ease.inOutQuad(prog(t, 21.3, T_A)))
      const S = pop * life * lerp(1, 0.78, rec)
      const wx = CARD_X * sh + lerp(0, -170, rec), wy = lerp(0, 30, rec)
      world.style.transform = `translate(${wx}px, ${wy}px) scale(${S})`
      void revImg

      // ── resolve sparkles around the photo window (camera parked on it)
      fx.clearRect(0, 0, W, H)
      fx.globalCompositeOperation = 'lighter'
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
      const st = 1 - ease.inOutQuad(prog(t, 23.25, 23.9))
      const sA = lerp(1, lerp(0.7, 1, Sa) * (1 + 0.014 * prog(t, T_A_END, 23.25)), st)
      const rxA = (lerp(26, 3, La) + 0.8 * hold) * st
      const ryA = (lerp(-26, -6, La) + 1.2 * Math.sin((t - T_A) * 1.1)) * st
      const rzA = lerp(-8, -1.2, La) * st
      const tyA = (lerp(220, 0, La) + 5 * hold) * st
      phone.style.opacity = String(ease.outQuad(prog(t, T_A, T_A + 0.12)))
      phone.style.transform = `translate(${PX}px, ${tyA}px) rotateX(${rxA}deg) rotateY(${ryA}deg) rotateZ(${rzA}deg) scale(${sA})`
      const hA = prog(t, T_A_END - 0.06, T_A_END + 0.04) * (1 - prog(t, 23.5, 23.85))
      hs.forEach(h => { h.style.opacity = String(hA) })
      psp.forEach((s, i) => {
        const tw_ = 0.65 + 0.35 * Math.sin(t * 3.2 + i * 2.1)
        s.style.opacity = String(prog(t, T_A_END + i * 0.1, T_A_END + 0.2 + i * 0.1) * tw_ * (1 - prog(t, 23.5, 23.85)))
        s.style.transform = `translateY(${Math.sin(t * 1.4 + i) * 6}px) rotate(${(t - T_A) * 40 * (i ? -1 : 1)}deg) scale(${lerp(0.4, 1, ease.outBack(prog(t, T_A_END + i * 0.1, T_A_END + 0.3 + i * 0.1)))})`
      })
      const bloom = t < T_A + 0.2 ? 0 : t < T_A + 0.42 ? ease.outQuad(prog(t, T_A + 0.2, T_A + 0.42)) : lerp(1, 0.35, ease.inOutQuad(prog(t, T_A + 0.42, T_A + 1.0)))
      pAura.style.opacity = String(bloom)
      pAura.style.transform = `scale(${lerp(0.85, 1.08, bloom)})`

      // ── captions
      const capStyle = (box, t0, t1) => {
        const i = ease.outCubic(prog(t, t0, t0 + 0.32)), o = ease.inQuad(prog(t, t1, t1 + 0.14))
        box.style.opacity = String(Math.min(prog(t, t0, t0 + 0.14), 1 - o))
        box.style.transform = `translate(${lerp(36, 0, i) - 40 * o}px, -50%)`
      }
      capStyle(cap1, CAP1.a, CAP1.out)
      capStyle(cap2, CAP2, 99)
    },
  }
}

export const cues = [
  ['whoosh', 20.04, 0.4, 0.1],                                            // mystery card flips into the reveal card
  ['bell', 20.32, 739.99, 0.05, 1.6, -0.2], ['bell', 20.41, 1108.73, 0.04, 1.6, 0.2], // reveal card lands
  ['whoosh', 20.22, 0.5, 0.06],                                           // push into the photo window
  ['whoosh', 20.6, 0.7, 0.06],                                            // veil rising
  // aura-cam sweep: a bell per chakra hue, panning across
  ...[261.63, 293.66, 329.63, 392, 440, 523.25, 587.33].map((f, i) => ['bell', 20.38 + i * 0.066, f, 0.045, 0.9, (i - 3) * 0.15]),
  ['glitter', 20.84, 21.3], ['boom', 20.89, 0.18], ['bell', 20.89, 1318.51, 0.05, 2.0, 0], ['bell', 20.95, 1975.53, 0.035, 2.0, 0], // resolve flash
  ['whoosh', 20.98, 0.55, 0.05],                                          // pull back, card drifts left
  ...[1174.66, 1318.51, 1479.98, 1760, 1975.53, 2349.32, 2637.02, 2959.96, 3520].map((f, k) => ['bell', 21.22 + k * 0.045, f, 0.02, 0.6, k / 4 - 1]), // gold-foil sweep
  ['bell', 21.32, 587.33, 0.035, 1.4, 0.3],                                // caption
  ['whoosh', T_A - 0.06, 0.5, 0.1],                                       // phone drops in
  ['boom', T_A_END - 0.06, 0.32], ['tick', T_A_END - 0.06, 0.14],         // phone lands
  ['bell', T_A_END - 0.04, 587.33, 0.05, 2.2, 0], ['bell', T_A_END - 0.03, 880, 0.04, 2.2, -0.2], ['bell', T_A_END - 0.02, 1108.73, 0.03, 2.2, 0.2],
  ['glitter', T_A_END - 0.06, T_A_END + 0.6],
]
