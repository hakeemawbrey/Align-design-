// nfde06: THE FIRST THREE DATES · Date 3 with an Earth sign: saying what you want (28 s vertical, star_advice, music: cinematic · Dm).
// The format lives in nfde01/scenes/datekit.js (shared by nfde01–nfde12). Story 0–25.6, then the shared end card.
//   0.0   hook: "Date 3 with an Earth sign." Capricorn at the kitchen with YOU.
//   3.1   SKIP: “let’s see where it *goes.*” → the red SKIP stamp.   11.0 → TRY.
//   11.1  TRY: say the pace you *want.* Capricorn: "good. me too. same time next week?"
//   19.3  the tip note (deal). THE STARS: "Say the plan *out loud*."
import { makeDates } from '../../nfde01/scenes/datekit.js'

const EP = makeDates({
  "date": 3,
  "element": "Earth",
  "sign": "capricorn",
  "name": "Capricorn",
  "set": "kitchen",
  "hookMood": "neutral",
  "skipHead": "“let’s see where it *goes.*”",
  "skipSay": "let’s just see where it goes, I guess?",
  "skipReact": "…for the fifth time?",
  "skipMood": "eyeroll",
  "tryHead": "say the pace you *want.*",
  "trySay": "I like where this is going. I’d like more of it.",
  "tryReply": "good. me too. same time next week?",
  "stars": [
    "earth signs like to know *where they stand*.",
    "say your pace. let them say *theirs*."
  ],
  "tip": [
    "Name what you want.",
    "Name your pace.",
    "Ask for theirs."
  ],
  "tie": "deal",
  "last": "Say the plan *out loud*."
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
