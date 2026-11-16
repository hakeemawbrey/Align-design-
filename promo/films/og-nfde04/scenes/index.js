// og-nfde04: social rework (crazier Taurus: mid-croissant through the whole quiz, then a second loaf). Same set, cast and story; static HOOK (box) from frame 0 instead
// of the animated title; no part sticker, bug, date pips, app chip or end card (kit copy ./datekit.js). Was:
// nfde04: THE FIRST THREE DATES · Date 1 with an Earth sign: what to ask (28 s vertical, star_advice, music: lofi · F).
// The format lives in nfde01/scenes/datekit.js (shared by nfde01–nfde12). Story 0–25.6, then the shared end card.
//   0.0   hook: "Date 1 with an Earth sign." Taurus at the cafe with YOU.
//   3.1   SKIP: the rapid-fire *quiz.* → the red SKIP stamp.   11.0 → TRY.
//   11.1  TRY: ask about their *comforts.* Taurus: "oh. fresh bread, a long walk, no alarms…"
//   19.3  the tip note (talk). THE STARS: "Ask about their *Sunday*."
import { makeDates } from './datekit.js'

const EP = makeDates({
  "date": 1,
  "element": "Earth",
  "sign": "taurus",
  "name": "Taurus",
  "set": "cafe",
  "hookMood": "sparkle",
  "skipHead": "the rapid-fire *quiz.*",
  "skipSay": "fave color? movie? number? blood type? GO",
  "skipReact": "…I have not stopped chewing since question one.",
  "skipMood": "eyeroll",
  "tryHead": "ask about their *comforts.*",
  "trySay": "what’s your perfect slow Sunday?",
  "tryReply": "oh. fresh bread, a nap, then more fresh bread…",
  "stars": [
    "earth signs open up about *real comforts*.",
    "slow questions get *real* answers."
  ],
  "tip": [
    "Slow down the pace.",
    "Ask about comforts.",
    "Let the pauses be."
  ],
  "tie": "talk",
  "card": "card-talk-4.png",
  "last": "Ask about their *Sunday*."
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const HOOK = "Quizzed a Taurus | mid-*croissant.*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.0
