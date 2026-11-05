// khse07: ZODIAC HOT SEAT, "Libra planned the trip for everyone" (trial reel, loops). Kit: ../../khse01/scenes/hotkit.js.
//   0.00  frame 0: Libra mid-wobble, the chair tipped onto one leg, a group-plan board in each hand piled with sticky
//         notes (everyone's wishes); the hook "Libra planned it *for everyone.*" landed. 0.3 record scratch.
//   Q1 "Where are we going?" → "wherever you all like!"  Q2 "Who picks the food?" → "…whoever's hungriest."
//   the last question (silence): "What do *you* want to do?" → "…honestly? sleep in."
//   THE STARS: "Put *your* wish on the group list."  Loops back to the wobbling chair.
import { makeHotSeat, box, R, label, prog, ease, INK, BONE, INTER } from '../../khse01/scenes/hotkit.js'

const NOTES = ['#ffe27a', '#ff9fc4', '#9fe6b0', '#9fd8f6']
const WISHES = [['HIKE!', 'BEACH', 'MUSEUM'], ['KARAOKE', 'SPA', 'ROAD TRIP']]
function board(x, t, cx, cy, rot, words, k) {
  x.save(); x.globalAlpha = k; x.translate(cx, cy + 10 * Math.sin(t * 7 + cx)); x.rotate(rot)
  box(x, -110, -120, 220, 230, '#c8a46a', { b: 6 }); R(x, '#a9864e', -110, -120, 220, 18)
  words.forEach((w, i) => { x.save(); x.translate(-30 + (i % 2) * 60, -60 + i * 58); x.rotate((i - 1) * 0.12); box(x, -62, -22, 124, 44, NOTES[(i + cx) % 4 | 0], { b: 4 }); label(x, w, 0, 1, { size: 20, col: INK, font: INTER, weight: 800 }); x.restore() })
  x.restore()
}
const wob = t => 1 - ease.inOutCubic(prog(t, 1.05, 1.5))

const EP = makeHotSeat({
  id: 'khse07', sign: 'libra', name: 'Libra', accent: '#ff9fc4',
  hook: 'Libra planned it | *for everyone.*',
  breakFx: 'scratch', breakAt: 0.3, scratch: 'twelve people. *one group chat.*',
  hero0: { x: 560, y: 1020, s: 290, mood: 'wide', rot: 0.18, look: [-1, -0.5] },
  chair: { tip: t => wob(t) * (0.2 + 0.05 * Math.sin(t * 8)) },
  frame0(x, t, S) { board(x, t, 260, 880, -0.2, WISHES[0], S.k); board(x, t, 820, 860, 0.22, WISHES[1], S.k) },
  qs: [
    { q: 'Where are *we going?*', a: 'wherever you all like!', mood: 'happy' },
    { q: 'Who picks *the food?*', a: '…whoever’s hungriest.', mood: 'squint' },
  ],
  final: { q: 'What do *you* want to do?', a: '…honestly? sleep in.', mood: 'neutral', endMood: 'happy' },
  last: 'Put *your* wish on the group list.',
  ending: 'loop',
  music: { style: 'jazzy', key: 'Bb', seed: 3507 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
