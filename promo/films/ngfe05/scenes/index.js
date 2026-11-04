// ngfe05: 24 DAYS OF GREEN FLAGS, door 5: "Lets you finish your story." (18 s vertical, chiptune · A)
//   hook "Plot twist: | *the Leo* is listening." · Aquarius tells a long story ("so the bus was late," "and THEN a
//   goose—"); Leo opens its mouth ("oh I—"), closes it, nods. Leo: "wait. then what happened??" Aquarius, thrilled:
//   "THE GOOSE HAD A SCARF." Last: "Your story. *Your* ending."
import { makeDoor, room, windowFrame, bubble, shadow, label, R, INK, BONE, GOLD, prog, ease, sparkles } from '../../ngfe01/scenes/advent.js'
function sofa(x) {
  R(x, INK, 70, 960, 940, 230); R(x, '#5a3f8a', 80, 970, 920, 210); R(x, '#6c4ea0', 80, 970, 920, 30)
  R(x, INK, 60, 1040, 90, 150); R(x, '#4a3478', 66, 1046, 78, 138); R(x, INK, 930, 1040, 90, 150); R(x, '#4a3478', 936, 1046, 78, 138)
}
function scene(x, t, S) {
  const { u, hero, mate } = S
  room(x, { wall: '#2a2a52', wall2: '#30305e', floor: '#3e3058' })
  windowFrame(x, t, 380, 300, 320, 280)
  sofa(x)
  shadow(x, 320, 1150, 230); shadow(x, 770, 1150, 230)
  // Aquarius: talking with its whole body
  const tell = [S.t0 + 0.3, S.t0 + 0.7, S.t0 + 1.2, S.t0 + 1.9, S.t0 + 2.3, S.t0 + 4.4, S.t0 + 4.7, S.t0 + 5.0]
  mate(x, t, { x: 320, y: 930, s: 270, mood: u > 4.3 ? 'sparkle' : u > 3.5 ? 'wide' : 'happy', look: [1, -0.3], hops: tell })
  // Leo: opens its mouth… closes it… nods
  const lm = u < 1.9 ? 'happy' : u < 2.6 ? 'wide' : u < 3.5 ? 'squint' : 'sparkle'
  hero(x, t, { x: 770, y: 930, s: 270, mood: lm, look: [-1, -0.2], hops: [S.t0 + 1.95, S.t0 + 2.9, S.t0 + 3.15, S.t0 + 3.4, S.t0 + 3.6] })
  if (u > 2.85 && u < 3.5) label(x, '*nod nod*', 770, 700, { size: 32, col: GOLD })
  bubble(x, t, 330, 640, S.t0 + 0.3, S.t0 + 1.85, 'so the bus was late,', { size: 42, tail: -0.1 })
  bubble(x, t, 330, 640, S.t0 + 1.9, S.t0 + 3.4, 'and THEN a goose—', { size: 44, tail: -0.1 })
  bubble(x, t, 820, 760, S.t0 + 2.05, S.t0 + 2.6, 'oh I—', { size: 40, tail: 0.1, col: '#ffe0c2' })
  bubble(x, t, 700, 620, S.t0 + 3.6, S.t0 + 4.9, 'wait. then what\nhappened??', { size: 44, tail: 0.2, col: '#ffe0c2' })
  bubble(x, t, 380, 600, S.t0 + 4.9, S.t1 - 0.2, 'THE GOOSE HAD\nA SCARF.', { size: 48, tail: -0.1 })
  sparkles(x, t, 320, 930, S.t0 + 4.9, 10, 180, 1, [GOLD, BONE, '#7fd0ff'])
  void prog; void ease
}
const EP = makeDoor({
  day: 5, hero: 'leo', mate: 'aquarius', hook: 'Plot twist: | *the Leo* is listening.', accent: '#f39a3a',
  flag: 'lets you *finish* your story.', scene,
  cues: [['pop', 0.3, 880, 0.035, -0.3], ['pop', 1.9, 987.77, 0.035, -0.3], ['pop', 2.05, 1318.51, 0.03, 0.3], ['tick', 2.6, 0.05],
    ['tick', 2.9, 0.03], ['tick', 3.15, 0.03], ['tick', 3.4, 0.03], ['pop', 3.6, 1174.66, 0.04, 0.3], ['pop', 4.9, 1567.98, 0.045, -0.3], ['glitter', 4.9, 5.3]],
  last: 'Your story. *Your* ending.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
