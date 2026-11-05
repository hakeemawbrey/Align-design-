// khee14: HEALING ERA, Ep 14 "The bad day on day 23" (24 s vertical, Month 2 boost m15, star_advice post, lofi · Gm).
// Engine: ../../khee01/healkit.js (sets: ../../khee01/healset.js). Rows: promo/films/month2/m15.md. Hard cut.
//   0.0    frame 0: Virgo frozen in a corner-shop aisle, music notes drifting out of the ceiling speaker, the basket
//          mid-drop with oranges flying, a DAY calendar tearing BACKWARDS from 23 toward 1.
//          Hook: "Day 23. One song. *Back to day 1.*"
//   0.6    record scratch + freeze: "it was *their* song."  Virgo sits down on the shop floor; Libra, shopping too, sits
//          down next to it: "same. this one gets me too."  Pisces cries at the song in the next aisle.
//   6.4    THE STARS: "a bad day isn't *starting over.*" / "healing goes up and down. you still *grew.*"
//   15.0   The calendar tears forward again, all the way back up to DAY 23. They pick the oranges up and buy them.
//   21.7   Last line: "Bad days still count *forward.*"  (accent lands at 23.05, holds to the last frame)
import { makeHeal, lerp, prog, ease, shadow, pop01, R, INK, BONE, GOLD } from '../../khee01/healkit.js'
import { shopAisle, bigCal, drawBits } from '../../khee01/healset.js'

const FLOOR = 1420, fy = s => FLOOR - 0.44 * s
const NOTE = ['..XX', '..X.', '..X.', 'XXX.', 'XX..']
function notes(x, t, cx, cy, k = 1) { for (let i = 0; i < 4; i++) { const p = ((t * 0.5 + i / 4) % 1); drawBits(x, NOTE, { X: i % 2 ? '#ff8fb1' : GOLD }, cx + Math.sin(t * 2 + i * 2) * 120 + (i - 1.5) * 60, cy + p * 380, 10, { alpha: k * Math.sin(Math.PI * p) }) } }
function orange(x, cx, cy, s = 1) { R(x, INK, cx - 22 * s, cy - 22 * s, 44 * s, 44 * s); R(x, '#f39a3a', cx - 18 * s, cy - 18 * s, 36 * s, 36 * s); R(x, '#ffc27a', cx - 12 * s, cy - 12 * s, 10 * s, 10 * s); R(x, '#3fae5a', cx - 4 * s, cy - 28 * s, 10 * s, 10 * s) }
function basket(x, cx, cy, n = 4, rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); R(x, INK, -80, -60, 160, 80); R(x, '#e8344e', -74, -54, 148, 68); R(x, INK, -60, -100, 12, 44); R(x, INK, 48, -100, 12, 44); R(x, INK, -60, -104, 120, 12); for (let i = 0; i < n; i++) orange(x, -48 + i * 32, -60, 0.9); x.restore() }

function s1(x, t, S) {
  const { u, hero, star, crier } = S
  shopAisle(x, t)
  notes(x, t, 540, 420, 1)
  bigCal(x, t, 820, 820, { day: 23, flips: [{ at: -0.35, to: 1, dur: 1.0 }], s: 0.8, rot: 0.06 })
  // Pisces in the next aisle, peeking past the shelf, crying at the song
  crier(x, t, 'pisces', { x: 980, y: 1080, s: 150, mood: 'wide', look: [-1, -1] }, 2)
  const sit = ease.inOutCubic(prog(u, 2.1, 2.6))
  shadow(x, 420, FLOOR + 4, 290)
  hero(x, t, { x: 420, y: lerp(fy(290) - 20, fy(290) + 24, sit), s: 290, mood: u < 2.1 ? 'wide' : 'neutral', look: u < 2.1 ? [0, -1] : [0, 0.5], blink: u < 2.1 ? false : undefined, squash: 0.18 * sit })
  // the basket mid-drop, oranges flying, then rolling on the floor
  const dp = prog(u, -0.4, 0.4)
  basket(x, 600, lerp(1200, 1400, ease.inQuad(dp)), dp < 1 ? 2 : 0, dp * 0.6)
  for (let i = 0; i < 4; i++) { const tt = u + 0.4, px = 600 + (i - 1.5) * 60 + Math.min(tt, 1.6) * (i - 1.5) * 90, py = Math.min(FLOOR - 20, 1160 - 260 * tt + 900 * tt * tt); orange(x, px, py, 1) }
  const lk = pop01(t, S.t0 + 3.2, 0.35, 2.2)
  if (lk > 0.01) { const ls = ease.inOutCubic(prog(u, 3.7, 4.2)); shadow(x, 760, FLOOR + 4, 240); star(x, t, 'libra', { x: 760, y: lerp(fy(240), fy(240) + 20, ls), s: 240, pop: lk, mood: 'sparkle', look: [-1, 0], seed: 17, squash: 0.15 * ls }) }
}
function s2(x, t, S) {
  const { u, hero, star } = S
  shopAisle(x, t, { dim: 0.5 })
  shadow(x, 460, 1300, 250); shadow(x, 690, 1300, 210)
  hero(x, t, { x: 460, y: 1200, s: 250, mood: u > 4 ? 'sparkle' : 'neutral', look: [0, -1], squash: 0.15 })
  star(x, t, 'libra', { x: 690, y: 1215, s: 210, mood: 'happy', look: [-1, -0.5], seed: 17, squash: 0.15 })
}
function s3(x, t, S) {
  const { u, hero, star } = S
  shopAisle(x, t)
  const up = ease.inOutCubic(prog(u, 1.3, 2.0))
  shadow(x, 420, FLOOR + 4, 280); shadow(x, 700, FLOOR + 4, 230)
  hero(x, t, { x: 420, y: lerp(fy(280) + 22, fy(280), up), s: 280, mood: u < 1.3 ? 'neutral' : 'happy', look: [1, 0], squash: 0.15 * (1 - up), hops: [S.t0 + 1.4, S.t0 + 3.0] })
  star(x, t, 'libra', { x: 700, y: lerp(fy(230) + 20, fy(230), up), s: 230, mood: 'happy', look: [-1, 0], seed: 17, squash: 0.15 * (1 - up), hops: [S.t0 + 1.5] })
  // oranges gathered back into the basket
  const g = prog(u, 2.0, 3.2)
  basket(x, 560, 1400, Math.round(4 * g), 0)
  for (let i = Math.round(4 * g); i < 4; i++) orange(x, 470 + i * 90, FLOOR - 20, 1)
}
function fin(x, t, S) {
  const { u, hero, star } = S
  shopAisle(x, t, { dim: 0.3 })
  shadow(x, 420, 1290, 280); shadow(x, 690, 1300, 230)
  hero(x, t, { x: 420, y: 1160, s: 290, mood: u > 1 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.T.lastAt + 0.05] })
  star(x, t, 'libra', { x: 690, y: 1190, s: 230, mood: 'happy', look: [-1, 0], seed: 17 })
  basket(x, 560, 1330, 4, 0)
}

const EP = makeHeal({
  id: 'khee14', sign: 'virgo', name: 'Virgo', len: 24, ending: 'cut', accent: '#ffb3cb',
  hook: 'Day 23. One song. | *Back to day 1.*',
  brk: { kind: 'scratch', at: 0.6, len: 1.3, text: 'it was *their* song.' },
  whip: { x: 460, y: 1150 },
  h1: 'You didn’t *lose* 22 days.', h2: 'Count *forward.*',
  lines: ['a bad day isn’t *starting over.*', 'healing goes up and down. you still *grew.*'],
  last: 'Bad days still | count *forward.*', day: 1, dayTo: 23,
  bubbles: [
    { t0: 3.9, t1: 6.2, x: 700, y: 960, text: 'same. this one gets me too.', size: 36, tail: 0.2 },
    { t0: 18.4, t1: 20.6, x: 560, y: 930, text: 'oranges, then home?', size: 40, tail: 0 },
  ],
  pis1: null, pis3: { x: 940, y: 1352, s: 150 },
  s1, s2, s3, fin,
  cues: [['pluck', 0.05, 784, 0.03, 0.8, 0], ['pluck', 0.35, 659.25, 0.03, 0.8, 0], ['pop', 0.35, 262, 0.05, 0.2], ['pop', 0.5, 330, 0.04, -0.2], ...Array.from({ length: 6 }, (_, i) => ['tick', -0.3 + 0.15 * i + 0.4, 0.03]).filter(c => c[1] >= 0), ['pop', 2.2, 220, 0.04, 0], ['pop', 3.3, 880, 0.04, 0.3], ['pop', 16.4, 1046.5, 0.04, 0], ...Array.from({ length: 4 }, (_, i) => ['pop', 17.0 + i * 0.3, 659.25 + i * 80, 0.03, 0])],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void BONE
