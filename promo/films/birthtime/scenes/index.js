// birthtime (series 2 · #6 · 15s · LOOK A "Film 1")
//   0.00–5.20  HOOK  the birth-data pill types huge: "May 12, 1998 · 5:00 PM · Tulsa" → "The most honest thing about you"
//   5.08–8.25  the pill becomes a disc → the face-down sign card charges · "YOUR FIRST PULL / One card has your name."
//   8.25–10.75 the flip → Taurus sign card + YOUR CARD stamp · "YOUR SUN SIGN / Sun in Taurus."
//  10.95–15.00 END  "The sky already wrote you down." → Align lockup, PUT YOUR FAITH IN THE STARS + moon row → black
import bg from './bg.js'
import hook, { TYPED_AT, T_CAP } from './hook.js'
import card from './card.js'
import end, { T_LINE } from './end.js'
import overlay from './overlay.js'
import grain from './grain.js'

export const DURATION = 15
export const SCENES = [bg, hook, card, end, overlay, grain]
export const CUES = [
  ...TYPED_AT.map((t, i) => ['tick', t, i % 4 === 0 ? 0.07 : 0.05]),
  ['bell', 0.98, 587.33, 0.025, 1.4, -0.3],
  ['whoosh', 2.6, 0.7, 0.07],
  ['bell', T_CAP + 0.4, 440, 0.04, 2.2, 0],
  ['bell', T_CAP + 0.55, 659.25, 0.03, 2.0, 0.2],
  ['whoosh', 5.05, 0.6, 0.08],
  ['bell', 5.5, 329.63, 0.04, 1.8, 0.3],
  ['riser', 5.9, 8.4, 0.09],
  ['glitter', 6.0, 8.2],
  ['whoosh', 8.2, 0.45, 0.1],
  ['boom', 8.45, 0.22],
  ['glitter', 8.45, 9.3],
  ['bell', 8.48, 880, 0.05, 2.4, 0.2],
  ['bell', 8.52, 1318.5, 0.03, 2.0, -0.2],
  ['tick', 9.0, 0.16],
  ['boom', 9.0, 0.12],
  ['whoosh', 10.6, 0.6, 0.06],
  ['bell', T_LINE + 0.3, 587.33, 0.035, 2.4, 0],
  ['boom', 14.6, 0.1],
]
