// og-nrke15: the social rework of nrke15, RANKING THE SIGNS, "Who gets cold first" (13.6 s story).
// Same board, cast and story (kit copy: ./rankkit.js); a static HOOK (box) from frame 0 instead of the question
// title, no series bug, crazier tags, and the film ends on THE STARS' last line.
//   0.0        HOOK: "Libra is cold. | *Indoors. In wool.*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 → #4 slam in.   6.8 #3 · 7.7 #2   8.5–9.3 drumroll → #1 Libra: "cold in two sweaters. indoors."
//   10.2       THE STARS: "Lend the hoodie. *Get it back* someday."
import { makeRank } from './rankkit.js'

export const HOOK = 'Libra is cold. | *Indoors. In wool.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.5

const EP = makeRank({
  id: 'og-nrke15',
  hook: '',
  ranks: [
    ["libra", "cold in two sweaters. indoors."],
    ["pisces", "cold, and crying about it"],
    ["taurus", "under five blankets. napping."],
    ["cancer", "already wearing your hoodie"],
    ["virgo", "packed you gloves. and spares."],
    ["gemini", "cold, hot, cold, hot, cold"],
    ["capricorn", "“I'm fine.” (visibly shivering)"],
    ["scorpio", "all black. still freezing."],
    ["leo", "no coat. it's a look."],
    ["aquarius", "cold-proof. nobody knows how."],
    ["sagittarius", "shorts. in December. thriving."],
    ["aries", "is the heater"],
  ],
  last: "Lend the hoodie. *Get it back* someday.",
})

export const DURATION = EP.DURATION
export const STORY_END = 13.6
export const SCENES = EP.SCENES
export const CUES = EP.CUES
