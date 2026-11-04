// nrke05: RANKING THE SIGNS, "Who remembers your coffee order" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// lofi · Dm). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who remembers / your *coffee order?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Sagittarius → #4 Scorpio slam in.   6.3 card cut.   6.8 #3 Taurus · 7.7 #2 Cancer
//   8.5–9.3    drumroll → #1 Virgo: "and the exact temperature"
//   10.2       THE STARS: "Little details are *big love.*"
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke05',
  hook: "Who remembers | your *coffee order?*",
  ranks: [
    ["virgo", "and the exact temperature"],
    ["cancer", "and your mom's order too"],
    ["taurus", "and the pastry you like"],
    ["scorpio", "and the one you hate"],
    ["libra", "and your favorite mug"],
    ["capricorn", "ordered it at 7 AM sharp"],
    ["leo", "ordered you their favorite"],
    ["gemini", "remembered someone's order"],
    ["pisces", "cried when they got it right"],
    ["aquarius", "remembers your star chart"],
    ["aries", "“coffee? got you juice!”"],
    ["sagittarius", "brought you a smoothie?"],
  ],
  last: "Little details are *big love.*",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
