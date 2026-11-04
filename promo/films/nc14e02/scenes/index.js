// nc14e02: CUFFING SEASON, "Aries asks in October energy" (30 s vertical, Season 14 ep 2, music: chiptune · E).
// Story 0–25.6, then the shared end card. The show look lives in ../../nc14e01/scenes/cuffkit.js.
//   0.0–6.2    "Aries asked them out | at *full speed.*"  Frame 0: a snowy street, Aries mid-sprint in a T-shirt with speed
//              lines. It skids to a stop in a spray of snow in front of Cancer (scarf, mug) and slaps up a sign:
//              WINTER WITH ME?  Cancer: "um. hi?"  Aries: "HI. so? yes??"
//   6.2–13.4   "October energy. | *December* weather."  Close-up: Aries in a T-shirt, shivering, a little snow cap piling up
//              on its head. ARIES: "I'm not cold. I'm *ready*."  Pisces shuffles in, crying, and wraps it in a blanket.
//              Aries: "…ok. a little cold."
//  13.4        card cut.
//  13.4–19.6   "Bold is | *great.*"  THE STARS: "bold is great. add a *question mark*."  Aries, wrapped up, walks back in slow
//              motion (0.5×); the sign flips to COCOA SOMETIME?  ARIES: "hi. want to get cocoa sometime? no rush."
//              Cancer: "…yes!" (hearts)
//  19.6–25.6   "Same fire. | *New* pace."  The two walk off side by side with cocoa; Pisces sobs in the back.
//              THE STARS: "Same fire. *Slower* walk."
import {
  makeCuff, R, box, bubble, label, shadow, glow, sparkles, hearts, snowGround, mug, starFrame, inSprite,
  pop01, outK, popOut, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, ICE, PINK, RED, signStar,
} from '../../nc14e01/scenes/cuffkit.js'

const T = {
  h0Out: [6.0, 6.2], skid: 1.15, sign1: 1.5,
  b2: 6.2, h1: 6.35, h1Out: [13.2, 13.4], pisIn: 10.0, wrap: 10.9,
  cut: 13.4, h2: 13.55, h2Out: [19.4, 19.6], walk: [14.4, 16.6], flip: 16.4, yes: 18.9,
  b4: 19.6, h3: 19.75, last: 20.5,
}
const SP = 'THE STARS', AR = '♈︎ ARIES'
const ARC = '#ff9a7a'
const B1 = [{ t: 7.3, speaker: AR, color: ARC, text: "I'm not cold. I'm *ready*." }]
const B2 = [
  { t: 13.8, speaker: SP, text: 'bold is great. add a *question mark*.' },
  { t: 16.6, speaker: AR, color: ARC, text: 'hi. want to get cocoa sometime? *no rush.*' },
]
const B3 = [{ t: T.last, speaker: SP, text: 'Same fire. *Slower* walk.' }]
const CAN_SCARF = '#f4f0ff'

function street(x, t) {
  // brick fronts with warm windows, a lamp post
  for (let i = 0; i < 4; i++) {
    const X = i * 280 - 20
    R(x, i % 2 ? '#3b2244' : '#43263f', X, 860, 270, 600)
    for (let j = 0; j < 2; j++) { box(x, X + 50 + j * 110, 960, 70, 100, '#f7d27a', { b: 6 }); R(x, '#e9f2ff', X + 44 + j * 110, 1056, 82, 10) }
  }
  R(x, INK, 905, 900, 22, 560); R(x, '#5a5470', 911, 900, 10, 560); box(x, 880, 860, 72, 50, '#f7d27a', { b: 6 })
  glow(x, 916, 900, 260, 0.25)
  snowGround(x, 1450)
  void t
}
function sign(x, t, cx, cy, k, text, { rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, INK, -9, 60, 18, 170); R(x, '#a07850', -4, 60, 8, 166)
  box(x, -230, -64, 460, 118, BONE, { b: 8 })
  x.font = "800 42px Inter, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = RED; x.fillText(text, 0, -2)
  x.restore()
}
/** a plaid blanket wrapped round the sprite (sprite cells) */
function blanketCells(x, k) {
  if (k <= 0) return
  const h = 8.6 * k
  x.fillStyle = INK; x.fillRect(4.4, 34.6 - h - 0.6, 27.2, h + 1.2)
  x.fillStyle = '#d9576a'; x.fillRect(5, 34.6 - h, 26, h)
  x.fillStyle = '#f4b9c2'; for (let i = 0; i < 5; i++) x.fillRect(7 + i * 5, 34.6 - h, 1, h)
  x.fillStyle = '#a63a50'; for (let j = 0; j < Math.floor(h / 4); j++) x.fillRect(5, 34.6 - h + 2 + j * 4, 26, 0.8)
}
function aries(x, t, K, o) {
  const r = K.star(x, t, 'aries', o)
  // the T-shirt (a little bone tee over the middle) unless wrapped
  inSprite(x, r.F, () => {
    blanketCells(x, o.wrap || 0)
    if (o.cap) { x.fillStyle = INK; x.fillRect(14.4 - o.cap, 2.4 - o.cap * 0.8, 7.2 + 2 * o.cap, 2.2 + o.cap); x.fillStyle = '#f6f2ff'; x.fillRect(15 - o.cap, 3 - o.cap * 0.8, 6 + 2 * o.cap, 1.6 + o.cap) }
  })
  return r
}

function beat1(x, t, K) {
  if (t > T.b2) return
  street(x, t)
  const ok = outK(t, [T.b2 - 0.15, T.b2])
  // Aries sprints in (mid-sprint at frame 0), skids, sign up
  const run = ease.outCubic(prog(t, -0.5, T.skid))
  const ax = lerp(-80, 380, run)
  if (t < T.skid + 0.1) for (let i = 0; i < 6; i++) R(x, 'rgba(239,230,214,0.7)', ax - 200 - i * 26 - ((t * 900 + i * 50) % 120), 1180 + i * 34, 120 - i * 12, 8)
  if (t > T.skid - 0.1 && t < T.skid + 0.8) { const p = prog(t, T.skid - 0.1, T.skid + 0.8); x.save(); x.globalAlpha = 1 - p; for (let i = 0; i < 14; i++) R(x, '#f6f2ff', ax + 60 + Math.cos(i) * 140 * p + i * 6, 1430 - Math.abs(Math.sin(i * 1.7)) * 220 * p + 300 * p * p, 12, 12); x.restore() }
  shadow(x, ax, 1450, 230 * ok); shadow(x, 760, 1450, 230 * ok)
  aries(x, t, K, { x: ax, y: 1260, s: 250, pop: ok, mood: t < T.skid ? 'squint' : 'sparkle', look: [1, 0], squash: t < T.skid ? -0.08 : 0, hops: [0.15, 0.45, 0.75, T.sign1, 4.3], seed: 3 })
  sign(x, t, ax - 20, 900, pop01(t, T.sign1, 0.3, 2.4) * ok, 'WINTER WITH ME?', { rot: -0.05 + 0.03 * Math.sin(t * 6) })
  const cm = t < T.skid ? 'neutral' : t < 3.6 ? 'wide' : 'squint'
  K.star(x, t, 'cancer', { x: 760, y: 1270, s: 230, pop: ok, mood: cm, look: [-1, 0], scarf: CAN_SCARF, seed: 8, hops: [T.skid + 0.05] })
  mug(x, t, 870, 1300, 0.8)
  bubble(x, t, 770, 1030, 2.9, T.b2 - 0.15, 'um. hi?', { size: 36, tail: 0 })
  bubble(x, t, 380, 680, 4.2, T.b2 - 0.15, 'HI. so? yes??', { size: 40, tail: -0.2, col: '#ffd9cc' })
  // Pisces at the window, sniffling
  K.pisces(x, t, { x: 145, y: 1020, s: 110, pop: pop01(t, 2.0, 0.3, 2) * ok }, 1, 'wide', [1, 0.4])
}

function beat2(x, t, K) {
  if (t < T.b2 || t > T.cut) return
  const ok = outK(t, [T.cut - 0.2, T.cut])
  // close-up: a freezing Aries, still confident
  street(x, t)
  x.save(); x.globalAlpha = 0.55; R(x, '#0b0a20', 0, 0, 1080, 1920); x.restore()
  const wrapK = ease.outBack(prog(t, T.wrap, T.wrap + 0.5))
  const cap = Math.min(2.5, Math.max(0, (t - T.b2) * 0.45))
  const shiv = t < T.wrap ? 1.6 : 0.4
  shadow(x, 540, 1450, 380 * ok)
  aries(x, t, K, { x: 540, y: 1140, s: 430, pop: ok, mood: t < 9.2 ? 'sparkle' : t < T.wrap ? 'squint' : 'happy', look: [0, 0], shiver: shiv, cap, wrap: clamp(wrapK), hops: [7.3, 7.7, T.wrap + 0.1], seed: 3 })
  // labels
  const lk = pop01(t, 8.6, 0.3, 2) * ok
  if (lk > 0.01) { label(x, 'NO JACKET →', 210, 1080, { size: 34, col: GOLD, alpha: clamp(lk) * (1 - wrapK) }); label(x, 'TEETH: CHATTERING', 540, 1520, { size: 30, col: ICE, alpha: clamp(lk) * (t < T.wrap ? 1 : 0) }) }
  // Pisces shuffles in with the blanket, crying
  const pin = ease.outCubic(prog(t, T.pisIn, T.wrap))
  if (t > T.pisIn) K.pisces(x, t, { x: lerp(1250, 860, pin), y: 1340, s: 200, pop: ok, hops: [T.pisIn + 0.2, T.pisIn + 0.5, T.wrap] }, 3, 'sparkle', [-1, -0.5])
  if (t > T.pisIn && t < T.wrap) {
    x.save(); x.translate(lerp(1250, 860, pin) - 120, 1260); x.rotate(-0.2); box(x, -70, -40, 140, 80, '#d9576a', { b: 5 }); for (let i = 0; i < 4; i++) R(x, '#f4b9c2', -60 + i * 34, -40, 8, 80); x.restore()
  }
  sparkles(x, t, 540, 1240, T.wrap, 10, 260, 1, [PINK, BONE, GOLD])
  bubble(x, t, 540, 640, 11.5, T.cut - 0.1, '…ok. a little cold.', { size: 40 })
}

function beat3(x, t, K) {
  if (t < T.cut) return
  const ok = popOut(t, K.OUT)
  street(x, t)
  const fin = ease.inOutCubic(prog(t, T.b4, T.b4 + 1.4))
  // slow-mo walk in, wrapped in the blanket
  const w = ease.inOutSine ? ease.inOutSine(prog(t, ...T.walk)) : ease.inOutQuad(prog(t, ...T.walk))
  let ax = lerp(-120, 360, w), cx = 760
  if (fin > 0) { ax = lerp(360, 300, fin) + (t - T.b4) * 18; cx = lerp(760, 560, fin) + (t - T.b4) * 18 }
  const slow = t > T.walk[0] && t < T.walk[1] + 0.3
  if (slow) label(x, '0.5×', 940, 760, { size: 52, col: GOLD, font: 'Inter, sans-serif', weight: 800, alpha: clamp(prog(t, T.walk[0], T.walk[0] + 0.2)) })
  shadow(x, ax, 1450, 230 * ok); shadow(x, cx, 1450, 220 * ok)
  const H = K.hopsFor(AR)
  aries(x, t, K, { x: ax, y: 1260, s: 240, pop: ok, mood: t > T.yes ? 'heart' : 'happy', look: [1, 0], wrap: 1, hops: [T.walk[0] + 0.4, T.walk[0] + 1.3, ...H, T.yes + 0.05], seed: 3 })
  // the sign flips
  if (t < T.b4 + 0.2) {
    const fl = prog(t, T.flip, T.flip + 0.3), sx = Math.abs(Math.cos(Math.PI * fl))
    x.save(); x.translate(ax - 10, 900); x.scale(sx || 0.01, 1); x.translate(-(ax - 10), -900)
    sign(x, t, ax - 10, 900, pop01(t, T.walk[0], 0.3, 2) * outK(t, [T.b4, T.b4 + 0.2]), fl < 0.5 ? 'WINTER WITH ME?' : 'COCOA SOMETIME?')
    x.restore()
  }
  K.star(x, t, 'cancer', { x: cx, y: 1270, s: 230, pop: ok, mood: t > T.yes ? 'heart' : t > 16.6 ? 'happy' : 'neutral', look: [-1, 0], scarf: CAN_SCARF, seed: 8, hops: [T.yes, T.yes + 0.4] })
  bubble(x, t, cx, 1020, T.yes, T.b4 + 0.6, '…yes!', { size: 44, col: '#d6f0ff' })
  hearts(x, t, T.yes + 0.1, (ax + cx) / 2, 1080, { n: 7 })
  if (fin > 0) { mug(x, t, ax + 120, 1330, 0.6, { col: '#e86a5a' }); mug(x, t, cx - 120, 1330, 0.6, { col: '#4f8cff' }) }
  // THE STARS above, Pisces sobbing by the lamp post
  const sk = pop01(t, T.cut + 0.2, 0.4, 2) * ok
  K.stars(x, t, { x: 540, y: 620, s: 190, pop: sk, mood: t > T.yes ? 'happy' : 'neutral', look: [0, 0.6], hops: K.hopsFor(SP) })
  K.pisces(x, t, { x: 980, y: 1330, s: 130, pop: ok, scarf: ICE }, t > T.yes ? 3 : 2, 'sparkle', [-1, -0.4])
}

const EP = makeCuff({
  id: 'nc14e02', duration: 30, ep: 2,
  heads: [
    { text: 'Aries asked them out | at *full speed.*', at: -1.2, out: T.h0Out, size: 96, accent: '#ff9a7a' },
    { text: 'October energy. | *December* weather.', at: T.h1, out: T.h1Out, size: 92 },
    { text: 'Bold is | *great.*', at: T.h2, out: T.h2Out, size: 108, accent: GOLD },
    { text: 'Same fire. | *New* pace.', at: T.h3, out: [25.0, 25.3], size: 104, accent: PINK },
  ],
  boxes: [
    { lines: B1, open: 7.1, close: 10.1 },
    { lines: B2, open: 13.6, close: 19.3 },
    { lines: B3, open: T.last - 0.22, close: 24.9 },
  ],
  cuts: [T.b2, { t: T.cut, kind: 'flip' }, T.b4],
  flashes: [T.b2, T.b4],
  ghost: { x: 916, y: 862, at: 3.4, from: 'below', cell: 3 },
  draw(x, t, K) { beat1(x, t, K); beat2(x, t, K); beat3(x, t, K) },
  cues: [
    ...[0.15, 0.45, 0.75].map(c => ['tick', c, 0.05]), ['whoosh', 0.0, 0.5, 0.04],
    ['whoosh', T.skid - 0.1, 0.3, 0.05], ['tick', T.skid, 0.07], ['glitter', T.skid, T.skid + 0.4],
    ['pop', T.sign1, 1318.51, 0.05, -0.2], ['pop', T.sign1 + 0.07, 1760, 0.03, -0.2],
    ['pop', 2.9, 739.99, 0.035, 0.4], ['pop', 4.2, 1174.66, 0.045, -0.3], ['pop', 4.32, 1318.51, 0.04, -0.3],
    ...Array.from({ length: 10 }, (_, i) => ['tick', +(8.6 + i * 0.09).toFixed(3), 0.025]),
    ['pop', 8.6, 880, 0.03, -0.4], ['whoosh', T.pisIn, 0.4, 0.03], ['pluck', T.wrap, 1174.66, 0.04, 0.6, 0.3], ['glitter', T.wrap, T.wrap + 0.4],
    ['pop', 11.5, 659.25, 0.035, 0],
    ['riser', T.walk[0], T.walk[1], 0.015], ['tick', T.flip, 0.05], ['pop', T.flip + 0.15, 1318.51, 0.04, -0.2],
    ['pluck', T.yes, 1174.66, 0.045, 0.5, 0.3], ['pluck', T.yes + 0.12, 1567.98, 0.04, 0.5, 0.3], ['glitter', T.yes, T.yes + 0.4],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [starFrame, easeOutBack, signStar]
