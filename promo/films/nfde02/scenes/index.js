// nfde02: THE FIRST THREE DATES · Date 2 with a Fire sign: reading it (30 s vertical, star_advice, music: pop · G).
// The format lives in nfde01/scenes/datekit.js (shared by nfde01–nfde12). Story 0–25.6, then the shared end card.
//   0.0   hook: "Date 2 with a Fire sign." Leo at the golf with YOU.
//   3.1   SKIP: counting the *minutes.* → the red SKIP stamp.   11.0 card cut.
//   11.1  TRY: watch how they *show up.* Leo: "and I told the whole course you’re funny!"
//   19.3  the tip note (pull). THE STARS: "If they’re hyping *you*, it’s going well."
import { makeDates } from '../../nfde01/scenes/datekit.js'

const EP = makeDates({
  "date": 2,
  "element": "Fire",
  "sign": "leo",
  "name": "Leo",
  "set": "golf",
  "hookMood": "sparkle",
  "skipHead": "counting the *minutes.*",
  "skipSay": "they took 40 minutes to reply. is that bad?",
  "skipReact": "I was at the mini golf!",
  "skipMood": "wide",
  "tryHead": "watch how they *show up.*",
  "trySay": "you planned the whole night?",
  "tryReply": "and I told the whole course you’re funny!",
  "stars": [
    "fire shows interest *out loud*.",
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
