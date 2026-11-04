// nfde03: THE FIRST THREE DATES · Date 3 with a Fire sign: saying what you want (30 s vertical, star_advice, music: house · A).
// The format lives in nfde01/scenes/datekit.js (shared by nfde01–nfde12). Story 0–25.6, then the shared end card.
//   0.0   hook: "Date 3 with a Fire sign." Sagittarius at the trail with YOU.
//   3.1   SKIP: hinting for *weeks.* → the red SKIP stamp.   11.0 card cut.
//   11.1  TRY: say it *plainly.* Sagittarius: "finally, someone says it out loud!"
//   19.3  the tip note (deal). THE STARS: "Say it *straight*. Fire respects it."
import { makeDates } from '../../nfde01/scenes/datekit.js'

const EP = makeDates({
  "date": 3,
  "element": "Fire",
  "sign": "sagittarius",
  "name": "Sagittarius",
  "set": "trail",
  "hookMood": "happy",
  "skipHead": "hinting for *weeks.*",
  "skipSay": "so… haha… what are we… like… doing… haha",
  "skipReact": "doing? hiking?",
  "skipMood": "neutral",
  "tryHead": "say it *plainly.*",
  "trySay": "I’m looking for something real. you?",
  "tryReply": "finally, someone says it out loud!",
  "stars": [
    "fire signs trust *straight talk*.",
    "say what you want, then *ask theirs*."
  ],
  "tip": [
    "Say what you want.",
    "Ask what they want.",
    "Both answers are ok."
  ],
  "tie": "deal",
  "last": "Say it *straight*. Fire respects it."
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
