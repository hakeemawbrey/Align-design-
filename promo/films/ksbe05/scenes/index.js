// ksbe05: SAY IT BETTER ep 5, "Calm down" (♑ Capricorn says it to ♌ Leo). funk · A. Loops back to frame 0.
//   frame 0: Leo mid-roar, already huge and glowing red, Capricorn mid-step back under "CALM DOWN!".
//   Leo grows even bigger ("CALM?! *I AM CALM!*") → the pen → THE STARS → "I can see this really *matters*…"
//   → Leo shrinks back to size: "…thank *you.*" Pisces in the corner sobbing into a pillow.
import { makeShort } from '../../ksbe01/scenes/sbshort.js'
import { rect } from '../../ksbe01/scenes/sbkit.js'
export const { DURATION, SCENES, CUES } = makeShort({
  ep: 5, room: 'living', end: 'loop',
  A: { sign: 'capricorn', red: 0, mood0: 'wide', x: 260 }, B: { sign: 'leo', x: 760, s: 300 }, P: { x: 110, y: 1180, s: 140, look: [1, 0] },
  hook: '“Calm down” has *never* worked.', caption: 'famous last *words.*',
  bad: { text: 'Calm *down!*', cy: 680 }, react: 'CALM?! *I AM CALM!*', reactX: 640, reactY: 620,
  stars: ['you can’t order a feeling to *leave*.', '*make room* for it.'],
  better: 'I can see this really *matters* to you. I’m listening.',
  replies: ['…thank *you.*', 'ok. here’s what *happened*…'],
  last: 'Listen first. *Calm* | comes on its own.',
  keys: {
    A: [[0, { look: [1, -1], squash: 0.05 }]],
    B: [[0, { x: 780, y: 1010, s: 430, rot: 0, red: 1, mood: 'squint', look: [-1, 0] }], [0.15, { x: 780, y: 1010, rot: 0 }],
      [2.4, { s: 520, y: 980, red: 1, mood: 'wide', d: 0.25 }], [4.4, { s: 300, y: 1090, red: 0, mood: 'neutral', d: 0.9 }]],
    P: [[0, { tears: 3 }]],
  },
  draw(x) { rect(x, 40, 1190, 150, 70, '#1b1236'); rect(x, 46, 1196, 138, 58, '#ff8fb1') },   // Pisces' pillow
  shake: [{ at: 2.5, len: 0.5, amp: 30 }],
})
