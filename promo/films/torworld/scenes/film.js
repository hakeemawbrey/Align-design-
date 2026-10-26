// torworld (15 s vertical Align ad) · story 0–10.6, then the shared END CARD ("come" + the logo + VOTE FOR YOUR CITY).
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas, DOM type above it, grain on top. Pure f(t).
//   0.00–3.84  HOOK  "In Toronto, | everyone's from | *somewhere.*"  A crowd of pictograms in many colours stands on the
//              shore; each one says hello in a bubble (Hello, Bonjour, 你好, வணக்கம், Kamusta, ਸਤ ਸ੍ਰੀ ਅਕਾਲ, أهلاً — the
//              non-Latin ones carry a small romanisation). On the drop (2.82) a generic skyline (with a needle tower,
//              unnamed) springs up across the lake, a back row joins and their chatter pops (Olá, Ciao, 안녕, Hola,
//              Wagwan, Salam); everyone bounces on the beat.
//   3.90–7.30  "Your person could be | from *anywhere.*"  Every bubble floats up and becomes a star. Two stars flare,
//              fall back to their people and bloom into birth charts; a gold arc links them across the crowd (6.71).
//   7.42–10.30 "Find them under | *one sky.*"  The crowd sinks away; the two charts rise back into the sky and become
//              two gold-linked stars, and every greeting star joins into one constellation over the skyline.
//   10.30→     plain sky (SKY_H + grain GRAIN_H) for the end card hand-off at 10.6.
import { clamp, lerp, prog, ease, el, rng, noise1 } from '../../../src/lib.js'
import { W, H, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, SIGNS, easeOutBack } from '../../wheel.js'
import { BONE, GOLD, PINK, BLUE, ROSE, VIOLET, LAV, AMBER, INTER, MONO, rgba, ink, sparkle, orb, person } from './props.js'

export const END = 10.6
const BEAT = n => 0.6 + n * 0.5556
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const TAU = Math.PI * 2
const MINT = '#7fe0b0'
const r3 = v => +v.toFixed(3)
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))
const hop = (t, a, h = 1, d = 0.45) => t > a && t < a + d ? h * Math.sin(Math.PI * (t - a) / d) : 0

// ── beats
export const T = {
  eye: 0.08, h0: 0.12, toronto: 0.26, every: BEAT(1), some: BEAT(2), drop: BEAT(4), h0Out: 3.62,
  h1: 3.9, any: BEAT(7), lift0: 3.95, liftGap: 0.075, liftDur: 1.0,
  pick: 5.5, fall: [5.62, 6.0], arc: [BEAT(10), BEAT(11)], h1Out: 7.08,
  h2: 7.42, sky: BEAT(13), sink: [7.2, 8.3], rise: [7.3, 8.3], net: [8.25, 9.05], twinkle: 9.15, h2Out: 9.95, fadeAll: [9.7, 10.28],
}

// ── the scene geometry
const GROUND = 1720                 // the shore the crowd stands on
const LAKE = 1478                   // the far shore (the skyline's base)
const FS = 0.9                      // front-row person scale (≈ 245 px tall)
const HEAD = 300 * FS               // feet → top of head (with a little air)
const LAT = `800 50px ${INTER}`
const GREET = [
  { text: 'Hello', font: LAT, body: PINK },
  { text: 'Bonjour', font: LAT, body: BLUE },
  { text: '你好', sub: 'NI HAO', font: "700 58px 'WenQuanYi Zen Hei', sans-serif", body: AMBER },
  { text: 'வணக்கம்', sub: 'VANAKKAM', font: "bold 46px FreeSans, sans-serif", body: MINT },
  { text: 'Kamusta', font: LAT, body: GOLD },
  { text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', sub: 'SAT SRI AKAL', font: "bold 46px FreeSans, sans-serif", body: LAV },
  { text: 'أهلاً', sub: 'AHLAN', font: "bold 56px 'DejaVu Sans', sans-serif", body: ROSE },
]
const SIGN_OF = [0, 3, 4, 6, 9, 11, 2]          // Aries, Cancer, Leo, Libra, Capricorn, Pisces, Gemini
const MAXW = 250                                 // widest a bubble may get (same-row neighbours sit 266 px apart)
const FRONT = GREET.map((g, i) => ({ ...g, i, x: 140 + i * 133.3, sign: SIGN_OF[i], row: i % 2,
  tIn: 0.12 + [3, 1, 5, 0, 4, 2, 6][i] * 0.05, tB: 0.5 + i * 0.27 }))
const PAIR = [1, 5]                              // Cancer ↔ Pisces (a water trine), far apart in the crowd
const BUB_Y = [1300, 1112]                       // bubble centre y per row
// the back row (joins on the drop) and its chatter
const CHAT = ['Olá', 'Ciao', '안녕', 'Hola', 'Wagwan', 'Salam']
const BACK = [AMBER, LAV, MINT, PINK, BLUE, GOLD].map((c, i) => ({ i, x: 207 + i * 133.3, body: c, text: CHAT[i],
  tIn: T.drop + [2, 0, 4, 1, 5, 3][i] * 0.07, tB: T.drop + 0.12 + [1, 4, 0, 3, 5, 2][i] * 0.1, y: i % 2 ? 965 : 885 }))
const CHAT_FONT = `800 36px ${INTER}, 'WenQuanYi Zen Hei', sans-serif`
// where each bubble's star settles (the pair's spots are where their charts return to in the finale)
const P_L = { x: 300, y: 780 }, P_R = { x: 780, y: 780 }
const STAR_F = [{ x: 140, y: 1000 }, P_L, { x: 500, y: 905 }, { x: 600, y: 625 }, { x: 935, y: 985 }, P_R, { x: 560, y: 1065 }]
const STAR_B = [{ x: 170, y: 645 }, { x: 430, y: 600 }, { x: 705, y: 1030 }, { x: 930, y: 645 }, { x: 790, y: 560 }, { x: 330, y: 1050 }]
// the lift order: front and back interleaved, left-to-right-ish, so the whole crowd rises as one wave
const LIFT_F = [0, 2, 4, 6, 8, 10, 12], LIFT_B = [1, 3, 5, 7, 9, 11]
const liftT = n => T.lift0 + n * T.liftGap
// the finale constellation: every star joined in one loop around the middle of the sky
const NET = (() => {
  const pts = [...STAR_F.map((p, i) => ({ ...p, col: FRONT[i].body })), ...STAR_B.map((p, i) => ({ ...p, col: BACK[i].body }))]
  const c = { x: 540, y: 820 }
  return pts.sort((a, b) => Math.atan2(a.y - c.y, a.x - c.x) - Math.atan2(b.y - c.y, b.x - c.x))
})()
// the charts that bloom over the pair's heads
const CHART_R = 74
const CHART_Y = GROUND - 262 - CHART_R - 30

// ── generic skyline across the lake (no real towers; one unnamed needle tower among them)
const NEEDLE = { x: 640, h: 905 }
const TOWERS = (() => {
  const r = rng(77), out = []
  let px = 30
  while (px < 1050) {
    if (px > NEEDLE.x - 46 && px < NEEDLE.x + 20) { px = NEEDLE.x + 24; continue }
    const mid = 1 - Math.min(1, Math.abs(px - 520) / 520)
    const w = 46 + r() * 58, h = 110 + r() * 90 + mid * (110 + r() * 260)
    out.push({ x: px, w, h, top: ['flat', 'slant', 'step', 'flat', 'notch', 'flat'][Math.floor(r() * 6)], seed: r() * 100, d: Math.abs(px + w / 2 - 540) })
    px += w + 3 + r() * 12
  }
  const maxD = Math.max(...out.map(b => b.d))
  out.forEach(b => { b.tIn = T.drop + 0.08 + (b.d / maxD) * 0.5 })
  return out
})()
function towerPath(x, b, h) {
  const l = b.x, r = b.x + b.w, y = -h
  x.beginPath(); x.moveTo(l, 0)
  switch (b.top) {
    case 'slant': x.lineTo(l, y + 34); x.lineTo(r, y); break
    case 'step': x.lineTo(l, y + 26); x.lineTo(l + b.w * 0.25, y + 26); x.lineTo(l + b.w * 0.25, y); x.lineTo(r - b.w * 0.25, y); x.lineTo(r - b.w * 0.25, y + 26); x.lineTo(r, y + 26); break
    case 'notch': x.lineTo(l, y); x.lineTo(l + b.w * 0.4, y); x.lineTo(l + b.w * 0.4, y + 18); x.lineTo(r, y + 18); break
    default: x.lineTo(l, y); x.lineTo(r, y)
  }
  x.lineTo(r, 0); x.closePath()
}

/** springy word-by-word type. `*word*` = accent (Garamond italic, colour), `|` = line break, `_` = a space inside a word.
 *  `times` gives each word's time (else at + n·gap); `big` lists word indices that pop large (with optional wobble). */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.08, at = 0, times = null, big = [], wobble = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const ws = []
  let n = 0
  text.split(' ').forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%', whiteSpace: 'pre' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    ws.push({ t: times ? times[n] : at + n * gap, big: big.includes(n), e: el('span', style, box, w.replace(/\*/g, '').replace(/_/g, ' ')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.42 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 8 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

export async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "700 62px Inter", "800 50px Inter", "italic 500 170px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'", "700 22px 'Space Mono'",
      "700 58px 'WenQuanYi Zen Hei'", "bold 46px FreeSans", "bold 56px 'DejaVu Sans'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const eyebrow = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color: GOLD, textShadow: SHADOW, opacity: 0 }, root, 'TORONTO · ON')
  const H0 = popText(root, 'In Toronto, | everyone’s from | *somewhere.*', { top: 196, size: 104, accentSize: 176, accentColor: GOLD, lineHeight: 1.0,
    times: [T.h0, T.toronto, T.every, T.every + 0.14, T.some], big: [4], wobble: true })
  const H1 = popText(root, 'Your person | could be from | *anywhere.*', { top: 196, size: 104, accentSize: 176, accentColor: BLUE, lineHeight: 1.0,
    times: [T.h1, T.h1 + 0.08, T.h1 + 0.24, T.h1 + 0.32, T.h1 + 0.4, T.any], big: [5], wobble: true })
  const H2 = popText(root, 'Find them | under *one_sky.*', { top: 205, size: 112, accentSize: 190, accentColor: PINK, lineHeight: 0.98,
    times: [T.h2, T.h2 + 0.1, T.h2 + 0.32, T.sky], big: [3], wobble: true })

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // the crowd's vertical offset / alpha (it sinks away for the finale); the city fades just before the hand-off
  const sinkY = t => 640 * ease.inOutCubic(prog(t, ...T.sink))
  const crowdA = t => 1 - ease.inQuad(prog(t, T.sink[0] + 0.35, T.sink[1]))
  const finK = t => 1 - ease.inOutQuad(prog(t, ...T.fadeAll))
  // beat bounce: from the drop, people hop on alternating beats
  const bounce = (t, i) => {
    if (t < T.drop || t > T.sink[0]) return 0
    const n = Math.floor((t - 0.6) / 0.5556)
    if ((n + i) % 2) return 0
    const b0 = 0.6 + n * 0.5556
    const amp = t < T.h1 ? 24 : 9
    return hop(t, b0, amp, 0.36)
  }

  // ── the lake, the far shore and its skyline
  function drawCity(t, a) {
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    const gp = ease.outCubic(prog(t, 0.05, 0.6))
    // skyline
    for (const b of TOWERS) {
      const k = easeOutBack(prog(t, b.tIn, b.tIn + 0.4), 2.0)
      if (k <= 0) continue
      x.save(); x.translate(0, LAKE)
      towerPath(x, b, b.h * k)
      x.fillStyle = 'rgba(22,15,52,0.94)'; x.fill()
      x.lineJoin = 'round'; x.shadowColor = VIOLET; x.shadowBlur = 12; x.strokeStyle = rgba(VIOLET, 0.8); x.lineWidth = 4; x.stroke(); x.shadowBlur = 0
      const cols = Math.max(1, Math.floor((b.w - 16) / 18)), rows = Math.floor((b.h * k - 40) / 26)
      for (let rr = 0; rr < rows; rr++) for (let cc = 0; cc < cols; cc++) {
        const sd = b.seed + rr * 7.1 + cc * 3.3
        if (noise1(sd, 2) < 0.5) continue
        const tw = 0.5 + 0.5 * noise1(t * 0.7 + sd, sd)
        x.fillStyle = rgba(noise1(sd, 5) > 0.75 ? BLUE : '#ffd98a', 0.25 + 0.5 * tw)
        x.fillRect(b.x + 10 + cc * 18, -24 - rr * 26 - 10, 8, 10)
      }
      x.restore()
    }
    // the needle tower (generic, unnamed): it rises last and tallest, with a blinking tip
    const nk = easeOutBack(prog(t, T.drop + 0.3, T.drop + 0.85), 1.6)
    if (nk > 0) {
      const h = NEEDLE.h * nk, cx = NEEDLE.x
      x.save(); x.translate(cx, LAKE)
      x.beginPath(); x.moveTo(-26, 0); x.lineTo(-9, -h * 0.86); x.lineTo(9, -h * 0.86); x.lineTo(26, 0); x.closePath()
      x.fillStyle = 'rgba(22,15,52,0.96)'; x.fill(); ink(x, LAV, { w: 4.5, fa: 0, glow: 14 })
      x.beginPath(); x.moveTo(0, -h * 0.86); x.lineTo(0, -h); ink(x, LAV, { w: 4, fa: 0, glow: 10 })
      // the main pod and the little upper pod
      x.beginPath(); x.ellipse(0, -h * 0.6, 50, 20, 0, 0, TAU); x.fillStyle = 'rgba(30,20,66,0.98)'; x.fill(); ink(x, LAV, { w: 4.5, fa: 0, glow: 14 })
      x.beginPath(); x.ellipse(0, -h * 0.6 - 26, 36, 12, 0, 0, TAU); x.fillStyle = 'rgba(30,20,66,0.98)'; x.fill(); ink(x, LAV, { w: 3.5, fa: 0, glow: 10 })
      x.fillStyle = rgba('#ffd98a', 0.85); for (let k = -3; k <= 3; k++) x.fillRect(k * 12 - 4, -h * 0.6 - 4, 7, 7)
      x.beginPath(); x.ellipse(0, -h * 0.79, 15, 8, 0, 0, TAU); x.fillStyle = 'rgba(30,20,66,0.98)'; x.fill(); ink(x, LAV, { w: 3, fa: 0, glow: 8 })
      const blink = 0.5 + 0.5 * Math.sin(t * 6)
      orb(x, 0, -h - 4, 5, PINK, (0.4 + 0.6 * blink) * clamp(nk), 4)
      x.restore()
    }
    // the far shoreline
    x.beginPath(); x.moveTo(W / 2 - 540 * gp, LAKE); x.lineTo(W / 2 + 540 * gp, LAKE)
    ink(x, VIOLET, { w: 4, fa: 0, glow: 14 })
    // the lake: dark water, window reflections, rolling glints
    const lk = x.createLinearGradient(0, LAKE, 0, GROUND)
    lk.addColorStop(0, 'rgba(18,14,50,0.96)'); lk.addColorStop(1, 'rgba(10,8,30,0.98)')
    x.fillStyle = lk; x.fillRect(0, LAKE + 2, W, GROUND - LAKE - 2)
    for (const b of TOWERS) {
      const k = clamp(prog(t, b.tIn, b.tIn + 0.4))
      if (k <= 0) continue
      x.fillStyle = rgba('#ffd98a', 0.1 * k)
      for (let j = 0; j < 5; j++) { const yy = LAKE + 14 + j * 22, ww = (b.w - 14) * (1 - j * 0.15) * (0.7 + 0.3 * noise1(t * 1.5 + j + b.seed, b.seed)); x.fillRect(b.x + b.w / 2 - ww / 2, yy, ww, 5) }
    }
    if (nk > 0) { x.fillStyle = rgba(LAV, 0.16 * nk); for (let j = 0; j < 6; j++) x.fillRect(NEEDLE.x - 9 + 3 * Math.sin(t * 3 + j), LAKE + 10 + j * 30, 18, 12) }
    for (let j = 0; j < 16; j++) {
      const r = rng(300 + j), yy = LAKE + 18 + r() * (GROUND - LAKE - 40), sp = 30 + r() * 40
      const xx = ((r() * W + t * sp) % (W + 200)) - 100, ww = 40 + r() * 90
      x.fillStyle = rgba(j % 3 ? BLUE : GOLD, (0.16 + 0.16 * Math.sin(t * 2 + j)) * gp)
      x.fillRect(xx, yy, ww, 3)
    }
    x.restore()
  }
  // the near shore the crowd stands on (it sinks with the crowd)
  function drawShore(t, oy, a) {
    if (a <= 0) return
    x.save(); x.translate(0, oy); x.globalAlpha = a
    const gp = ease.outCubic(prog(t, 0.05, 0.6))
    const gr = x.createLinearGradient(0, GROUND, 0, H)
    gr.addColorStop(0, 'rgba(12,8,30,0.98)'); gr.addColorStop(1, 'rgba(5,4,12,1)')
    x.fillStyle = gr; x.fillRect(0, GROUND, W, H - GROUND + 700)
    x.beginPath(); x.moveTo(W / 2 - 540 * gp, GROUND); x.lineTo(W / 2 + 540 * gp, GROUND)
    ink(x, LAV, { w: 5, fa: 0, glow: 18 })
    x.restore()
  }

  // ── a speech bubble (with a tail to the head when tailTo is given), lifting to its star at `lt`
  function bubble(t, { text, sub, font, body, tB, cx0, cy0, tailTo, star, lt, seed, small }) {
    const k0 = pop01(t, tB, 0.4, 2.6)
    if (k0 <= 0) return
    const u = prog(t, lt, lt + T.liftDur)
    if (u >= 1) return
    x.save()
    x.font = font
    const tw0 = x.measureText(text).width
    const pad = small ? 40 : 52
    const fit = Math.min(1, (MAXW - pad) / tw0)
    const tw = tw0 * fit
    const bw = Math.max(tw + pad, sub ? 170 : 0), bh = small ? 70 : sub ? 124 : 94, rad = small ? 24 : 30
    let cx = clamp(cx0, 74 + bw / 2, W - 74 - bw / 2), cy = cy0
    cy += 6 * Math.sin(t * 2.2 + seed * 1.3)
    const ue = ease.inOutCubic(u)
    const side = seed % 2 ? 60 : -60
    const px = lerp(cx, star.x, ue) + Math.sin(ue * Math.PI) * side, py = lerp(cy, star.y, ue)
    const sc = k0 * (1 - 0.85 * ease.inQuad(clamp(u / 0.8)))
    const rot = (t > tB ? 0.12 * Math.sin((t - tB) * 12) * Math.exp(-(t - tB) * 3.5) : 0) + (seed % 2 ? 0.1 : -0.1) * Math.sin(ue * Math.PI)
    const a = 1 - clamp((u - 0.55) / 0.35)
    if (a > 0) {
      x.globalAlpha = a
      x.save(); x.translate(px, py); x.rotate(rot); x.scale(sc, sc)
      x.beginPath(); x.roundRect(-bw / 2, -bh / 2, bw, bh, rad)
      const tk = tailTo ? 1 - clamp(u * 4) : small ? 1 - clamp(u * 4) : 0
      if (tk > 0) {
        const thx = tailTo ? (tailTo.x - cx) * 0.55 : (seed % 2 ? 18 : -18), thy = tailTo ? bh / 2 + (tailTo.y - cy - bh / 2) * 0.55 * tk + 12 : bh / 2 + 26 * tk
        x.moveTo(-14, bh / 2 - 2); x.lineTo(thx, thy); x.lineTo(14, bh / 2 - 2)
      }
      x.fillStyle = 'rgba(16,10,38,0.94)'; x.fill()
      ink(x, body, { w: small ? 5 : 6, fa: 0, glow: 18 })
      x.beginPath(); x.roundRect(-bw / 2, -bh / 2, bw, bh, rad); x.fillStyle = 'rgba(16,10,38,0.94)'; x.fill()   // cover the tail seam
      x.beginPath(); x.roundRect(-bw / 2, -bh / 2, bw, bh, rad); ink(x, body, { w: small ? 5 : 6, fa: 0.12, glow: 0 })
      x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.font = font
      x.save(); x.translate(0, sub ? -16 : 3); x.scale(fit, fit); x.fillText(text, 0, 0); x.restore()
      if (sub) { x.font = `700 22px ${MONO}`; x.fillStyle = rgba(body, 0.95); x.fillText(sub, 0, 38) }
      x.restore()
    }
    // the star it becomes
    if (u > 0.45) {
      const sk = easeOutBack(prog(u, 0.45, 1), 2.4)
      x.globalAlpha = 1
      orb(x, px, py, 9 * sk, body, sk, 4); drawPixelStar(x, px, py, 44 * sk, seed % 3, body)
    }
    // a little trail while flying
    if (u > 0.05 && u < 0.95) {
      for (let k = 1; k < 6; k++) {
        const uu = ease.inOutCubic(Math.max(0, u - k * 0.04))
        const tx = lerp(cx, star.x, uu) + Math.sin(uu * Math.PI) * side, ty = lerp(cy, star.y, uu)
        x.globalAlpha = (1 - k / 6) * 0.8
        drawPixelStar(x, tx + Math.sin(k * 2.3) * 8, ty + 14 + k * 4, 16 - k * 2, k % 3, k % 2 ? body : '#fff3e0')
      }
    }
    x.restore()
  }
  const frontBubble = (p, t, oy) => bubble(t, { text: p.text, sub: p.sub, font: p.font, body: p.body, tB: p.tB, cx0: p.x, cy0: BUB_Y[p.row] - bounce(t, p.i) * 0.6 + oy,
    tailTo: { x: p.x, y: GROUND - HEAD - 6 + oy }, star: STAR_F[p.i], lt: liftT(LIFT_F[p.i]), seed: p.i, small: false })
  const backBubble = (b, t, oy) => bubble(t, { text: b.text, font: CHAT_FONT, body: b.body, tB: b.tB, cx0: b.x, cy0: b.y - bounce(t, 1) * 0.5 + oy,
    tailTo: null, star: STAR_B[b.i], lt: liftT(LIFT_B[b.i]), seed: b.i + 7, small: true })

  // ── the greeting stars (after the bubbles land): they twinkle until the finale net, then fade with everything
  function drawStars(t) {
    const fin = finK(t)
    const all = [...FRONT.map(p => ({ S: STAR_F[p.i], col: p.body, lt: liftT(LIFT_F[p.i]), pair: PAIR.includes(p.i), n: p.i })),
      ...BACK.map(b => ({ S: STAR_B[b.i], col: b.body, lt: liftT(LIFT_B[b.i]), pair: false, n: b.i + 7 }))]
    for (const s of all) {
      if (t < s.lt + T.liftDur) continue
      if (s.pair && t > T.fall[0]) continue
      const land = prog(t, s.lt + T.liftDur, s.lt + T.liftDur + 0.4)
      const tw = 0.75 + 0.25 * noise1(t * 3 + s.n, s.n)
      const dim = s.pair ? 1 : 1 - 0.35 * ease.inOutQuad(prog(t, T.pick, T.pick + 0.4)) * (1 - ease.inOutQuad(prog(t, T.net[0], T.net[1])))
      let sz = 44 * tw * (1 + 0.35 * Math.exp(-land * 5) * Math.sin(land * 14))
      // the pair flares just before they fall
      const fl = s.pair ? ease.outCubic(prog(t, T.pick, T.pick + 0.12)) : 0
      sz *= 1 + 0.5 * fl
      x.globalAlpha = fin * dim
      orb(x, s.S.x, s.S.y, 10 + 8 * fl, fl > 0 ? GOLD : s.col, 0.85 * fin * dim, 4)
      drawPixelStar(x, s.S.x, s.S.y, sz, s.n % 3, fl > 0.5 ? '#fff3e0' : s.col)
      x.globalAlpha = 1
      sparkle(x, s.S.x, s.S.y, t, s.lt + T.liftDur - 0.1, { n: 8, R: 90, seed: 20 + s.n, size: 20, dur: 0.6 })
    }
    sparkle(x, P_L.x, P_L.y, t, T.pick, { n: 10, R: 120, seed: 61, size: 24, dur: 0.6 })
    sparkle(x, P_R.x, P_R.y, t, T.pick + 0.04, { n: 10, R: 120, seed: 62, size: 24, dur: 0.6 })
  }

  // ── the pair: star falls to the head, blooms into a chart, rises back into the sky, becomes a gold star
  const pairHome = j => ({ x: FRONT[PAIR[j]].x, y: CHART_Y })
  function pairPos(j, t, oy) {
    const S = j ? P_R : P_L, Hm = pairHome(j)
    const f = ease.inCubic(prog(t, ...T.fall))
    const r = ease.inOutCubic(prog(t, ...T.rise))
    const hy = hop(t, T.arc[1] + 0.05, 34)
    const x0 = lerp(S.x, Hm.x, f), y0 = lerp(S.y, Hm.y - hy, f)
    return { x: lerp(x0, S.x, r), y: lerp(y0, S.y, r) + 8 * Math.sin(t * 2 + j * 2) * r, f, r }
  }
  function miniChart(cx, cy, r, sign, k, t, glow = 0, a = 1) {
    if (k <= 0 || a <= 0) return
    const S = SIGNS[sign]
    x.save(); x.globalAlpha = a; x.translate(cx, cy); x.scale(k, k)
    const rot = t * 0.3 + sign
    x.beginPath(); x.arc(0, 0, r, 0, TAU); x.fillStyle = 'rgba(12,8,30,0.92)'; x.fill()
    for (let i = 0; i < 12; i++) {
      const a0 = rot + i * TAU / 12, a1 = a0 + TAU / 12
      x.beginPath(); x.arc(0, 0, r, a0, a1); x.arc(0, 0, r * 0.7, a1, a0, true); x.closePath()
      x.fillStyle = rgba(SIGNS[i].color, i === sign ? 0.85 : 0.28); x.fill()
    }
    x.strokeStyle = BONE; x.lineWidth = 2.5
    for (let i = 0; i < 12; i++) { const an = rot + i * TAU / 12; x.beginPath(); x.moveTo(Math.cos(an) * r * 0.7, Math.sin(an) * r * 0.7); x.lineTo(Math.cos(an) * r, Math.sin(an) * r); x.stroke() }
    x.beginPath(); x.arc(0, 0, r * 0.7, 0, TAU); x.stroke()
    x.beginPath(); x.arc(0, 0, r, 0, TAU); ink(x, glow > 0 ? GOLD : BONE, { w: 4 + 3 * glow, fa: 0, glow: 12 + 24 * glow })
    x.font = `bold ${Math.round(r * 0.95)}px 'EB Garamond', 'DejaVu Sans', 'Noto Sans Symbols', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.shadowColor = S.color; x.shadowBlur = 14; x.fillStyle = S.color; x.fillText(S.glyph + '︎', 0, r * 0.04); x.shadowBlur = 0
    x.restore()
  }
  const bloom = T.fall[1]
  const toStarK = t => ease.inOutQuad(prog(t, T.rise[1] - 0.2, T.rise[1] + 0.35))
  function drawPair(t, oy) {
    if (t < T.fall[0]) return
    const fin = finK(t)
    for (let j = 0; j < 2; j++) {
      const p = FRONT[PAIR[j]], P = pairPos(j, t, oy)
      // falling: a star with a trail
      if (t < bloom) {
        orb(x, P.x, P.y, 14, GOLD, 1, 4); drawPixelStar(x, P.x, P.y, 54, 0, '#fff3e0')
        for (let k = 1; k < 6; k++) { x.globalAlpha = (1 - k / 6) * P.f; drawPixelStar(x, P.x, P.y - k * 30 * P.f, 20 - k * 3, k % 3, p.body) }
        x.globalAlpha = 1
        continue
      }
      const k = easeOutBack(prog(t, bloom, bloom + 0.42), 2.6)
      const ts = toStarK(t)
      const s = (1 + 0.22 * easeOutBack(prog(t, T.arc[1], T.arc[1] + 0.4), 2.2)) * (1 - 0.85 * ts)
      // a dashed light tether down to their head while they're on the ground
      const ta = k * (1 - ease.inOutCubic(prog(t, T.rise[0], T.rise[0] + 0.4)))
      if (ta > 0) {
        x.save(); x.globalAlpha = clamp(ta) * 0.75; x.setLineDash([10, 12]); x.lineDashOffset = -t * 30
        x.beginPath(); x.moveTo(P.x, P.y + CHART_R * s * k + 6); x.lineTo(p.x, GROUND - 268 + oy - bounce(t, p.i))
        ink(x, GOLD, { w: 4, fa: 0, glow: 10 }); x.setLineDash([]); x.restore()
      }
      orb(x, P.x, P.y, CHART_R * s * 0.9, GOLD, 0.32 * fin * (1 - ts), 2.2)
      miniChart(P.x, P.y, CHART_R, p.sign, k * s, t, 1, fin * (1 - ts))
      if (ts > 0) {
        const tw = 1 + 0.2 * Math.sin(t * 5 + j)
        orb(x, P.x, P.y, (12 + 9 * ts) * tw, GOLD, ts * fin, 4.5)
        drawPixelStar(x, P.x, P.y, 60 * ts * tw * fin, 0, '#fff3e0')
      }
      sparkle(x, Math.min(P.x, 930), P.y, t, bloom, { n: 10, R: 110, seed: 30 + j, size: 22, dur: 0.6 })
    }
  }

  // ── the gold arc between the pair (over the crowd, then up in the sky)
  function arcPts(t, oy) {
    const A = pairPos(0, t, oy), B = pairPos(1, t, oy)
    const lift = lerp(300, 120, ease.inOutCubic(prog(t, ...T.rise)))
    const Q = { x: (A.x + B.x) / 2, y: Math.min(A.y, B.y) - lift }
    return { A, B, at: u => ({ x: (1 - u) ** 2 * A.x + 2 * u * (1 - u) * Q.x + u * u * B.x, y: (1 - u) ** 2 * A.y + 2 * u * (1 - u) * Q.y + u * u * B.y }) }
  }
  function drawArc(t, oy) {
    const ap = ease.inOutQuad(prog(t, ...T.arc))
    if (ap <= 0) return
    const fin = finK(t)
    if (fin <= 0) return
    const { at } = arcPts(t, oy)
    const done = t >= T.arc[1]
    const pulse = done ? 1 + 0.6 * Math.exp(-(t - T.arc[1]) * 3) : 1
    const rr = CHART_R * (1 - 0.85 * toStarK(t)) * 1.1
    const L = Math.abs(P_R.x - P_L.x) * 1.15
    const u0 = clamp(rr / L, 0, 0.3), u1 = 1 - u0
    const N = Math.ceil(80 * ap)
    x.save(); x.globalAlpha = fin
    x.beginPath(); for (let i = 0; i <= N; i++) { const p = at(lerp(u0, u1, (i / N) * ap)); i ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y) }
    ink(x, GOLD, { w: 11 * pulse, fa: 0, glow: 34 })
    x.strokeStyle = '#fff3e0'; x.lineWidth = 3.5; x.stroke()
    x.restore()
    if (!done) {
      const h = at(lerp(u0, u1, ap))
      orb(x, h.x, h.y, 16, GOLD, 1, 4)
      for (let k = 1; k < 8; k++) { const q = at(lerp(u0, u1, Math.max(0, ap - k * 0.03))); x.globalAlpha = 1 - k / 8; drawPixelStar(x, q.x + Math.sin(k * 2.3) * 10, q.y + Math.cos(k * 1.7) * 10, 18 - k, k % 3, k % 2 ? GOLD : PINK) }
      x.globalAlpha = 1
    } else {
      for (let k = 0; k < 2; k++) {
        const ph = ((t - T.arc[1] + k * 0.55) % 1.1) / 1.1
        const q = at(lerp(u0, u1, ease.inOutQuad(k ? 1 - ph : ph)))
        orb(x, q.x, q.y, 9, k ? ROSE : BLUE, Math.sin(Math.PI * ph) * fin, 3.5)
      }
    }
    const A = at(u0), B = at(u1)
    sparkle(x, B.x, B.y, t, T.arc[1], { n: 18, R: 200, seed: 33, size: 32, dur: 0.9 })
    sparkle(x, A.x, A.y, t, T.arc[1] + 0.1, { n: 12, R: 160, seed: 34, size: 26, dur: 0.8 })
    const M = at(0.5)
    sparkle(x, M.x, M.y, t, T.twinkle, { n: 16, R: 240, seed: 90, size: 28, dur: 0.85 })
  }

  // ── the finale: every star joins into one constellation (one sky)
  function drawNet(t) {
    const p = ease.inOutCubic(prog(t, ...T.net))
    if (p <= 0) return
    const fin = finK(t)
    const n = NET.length, segs = p * n
    x.save(); x.globalAlpha = fin
    x.setLineDash([2, 14]); x.lineCap = 'round'
    for (let i = 0; i < n; i++) {
      const s = clamp(segs - i)
      if (s <= 0) break
      const A = NET[i], B = NET[(i + 1) % n]
      x.beginPath(); x.moveTo(A.x, A.y); x.lineTo(lerp(A.x, B.x, s), lerp(A.y, B.y, s))
      x.shadowColor = LAV; x.shadowBlur = 12; x.strokeStyle = rgba('#fff3e0', 0.75); x.lineWidth = 5; x.stroke()
    }
    x.restore()
    for (let i = 0; i < n; i++) if (segs > i) sparkle(x, NET[i].x, NET[i].y, t, T.net[0] + (i / n) * (T.net[1] - T.net[0]), { n: 5, R: 50, seed: 70 + i, size: 14, dur: 0.45 })
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < 10.3) {
        const oy = sinkY(t), a = crowdA(t)
        drawCity(t, finK(t))
        drawShore(t, oy, a)
        // back row
        for (const b of BACK) {
          const k = pop01(t, b.tIn, 0.4, 2.2)
          if (k <= 0 || a <= 0) continue
          person(x, b.x, GROUND - 92 + oy - bounce(t, 1) * 0.7, 0.6 * k, { body: b.body, a: 0.62 * a, w: 7 })
        }
        // front row
        for (const p of FRONT) {
          const k = pop01(t, p.tIn, 0.42, 2.2)
          if (k <= 0 || a <= 0) continue
          const pick = PAIR.includes(p.i)
          const dim = pick ? 1 : 1 - 0.5 * ease.inOutQuad(prog(t, T.pick, T.pick + 0.4))
          const hy = bounce(t, p.i) + hop(t, p.tB, 26, 0.34) + (pick ? hop(t, T.arc[1] + 0.05, 40) + hop(t, bloom, 22) : 0)
          const sq = 1 + (t > p.tB ? 0.1 * Math.exp(-(t - p.tB) * 6) * Math.sin((t - p.tB) * 20) : 0)
          person(x, p.x, GROUND + oy - hy, FS * k, { body: p.body, a: a * dim, sq, w: 8 })
        }
        drawNet(t)
        drawStars(t)
        drawArc(t, oy)
        drawPair(t, oy)
        for (const b of BACK) backBubble(b, t, 0)
        for (const p of FRONT) frontBubble(p, t, 0)
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.25)))
      eyebrow.style.opacity = String(ease.outCubic(prog(t, T.eye, T.eye + 0.3)) * outK(t, T.h0Out))
      H0.update(t, outK(t, T.h0Out))
      H1.update(t, outK(t, T.h1Out))
      H2.update(t, outK(t, T.h2Out, 0.3))
      drawGrain(gx, t)
    },
  }
}

// ── sound (D-major palette, the film's key)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (ts, base = 0, gain = 0.026) => ts.map((s, i) => ['pop', r3(s), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const panX = px => r3((px - 540) / 540 * 0.6)
export const CUES = [
  // hook: hello, hello, hello…
  ...wordPops([T.h0], 0, 0.03),
  ['pluck', T.toronto, 1174.66, 0.05, 0.6, 0], ['pop', T.toronto, 1318.51, 0.04, 0],
  ...FRONT.map((p, i) => ['pop', r3(p.tIn), NOTE[i % 7] / 2, 0.02, panX(p.x)]),
  ...FRONT.map((p, i) => ['pluck', r3(p.tB), NOTE[[0, 2, 4, 1, 3, 5, 6][i]], 0.05, 0.5, panX(p.x)]),
  ...FRONT.map((p, i) => ['pop', r3(p.tB), NOTE[[0, 2, 4, 1, 3, 5, 6][i]] * 2, 0.028, panX(p.x)]),
  ...wordPops([T.every, T.every + 0.14], 2, 0.026),
  ['pluck', T.some, 1174.66, 0.055, 0.6, 0], ['bell', T.some, 1760, 0.035, 1.6, 0],
  ['riser', r3(T.drop - 0.75), T.drop, 0.045],
  ['boom', T.drop, 0.1], ['whoosh', T.drop, 1.0, 0.05], ['glitter', r3(T.drop + 0.1), r3(T.drop + 0.9)],
  ...TOWERS.filter((b, i) => i % 3 === 0).map(b => ['tick', r3(b.tIn), 0.022]),
  ['bell', r3(T.drop + 0.6), 1318.51, 0.035, 1.6, 0.1],
  ...BACK.map((b, i) => ['pop', r3(b.tB), NOTE[(i + 3) % 7] * 2, 0.024, panX(b.x)]),
  // anywhere: bubbles rise into stars
  ['whoosh', r3(T.h0Out - 0.05), 0.4, 0.035],
  ...wordPops([T.h1, T.h1 + 0.08, T.h1 + 0.24, T.h1 + 0.32, T.h1 + 0.4], 1, 0.024),
  ['pluck', T.any, 1174.66, 0.055, 0.6, 0], ['bell', T.any, 1318.51, 0.04, 2.0, 0],
  ...[0, 2, 4, 6, 8, 10, 12].map(n => ['whoosh', r3(liftT(n)), 0.45, 0.018]),
  ...Array.from({ length: 13 }, (_, n) => ['bell', r3(liftT(n) + T.liftDur - 0.1), NOTE[(n * 2) % 7] * 2, 0.024, 1.4, r3(Math.sin(n * 1.7) * 0.5)]),
  ['glitter', T.lift0, r3(liftT(12) + T.liftDur)],
  ['bell', T.pick, 880, 0.045, 1.8, panX(P_L.x)], ['bell', r3(T.pick + 0.06), 1174.66, 0.045, 1.8, panX(P_R.x)],
  ['whoosh', T.fall[0], 0.4, 0.03], ['pop', T.fall[1], 987.77, 0.045, -0.3], ['pop', r3(T.fall[1] + 0.05), 1174.66, 0.045, 0.3],
  ['riser', T.arc[0], T.arc[1], 0.05], ['whoosh', T.arc[0], 0.6, 0.045], ['glitter', T.arc[0], T.arc[1]],
  ['boom', T.arc[1], 0.1], ['bell', T.arc[1], 880, 0.05, 2.4, 0.3], ['bell', r3(T.arc[1] + 0.06), 1174.66, 0.045, 2.4, 0], ['bell', r3(T.arc[1] + 0.12), 1760, 0.03, 2.2, -0.3],
  // one sky
  ['whoosh', T.sink[0], 1.3, 0.035],
  ...wordPops([T.h2, T.h2 + 0.1, T.h2 + 0.32], 2, 0.024),
  ['pluck', T.sky, 880, 0.055, 0.6, 0], ['bell', T.sky, 1174.66, 0.045, 2.2, 0],
  ['glitter', T.net[0], T.net[1]], ...Array.from({ length: 5 }, (_, i) => ['tick', r3(T.net[0] + i * 0.18), 0.018]),
  ['bell', T.twinkle, 1318.51, 0.04, 2.0, -0.2], ['bell', r3(T.twinkle + 0.08), 1760, 0.03, 2.0, 0.2], ['glitter', T.twinkle, r3(T.twinkle + 0.6)],
]
