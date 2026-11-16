// og-nnye03: OG social cut of nnye03 (static outline HOOK 0–2.4 replaces the popped hook headline; no bug, flashes, shake or
// end-card fade; the sign pushed further in its tags and quip). Kit: ./yearkit.js (og copy of ../../nnye01/scenes/yearkit.js).
// Was: nnye03: NEW YEAR, SAME HEART · Gemini: what I'm keeping (18 s vertical, star_advice, music: chiptune · E).
// The format lives in ../../nnye01/scenes/yearkit.js (shared by nnye01–nnye12). Story 0–15.6, then the shared end card.
//   0.0   hook: "*Gemini,* / pick one tag. / Just one."
//   2.4   LEAVING: "a hundred unsent drafts" · "changing the subject when it’s real" (Gemini: "wait, one more draft")
//   6.6   → KEEPING: "the curiosity", the gift box closes.
//   10.85 "New year. | Same *heart.*"  THE STARS: "Every question. *Even* the hard one."
import { makeYear } from './yearkit.js'

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
    "draft 101 of “hey so…”",
    "“anyway!!” when it gets real"
  ],
  "keep": "the curiosity",
  "quips": [
    {
      "t": 5.2,
      "text": "wait. one more draft. or ten.",
      "dx": 170,
      "dy": 120
    }
  ],
  "last": "Every question. *Even* the hard one."
})
export const HOOK = "Gemini has 100 | *unsent drafts.*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.4
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
