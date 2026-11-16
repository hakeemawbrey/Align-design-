// og-ksbe05: the social rework of ksbe05 (same room, cast and story). Static HOOK (box, 0–2.4) instead of the slam title;
//   kit: ./sbkit.js + ./sbshort.js (og social copies: no series bug, calm freeze card, no whip/shake, hard cut, text in the
//   safe zone); crazier Capricorn (penciled in two minutes for feelings) and Leo (EXTREMELY calm, mane deflating); Pisces moved to the window (was cut off at the left edge). Hard cut on the last line (no loop back).
// Original notes (ksbe05): "Calm down" (♑ Capricorn says it to ♌ Leo). funk · A. Loops back to frame 0.
//   frame 0: Leo mid-roar, already huge and glowing red, Capricorn mid-step back under "CALM DOWN!".
//   Leo grows even bigger ("CALM?! *I AM CALM!*") → the pen → THE STARS → "I can see this really *matters*…"
//   → Leo shrinks back to size: "…thank *you.*" Pisces in the corner sobbing into a pillow.
import { makeShort } from './sbshort.js'
export const { DURATION, SCENES, CUES } = makeShort({
  room: 'living',
  A: { sign: 'capricorn', red: 0, mood0: 'wide', x: 260 }, B: { sign: 'leo', x: 720, s: 300 }, P: { x: 840, y: 600, s: 130, look: [-1, 1] },
  caption: 'Capricorn penciled in *two minutes* for feelings.',
  bad: { text: 'Calm *down!*', cy: 680 }, react: 'CALM?! I am *EXTREMELY* calm!!', reactX: 640, reactY: 620,
  stars: ['you can’t order a feeling to *leave*.', '*make room* for it.'],
  better: 'I can see this really *matters* to you. I’m listening.',
  replies: ['…thank you. *(mane deflates)*', 'ok. it’s a *four-act* story…'],
  last: 'Listen first. *Calm* | comes on its own.',
  keys: {
    A: [[0, { look: [1, -1], squash: 0.05 }]],
    B: [[0, { x: 700, y: 1010, s: 430, rot: 0, red: 1, mood: 'squint', look: [-1, 0] }], [0.15, { x: 700, y: 1010, rot: 0 }],
      [2.4, { s: 520, y: 980, red: 1, mood: 'wide', d: 0.25 }], [4.4, { s: 300, y: 1090, red: 0, mood: 'neutral', d: 0.9 }]],
    P: [[0, { tears: 3 }]],
  },
})

// social hook: static caption from frame 0 (the film's own slam title is dropped by the social kit copy)
export const HOOK = '“Calm down” has | *never* worked.'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4
