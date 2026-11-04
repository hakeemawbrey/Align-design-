// nrke20: RANKING THE SIGNS, "Who's the best listener" (18 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// lofi · Gm). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who's the / best *listener?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Aries → #4 Virgo slam in.   6.3 card cut.   6.8 #3 Pisces · 7.7 #2 Cancer
//   8.5–9.3    drumroll → #1 Scorpio: "remembers every word"
//   10.2       THE STARS: "Listening isn't fixing. *It's staying.*"
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke20',
  hook: "Who's the | best *listener?*",
  ranks: [
    ["scorpio", "remembers every word"],
    ["cancer", "listens with snacks"],
    ["pisces", "listens and cries with you"],
    ["virgo", "takes mental notes"],
    ["libra", "nods at the right parts"],
    ["taurus", "patient, never rushes you"],
    ["capricorn", "listens, then fixes it"],
    ["aquarius", "listens, asks why"],
    ["sagittarius", "listens, plans a trip"],
    ["leo", "listens, relates it to Leo"],
    ["gemini", "listening! (and talking)"],
    ["aries", "listening… at full speed"],
  ],
  last: "Listening isn't fixing. *It's staying.*",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
