// khee13: HEALING ERA, Ep 13 "The emergency floor visit" (26 s vertical, Month 2 boost m15, star_advice post, jazzy · F).
// Engine: ../../khee01/healkit.js (sets: ../../khee01/healset.js). Rows: promo/films/month2/m15.md. Hard cut.
//   0.0    frame 0: Gemini face-down on the kitchen floor, the doorbell mid-ring (ring lines), the door already flying
//          open. DAY 10. Hook: "Day 10. The friends *broke in.* Lovingly."
//   0.35   screen shake; 0.8 record scratch + freeze: "they had the *spare key.*"  Taurus (soup), Virgo (a blanket),
//          Aries (snacks) and Pisces (already crying) pile in, don't fix anything, and all lie down on the floor too.
//   6.4    THE STARS: "you don't need a speech. you need *company.*" / "let them in. even if it's *messy.*"
//   16.1   A talk card on the fridge flips: "What do you need this week?"  Gemini: "this. exactly this."
//          The calendar tears to DAY 11.
//   23.7   Last line: "Let them sit on the *floor.*"  (accent lands at 25.05, holds to the last frame)
import { makeHeal, lerp, prog, ease, shadow, pop01, R, INK, BONE, GOLD } from '../../khee01/healkit.js'
import { kitchen, blanket, talkCard } from '../../khee01/healset.js'
import { box, mug } from '../../nste01/singlekit.js'

const FLOOR = 1420, fy = s => FLOOR - 0.44 * s
function door(x, t, open) {
  // the door on the right, swinging open toward us (hinge on the right edge)
  x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = `rgba(255,214,150,${0.35 * open})`; x.fillRect(840, 640, 230, 780); x.restore()
  R(x, INK, 826, 626, 14, 800)
  const w = 230 * (1 - 0.8 * open)
  box(x, 1070 - w, 640, w, 774, '#8a5a3a', { b: 7, hi: '#a8704a' })
  R(x, GOLD, 1070 - w + 20, 1030, 16, 16)
}
function ring(x, t, cx, cy, on) { if (!on) return; for (let i = 0; i < 3; i++) { const p = ((t * 3 + i / 3) % 1); x.save(); x.globalAlpha = 1 - p; x.strokeStyle = GOLD; x.lineWidth = 8; x.beginPath(); x.arc(cx, cy, 30 + p * 90, -2.4, -0.7); x.stroke(); x.restore() } }
function snacks(x, cx, cy) { box(x, cx - 50, cy - 70, 100, 70, '#ff9b5c', { b: 5 }); R(x, BONE, cx - 30, cy - 50, 60, 16) }
function friends(x, t, S, lie, a0) {
  const { star, crier } = S
  const L = [['taurus', 610, 230, 7], ['virgo', 735, 220, 11], ['aries', 855, 210, 13]]
  L.forEach(([sg, px, s, sd], i) => {
    const k = pop01(t, a0 + i * 0.18, 0.3, 2.2)
    if (k <= 0.01) return
    const lk = lie(i)
    shadow(x, px, FLOOR + 4, s * k)
    star(x, t, sg, { x: px, y: fy(s) + lk * 34, s, pop: k, mood: lk > 0.5 ? 'happy' : 'sparkle', look: [-1, 0], seed: sd, squash: 0.26 * lk })
  })
  const pk = pop01(t, a0 + 0.6, 0.3, 2.2)
  if (pk > 0.01) { const lk = lie(3); crier(x, t, 'pisces', { x: 200, y: fy(180) + lk * 28, s: 180, pop: pk, mood: 'sparkle', look: [1, 0], squash: 0.24 * lk }, 3) }
}

function s1(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 10 }, stoveClock: '7:00' })
  door(x, t, ease.outBack ? ease.outCubic(prog(u, -0.3, 0.4)) : 1)
  ring(x, t, 900, 760, u < 0.8)
  const lie = i => ease.inOutCubic(prog(u, 3.6 + i * 0.25, 4.1 + i * 0.25))
  shadow(x, 420, FLOOR + 4, 320)
  hero(x, t, { x: 420, y: fy(270) + 40, s: 270, mood: u < 2.4 ? 'squint' : 'wide', look: [0, 1], squash: 0.28, blink: false })
  friends(x, t, S, lie, S.t0 + 2.0)
  if (u > 2.1) { mug(x, t, 680, 1400, { s: 0.8, col: '#e8a04a' }); snacks(x, 960, 1410) }
  if (u > 4.4) blanket(x, 560, 1452, 820, 44, { col: '#5fcf9a', col2: '#7fe0b0' })
}
function s2(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 10 }, stoveClock: '7:20', dim: 0.5 })
  friends(x, t, S, () => 1, -10)
  shadow(x, 420, FLOOR + 4, 300)
  hero(x, t, { x: 420, y: fy(270) + 36, s: 270, mood: u > 5 ? 'happy' : 'sparkle', look: [0, -1], squash: 0.26 })
  blanket(x, 560, 1452, 820, 44, { col: '#5fcf9a', col2: '#7fe0b0' })
}
function s3(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 11 }, stoveClock: u < 2.5 ? '7:40' : '9:00', morning: lerp(0, 0.4, prog(u, 2.5, 3.6)) })
  talkCard(x, 250, 900, { text: 'What do you|need this week?', up: ease.inOutCubic(prog(u, 0.4, 1.0)), s: 0.62, rot: -0.05, k: pop01(t, S.t0 + 0.1, 0.3, 2.2) })
  friends(x, t, S, () => 1, -10)
  shadow(x, 420, FLOOR + 4, 300)
  hero(x, t, { x: 420, y: fy(270) + (u > 1.6 ? 0 : 36), s: 270, mood: u > 1.6 ? 'happy' : 'sparkle', look: [-1, -1], squash: u > 1.6 ? 0 : 0.26, hops: [S.t0 + 1.6, S.t0 + 2.0] })
  blanket(x, 560, 1452, 820, 44, { col: '#5fcf9a', col2: '#7fe0b0' })
}
function fin(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 11 }, stoveClock: '9:05', morning: 0.4, dim: 0.3 })
  talkCard(x, 250, 900, { text: 'What do you|need this week?', up: 1, s: 0.62, rot: -0.05 })
  friends(x, t, S, () => 1, -10)
  shadow(x, 420, FLOOR + 4, 300)
  hero(x, t, { x: 420, y: fy(270) + 36, s: 270, mood: 'happy', look: [0, 0], squash: 0.26, hops: [S.T.lastAt + 0.05] })
  blanket(x, 560, 1452, 820, 44, { col: '#5fcf9a', col2: '#7fe0b0' })
  void u
}

const EP = makeHeal({
  id: 'khee13', sign: 'gemini', name: 'Gemini', len: 26, ending: 'cut',
  hook: 'Day 10. The friends | *broke in.* Lovingly.',
  brk: { kind: 'scratch', at: 0.8, len: 1.2, text: 'they had the *spare key.*', shake: 0.3 },
  whip: { x: 760, y: 1100 },
  h1: 'Let them *see* the floor.', h2: 'Say what you *need.*',
  lines: ['you don’t need a speech. you need *company.*', 'let them in. even if it’s *messy.*'],
  last: 'Let them sit | on the *floor.*', day: 10, dayTo: 11, noFinPisces: true,
  bubbles: [
    { t0: 2.3, t1: 3.6, x: 760, y: 900, text: 'we brought soup.', size: 40, tail: 0.1 },
    { t0: 3.7, t1: 5.0, x: 820, y: 900, text: 'and a blanket.', size: 40, tail: 0.3 },
    { t0: 5.0, t1: 6.2, x: 640, y: 1000, text: 'move over.', size: 40, tail: 0 },
    { t0: 17.9, t1: 20.6, x: 460, y: 950, text: 'this. exactly this.', size: 42, tail: -0.2 },
  ],
  pis1: null, pis3: null,
  s1, s2, s3, fin,
  cues: [['bell', 0.0, 1318.51, 0.05, 0.6, 0.4], ['bell', 0.25, 1046.5, 0.05, 0.6, 0.4], ['whoosh', 0.02, 0.4, 0.05], ['pop', 2.0, 660, 0.04, 0.3], ['pop', 2.18, 784, 0.04, 0.4], ['pop', 2.36, 880, 0.04, 0.5], ['pop', 2.6, 523.25, 0.04, -0.4], ...[3.6, 3.85, 4.1, 4.35].map(t => ['pop', t, 262, 0.04, 0]), ['whoosh', 4.4, 0.4, 0.03], ['tick', 16.5, 0.05], ['whoosh', 16.55, 0.3, 0.03], ['pop', 17.1, 1174.66, 0.04, -0.3], ['bell', 17.9, 1567.98, 0.025, 1.2, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
