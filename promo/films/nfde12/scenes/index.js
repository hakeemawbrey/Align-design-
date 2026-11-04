// nfde12: THE FIRST THREE DATES · Date 3 with a Water sign: saying what you want (30 s vertical, star_advice, music: cinematic · Fm).
// The format lives in nfde01/scenes/datekit.js (shared by nfde01–nfde12). Story 0–25.6, then the shared end card.
//   0.0   hook: "Date 3 with a Water sign." Pisces at the hill with YOU.
//   3.1   SKIP: waiting for them to *read your mind.* → the red SKIP stamp.   11.0 card cut.
//   11.1  TRY: say it, *softly.* Pisces: "I really like you too. (happy tears)"
//   19.3  the tip note (deal). THE STARS: "Say it soft. *Mean* it."
import { makeDates } from '../../nfde01/scenes/datekit.js'

const EP = makeDates({
  "date": 3,
  "element": "Water",
  "sign": "pisces",
  "name": "Pisces",
  "set": "hill",
  "hookMood": "sparkle",
  "skipHead": "waiting for them to *read your mind.*",
  "skipSay": "(if they like me they’ll just… know.)",
  "skipReact": "are you ok? you’re quiet.",
  "skipMood": "wide",
  "tryHead": "say it, *softly.*",
  "trySay": "I really like you. how are you feeling?",
  "tryReply": "I really like you too. (happy tears)",
  "stars": [
    "water signs feel a lot. *say it anyway*.",
    "gentle and clear, then *ask theirs*."
  ],
  "tip": [
    "Say how you feel.",
    "Say it gently.",
    "Ask how they feel."
  ],
  "tie": "deal",
  "last": "Say it soft. *Mean* it.",
  "dateIsPisces": true,
  "youColor": "#9fe6b0"
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
