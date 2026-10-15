// ─────────────────────────────────────────────── F7 · THEN YOU TALK (real time 24.0–26.8, hands to f8 at 26.6)
// One sky spine: the same S1 nebula / star layers / moon / grain as f3–f6 (./f3-chart.js), with the first film's
// S7 aurora (full-res ray curtain on a low hem y≈760–820, a flat galaxy band along it, low bloom) laid OVER it as
// an overlay that grows in 24.5–25.1 (rays rise from the hem) and fades out 26.0–26.5.
// The sky camera keeps drifting (paintSky) and f8 paints the identical sky, so the f7→f8 handoff is a content crossfade.
// Timing (sound):
//   24.00 f7 owns the phone (match screen, centred 960,540, 880 tall) — f6 shows only its caption until 24.45
//   24.15–24.60 phone glides left (x 960 → 640), still on the match screen
//   24.55–24.85 the screen crossfades (inside the phone mask) match → chat; no slide, nothing of the old screen lingers
//   24.45–24.85 a fanned hand of three talk cards rises bottom-right (Lovers · The Fool · The Sun) — ticks 24.47/.52/.57
//   24.75 caption (eyebrow "THE TALK DECK" + "Then you talk in cards.") steps in, words full by ~25.3, holds to 26.35
//   24.95–25.19 The Fool lifts out of the hand · 25.15–25.60 it is PLAYED: arcs over into the phone,
//               lands on the card-of-the-day slot at 25.60 (gold flash + ring + pixel-star burst, glint sweep 25.64–26.04)
//   25.20–25.64 the rest of the hand sinks away · 25.80–26.20 "Play it to Juniper" button breathes gold
//   25.60–26.35 hold · 26.35–26.80 phone + caption drift down and fade (f8's line starts typing 26.68)
import { clamp, lerp, prog, ease, tw, rng, el, C } from '../../src/lib.js'
import { W, H, A, SERIF, MONO, fill, img } from '../../src/scenes/common.js'
import { drawMoon } from '../../src/scenes/fx-moon.js'
import { drawSky, skyCam, drawGrain } from './f3-chart.js'

const T0 = 24.0, T1 = 26.8
const T_GLIDE = 24.15, T_GLIDE_END = 24.6, T_SCR = 24.55, T_SCR_END = 24.85
const T_HAND = 24.45, T_LIFT = 24.95, T_PLAY = 25.15, T_LAND = 25.6
const CAP = 24.75, CAP_OUT = 26.35, T_EXIT = 26.35
const AU_IN = [24.5, 25.1], AU_OUT = [26.0, 26.5]

// ── shared sky camera for f7 + f8: continues skyCam (static after 15.2) with a slow linear drift + push-in,
//    so nothing eases to a dead hold at the 24.0 / 26.6 handoffs. f8 imports these so its sky is identical.
export function skyPan(t) { return [-(t - 24) * 7, (t - 24) * 3.5] }
export function skyZoom(t) { return 1 + 0.008 * (t - 24) }
let DIM = null
function dimPlate() {
  if (DIM) return DIM
  DIM = document.createElement('canvas'); DIM.width = W; DIM.height = H
  const x = DIM.getContext('2d')
  x.fillStyle = 'rgba(11,6,32,0.34)'; x.fillRect(0, 0, W, H)
  x.save(); x.translate(W / 2, H / 2); x.scale(1, 0.6)
  const g = x.createRadialGradient(0, 0, 0, 0, 0, 1000)
  g.addColorStop(0, 'rgba(11,6,32,0.5)'); g.addColorStop(0.55, 'rgba(11,6,32,0.32)'); g.addColorStop(1, 'rgba(11,6,32,0)')
  x.fillStyle = g; x.fillRect(-1100, -1100, 2200, 2200); x.restore()
  return DIM
}
/** paint the S1 sky (opaque) + its crescent moon at drawSky's own spot; moonGlow lets f8 brighten it */
export function paintSky(bx, t, { moonAlpha = 1, moonGlow = 3 } = {}) {
  const z = skyZoom(t), pan = skyPan(t)
  bx.setTransform(z, 0, 0, z, W / 2 * (1 - z), H / 2 * (1 - z))
  drawSky(bx, t, { pan, moon: 0 })
  bx.setTransform(1, 0, 0, 1, 0, 0)
  bx.drawImage(dimPlate(), 0, 0)                     // nebula dimmed toward ~35% in the middle, where phone/type sit
  bx.setTransform(z, 0, 0, z, W / 2 * (1 - z), H / 2 * (1 - z))
  const { zoom, dx, dy } = skyCam(t)
  const driftX = dx + pan[0], driftY = dy + pan[1]
  // same placement as drawSky's moon after its 7.5 move (1716, 122, r52·zoom, phase .14) — f3–f6 moon spot
  drawMoon(bx, 1716 + driftX * 1.3, 122 + driftY * 1.3, 52 * zoom, 0.14, { alpha: moonAlpha, glow: moonGlow, earthshine: 1, darkAlpha: 0.62 })
  bx.setTransform(1, 0, 0, 1, 0, 0)
}
/** shared grain look (≥0.5, overlay) */
export function grainCanvas(parent, op = 0.55) {
  const c = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: 'overlay', opacity: op, pointerEvents: 'none' }, parent)
  c.width = W; c.height = H
  return c.getContext('2d')
}

const PH = 880, PW = Math.round(PH * 1170 / 2532)   // 407
const PX0 = W / 2, PX1 = 640, PCY = H / 2
const K = PW / 1170                                  // phone-local px per screenshot px
// card-of-the-day slot on screen-chat-cards.png (1170 px wide): x 339–831, y 1185–2025 → phone-local
const SLOT = { x: (339 + 831) / 2 * K, y: (1185 + 2025) / 2 * K, w: 492 * K * 1.13 }
// "Play it to Juniper" button: y ≈ 2304, x 114–1056, h ≈ 162
const BTN = { x: 114 * K, y: (2304 - 81) * K, w: 942 * K, h: 162 * K }
const CW = 300, CH = Math.round(CW * 1170 / 732)     // talk card in the hand (300 × 480)
// hand, in phone-local coords (phone top-left = (PX1 - PW/2, PCY - PH/2) at rest)
const HAND = { x: 1440 - (PX1 - PW / 2), y: 1330 - (PCY - PH / 2), R: 640 }
const FAN = [{ src: 'card-talk-6.png', a: -15 }, { src: 'card-talk-1.png', a: 0, hero: true }, { src: 'card-talk-2.png', a: 15 }]

export default function build(stage) {
  const root = fill(stage, { background: C.void })
  // ── sky: the shared S1 nebula plate (canvas), then the S7 aurora as an OVERLAY layer on top of it
  const bgC = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  bgC.width = W; bgC.height = H
  const bx = bgC.getContext('2d')
  const sky = fill(root, { background: 'transparent', opacity: 0 })     // aurora overlay (fades in/out)
  // dims the nebula's centre under the phone + caption (~35% plate there), part of the overlay
  fill(sky, { background: 'radial-gradient(70% 62% at 50% 46%, rgba(9,4,26,0.62) 0%, rgba(9,4,26,0.42) 55%, rgba(9,4,26,0.08) 100%)' })
  const GA = el('canvas', { position: 'absolute', left: '-240px', top: '-240px', width: (W + 480) + 'px', height: (H + 480) + 'px', mixBlendMode: 'screen', transformOrigin: '50% 66%', opacity: 0.8 }, sky)
  GA.width = W + 480; GA.height = H + 480
  {
    const g = GA.getContext('2d'), r = rng(7707)
    // a very flat dome whose crown sits on the aurora hem (screen y ≈ 790), never across the phone's middle
    const gx = (W + 480) * 0.52, gy = 240 + 790 + 420, RX = 2200, RY = 420, ROT = -0.03
    const at = (a, off) => {
      const x = Math.cos(a) * (RX + off), y = Math.sin(a) * (RY + off * 0.5)
      return [gx + x * Math.cos(ROT) - y * Math.sin(ROT), gy + x * Math.sin(ROT) + y * Math.cos(ROT)]
    }
    const A0 = Math.PI * 1.13, A1 = Math.PI * 1.87
    for (let k = 0; k < 340; k++) {
      const u = k / 339, a = lerp(A0, A1, u), fade = Math.sin(Math.PI * u)
      const [x, y] = at(a, (r() - 0.5) * 40)
      const col = u < 0.5 ? [lerp(242, 232, u * 2), lerp(170, 98, u * 2), lerp(120, 160, u * 2)] : [lerp(232, 170, u * 2 - 1), lerp(98, 120, u * 2 - 1), lerp(160, 255, u * 2 - 1)]
      const rad = 60 + r() * 50
      const gr = g.createRadialGradient(x, y, 0, x, y, rad)
      gr.addColorStop(0, `rgba(${col.map(Math.round)},${0.085 * fade})`); gr.addColorStop(1, `rgba(${col.map(Math.round)},0)`)
      g.fillStyle = gr; g.beginPath(); g.arc(x, y, rad, 0, 6.29); g.fill()
    }
    for (let k = 0; k < 1400; k++) {
      const u = r(), a = lerp(A0, A1, u), fade = Math.sin(Math.PI * u)
      const off = (r() + r() + r() - 1.5) * 70
      const [x, y] = at(a, off)
      const s = r() < 0.06 ? 1.6 : 0.4 + r() * 0.8
      g.fillStyle = `rgba(255,244,230,${(0.18 + r() * 0.55) * fade * Math.max(0, 1 - Math.abs(off) / 130)})`
      g.beginPath(); g.arc(x, y, s, 0, 6.29); g.fill()
    }
  }
  // full-resolution curtain of crisp vertical rays (the first film's S7 look at ~25–26s), hem y ≈ 760–820
  const AU = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: 'screen' }, sky)
  AU.width = W; AU.height = H
  const au = AU.getContext('2d')
  const NR = 300, HEM = 0.732
  const ar = rng(7171), RAYS = Array.from({ length: NR }, (_, k) => ({ u: (k + ar()) / NR, h: 0.55 + ar() * 0.7, a: 0.35 + ar() * 0.65, ph: ar() * 6.28, sp: 0.6 + ar() * 1.4, w: 1.6 + ar() * 2.6 }))
  const hemY = (u, t, hh) => hh * (HEM + 0.02 * Math.sin(u * 5.2 + t * 0.45) + 0.009 * Math.sin(u * 13 - t * 0.8))
  function drawAurora(t, k) {
    au.clearRect(0, 0, AU.width, AU.height)
    const w = AU.width, hh = AU.height
    au.globalCompositeOperation = 'lighter'
    RAYS.forEach(r => {
      const x = r.u * w, hem = hemY(r.u, t, hh) + (1 - k) * 40
      const env = Math.pow(Math.sin(Math.PI * clamp(r.u * 1.08 - 0.04, 0, 1)), 0.7)
      const fl = r.a * (0.55 + 0.45 * Math.sin(t * r.sp + r.ph)) * env * k
      // rays rise out of the hem as the overlay arrives
      const len = hh * 0.34 * r.h * (0.85 + 0.15 * Math.sin(t * 0.6 + r.ph)) * lerp(0.3, 1, ease.outCubic(k))
      const warm = clamp(1 - r.u * 3.2, 0, 1)
      const c0 = warm > 0 ? `${Math.round(lerp(232, 242, warm))},${Math.round(lerp(98, 154, warm))},${Math.round(lerp(138, 74, warm))}` : '232,98,138'
      const g = au.createLinearGradient(0, hem, 0, hem - len)
      g.addColorStop(0, 'rgba(255,214,226,0)')
      g.addColorStop(0.03, `rgba(255,190,214,${0.5 * fl})`)
      g.addColorStop(0.1, `rgba(${c0},${0.6 * fl})`)
      g.addColorStop(0.42, `rgba(190,96,240,${0.26 * fl})`)
      g.addColorStop(1, 'rgba(140,90,255,0)')
      au.fillStyle = g
      au.globalAlpha = 0.55; au.fillRect(x - r.w * 2, hem - len, r.w * 4, len + 2)   // soft sheath
      au.globalAlpha = 1; au.fillRect(x - r.w / 2, hem - len, r.w, len + 2)         // crisp core
      au.globalAlpha = 1
    })
    au.beginPath()
    for (let i = 0; i <= 96; i++) { const u = i / 96, y = hemY(u, t, hh) + (1 - k) * 40; i ? au.lineTo(u * w, y) : au.moveTo(u * w, y) }
    const hg = au.createLinearGradient(0, 0, w, 0)
    hg.addColorStop(0, 'rgba(242,154,74,0)'); hg.addColorStop(0.18, `rgba(242,154,74,${0.4 * k})`); hg.addColorStop(0.5, `rgba(255,130,180,${0.5 * k})`)
    hg.addColorStop(0.85, `rgba(190,110,255,${0.4 * k})`); hg.addColorStop(1, 'rgba(190,110,255,0)')
    au.strokeStyle = hg; au.lineWidth = 4; au.shadowColor = `rgba(255,120,180,${0.8 * k})`; au.shadowBlur = 24
    au.stroke(); au.shadowBlur = 0
    au.globalCompositeOperation = 'source-over'
  }
  // a low warm bloom under the curtain so the sky isn't flat
  const BLOOM = [
    { c: '232,98,138', x: 0.30, y: 1.1, r: 760, a: 0.3 },
    { c: '180,92,255', x: 0.72, y: 1.08, r: 820, a: 0.3 },
  ].map((b, i) => ({ ...b, i, e: el('div', { position: 'absolute', width: b.r * 2 + 'px', height: b.r * 2 + 'px', borderRadius: '50%', mixBlendMode: 'screen',
    background: `radial-gradient(closest-side, rgba(${b.c},${b.a}), rgba(${b.c},${b.a * 0.4}) 48%, rgba(${b.c},0) 100%)` }, sky) }))

  // ── pixel sparkles + field twinkles (canvas, scene space)
  const cv = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  cv.width = W; cv.height = H
  const cx = cv.getContext('2d')
  const fr = rng(7240)
  const FIELD = Array.from({ length: 60 }, () => {
    let x, y
    do { x = fr() * W; y = fr() * H } while (x > 880 && x < 1700 && y > 420 && y < 640)
    return { x, y, u: fr() < 0.22 ? 3 : 2, ph: fr() * 6.28, sp: 1.5 + fr() * 2.5, a: 0.4 + fr() * 0.5 }
  })
  function pix(x, y, u, a, col, big) {
    if (a <= 0.003) return
    x = Math.round(x); y = Math.round(y)
    cx.fillStyle = `rgba(${col},${a})`
    cx.fillRect(x - u / 2, y - u / 2, u, u)
    cx.fillStyle = `rgba(${col},${a * 0.75})`
    cx.fillRect(x - u / 2, y - u * 1.5, u, u); cx.fillRect(x - u / 2, y + u / 2, u, u)
    cx.fillRect(x - u * 1.5, y - u / 2, u, u); cx.fillRect(x + u / 2, y - u / 2, u, u)
    if (big) {
      cx.fillStyle = `rgba(${col},${a * 0.4})`
      cx.fillRect(x - u / 2, y - u * 2.5, u, u); cx.fillRect(x - u / 2, y + u * 1.5, u, u)
      cx.fillRect(x - u * 2.5, y - u / 2, u, u); cx.fillRect(x + u * 1.5, y - u / 2, u, u)
    }
  }
  // burst from the landed card: 14 pixel stars flung outward on deterministic rays
  const br = rng(2542)
  const BURST = Array.from({ length: 16 }, (_, i) => ({ a: (i / 16) * Math.PI * 2 + br() * 0.3, d: 150 + br() * 170, u: br() < 0.4 ? 4 : 3, col: ['255,226,160', '255,246,234', '242,199,92', '255,190,214'][i % 4], dl: br() * 0.08 }))

  // ── phone + hand, in perspective
  const tilt = fill(root, { background: 'transparent' })           // camera tilt-up wrapper for the exit
  const persp = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', perspective: '2000px' }, tilt)
  const aura = el('div', { position: 'absolute', left: (PX1 - 460) + 'px', top: (PCY - 560) + 'px', width: '920px', height: '1120px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(214,190,255,0.75), rgba(180,120,255,0.32) 55%, rgba(180,92,255,0) 100%)', opacity: 0 }, persp)
  const g = el('div', { position: 'absolute', left: -PW / 2 + 'px', top: (PCY - PH / 2) + 'px', width: PW + 'px', height: PH + 'px', transformStyle: 'preserve-3d', willChange: 'transform' }, persp)
  const scr = el('div', { position: 'absolute', inset: 0, borderRadius: '52px', overflow: 'hidden', background: C.canvas, boxShadow: '0 60px 120px rgba(4,2,14,0.7), 0 18px 40px rgba(4,2,14,0.45), 0 0 60px rgba(180,92,255,0.18), 0 0 0 1.5px rgba(239,230,214,0.35)' }, g)
  const scrA = img(scr, A + 'screen-match.png', { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover' })
  const scrB = img(scr, A + 'screen-chat-cards.png', { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', willChange: 'transform' })
  // the button's gold breath (after the card is played)
  const btnGlow = el('div', { position: 'absolute', left: BTN.x + 'px', top: BTN.y + 'px', width: BTN.w + 'px', height: BTN.h + 'px', borderRadius: '999px', opacity: 0,
    boxShadow: '0 0 0 2px rgba(242,199,92,0.9), 0 0 28px rgba(242,199,92,0.75), 0 0 60px rgba(242,199,92,0.35)' }, scr)

  // hand of talk cards (children of the phone group so the played card lands in its exact space)
  const cards = FAN.map(f => {
    const c = el('div', { position: 'absolute', left: 0, top: 0, width: CW + 'px', height: CH + 'px', marginLeft: -CW / 2 + 'px', marginTop: -CH / 2 + 'px', opacity: 0, willChange: 'transform' }, g)
    const ring = el('div', { position: 'absolute', inset: '-40px', borderRadius: '40px', background: 'radial-gradient(closest-side, rgba(242,199,92,0.65), rgba(242,199,92,0.18) 60%, rgba(242,199,92,0) 100%)', opacity: 0 }, c)
    img(c, A + f.src, { left: 0, top: 0, width: '100%', height: '100%', filter: 'drop-shadow(0 26px 34px rgba(4,2,14,0.6))' })
    // glint: a diagonal gold-white sheen clipped to the card face
    const clip = el('div', { position: 'absolute', inset: '3%', borderRadius: '6%', overflow: 'hidden', mixBlendMode: 'screen' }, c)
    const sheen = el('div', { position: 'absolute', left: '-60%', top: '-30%', width: '45%', height: '160%', transform: 'rotate(20deg)', opacity: 0,
      background: 'linear-gradient(90deg, rgba(255,226,160,0) 0%, rgba(255,226,160,0.55) 40%, rgba(255,252,240,0.95) 50%, rgba(255,226,160,0.55) 60%, rgba(255,226,160,0) 100%)' }, clip)
    return { ...f, c, ring, sheen }
  })
  const hero = cards.find(c => c.hero)
  // gold ✦ accents beside the phone once the card lands
  const sp = [[PW + 58, PH * 0.2, 44], [-58, PH * 0.74, 32]].map(([x, y, s]) => el('div', { position: 'absolute', left: x + 'px', top: y + 'px', width: '60px', height: '60px', marginLeft: '-30px', marginTop: '-30px', textAlign: 'center', lineHeight: '60px', fontSize: s + 'px', color: C.gold, textShadow: '0 0 16px rgba(242,199,92,0.9), 0 0 3px rgba(120,60,10,0.6)', opacity: 0 }, g, '✦'))

  // ── caption (S7 style): mono eyebrow + big serif italic, soft indigo scrim
  const gx = grainCanvas(root, 0.55)
  // caption sits ABOVE the grain (solid bone, not grain-washed); it follows the phone's exit transform
  const capTilt = fill(root, { background: 'transparent' })
  const box = el('div', { position: 'absolute', top: (H / 2 - 74) + 'px', left: (PX1 + PW / 2 + 130) + 'px', textAlign: 'left', opacity: 0, isolation: 'isolate' }, capTilt)
  el('div', { position: 'absolute', left: '-330px', right: '-330px', top: '-140px', bottom: '-140px', zIndex: -1,
    background: `radial-gradient(closest-side, ${[[0, 1], [25, 0.95], [48, 0.76], [66, 0.48], [82, 0.2], [100, 0]].map(([o, k]) => `rgba(11,6,32,${(0.64 * k).toFixed(3)}) ${o}%`).join(', ')})` }, box)
  el('div', { fontFamily: MONO, fontSize: '30px', letterSpacing: '0.22em', color: C.bone, textShadow: '0 0 16px rgba(8,4,24,0.85), 0 0 5px rgba(8,4,24,0.6)', marginBottom: '14px' }, box, 'THE TALK DECK')
  const capLine = el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: '84px', lineHeight: 1.05, color: '#efe6d6', whiteSpace: 'nowrap', textShadow: '0 0 26px rgba(8,4,24,0.75), 0 0 8px rgba(8,4,24,0.6), 0 2px 3px rgba(4,2,14,0.5)' }, box, '')
  const WORDS = ['Then', 'you', 'talk', 'in', 'cards.']
  const wspans = WORDS.map((w, i) => el('span', { display: 'inline-block', opacity: 0, marginRight: i < WORDS.length - 1 ? '0.24em' : '0' }, capLine, w))

  /** hero card state in phone-local coords */
  function heroState(t) {
    const rise = ease.outCubic(prog(t, T_HAND + 0.06, T_HAND + 0.46))
    const lift = ease.outCubic(prog(t, T_LIFT, T_PLAY + 0.04))
    const fly = prog(t, T_PLAY, T_LAND)
    const fe = ease.inOutCubic(fly)
    // in the hand (centre card)
    const hx = HAND.x, hy = HAND.y - HAND.R + lerp(420, 0, rise) - 70 * lift
    const sx = SLOT.x, sy = SLOT.y
    const arc = Math.sin(Math.PI * fe) * -150
    const x = lerp(hx, sx, fe), y = lerp(hy, sy, fe) + arc
    const w = lerp(CW * (1 + 0.06 * lift), SLOT.w, ease.inOutQuad(fly))
    const rz = lerp(-4 * lift, 0, fe) + Math.sin(Math.PI * fe) * -9
    const z = Math.sin(Math.PI * fe) * 140
    return { x, y, s: w / CW, rz, z, op: ease.outQuad(prog(t, T_HAND, T_HAND + 0.18)) }
  }

  return {
    start: T0, end: T1, root,
    update(t) {
      root.style.opacity = '1'   // f7 owns the phone from 24.0 (f6 hands over its caption only), so no fade-up dip
      paintSky(bx, t)
      const auK = ease.inOutQuad(prog(t, AU_IN[0], AU_IN[1])) * (1 - ease.inOutQuad(prog(t, AU_OUT[0], AU_OUT[1])))
      sky.style.opacity = String(auK)
      GA.style.transform = `rotate(${(t - 24.8) * 0.25}deg)`
      if (auK > 0.002) drawAurora(t, ease.inOutQuad(prog(t, AU_IN[0], AU_IN[1])))
      BLOOM.forEach(b => {
        b.e.style.transform = `translate(${b.x * W - b.r + Math.sin(t * 0.4 + b.i * 2) * 70}px, ${b.y * H - b.r + Math.cos(t * 0.5 + b.i) * 30}px)`
      })

      // ── phone: centred (as f6 leaves it) → glides left, screen slides up into the chat
      const gl = ease.inOutCubic(prog(t, T_GLIDE, T_GLIDE_END))
      const st = ease.outCubic(prog(t, T_GLIDE_END - 0.1, T_GLIDE_END + 0.5))
      const hold = Math.sin((t - T0) * 1.5)
      const px = lerp(PX0, PX1, gl)
      const ry = lerp(0, 5, st) + Math.sin(Math.PI * gl) * -14 + 1.0 * Math.sin((t - T0) * 1.1)
      const rx = lerp(0, 2.5, st) + 0.6 * hold
      const rz = Math.sin(Math.PI * gl) * -2.5 + lerp(0, -0.8, st)
      const sc = lerp(1, 0.97, Math.sin(Math.PI * gl)) * (1 + 0.012 * prog(t, T_GLIDE_END, T1))
      const tyP = 4 * hold * st
      g.style.transform = `translate(${px}px, ${tyP}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`
      // screen swap: a straight 0.3s crossfade inside the phone mask (both screens stay put, no strip can linger)
      const sw = ease.inOutQuad(prog(t, T_SCR, T_SCR_END))
      scrB.style.opacity = String(sw)
      scrA.style.opacity = String(1 - sw)
      scrA.style.display = sw >= 1 ? 'none' : 'block'
      const bloom = tw(t, [[T_LAND - 0.05, 0.25], [T_LAND + 0.12, 0.95, ease.outQuad], [T_LAND + 0.8, 0.4, ease.inOutQuad]])
      aura.style.opacity = String(bloom * prog(t, T_GLIDE, T_GLIDE_END))
      aura.style.transform = `translateX(${px - PX1}px) scale(${lerp(0.9, 1.06, bloom)})`

      // ── the hand: rises, the Fool is played, the others sink away
      cards.forEach((c, i) => {
        if (c.hero) return
        const rise = ease.outCubic(prog(t, T_HAND + i * 0.04, T_HAND + 0.4 + i * 0.04))
        const sink = ease.inCubic(prog(t, T_PLAY + 0.05 + i * 0.04, T_PLAY + 0.37 + i * 0.04))
        const a = c.a * (1 + 0.15 * sink) * Math.PI / 180
        const x = HAND.x + Math.sin(a) * HAND.R, y = HAND.y - Math.cos(a) * HAND.R + lerp(420, 0, rise) + 980 * sink
        c.c.style.opacity = String(ease.outQuad(prog(t, T_HAND, T_HAND + 0.18)) * (1 - ease.inQuad(sink)))
        c.c.style.transform = `translate(${x}px, ${y}px) rotateZ(${c.a * (1 + 0.15 * sink)}deg)`
      })
      const Hs = heroState(t)
      hero.c.style.opacity = String(Hs.op)
      hero.c.style.transform = `translate(${Hs.x}px, ${Hs.y}px) translateZ(${Hs.z}px) rotateZ(${Hs.rz}deg) scale(${Hs.s})`
      // landing: gold ring flash + glint sweep
      hero.ring.style.opacity = String(tw(t, [[T_LAND - 0.04, 0], [T_LAND + 0.06, 1, ease.outQuad], [T_LAND + 0.6, 0.18, ease.inOutQuad]]) + 0.35 * ease.outQuad(prog(t, T_LIFT, T_PLAY)) * (1 - prog(t, T_PLAY, T_PLAY + 0.3)))
      const gp = prog(t, T_LAND + 0.04, T_LAND + 0.44)
      hero.sheen.style.opacity = String(Math.sin(Math.PI * gp))
      hero.sheen.style.left = lerp(-60, 120, ease.inOutQuad(gp)) + '%'
      btnGlow.style.opacity = String(tw(t, [[T_LAND + 0.2, 0], [T_LAND + 0.4, 0.9, ease.outQuad], [T_LAND + 0.8, 0.35, ease.inOutQuad]]) * (0.85 + 0.15 * Math.sin((t - T_LAND) * 5)))
      sp.forEach((s, i) => {
        const a0 = T_LAND + 0.1 + i * 0.1
        s.style.opacity = String(prog(t, a0, a0 + 0.2) * (0.65 + 0.35 * Math.sin(t * 3.2 + i * 2.1)))
        s.style.transform = `translateY(${Math.sin(t * 1.4 + i) * 6}px) rotate(${(t - T_LAND) * 40 * (i ? 1 : -1)}deg) scale(${lerp(0.4, 1, ease.outBack(prog(t, a0, a0 + 0.3)))})`
      })

      // ── caption: eyebrow + words step in, settle, then leave with the tilt
      const ci = ease.outCubic(prog(t, CAP, CAP + 0.32)), co = ease.inQuad(prog(t, CAP_OUT, CAP_OUT + 0.3))
      box.style.opacity = String(Math.min(prog(t, CAP, CAP + 0.12), 1 - co))
      box.style.transform = `translateX(${lerp(36, 0, ci)}px)`
      wspans.forEach((s, i) => {
        const p = ease.outCubic(prog(t, CAP + 0.05 + i * 0.055, CAP + 0.3 + i * 0.055))
        s.style.opacity = String(p)
        s.style.transform = `translateY(${lerp(18, 0, p)}px)`
        s.style.filter = p < 1 ? `blur(${(1 - p) * 6}px)` : 'none'
      })

      // ── exit: phone + caption drift down and fade over the (continuing) sky; f8 crossfades in 26.6–26.8
      const tl = ease.inCubic(prog(t, T_EXIT, T1))
      const cOut = ease.inOutQuad(prog(t, T_EXIT + 0.05, T1 - 0.05))
      tilt.style.transform = `translateY(${tl * 140}px)`
      tilt.style.opacity = String(1 - cOut)
      capTilt.style.transform = tilt.style.transform
      capTilt.style.opacity = tilt.style.opacity

      // ── pixel layer
      cx.clearRect(0, 0, W, H)
      FIELD.forEach(f => pix(f.x, f.y, f.u, f.a * auK * (0.55 + 0.45 * Math.sin(t * f.sp + f.ph)), '255,250,242', false))
      // four tiny twinkling pixel stars at the phone's corners (replace the old selection-handle squares)
      {
        const ca = 0.5 * ease.outQuad(prog(t, T_GLIDE_END - 0.05, T_GLIDE_END + 0.25)) * (1 - cOut)
        const ty = tl * 140
        ;[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy], i) => {
          const tw3 = 0.55 + 0.45 * Math.sin(t * (3.1 + i * 0.7) + i * 1.9)
          pix(px + sx * (PW / 2 + 22), PCY + tyP + ty + sy * (PH / 2 + 22), 3, ca * tw3, i % 2 ? '255,226,160' : '255,246,234', false)
        })
      }
      // burst around the landing point (slot centre in scene space at rest)
      const lx = PX1, ly = PCY - PH / 2 + SLOT.y + tl * 140
      BURST.forEach(b => {
        const p = prog(t, T_LAND + b.dl, T_LAND + b.dl + 0.7)
        if (p <= 0 || p >= 1) return
        const d = ease.outCubic(p) * b.d
        const blink = (Math.round(t * 30) + Math.round(b.a * 10)) % 3 === 0 ? 0.6 : 1
        pix(lx + Math.cos(b.a) * d, ly + Math.sin(b.a) * d * 0.9, b.u, (1 - ease.inQuad(p)) * blink, b.col, p < 0.5)
      })
      // little glints on the hero card's corners while it flies
      if (t > T_LIFT && t < T_LAND + 0.1) {
        const k = Math.sin(Math.PI * prog(t, T_LIFT, T_LAND + 0.1))
        const ox = PX1 - PW / 2
        pix(ox + Hs.x + CW * Hs.s * 0.42, PCY - PH / 2 + Hs.y - CH * Hs.s * 0.42, 3, k * (0.6 + 0.4 * Math.sin(t * 40)), '255,226,160', true)
      }
      drawGrain(gx, t)
    },
  }
}

export const cues = [
  ['whoosh', 24.12, 0.5, 0.07],             // phone glides left
  ['tick', 24.47, 0.05],                    // cards fan in the hand
  ['tick', 24.52, 0.04],
  ['tick', 24.57, 0.04],
  ['bell', 24.77, 587.33, 0.045, 2.2, 0.2], // caption steps in (D5 · A4)
  ['bell', 24.99, 440, 0.03, 2.0, 0.25],
  ['whoosh', 25.08, 0.55, 0.11],            // the card is played
  ['bell', 25.6, 1174.66, 0.05, 1.6, -0.25], // gold glint as it lands (D6)
  ['bell', 25.63, 1760, 0.025, 1.2, -0.3],
  ['glitter', 25.61, 26.1],
  ['whoosh', 26.32, 0.5, 0.05],             // phone + caption drift away into the sky
]
