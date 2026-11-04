// nnye05: NEW YEAR, SAME HEART · Leo: what I'm keeping (20 s vertical, star_advice, music: funk · G).
// The format lives in ../../nnye01/scenes/yearkit.js (shared by nnye01–nnye12). Story 0–15.6, then the shared end card.
//   0.0   hook: "*Leo,* / the year’s last / curtain call."
//   2.4   LEAVING: "needing the applause" · "pretending I’m fine" (Leo: "…one small bow?")
//   6.6   card cut → KEEPING: "the big warm heart", the gift box closes.
//   10.85 "New year. | Same *heart.*"  THE STARS: "Shine. *Rest.* Repeat."
import { makeYear } from '../../nnye01/scenes/yearkit.js'

const EP = makeYear({
  "sign": "leo",
  "name": "Leo",
  "hook": "*Leo,* | the year’s last | curtain call.",
  "hookPose": {
    "dx": 0,
    "dy": -110,
    "rot": 0,
    "mood": "sparkle",
    "look": [
      0,
      0
    ],
    "s": 320
  },
  "leave": [
    "needing the applause",
    "pretending I’m fine"
  ],
  "keep": "the big warm heart",
  "quips": [
    {
      "t": 5.2,
      "text": "…one small bow?",
      "dx": 250,
      "dy": 120
    }
  ],
  "last": "Shine. *Rest.* Repeat."
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
