// nrke23: RANKING THE SIGNS, "Who gets the most excited for snow" (18 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// dreamy · C). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who gets the most / excited for *snow?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Scorpio → #4 Gemini slam in.   6.3 card cut.   6.8 #3 Aries · 7.7 #2 Pisces
//   8.5–9.3    drumroll → #1 Sagittarius: "outside before it lands"
//   10.2       THE STARS: "Find someone who's *that excited* to see you."
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke23',
  hook: "Who gets the most | excited for *snow?*",
  ranks: [
    ["sagittarius", "outside before it lands"],
    ["pisces", "snow angel, happy tears"],
    ["aries", "snowball fight. now."],
    ["gemini", "texted everyone: SNOW"],
    ["leo", "a dramatic snow photoshoot"],
    ["cancer", "made cocoa for the street"],
    ["aquarius", "studied one snowflake"],
    ["libra", "the perfect winter outfit"],
    ["taurus", "watches from the window"],
    ["virgo", "already shoveled"],
    ["capricorn", "checked the commute"],
    ["scorpio", "likes the quiet"],
  ],
  last: "Find someone who's *that excited* to see you.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
