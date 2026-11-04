// nrke11: RANKING THE SIGNS, "Who falls the fastest" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// synthwave · F#m). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who falls / the *fastest?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Capricorn → #4 Aries slam in.   6.3 card cut.   6.8 #3 Leo · 7.7 #2 Libra
//   8.5–9.3    drumroll → #1 Pisces: "fell at “hello.” teared up."
//   10.2       THE STARS: "Fall at *your own* pace."
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke11',
  hook: "Who falls | the *fastest?*",
  ranks: [
    ["pisces", "fell at “hello.” teared up."],
    ["libra", "fell at a nice laugh"],
    ["leo", "fell at the first compliment"],
    ["aries", "fell mid-sentence"],
    ["cancer", "already named the dog"],
    ["gemini", "fell, then fell again"],
    ["sagittarius", "fell on an adventure"],
    ["aquarius", "fell for their brain"],
    ["taurus", "falls slow, stays forever"],
    ["virgo", "fell after a full review"],
    ["scorpio", "fell. won't admit it."],
    ["capricorn", "fell in Q3"],
  ],
  last: "Fall at *your own* pace.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
