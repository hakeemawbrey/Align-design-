// nfde05: THE FIRST THREE DATES · Date 2 with an Earth sign: reading it (30 s vertical, star_advice, music: jazzy · Bb).
// The format lives in nfde01/scenes/datekit.js (shared by nfde01–nfde12). Story 0–25.6, then the shared end card.
//   0.0   hook: "Date 2 with an Earth sign." Virgo at the farm with YOU.
//   3.1   SKIP: reading calm as *cold.* → the red SKIP stamp.   11.0 card cut.
//   11.1  TRY: look for the *details.* Virgo: "oat, no foam. and I found that book you mentioned."
//   19.3  the tip note (pull). THE STARS: "Earth signs say it in *details*."
import { makeDates } from '../../nfde01/scenes/datekit.js'

const EP = makeDates({
  "date": 2,
  "element": "Earth",
  "sign": "virgo",
  "name": "Virgo",
  "set": "farm",
  "hookMood": "squint",
  "skipHead": "reading calm as *cold.*",
  "skipSay": "they’re so calm. maybe they’re bored?",
  "skipReact": "(I am having a great time.)",
  "skipMood": "neutral",
  "tryHead": "look for the *details.*",
  "trySay": "wait. you remembered my coffee order?",
  "tryReply": "oat, no foam. and I found that book you mentioned.",
  "stars": [
    "earth signs show care in *small things*.",
    "remembering is how they *flirt*."
  ],
  "tip": [
    "Calm isn’t cold.",
    "Look for what they",
    "remembered."
  ],
  "tie": "pull",
  "last": "Earth signs say it in *details*."
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
