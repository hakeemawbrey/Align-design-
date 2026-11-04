// nrke24: RANKING THE SIGNS, "Who loves the hardest" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// cinematic · Eb). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who loves / the *hardest?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Capricorn → #4 Leo slam in.   6.3 card cut.   6.8 #3 Libra · 7.7 #2 Cancer
//   8.5–9.3    drumroll → #1 Pisces: "loves in happy tears"  · 9.9 every rank flips to #1
//   10.2       THE STARS: "Every sign loves hard. *Just differently.*"
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke24',
  hook: "Who loves | the *hardest?*",
  ranks: [
    ["pisces", "loves in happy tears"],
    ["cancer", "loves in soup"],
    ["libra", "loves in harmony"],
    ["leo", "loves in applause"],
    ["taurus", "loves in comfort"],
    ["aries", "loves out loud"],
    ["sagittarius", "loves in adventures"],
    ["gemini", "loves in conversation"],
    ["scorpio", "loves all the way"],
    ["aquarius", "loves in ideas"],
    ["virgo", "loves in details"],
    ["capricorn", "loves in plans"],
  ],
  last: "Every sign loves hard. *Just differently.*",
  allOne: true,
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
