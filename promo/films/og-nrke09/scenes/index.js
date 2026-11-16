// og-nrke09: the social rework of nrke09 (RANKING THE SIGNS, star_advice). Same board, cast, order and payoff; static HOOK
// caption (box) from frame 0 instead of the animated question title, every tag pushed to the extreme, no series bug.
// The kit is this folder's own copy (scenes/rankkit.js) of nrke01's rankkit.js, laid out for the full-frame safe zones.
// Original notes:
// nrke09: RANKING THE SIGNS, "Who gives the best hugs" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// dreamy · Eb). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who gives / the *best hugs?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Aquarius → #4 Leo slam in.   6.3 card cut.   6.8 #3 Pisces · 7.7 #2 Taurus
//   8.5–9.3    drumroll → #1 Cancer: "a hug that feels like home"
//   10.2       THE STARS: "The best hugs come *with a yes.*"
import { makeRank } from './rankkit.js'

const EP = makeRank({
  id: 'og-nrke09',
  hook: '',   // og: the film's own title is gone; the static HOOK below owns the top
  ranks: [
    ["cancer", "a hug that smells like home"],
    ["taurus", "warm, slow, ten minutes long"],
    ["pisces", "hugs you, sobs on your shirt"],
    ["leo", "spins you for the crowd"],
    ["libra", "perfect hug, perfect angle"],
    ["sagittarius", "sprinting hug, full speed"],
    ["aries", "a tackle. you're on the floor."],
    ["gemini", "hugs you mid-conversation"],
    ["scorpio", "once a year. legendary."],
    ["virgo", "asks, then a 3-second hug"],
    ["capricorn", "a hug, booked for 4:15"],
    ["aquarius", "side hug, fist bump, gone"],
  ],
  last: "The best hugs come *with a yes.*",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0
export const HOOK = "Some signs hug. | One *tackles.*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.5
