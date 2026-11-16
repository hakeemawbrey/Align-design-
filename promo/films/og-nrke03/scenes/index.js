// og-nrke03: the social rework of nrke03 (RANKING THE SIGNS, star_advice). Same board, cast, order and payoff; static HOOK
// caption (box) from frame 0 instead of the animated question title, every tag pushed to the extreme, no series bug.
// The kit is this folder's own copy (scenes/rankkit.js) of nrke01's rankkit.js, laid out for the full-frame safe zones.
// Original notes:
// nrke03: RANKING THE SIGNS, "Who cries at the movie" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// pop · C). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who cries / *at the movie?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Capricorn → #4 Taurus slam in.   6.3 card cut.   6.8 #3 Libra · 7.7 #2 Cancer
//   8.5–9.3    drumroll → #1 Pisces: "cried at the trailer"
//   10.2       THE STARS: "Soft *heart,* strong person."
import { makeRank } from './rankkit.js'

const EP = makeRank({
  id: 'og-nrke03',
  hook: '',   // og: the film's own title is gone; the static HOOK below owns the top
  ranks: [
    ["pisces", "cried at the movie poster"],
    ["cancer", "cried buying the tickets"],
    ["libra", "cried at a perfect kiss"],
    ["taurus", "sobbed: the dog was FINE"],
    ["leo", "cried in the light, on purpose"],
    ["virgo", "cried at a continuity error"],
    ["gemini", "cried, live-texted the crying"],
    ["sagittarius", "cried laughing at the sad part"],
    ["scorpio", "one tear. will deny it forever"],
    ["aries", "teared up when the car won"],
    ["aquarius", "cried for the robot only"],
    ["capricorn", "cried at home. scheduled it."],
  ],
  last: "Cried at the movie? *Soft heart,* strong person.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0
export const HOOK = "Which sign cried | *at the trailer?*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.5
