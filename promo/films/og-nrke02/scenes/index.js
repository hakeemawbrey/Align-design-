// og-nrke02: the social rework of nrke02 (RANKING THE SIGNS, star_advice). Same board, cast, order and payoff; static HOOK
// caption (outline) from frame 0 instead of the animated question title, every tag pushed to the extreme, no series bug.
// The kit is this folder's own copy (scenes/rankkit.js) of nrke01's rankkit.js, laid out for the full-frame safe zones.
// Original notes:
// nrke02: RANKING THE SIGNS, "Who plans the date" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// funk · E). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who plans / *the date?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Sagittarius → #4 Cancer slam in.   6.3 card cut.   6.8 #3 Libra · 7.7 #2 Virgo
//   8.5–9.3    drumroll → #1 Capricorn: "booked it in October"
//   10.2       THE STARS: "Best plan? *Taking turns* planning."
import { makeRank } from './rankkit.js'

const EP = makeRank({
  id: 'og-nrke02',
  hook: '',   // og: the film's own title is gone; the static HOOK below owns the top
  ranks: [
    ["capricorn", "booked it three years ago"],
    ["virgo", "laminated the itinerary"],
    ["libra", "narrowed it to 14 options"],
    ["cancer", "packed snacks for a week"],
    ["taurus", "the date IS dinner. 4 courses."],
    ["leo", "planned the outfit (3 of them)"],
    ["scorpio", "planned it. told no one. ever."],
    ["aquarius", "invented a brand-new holiday"],
    ["aries", "“we leave in 30 seconds.”"],
    ["gemini", "planned four, went to a fifth"],
    ["pisces", "planned a vibe. sobbed at it."],
    ["sagittarius", "“let's just get on a train!”"],
  ],
  last: "Best plan? *Take turns.* Sag, you're next.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0
export const HOOK = "Who plans the date? | *Not Sagittarius.*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.5
