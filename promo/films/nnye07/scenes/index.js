// nnye07: NEW YEAR, SAME HEART · Libra: what I'm keeping (18 s vertical, star_advice, music: synthwave · Bb).
// The format lives in ../../nnye01/scenes/yearkit.js (shared by nnye01–nnye12). Story 0–15.6, then the shared end card.
//   0.0   hook: "*Libra,* / which box? / (You can choose.)"
//   2.4   LEAVING: "“whatever you want”" · "keeping the peace, losing me" (Libra: "um. both?")
//   6.6   → KEEPING: "the charm", the gift box closes.
//   10.85 "New year. | Same *heart.*"  THE STARS: "Your want counts *too*."
import { makeYear } from '../../nnye01/scenes/yearkit.js'

const EP = makeYear({
  "sign": "libra",
  "name": "Libra",
  "hook": "*Libra,* | which box? | (You can choose.)",
  "hookPose": {
    "dx": 0,
    "dy": 0,
    "rot": 0.12,
    "mood": "wide",
    "look": [
      -1,
      0.5
    ]
  },
  "leave": [
    "“whatever you want”",
    "keeping the peace, losing me"
  ],
  "keep": "the charm",
  "quips": [
    {
      "t": 5.2,
      "text": "um. both?",
      "dx": 250,
      "dy": 120
    }
  ],
  "last": "Your want counts *too*."
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
