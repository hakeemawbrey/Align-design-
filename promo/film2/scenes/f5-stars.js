// Film 2 · f5 READ THE STARS (real time 15.0–20.2). Two charts meet: your Taurus card and Juniper's
// veiled mystery card drift together in deep space under a waxing moon; a quick reading plays between
// them (SPARK / RUB / ALIGN), then the seven chakra stars streak in, glide into the column between the
// cards and LOCK (flash, rings, rays, gold pixel burst, 3-frame shake). "The stars aligned."
// The world (sky, grain, moon, Juniper's card pose) is exported so f6 can continue the exact frame.
//
// Beat map (sound):
//   15.00–15.95  cards drift in from f4's sea (from x≈400 / 1520, small) to x 610 / 1300 · moon crescent
//   15.45        caption "✦ JUNIPER × YOU ✦ / Two charts meet." (out 16.95–17.13)
//   15.72 SPARK · 16.12 RUB · 16.52 ALIGN   beam draws across the gap (0.2s), dots pop at +0.16/+0.23/+0.30
//   17.02–17.28  readings retract into the column
//   17.08–17.9   seven chakra stars streak in (stagger 0.065) → orbit → glide 17.68–
//   18.09…18.42  stars click into the column (red bottom → violet top), STAR_LOCK[i] = 18.09 + i·0.055
//   18.45        LOCK: flash, shockwave rings, rays, gold pixel burst, shake (3 frames), moon full
//   18.51–19.76  "The stars aligned."
//   19.45–19.95  your card drifts out left; Juniper's card glides to centre; the stars sink into her card
//   20.00        hand-off: f6 draws the same frame (sky + full moon + Juniper's mystery card at 960,440 ×0.33)
import { clamp, lerp, prog, ease, rng, noise1, el, C } from '../../src/lib.js'
import { W, H, A, IMG, SERIF, MONO, fill, img, makeStars } from '../../src/scenes/common.js'

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
// card-sign.png 848×1152 (Hakeem · Taurus, "you") opaque body x 121..726, y 121..1030 → same body height as Juniper's
const SGN = { w: 848, h: 1152 }
const S5 = 2002 * M5 / 910
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
  return { x, y, s, ry, rz }
}
function youPose(t) {
  const e = ease.outCubic(prog(t, CARD_IN.a, CARD_IN.b))
  const out = ease.inCubic(prog(t, MOVE.a - 0.02, MOVE.b - 0.05))
  const bob = Math.sin((t - 15) * 2.0) * 6 * e
  return {
    x: lerp(lerp(380, L_X, e), -260, out), y: lerp(490, CARD_Y, e) + bob + 40 * out,
    s: lerp(0.22, M5, e) * (S5 / M5) * lerp(1, 0.86, out), ry: lerp(24, 9, e) + 20 * out, rz: lerp(-5, -1.2, e) - 6 * out, op: 1 - ease.inQuad(prog(t, MOVE.a + 0.15, MOVE.b)),
  }
}

// ── shared world pieces ───────────────────────────────────────────────────────
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
let GRAIN = null
/** animated film grain overlay (call update(t) every frame) */
export function grainLayer(parent, op = 0.2) {
  GRAIN = GRAIN || grainURL(256, 11)
  const e = el('div', { position: 'absolute', inset: 0, backgroundImage: `url(${GRAIN})`, backgroundSize: '256px 256px', mixBlendMode: 'overlay', opacity: op, pointerEvents: 'none', zIndex: 50 }, parent)
  return { e, update(t) { const r = rng(Math.round(t * 30) * 131 + 17); e.style.backgroundPosition = `${Math.floor(r() * 256)}px ${Math.floor(r() * 256)}px` } }
}
/** deep-space sky of the first film's S3 (indigo radial, stars, faint nebula, dust lanes) */
export function skyLayer(parent) {
  const sky = el('div', { position: 'absolute', inset: 0, background: 'radial-gradient(70% 80% at 50% 42%, #24124a 0%, #150b33 55%, #0b0620 100%)' }, parent)
  const neb = el('div', { position: 'absolute', inset: '-80px', mixBlendMode: 'screen', background: 'radial-gradient(40% 50% at 18% 72%, rgba(180,92,255,0.18), rgba(180,92,255,0) 70%), radial-gradient(36% 44% at 84% 24%, rgba(232,98,138,0.14), rgba(232,98,138,0) 70%), radial-gradient(30% 22% at 70% 88%, rgba(95,220,140,0.07), rgba(95,220,140,0) 70%)' }, sky)
  const stars = makeStars(sky, 150, 21)
  return {
    sky, stars,
    update(t) {
      stars.style.transform = `translate(${Math.sin(t * 0.15) * 10}px, ${(t - 15) * -3}px)`
      neb.style.transform = `translate(${Math.sin(t * 0.3) * 30}px, ${Math.cos(t * 0.25) * 20}px)`
    },
  }
}

/** the moon texture (pearl disc, maria, craters, limb darkening) — from the first film's S3 */
function moonTexture(R) {
  const S = R * 2 + 4, c = document.createElement('canvas'); c.width = c.height = S
  const g = c.getContext('2d'), o = S / 2
  g.save(); g.beginPath(); g.arc(o, o, R, 0, 6.2832); g.clip()
  const base = g.createRadialGradient(o - R * 0.22, o - R * 0.26, R * 0.05, o, o, R)
  base.addColorStop(0, '#fbf6ec'); base.addColorStop(0.55, '#efe6d6'); base.addColorStop(0.88, '#ddd1c0'); base.addColorStop(1, '#c4b7a8')
  g.fillStyle = base; g.fillRect(0, 0, S, S)
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
  g.filter = 'none'
  const tx = o - 0.12 * R, ty = o + 0.62 * R
  for (let k = 0; k < 14; k++) {
    const a = r() * 6.2832, l = (0.2 + r() * 0.5) * R
    const lg = g.createLinearGradient(tx, ty, tx + Math.cos(a) * l, ty + Math.sin(a) * l)
    lg.addColorStop(0, 'rgba(255,252,246,0.22)'); lg.addColorStop(1, 'rgba(255,252,246,0)')
    g.strokeStyle = lg; g.lineWidth = R * 0.008; g.beginPath(); g.moveTo(tx, ty); g.lineTo(tx + Math.cos(a) * l, ty + Math.sin(a) * l); g.stroke()
  }
  g.fillStyle = 'rgba(255,253,248,0.6)'; g.beginPath(); g.arc(tx, ty, R * 0.022, 0, 6.2832); g.fill()
  const limb = g.createRadialGradient(o, o, R * 0.6, o, o, R)
  limb.addColorStop(0, 'rgba(70,50,90,0)'); limb.addColorStop(1, 'rgba(70,50,90,0.28)')
  g.fillStyle = limb; g.fillRect(0, 0, S, S)
  g.restore()
  return c
}
export const MOON_R = 400
let MOON_TEX = null
/** waxing moon centred on (cx, cy) of `parent`; update(lit 0..1, opacity, glow, scale) */
export function moonLayer(parent, cx, cy) {
  const R = MOON_R
  const glow = el('div', { position: 'absolute', left: cx - R * 2.2 + 'px', top: cy - R * 2.2 + 'px', width: R * 4.4 + 'px', height: R * 4.4 + 'px', borderRadius: '50%', mixBlendMode: 'screen', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(255,244,226,0.55) 40%, rgba(232,214,255,0.22) 52%, rgba(180,140,255,0.08) 70%, rgba(180,140,255,0) 100%)' }, parent)
  const MS = R * 2 + 40
  const cv = el('canvas', { position: 'absolute', left: cx - MS / 2 + 'px', top: cy - MS / 2 + 'px', width: MS + 'px', height: MS + 'px', opacity: 0 }, parent)
  cv.width = cv.height = MS
  const mask = document.createElement('canvas'); mask.width = mask.height = MS
  let last = -1
  function draw(f) {
    MOON_TEX = MOON_TEX || moonTexture(R)
    if (f === last) return
    last = f
    const g = cv.getContext('2d'), m = mask.getContext('2d'), o = MS / 2, tex = MOON_TEX
    g.clearRect(0, 0, MS, MS)
    g.globalAlpha = 0.05; g.drawImage(tex, o - tex.width / 2, o - tex.height / 2); g.globalAlpha = 1
    const cphi = 1 - 2 * f
    m.clearRect(0, 0, MS, MS)
    m.filter = `blur(${R * 0.022}px)`
    m.fillStyle = '#fff'; m.beginPath(); m.moveTo(o, o - R)
    m.arc(o, o, R, -Math.PI / 2, Math.PI / 2, false)
    m.ellipse(o, o, Math.max(0.01, Math.abs(cphi) * R), R, 0, Math.PI / 2, -Math.PI / 2, cphi > 0)
    m.closePath(); m.fill(); m.filter = 'none'
    m.globalCompositeOperation = 'source-in'; m.drawImage(tex, o - tex.width / 2, o - tex.height / 2); m.globalCompositeOperation = 'source-over'
    g.drawImage(mask, 0, 0)
  }
  return {
    glow, cv,
    update(lit, op, glowO, sc = 1, glowSc = 1) {
      draw(Math.round(lit * 400) / 400)
      cv.style.opacity = String(op); cv.style.transform = `scale(${sc})`
      glow.style.opacity = String(glowO); glow.style.transform = `scale(${sc * glowSc})`
    },
  }
}
/** moon phase/opacity/glow as a function of t (f5 waxes it to full at the lock; f6 keeps it) */
export function moonState(t) {
  const lit = 0.045 + 0.955 * Math.pow(prog(t, 15.0, LOCK), 2)
  const post = t >= LOCK ? 1 - ease.outCubic(prog(t, LOCK, LOCK + 0.5)) : 0
  const op = 0.82 * ease.inOutQuad(prog(t, 15.0, 15.5))
  return { lit, op, glow: (op / 0.82) * (0.12 + 0.55 * lit * lit + 0.5 * post), post }
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
  const root = fill(stage, { background: C.void })
  const sky = skyLayer(root)
  const dim = el('div', { position: 'absolute', inset: 0, background: '#07041a', opacity: 0 }, root)
  const shakeBox = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  const moon = moonLayer(shakeBox, CC.x, CC.y)
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
  // your card (Taurus) · Juniper's card
  const you = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0 }, shakeBox)
  const youGlow = el('div', { position: 'absolute', left: (121 - SGN.w / 2) + 'px', top: (121 - SGN.h / 2) + 'px', width: '606px', height: '910px', borderRadius: '45px' }, you)
  const youCard = img(you, A + 'card-sign.png', { left: -SGN.w / 2 + 'px', top: -SGN.h / 2 + 'px', width: SGN.w + 'px', height: SGN.h + 'px', clipPath: 'inset(121px 121px 121px 121px round 45px)' })
  const jul = mysteryCard(shakeBox)
  // reading labels (above the cards)
  const rows = READ.map((R) => {
    const box = el('div', { position: 'absolute', left: (CC.x - 160) + 'px', width: '320px', top: (R.y - 30) + 'px', textAlign: 'center', opacity: 0 }, shakeBox)
    const lab = el('div', { fontFamily: MONO, fontSize: '28px', letterSpacing: '0.26em', textIndent: '0.26em', textTransform: 'uppercase', color: R.col, lineHeight: '34px',
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
    background: `radial-gradient(55% 75% at 50% ${CC.y / H * 100}%, rgba(255,253,248,1) 0%, rgba(255,246,232,0.92) 40%, rgba(240,226,255,0.7) 100%)` }, root)
  // captions
  const scrim = el('div', { position: 'absolute', left: 0, right: 0, bottom: 0, height: '400px', background: 'linear-gradient(180deg, rgba(11,6,32,0) 0%, rgba(11,6,32,0.08) 20%, rgba(11,6,32,0.28) 40%, rgba(11,6,32,0.52) 60%, rgba(11,6,32,0.72) 80%, rgba(11,6,32,0.8) 100%)', opacity: 0 }, root)
  const capBox = el('div', { position: 'absolute', left: '50%', bottom: '70px', transform: 'translateX(-50%)', textAlign: 'center', whiteSpace: 'nowrap' }, root)
  const eyebrow = el('div', { fontFamily: MONO, fontSize: '26px', letterSpacing: '0.28em', textIndent: '0.28em', color: 'rgba(239,230,214,0.92)', textShadow: '0 1px 12px rgba(11,6,32,0.8)', marginBottom: '12px', textTransform: 'uppercase', opacity: 0 }, capBox, '✦&nbsp;&nbsp;Juniper&nbsp;&nbsp;×&nbsp;&nbsp;You&nbsp;&nbsp;✦')
  const capLine = el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: '80px', lineHeight: 1.05, color: C.bone, textShadow: '0 2px 30px rgba(11,6,32,0.85), 0 1px 3px rgba(11,6,32,0.7)', opacity: 0 }, capBox, 'Two charts meet.')
  const lockBox = el('div', { position: 'absolute', left: '50%', bottom: '64px', transform: 'translateX(-50%)', textAlign: 'center', whiteSpace: 'nowrap' }, root)
  const lockLine = el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: '116px', lineHeight: 1, color: C.bone, opacity: 0,
    textShadow: '0 0 40px rgba(255,236,200,0.45), 0 2px 34px rgba(11,6,32,0.9), 0 1px 3px rgba(11,6,32,0.7)' }, lockBox, 'The stars aligned.')
  const grain = grainLayer(root, 0.2)

  return {
    start: 15.0, end: 20.2, root, fadeIn: 0.25, fxEnd: 20.0,
    fx(ctx, t) {
      drawAmbient(ctx, t, prog(t, 15.0, 15.4))
      drawBurst(ctx, { t: LOCK, x: CC.x, y: CC.y, r0: 150, r1: 900, n: 30, px: 5, life: 1.0, pal: [GOLD, '#ffe6a0', GOLD, BONE], centre: HOT, sy: 0.78, seed: 3 }, t)
      drawBurst(ctx, { t: LOCK + 0.08, x: CC.x, y: CC.y, r0: 90, r1: 520, n: 16, px: 4, life: 0.8, pal: CHAKRA_HEX, centre: HOT, sy: 0.9, seed: 9 }, t)
    },
    update(t) {
      sky.update(t); grain.update(t)
      const fi = Math.round(t * 30), lockF = Math.round(LOCK * 30)
      const ten = ease.inQuad(prog(t, GLIDE, LOCK))
      const post = t >= LOCK ? 1 - ease.outCubic(prog(t, LOCK, LOCK + 0.5)) : 0
      const trem = ten * ten * 4.5 * (t < LOCK ? 1 : 0)
      const kick = t >= LOCK ? 0.035 * Math.sin(Math.PI * prog(t, LOCK, LOCK + 0.3)) : 0

      // ── moon (waxes to full at the lock)
      const ms = moonState(t)
      moon.update(ms.lit, ms.op, ms.glow, 1, 1 + 0.15 * post)
      dim.style.opacity = String(0.5 * ten * (t < LOCK ? 1 : 0) + (t >= LOCK ? 0.2 * (1 - ease.outQuad(prog(t, LOCK, LOCK + 0.5))) : 0))
      sky.stars.style.opacity = String(1 - 0.5 * ten * (t < LOCK ? 1 : 0))

      // ── cards
      const lean = 10 * ten * (t < LOCK ? 1 : 0)       // drawn toward the column as the stars commit
      const jx = (noise1(t * 38, 5) - 0.5) * 2 * trem, jy = (noise1(t * 41, 9) - 0.5) * 2 * trem
      const yp = youPose(t)
      you.style.transform = poseTransform({ ...yp, x: yp.x + lean + jx, y: yp.y + jy }, 0, kick)
      you.style.opacity = String(yp.op)
      const glow = t < LOCK ? ten : 1 - ease.inOutQuad(prog(t, LOCK, MOVE.b - 0.05))   // charged into the lock, cooling off before the hand-off
      const mixRgb = (a, b, k) => a.map((v, i) => Math.round(lerp(v, b[i], k))).join(',')
      youCard.style.filter = glow > 0.002 ? `brightness(${1 + 0.18 * glow + 0.45 * post})` : 'none'
      youGlow.style.boxShadow = rimGlow(mixRgb([150, 240, 170], [255, 236, 180], post), glow, yp.s)
      const jp = julPose(t)
      jul.holder.style.transform = poseTransform({ ...jp, x: jp.x - lean - jx, y: jp.y - jy }, 0, kick)
      jul.card.style.filter = glow > 0.002 ? `brightness(${1 + 0.18 * glow + 0.45 * post})` : 'none'
      jul.glow.style.boxShadow = rimGlow(mixRgb([255, 150, 232], [255, 236, 200], post), glow, jp.s)

      // shake + chroma punch on the lock
      const sf = fi - lockF
      const SH = [[-16, 10], [12, -8], [-6, 5]]
      const sh = sf >= 0 && sf < 3 ? SH[sf] : [0, 0]
      shakeBox.style.transform = `translate(${sh[0]}px, ${sh[1]}px)`
      const CH = [14, 9, 5, 2]
      shakeBox.style.filter = sf >= 0 && sf < 4 ? `drop-shadow(${CH[sf]}px 0 0 rgba(255,40,90,0.6)) drop-shadow(${-CH[sf]}px 0 0 rgba(60,190,255,0.6))` : 'none'
      const fl = t < LOCK ? ease.inQuad(prog(t, LOCK - 0.06, LOCK)) * 0.5 : 0.8 * (1 - ease.outCubic(prog(t, LOCK, LOCK + 0.34)))
      bigFlash.style.opacity = String(fl)
      const rayO = t < LOCK ? 0.2 * ease.inQuad(prog(t, LOCK - 0.32, LOCK)) : 0.7 * (1 - ease.inOutQuad(prog(t, LOCK + 0.05, LOCK + 1.1)))
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
        const by = R.y + 41 + 0
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
      if (t < MOVE.b + 0.02) {
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
      }
      // the card takes in the stars: a soft bloom on Juniper's card as they sink
      if (collapse > 0 && collapse < 1) {
        const b = Math.sin(Math.PI * collapse) * 0.6, G = 260
        const gg = fx.createRadialGradient(jp.x, jp.y - 60, 0, jp.x, jp.y - 60, G)
        gg.addColorStop(0, `rgba(255,240,250,${b})`); gg.addColorStop(1, 'rgba(255,200,240,0)')
        fx.fillStyle = gg; fx.fillRect(jp.x - G, jp.y - 60 - G, G * 2, G * 2)
      }
      if (t >= LOCK && t < LOCK + 0.9) {
        const RINGS = [[0, 1150, 30, '255,246,230'], [0.07, 900, 18, '201,166,255'], [0.15, 700, 8, '242,199,92']]
        RINGS.forEach(([d, R1, w0, rgb]) => {
          const q = prog(t, LOCK + d, LOCK + d + 0.7)
          if (q <= 0 || q >= 1) return
          const R = lerp(90, R1, ease.outCubic(q))
          fx.strokeStyle = `rgba(${rgb},${(0.85 * (1 - ease.inQuad(q))).toFixed(3)})`; fx.lineWidth = lerp(w0, 1.5, q)
          fx.beginPath(); fx.ellipse(CC.x, CC.y, R, R * 0.92, 0, 0, 6.2832); fx.stroke()
        })
      }
      fx.globalCompositeOperation = 'source-over'

      // ── captions
      const out = 1 - ease.inQuad(prog(t, 16.95, 17.13))
      const e1 = ease.outQuad(prog(t, 15.45, 15.67)), e2 = ease.outQuad(prog(t, 15.55, 15.85))
      eyebrow.style.opacity = String(e1 * out)
      eyebrow.style.transform = `translateY(${(1 - ease.outCubic(prog(t, 15.45, 15.85))) * 10}px)`
      capLine.style.opacity = String(e2 * out)
      capLine.style.transform = `translateY(${(1 - ease.outCubic(prog(t, 15.55, 16.05))) * 14}px)`
      const CL = LOCK + 0.06
      const lo = ease.outQuad(prog(t, CL, CL + 0.22)) * (1 - ease.inQuad(prog(t, 19.6, 19.76)))
      lockLine.style.opacity = String(lo)
      lockLine.style.transform = `scale(${lerp(1.06, 1, ease.outCubic(prog(t, CL, CL + 0.6)))})`
      lockLine.style.letterSpacing = lerp(0.04, 0, ease.outCubic(prog(t, CL, CL + 0.8))) + 'em'
      scrim.style.opacity = String(Math.max(e1 * out, lo))
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
  ['whoosh', MOVE.a, 0.55, 0.06],                                         // your card drifts off; hers glides to centre
  ['bell', MOVE.b - 0.1, 1318.51, 0.025, 1.2, 0],                          // stars sink into her card
]
