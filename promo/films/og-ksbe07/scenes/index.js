// og-ksbe07: the social rework of ksbe07 (same room, cast and story). Static HOOK (box, 0–2.4) instead of the slam title;
//   kit: ./sbkit.js + ./sbshort.js (og social copies: no series bug, calm freeze card, no whip/shake, hard cut, text in the
//   safe zone); crazier Libra (left mid-sentence, dramatically) and Leo (three days of rehearsing a comeback speech).
// Original notes (ksbe07): "Forget it." (♎ Libra to ♌ Leo). cinematic · Eb. Hard cut.
//   frame 0: Libra mid-walk-out to the left, "FORGET IT." slamming, Leo frozen mid-word.
//   freeze → Leo: "wait, *what?*" → "three days *later…*": Leo still on the couch, the bubble still floating in a thought
//   → THE STARS → "I don't want to fight tonight. Can we talk after dinner *tomorrow?*" → "*deal.*" Pisces cries at "deal".
import { makeShort } from './sbshort.js'
export const { DURATION, SCENES, CUES } = makeShort({
  room: 'living',
  A: { sign: 'libra', red: 0.3, x: 170 }, B: { sign: 'leo' }, P: { x: 820, y: 640, s: 130 },
  caption: 'Libra left mid-*sentence.* Dramatically.',
  caught: { x: 150, y: 1150, r: 160 },
  bad: { text: 'Forget *it.*', flyDir: -1 }, react: 'wait, I wasn’t *done* yet—',
  stars: ['skipping the talk doesn’t skip the *feeling*.', 'pick a *time* instead.'],
  better: 'I don’t want to fight tonight. Can we talk after dinner *tomorrow?*',
  replies: ['*deal.*', 'after dinner. I’ll make *pasta.* and a speech.'],
  last: '*Later* is fine. | *Never* isn’t.',
  heads: [{ text: 'three days *later…*', at: 4.6, out: [6.9, 7.1], size: 84 }],
  talk: [{ who: 'B', kind: 'say', at: 4.9, out: 7.2, text: '(still rehearsing a *comeback* speech)', cx: 700, cy: 880 }],
  keys: {
    A: [[0, { rot: -0.18, look: [-1, 0], mood: 'squint' }], [0.6, { x: 120, d: 0.6 }], [4.4, { alpha: 0, d: 0.3 }], [9.9, { alpha: 1, x: 300, rot: 0, d: 0.5 }]],
    B: [[4.5, { mood: 'sleepy', look: [0, -1] }], [7.4, { mood: 'neutral' }]],
    P: [[13.9, { tears: 3, mood: 'happy' }]],
  },
})

// social hook: static caption from frame 0 (the film's own slam title is dropped by the social kit copy)
export const HOOK = '“Forget it.” | (Leo *won’t.*)'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4
