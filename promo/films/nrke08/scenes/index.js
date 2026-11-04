// nrke08: RANKING THE SIGNS, "Who apologizes first" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// cinematic · Cm). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who says / *sorry* first?" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Scorpio → #4 Virgo slam in.   6.3 card cut.   6.8 #3 Cancer · 7.7 #2 Pisces
//   8.5–9.3    drumroll → #1 Libra: "apologized for your mistake"
//   10.2       THE STARS: "Saying sorry first isn't *losing.*"
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke08',
  hook: "Who says | *sorry* first?",
  ranks: [
    ["libra", "apologized for your mistake"],
    ["pisces", "apologized mid-cry"],
    ["cancer", "with a homemade card"],
    ["virgo", "a detailed, fair apology"],
    ["gemini", "sorry sorry sorry sorry"],
    ["sagittarius", "with a joke, then for real"],
    ["aquarius", "after explaining the logic"],
    ["taurus", "after a snack and a nap"],
    ["aries", "fast and very loud"],
    ["capricorn", "drafted it, then said it"],
    ["leo", "after a dramatic pause"],
    ["scorpio", "eventually. sincerely."],
  ],
  last: "Saying sorry first isn't *losing.*",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
