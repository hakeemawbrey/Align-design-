// ngfe14: 24 DAYS OF GREEN FLAGS, door 14: "Gives you the bigger half of the blanket." (18 s vertical, chiptune · B)
//   hook "One blanket. | *Two people.*" · on the sofa, Taurus (famous blanket keeper) holds the one blanket… and slides
//   the bigger half over Libra: "you take the big half." Libra: "…who ARE you?" Taurus: "someone who likes you."
//   Pisces, in the back, drops its tissue. Last: "You get the *bigger* half."
import { makeDoor, room, windowFrame, bubble, hearts, shadow, label, box, R, INK, BONE, GOLD, prog, ease, lerp } from '../../ngfe01/scenes/advent.js'
function scene(x, t, S) {
  const { u, hero, mate } = S
  room(x, { wall: '#2c2650', wall2: '#342d5c', floor: '#3e3058' })
  windowFrame(x, t, 380, 280, 320, 280)
  R(x, INK, 80, 960, 920, 230); R(x, '#a05a5a', 90, 970, 900, 210); R(x, '#b86e6e', 90, 970, 900, 30)
  hero(x, t, { x: 300, y: 960, s: 260, mood: u < 1.4 ? 'happy' : u < 4.6 ? 'happy' : 'heart', look: [1, 0], hops: [S.t0 + 1.5, S.t0 + 4.65] })
  mate(x, t, { x: 780, y: 960, s: 260, mood: u < 1.6 ? 'neutral' : u < 3.5 ? 'wide' : 'heart', look: [-1, 0], hops: [S.t0 + 1.7, S.t0 + 3.6] })
  // the blanket: starts wrapped round Taurus, slides over so Libra gets the bigger half
  const sl = ease.inOutCubic(prog(u, 1.5, 2.2))
  const left = lerp(120, 400, sl), right = lerp(520, 980, sl)
  box(x, left, 1010, right - left, 170, '#5fb08a', { b: 7, hi: '#7fd0a8' })
  for (let X = left + 20; X < right - 20; X += 70) R(x, '#4a9070', X, 1040, 24, 120)
  if (u > 1.5 && u < 2.4) label(x, 'sliiide', 640, 920, { size: 34, col: GOLD })
  if (u > 3.6) hearts(x, t, S.t0 + 3.65, 780, 780)
  bubble(x, t, 330, 660, S.t0 + 2.2, S.t0 + 3.5, 'you take the\nbig half.', { size: 44, tail: -0.1 })
  bubble(x, t, 760, 660, S.t0 + 3.55, S.t0 + 4.6, '…who ARE you?', { size: 44, tail: 0.2, col: '#ffe0c2' })
  bubble(x, t, 340, 660, S.t0 + 4.65, S.t1 - 0.2, 'someone who\nlikes you.', { size: 44, tail: -0.1 })
  void BONE
}
const EP = makeDoor({
  day: 14, hero: 'taurus', mate: 'libra', hook: 'One blanket. | *Two people.*',
  flag: 'gives you *the bigger half* of the blanket.', scene,
  pis: { x: 940, y: 1715, mood: 'wide' },
  top(x, t) { // the tissue Pisces drops when the blanket slides
    const d = prog(t, 2.35 + 1.55, 2.35 + 2.4)
    if (t < 2.35 + 1.5 || t > 8.8) return
    R(x, INK, 860 - 3, 1640 + d * 160 - 3, 46, 52); R(x, '#ffffff', 860, 1640 + d * 160, 40, 46)
  },
  cues: [['whoosh', 1.5, 0.6, 0.035], ['pop', 2.2, 880, 0.04, -0.3], ['pop', 3.55, 1318.51, 0.045, 0.3], ['pluck', 3.65, 1567.98, 0.035, 0.5, 0.3], ['pop', 4.65, 987.77, 0.04, -0.3], ['tick', 1.6, 0.04], ['tick', 2.4, 0.05]],
  last: 'You get the *bigger* half.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
