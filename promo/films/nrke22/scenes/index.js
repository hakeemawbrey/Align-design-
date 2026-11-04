// nrke22: RANKING THE SIGNS, "Who remembers the anniversary" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// cinematic · Dm). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who remembers / the *anniversary?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Sagittarius → #4 Virgo slam in.   6.3 card cut.   6.8 #3 Scorpio · 7.7 #2 Cancer
//   8.5–9.3    drumroll → #1 Capricorn: "remembers the hour"
//   10.2       THE STARS: "Forgot a date? *Own it,* then plan something sweet."
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke22',
  hook: "Who remembers | the *anniversary?*",
  ranks: [
    ["capricorn", "remembers the hour"],
    ["cancer", "remembers what you wore"],
    ["scorpio", "remembers everything"],
    ["virgo", "set three reminders"],
    ["taurus", "booked the same table"],
    ["libra", "planned a cute dinner"],
    ["pisces", "cries on it every month"],
    ["leo", "celebrates the half one"],
    ["aquarius", "celebrates a random day"],
    ["gemini", "remembers… two dates"],
    ["aries", "remembered! (today)"],
    ["sagittarius", "every day's an anniversary"],
  ],
  last: "Forgot a date? *Own it,* then plan something sweet.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
