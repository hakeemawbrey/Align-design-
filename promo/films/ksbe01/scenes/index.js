// ksbe01: SAY IT BETTER ep 1, "You're so selfish" (20 s vertical, star_advice post, music: pop · E). No end card, no card cut.
//   0.00  frame 0: the living room mid-fight. ♈ Aries (red, steaming) mid-shout, a spiky bubble "YOU'RE SO SELFISH!"
//         mid-slam, ♎ Libra knocked flying backwards. Slam title "Labels *start* wars." mid whip zoom. ♓ Pisces at the
//         window, already crying.
//   0.90  record scratch + freeze ("one word. *whole* war."), caught circle on SELFISH ("THE LABEL").
//   2.40  Libra shrinks: "so I'm a *bad person?*"   3.2 the red pen crosses the line out, 4.5 it crumples and flies off.
//   5.0   THE STARS: "a label makes them *defend*." → "the *moment* makes them listen."
//  10.4   the better line writes in: "I felt *left out* when you picked the trip without me."
//  13.9   Libra: "…oh. you're *right.*" → "let's pick the next one *together.*"  Pisces fountains (happy).
//  18.2   last line: "Point at the *moment*, | not the person."  Hard cut at 20.
import { makeFilm } from './sbkit.js'

const A = 'A', B = 'B'
export const { DURATION, SCENES, CUES } = makeFilm({
  dur: 20, ep: 1, room: 'living',
  cast: { P: { sign: 'pisces', seed: 6 }, A: { sign: 'aries', seed: 3 }, B: { sign: 'libra', seed: 8 } },
  keys: {
    A: [[0, { x: 300, y: 1090, s: 310, mood: 'squint', look: [1, 0], red: 1, steam: 1, squash: -0.08 }],
      [2.4, { red: 0.7, steam: 0.6 }], [4.4, { red: 0, steam: 0, mood: 'neutral', look: [1, 0], squash: 0, d: 0.8 }],
      [7.8, { mood: 'wide', look: [0, -1] }], [10.2, { mood: 'sparkle', look: [1, 0] }], [14.0, { mood: 'happy' }],
      [16.0, { x: 400, d: 0.6 }], [18.0, { mood: 'heart' }]],
    B: [[0, { x: 880, y: 960, s: 280, rot: 0.55, mood: 'wide', look: [-1, 0] }],
      [0.15, { x: 790, y: 1090, rot: 0, d: 0.45, e: t => 1 - (1 - t) ** 3 }],
      [2.4, { s: 190, y: 1130, mood: 'neutral', look: [0, 1], d: 0.5 }],
      [11.4, { s: 230, look: [-1, 0], mood: 'wide' }], [13.8, { s: 290, y: 1090, mood: 'happy', d: 0.6 }],
      [16.0, { x: 680, d: 0.6 }], [18.0, { mood: 'heart' }]],
    P: [[0, { x: 820, y: 640, s: 130, mood: 'wide', look: [-1, 1], tears: 2 }], [4.4, { tears: 1, mood: 'neutral' }],
      [12.2, { tears: 2, mood: 'sparkle' }], [15.9, { tears: 3, mood: 'happy' }]],
  },
  hops: { A: [16.0, 16.4], B: [16.05, 16.45, 18.05], P: [12.3, 16.0] },
  hook: { text: 'Labels *start* wars.', out: [2.3, 2.5] },
  freeze: [{ at: 0.9, len: 1.4, caption: 'one word. *whole* war.' }],
  caught: [{ at: 1.05, x: 610, y: 745, r: 200, out: [2.2, 2.35], label: 'THE LABEL', arrow: null }],
  talk: [
    { who: A, kind: 'bad', at: -0.1, text: "You're so *selfish!*", strike: 3.2, out: 4.5, cy: 730 },
    { who: B, kind: 'say', at: 2.5, out: 4.6, text: "so I'm a *bad person?*", cx: 700, cy: 900 },
    { who: A, kind: 'better', at: 10.4, out: 15.8, wps: 5, text: 'I felt *left out* when you picked the trip without me.', cy: 700 },
    { who: B, kind: 'say', at: 13.9, out: 15.7, text: '…oh. you’re *right.*', cx: 700, cy: 930 },
    { who: B, kind: 'say', at: 15.9, out: 18.0, text: 'let’s pick the next one *together.*', cx: 600, cy: 880, maxW: 560 },
  ],
  box: { open: 4.9, close: 10.1 },
  stars: [{ t: 5.1, text: 'a label makes them *defend*.' }, { t: 7.6, text: 'the *moment* makes them listen.' }],
  last: { at: 18.2, text: 'Point at the *moment*, | not the person.', top: 200, size: 92, accentSize: 130 },
  cam: [[0, { z: 1, x: 540, y: 960 }], [5.0, { z: 1.12, x: 700, y: 1000, d: 4.5, e: t => t }], [9.8, { z: 1, x: 540, y: 960, d: 0.5 }], [10.3, { z: 1.06, y: 900, d: 1.2 }], [16.0, { z: 1.0, y: 960, d: 1.0 }]],
  shake: [{ at: 0.05, len: 0.5, amp: 26 }],
  cues: [['pluck', 16.1, 659.25, 0.035, 0.5, 0.3], ['pluck', 16.25, 587.33, 0.035, 0.5, 0.3], ['glitter', 18.0, 18.5]],
})
