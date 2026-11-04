// nrke14: RANKING THE SIGNS, "Who dances first at the holiday party" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// house · C). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who dances first / at the *holiday party?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Capricorn → #4 Gemini slam in.   6.3 card cut.   6.8 #3 Aries · 7.7 #2 Sagittarius
//   8.5–9.3    drumroll → #1 Leo: "dancing before the music"
//   10.2       THE STARS: "Dance *when you're ready.* Nobody's grading."
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke14',
  hook: "Who dances first | at the *holiday party?*",
  ranks: [
    ["leo", "dancing before the music"],
    ["sagittarius", "started a conga line"],
    ["aries", "first on, last off"],
    ["gemini", "danced with everyone"],
    ["libra", "a graceful little sway"],
    ["pisces", "slow-danced, teary"],
    ["aquarius", "invented a new dance"],
    ["cancer", "danced in the kitchen"],
    ["taurus", "after the buffet"],
    ["scorpio", "one move. everyone saw."],
    ["virgo", "watched, then nailed it"],
    ["capricorn", "danced at 11:59"],
  ],
  last: "Dance *when you're ready.* Nobody's grading.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
