// og-nrke05: the social rework of nrke05 (RANKING THE SIGNS, star_advice). Same board, cast, order and payoff; static HOOK
// caption (box) from frame 0 instead of the animated question title, every tag pushed to the extreme, no series bug.
// The kit is this folder's own copy (scenes/rankkit.js) of nrke01's rankkit.js, laid out for the full-frame safe zones.
// Original notes:
// nrke05: RANKING THE SIGNS, "Who remembers your coffee order" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// lofi · Dm). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who remembers / your *coffee order?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Sagittarius → #4 Scorpio slam in.   6.3 card cut.   6.8 #3 Taurus · 7.7 #2 Cancer
//   8.5–9.3    drumroll → #1 Virgo: "and the exact temperature"
//   10.2       THE STARS: "Little details are *big love.*"
import { makeRank } from './rankkit.js'

const EP = makeRank({
  id: 'og-nrke05',
  hook: '',   // og: the film's own title is gone; the static HOOK below owns the top
  ranks: [
    ["virgo", "and the foam height, in mm"],
    ["cancer", "and your whole family's"],
    ["taurus", "and the pastry. bought two."],
    ["scorpio", "and the one you hate. noted."],
    ["libra", "brought your favorite mug"],
    ["capricorn", "on your desk at 7:00:00 AM"],
    ["leo", "ordered you THEIR favorite"],
    ["gemini", "remembered someone else's"],
    ["pisces", "got it right, burst into tears"],
    ["aquarius", "remembers your rising sign"],
    ["aries", "“got you juice. it's faster.”"],
    ["sagittarius", "brought a smoothie from abroad"],
  ],
  last: "Little details are *big love.*",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0
export const HOOK = "Knows your coffee | order? *Keeper.*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.5
