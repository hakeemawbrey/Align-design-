// og-nfde02: social rework (crazier Leo: told the whole course you're funny, then made them clap). Same set, cast and story; static HOOK (box) from frame 0 instead
// of the animated title; no part sticker, bug, date pips, app chip or end card (kit copy ./datekit.js, the og social datekit). Was:
// nfde02: THE FIRST THREE DATES · Date 2 with a Fire sign: reading it (28 s vertical, star_advice, music: pop · G).
// The format lives in nfde01/scenes/datekit.js (shared by nfde01–nfde12). Story 0–25.6, then the shared end card.
//   0.0   hook: "Date 2 with a Fire sign." Leo at the golf with YOU.
//   3.1   SKIP: counting the *minutes.* → the red SKIP stamp.   11.0 → TRY.
//   11.1  TRY: watch how they *show up.* Leo: "and I told the whole course you’re funny!"
//   19.3  the tip note (pull). THE STARS: "If they’re hyping *you*, it’s going well."
import { makeDates } from './datekit.js'

const EP = makeDates({
  "date": 2,
  "element": "Fire",
  "sign": "leo",
  "name": "Leo",
  "set": "golf",
  "hookMood": "sparkle",
  "skipHead": "counting the *minutes.*",
  "skipSay": "they took 40 minutes to reply. is that bad?",
  "skipReact": "I was busy winning the mini golf. obviously.",
  "skipMood": "wide",
  "tryHead": "watch how they *show up.*",
  "trySay": "you planned the whole night?",
  "tryReply": "and I made the whole course clap for you!",
  "stars": [
    "fire shows interest *at full volume*.",
    "they planned it. they hyped you. *that’s* data."
  ],
  "tip": [
    "Notice the effort.",
    "Notice the hype.",
    "Not the reply time."
  ],
  "tie": "pull",
  "last": "If they’re hyping *you*, it’s going well."
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// og social cut: static hook caption from frame 0 (the kit's animated title is off in ./datekit.js, a social copy)
export const HOOK = "Counting minutes? | Leo *threw a parade.*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.0
