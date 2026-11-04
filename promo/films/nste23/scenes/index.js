// nste23: SINGLE AND THRIVING, Ep 23 "Curious Again" (25 s vertical, Next 30 b33, music: dreamy · G).
// Format kit: ../../nste01/singlekit.js (story 0–20.6, then the shared end card). Rows: promo/films/next30/b33.md.
//   0.0–6.8    hook "Thriving solo… | *and curious?*" Aquarius in its cosy room, tiptoeing up to a face-down blind mystery
//              card on the side table: "life's good solo…" → "maybe I'm… ready-ish?"  Pisces sniffles.
//   6.8        card cut → THE STARS: "ready feels like *curious*, not lonely." / "go slow. the *card* comes first."
//   13.6       Aquarius flips the blind mystery card over: a talk card question. Sparkles, a smile: "ooh. good question."
//              Meter fills.
//   17.4       "Aquarius: *thriving.*" Last line: "Curious is a *great* place to start."
import { makeSingle, room, box, R, note, shadow, sparkles, glow, cardImg, mug, pop01, prog, lerp, ease, clamp, T, INK } from '../../nste01/singlekit.js'

const HOME = (x, t) => room(x, t, { wall: '#1f3048', wall2: '#1c2c42', floor: '#28384a', win: { x: 120, y: 480, w: 260, h: 280 } })
function sideTable(x) { box(x, 580, 1250, 360, 30, '#6b4a2f', { b: 6, hi: '#8a6440' }); R(x, INK, 610, 1286, 20, 140); R(x, INK, 890, 1286, 20, 140) }

function s1(x, t, S) {
  const { u, hero, img } = S
  HOME(x, t)
  sideTable(x)
  x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 760, 1150, 220, 0.18 + 0.06 * Math.sin(u * 3), '127,224,255'); x.restore()
  cardImg(x, img('card-back.png'), 760, 1160, 170, { rot: 0.06 })
  const tip = ease.inOutQuad(prog(u, 0, 2.5))
  hero(x, t, { x: lerp(300, 420, tip), y: 1200, s: 270, mood: u > 3.8 ? 'sparkle' : 'neutral', look: [1, 0.2], hops: [0.5, 1.2, 1.9, 3.85] })
  mug(x, t, 880, 1250, { s: 0.8, col: '#7fd0ff' })
}
function s2(x, t, S) {
  const { hero, img } = S
  HOME(x, t); sideTable(x); cardImg(x, img('card-back.png'), 760, 1160, 170, { rot: 0.06 })
  x.fillStyle = 'rgba(5,4,12,0.55)'; x.fillRect(0, 420, 1080, 1500)
  hero(x, t, { x: 250, y: 1170, s: 200, mood: t > T.B + 1.6 ? 'happy' : 'neutral', look: [1, -1], hops: [T.A + 0.4, T.B + 1.8] })
  note(x, 790, 1170, 'curious,|not lonely', { w: 320, h: 150, col: '#ffe27a', rot: 0.05, size: 42, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  note(x, 800, 1320, 'card first. face last.', { w: 370, h: 70, col: '#9fe6b0', rot: -0.04, size: 28, k: pop01(t, T.B + 1.4, 0.3, 2.4) })
}
function s3(x, t, S) {
  const { u, hero, img } = S
  HOME(x, t)
  sideTable(x)
  // the flip: scale-x through 0, the back becomes the talk card
  const f = clamp(prog(u, 0.7, 1.2)), sx = Math.abs(Math.cos(f * Math.PI)), lift = Math.sin(f * Math.PI) * 120
  const face = f > 0.5
  if (face) { x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 760, 1000, 380, 0.22, '242,199,92'); x.restore() }
  cardImg(x, img(face ? 'card-talk-1.png' : 'card-back.png'), 760, 1160 - lift - (face ? 160 * ease.outBack(prog(u, 1.2, 1.7)) : 0), face ? 220 : 170, { rot: face ? -0.04 : 0.06, sx: Math.max(0.02, sx) })
  sparkles(x, t, 760, 1000, S.t0 + 1.0, 14, 240, 1)
  hero(x, t, { x: 380, y: 1200, s: 270, mood: u > 1.1 ? 'sparkle' : 'neutral', look: [1, -0.4], hops: [0.6, 1.15, 2.4].map(v => S.t0 + v) })
  mug(x, t, 900, 1250, { s: 0.8, col: '#7fd0ff' })
}
function fin(x, t, S) {
  const { hero, ok, u, img } = S
  shadow(x, 540, 1150, 260 * ok)
  hero(x, t, { x: 520, y: 960, s: 300, pop: ok, mood: u > 1.6 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5] })
  cardImg(x, img('card-talk-1.png'), 820, 860, 150, { rot: 0.1, k: ok })
}

const EP = makeSingle({
  id: 'nste23', sign: 'aquarius', name: 'Aquarius',
  hook: 'Thriving solo… | *and curious?*',
  h1: 'Curious *counts.*', h2: 'Card *first.*',
  lines: ['ready feels like *curious*, not lonely.', 'go slow. the *card* comes first.'],
  last: 'Curious is a *great* place to start.',
  images: ['card-back.png', 'card-talk-1.png'],
  bubbles: [
    { t0: 1.0, t1: 3.6, x: 380, y: 960, text: 'life’s good solo…', size: 42, tail: 0 },
    { t0: 3.85, t1: 6.6, x: 420, y: 960, text: 'maybe I’m… ready-ish?', size: 40, tail: 0 },
    { t0: 15.9, t1: 17.3, x: 380, y: 960, text: 'ooh. good question.', size: 42, tail: 0, col: '#ffe2c4' },
  ],
  pis1: { x: 960, y: 1610, s: 120 }, pis3: { x: 960, y: 1630, s: 110 },
  meter: { x: 450, y: 1620 },
  s1, s2, s3, fin,
  cues: [['whoosh', 14.3, 0.4, 0.035], ['pop', 14.55, 1318.51, 0.045, 0.2], ['glitter', 14.6, 15.1], ['bell', 14.65, 2349.32, 0.03, 1.0, 0.2]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
