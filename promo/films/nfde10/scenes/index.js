// nfde10: THE FIRST THREE DATES · Date 1 with a Water sign: what to ask (28 s vertical, star_advice, music: dreamy · Db).
// The format lives in nfde01/scenes/datekit.js (shared by nfde01–nfde12). Story 0–25.6, then the shared end card.
//   0.0   hook: "Date 1 with a Water sign." Cancer at the bench with YOU.
//   3.1   SKIP: the *ex* question. → the red SKIP stamp.   11.0 → TRY.
//   11.1  TRY: ask about *home.* Cancer: "my grandma. and her soup. can I tell you?"
//   19.3  the tip note (talk). THE STARS: "Ask *softly*. Listen *longer*."
import { makeDates } from '../../nfde01/scenes/datekit.js'

const EP = makeDates({
  "date": 1,
  "element": "Water",
  "sign": "cancer",
  "name": "Cancer",
  "set": "bench",
  "hookMood": "happy",
  "skipHead": "the *ex* question.",
  "skipSay": "so why did your last one end?",
  "skipReact": "…oh. um. long story.",
  "skipMood": "wide",
  "tryHead": "ask about *home.*",
  "trySay": "who makes you feel at home?",
  "tryReply": "my grandma. and her soup. can I tell you?",
  "stars": [
    "water signs open up *slowly*.",
    "ask warm. then *listen longer*."
  ],
  "tip": [
    "Keep the past for later.",
    "Ask warm questions.",
    "Listen more than talk."
  ],
  "tie": "talk",
  "card": "card-talk-5.png",
  "last": "Ask *softly*. Listen *longer*."
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
