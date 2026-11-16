// og-nnye04: OG social cut of nnye04 (static box HOOK 0–2.4 replaces the popped hook headline; no bug, flashes, shake or
// end-card fade; the sign pushed further in its tags and quip). Kit: ./yearkit.js (og copy of ../../nnye01/scenes/yearkit.js).
// Was: nnye04: NEW YEAR, SAME HEART · Cancer: what I'm keeping (18 s vertical, star_advice, music: dreamy · F).
// The format lives in ../../nnye01/scenes/yearkit.js (shared by nnye01–nnye12). Story 0–15.6, then the shared end card.
//   0.0   hook: "*Cancer,* / it’s your turn / to be looked after."
//   2.4   LEAVING: "caring for everyone but me" · "guessing what they feel" (Cancer: "is everyone ok?")
//   6.6   → KEEPING: "the open door", the gift box closes.
//   10.85 "New year. | Same *heart.*"  THE STARS: "Pour *yourself* a bowl too."
import { makeYear } from './yearkit.js'

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
    "soup for everyone but me",
    "reading minds (badly)"
  ],
  "keep": "the open door",
  "quips": [
    {
      "t": 5.2,
      "text": "is everyone ok? did you EAT?",
      "dx": 170,
      "dy": 120
    }
  ],
  "last": "Pour *yourself* a bowl too."
})
export const HOOK = "Cancer, who is | *looking after you?*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
