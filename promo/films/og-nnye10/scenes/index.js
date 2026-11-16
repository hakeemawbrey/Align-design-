// og-nnye10: social rework of nnye10 (static HOOK box 0–2.4, kit copy ./yearkit.js: no bug/flash/shake/end card, crazier lines).
// Was: nnye10: NEW YEAR, SAME HEART · Capricorn: what I'm keeping (18 s vertical, star_advice, music: lofi · Eb).
// The format lives in ../../nnye01/scenes/yearkit.js (shared by nnye01–nnye12). Story 0–15.6, then the shared end card.
//   0.0   hook: "*Capricorn,* / one last task / this year."
//   2.4   LEAVING: "feelings filed under “later”" · "working through dinner" (Capricorn: "rescheduled: never.")
//   6.6   → KEEPING: "the steady promise", the gift box closes.
//   10.85 "New year. | Same *heart.*"  THE STARS: "Your heart isn’t a *to-do*."
import { makeYear } from './yearkit.js'

const EP = makeYear({
  "sign": "capricorn",
  "name": "Capricorn",
  "hook": "*Capricorn,* | one last task | this year.",
  "hookPose": {
    "dx": 0,
    "dy": 0,
    "rot": 0,
    "mood": "squint",
    "look": [
      0,
      1
    ]
  },
  "leave": [
    "feelings filed under “later”",
    "a laptop at every dinner"
  ],
  "keep": "the never-late promise",
  "quips": [
    {
      "t": 5.2,
      "text": "dinner? pencilled in.",
      "dx": 250,
      "dy": 120
    }
  ],
  "last": "Your heart isn’t a *to-do*."
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

export const HOOK = 'Capricorn scheduled | *feelings for Q4.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4
