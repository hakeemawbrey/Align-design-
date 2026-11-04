// nfde07: THE FIRST THREE DATES · Date 1 with an Air sign: what to ask (28 s vertical, star_advice, music: synthwave · G).
// The format lives in nfde01/scenes/datekit.js (shared by nfde01–nfde12). Story 0–25.6, then the shared end card.
//   0.0   hook: "Date 1 with an Air sign." Gemini at the books with YOU.
//   3.1   SKIP: weather and *commute.* → the red SKIP stamp.   11.0 → TRY.
//   11.1  TRY: ask a question that *plays.* Gemini: "the history of tiny hats. hear me out—"
//   19.3  the tip note (talk). THE STARS: "Ask the question that *plays*."
import { makeDates } from '../../nfde01/scenes/datekit.js'

const EP = makeDates({
  "date": 1,
  "element": "Air",
  "sign": "gemini",
  "name": "Gemini",
  "set": "books",
  "hookMood": "happy",
  "skipHead": "weather and *commute.*",
  "skipSay": "so… cold out today, huh?",
  "skipReact": "*polite nod* …very cold.",
  "skipMood": "sleepy",
  "tryHead": "ask a question that *plays.*",
  "trySay": "if you taught one class, what would it be?",
  "tryReply": "the history of tiny hats. hear me out—",
  "stars": [
    "air signs light up for *ideas*.",
    "a playful question is a *door*."
  ],
  "tip": [
    "Skip the small talk.",
    "Ask a playful question.",
    "Follow the tangent."
  ],
  "tie": "talk",
  "card": "card-talk-2.png",
  "last": "Ask the question that *plays*."
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
