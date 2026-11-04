// nste01: SINGLE AND THRIVING, Ep 1 "The Question at the Party" (23 s vertical, Next 30 b33, music: jazzy · Bb).
// Format kit: ../singlekit.js (story 0–20.6, then the short end card). Rows: promo/films/next30/b33.md.
//   0.0–6.8    hook "“So… *seeing anyone?*”" over the holiday party: Aries mid-sip of cocoa under the string lights,
//              Taurus leaning in: "it's been a year! anyone special?"  Aries chokes a little: "uh… it's… complicated?"
//              Pisces sniffles by the tissues.
//   6.8        beat cut → THE STARS: "“not right now, and I'm *happy*” is enough." / "then ask them *something* back."
//              An answer card pops up next to Aries: "not right now, | and I'm happy."
//   13.6       Aries: "nope! and I love my year. you?"  Taurus lights up: "I learned SOURDOUGH!!" (hearts). Meter fills.
//   17.4       "Aries: *thriving.*"  Last line: "No footnotes *required.*"
import { makeSingle, room, stringLights, mug, note, shadow, hearts, sparkles, pop01, outK, prog, lerp, ease, T, GOLD } from '../singlekit.js'

const PARTY = (x, t, lights = 1) => {
  room(x, t, { wall: '#2c1f4e', wall2: '#271b47', floor: '#3b2948', win: { x: 640, y: 470, w: 280, h: 300 } })
  stringLights(x, t, -20, 440, 560, 470, { n: 9, sag: 60, on: lights })
  stringLights(x, t, 520, 470, 1100, 440, { n: 9, sag: 60, on: lights })
}

function s1(x, t, S) {
  const { u, hero, star } = S
  PARTY(x, t)
  shadow(x, 330, 1420, 270); shadow(x, 790, 1420, 240)
  // Taurus leans in, curious
  star(x, t, 'taurus', { x: 790, y: 1200, s: 260, mood: u < 3.7 ? 'sparkle' : 'happy', look: [-1, -0.2], hops: [1.0, 1.4, 1.9], seed: 8 })
  // Aries: mid-sip at frame 0, then the question lands
  const flust = u > 3.7
  hero(x, t, { x: 330, y: 1190, s: 310, mood: u < 0.9 ? 'happy' : flust ? 'wide' : 'neutral', look: flust ? [0.6, 1] : [1, -0.2], hops: [3.75, 4.05, 4.35], squash: flust ? 0.05 * Math.sin(t * 30) * (u < 4.6 ? 1 : 0) : 0, blink: flust ? false : undefined })
  const sip = 1 - ease.inOutCubic(prog(u, 0.6, 1.1))
  mug(x, t, lerp(490, 410, sip), lerp(1270, 1180, sip), { s: 1.05 })
  // a sweat drop on the fluster
  if (flust && u < 6.6) { const p = (u - 3.7) % 1.2 / 1.2; x.fillStyle = '#1b1236'; x.fillRect(176, 1030 + p * 40, 16, 22); x.fillStyle = '#8fe3ff'; x.fillRect(179, 1033 + p * 40, 10, 16) }
}
function s2(x, t, S) {
  const { u, hero } = S
  PARTY(x, t, 0.4)
  x.fillStyle = 'rgba(5,4,12,0.45)'; x.fillRect(0, 420, 1080, 1500)
  shadow(x, 240, 1300, 180)
  hero(x, t, { x: 240, y: 1180, s: 190, mood: u > 4.2 ? 'happy' : 'neutral', look: [1, -1], hops: [T.A + 0.4, T.B + 1.8] })
  mug(x, t, 350, 1240, { s: 0.8 })
  note(x, 790, 1150, 'not right now,|and I’m happy.', { w: 380, h: 150, col: '#ffe27a', rot: 0.05, size: 34, k: pop01(t, T.A + 1.4, 0.3, 2.4) })
  sparkles(x, t, 790, 1150, T.A + 1.45, 8, 170, 1)
  note(x, 800, 1310, '+ ask them back', { w: 300, h: 70, col: '#9fe6b0', rot: -0.04, size: 30, k: pop01(t, T.B + 1.2, 0.3, 2.4) })
}
function s3(x, t, S) {
  const { u, hero, star } = S
  PARTY(x, t)
  shadow(x, 330, 1420, 270); shadow(x, 790, 1420, 240)
  const tl = u > 2.1
  star(x, t, 'taurus', { x: 790, y: 1200, s: 260, mood: tl ? 'heart' : 'sparkle', look: [-1, -0.2], hops: [2.1, 2.4, 2.7, 3.0].map(v => S.t0 + v), seed: 8 })
  hero(x, t, { x: 330, y: 1190, s: 310, mood: tl ? 'happy' : 'sparkle', look: [1, -0.2], hops: [0.3, 0.6, 0.9, 1.2].map(v => S.t0 + v) })
  mug(x, t, 490, 1270, { s: 1.1 })
  // Taurus' sourdough loaf
  const lk = pop01(t, S.t0 + 2.1, 0.3, 2.6)
  if (lk > 0.01) { x.save(); x.translate(900, 990); x.scale(lk, lk); x.fillStyle = '#1b1236'; x.beginPath(); x.ellipse(0, 0, 84, 54, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d9a35c'; x.beginPath(); x.ellipse(0, 0, 76, 46, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f2d39a'; x.fillRect(-40, -14, 80, 8); x.fillRect(-26, 4, 52, 8); x.restore() }
  hearts(x, t, S.t0 + 2.2, 790, 1020, { n: 5 })
}
function fin(x, t, S) {
  const { hero, ok, u } = S
  shadow(x, 540, 1150, 260 * ok)
  hero(x, t, { x: 540, y: 960, s: 300, pop: ok, mood: u > 1.6 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5] })
  mug(x, t, 720, 1060, { s: 1.1 * ok })
}

const EP = makeSingle({
  id: 'nste01', sign: 'aries', name: 'Aries',
  hook: '“So… | *seeing anyone?*”',
  h1: 'The *easy* answer:', h2: 'Say it. *Then* ask back.',
  lines: ['“not right now, and I’m *happy*” is enough.', 'then ask them *something* back.'],
  last: 'No footnotes *required.*',
  bubbles: [
    { t0: 1.0, t1: 3.6, x: 760, y: 900, text: 'it’s been a year! anyone special?', size: 38, tail: 0.3 },
    { t0: 3.75, t1: 6.6, x: 340, y: 900, text: 'uh… it’s… complicated?', size: 40, tail: -0.2 },
    { t0: 13.85, t1: 15.75, x: 420, y: 900, text: 'nope! and I love my year. you?', size: 36, tail: -0.3, col: '#ffe2c4' },
    { t0: 15.8, t1: 17.3, x: 720, y: 880, text: 'I learned SOURDOUGH!!', size: 40, tail: 0.3 },
  ],
  pis1: { x: 950, y: 1560, s: 140 }, pis3: { x: 960, y: 1600, s: 120 },
  s1, s2, s3, fin,
  cues: [['pop', 0.7, 659.25, 0.03, -0.3], ['tick', 1.15, 0.04], ['pluck', 3.8, 392, 0.03, 0.4, -0.3], ['pop', 15.9, 1318.51, 0.04, 0.4], ['glitter', 15.9, 16.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [outK, GOLD]
