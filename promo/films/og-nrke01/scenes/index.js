// og-nrke01: the social rework of nrke01 (RANKING THE SIGNS, star_advice). Same board, cast, order and payoff; static HOOK
// caption (box) from frame 0 instead of the animated question title, every tag pushed to the extreme, no series bug.
// The kit is this folder's own social copy of rankkit.js (the same full-frame safe-zone layout as og-nrke02).
// Original notes:
// nrke01: RANKING THE SIGNS, "Who texts back first" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// chiptune · A). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who texts back / *first?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Taurus → #4 Cancer slam in.   6.3 card cut.   6.8 #3 Leo · 7.7 #2 Gemini
//   8.5–9.3    drumroll → #1 Aries: "replied before you sent it"
//   10.2       THE STARS: "Speed isn't *interest.* Kindness is."
import { makeRank } from './rankkit.js'

const EP = makeRank({
  id: 'og-nrke01',
  hook: '',   // og: the film's own title is gone; the static HOOK below owns the top
  ranks: [
    ["aries", "replied before you sent it"],
    ["gemini", "typing… since Tuesday…"],
    ["leo", "fast, with 4 selfies"],
    ["cancer", "fast, with 11 hearts"],
    ["sagittarius", "replies from a mountaintop"],
    ["libra", "fast, then a 3-page essay"],
    ["aquarius", "replies with a whole theory"],
    ["virgo", "once. spell-checked twice."],
    ["pisces", "replied. cried. replied again."],
    ["capricorn", "in a calendar slot, 4:15"],
    ["scorpio", "read at once. replies at 2 AM"],
    ["taurus", "still drafting. day 3."],
  ],
  last: "Speed isn't *interest.* Kindness is. Taurus, send it.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0
export const HOOK = 'Who replies first? | *Not Taurus.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.5
