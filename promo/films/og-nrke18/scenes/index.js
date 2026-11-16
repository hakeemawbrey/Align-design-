// og-nrke18: the social rework of nrke18, RANKING THE SIGNS, "Who takes the cutest couple photos" (13.6 s story).
// Same board, cast and story (kit copy: ./rankkit.js); a static HOOK (outline) from frame 0 instead of the question
// title, no series bug, crazier tags, and the film ends on THE STARS' last line.
//   0.0        HOOK: "Gemini took 300 | to *post one.*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 → #4 slam in.   6.8 #3 · 7.7 #2   8.5–9.3 drumroll → #1 Leo: "knows every angle they have"
//   10.2       THE STARS: "Cutest photo? The one where you're *laughing.*"
import { makeRank } from './rankkit.js'

export const HOOK = 'Gemini took 300 | to *post one.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.5

const EP = makeRank({
  id: 'og-nrke18',
  hook: '',
  ranks: [
    ["leo", "knows every angle they have"],
    ["libra", "waits an hour for golden hour"],
    ["gemini", "took 300, posted one"],
    ["cancer", "printed them all for the fridge"],
    ["pisces", "crying in every single one"],
    ["sagittarius", "every photo is mid-jump"],
    ["aries", "photobombed their own photo"],
    ["taurus", "photos of the food. you're blurry."],
    ["virgo", "fixed your collar first. 9 times."],
    ["aquarius", "shot from under the table. art."],
    ["scorpio", "no photos. no proof. mysterious."],
    ["capricorn", "one photo a year, in a suit"],
  ],
  last: "Cutest photo? The one where you're *laughing.*",
})

export const DURATION = EP.DURATION
export const STORY_END = 13.6
export const SCENES = EP.SCENES
export const CUES = EP.CUES
