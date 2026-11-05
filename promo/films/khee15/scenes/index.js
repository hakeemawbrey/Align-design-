// khee15: HEALING ERA, Ep 15 "The first good morning" (22 s vertical, Month 2 boost m15, star_advice post, pop · G).
// Engine: ../../khee01/healkit.js (sets: ../../khee01/healset.js). Rows: promo/films/month2/m15.md. Loop ending.
//   0.0    frame 0: Leo bolting upright in bed mid-gasp, eyes wide, sunlight blasting through the window. DAY 30.
//          Hook: "Day 30. Woke up. Didn't *think* of them."
//   0.6    whip zoom; the kit's achievement pops: "first thought was *coffee.*"  Leo pats itself down for feelings:
//          "wait. am i… okay?"  Pisces cries happy tears at the sunrise.
//   6.4    THE STARS: "this is what healing *feels* like." / "not a parade. just a *quiet yes.*"
//   13.9   Leo makes coffee and calls Aries: "brunch? my treat." The calendar tears to DAY 31.
//   19.1   Last line: "Good morning, *you.*"  The last 0.42 s eases back into frame 0.
import { makeHeal, lerp, prog, ease, shadow, pop01, R, INK } from '../../khee01/healkit.js'
import { bedroom, blanket, bigCal } from '../../khee01/healset.js'
import { mug } from '../../nste01/singlekit.js'
import { achievement, achievementCues } from '../../hookkit.js'

const FLOOR = 1420, fy = s => FLOOR - 0.44 * s
const ACH = { at: 1.2, out: [3.9, 4.15], text: 'first thought was *coffee.*', y: 1560 }

function s1(x, t, S) {
  const { u, hero } = S
  bedroom(x, t, { morning: 1 })
  bigCal(x, t, 880, 900, { day: 30, s: 0.55, rot: 0.05 })
  // bolt upright: frame 0 mid-rise
  const up = ease.outBack ? ease.outCubic(prog(u, -0.3, 0.35)) : 1
  const pat = u > 4.0 && u < 6.2
  hero(x, t, { x: 540, y: lerp(1230, 1110, up), s: 300, mood: u < 2.2 ? 'wide' : pat ? 'squint' : 'sparkle', look: pat ? [Math.sin(u * 8) > 0 ? 1 : -1, 1] : [0, -0.3], blink: false, squash: u < 0.35 ? -0.12 : pat ? 0.05 * Math.sin(u * 20) : 0 })
  blanket(x, 600, 1290, 700, 150, { col: '#ff8fb1', col2: '#ffb3cb' })
  // gasp lines
  if (u < 1.2) for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i - 2) * 0.4; R(x, INK, 540 + Math.cos(a) * 220 - 6, 1000 + Math.sin(a) * 200 - 20, 12, 40) }
}
function s2(x, t, S) {
  const { u, hero } = S
  bedroom(x, t, { morning: 1, dim: 0.45 })
  hero(x, t, { x: 540, y: 1110, s: 260, mood: u > 4 ? 'happy' : 'sparkle', look: [0, -1] })
  blanket(x, 600, 1290, 700, 150, { col: '#ff8fb1', col2: '#ffb3cb' })
}
function s3(x, t, S) {
  const { u, hero } = S
  bedroom(x, t, { morning: 1 })
  shadow(x, 420, FLOOR + 4, 280)
  hero(x, t, { x: 420, y: fy(280), s: 280, mood: u < 1.5 ? 'sparkle' : 'happy', look: [1, -0.3], hops: [S.t0 + 0.4, S.t0 + 1.6, S.t0 + 2.0] })
  mug(x, t, 600, 1360, { s: 1.1, col: '#f2c75c' })
  if (u > 1.4 && u < 3.6) { R(x, INK, 300, 1180, 40, 74); R(x, '#5fa8ff', 305, 1186, 30, 60) }
}
function fin(x, t, S) {
  const { u, hero } = S
  bedroom(x, t, { morning: 1, dim: 0.25 })
  shadow(x, 520, 1290, 290)
  hero(x, t, { x: 520, y: 1160, s: 300, mood: u > 1 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.T.lastAt + 0.05] })
  mug(x, t, 720, 1270, { s: 1.1, col: '#f2c75c' })
}

const EP = makeHeal({
  id: 'khee15', sign: 'leo', name: 'Leo', len: 22, ending: 'loop', accent: '#ff8fb1',
  hook: 'Day 30. Woke up. | Didn’t *think* of them.',
  brk: { kind: 'whip', at: 0.6, x: 540, y: 1050 },
  whip: { x: 540, y: 1050 },
  kit: [achievement(ACH)], kitCues: achievementCues(ACH),
  h1: 'Notice the *quiet.*', h2: 'Make *plans.*',
  lines: ['this is what healing *feels* like.', 'not a parade. just a *quiet yes.*'],
  last: 'Good morning, | *you.*', day: 30, dayTo: 31,
  bubbles: [
    { t0: 4.2, t1: 6.2, x: 540, y: 860, text: 'wait. am i… okay?', size: 42, tail: 0 },
    { t0: 15.4, t1: 17.4, x: 420, y: 940, text: 'brunch? my treat.', size: 40, tail: -0.1 },
  ],
  pis1: { x: 900, y: 1330, s: 150, mood: 'sparkle', look: [-1, -1] }, pis3: { x: 920, y: 1352, s: 150, mood: 'sparkle', look: [-1, -1] },
  s1, s2, s3, fin,
  cues: [['whoosh', 0.0, 0.35, 0.05], ['pop', 0.15, 1318.51, 0.05, 0], ...Array.from({ length: 6 }, (_, i) => ['tick', 4.1 + i * 0.3, 0.03]), ['pop', 14.3, 1046.5, 0.04, 0.2], ['pour', 0, 0].slice(0, 0), ['bell', 15.3, 1318.51, 0.03, 0.8, -0.2]].filter(c => c.length),
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
