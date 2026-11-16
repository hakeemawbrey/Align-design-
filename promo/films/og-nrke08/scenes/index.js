// og-nrke08: the social rework of nrke08 (RANKING THE SIGNS, star_advice). Same board, cast, order and payoff; static HOOK
// caption (outline) from frame 0 instead of the animated question title, every tag pushed to the extreme, no series bug.
// The kit is this folder's own copy (scenes/rankkit.js) of nrke01's rankkit.js, laid out for the full-frame safe zones.
// Original notes:
// nrke08: RANKING THE SIGNS, "Who apologizes first" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// cinematic · Cm). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who says / *sorry* first?" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Scorpio → #4 Virgo slam in.   6.3 card cut.   6.8 #3 Cancer · 7.7 #2 Pisces
//   8.5–9.3    drumroll → #1 Libra: "apologized for your mistake"
//   10.2       THE STARS: "Saying sorry first isn't *losing.*"
import { makeRank } from './rankkit.js'

const EP = makeRank({
  id: 'og-nrke08',
  hook: '',   // og: the film's own title is gone; the static HOOK below owns the top
  ranks: [
    ["libra", "apologized for YOUR mistake"],
    ["pisces", "apologized while sobbing"],
    ["cancer", "with a card and a casserole"],
    ["virgo", "a 3-part apology, footnoted"],
    ["gemini", "sorry ×40 in one minute"],
    ["sagittarius", "a joke, then a real one"],
    ["aquarius", "after a 20-minute lecture"],
    ["taurus", "after a snack. and a nap."],
    ["aries", "fast and VERY loud"],
    ["capricorn", "drafted it. two revisions."],
    ["leo", "after a dramatic monologue"],
    ["scorpio", "next year. sincerely."],
  ],
  last: "Saying sorry first isn't *losing.*",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0
export const HOOK = "Who says sorry | first? *Not Scorpio.*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.5
