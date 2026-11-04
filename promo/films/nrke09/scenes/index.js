// nrke09: RANKING THE SIGNS, "Who gives the best hugs" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// dreamy · Eb). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who gives / the *best hugs?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Aquarius → #4 Leo slam in.   6.3 card cut.   6.8 #3 Pisces · 7.7 #2 Taurus
//   8.5–9.3    drumroll → #1 Cancer: "a hug that feels like home"
//   10.2       THE STARS: "The best hugs come *with a yes.*"
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke09',
  hook: "Who gives | the *best hugs?*",
  ranks: [
    ["cancer", "a hug that feels like home"],
    ["taurus", "warm, slow, unhurried"],
    ["pisces", "hugs you and cries"],
    ["leo", "spins you around"],
    ["libra", "perfect hug, perfect pose"],
    ["sagittarius", "full-speed running hug"],
    ["aries", "a tackle, technically"],
    ["gemini", "hugs and keeps talking"],
    ["scorpio", "rare, intense, legendary"],
    ["virgo", "asks first. very nice."],
    ["capricorn", "a firm, scheduled hug"],
    ["aquarius", "side hug + fist bump"],
  ],
  last: "The best hugs come *with a yes.*",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
