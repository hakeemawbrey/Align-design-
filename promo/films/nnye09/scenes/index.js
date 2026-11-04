// nnye09: NEW YEAR, SAME HEART · Sagittarius: what I'm keeping (18 s vertical, star_advice, music: house · Db).
// The format lives in ../../nnye01/scenes/yearkit.js (shared by nnye01–nnye12). Story 0–15.6, then the shared end card.
//   0.0   hook: "*Sagittarius,* / packing light / for the new year?"
//   2.4   LEAVING: "jokes when it gets real" · "maybe-plans" (Sagittarius: "haha anyway—")
//   6.6   → KEEPING: "the honesty", the gift box closes.
//   10.85 "New year. | Same *heart.*"  THE STARS: "Say the real thing. *Then* the joke."
import { makeYear } from '../../nnye01/scenes/yearkit.js'

const EP = makeYear({
  "sign": "sagittarius",
  "name": "Sagittarius",
  "hook": "*Sagittarius,* | packing light | for the new year?",
  "hookPose": {
    "dx": 60,
    "dy": -10,
    "rot": 0.18,
    "mood": "happy",
    "look": [
      1,
      -0.4
    ]
  },
  "leave": [
    "jokes when it gets real",
    "maybe-plans"
  ],
  "keep": "the honesty",
  "quips": [
    {
      "t": 5.2,
      "text": "haha anyway—",
      "dx": 250,
      "dy": 120
    }
  ],
  "last": "Say the real thing. *Then* the joke."
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
