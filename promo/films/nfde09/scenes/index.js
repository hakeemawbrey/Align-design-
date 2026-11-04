// nfde09: THE FIRST THREE DATES · Date 3 with an Air sign: saying what you want (30 s vertical, star_advice, music: chiptune · C).
// The format lives in nfde01/scenes/datekit.js (shared by nfde01–nfde12). Story 0–25.6, then the shared end card.
//   0.0   hook: "Date 3 with an Air sign." Aquarius at the dome with YOU.
//   3.1   SKIP: the big *speech.* → the red SKIP stamp.   11.0 card cut.
//   11.1  TRY: say it *light.* Aquarius: "yes. thank you for not making it weird."
//   19.3  the tip note (deal). THE STARS: "Honest, *and* no pressure."
import { makeDates } from '../../nfde01/scenes/datekit.js'

const EP = makeDates({
  "date": 3,
  "element": "Air",
  "sign": "aquarius",
  "name": "Aquarius",
  "set": "dome",
  "hookMood": "wide",
  "skipHead": "the big *speech.*",
  "skipSay": "I wrote a speech. it has three parts. part one:",
  "skipReact": "…is there a part two?",
  "skipMood": "wide",
  "tryHead": "say it *light.*",
  "trySay": "I like this. no rush. do you?",
  "tryReply": "yes. thank you for not making it weird.",
  "stars": [
    "air signs need *room to breathe*.",
    "honest and light beats *big and heavy*."
  ],
  "tip": [
    "Keep it short.",
    "Say what you feel.",
    "Leave room to answer."
  ],
  "tie": "deal",
  "last": "Honest, *and* no pressure."
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
