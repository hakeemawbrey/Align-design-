// og-nrke20: the social rework of nrke20, RANKING THE SIGNS, "Who's the best listener" (13.6 s story).
// Same board, cast and story (kit copy: ./rankkit.js); a static HOOK (outline) from frame 0 instead of the question
// title, no series bug, crazier tags, and the film ends on THE STARS' last line.
//   0.0        HOOK: "Leo listened, then | *made it about Leo.*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 → #4 slam in.   6.8 #3 · 7.7 #2   8.5–9.3 drumroll → #1 Scorpio: "remembers every word. forever."
//   10.2       THE STARS: "Listening isn't fixing. *It's staying.*"
import { makeRank } from './rankkit.js'

export const HOOK = 'Leo listened, then | *made it about Leo.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.5

const EP = makeRank({
  id: 'og-nrke20',
  hook: '',
  ranks: [
    ["scorpio", "remembers every word. forever."],
    ["cancer", "listens with snacks and a blanket"],
    ["pisces", "listens, cries harder than you"],
    ["virgo", "took notes. made a summary."],
    ["libra", "nods at all the right parts"],
    ["taurus", "patient. hasn't blinked."],
    ["capricorn", "listened, then made a 5-step plan"],
    ["aquarius", "listened, asked why. a lot."],
    ["sagittarius", "listened, booked you a trip"],
    ["leo", "listened, made it about Leo"],
    ["gemini", "listening! (also talking)"],
    ["aries", "listening… while sprinting"],
  ],
  last: "Listening isn't fixing. *It's staying.*",
})

export const DURATION = EP.DURATION
export const STORY_END = 13.6
export const SCENES = EP.SCENES
export const CUES = EP.CUES
