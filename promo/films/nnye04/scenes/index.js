// nnye04: NEW YEAR, SAME HEART · Cancer: what I'm keeping (20 s vertical, star_advice, music: dreamy · F).
// The format lives in ../../nnye01/scenes/yearkit.js (shared by nnye01–nnye12). Story 0–15.6, then the shared end card.
//   0.0   hook: "*Cancer,* / it’s your turn / to be looked after."
//   2.4   LEAVING: "caring for everyone but me" · "guessing what they feel" (Cancer: "is everyone ok?")
//   6.6   card cut → KEEPING: "the open door", the gift box closes.
//   10.85 "New year. | Same *heart.*"  THE STARS: "Pour *yourself* a bowl too."
import { makeYear } from '../../nnye01/scenes/yearkit.js'

const EP = makeYear({
  "sign": "cancer",
  "name": "Cancer",
  "hook": "*Cancer,* | it’s your turn | to be looked after.",
  "hookPose": {
    "dx": 0,
    "dy": 20,
    "rot": -0.08,
    "mood": "sparkle",
    "look": [
      1,
      0.6
    ]
  },
  "leave": [
    "caring for everyone but me",
    "guessing what they feel"
  ],
  "keep": "the open door",
  "quips": [
    {
      "t": 5.2,
      "text": "is everyone ok?",
      "dx": 250,
      "dy": 120
    }
  ],
  "last": "Pour *yourself* a bowl too."
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
