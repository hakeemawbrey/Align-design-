// nnye10: NEW YEAR, SAME HEART · Capricorn: what I'm keeping (20 s vertical, star_advice, music: lofi · Eb).
// The format lives in ../../nnye01/scenes/yearkit.js (shared by nnye01–nnye12). Story 0–15.6, then the shared end card.
//   0.0   hook: "*Capricorn,* / one last task / this year."
//   2.4   LEAVING: "feelings filed under “later”" · "working through dinner" (Capricorn: "rescheduled: never.")
//   6.6   card cut → KEEPING: "the steady promise", the gift box closes.
//   10.85 "New year. | Same *heart.*"  THE STARS: "Your heart isn’t a *to-do*."
import { makeYear } from '../../nnye01/scenes/yearkit.js'

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
    "working through dinner"
  ],
  "keep": "the steady promise",
  "quips": [
    {
      "t": 5.2,
      "text": "rescheduled: never.",
      "dx": 250,
      "dy": 120
    }
  ],
  "last": "Your heart isn’t a *to-do*."
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
