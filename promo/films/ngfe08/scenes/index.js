// ngfe08: 24 DAYS OF GREEN FLAGS, door 8: 'Says "take your time."' (18 s vertical, synthwave · F#m)
//   hook "The menu has | *forty pages.*" · Taurus disappears behind a giant menu (PAGE 3/40… 27/40… 39/40), the wall
//   clock spins; Scorpio, chin on its tips: "take your time." Taurus pops up: "this one." Scorpio, still smiling:
//   "great choice." Last: "*No rush.* Ever."
import { makeDoor, room, table, clock, bubble, hearts, shadow, label, box, R, INK, BONE, GOLD, MONO, INTER, prog, ease, lerp } from '../../ngfe01/scenes/advent.js'
function scene(x, t, S) {
  const { u, hero, mate } = S
  room(x, { wall: '#28204a', wall2: '#2f2656', floor: '#3a2a52' })
  // the clock spins faster and faster
  const spin = u < 1.5 ? 0 : (u - 1.5) * (u - 1.5) * 4
  const mins = 30 + Math.min(spin, 9) * 60 + (u > 4.0 ? 0 : 0)
  clock(x, 540, 420, 110, 7 + Math.floor(mins / 60), mins % 60)
  if (u > 1.5 && u < 4.0) label(x, 'tick tick tick', 540, 590, { size: 28, col: '#c9a6ff' })
  shadow(x, 260, 1160, 230); shadow(x, 820, 1160, 230)
  const up = u > 4.1
  mate(x, t, { x: 260, y: up ? 940 : 990, s: 250, mood: up ? 'sparkle' : 'wide', look: [0, 1], hops: [S.t0 + 4.1, S.t0 + 4.35] })
  hero(x, t, { x: 820, y: 980, s: 250, mood: 'happy', look: [-1, 0], hops: [S.t0 + 1.0, S.t0 + 5.0] })
  table(x, 540, 1070, 820)
  // the giant menu: hides Taurus, pages flip
  const drop = ease.inCubic(prog(u, 4.1, 4.4))
  if (drop < 1) {
    x.save(); x.translate(270, lerp(900, 1200, drop)); x.rotate(-0.04 + 0.02 * Math.sin(t * 3))
    box(x, -170, -230, 340, 440, '#7a2a3a', { b: 8, hi: '#9a3a4e' })
    R(x, '#efe0c8', -140, -200, 280, 380)
    x.font = `800 54px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MENU', 0, -130)
    for (let i = 0; i < 6; i++) R(x, '#b8a890', -110, -60 + i * 34, 220 - (i % 3) * 40, 12)
    const pg = Math.min(40, 3 + Math.floor(Math.max(0, u - 0.4) * 10))
    x.font = `700 26px ${MONO}`; x.fillText(`PAGE ${pg}/40`, 0, 160)
    x.restore()
  }
  if (up) hearts(x, t, S.t0 + 5.1, 820, 800, { n: 4 })
  bubble(x, t, 760, 640, S.t0 + 1.0, S.t0 + 4.0, 'take your time.', { size: 46, tail: 0.2, col: '#ffe0c2' })
  bubble(x, t, 330, 640, S.t0 + 4.15, S.t0 + 5.3, 'this one.', { size: 50, tail: -0.1 })
  bubble(x, t, 760, 660, S.t0 + 5.05, S.t1 - 0.2, 'great choice.', { size: 46, tail: 0.2, col: '#ffe0c2' })
  void BONE; void GOLD
}
const EP = makeDoor({
  day: 8, hero: 'scorpio', mate: 'taurus', hook: 'The menu has | *forty pages.*',
  flag: 'says *“take your time.”*', scene, pis: { x: 950, y: 1715 },
  cues: [['pop', 1.0, 880, 0.035, 0.3], ...Array.from({ length: 16 }, (_, i) => ['tick', +(1.5 + i * 0.16).toFixed(2), 0.03]), ['whoosh', 4.1, 0.3, 0.035], ['pop', 4.15, 1318.51, 0.045, -0.3], ['glitter', 4.15, 4.5], ['pop', 5.05, 987.77, 0.035, 0.3]],
  last: '*No rush.* Ever.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
