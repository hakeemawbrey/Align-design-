// nrke13: RANKING THE SIGNS, "Who hogs the blanket" (18 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// funk · A). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who hogs / the *blanket?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Aquarius → #4 Scorpio slam in.   6.3 card cut.   6.8 #3 Leo · 7.7 #2 Cancer
//   8.5–9.3    drumroll → #1 Taurus: "a full blanket burrito"
//   10.2       THE STARS: "Cold? *Say so.* Then share the blanket."
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke13',
  hook: "Who hogs | the *blanket?*",
  ranks: [
    ["taurus", "a full blanket burrito"],
    ["cancer", "took it, then tucked you in"],
    ["leo", "wears it like a cape"],
    ["scorpio", "it's theirs now."],
    ["pisces", "cries into it. it's damp."],
    ["gemini", "steals it mid-story"],
    ["sagittarius", "kicks it off, steals it back"],
    ["libra", "shares it… mostly"],
    ["capricorn", "brought their own blanket"],
    ["virgo", "folds your side neatly"],
    ["aries", "too warm for blankets"],
    ["aquarius", "runs hot, gives it all"],
  ],
  last: "Cold? *Say so.* Then share the blanket.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
