// ngfe20: 24 DAYS OF GREEN FLAGS, door 20: 'Says "have fun" when you make plans.' (18 s vertical, lofi · Em)
//   hook "Friends' night. | *Without you.*" · Leo, scarf on: "my friends invited me out tonight!" Scorpio: "go! have
//   fun." and "tell me everything later." Leo hops out the door, waving; Scorpio waves back, happy for real, and opens
//   a book. Last: "Go. *Have fun.* Tell me later."
import { makeDoor, room, windowFrame, bubble, hearts, shadow, label, box, R, INK, BONE, GOLD, prog, ease, lerp } from '../../ngfe01/scenes/advent.js'
function scene(x, t, S) {
  const { u, hero, mate } = S
  room(x, { wall: '#2a2850', wall2: '#30305c', floor: '#3e3458' })
  windowFrame(x, t, 120, 280, 300, 260)
  // the front door on the right
  box(x, 760, 420, 280, 760, '#7b4a31', { b: 10 })
  const op = ease.outCubic(prog(u, 3.9, 4.2)) * (1 - ease.inCubic(prog(u, 4.9, 5.2)))
  R(x, '#ffe9b8', 760, 420, 280 * op, 760)
  // Leo heads out
  const go = ease.inOutCubic(prog(u, 4.1, 4.8))
  const lx = lerp(560, 900, go)
  if (go < 0.98) { shadow(x, lx, 1160, 210); mate(x, t, { x: lx, y: 990, s: 240, pop: 1 - ease.inCubic(prog(u, 4.6, 4.85)), mood: u < 1.6 ? 'sparkle' : 'happy', look: u < 4.1 ? [-1, 0] : [1, 0], hops: [S.t0 + 0.4, S.t0 + 1.9, S.t0 + 4.1, S.t0 + 4.4] }) }
  // scarf on Leo (a simple wrap)
  shadow(x, 260, 1160, 230)
  const book = u > 5.0
  hero(x, t, { x: 260, y: 990, s: 250, mood: u < 4.9 ? 'happy' : 'sparkle', look: u < 4.9 ? [1, 0] : [0, 1], hops: [S.t0 + 1.8, S.t0 + 3.0, S.t0 + 4.3, S.t0 + 4.5] })
  if (u > 4.1 && u < 5.0) label(x, 'bye!!', 600, 760, { size: 40, col: GOLD })
  if (book) { const k = ease.outBack(prog(u, 5.0, 5.3)); x.save(); x.translate(330, 1060); x.scale(k, k); box(x, -70, -50, 140, 100, '#5f8ad8', { b: 5 }); R(x, BONE, -6, -50, 12, 100); x.restore() }
  bubble(x, t, 560, 680, S.t0 + 0.4, S.t0 + 1.8, 'my friends invited\nme out tonight!', { size: 42, tail: 0 })
  bubble(x, t, 300, 680, S.t0 + 1.85, S.t0 + 3.0, 'go! have fun.', { size: 48, tail: -0.1, col: '#ffe0c2' })
  bubble(x, t, 330, 680, S.t0 + 3.0, S.t0 + 4.4, 'tell me everything\nlater.', { size: 42, tail: -0.1, col: '#ffe0c2' })
  if (u > 5.0) hearts(x, t, S.t0 + 5.05, 260, 820, { n: 3 })
  void INK
}
const EP = makeDoor({
  day: 20, hero: 'scorpio', mate: 'leo', hook: "Friends' night. | *Without you.*", accent: '#f39a3a',
  flag: 'says *“have fun”* when you make plans.', scene, pis: { x: 120, y: 1715, look: [1, -0.6] },
  cues: [['pop', 0.4, 1174.66, 0.04, 0.2], ['pop', 1.85, 880, 0.04, -0.3], ['pop', 3.0, 987.77, 0.04, -0.3], ['whoosh', 3.9, 0.3, 0.03], ['tick', 3.95, 0.05], ['pop', 4.1, 1318.51, 0.035, 0.4], ['tick', 5.15, 0.06], ['pop', 5.0, 659.25, 0.035, -0.3]],
  last: 'Go. *Have fun.* Tell me later.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
