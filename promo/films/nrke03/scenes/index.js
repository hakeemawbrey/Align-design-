// nrke03: RANKING THE SIGNS, "Who cries at the movie" (18 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// pop · C). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who cries / *at the movie?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Capricorn → #4 Taurus slam in.   6.3 card cut.   6.8 #3 Libra · 7.7 #2 Cancer
//   8.5–9.3    drumroll → #1 Pisces: "cried at the trailer"
//   10.2       THE STARS: "Soft *heart,* strong person."
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke03',
  hook: "Who cries | *at the movie?*",
  ranks: [
    ["pisces", "cried at the trailer"],
    ["cancer", "cried in the ticket line"],
    ["libra", "cried at the slow dance"],
    ["taurus", "cried when the dog was fine"],
    ["leo", "cried, looked great doing it"],
    ["virgo", "cried at a plot hole"],
    ["gemini", "cried, then texted about it"],
    ["sagittarius", "cried laughing, mostly"],
    ["scorpio", "one tear. denies it."],
    ["aries", "cried at the car chase"],
    ["aquarius", "cried for the robot"],
    ["capricorn", "cried at home, in private"],
  ],
  last: "Soft *heart,* strong person.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
