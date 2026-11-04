// ngfe06: 24 DAYS OF GREEN FLAGS, door 6: 'Hears "no" the first time.' (18 s vertical, funk · E)
//   hook "“Not tonight.” | *Watch what happens.*" · Virgo holds two skating tickets: "skating tonight?" Scorpio,
//   wrapped in a blanket on the sofa: "not tonight. I'm wiped." Virgo: "ok! rest up." The tickets go back in the
//   pocket, no sulk. Scorpio's wide eyes go soft: "…that's it? no guilt trip?" Last: "*No*, heard the first time."
import { makeDoor, room, windowFrame, bubble, shadow, box, R, INK, BONE, GOLD, MONO, prog, ease, lerp, hearts } from '../../ngfe01/scenes/advent.js'
function ticket(x, cx, cy, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -70, -34, 140, 68, '#ffd36a', { b: 5 }); R(x, INK, 26, -34, 4, 68)
  x.font = `700 20px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SKATE', -18, 2)
  x.restore()
}
function scene(x, t, S) {
  const { u, hero, mate } = S
  room(x, { wall: '#2e2550', wall2: '#352b5c', floor: '#43305a' })
  windowFrame(x, t, 150, 300, 300, 280)
  // sofa on the right
  R(x, INK, 560, 960, 470, 230); R(x, '#4a6a8a', 570, 970, 450, 210); R(x, '#5a7ea0', 570, 970, 450, 28)
  shadow(x, 300, 1160, 240)
  const nope = u > 3.2
  hero(x, t, { x: 300, y: 990, s: 270, mood: u < 1.9 ? 'sparkle' : u < 3.2 ? 'neutral' : 'happy', look: [1, 0], hops: [S.t0 + 0.4, S.t0 + 3.25] })
  // tickets: waved, then tucked away
  const tuck = ease.inCubic(prog(u, 3.6, 4.0))
  if (tuck < 1) { const wv = u < 1.9 ? 0.15 * Math.sin(t * 8) : 0; ticket(x, lerp(450, 330, tuck), lerp(880, 1120, tuck), -0.2 + wv); ticket(x, lerp(480, 340, tuck), lerp(930, 1130, tuck), 0.1 - wv) }
  // Scorpio in its blanket
  const sm = u < 1.8 ? 'sleepy' : u < 4.0 ? (u > 3.3 ? 'wide' : 'neutral') : 'happy'
  mate(x, t, { x: 790, y: 960, s: 260, mood: sm, look: [-1, 0], hops: [S.t0 + 3.35, S.t0 + 4.4], zzz: false })
  box(x, 640, 1000, 300, 150, '#8a5ab0', { b: 6, hi: '#a47ccc' })
  for (let i = 0; i < 5; i++) R(x, '#6e4494', 660 + i * 58, 1030, 20, 110)
  if (u > 4.4) hearts(x, t, S.t0 + 4.45, 790, 780, { n: 4 })
  bubble(x, t, 360, 680, S.t0 + 0.4, S.t0 + 1.9, 'skating tonight?', { size: 46, tail: -0.1 })
  bubble(x, t, 760, 660, S.t0 + 1.9, S.t0 + 3.2, "not tonight.\nI'm wiped.", { size: 44, tail: 0.1, col: '#e6dcff' })
  bubble(x, t, 330, 680, S.t0 + 3.25, S.t0 + 4.5, 'ok! rest up.', { size: 48, tail: -0.1 })
  bubble(x, t, 760, 640, S.t0 + 4.5, S.t1 - 0.2, "…that's it?\nno guilt trip?", { size: 42, tail: 0.1, col: '#e6dcff' })
  void GOLD; void BONE; void nope
}
const EP = makeDoor({
  day: 6, hero: 'virgo', mate: 'scorpio', hook: '“Not tonight.” | *Watch what happens.*',
  flag: 'hears *“no”* the first time.', scene, pis: { x: 130, y: 1715, look: [1, -0.6] },
  cues: [['pop', 0.4, 1174.66, 0.04, -0.3], ['pop', 1.9, 659.25, 0.035, 0.3], ['pop', 3.25, 987.77, 0.045, -0.3], ['whoosh', 3.6, 0.35, 0.03], ['tick', 4.0, 0.05], ['pop', 4.5, 880, 0.035, 0.3], ['pluck', 4.45, 1174.66, 0.035, 0.5, 0.3]],
  last: '*No*, heard the first time.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
