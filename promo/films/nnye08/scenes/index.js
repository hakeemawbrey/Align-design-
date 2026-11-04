// nnye08: NEW YEAR, SAME HEART · Scorpio: what I'm keeping (20 s vertical, star_advice, music: cinematic · Cm).
// The format lives in ../../nnye01/scenes/yearkit.js (shared by nnye01–nnye12). Story 0–15.6, then the shared end card.
//   0.0   hook: "*Scorpio,* / you can come / out now."
//   2.4   LEAVING: "testing people" · "the wall around everything" (Scorpio: "…fine. it goes.")
//   6.6   card cut → KEEPING: "all-in devotion", the gift box closes.
//   10.85 "New year. | Same *heart.*"  THE STARS: "Trust it *out loud*."
import { makeYear } from '../../nnye01/scenes/yearkit.js'

const EP = makeYear({
  "sign": "scorpio",
  "name": "Scorpio",
  "hook": "*Scorpio,* | you can come | out now.",
  "hookPose": {
    "dx": -230,
    "dy": 180,
    "rot": -0.25,
    "mood": "squint",
    "look": [
      1,
      -0.5
    ],
    "s": 230
  },
  "leave": [
    "testing people",
    "the wall around everything"
  ],
  "keep": "all-in devotion",
  "quips": [
    {
      "t": 5.2,
      "text": "…fine. it goes.",
      "dx": 250,
      "dy": 120
    }
  ],
  "last": "Trust it *out loud*."
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
