// nrke16: RANKING THE SIGNS, "Who's best at meeting the family" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// pop · E). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who's best at / *meeting the family?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Aries → #4 Virgo slam in.   6.3 card cut.   6.8 #3 Capricorn · 7.7 #2 Libra
//   8.5–9.3    drumroll → #1 Cancer: "helped cook dinner"
//   10.2       THE STARS: "Nervous? Just *be you.* That's who they're meeting."
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke16',
  hook: "Who's best at | *meeting the family?*",
  ranks: [
    ["cancer", "helped cook dinner"],
    ["libra", "charmed every aunt"],
    ["capricorn", "talked shop with Grandpa"],
    ["virgo", "brought a perfect pie"],
    ["taurus", "complimented the cooking"],
    ["leo", "the life of the dinner"],
    ["gemini", "talked to every cousin"],
    ["pisces", "cried at the baby photos"],
    ["sagittarius", "a very long travel story"],
    ["scorpio", "quiet. noticed everything."],
    ["aquarius", "debated the uncle, kindly"],
    ["aries", "raced the cousins"],
  ],
  last: "Nervous? Just *be you.* That's who they're meeting.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
