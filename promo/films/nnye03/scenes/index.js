// nnye03: NEW YEAR, SAME HEART · Gemini: what I'm keeping (18 s vertical, star_advice, music: chiptune · E).
// The format lives in ../../nnye01/scenes/yearkit.js (shared by nnye01–nnye12). Story 0–15.6, then the shared end card.
//   0.0   hook: "*Gemini,* / pick one tag. / Just one."
//   2.4   LEAVING: "a hundred unsent drafts" · "changing the subject when it’s real" (Gemini: "wait, one more draft")
//   6.6   → KEEPING: "the curiosity", the gift box closes.
//   10.85 "New year. | Same *heart.*"  THE STARS: "Every question. *Even* the hard one."
import { makeYear } from '../../nnye01/scenes/yearkit.js'

const EP = makeYear({
  "sign": "gemini",
  "name": "Gemini",
  "hook": "*Gemini,* | pick one tag. | Just one.",
  "hookPose": {
    "dx": 40,
    "dy": -30,
    "rot": 0.15,
    "mood": "happy",
    "look": [
      1,
      -1
    ]
  },
  "leave": [
    "a hundred unsent drafts",
    "changing the subject when it’s real"
  ],
  "keep": "the curiosity",
  "quips": [
    {
      "t": 5.2,
      "text": "wait, one more draft",
      "dx": 250,
      "dy": 120
    }
  ],
  "last": "Every question. *Even* the hard one."
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
