// khee12: HEALING ERA, Ep 12 "Crying at everything" (22 s vertical, Month 2 boost m15, star_advice post, dreamy · E).
// Engine: ../../khee01/healkit.js (sets: ../../khee01/healset.js). Rows: promo/films/month2/m15.md. Loop ending.
// Pisces is the lead (cfg.pisces): it cries all the way through, sad tears then happy ones.
//   0.0    frame 0: Pisces mid-sob on the kitchen floor, hugging a tiny dog plush, tears arcing out like fountains. DAY 3.
//          Hook: "Day 3. Cried at a *dog.* Twice."
//   0.6    record scratch + freeze: "it was a *drawing* of a dog."  A counter: CRIES TODAY 7… 8… 9 as Pisces cries at
//          a toast with a face, a cloud in the window, its own reflection in the oven door.
//   6.4    THE STARS: "tears are your heart *doing the work.*" / "drink water. eat something. then *sleep.*"
//   13.9   Pisces drinks a big glass of water, eats the toast, sleeps; sunrise. The calendar tears to DAY 9: happy tears.
//   19.1   Last line: "Cry it out. Then *rest.*"  The last 0.42 s eases back into frame 0.
import { makeHeal, lerp, prog, ease, shadow, pop01, R, INK, BONE, label, GOLD, drawStarChar } from '../../khee01/healkit.js'
import { kitchen, drawBits } from '../../khee01/healset.js'

const FLOOR = 1420, fy = s => FLOOR - 0.44 * s
const DOG = ['E..E.', 'EEEE.', 'EWEWB', 'EEEEN', '.EEE.', '.E.E.']
function dog(x, cx, cy, s = 1) { drawBits(x, DOG, { E: '#c99a5c', W: '#1b1236', B: '#1b1236', N: '#1b1236' }, cx, cy, 14 * s) }
function toast(x, cx, cy, k = 1) { if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(k, k); R(x, INK, -50, -50, 100, 96); R(x, '#e0a85a', -46, -46, 92, 88); R(x, '#f4d090', -36, -36, 72, 70); R(x, INK, -20, -14, 10, 10); R(x, INK, 12, -14, 10, 10); R(x, INK, -14, 10, 30, 8); x.restore() }
function glass(x, cx, cy, fillK = 1, tip = 0) { x.save(); x.translate(cx, cy); x.rotate(tip); R(x, INK, -34, -110, 68, 116); R(x, 'rgba(200,236,255,0.5)', -28, -104, 56, 104); R(x, '#7fd0ff', -28, -104 + 104 * (1 - fillK), 56, 104 * fillK); x.restore() }
function cloud(x, cx, cy, k) { if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(k, k); R(x, INK, -70, -20, 140, 50); R(x, BONE, -66, -16, 132, 42); R(x, INK, -36, -46, 70, 40); R(x, BONE, -32, -42, 62, 36); x.restore() }

function s1(x, t, S) {
  const { u, crier } = S
  kitchen(x, t, { cal: { day: 3 }, stoveClock: '3:33' })
  cloud(x, 700, 700, pop01(t, S.t0 + 3.4, 0.3, 2.4))
  toast(x, 560, 1020, pop01(t, S.t0 + 2.2, 0.3, 2.4))
  // its reflection in the oven door (a faint mirrored Pisces) from 4.6
  const rk = pop01(t, S.t0 + 4.6, 0.3, 2)
  if (rk > 0.01) { x.save(); x.globalAlpha = 0.35 * rk; drawStarChar(x, 800, 1270, 150, t, { color: '#7c74f0', mood: 'wide', look: [-1, 0], seed: 9, glow: 0 }); x.restore() }
  shadow(x, 380, FLOOR + 4, 300)
  const look = u < 2.2 ? [0, 0.5] : u < 3.4 ? [1, -0.6] : u < 4.6 ? [1, -1] : [1, 0]
  crier(x, t, 'pisces', { x: 380, y: fy(300), s: 300, mood: 'wide', look, squash: 0.05 * Math.sin(t * 14), seed: 3 }, 3)
  dog(x, 500, 1385, 0.8)
}
function s2(x, t, S) {
  const { u, crier } = S
  kitchen(x, t, { cal: { day: 3 }, stoveClock: '3:40', dim: 0.5 })
  shadow(x, 540, 1300, 260)
  crier(x, t, 'pisces', { x: 540, y: 1185, s: 260, mood: u > 4 ? 'sparkle' : 'wide', look: [0, -1], seed: 3 }, u > 4 ? 1 : 2)
  dog(x, 660, 1270, 0.7)
}
function s3(x, t, S) {
  const { u, crier } = S
  const sun = prog(u, 2.6, 3.8)
  kitchen(x, t, { cal: { day: 9 }, stoveClock: u < 2.6 ? '3:45' : '7:10', morning: 0.75 * sun, dim: lerp(0.15, 0, sun) })
  shadow(x, 400, FLOOR + 4, 290)
  const asleep = u > 1.9 && u < 3.6
  crier(x, t, 'pisces', { x: 400, y: fy(290) + (asleep ? 14 : 0), s: 290, mood: asleep ? 'sleepy' : u > 3.6 ? 'happy' : 'neutral', look: [1, 0], squash: asleep ? 0.12 : 0, seed: 3, hops: [S.t0 + 3.7, S.t0 + 4.1] }, asleep ? 0 : u > 3.6 ? 3 : 1)
  if (u < 1.9) { glass(x, 580, 1300, 1 - prog(u, 0.2, 1.0), -0.5 * Math.sin(Math.PI * prog(u, 0.1, 1.1))); toast(x, 700, 1350, 1 - prog(u, 1.2, 1.8)) }
  dog(x, 530, 1390, 0.8)
}
function fin(x, t, S) {
  const { u, crier } = S
  kitchen(x, t, { cal: { day: 9 }, stoveClock: '7:15', morning: 0.75, dim: 0.25 })
  shadow(x, 540, 1290, 300)
  crier(x, t, 'pisces', { x: 540, y: 1160, s: 310, mood: 'happy', look: [0, 0], seed: 3, hops: [S.t0 + 0.1, S.T.lastAt + 0.05] }, 3)
  dog(x, 680, 1270, 0.8)
}
function top(x, t) {
  // CRIES TODAY counter (scene 1)
  if (t < 2.0 || t > 6.3) return
  const n = t < 2.2 ? 7 : t < 3.4 ? 8 : t < 4.6 ? 9 : 10
  const k = pop01(t, 2.0, 0.3, 2.2)
  x.save(); x.translate(780, 740); x.scale(k, k); x.rotate(0.04)
  R(x, INK, -170, -46, 340, 92); R(x, '#1e1844', -164, -40, 328, 80)
  label(x, 'CRIES TODAY:', -40, 2, { size: 30, col: BONE })
  const pk = pop01(t, [2.2, 3.4, 4.6].filter(v => v <= t).pop() ?? 2.0, 0.25, 3)
  x.save(); x.translate(120, 2); x.scale(pk, pk); label(x, String(n), 0, 0, { size: 52, col: GOLD }); x.restore()
  x.restore()
}

const EP = makeHeal({
  id: 'khee12', sign: 'pisces', name: 'Pisces', len: 22, ending: 'loop', pisces: true,
  hook: 'Day 3. Cried at | a *dog.* Twice.',
  brk: { kind: 'scratch', at: 0.6, len: 1.3, text: 'it was a *drawing* of a dog.' },
  whip: { x: 420, y: 1150 },
  h1: 'Crying *is* healing.', h2: 'Water. Toast. *Sleep.*',
  lines: ['tears are your heart *doing the work.*', 'drink water. eat something. then *sleep.*'],
  last: 'Cry it out. | Then *rest.*', day: 3, dayTo: 9,
  bubbles: [
    { t0: 2.25, t1: 3.3, x: 470, y: 1060, text: 'he’s SMILING', size: 40, tail: 0.1 },
    { t0: 3.45, t1: 4.5, x: 520, y: 1060, text: 'the cloud is a BUNNY', size: 38, tail: 0.3 },
    { t0: 4.65, t1: 6.2, x: 520, y: 1060, text: 'i look so SAD', size: 40, tail: 0.2 },
  ],
  s1, s2, s3, fin, top,
  cues: [['pop', 2.2, 1046.5, 0.04, 0.2], ['pop', 3.4, 1174.66, 0.04, 0.3], ['pop', 4.6, 1318.51, 0.04, 0.2], ...Array.from({ length: 6 }, (_, i) => ['pluck', 14.1 + i * 0.15, 784 + i * 60, 0.015, 0.2, 0.2]), ['pop', 15.2, 523.25, 0.04, 0.3], ['pop', 15.5, 523.25, 0.04, 0.3], ['bell', 17.6, 1567.98, 0.03, 1.4, 0], ['glitter', 17.6, 18.1]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void ease
