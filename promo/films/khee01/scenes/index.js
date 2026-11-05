// khee01: HEALING ERA, Ep 1 "Day 1: “I'm fine”" (22 s vertical, Month 2 boost m15, star_advice post, lofi · Am).
// Engine: ../healkit.js (sets: ../healset.js). Rows: promo/films/month2/m15.md. No end card; hard cut on the last line.
//   0.0    frame 0: Aries mid-slide down the fridge door onto the kitchen floor, the cereal box tipping, cereal flying,
//          DAY 1 on the wall. Hook: "Day 1. I'm *totally* fine."
//   0.6    record scratch + freeze: "narrator: they were not fine."  Then Aries does furious floor push-ups ("i'm GREAT.").
//          Pisces sniffles behind the cereal.
//   6.4    THE STARS: "you don't have to be fine on *day 1.*" / "feel it. it means it *mattered.*"  Aries lets one tear go.
//   13.85  Aries calls a friend: "can you come sit with me?"  Leo arrives, they sit on the floor; Aries dozes on Leo's
//          shoulder. The calendar tears to DAY 2.
//   19.7   Last line: "Fine can *wait.*"  (lands at 21.05, holds to the last frame; Pisces happy-cries)
import { makeHeal, lerp, prog, ease, shadow, pop01, outK, R, INK } from '../healkit.js'
import { kitchen, cereal, flyingBits } from '../healset.js'

const CAL = { day: 1 }
const FLOOR = 1420, fy = s => FLOOR - 0.44 * s

function s1(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: CAL, stoveClock: '11:48', mess: 0.4 })
  shadow(x, 300, FLOOR + 4, 280)
  // the slide down the fridge: frame 0 is mid-slide, landing at 0.4
  const slide = ease.inQuad(prog(u, -0.45, 0.4))
  const pushing = u > 1.6 && u < 6.2
  const pu = pushing ? Math.max(0, Math.sin((u - 1.6) * 7)) : 0
  hero(x, t, {
    x: 300, y: lerp(1010, fy(300), slide), s: 300,
    mood: u < 0.5 ? 'wide' : pushing ? (pu > 0.5 ? 'squint' : 'happy') : 'neutral', look: u < 0.5 ? [1, -1] : [1, 0],
    squash: u < 0.4 ? -0.12 : u < 0.6 ? 0.16 * (1 - prog(u, 0.4, 0.6)) : pushing ? 0.2 * pu : 0, blink: u < 0.6 ? false : undefined,
  })
  // the cereal box tips over, cereal flies
  const tip = ease.outCubic(prog(u, -0.3, 0.6))
  cereal(x, 560, 1340, { rot: lerp(0.4, 1.45, tip), s: 0.9 })
  flyingBits(x, t, -0.3, 600, 1290, { n: 12, life: 1.4 })
  for (let i = 0; i < 7; i++) { const px = 620 + i * 46, py = 1450 + (i * 37) % 70; R(x, INK, px - 3, py - 3, 20, 20); R(x, '#f6d48a', px, py, 14, 14) }
  // sweat drops during the push-ups
  if (pushing) { const p = ((u - 1.6) % 0.9) / 0.9; R(x, INK, 420, 1150 + p * 60, 18, 24); R(x, '#8fe3ff', 423, 1153 + p * 60, 12, 18) }
}
function s2(x, t, S) {
  const { u, hero, crier } = S
  kitchen(x, t, { cal: CAL, stoveClock: '11:52', dim: 0.5, mess: 0.4 })
  shadow(x, 540, 1300, 260)
  const tear = u > 3.6
  if (tear) crier(x, t, 'aries', { x: 540, y: 1185, s: 260, mood: 'sparkle', look: [0, -0.6], squash: 0.08, seed: 3 }, 1)
  else hero(x, t, { x: 540, y: 1185, s: 260, mood: 'neutral', look: [0, -1], squash: 0.08 })
  void u
}
function s3(x, t, S) {
  const { u, hero, star } = S
  kitchen(x, t, { cal: { day: 2 }, stoveClock: u < 2.4 ? '11:58' : '9:10', mess: 0.2, morning: lerp(0, 0.55, prog(u, 2.2, 3.4)) })
  shadow(x, 330, FLOOR + 4, 260); shadow(x, 610, FLOOR + 4, 240)
  const leo = pop01(t, S.t0 + 2.3, 0.35, 2.2)
  const asleep = u > 3.2
  hero(x, t, { x: asleep ? 420 : 330, y: fy(260) + (asleep ? 10 : 0), s: 260, mood: asleep ? 'sleepy' : u < 2.3 ? 'neutral' : 'sparkle', look: [1, -0.4], squash: asleep ? 0.1 : 0, hops: [S.t0 + 0.3, S.t0 + 0.8] })
  if (leo > 0.01) star(x, t, 'leo', { x: 640, y: fy(250), s: 250, pop: leo, mood: 'happy', look: [-1, 0], seed: 9, hops: [S.t0 + 2.4] })
  // the phone at Aries' ear
  if (u < 2.3) { R(x, INK, 412, 1110, 40, 74); R(x, '#5fa8ff', 417, 1116, 30, 60) }
}
function fin(x, t, S) {
  const { hero, star, u } = S
  kitchen(x, t, { cal: { day: 2 }, stoveClock: '9:12', morning: 0.6, dim: 0.35 })
  shadow(x, 400, 1290, 280); shadow(x, 680, 1300, 230)
  hero(x, t, { x: 400, y: 1160, s: 300, mood: u > 1.2 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.T.lastAt + 0.05] })
  star(x, t, 'leo', { x: 680, y: 1190, s: 230, mood: 'happy', look: [-1, 0], seed: 9 })
}

const EP = makeHeal({
  id: 'khee01', sign: 'aries', name: 'Aries', len: 22, ending: 'cut',
  hook: 'Day 1. | I’m *totally* fine.',
  brk: { kind: 'scratch', at: 0.6, len: 1.3, text: 'narrator: they were *not* fine.' },
  whip: { x: 330, y: 1220 },
  h1: 'Day 1 *isn’t* a test.', h2: 'Let *someone* sit with you.',
  lines: ['you don’t have to be fine on *day 1.*', 'feel it. it means it *mattered.*'],
  last: 'Fine can *wait.*', day: 1, dayTo: 2,
  bubbles: [
    { t0: 1.9, t1: 3.9, x: 420, y: 960, text: 'i’m GREAT.', size: 44, tail: -0.4 },
    { t0: 4.0, t1: 6.2, x: 460, y: 960, text: 'push-up 40! not sad! 41!', size: 38, tail: -0.5 },
    { t0: 14.15, t1: 16.0, x: 470, y: 930, text: 'can you come sit with me?', size: 38, tail: -0.4 },
    { t0: 16.25, t1: 18.2, x: 680, y: 900, text: 'already on the floor.', size: 38, tail: 0.1, col: '#ffe2c4' },
  ],
  pis1: { x: 905, y: 1345, s: 170 }, pis3: { x: 930, y: 1352, s: 150 },
  s1, s2, s3, fin,
  cues: [['whoosh', 0.02, 0.4, 0.04], ['pop', 0.42, 330, 0.05, -0.3], ['tick', 0.45, 0.06], ...[2.1, 2.55, 3.0, 3.45, 3.9, 4.35, 4.8, 5.25, 5.7].map(t => ['tick', t, 0.03]), ['pluck', 10.4, 659.25, 0.03, 0.6, 0], ['bell', 16.1, 1318.51, 0.03, 0.8, 0.3], ['pop', 16.2, 880, 0.04, 0.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void outK
