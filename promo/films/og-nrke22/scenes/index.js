// og-nrke22: social rework of nrke22, RANKING THE SIGNS "Who remembers the anniversary" (static outline HOOK over the empty
// board; no question title, no bug, no reveal shake/flash; the board and cast sit inside the full-frame safe zones; the
// film ends on THE STARS' line). The format lives in ./rankkit.js (an og copy of ../../nrke01/scenes/rankkit.js).
//   0.0        HOOK over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Sagittarius → #4 Virgo land.   6.8 #3 Scorpio · 7.7 #2 Cancer
//   8.5–9.3    drumroll → #1 Capricorn: "remembers the hour. and minute."
//   10.2       THE STARS: "Forgot a date? *Own it,* then plan something sweet."
import { makeRank } from './rankkit.js'

const EP = makeRank({
  id: 'og-nrke22',
  hook: "Who remembers | the *anniversary?*",
  ranks: [
    ["capricorn", "remembers the hour. and minute."],
    ["cancer", "remembers your outfit. and the soup."],
    ["scorpio", "remembers everything. forever."],
    ["virgo", "3 reminders and a backup alarm"],
    ["taurus", "same table, same order, every year"],
    ["libra", "planned dinner. four options."],
    ["pisces", "cries about it every single month"],
    ["leo", "throws a half-anniversary party"],
    ["aquarius", "celebrates a random Tuesday"],
    ["gemini", "remembers… two different dates"],
    ["aries", "remembered! (just now, at noon)"],
    ["sagittarius", "thinks every day is one, honestly"],
  ],
  last: "Forgot a date? *Own it,* then plan something sweet.",
})

export const HOOK = 'Anniversary today. | Who *remembers?*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.5

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
