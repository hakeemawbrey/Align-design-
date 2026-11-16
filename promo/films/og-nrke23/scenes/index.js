// og-nrke23: social rework of nrke23, RANKING THE SIGNS "Who gets the most excited for snow" (static box HOOK over the
// empty board; no question title, no bug, no reveal shake/flash; the board and cast sit inside the full-frame safe
// zones; the film ends on THE STARS' line). The format lives in ./rankkit.js (an og copy of ../../nrke01/scenes/rankkit.js).
//   0.0        HOOK over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Scorpio → #4 Gemini land.   6.8 #3 Aries · 7.7 #2 Pisces
//   8.5–9.3    drumroll → #1 Sagittarius: "outside before the first flake"
//   10.2       THE STARS: "Find someone who's *that excited* to see you."
import { makeRank } from './rankkit.js'

const EP = makeRank({
  id: 'og-nrke23',
  hook: "Who gets the most | excited for *snow?*",
  ranks: [
    ["sagittarius", "outside before the first flake"],
    ["pisces", "snow angel, sobbing with joy"],
    ["aries", "snowball fight. in pyjamas."],
    ["gemini", "texted all 40 contacts: SNOW"],
    ["leo", "a three-outfit snow photoshoot"],
    ["cancer", "made cocoa for the whole street"],
    ["aquarius", "named one snowflake. Gerald."],
    ["libra", "styled a scarf for the snowman"],
    ["taurus", "blanket, window, zero movement"],
    ["virgo", "shoveled. then shoveled again."],
    ["capricorn", "rescheduled the commute twice"],
    ["scorpio", "likes the quiet. don't talk."],
  ],
  last: "Find someone who's *that excited* to see you.",
})

export const HOOK = 'First snow. | Who loses it *first?*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.5

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
