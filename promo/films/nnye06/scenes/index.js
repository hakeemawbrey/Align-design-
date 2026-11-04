// nnye06: NEW YEAR, SAME HEART · Virgo: what I'm keeping (20 s vertical, star_advice, music: jazzy · A).
// The format lives in ../../nnye01/scenes/yearkit.js (shared by nnye01–nnye12). Story 0–15.6, then the shared end card.
//   0.0   hook: "*Virgo,* / the boxes are / already labeled."
//   2.4   LEAVING: "fixing people as a hobby" · "the 3 a.m. replay" (Virgo: "alphabetized.")
//   6.6   card cut → KEEPING: "noticing the little things", the gift box closes.
//   10.85 "New year. | Same *heart.*"  THE STARS: "Notice your *own* little things."
import { makeYear } from '../../nnye01/scenes/yearkit.js'

const EP = makeYear({
  "sign": "virgo",
  "name": "Virgo",
  "hook": "*Virgo,* | the boxes are | already labeled.",
  "hookPose": {
    "dx": 0,
    "dy": 0,
    "rot": 0,
    "mood": "squint",
    "look": [
      -1,
      1
    ]
  },
  "leave": [
    "fixing people as a hobby",
    "the 3 a.m. replay"
  ],
  "keep": "noticing the little things",
  "quips": [
    {
      "t": 5.2,
      "text": "alphabetized.",
      "dx": 250,
      "dy": 120
    }
  ],
  "last": "Notice your *own* little things."
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
