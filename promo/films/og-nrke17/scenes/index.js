// og-nrke17: the social rework of nrke17, RANKING THE SIGNS, "Who gives the best compliments" (13.6 s story).
// Same board, cast and story (kit copy: ./rankkit.js); a static HOOK (box) from frame 0 instead of the question
// title, no series bug, crazier tags, and the film ends on THE STARS' last line.
//   0.0        HOOK: "Scorpio gave one | compliment. *Ever.*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 → #4 slam in.   6.8 #3 · 7.7 #2   8.5–9.3 drumroll → #1 Libra: "noticed your haircut. 1 mm off."
//   10.2       THE STARS: "Thought something nice? *Say it out loud.*"
import { makeRank } from './rankkit.js'

export const HOOK = 'Scorpio gave one | compliment. *Ever.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.5

const EP = makeRank({
  id: 'og-nrke17',
  hook: '',
  ranks: [
    ["libra", "noticed your haircut. 1 mm off."],
    ["leo", "started a fan club. for you."],
    ["pisces", "complimented you, then sobbed"],
    ["cancer", "“did you eat? you look great”"],
    ["gemini", "five compliments a second"],
    ["sagittarius", "brutally honest. somehow nice."],
    ["taurus", "“you smell like fresh bread”"],
    ["aquarius", "“your brain is a cool shape”"],
    ["virgo", "a compliment, with footnotes"],
    ["aries", "“you're fast. respect.”"],
    ["capricorn", "“good work today.” (peak praise)"],
    ["scorpio", "one compliment. ever. iconic."],
  ],
  last: "Thought something nice? *Say it out loud.*",
})

export const DURATION = EP.DURATION
export const STORY_END = 13.6
export const SCENES = EP.SCENES
export const CUES = EP.CUES
