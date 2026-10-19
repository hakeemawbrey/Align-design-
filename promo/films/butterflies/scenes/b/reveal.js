// Butterflies · half b · THE BLIND REVEAL (15.0–24.95). Adapted from film 3's g3-blind (copied, retimed, re-staged).
// Starts on H: the sky alone (moon 1716,122 r52 phase .12, grain .5), nothing else on screen at 15.0.
//
// Beat map (sound):
//   15.00–15.20  H held (sky only)
//   15.20–15.95  the mystery card (card-profile-3, Juniper veiled) gathers out of pixel stars, left of centre (650,520 h820)
//   15.55        "Not knowing / is the best part." (right column, typed by ≈16.3, out 18.05–18.2)
//   16.30–16.85  chart badges pop (LIBRA · AIR · GEMINI MOON) · bio sweep · 16.80 lock chip "PHOTO HIDDEN UNTIL YOU BOTH ALIGN"
//   18.10–18.70  TALK: The Fool talk card ("What's a hill you will die on?") is dealt in on the right, "TALK CARDS" eyebrow
//                gold glint 19.0 · 19.75–20.15 the talk card lifts away
//   19.85–20.35  your card (Hakeem · Taurus) slides in from the right; Juniper's card settles to (610,450 h640)
//   19.95–20.90  seven chakra stars streak in → column · 20.95 LOCK (flash, rings, rays, bursts, the chip's lock opens)
//   21.13–21.55  your card out; the stars sink into her photo window; her card grows to (700,530 h900)
//   21.55        "Then you / both align." (right, typed by ≈22.0, out 24.35)
//   21.50–21.95  veil lifts · 21.55–22.00 aura-cam sweep red → violet · 22.03 resolve flash → juniper.jpg clear by 22.2
//   22.05        pixel butterflies flutter out of the window · 22.30–22.70 gold foil · face held clear to 24.45 (≥2.2s)
//   24.10–24.60  the plate eases back to dim 1 · 24.45–24.85 the card drifts up-left and fades (end.js owns 24.75→)
import { clamp, lerp, prog, ease, rng, noise1, el, C, PIXEL_PALETTE, TypeLine } from '../../../../src/lib.js'
import { W, H, A, IMG, SERIF, MONO, fill, img } from '../../../../src/scenes/common.js'
import { sky, twinkles, drawGrain, grainOpacity, getSky, drawPixelStar, makeFlight, drawFlight, CHAKRA_HEX as FLYC } from './kit.js'

const START = 15.0, END = 24.95

// ── card geometry ────────────────────────────────────────────────────────────
// card-profile-3.png 1496×2238 · body [120,114]–[1374,2116] → centre (747,1115), 1254×2002, radius 84
const PNG = { w: 1496, h: 2238, cx: 747, cy: 1115, bw: 1254, bh: 2002 }
const WIN = { x: 218, y: 342, w: 1074, h: 572 }                 // photo window (aura veil)
const PWIN = { x: WIN.x + 5, y: WIN.y + 5, w: WIN.w - 10, h: WIN.h - 10, r: 36 }   // the photo sits inside the window's hairline
// juniper.jpg 720×960: face centre ≈ (348,516), face ≈ 250px tall → scaled so the face fills ~70% of the window height
const PH = { s: 1.72, w: 720, h: 960, fx: 348, fy: 516 }
const PH_W = PH.w * PH.s, PH_H = PH.h * PH.s
const PH_L = PWIN.w / 2 - PH.fx * PH.s, PH_T = PWIN.h * 0.5 - PH.fy * PH.s
// card-sign.png 848×1152 (Hakeem · Taurus) · body [121,121]–[727,1031] → centre (424,576), 606×910, radius 45
const SGN = { w: 848, h: 1152, cx: 424, cy: 576, bw: 606, bh: 910 }

// ── beats ────────────────────────────────────────────────────────────────────
const B = {
  hold: 15.2, emerge: { a: 15.2, b: 15.95 },
  cap1: 15.55, cap1Out: 18.05,
  sun: 16.3, air: 16.41, moon: 16.52, bio: 16.65, chip: 16.8, glint: 17.0,
  talk: { a: 18.1, b: 18.7, glint: 19.0, out: 19.75, gone: 20.15 },
  youIn: 19.85, youSet: 20.35,
  starIn: 19.95, glide: 20.37,
  lock: 20.95,
  youOut: 21.13, sink: { a: 21.15, b: 21.5 },
  cap3: 21.55, cap3Out: 24.35,
  lift: { a: 21.5, b: 21.95 }, sweep: { a: 21.55, b: 22.0 }, res: { a: 21.95, peak: 22.03, b: 22.2 },
  foil: { a: 22.3, b: 22.7 },
  exit: { a: 24.45, b: 24.85 },
}
const LOCK = B.lock
const STAR_LOCK = Array.from({ length: 7 }, (_, i) => 20.63 + i * 0.045)

// Juniper's card keys: [t, cx, cy, bodyH, yawDeg]
const JK = [
  [15.2, 668, 528, 760, 16],
  [15.95, 650, 520, 820, 4],
  [18.05, 640, 514, 830, 3],
  [18.65, 560, 520, 720, 7],
  [19.8, 556, 516, 724, 6],
  [20.35, 610, 450, 640, 8],
  [21.13, 606, 452, 648, 7],
  [21.7, 700, 530, 900, 2],
  [22.2, 699, 530, 906, 1.6],
  [24.45, 690, 548, 1015, 0],                                  // slow push 1.0 → 1.12 on her face
]
function keyAt(K, t) {
  if (t <= K[0][0]) return K[0].slice(1)
  for (let i = 1; i < K.length; i++) {
    if (t <= K[i][0]) {
      const a = K[i - 1], b = K[i], k = ease.inOutCubic((t - a[0]) / (b[0] - a[0]))
      return a.slice(1).map((v, j) => lerp(v, b[j + 1], k))
    }
  }
  return K[K.length - 1].slice(1)
}
/** Juniper's card pose at t (screen px) */
function julPose(t) {
  let [cx, cy, h, ry] = keyAt(JK, t)
  const live = ease.inOutQuad(prog(t, B.hold, B.hold + 0.8))
  const bob = Math.sin((t - B.hold) * 1.7) * 4 * live
  const pitch = Math.sin((t - B.hold) * 0.9) * 1.1 * live
  // the card gathers out of the stars: fades + sharpens in
  const em = ease.outCubic(prog(t, B.emerge.a, B.emerge.b))
  // exit: drift up-left, shrink a touch, fade
  const ex = ease.inOutQuad(prog(t, B.exit.a, B.exit.b))
  cx += -46 * ex; cy += -18 * ex; h *= (1 - 0.06 * ex) * lerp(0.94, 1, em)
  return { cx, cy: cy + bob, h, ry, pitch, em, op: ease.inOutQuad(prog(t, B.emerge.a, B.emerge.a + 0.5)) * (1 - ease.inQuad(prog(t, B.exit.a, B.exit.b))) }
}
/** your card's pose (slides in from the right, out again after the lock) */
function youPose(t) {
  const e = ease.outCubic(prog(t, B.youIn, B.youSet))
  const o = ease.inCubic(prog(t, B.youOut, B.youOut + 0.42))
  const bob = Math.sin((t - 7) * 1.9 + 1) * 4 * e
  return {
    cx: lerp(lerp(2260, 1316, e), 2360, o), cy: lerp(500, 450, e) + bob + 20 * o, h: 640 * lerp(1, 0.92, o),
    ry: lerp(-36, -8, e) - 18 * o, rz: lerp(7, 1.2, e) + 5 * o, op: ease.outQuad(prog(t, B.youIn, B.youIn + 0.12)) * (1 - ease.inQuad(prog(t, B.youOut + 0.15, B.youOut + 0.42))),
  }
}
// the talk card (card-talk-1.png 732×1170, body ≈ [62,60]–[672,1110] r50): dealt in from the right, lifts away up-right
const TLK = { w: 732, h: 1170, cx: 367, cy: 585, bh: 1050 }
function talkPose(t) {
  const e = ease.outCubic(prog(t, B.talk.a, B.talk.b))
  const o = ease.inCubic(prog(t, B.talk.out, B.talk.gone))
  const live = prog(t, B.talk.b, B.talk.b + 0.4)
  const bob = Math.sin((t - B.talk.b) * 1.8) * 4 * live
  return {
    cx: lerp(2200, 1330, e) + 260 * o, cy: lerp(640, 520, e) + bob - 380 * o, h: 720 * lerp(1, 0.9, o),
    ry: lerp(-50, -5, e) - 30 * o, rz: lerp(14, 1.5, e) + 10 * o,
    op: ease.outQuad(prog(t, B.talk.a, B.talk.a + 0.14)) * (1 - ease.inQuad(prog(t, B.talk.out + 0.1, B.talk.gone))),
  }
}
// plate dim: down to .72 after H, back up to 1 for the end (end.js paints dim 1)
const dimAt = (t) => lerp(1, 0.72, ease.inOutQuad(prog(t, B.hold, B.hold + 0.8)) * (1 - ease.inOutQuad(prog(t, 24.1, 24.6))))

// ── stars (f5's chakra column, compressed) ───────────────────────────────────
const CC = { x: 958, y: 450 }
const CHAKRA_HEX = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
const CHAKRA = CHAKRA_HEX.map((h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)))
const COL_Y = (i) => CC.y + 246 - i * 82
const ANCHOR = [[320, 730], [1540, 330], [500, 150], [1480, 720], [180, 360], [1780, 560], [1250, 120]]
const ENTER_ORDER = [3, 0, 5, 2, 6, 1, 4]
const SQ = 0.62
function starState(i, t) {
  const L = STAR_LOCK[i]
  const e = B.starIn + ENTER_ORDER[i] * 0.055
  if (t < e) return null
  const [ax, ay] = ANCHOR[i]
  const dx = ax - CC.x, dy = (ay - CC.y) / SQ
  const r0 = Math.hypot(dx, dy), th0 = Math.atan2(dy, dx)
  const tt = t - (B.starIn + 0.05)
  const th = th0 + 0.3 * tt - 0.14 * Math.max(0, t - (B.glide + 0.2)) ** 2
  const wob = 1 - prog(t, B.glide + 0.12, L)
  let ox = CC.x + r0 * Math.cos(th) + (noise1(t * 1.3, i * 7 + 1) - 0.5) * 36 * wob
  let oy = CC.y + SQ * r0 * Math.sin(th) + (noise1(t * 1.1, i * 7 + 3) - 0.5) * 30 * wob
  const v = ease.outCubic(prog(t, e, e + 0.38))
  if (v < 1) {
    // the orange star (i 1) sits nearest the moon: it streaks in straight from the lower right, away from the crescent
    const a0 = th0 + (i === 1 ? 1.1 : 0.55), R = 1500
    const px = CC.x + R * Math.cos(a0), py = CC.y + SQ * 1.25 * R * Math.sin(a0)
    const nx = -(oy - py), ny = ox - px, nl = Math.hypot(nx, ny) || 1
    const bulge = (i === 1 ? 0 : 140) * Math.sin(Math.PI * v)
    ox = lerp(px, ox, v) + nx / nl * bulge; oy = lerp(py, oy, v) + ny / nl * bulge
  }
  const u = prog(t, B.glide, L - 0.08)
  const c = t < L - 0.08 ? 0.9 * ease.inOutQuad(u) : 0.9 + 0.1 * ease.inQuad(prog(t, L - 0.08, L))
  let x = lerp(ox, CC.x, c), y = lerp(oy, COL_Y(i), c)
  if (t > L) { const k = t - L; x += (i % 2 ? 1 : -1) * 8 * Math.exp(-k * 22) * Math.sin(k * 55) }
  return { x, y, c, enter: v }
}

// ── aura-cam (f6 / first film's S3) ──────────────────────────────────────────
const LAG = 1.25
function chakraAt(x) {
  x = clamp(x, 0, 6); const i = Math.min(5, Math.floor(x)), f = x - i
  const a = CHAKRA[i], b = CHAKRA[i + 1]
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]
}
function sweepAt(t) {
  const x = prog(t, B.sweep.a, B.sweep.b) * (6 + LAG)
  const i = Math.floor(x), f = x - i
  return i + lerp(f, f * f * (3 - 2 * f), 0.55)
}
const rgbS = (c, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`
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
    const cx = w * 0.47, cy = h * 0.55, rx = w * 0.62, ry = h * 0.62
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

// ── pixel sprites / bursts (f5) ──────────────────────────────────────────────
const SPRITES = [
  ['...X...', '...X...', '..XXX..', 'XXXCXXX', '..XXX..', '...X...', '...X...'],
  ['.......', '...X...', '..XXX..', '.XXCXX.', '..XXX..', '...X...', '.......'],
  ['.......', '.......', '...X...', '..XCX..', '...X...', '.......', '.......'],
  ['.......', '.X...X.', '...X...', '..XCX..', '...X...', '.X...X.', '.......'],
].map(rows => rows.flatMap((row, y) => [...row].map((ch, x) => ch === '.' ? null : [x - 3, y - 3, ch === 'C'])).filter(Boolean))
function sprite(ctx, cx, cy, px, kind, color, centre) {
  const x0 = Math.round(cx) - Math.floor(px / 2), y0 = Math.round(cy) - Math.floor(px / 2)
  for (const [x, y, c] of SPRITES[kind]) { ctx.fillStyle = c ? centre : color; ctx.fillRect(x0 + x * px, y0 + y * px, px, px) }
}
const BONE = '#efe6d6', GOLD = '#f2c75c', HOT = '#fff3e0'
function drawBurst(ctx, Bu, t) {
  const r = rng(Bu.seed * 104729), f = Math.round(t * 30)
  for (let i = 0; i < Bu.n; i++) {
    const ang = (i / Bu.n) * 6.2832 + r() * 0.35, delay = r() * 0.12, rr = r(), col = Bu.pal[Math.floor(r() * Bu.pal.length)]
    const lp = (t - Bu.t - delay) / Bu.life
    if (lp <= 0 || lp >= 1) continue
    const rad = lerp(Bu.r0, Bu.r1 * (0.8 + 0.3 * rr), ease.outCubic(lp))
    const x = Bu.x + Math.cos(ang) * rad * (Bu.sx ?? 1), y = Bu.y + Math.sin(ang) * rad * Bu.sy
    const kind = lp < 0.3 ? 0 : lp < 0.6 ? (((f + i) >> 1) & 1 ? 3 : 1) : 2
    ctx.globalAlpha = lp < 0.08 ? lp / 0.08 : 1 - ease.inQuad(prog(lp, 0.55, 1))
    sprite(ctx, x, y, rr > 0.5 ? Bu.px : Bu.px - 1, kind, col, Bu.centre)
  }
  ctx.globalAlpha = 1
}
function sparkle(g, x, y, s, rgb, a) {
  g.fillStyle = `rgba(${rgb},${a})`
  g.beginPath(); g.moveTo(x, y - s)
  g.quadraticCurveTo(x + s * 0.12, y - s * 0.12, x + s, y); g.quadraticCurveTo(x + s * 0.12, y + s * 0.12, x, y + s)
  g.quadraticCurveTo(x - s * 0.12, y + s * 0.12, x - s, y); g.quadraticCurveTo(x - s * 0.12, y - s * 0.12, x, y - s); g.fill()
}
/** rim glow (card-local px, divided by the display scale so it reads constant on screen) */
function rimGlow(rgb, k, s) {
  return `0 0 ${(lerp(30, 110, k) / s).toFixed(1)}px ${(lerp(3, 22, k) / s).toFixed(1)}px rgba(${rgb},${(0.42 + 0.5 * k).toFixed(3)}), 0 ${(30 / s).toFixed(1)}px ${(80 / s).toFixed(1)}px rgba(5,2,18,0.55)`
}
const mixRgb = (a, b, k) => a.map((v, i) => Math.round(lerp(v, b[i], k))).join(',')
const posStyle = (x, y, w, h, extra = {}) => ({ position: 'absolute', left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px', ...extra })

// ─────────────────────────────────────────────────────────────────────────────
export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const skyC = el('canvas', posStyle(0, 0, W, H), root); skyC.width = W; skyC.height = H
  const bx = skyC.getContext('2d')
  getSky()
  const shakeBox = el('div', posStyle(0, 0, W, H), root)

  // god-rays from the column (lock)
  const rr = rng(909); const stops = []; let ang = 0
  while (ang < 360) { const w = 1 + rr() * 3.2, gap = 2 + rr() * 9, a = (0.25 + rr() * 0.75).toFixed(2); stops.push(`rgba(255,240,214,0) ${ang.toFixed(1)}deg`, `rgba(255,240,214,${a}) ${(ang + w / 2).toFixed(1)}deg`, `rgba(255,240,214,0) ${(ang + w).toFixed(1)}deg`); ang += w + gap }
  const RAYS = 2400
  const rays = el('div', posStyle(CC.x - RAYS / 2, CC.y - RAYS / 2, RAYS, RAYS, { mixBlendMode: 'screen', opacity: 0, pointerEvents: 'none',
    background: `conic-gradient(from 0deg, ${stops.join(',')})`,
    webkitMaskImage: 'radial-gradient(closest-side, #000 6%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0) 100%)', maskImage: 'radial-gradient(closest-side, #000 6%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0) 100%)' }), shakeBox)

  // ── your card (Hakeem · Taurus)
  const you = el('div', posStyle(0, 0, SGN.w, SGN.h, { transformOrigin: '0 0', opacity: 0 }), shakeBox)
  const youGlow = el('div', posStyle(121, 121, SGN.bw, SGN.bh, { borderRadius: '45px' }), you)
  const youImg = img(you, A + 'card-sign.png', { left: 0, top: 0, width: SGN.w + 'px', height: SGN.h + 'px', clipPath: 'inset(121px 121px 121px 121px round 45px)' })

  // ── the talk card (The Fool)
  const talk = el('div', posStyle(0, 0, TLK.w, TLK.h, { transformOrigin: '0 0', opacity: 0 }), shakeBox)
  const talkGlow = el('div', posStyle(62, 60, 610, 1050, { borderRadius: '50px', boxShadow: '0 0 60px 8px rgba(200,170,255,0.32), 0 30px 80px rgba(5,2,18,0.55)' }), talk)
  img(talk, A + 'card-talk-1.png', { left: 0, top: 0, width: TLK.w + 'px', height: TLK.h + 'px', clipPath: 'inset(60px 60px 60px 62px round 50px)' })
  const talkFoilBox = el('div', posStyle(62, 60, 610, 1050, { borderRadius: '50px', overflow: 'hidden', mixBlendMode: 'screen', opacity: 0, pointerEvents: 'none' }), talk)
  const talkFoil = el('div', { position: 'absolute', top: '-30%', left: 0, width: '300px', height: '160%', transform: 'skewX(-22deg)',
    background: 'linear-gradient(90deg, rgba(242,199,92,0) 0%, rgba(242,199,92,0.12) 36%, rgba(255,228,160,0.5) 48.5%, rgba(255,246,220,0.8) 50%, rgba(255,228,160,0.5) 51.5%, rgba(242,199,92,0.12) 64%, rgba(242,199,92,0) 100%)' }, talkFoilBox)

  // ── Juniper's card (PNG px, one 3D plane)
  const card = el('div', posStyle(0, 0, PNG.w, PNG.h, { transformOrigin: '0 0' }), shakeBox)
  const julGlow = el('div', posStyle(120, 114, PNG.bw, PNG.bh, { borderRadius: '84px' }), card)
  const julImg = img(card, A + 'card-profile-3.png', { left: 0, top: 0, width: PNG.w + 'px', height: PNG.h + 'px', clipPath: 'inset(114px 122px 122px 120px round 84px)' })

  // photo window: aura print → her real photo (under the veil)
  const photoWin = el('div', posStyle(PWIN.x, PWIN.y, PWIN.w, PWIN.h, { borderRadius: PWIN.r + 'px', overflow: 'hidden', background: C.raised, display: 'none' }), card)
  const phStyle = { left: PH_L + 'px', top: PH_T + 'px', width: PH_W + 'px', height: PH_H + 'px' }
  const real = img(photoWin, IMG + 'juniper.jpg', { ...phStyle })
  // once the reveal settles, a desaturated copy eases the photo's own orange aura down to ~35% so her face reads first
  const calm = img(photoWin, IMG + 'juniper.jpg', { ...phStyle, filter: 'saturate(0.2) brightness(0.97) contrast(1.04)', opacity: 0 })
  const aura = makeAuraPrint(real)
  Object.assign(aura.cv.style, { position: 'absolute', ...phStyle, display: 'none' })
  photoWin.appendChild(aura.cv)
  const auraFx = el('div', { position: 'absolute', inset: 0, pointerEvents: 'none', display: 'none' }, photoWin)
  const halo = el('div', { position: 'absolute', inset: 0, mixBlendMode: 'screen' }, auraFx)
  const edgeField = el('div', { position: 'absolute', inset: 0, mixBlendMode: 'screen' }, auraFx)
  const leak = el('div', { position: 'absolute', left: '-20%', top: '-30%', width: '60%', height: '160%', mixBlendMode: 'screen' }, auraFx)
  const winFlash = el('div', { position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0, background: 'radial-gradient(60% 80% at 50% 45%, rgba(255,252,244,1) 0%, rgba(255,244,228,0.7) 45%, rgba(255,236,250,0.35) 100%)' }, photoWin)

  // the veil: the card's own window art (+ the breathing aura blobs), lifted off as one layer
  const veilWin = el('div', posStyle(WIN.x, WIN.y, WIN.w, WIN.h, { borderRadius: '40px', overflow: 'hidden' }), card)
  const veilIn = el('div', posStyle(0, 0, WIN.w, WIN.h, { willChange: 'transform, filter' }), veilWin)
  img(veilIn, A + 'card-profile-3.png', { left: -WIN.x + 'px', top: -WIN.y + 'px', width: PNG.w + 'px', height: PNG.h + 'px' })
  const blobBox = el('div', { position: 'absolute', inset: 0, mixBlendMode: 'screen',
    maskImage: 'linear-gradient(180deg, #000 0, #000 420px, rgba(0,0,0,0) 495px)', WebkitMaskImage: 'linear-gradient(180deg, #000 0, #000 420px, rgba(0,0,0,0) 495px)' }, veilIn)
  const blobs = [['232,98,138', 520, 0.0], ['154,123,224', 600, 2.1], ['180,92,255', 460, 4.2], ['120,140,255', 420, 1.1]]
    .map(([c, s, ph]) => ({ ph, s, e: el('div', posStyle(0, 0, s, s, { borderRadius: '50%', background: `radial-gradient(closest-side, rgba(${c},0.55), rgba(${c},0.18) 55%, rgba(${c},0) 100%)` }), blobBox) }))
  const arch = el('div', { position: 'absolute', left: '50%', top: '18%', width: '560px', height: '760px', marginLeft: '-280px', borderRadius: '280px 280px 0 0', background: 'radial-gradient(60% 55% at 50% 40%, rgba(255,226,250,0.28), rgba(200,150,255,0.12) 55%, rgba(200,150,255,0) 80%)', transformOrigin: '50% 100%' }, blobBox)
  const shim = el('div', { position: 'absolute', left: '-40%', top: '-30%', width: '30%', height: '160%', background: 'linear-gradient(90deg, rgba(255,240,250,0), rgba(255,236,250,0.32) 50%, rgba(255,240,250,0))', transform: 'rotate(18deg)', opacity: 0 }, blobBox)
  // seam glow riding the veil's lifting edge (above veil + photo)
  const topWin = el('div', posStyle(WIN.x, WIN.y, WIN.w, WIN.h, { borderRadius: '40px', overflow: 'hidden', pointerEvents: 'none' }), card)
  const seam = el('div', { position: 'absolute', left: '-10%', right: '-10%', top: 0, height: '190px', opacity: 0, mixBlendMode: 'screen',
    background: 'radial-gradient(50% 50% at 50% 50%, rgba(255,250,235,0.85) 0%, rgba(255,189,246,0.45) 35%, rgba(242,199,92,0.14) 60%, transparent 75%)' }, topWin)

  // badges: glow rings over LIBRA · AIR · GEMINI MOON
  const BADGES = [
    { at: B.sun, x0: 240, x1: 490, round: '10px', col: '232,122,190', pop: [365, 988] },
    { at: B.air, x0: 512, x1: 735, round: '44px', col: '127,216,240', pop: [623, 988] },
    { at: B.moon, x0: 759, x1: 1203, round: '44px', col: '170,150,255', pop: [981, 988] },
  ].map(b => ({ ...b, ring: el('div', posStyle(b.x0, 940, b.x1 - b.x0, 96, { borderRadius: b.round, boxShadow: `0 0 0 3px rgba(${b.col},0.95), 0 0 34px 8px rgba(${b.col},0.55), inset 0 0 26px rgba(${b.col},0.4)`, opacity: 0, transformOrigin: '50% 50%' }), card) }))
  // bio: warm light sweep across the printed quote + a gold bar
  const bio = el('div', posStyle(236, 1058, 990, 144, { overflow: 'hidden', mixBlendMode: 'screen', opacity: 0,
    maskImage: 'linear-gradient(180deg, rgba(0,0,0,0), #000 30%, #000 70%, rgba(0,0,0,0))', WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,0), #000 30%, #000 70%, rgba(0,0,0,0))' }), card)
  const bioBand = el('div', posStyle(0, 0, 420, 144, { background: 'linear-gradient(90deg, rgba(242,199,92,0), rgba(255,226,236,0.5) 50%, rgba(242,199,92,0))' }), bio)
  const bioBar = el('div', posStyle(212, 1072, 7, 116, { borderRadius: '3px', background: C.gold, boxShadow: '0 0 14px rgba(242,199,92,0.8)', transformOrigin: '50% 0', transform: 'scaleY(0)' }), card)

  // lock chip, bottom-centre of the window (64px mono ≈ 26px on screen at the 6.6 pose)
  const chip = el('div', { position: 'absolute', left: (WIN.x + WIN.w / 2) + 'px', top: (WIN.y + WIN.h - 34) + 'px', transform: 'translate(-50%,-100%)', display: 'flex', alignItems: 'center', gap: '34px',
    padding: '26px 46px 26px 40px', borderRadius: '50px', background: 'rgba(11,6,32,0.62)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    boxShadow: '0 0 0 2.5px rgba(239,230,214,0.22), 0 10px 40px rgba(5,2,18,0.45)', opacity: 0, overflow: 'hidden', whiteSpace: 'nowrap' }, card)
  const lockIc = el('div', { position: 'relative', width: '54px', height: '74px', flex: '0 0 auto' }, chip)
  const shackle = el('div', { position: 'absolute', left: '9px', top: '0', width: '36px', height: '42px', border: '8px solid #efe6d6', borderBottom: 'none', borderRadius: '22px 22px 0 0', boxSizing: 'border-box', transformOrigin: '100% 100%' }, lockIc)
  el('div', { position: 'absolute', left: '0', top: '34px', width: '54px', height: '40px', borderRadius: '7px', background: '#efe6d6' }, lockIc)
  el('div', { fontFamily: MONO, fontSize: '64px', lineHeight: '1.22', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(239,230,214,0.92)' }, chip, 'Photo hidden<br>until you both align')
  const chipSweep = el('div', { position: 'absolute', inset: 0, overflow: 'hidden', mixBlendMode: 'screen', opacity: 0 }, chip)
  const chipBand = el('div', posStyle(0, 0, 300, 400, { top: '-50px', background: 'linear-gradient(90deg, rgba(242,199,92,0), rgba(255,236,205,0.6), rgba(242,199,92,0))' }), chipSweep)
  // lock glint on the window rim (gold)
  const lockRim = el('div', posStyle(WIN.x, WIN.y, WIN.w, WIN.h, { borderRadius: '40px', boxShadow: '0 0 0 5px rgba(242,199,92,0.95), 0 0 46px 10px rgba(242,199,92,0.5), inset 0 0 40px rgba(255,226,170,0.35)', opacity: 0, pointerEvents: 'none' }), card)
  // footer: the art's baked "MYSTERY CARD" is covered in the card's own ink and re-set as "REVEALED" once the face resolves
  const footer = el('div', posStyle(990, 2014, 318, 54, { background: 'rgb(14,9,25)', opacity: 0, pointerEvents: 'none' }), card)
  el('div', { position: 'absolute', right: '19px', top: '0', height: '54px', lineHeight: '54px', fontFamily: MONO, fontSize: '33px', letterSpacing: '0.2em', marginRight: '-0.2em',
    textTransform: 'uppercase', color: 'rgba(242,199,92,0.82)', whiteSpace: 'nowrap' }, footer, 'Revealed')
  // gold-foil sweep across the card body after the reveal
  const foilBox = el('div', posStyle(120, 114, PNG.bw, PNG.bh, { borderRadius: '84px', overflow: 'hidden', mixBlendMode: 'screen', opacity: 0, pointerEvents: 'none' }), card)
  const foil = el('div', { position: 'absolute', top: '-30%', left: 0, width: '520px', height: '160%', transform: 'skewX(-22deg)',
    background: 'linear-gradient(90deg, rgba(242,199,92,0) 0%, rgba(242,199,92,0.12) 36%, rgba(255,228,160,0.5) 48.5%, rgba(255,246,220,0.8) 50%, rgba(255,228,160,0.5) 51.5%, rgba(242,199,92,0.12) 64%, rgba(242,199,92,0) 100%)' }, foilBox)

  // ── fx canvas (stars, trails, rings, bursts, sparkles) — inside the shaking layer
  const fxC = el('canvas', posStyle(0, 0, W, H, { pointerEvents: 'none' }), shakeBox); fxC.width = W; fxC.height = H
  const fx = fxC.getContext('2d')
  const DUST = (() => { const r = rng(515); return Array.from({ length: 150 }, (_, i) => ({ x: r() * W, y: r() * H * 0.8, s: 0.7 + r() * 1.8, a: 0.35 + r() * 0.65, col: i % 5 === 0 ? '242,199,92' : i % 7 === 0 ? CHAKRA[i % 7].join(',') : '255,246,234', ph: r() * 6.28 })) })()
  const SPK = (() => { const r = rng(616); return Array.from({ length: 16 }, () => ({ a: r() * 6.2832, d: r() * 0.16, s: 9 + r() * 14, gold: r() < 0.45, k0: 0.55 + r() * 0.1, k1: 0.8 + r() * 0.35 })) })()

  // soft lock flash (screen, radial, capped — never a white-out)
  const bigFlash = el('div', { position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0,
    background: `radial-gradient(42% 62% at ${CC.x / W * 100}% ${CC.y / H * 100}%, rgba(255,250,240,0.95) 0%, rgba(255,240,226,0.5) 38%, rgba(230,214,255,0.14) 75%, rgba(230,214,255,0) 100%)` }, root)

  // grain: the shared clumped silver grain, overlay, compensated for the plate dim (thinned on the photo for the face hold)
  const grainC = el('canvas', posStyle(0, 0, W, H, { mixBlendMode: 'overlay', pointerEvents: 'none' }), root); grainC.width = W; grainC.height = H
  const gx = grainC.getContext('2d')

  // ── captions (above the grain, as film 2): EB Garamond italic, bone, a feathered dark pocket behind — no boxes
  const capShadow = '0 2px 30px rgba(11,6,32,0.85), 0 0 10px rgba(8,4,24,0.55), -0.6px 0 0 rgba(232,98,138,0.3), 0.6px 0 0 rgba(140,170,255,0.25)'
  function capBox(left, top, width, align) {
    const box = el('div', { position: 'absolute', left: left + 'px', top: top + 'px', width: width + 'px', textAlign: align, opacity: 0, isolation: 'isolate', pointerEvents: 'none' }, root)
    el('div', { position: 'absolute', left: '-200px', right: '-200px', top: '-150px', bottom: '-150px', zIndex: -1,
      background: `radial-gradient(closest-side, ${[[0, 1], [30, 0.92], [52, 0.7], [70, 0.42], [86, 0.15], [100, 0]].map(([o, k]) => `rgba(11,6,32,${(0.58 * k).toFixed(3)}) ${o}%`).join(', ')})` }, box)
    return box
  }
  const line = (box, text, size, opts = {}) => new TypeLine(box, text, { position: 'relative', fontFamily: SERIF, fontStyle: 'italic', fontSize: size + 'px', lineHeight: 1.04, letterSpacing: '-0.005em', color: C.bone, textShadow: capShadow },
    { perChar: 0.011, fade: 0.2, accent: [C.rub, C.gold, C.violet], ...opts })
  const cap1 = capBox(1110, 352, 760, 'left')
  const c1 = line(cap1, 'Not knowing\nis the best part.', 112, { perChar: 0.024, accent: [C.violet, C.gold, C.rub] })
  const cap3 = capBox(1110, 400, 740, 'left')
  const c3 = line(cap3, 'Then you\nboth align.', 128, { perChar: 0.026, accent: [C.violet, C.plum, C.rub] })
  // talk-card eyebrow (under the card)
  const ebTalk = el('div', { position: 'absolute', left: (1330 - 400) + 'px', width: '800px', top: '908px', textAlign: 'center', fontFamily: MONO, fontSize: '41px', letterSpacing: '0.32em', textIndent: '0.32em',
    color: C.bone, textShadow: '0 0 14px rgba(11,6,32,0.95), 0 0 4px rgba(11,6,32,0.8)', opacity: 0, whiteSpace: 'pre', pointerEvents: 'none' }, root, 'TALK CARDS')
  const capFade = (box, t, a, out, outLen = 0.12) => {
    const i = ease.outCubic(prog(t, a, a + 0.4)), o = ease.inQuad(prog(t, out, out + outLen))
    box.style.opacity = String(Math.min(prog(t, a - 0.02, a + 0.06), 1 - o))
    box.style.transform = `translateY(${lerp(14, 0, i) - 10 * o}px)`
  }

  // pixel stars that gather into the mystery card (15.12–15.8)
  const GATHER = (() => { const r = rng(4242); return Array.from({ length: 30 }, (_, i) => {
    const a = r() * 6.2832, d = 380 + r() * 520
    return { a, d, u: r() - 0.5, v: r() - 0.5, t0: 15.1 + r() * 0.22, len: 0.45 + r() * 0.2, px: r() < 0.35 ? 5 : 4, col: PIXEL_PALETTE[Math.floor(r() * PIXEL_PALETTE.length)], kind: Math.floor(r() * 4) }
  }) })()
  // butterflies released from her window as the face resolves (they lift off the window's rim, out and up)
  const RELEASE = makeFlight(733, 7, (r, i) => {
    const side = i % 2 ? 1 : -1, fx_ = (i / 6 - 0.5)
    return { t0: B.res.peak + 0.04 + i * 0.07, x0: 700 + fx_ * 520, y0: 186 + r() * 24, vx: side * (30 + r() * 60) + fx_ * 60, vy: -(110 + r() * 70),
      sway: 18 + r() * 22, px: r() < 0.4 ? 6 : 5, col: FLYC[(i * 3) % 7], life: 2.0 + r() * 0.6 }
  })
  let jp = julPose(START)
  const toScreen = (px, py) => { const k = jp.h / PNG.bh; return [jp.cx + (px - PNG.cx) * k, jp.cy + (py - PNG.cy) * k] }

  return {
    start: START, end: END, root, fadeIn: 0,     // H2 is a straight cut onto an identical frame
    update(t) {
      const fi = Math.round(t * 30), lockF = Math.round(LOCK * 30)
      const dim = dimAt(t)
      sky(bx, t, dim)
      twinkles(bx, t)

      // charge into the lock, release after
      const ten = ease.inQuad(prog(t, B.glide, LOCK)) * (t < LOCK ? 1 : 0)
      const post = t >= LOCK ? 1 - ease.outCubic(prog(t, LOCK, LOCK + 0.5)) : 0
      const kick = t >= LOCK ? 0.03 * Math.sin(Math.PI * prog(t, LOCK, LOCK + 0.3)) : 0
      const trem = ten * ten * 3.5
      const jx = (noise1(t * 38, 5) - 0.5) * 2 * trem, jy = (noise1(t * 41, 9) - 0.5) * 2 * trem
      const lean = 9 * ten

      // shake (3 frames) + chroma punch on the lock
      const sf = fi - lockF, SH = [[-9, 6], [7, -4], [-3, 2]]
      const sh = sf >= 0 && sf < 3 ? SH[sf] : [0, 0]
      shakeBox.style.transform = `translate(${sh[0]}px, ${sh[1]}px)`
      const CH = [10, 6, 3]
      shakeBox.style.filter = sf >= 0 && sf < 3 ? `drop-shadow(${CH[sf]}px 0 0 rgba(255,40,90,0.5)) drop-shadow(${-CH[sf]}px 0 0 rgba(60,190,255,0.5))` : 'none'

      // ── Juniper's card
      jp = julPose(t)
      const k = jp.h / PNG.bh
      card.style.transform = `translate(${jp.cx + lean + jx}px, ${jp.cy + jy}px) perspective(2600px) rotateY(${jp.ry}deg) rotateX(${jp.pitch}deg) scale(${k * (1 + kick)}) translate(${-PNG.cx}px, ${-PNG.cy}px)`
      card.style.opacity = String(jp.op)
      card.style.filter = jp.em < 1 ? `blur(${(10 * (1 - jp.em) / k * 0.4).toFixed(2)}px) brightness(${(1 + 0.5 * (1 - jp.em)).toFixed(3)})` : 'none'

      // ── the talk card
      const tp = talkPose(t)
      talk.style.display = tp.op > 0.001 ? 'block' : 'none'
      if (tp.op > 0.001) {
        const kt = tp.h / TLK.bh
        talk.style.opacity = String(tp.op)
        talk.style.transform = `translate(${tp.cx}px, ${tp.cy}px) perspective(2600px) rotateY(${tp.ry}deg) rotate(${tp.rz}deg) scale(${kt}) translate(${-TLK.cx}px, ${-TLK.cy}px)`
        const land = Math.sin(Math.PI * prog(t, B.talk.b - 0.1, B.talk.b + 0.6))
        talkGlow.style.boxShadow = `0 0 ${(60 + 60 * land) / kt}px ${(8 + 14 * land) / kt}px rgba(200,170,255,${0.32 + 0.3 * land}), 0 ${30 / kt}px ${80 / kt}px rgba(5,2,18,0.55)`
        const tg = prog(t, B.talk.glint, B.talk.glint + 0.55)
        talkFoilBox.style.opacity = tg > 0 && tg < 1 ? String(Math.sin(Math.PI * tg) * 0.85) : '0'
        talkFoil.style.transform = `translateX(${lerp(-340, 760, ease.inOutCubic(tg))}px) skewX(-22deg)`
      }
      const glowK = t < LOCK ? Math.max(0.15 * prog(t, B.hold, B.hold + 0.4), ten) : lerp(1, 0.25, ease.inOutQuad(prog(t, LOCK, LOCK + 0.7)))
      const revealGlow = Math.sin(Math.PI * prog(t, B.res.peak - 0.1, B.res.peak + 0.9)) * 0.5
      julGlow.style.boxShadow = rimGlow(mixRgb([255, 150, 232], [255, 236, 200], post), clamp(glowK + revealGlow), k)
      julImg.style.filter = ten + post > 0.002 ? `brightness(${1 + 0.16 * ten + 0.22 * post})` : 'none'

      // ── your card
      const yp = youPose(t)
      const ky = yp.h / SGN.bh
      you.style.display = yp.op > 0.001 ? 'block' : 'none'
      you.style.opacity = String(yp.op)
      you.style.transform = `translate(${yp.cx - lean - jx}px, ${yp.cy - jy}px) perspective(2600px) rotateY(${yp.ry}deg) rotate(${yp.rz}deg) scale(${ky * (1 + kick)}) translate(${-SGN.cx}px, ${-SGN.cy}px)`
      youGlow.style.boxShadow = rimGlow(mixRgb([150, 240, 170], [255, 236, 180], post), t < LOCK ? Math.max(0.15, ten) : lerp(1, 0.3, ease.inOutQuad(prog(t, LOCK, LOCK + 0.6))), ky)
      youImg.style.filter = ten + post > 0.002 ? `brightness(${1 + 0.16 * ten + 0.22 * post})` : 'none'

      // ── veil breathing (alive until it lifts)
      const breath = 0.5 + 0.5 * Math.sin((t - 15) * 2.6 - 1.2)
      const deep = 0.7 + 0.3 * ten
      blobs.forEach((b, i) => {
        const a = t * (0.5 + i * 0.13) + b.ph
        const x = 537 + Math.cos(a) * 300 - b.s / 2, y = 290 + Math.sin(a * 1.3) * 150 - b.s / 2
        b.e.style.transform = `translate(${x}px, ${y}px) scale(${0.9 + 0.25 * breath})`
        b.e.style.opacity = String((0.25 + 0.4 * breath) * deep)
      })
      arch.style.transform = `scale(${0.94 + 0.1 * breath}, ${0.92 + 0.12 * breath})`
      arch.style.opacity = String((0.35 + 0.65 * breath) * deep)
      const sp = [15.9, 17.4, 19.3].map(a => prog(t, a, a + 0.85)).find(p => p > 0 && p < 1) ?? 0
      shim.style.opacity = String(sp > 0 ? Math.sin(Math.PI * sp) : 0)
      shim.style.left = `${lerp(-40, 120, ease.inOutQuad(sp))}%`

      // ── badges / bio / chip
      BADGES.forEach(b => {
        const p = prog(t, b.at, b.at + 0.5)
        const pop = 1 + 0.16 * (1 - ease.outCubic(p)) * (p > 0 ? 1 : 0)
        const flash = p > 0 ? lerp(1, 0.4, ease.outQuad(p)) : 0
        const off = 1 - prog(t, 17.9, 18.3)
        b.ring.style.opacity = String(flash * ease.outQuad(prog(t, b.at, b.at + 0.08)) * off)
        b.ring.style.transform = `scale(${pop})`
      })
      const bp = prog(t, B.bio, B.bio + 0.6)
      bio.style.opacity = String(bp > 0 && bp < 1 ? 1 : 0)
      bioBand.style.transform = `translateX(${lerp(-440, 1000, ease.inOutQuad(bp))}px)`
      const bar = ease.outCubic(prog(t, B.bio, B.bio + 0.35)) * (1 - prog(t, 17.9, 18.3))
      bioBar.style.transform = `scaleY(${bar})`; bioBar.style.opacity = String(bar)
      const chipO = ease.outQuad(prog(t, B.chip, B.chip + 0.22)) * (1 - ease.inOutQuad(prog(t, 21.37, 21.55)))
      chip.style.opacity = String(chipO)
      chip.style.transform = `translate(-50%,-100%) scale(${lerp(0.94, 1, ease.outCubic(prog(t, B.chip, B.chip + 0.35)))})`
      const cs = [B.glint, LOCK].map(a => prog(t, a, a + 0.6)).find(p => p > 0 && p < 1) ?? 0
      chipSweep.style.opacity = String(cs > 0 ? 1 : 0)
      chipBand.style.transform = `translateX(${lerp(-320, 1700, ease.inOutQuad(cs))}px)`
      // the lock pops open on the lock
      const un = ease.outBack(prog(t, LOCK, LOCK + 0.3))
      shackle.style.transform = `translateY(${-14 * un}px) rotate(${-24 * un}deg)`
      const lk = prog(t, B.glint, B.glint + 0.6), lk2 = prog(t, LOCK, LOCK + 0.5)
      lockRim.style.opacity = String(Math.max(lk > 0 && lk < 1 ? Math.sin(Math.PI * lk) * 0.9 : 0, lk2 > 0 && lk2 < 1 ? Math.sin(Math.PI * lk2) : 0))

      // ── the reveal: veil lift, aura-cam sweep, resolve
      const p = ease.inOutCubic(prog(t, B.lift.a, B.lift.b))
      const lifting = t >= B.lift.a
      photoWin.style.display = lifting ? 'block' : 'none'
      veilWin.style.display = p >= 1 ? 'none' : 'block'
      const edge = lerp(0, 135, p)
      veilWin.style.webkitMaskImage = veilWin.style.maskImage = p <= 0 ? 'none' : `linear-gradient(to top, transparent ${edge - 35}%, #000 ${edge}%)`
      veilIn.style.transform = `translateY(${-WIN.h * 0.22 * p}px) scale(${1 + 0.04 * p})`
      veilIn.style.filter = p <= 0 ? 'none' : `blur(${lerp(0, 18, p)}px) brightness(${1 + 0.15 * Math.sin(Math.PI * clamp(p * 1.4))})`
      const seamO = p <= 0 ? 0 : p < 0.08 ? p / 0.08 : p < 0.75 ? lerp(1, 0.9, (p - 0.08) / 0.67) : lerp(0.9, 0, (p - 0.75) / 0.25)
      seam.style.opacity = String(seamO)
      seam.style.transform = `translateY(${WIN.h * (1 - (p * 1.35 - 0.175)) - 95}px)`
      if (lifting) {
        const fb = Math.pow(1 - prog(t, B.lift.a + 0.05, B.res.peak), 2)
        const auraO = 1 - ease.inOutQuad(prog(t, B.res.a + 0.02, B.res.b - 0.03))
        const rfl = t < B.res.peak ? ease.inQuad(prog(t, B.res.a, B.res.peak)) : 1 - ease.outQuad(prog(t, B.res.peak, B.res.peak + 0.2))
        const after = t < B.res.peak ? 0 : 1 - ease.outCubic(prog(t, B.res.peak, B.res.peak + 0.35))
        real.style.filter = `blur(${(16 * fb).toFixed(2)}px) saturate(${lerp(0.7, 1.04, p)}) brightness(${1 + 0.18 * after})`
        winFlash.style.opacity = String(0.6 * rfl)
        const showAura = auraO > 0.001
        aura.cv.style.display = auraFx.style.display = showAura ? 'block' : 'none'
        if (showAura) {
          const sw = sweepAt(t)
          aura.draw(Math.round(sw * 1000) / 1000)
          aura.cv.style.opacity = String(auraO)
          aura.cv.style.filter = `blur(${(16 * fb + 1).toFixed(2)}px) contrast(1.06)`
          auraFx.style.opacity = String(auraO)
          const hx = PH_L + PH.fx * PH.s, hy = PH_T + PH.fy * PH.s
          const cIn = chakraAt(sw), cOut = chakraAt(sw - LAG - 0.2), cLeak = chakraAt(sw + 0.9)
          halo.style.background = `radial-gradient(${300 * PH.s}px ${340 * PH.s}px at ${hx}px ${hy + 60}px, rgba(255,250,240,0) 0%, rgba(255,250,240,0.16) 26%, ${rgbS(cIn, 0.4)} 44%, ${rgbS(cIn, 0.2)} 66%, ${rgbS(cIn, 0)} 100%)`
          edgeField.style.background = `radial-gradient(78% 105% at 50% 40%, ${rgbS(cOut, 0)} 48%, ${rgbS(cOut, 0.5)} 100%)`
          leak.style.left = lerp(-10, 85, ease.inOutQuad(prog(t, B.sweep.a - 0.1, B.res.b))) + '%'
          leak.style.background = `radial-gradient(closest-side, rgba(255,246,232,0.3) 0%, ${rgbS(cLeak, 0.36)} 35%, ${rgbS(cLeak, 0)} 100%)`
          leak.style.transform = `rotate(${lerp(-14, 10, prog(t, B.sweep.a - 0.1, B.res.b))}deg)`
        }
      }
      calm.style.opacity = String(0.65 * ease.inOutQuad(prog(t, 22.6, 23.1)))
      footer.style.opacity = t >= B.res.peak - 0.04 ? '1' : '0'   // swaps under the resolve flash (no doubled footer)
      const gp = prog(t, B.foil.a, B.foil.b)
      foilBox.style.opacity = gp > 0 && gp < 1 ? String(Math.sin(Math.PI * gp) * 0.85) : '0'
      foil.style.transform = `translateX(${lerp(-600, PNG.bw + 200, ease.inOutCubic(gp))}px) skewX(-22deg)`

      // ── lock flash + rays
      const fl = t < LOCK ? 0.34 * ease.inQuad(prog(t, LOCK - 0.1, LOCK)) : 0.34 * (1 - ease.outCubic(prog(t, LOCK, LOCK + 0.32)))
      bigFlash.style.opacity = String(fl)
      rays.style.opacity = String(t < LOCK ? 0.16 * ease.inQuad(prog(t, LOCK - 0.3, LOCK)) : 0.28 * (1 - ease.inOutQuad(prog(t, LOCK + 0.05, LOCK + 0.95))))
      rays.style.transform = `rotate(${(t - 20.35) * 8}deg) scale(${t < LOCK ? 0.7 : lerp(0.75, 1.0, ease.outCubic(prog(t, LOCK, LOCK + 0.8)))})`

      // ── fx canvas
      fx.clearRect(0, 0, W, H)
      fx.save(); fx.imageSmoothingEnabled = false
      // pixel-star pops at the badges, the bio and the chip glint
      ;[[B.sun, ...BADGES[0].pop], [B.air, ...BADGES[1].pop], [B.moon, ...BADGES[2].pop], [B.bio, 240, 1074], [B.glint, WIN.x + WIN.w - 20, WIN.y + 30]].forEach(([at, px, py], j) => {
        const q = prog(t, at, at + 0.5)
        if (q <= 0 || q >= 1) return
        const [sx, sy] = toScreen(px, py), r = rng(j * 31 + 7)
        for (let i = 0; i < 7; i++) {
          const a = r() * 6.2832, d = (18 + r() * 60) * ease.outCubic(q)
          const col = PIXEL_PALETTE[Math.floor(r() * PIXEL_PALETTE.length)]
          fx.globalAlpha = 1 - ease.inQuad(q)
          drawPixelStar(fx, sx + Math.cos(a) * d, sy + Math.sin(a) * d, 14 + r() * 8, ((fi + i) & 1) ? (i % 2 ? 2 : 3) : 1, col)
        }
      })
      fx.globalAlpha = 1
      fx.restore()
      fx.globalCompositeOperation = 'lighter'
      // dust pulled toward the column, blown out at the lock
      const dustIn = prog(t, B.glide - 0.25, B.glide + 0.1) * (1 - ease.outQuad(prog(t, LOCK, LOCK + 0.45)))
      if (dustIn > 0) {
        const pullAt = (tt) => ease.inCubic(prog(tt, B.glide - 0.05, LOCK)) * 0.94
        const blow = ease.outCubic(prog(t, LOCK, LOCK + 0.7))
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
      // the column: connectors, beam, stars + trails; then the stars sink into her photo window
      const collapse = ease.inCubic(prog(t, B.sink.a, B.sink.b))
      if (t >= B.starIn && collapse < 1) {
        const SS = CHAKRA_HEX.map((_, i) => starState(i, t))
        const target = toScreen(WIN.x + WIN.w / 2, WIN.y + WIN.h / 2)
        for (let i = 0; i < 6; i++) {
          const A1 = SS[i], B1 = SS[i + 1]
          if (!A1 || !B1) continue
          const mc = Math.min(A1.c, B1.c), lockT = Math.max(STAR_LOCK[i], STAR_LOCK[i + 1])
          let al = 0.4 * clamp((mc - 0.4) / 0.45)
          if (t >= lockT) al = lerp(1, 0.45, ease.outQuad(prog(t, lockT, lockT + 0.3)))
          if (t >= LOCK) al = Math.max(al, lerp(1, 0.55, ease.outQuad(prog(t, LOCK, LOCK + 0.4))))
          al *= 1 - ease.outQuad(prog(t, B.sink.a - 0.05, B.sink.a + 0.12))
          if (al < 0.01) continue
          fx.strokeStyle = `rgba(255,236,200,${(al * 0.35).toFixed(3)})`; fx.lineWidth = 7
          fx.beginPath(); fx.moveTo(A1.x, A1.y); fx.lineTo(B1.x, B1.y); fx.stroke()
          fx.strokeStyle = `rgba(255,248,236,${al.toFixed(3)})`; fx.lineWidth = 1.6
          fx.beginPath(); fx.moveTo(A1.x, A1.y); fx.lineTo(B1.x, B1.y); fx.stroke()
        }
        if (t >= LOCK - 0.04) {
          const bo = (t < LOCK ? prog(t, LOCK - 0.04, LOCK) : lerp(1, 0.3, ease.outQuad(prog(t, LOCK, LOCK + 0.45)))) * (1 - ease.outQuad(prog(t, B.sink.a - 0.05, B.sink.a + 0.15)))
          const BW = 56, bg = fx.createLinearGradient(CC.x - BW, 0, CC.x + BW, 0)
          bg.addColorStop(0, 'rgba(255,240,214,0)'); bg.addColorStop(0.5, `rgba(255,244,226,${(0.5 * bo).toFixed(3)})`); bg.addColorStop(1, 'rgba(255,240,214,0)')
          fx.fillStyle = bg; fx.fillRect(CC.x - BW, -20, BW * 2, H + 40)
        }
        SS.forEach((s, i) => {
          if (!s) return
          const rgb = CHAKRA[i].join(','), e0 = B.starIn + ENTER_ORDER[i] * 0.055
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
          let sz = (1 + 0.14 * Math.sin(t * 9 + i * 1.7)) * (0.85 + 0.35 * ten) * (1 + 0.9 * flare + 1.1 * lockFlare)
          let x = s.x, y = s.y
          if (collapse > 0) { x = lerp(x, target[0], collapse); y = lerp(y, target[1], collapse); sz *= 1 - 0.85 * collapse }
          const ent = Math.min(1, s.enter * 3) * (1 - collapse)
          if (sz <= 0.01 || ent <= 0.005) return
          const G = 44 * sz, gg = fx.createRadialGradient(x, y, 0, x, y, G)
          gg.addColorStop(0, `rgba(${rgb},${0.75 * ent})`); gg.addColorStop(0.3, `rgba(${rgb},${0.28 * ent})`); gg.addColorStop(1, `rgba(${rgb},0)`)
          fx.fillStyle = gg; fx.fillRect(x - G, y - G, G * 2, G * 2)
          const spk = (20 + 28 * ten + 64 * flare + 80 * lockFlare) * sz
          fx.strokeStyle = `rgba(255,250,240,${(0.55 * ent).toFixed(3)})`; fx.lineWidth = 1.4
          fx.beginPath(); fx.moveTo(x - spk, y); fx.lineTo(x + spk, y); fx.moveTo(x, y - spk * 0.7); fx.lineTo(x, y + spk * 0.7); fx.stroke()
          const cg = fx.createRadialGradient(x, y, 0, x, y, 10 * sz)
          cg.addColorStop(0, `rgba(255,255,255,${ent})`); cg.addColorStop(0.45, `rgba(${rgb},${0.9 * ent})`); cg.addColorStop(1, `rgba(${rgb},0)`)
          fx.fillStyle = cg; fx.beginPath(); fx.arc(x, y, 10 * sz, 0, 6.2832); fx.fill()
        })
        // her window takes in the stars: a soft bloom as they sink
        if (collapse > 0) {
          const b = Math.sin(Math.PI * collapse) * 0.5, G = 240
          const gg = fx.createRadialGradient(target[0], target[1], 0, target[0], target[1], G)
          gg.addColorStop(0, `rgba(255,240,250,${b})`); gg.addColorStop(1, 'rgba(255,200,240,0)')
          fx.fillStyle = gg; fx.fillRect(target[0] - G, target[1] - G, G * 2, G * 2)
        }
      }
      // rings on the lock (kept inside the cards' band, clear of the caption)
      if (t >= LOCK && t < LOCK + 0.85) {
        ;[[0, 600, 14, '255,246,230'], [0.07, 470, 9, '201,166,255'], [0.14, 360, 5, '242,199,92']].forEach(([d, R1, w0, rgb]) => {
          const q = prog(t, LOCK + d, LOCK + d + 0.65)
          if (q <= 0 || q >= 1) return
          const R = lerp(80, R1, ease.outCubic(q))
          fx.strokeStyle = `rgba(${rgb},${(0.65 * (1 - ease.inQuad(q))).toFixed(3)})`; fx.lineWidth = lerp(w0, 1.5, q)
          fx.beginPath(); fx.ellipse(CC.x, CC.y, R, R * 0.9, 0, 0, 6.2832); fx.stroke()
        })
      }
      // pixel stars gather into the card as it appears
      if (t < 15.9) {
        fx.save(); fx.imageSmoothingEnabled = false
        GATHER.forEach((g, i) => {
          const q = prog(t, g.t0, g.t0 + g.len)
          if (q <= 0 || q >= 1) return
          const e = ease.inOutCubic(q)
          const [tx, ty] = toScreen(PNG.cx + g.u * PNG.bw * 0.9, PNG.cy + g.v * PNG.bh * 0.9)
          const sx = jp.cx + Math.cos(g.a) * g.d * 1.3, sy = jp.cy + Math.sin(g.a) * g.d * 0.8
          fx.globalAlpha = Math.min(1, q * 5) * (1 - ease.inQuad(prog(q, 0.7, 1)))
          sprite(fx, lerp(sx, tx, e), lerp(sy, ty, e), g.px, q > 0.75 ? 2 : ((fi + i) >> 1) & 1 ? g.kind : 1, g.col, HOT)
        })
        fx.globalAlpha = 1; fx.restore()
      }
      // resolve sparkles around the photo window
      const rk = prog(t, B.res.peak - 0.03, B.res.peak + 0.75)
      if (rk > 0 && rk < 1) {
        const [wx, wy] = toScreen(WIN.x + WIN.w / 2, WIN.y + WIN.h / 2), ww = WIN.w * k, wh = WIN.h * k
        SPK.forEach((s) => {
          const q = prog(rk, s.d, s.d + 0.75)
          if (q <= 0 || q >= 1) return
          const R = lerp(s.k0, s.k1, ease.outCubic(q))
          sparkle(fx, wx + Math.cos(s.a) * ww * R, wy + Math.sin(s.a) * wh * R * 1.1, s.s * Math.sin(Math.PI * q), s.gold ? '255,226,150' : '255,244,236', Math.min(1, Math.sin(Math.PI * q) * 1.5))
        })
      }
      fx.globalCompositeOperation = 'source-over'
      fx.save(); fx.imageSmoothingEnabled = false
      drawBurst(fx, { t: LOCK, x: CC.x, y: CC.y, r0: 140, r1: 760, n: 28, px: 5, life: 0.95, pal: [GOLD, '#ffe6a0', GOLD, BONE], centre: HOT, sy: 0.78, seed: 3 }, t)
      drawBurst(fx, { t: LOCK + 0.07, x: CC.x, y: CC.y, r0: 80, r1: 460, n: 16, px: 4, life: 0.8, pal: CHAKRA_HEX, centre: HOT, sy: 0.9, seed: 9 }, t)
      fx.restore()
      // butterflies out of the window (screen space, above the card)
      drawFlight(fx, RELEASE, t, 1 - ease.inQuad(prog(t, B.exit.a, B.exit.b)))

      // ── grain: same look as every scene (overlay .5, /√dim for the dimmed plate), eased off under the flash;
      //    thinned (feathered) on her photo from the resolve so the face reads clear
      grainC.style.opacity = String(grainOpacity(dim) * (1 - 1.5 * fl))
      drawGrain(gx, t)
      const thin = 0.7 * ease.inOutQuad(prog(t, B.res.peak, B.res.peak + 0.3)) * jp.op
      if (thin > 0.01) {
        const [wx, wy] = toScreen(PWIN.x + PWIN.w / 2, PWIN.y + PWIN.h / 2)
        const ww = PWIN.w * k, wh = PWIN.h * k
        gx.save(); gx.globalCompositeOperation = 'destination-out'; gx.filter = 'blur(10px)'
        gx.fillStyle = `rgba(0,0,0,${thin.toFixed(3)})`
        gx.beginPath(); gx.roundRect(wx + lean - ww / 2 + 4, wy - wh / 2 + 4, ww - 8, wh - 8, PWIN.r * k); gx.fill()
        gx.restore()
      }

      // ── captions
      capFade(cap1, t, B.cap1, B.cap1Out, 0.14)
      c1.update(t - B.cap1)
      ebTalk.style.opacity = String(ease.outQuad(prog(t, B.talk.b - 0.15, B.talk.b + 0.2)) * (1 - ease.inQuad(prog(t, B.talk.out - 0.1, B.talk.out + 0.12))))
      ebTalk.style.letterSpacing = lerp(0.42, 0.32, ease.outCubic(prog(t, B.talk.b - 0.15, B.talk.b + 0.4))) + 'em'
      capFade(cap3, t, B.cap3, B.cap3Out, 0.2)
      c3.update(t - B.cap3)
    },
  }
}

export const cues = [
  ['riser', 15.05, B.emerge.b, 0.05],                                                     // the card gathers out of the stars
  ['glitter', 15.15, 15.8], ['bell', 15.75, 739.99, 0.035, 1.8, -0.2], ['bell', 15.82, 1108.73, 0.03, 1.8, -0.1],
  ['bell', B.cap1 + 0.02, 587.33, 0.04, 1.8, 0.25],                                       // "Not knowing is the best part."
  ['bell', B.sun, 880, 0.03, 1.0, -0.3], ['bell', B.air, 1108.73, 0.024, 0.9, -0.2], ['bell', B.moon, 1318.51, 0.028, 1.0, -0.1],
  ['glitter', B.sun, B.moon + 0.35],
  ['whoosh', B.bio, 0.45, 0.03],
  ['tick', B.chip, 0.05], ['bell', B.glint, 1760, 0.03, 1.2, -0.2],              // lock chip + glint
  ['whoosh', B.talk.a - 0.02, 0.6, 0.07], ['tick', B.talk.b - 0.05, 0.04],          // the talk card is dealt
  ['bell', B.talk.b - 0.04, 987.77, 0.035, 1.6, 0.3], ['bell', B.talk.b + 0.04, 1479.98, 0.022, 1.6, 0.35],
  ...[1318.51, 1479.98, 1760, 1975.53, 2349.32].map((f, i) => ['bell', B.talk.glint + i * 0.06, f, 0.014, 0.6, 0.3 + i * 0.05]),
  ['whoosh', B.talk.out, 0.5, 0.05],                                                // talk card lifts away
  ['whoosh', B.youIn - 0.02, 0.6, 0.08],                                           // your card slides in
  ...[0, 1, 2, 3, 4, 5, 6].flatMap((i) => [['whoosh', B.starIn + i * 0.055 + 0.28, 0.32, 0.03], ['bell', B.starIn + i * 0.055 + 0.32, 2349.32, 0.011, 0.9, ((i % 3) - 1) * 0.5]]),
  ['riser', B.youSet - 0.05, LOCK, 0.12],                                          // tension into the lock
  ...[493.88, 587.33, 659.25, 739.99, 880, 987.77, 1174.66].flatMap((f, i) => [['tick', STAR_LOCK[i], 0.06], ['bell', STAR_LOCK[i], f, 0.045, 1.1, (i - 3) * 0.12]]),
  ['boom', LOCK, 0.32], ['tick', LOCK, 0.2],                                        // LOCK
  ['bell', LOCK, 220, 0.07, 2.8, 0], ['bell', LOCK + 0.01, 554.37, 0.055, 2.4, -0.25], ['bell', LOCK + 0.02, 659.25, 0.045, 2.4, 0.25], ['bell', LOCK + 0.03, 1108.73, 0.032, 2.4, 0],
  ['glitter', LOCK, LOCK + 0.7],
  ['whoosh', B.youOut, 0.5, 0.06],                                                 // your card out, her card in
  ['bell', B.sink.b - 0.05, 1318.51, 0.025, 1.2, -0.2],                            // stars sink into her window
  ['bell', B.cap3 + 0.02, 440, 0.045, 2.0, 0.25], ['bell', B.cap3 + 0.1, 659.25, 0.03, 2.0, 0.3],  // "Then you both align."
  ['whoosh', B.lift.a, 0.6, 0.06],                                                 // the veil rises
  ...[261.63, 293.66, 329.63, 392, 440, 523.25, 587.33].map((f, i) => ['bell', B.sweep.a + i * 0.064, f, 0.04, 0.9, (i - 3) * 0.12 - 0.2]),   // aura-cam sweep
  ['glitter', B.res.peak - 0.06, B.res.peak + 0.55], ['boom', B.res.peak, 0.14],  // resolve shimmer
  ['bell', B.res.peak, 1318.51, 0.045, 2.0, -0.2], ['bell', B.res.peak + 0.06, 1975.53, 0.03, 2.0, -0.1],
  ...[0, 1, 2, 3, 4, 5, 6].map((i) => ['tick', B.res.peak + 0.08 + i * 0.07, 0.012]),   // butterflies lift off
  ...[1174.66, 1318.51, 1479.98, 1760, 1975.53, 2349.32, 2637.02].map((f, i) => ['bell', B.foil.a + i * 0.05, f, 0.016, 0.6, i / 3 - 1]),   // gold foil
  ['whoosh', B.exit.a, 0.45, 0.05],                                                // the card drifts out
]
