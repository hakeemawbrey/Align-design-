// og-nrke16: the social rework of nrke16, RANKING THE SIGNS, "Who's best at meeting the family" (13.6 s story).
// Same board, cast and story (kit copy: ./rankkit.js); a static HOOK (outline) from frame 0 instead of the question
// title, no series bug, crazier tags, and the film ends on THE STARS' last line.
//   0.0        HOOK: "Cancer met your mom | and *cooked dinner.*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 → #4 slam in.   6.8 #3 · 7.7 #2   8.5–9.3 drumroll → #1 Cancer: "cooked dinner for the whole family"
//   10.2       THE STARS: "Nervous? Just *be you.* That's who they're meeting."
import { makeRank } from './rankkit.js'

export const HOOK = 'Cancer met your mom | and *cooked dinner.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.5

const EP = makeRank({
  id: 'og-nrke16',
  hook: '',
  ranks: [
    ["cancer", "cooked dinner for the whole family"],
    ["libra", "charmed every aunt. twice."],
    ["capricorn", "made Grandpa a business plan"],
    ["virgo", "brought a pie. and a backup pie."],
    ["taurus", "asked for the recipe. got it."],
    ["leo", "gave a toast nobody asked for"],
    ["gemini", "now in the cousins' group chat"],
    ["pisces", "sobbed at the baby photos"],
    ["sagittarius", "a travel story. ninety minutes."],
    ["scorpio", "silent. knows all their secrets."],
    ["aquarius", "debated the uncle. won. kindly."],
    ["aries", "challenged the cousins to a race"],
  ],
  last: "Nervous? Just *be you.* That's who they're meeting.",
})

export const DURATION = EP.DURATION
export const STORY_END = 13.6
export const SCENES = EP.SCENES
export const CUES = EP.CUES
