// nnye02: NEW YEAR, SAME HEART · Taurus: what I'm keeping (20 s vertical, star_advice, music: lofi · D).
// The format lives in ../../nnye01/scenes/yearkit.js (shared by nnye01–nnye12). Story 0–15.6, then the shared end card.
//   0.0   hook: "*Taurus,* / you can’t take / everything with you."
//   2.4   LEAVING: "holding grudges like heirlooms" · "the same order, every date" (Taurus: "do I HAVE to?")
//   6.6   card cut → KEEPING: "loyalty that shows up", the gift box closes.
//   10.85 "New year. | Same *heart.*"  THE STARS: "Same roots. *New* soil."
import { makeYear } from '../../nnye01/scenes/yearkit.js'

const EP = makeYear({
  "sign": "taurus",
  "name": "Taurus",
  "hook": "*Taurus,* | you can’t take | everything with you.",
  "hookPose": {
    "dx": 0,
    "dy": 0,
    "rot": -0.1,
    "mood": "squint",
    "look": [
      0,
      1
    ]
  },
  "leave": [
    "holding grudges like heirlooms",
    "the same order, every date"
  ],
  "keep": "loyalty that shows up",
  "quips": [
    {
      "t": 5.2,
      "text": "do I HAVE to?",
      "dx": 250,
      "dy": 120
    }
  ],
  "last": "Same roots. *New* soil."
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
