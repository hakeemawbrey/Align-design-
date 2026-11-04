// nrke06: RANKING THE SIGNS, "Who's always running late" (18 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// house · G). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who's always / *running late?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Capricorn → #4 Leo slam in.   6.3 card cut.   6.8 #3 Pisces · 7.7 #2 Gemini
//   8.5–9.3    drumroll → #1 Sagittarius: "“five minutes!” (forty)"
//   10.2       THE STARS: "Running late? *A heads-up* is the kind part."
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke06',
  hook: "Who's always | *running late?*",
  ranks: [
    ["sagittarius", "“five minutes!” (forty)"],
    ["gemini", "got distracted by a dog"],
    ["pisces", "lost track of time, teary"],
    ["leo", "fashionably, on purpose"],
    ["libra", "changed outfits twice"],
    ["aquarius", "forgot clocks exist"],
    ["aries", "early, then wandered off"],
    ["cancer", "went back for a sweater"],
    ["scorpio", "arrives exactly on time"],
    ["taurus", "on time, already ordered"],
    ["virgo", "ten minutes early"],
    ["capricorn", "arrived yesterday"],
  ],
  last: "Running late? *A heads-up* is the kind part.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
