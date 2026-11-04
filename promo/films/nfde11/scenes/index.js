// nfde11: THE FIRST THREE DATES · Date 2 with a Water sign: reading it (30 s vertical, star_advice, music: screwed · Ebm).
// The format lives in nfde01/scenes/datekit.js (shared by nfde01–nfde12). Story 0–25.6, then the shared end card.
//   0.0   hook: "Date 2 with a Water sign." Scorpio at the lake with YOU.
//   3.1   SKIP: pushing for the *whole story.* → the red SKIP stamp.   11.0 card cut.
//   11.1  TRY: notice the *small* opening. Scorpio: "not really. it felt ok to tell you."
//   19.3  the tip note (pull). THE STARS: "A *little* open is a lot."
import { makeDates } from '../../nfde01/scenes/datekit.js'

const EP = makeDates({
  "date": 2,
  "element": "Water",
  "sign": "scorpio",
  "name": "Scorpio",
  "set": "lake",
  "hookMood": "squint",
  "skipHead": "pushing for the *whole story.*",
  "skipSay": "tell me everything. like. EVERYTHING.",
  "skipReact": "…maybe not tonight.",
  "skipMood": "squint",
  "tryHead": "notice the *small* opening.",
  "trySay": "you’ve never told anyone that?",
  "tryReply": "not really. it felt ok to tell you.",
  "stars": [
    "for water signs, *one true thing* is big.",
    "that’s trust starting. *don’t rush it*."
  ],
  "tip": [
    "Don’t push.",
    "Notice what they share.",
    "Keep it safe with you."
  ],
  "tie": "pull",
  "last": "A *little* open is a lot."
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
