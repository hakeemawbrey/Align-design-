// og-nrke06: the social rework of nrke06 (RANKING THE SIGNS, star_advice). Same board, cast, order and payoff; static HOOK
// caption (outline) from frame 0 instead of the animated question title, every tag pushed to the extreme, no series bug.
// The kit is this folder's own copy (scenes/rankkit.js) of nrke01's rankkit.js, laid out for the full-frame safe zones.
// Original notes:
// nrke06: RANKING THE SIGNS, "Who's always running late" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// house · G). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who's always / *running late?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Capricorn → #4 Leo slam in.   6.3 card cut.   6.8 #3 Pisces · 7.7 #2 Gemini
//   8.5–9.3    drumroll → #1 Sagittarius: "“five minutes!” (forty)"
//   10.2       THE STARS: "Running late? *A heads-up* is the kind part."
import { makeRank } from './rankkit.js'

const EP = makeRank({
  id: 'og-nrke06',
  hook: '',   // og: the film's own title is gone; the static HOOK below owns the top
  ranks: [
    ["sagittarius", "“5 min!” (one hour later)"],
    ["gemini", "stopped to pet nine dogs"],
    ["pisces", "lost in a daydream. teary."],
    ["leo", "late on purpose. big entrance."],
    ["libra", "changed outfits six times"],
    ["aquarius", "doesn't believe in clocks"],
    ["aries", "early, then sprinted off"],
    ["cancer", "went home for a sweater"],
    ["scorpio", "on the second. silently."],
    ["taurus", "on time, already on dessert"],
    ["virgo", "twenty minutes early. waiting."],
    ["capricorn", "arrived yesterday. to scout."],
  ],
  last: "Running late? *A heads-up* is the kind part.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0
export const HOOK = "“5 minutes away!” | *(it was an hour)*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.5
