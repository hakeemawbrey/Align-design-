// nfde01: THE FIRST THREE DATES · Date 1 with a Fire sign: what to ask (28 s vertical, star_advice, music: funk · E).
// The format lives in nfde01/scenes/datekit.js (shared by nfde01–nfde12). Story 0–25.6, then the shared end card.
//   0.0   hook: "Date 1 with a Fire sign." Aries at the market with YOU.
//   3.1   SKIP: the job *interview.* → the red SKIP stamp.   11.0 → TRY.
//   11.1  TRY: ask what *excites* them. Aries: "OK SO. I’m learning to surf AND—"
//   19.3  the tip note (talk). THE STARS: "Ask what *lights* them up."
import { makeDates } from './datekit.js'

const EP = makeDates({
  "date": 1,
  "element": "Fire",
  "sign": "aries",
  "name": "Aries",
  "set": "market",
  "hookMood": "happy",
  "skipHead": "the job *interview.*",
  "skipSay": "so… where do you see yourself in five years?",
  "skipReact": "*yawn* …next question?",
  "skipMood": "sleepy",
  "tryHead": "ask what *excites* them.",
  "trySay": "what are you excited about right now?",
  "tryReply": "OK SO. I’m learning to surf AND—",
  "stars": [
    "fire signs love talking about *what’s next*.",
    "ask about the spark, then *listen*."
  ],
  "tip": [
    "Ask about what’s next.",
    "Match their energy.",
    "Save the résumé talk."
  ],
  "tie": "talk",
  "card": "card-talk-1.png",
  "last": "Ask what *lights* them up."
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
