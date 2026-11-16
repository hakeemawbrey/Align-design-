// og-nrke11: the social rework of nrke11 (RANKING THE SIGNS, star_advice). Same board, cast, order and payoff; static HOOK
// caption (box) from frame 0 instead of the animated question title, every tag pushed to the extreme, no series bug.
// The kit is this folder's own copy (scenes/rankkit.js) of nrke01's rankkit.js, laid out for the full-frame safe zones.
// Original notes:
// nrke11: RANKING THE SIGNS, "Who falls the fastest" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// synthwave · F#m). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who falls / the *fastest?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Capricorn → #4 Aries slam in.   6.3 card cut.   6.8 #3 Leo · 7.7 #2 Libra
//   8.5–9.3    drumroll → #1 Pisces: "fell at “hello.” teared up."
//   10.2       THE STARS: "Fall at *your own* pace."
import { makeRank } from './rankkit.js'

const EP = makeRank({
  id: 'og-nrke11',
  hook: '',   // og: the film's own title is gone; the static HOOK below owns the top
  ranks: [
    ["pisces", "fell at “hello.” sobbed."],
    ["libra", "fell at one nice laugh"],
    ["leo", "fell when you liked their hair"],
    ["aries", "fell mid-sentence. yours."],
    ["cancer", "already named your future dog"],
    ["gemini", "fell twice in one afternoon"],
    ["sagittarius", "fell, then booked a flight"],
    ["aquarius", "fell for their brain only"],
    ["taurus", "falls slow. stays forever."],
    ["virgo", "fell after a full audit"],
    ["scorpio", "fell. will never say so."],
    ["capricorn", "fell in Q3. as planned."],
  ],
  last: "Fall at *your own* pace.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0
export const HOOK = "One sign fell in | love *at “hello.”*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.5
