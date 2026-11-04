// ngfe16: 24 DAYS OF GREEN FLAGS, door 16: "Warms your coat before you leave." (18 s vertical, house · C)
//   hook "Leaving the party. | *Why is my coat warm?*" · by the door, Capricorn slips on its coat and freezes: it's
//   toasty (little heat waves). Cancer points at the heater: "hung it there an hour ago." Capricorn's stern face
//   cracks: "I… thank you." Last: "Your coat. *Pre-warmed.*"
import { makeDoor, room, bubble, hearts, shadow, label, box, starFrame, R, INK, BONE, GOLD, INTER, prog, ease, lerp } from '../../ngfe01/scenes/advent.js'
function heater(x, X, Y) {
  box(x, X, Y, 220, 180, '#d8d0e8', { b: 6 })
  for (let i = 0; i < 6; i++) R(x, '#b8b0cc', X + 14 + i * 34, Y + 14, 18, 152)
}
function waves(x, t, cx, cy, a = 1) {
  x.save(); x.globalAlpha *= a
  for (let i = 0; i < 3; i++) for (let j = 0; j < 6; j++) { const p = (t * 0.8 + j / 6) % 1; R(x, '#ffb07a', cx - 50 + i * 50 + 8 * Math.sin(p * 12 + i), cy - p * 120, 8, 12) }
  x.restore()
}
function scene(x, t, S) {
  const { u, hero, mate } = S
  room(x, { wall: '#3a2a4a', wall2: '#432f54', floor: '#4a3450' })
  // string lights + the party glow on the left
  for (let i = 0; i < 12; i++) { R(x, INK, 30 + i * 90, 230, 18, 22); R(x, [GOLD, '#ff8fb1', '#7fd0ff'][i % 3], 33 + i * 90, 233, 12, 16) }
  heater(x, 780, 960)
  waves(x, t, 890, 940, 0.8)
  // the coat: on the hook by the heater, then on Capricorn
  const on = ease.inOutCubic(prog(u, 0.4, 0.9))
  shadow(x, 330, 1170, 230); shadow(x, 700, 1170, 200)
  const capMood = u < 1.3 ? 'neutral' : u < 3.6 ? 'wide' : 'heart'
  const co = { x: 330, y: 1000, s: 260, mood: capMood, look: u > 1.9 && u < 3.6 ? [1, 0] : [0, 0], hops: [S.t0 + 1.35, S.t0 + 3.65] }
  mate(x, t, co)
  const F = starFrame(co.x, co.y, co.s, t, { hops: co.hops, seed: 7 })
  const cx = lerp(880, F.ox, on), cy = lerp(800, F.cy + 30, on)
  box(x, cx - 90, cy - 30, 180, 130, '#8a5a3a', { b: 6, hi: '#a87050' })
  R(x, INK, cx - 4, cy - 30, 8, 130); R(x, GOLD, cx - 16, cy + 10, 10, 10); R(x, GOLD, cx - 16, cy + 50, 10, 10)
  if (u > 1.3) waves(x, t, F.ox, F.cy - 150, 0.9)
  if (u > 1.3 && u < 2.3) label(x, '…WARM?!', 330, 640, { size: 54, col: '#ffb07a', font: INTER, weight: 800, rot: -0.06 })
  hero(x, t, { x: 650, y: 1010, s: 220, mood: 'happy', look: u > 2.2 && u < 3.4 ? [1, 0] : [-1, 0], hops: [S.t0 + 2.2, S.t0 + 4.4] })
  if (u > 3.6) hearts(x, t, S.t0 + 3.65, 330, 820)
  bubble(x, t, 660, 700, S.t0 + 2.2, S.t0 + 3.6, 'hung it by the heater\nan hour ago.', { size: 40, tail: 0, col: '#ffe0c2' })
  bubble(x, t, 330, 660, S.t0 + 3.7, S.t1 - 0.2, 'I… thank you.', { size: 46, tail: -0.1 })
  void BONE
}
const EP = makeDoor({
  day: 16, hero: 'cancer', mate: 'capricorn', hook: 'Leaving the party. | *Why is my coat warm?*',
  flag: 'warms your coat *before you leave.*', scene, pis: { x: 120, y: 1715, look: [1, -0.6] },
  cues: [['whoosh', 0.4, 0.4, 0.03], ['tick', 0.9, 0.05], ['pop', 1.35, 1567.98, 0.045, -0.3], ['riser', 1.3, 2.0, 0.015], ['pop', 2.2, 880, 0.04, 0.2], ['pop', 3.7, 1174.66, 0.04, -0.3], ['pluck', 3.65, 1567.98, 0.035, 0.5, -0.3]],
  last: 'Your coat. *Pre-warmed.*',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
