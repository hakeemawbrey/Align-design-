// nrke15: RANKING THE SIGNS, "Who gets cold first" (18 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// dreamy · Ab). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who gets / *cold* first?" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Aries → #4 Cancer slam in.   6.3 card cut.   6.8 #3 Taurus · 7.7 #2 Pisces
//   8.5–9.3    drumroll → #1 Libra: "cold in a sweater, indoors"
//   10.2       THE STARS: "Lend the hoodie. *Get it back* someday."
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke15',
  hook: "Who gets | *cold* first?",
  ranks: [
    ["libra", "cold in a sweater, indoors"],
    ["pisces", "cold and a little teary"],
    ["taurus", "under three blankets"],
    ["cancer", "already in your hoodie"],
    ["virgo", "packed gloves for you"],
    ["gemini", "cold, hot, cold again"],
    ["capricorn", "“I'm fine.” (shivering)"],
    ["scorpio", "all black. still cold."],
    ["leo", "it's a fashion choice"],
    ["aquarius", "cold-proof, somehow"],
    ["sagittarius", "in shorts. in December."],
    ["aries", "is the heater"],
  ],
  last: "Lend the hoodie. *Get it back* someday.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
