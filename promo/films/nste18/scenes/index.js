// nste18: SINGLE AND THRIVING, Ep 18 "The Set-Up" (25 s vertical, Next 30 b33, music: jazzy · Eb).
// Format kit: ../../nste01/singlekit.js (story 0–20.6, then the shared end card). Rows: promo/films/next30/b33.md.
//   0.0–6.8    hook "“I know someone | *perfect* for you!”" At the café table, Libra thrusts a phone across with a
//              mystery profile photo: "they're PERFECT for you!!"  Virgo, mid-sip: "oh. um. hm."  Pisces sniffles.
//   6.8        card cut → THE STARS: "not ready? you can say *not yet.*" / "thank them. be *clear.* stay kind."
//   13.6       Virgo: "thank you! not right now." → "I'll tell you when."  Libra: "deal!!" and a hug across the
//              table. Hearts. Meter fills.
//   17.4       "Virgo: *thriving.*" Last line: "*Not yet* is a kind answer."
import { makeSingle, room, table, R, note, shadow, sparkles, hearts, mug, drawStarChar, pop01, prog, lerp, ease, T, INK } from '../../nste01/singlekit.js'

const CAFE = (x, t) => room(x, t, { wall: '#3a2a3a', wall2: '#342534', floor: '#43303c', win: { x: 400, y: 470, w: 280, h: 280 } })
function photoPhone(x, t, cx, cy, rot, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, INK, -80, -130, 160, 260); R(x, '#2a2148', -72, -122, 144, 244); R(x, '#4a3a7a', -60, -100, 120, 170)
  drawStarChar(x, 0, -20, 100, t, { color: '#8a80b0', mood: 'happy', look: [0, 0], tips: false, glow: 0.3, seed: 70 })
  R(x, '#ff8fb1', -40, 86, 80, 14)
  x.restore()
}

function s1(x, t, S) {
  const { u, hero, star } = S
  CAFE(x, t)
  const push = ease.outBack(Math.min(1, u / 0.6))
  star(x, t, 'libra', { x: 800, y: 1110, s: 250, mood: 'sparkle', look: [-1, 0], seed: 71, hops: [0.2, 1.0, 1.4, 2.0] })
  table(x, 540, 1260, 760)
  hero(x, t, { x: 260, y: 1110, s: 250, mood: u > 3.8 ? 'wide' : 'neutral', look: [1, 0.3], blink: u > 3.8 ? false : undefined, hops: [3.9], squash: u > 3.8 ? 0.05 : 0 })
  mug(x, t, 200, 1255, { s: 0.85, col: '#9fe6b0' })
  photoPhone(x, t, lerp(740, 520, push), 1130, -0.1, 1)
}
function s2(x, t, S) {
  const { hero } = S
  CAFE(x, t)
  x.fillStyle = 'rgba(5,4,12,0.55)'; x.fillRect(0, 420, 1080, 1500)
  hero(x, t, { x: 250, y: 1170, s: 200, mood: t > T.B + 1.6 ? 'happy' : 'neutral', look: [1, -1], hops: [T.A + 0.4, T.B + 1.8] })
  note(x, 790, 1170, '“not yet”|is allowed', { w: 340, h: 150, col: '#ffe27a', rot: 0.05, size: 40, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  note(x, 800, 1320, 'thank · clear · kind', { w: 340, h: 70, col: '#9fe6b0', rot: -0.04, size: 30, k: pop01(t, T.B + 1.4, 0.3, 2.4) })
}
function s3(x, t, S) {
  const { u, hero, star } = S
  CAFE(x, t)
  const hug = ease.inOutCubic(prog(u, 2.6, 3.0))
  star(x, t, 'libra', { x: lerp(800, 640, hug), y: 1110, s: 250, mood: u > 2.6 ? 'heart' : 'happy', look: [-1, 0], seed: 71, hops: [2.6, 2.9].map(v => S.t0 + v) })
  table(x, 540, 1260, 760)
  hero(x, t, { x: lerp(260, 420, hug), y: 1110, s: 250, mood: u > 2.6 ? 'happy' : 'sparkle', look: [1, -0.2], hops: [0.4, 1.6, 2.65].map(v => S.t0 + v) })
  photoPhone(x, t, lerp(520, 780, ease.inOutCubic(prog(u, 0.2, 0.7))), 1180, 0.1, 1 - prog(u, 0.6, 0.9))
  mug(x, t, 200, 1255, { s: 0.85, col: '#9fe6b0' })
  hearts(x, t, S.t0 + 2.7, 530, 980, { n: 6 })
}
function fin(x, t, S) {
  const { hero, ok, u } = S
  shadow(x, 540, 1150, 260 * ok)
  hero(x, t, { x: 540, y: 960, s: 300, pop: ok, mood: u > 1.6 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5] })
  mug(x, t, 720, 1060, { s: 1.0 * ok, col: '#9fe6b0' })
}

const EP = makeSingle({
  id: 'nste18', sign: 'virgo', name: 'Virgo',
  hook: '“I know someone | *perfect* for you!”',
  h1: '*Not yet* is allowed.', h2: 'Kind *and* clear.',
  lines: ['not ready? you can say *not yet.*', 'thank them. be *clear.* stay kind.'],
  last: '*Not yet* is a kind answer.',
  bubbles: [
    { t0: 1.0, t1: 3.6, x: 760, y: 880, text: 'they’re PERFECT for you!!', size: 40, tail: 0.2 },
    { t0: 3.9, t1: 6.6, x: 300, y: 880, text: 'oh. um. hm.', size: 46, tail: -0.2 },
    { t0: 13.9, t1: 15.0, x: 330, y: 880, text: 'thank you! not right now.', size: 38, tail: -0.2 },
    { t0: 15.05, t1: 16.15, x: 330, y: 880, text: 'I’ll tell you when.', size: 40, tail: -0.2 },
    { t0: 16.2, t1: 17.3, x: 740, y: 880, text: 'deal!!', size: 46, tail: 0.2, col: '#ffe2c4' },
  ],
  pis1: { x: 960, y: 1610, s: 120 }, pis3: { x: 960, y: 1630, s: 110 },
  meter: { x: 450, y: 1620 },
  s1, s2, s3, fin,
  cues: [['whoosh', 0.05, 0.4, 0.03], ['tick', 0.55, 0.05], ['whoosh', 13.8, 0.3, 0.025], ['pop', 16.25, 1318.51, 0.04, 0], ['glitter', 16.3, 16.7]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
