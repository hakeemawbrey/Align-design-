// nrke02: RANKING THE SIGNS, "Who plans the date" (18 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// funk · E). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who plans / *the date?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Sagittarius → #4 Cancer slam in.   6.3 card cut.   6.8 #3 Libra · 7.7 #2 Virgo
//   8.5–9.3    drumroll → #1 Capricorn: "booked it in October"
//   10.2       THE STARS: "Best plan? *Taking turns* planning."
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke02',
  hook: "Who plans | *the date?*",
  ranks: [
    ["capricorn", "booked it in October"],
    ["virgo", "has a backup plan's backup"],
    ["libra", "picked the cutest spot"],
    ["cancer", "packed snacks for two"],
    ["taurus", "planned it around dinner"],
    ["leo", "planned the outfit first"],
    ["scorpio", "planned it. told no one."],
    ["aquarius", "invented a new kind of date"],
    ["aries", "“let's go. now.”"],
    ["gemini", "planned four, picked none"],
    ["pisces", "planned a vibe, cried at it"],
    ["sagittarius", "“we'll just wing it!”"],
  ],
  last: "Best plan? *Taking turns* planning.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
