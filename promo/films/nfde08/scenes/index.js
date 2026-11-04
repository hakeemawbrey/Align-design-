// nfde08: THE FIRST THREE DATES · Date 2 with an Air sign: reading it (30 s vertical, star_advice, music: dreamy · Eb).
// The format lives in nfde01/scenes/datekit.js (shared by nfde01–nfde12). Story 0–25.6, then the shared end card.
//   0.0   hook: "Date 2 with an Air sign." Libra at the gallery with YOU.
//   3.1   SKIP: over-reading *one* text. → the red SKIP stamp.   11.0 card cut.
//   11.1  TRY: listen for the *next plan.* Libra: "loved it. we should see the night show next!"
//   19.3  the tip note (pull). THE STARS: "The *next* plan is the message."
import { makeDates } from '../../nfde01/scenes/datekit.js'

const EP = makeDates({
  "date": 2,
  "element": "Air",
  "sign": "libra",
  "name": "Libra",
  "set": "gallery",
  "hookMood": "sparkle",
  "skipHead": "over-reading *one* text.",
  "skipSay": "they replied “haha.” just “haha.” what does it MEAN",
  "skipReact": "(it meant haha.)",
  "skipMood": "neutral",
  "tryHead": "listen for the *next plan.*",
  "trySay": "you liked this place?",
  "tryReply": "loved it. we should see the night show next!",
  "stars": [
    "air signs flirt by *planning the next one*.",
    "“we should…” is a *good* sign."
  ],
  "tip": [
    "One text isn’t a verdict.",
    "Listen for “we should…”",
    "That’s the interest."
  ],
  "tie": "pull",
  "last": "The *next* plan is the message."
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
