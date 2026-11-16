// og-nrke13: the social rework of nrke13, RANKING THE SIGNS, "Who hogs the blanket" (13.6 s story).
// Same board, cast and story (kit copy: ./rankkit.js); a static HOOK (box) from frame 0 instead of the question
// title, no series bug, crazier tags, and the film ends on THE STARS' last line.
//   0.0        HOOK: "Taurus took the | *whole blanket.*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 → #4 slam in.   6.8 #3 · 7.7 #2   8.5–9.3 drumroll → #1 Taurus: "full blanket burrito. sealed."
//   10.2       THE STARS: "Cold? *Say so.* Then share the blanket."
import { makeRank } from './rankkit.js'

export const HOOK = 'Taurus took the | *whole blanket.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.5

const EP = makeRank({
  id: 'og-nrke13',
  hook: '',
  ranks: [
    ["taurus", "full blanket burrito. sealed."],
    ["cancer", "stole it, then tucked you in"],
    ["leo", "wears it as a royal cape"],
    ["scorpio", "it's theirs now. forever."],
    ["pisces", "cried into it. it's damp."],
    ["gemini", "steals it mid-sentence"],
    ["sagittarius", "kicks it off, steals it back"],
    ["libra", "shares it… mostly"],
    ["capricorn", "brought a backup blanket"],
    ["virgo", "folded your side. with you in it."],
    ["aries", "too hot for blankets. ever."],
    ["aquarius", "gave it away. runs on heat."],
  ],
  last: "Cold? *Say so.* Then share the blanket.",
})

export const DURATION = EP.DURATION
export const STORY_END = 13.6
export const SCENES = EP.SCENES
export const CUES = EP.CUES
