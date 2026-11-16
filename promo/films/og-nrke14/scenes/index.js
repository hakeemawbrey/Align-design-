// og-nrke14: the social rework of nrke14, RANKING THE SIGNS, "Who dances first at the holiday party" (13.6 s story).
// Same board, cast and story (kit copy: ./rankkit.js); a static HOOK (outline) from frame 0 instead of the question
// title, no series bug, crazier tags, and the film ends on THE STARS' last line.
//   0.0        HOOK: "Leo dances before | the *music starts.*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 → #4 slam in.   6.8 #3 · 7.7 #2   8.5–9.3 drumroll → #1 Leo: "dancing before the DJ arrived"
//   10.2       THE STARS: "Dance *when you're ready.* Nobody's grading."
import { makeRank } from './rankkit.js'

export const HOOK = 'Leo dances before | the *music starts.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.5

const EP = makeRank({
  id: 'og-nrke14',
  hook: '',
  ranks: [
    ["leo", "dancing before the DJ arrived"],
    ["sagittarius", "conga line out the front door"],
    ["aries", "first on, last off, zero breaks"],
    ["gemini", "danced with every single guest"],
    ["libra", "a perfect sway. every time."],
    ["pisces", "slow-dancing to a fast song, teary"],
    ["aquarius", "invented a dance. named it."],
    ["cancer", "dancing in the kitchen. alone."],
    ["taurus", "after the buffet. third plate."],
    ["scorpio", "one move. people still talk."],
    ["virgo", "watched for an hour, then nailed it"],
    ["capricorn", "danced at 11:59. one song."],
  ],
  last: "Dance *when you're ready.* Nobody's grading.",
})

export const DURATION = EP.DURATION
export const STORY_END = 13.6
export const SCENES = EP.SCENES
export const CUES = EP.CUES
