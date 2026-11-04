// ngfe15: 24 DAYS OF GREEN FLAGS, door 15: "Shows up when they said." (18 s vertical, funk · A)
//   hook "They said 7. | *It's 6:59.*" · Aries watches the wall clock: 6:59… tick… 7:00, KNOCK KNOCK. The door swings
//   open: Gemini, "right on time!" Aries' jaw drops, then a huge grin: "you said 7 and it's… 7." Last: "*Said* seven.
//   Came at seven."
import { makeDoor, room, clock, bubble, hearts, shadow, label, box, R, INK, BONE, GOLD, INTER, prog, ease, lerp, sparkles } from '../../ngfe01/scenes/advent.js'
const KNOCK = 2.5
function scene(x, t, S) {
  const { u, hero, mate } = S
  room(x, { wall: '#2e2452', wall2: '#362b5e', floor: '#42305a' })
  // clock: 6:59 → 7:00 at KNOCK
  const m = u < KNOCK ? 59 : 0, h = u < KNOCK ? 6 : 7
  clock(x, 300, 470, 140, h, m)
  const sec = Math.floor(Math.min(u, KNOCK) * 4) % 4
  for (let i = 0; i < 4; i++) R(x, i <= sec && u < KNOCK ? GOLD : '#5a4680', 230 + i * 40, 650, 24, 10)
  label(x, u < KNOCK ? '6:59' : '7:00', 300, 700, { size: 40, col: u < KNOCK ? BONE : '#9fe6b0', font: INTER, weight: 800 })
  // the door
  box(x, 640, 420, 340, 760, '#7b4a31', { b: 10 })
  const op = ease.outCubic(prog(u, 2.9, 3.3))
  R(x, '#ffe9b8', 640, 420, 340 * op, 760)
  if (op > 0.2) { shadow(x, 810, 1170, 200); hero(x, t, { x: 810, y: 1000, s: 240, pop: op, mood: 'sparkle', look: [-1, 0], hops: [S.t0 + 3.3] }) }
  box(x, 640 + 340 * op, 420, 340 * (1 - op), 760, '#a06b46', { b: 6 })
  if (u > KNOCK && u < 3.0) { label(x, 'KNOCK', 810, 600, { size: 54, col: GOLD, font: INTER, weight: 800, rot: -0.1 }); label(x, 'KNOCK', 810, 690, { size: 54, col: GOLD, font: INTER, weight: 800, rot: 0.1 }) }
  shadow(x, 300, 1170, 220)
  mate(x, t, { x: 300, y: 1010, s: 240, mood: u < KNOCK ? 'neutral' : u < 4.2 ? 'wide' : 'sparkle', look: u < KNOCK ? [0, -1] : [1, 0], hops: [S.t0 + KNOCK + 0.02, S.t0 + 4.25, S.t0 + 4.5] })
  sparkles(x, t, 300, 470, S.t0 + KNOCK, 10, 170, 1, [GOLD, BONE, '#9fe6b0'])
  if (u > 4.3) hearts(x, t, S.t0 + 4.35, 300, 830)
  bubble(x, t, 780, 680, S.t0 + 3.3, S.t0 + 4.3, 'right on time!', { size: 44, tail: 0.1, col: '#ffe0c2' })
  bubble(x, t, 330, 830, S.t0 + 4.3, S.t1 - 0.2, "you said 7\nand it's… 7.", { size: 42, tail: -0.1 })
  void lerp
}
const EP = makeDoor({
  day: 15, hero: 'gemini', mate: 'aries', hook: 'They said 7. | *It\'s 6:59.*',
  flag: 'shows up *when they said.*', scene, pis: { x: 120, y: 1715, look: [1, -0.6] }, heroMood: 'happy', mateMood: 'heart',
  cues: [...Array.from({ length: 10 }, (_, i) => ['tick', +(i * 0.25).toFixed(2), 0.035]), ['bell', KNOCK, 1760, 0.03, 0.8, -0.4],
    ['tom', KNOCK + 0.05, 110, { gain: 0.25, decay: 0.15 }], ['tom', KNOCK + 0.25, 110, { gain: 0.25, decay: 0.15 }], ['whoosh', 2.9, 0.35, 0.035], ['pop', 3.3, 1318.51, 0.045, 0.3], ['pop', 4.3, 880, 0.04, -0.3], ['glitter', 4.25, 4.6]],
  last: '*Said* seven. Came at seven.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
