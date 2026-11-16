// og-nrke24: social rework of nrke24, RANKING THE SIGNS "Who loves the hardest" (static outline HOOK over the empty
// board; no question title, no bug, no reveal shake/flash; the board and cast sit inside the full-frame safe zones; the
// film ends on THE STARS' line after every rank flips to #1). The format lives in ./rankkit.js (an og copy of
// ../../nrke01/scenes/rankkit.js).
//   0.0        HOOK over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Capricorn → #4 Leo land.   6.8 #3 Libra · 7.7 #2 Cancer
//   8.5–9.3    drumroll → #1 Pisces: "loves in a flood of happy tears"  · 9.9 every rank flips to #1
//   10.2       THE STARS: "Every sign loves hard. *Just differently.*"
import { makeRank } from './rankkit.js'

const EP = makeRank({
  id: 'og-nrke24',
  hook: "Who loves | the *hardest?*",
  ranks: [
    ["pisces", "loves in a flood of happy tears"],
    ["cancer", "loves in soup. so much soup."],
    ["libra", "loves in matching outfits"],
    ["leo", "loves in standing ovations"],
    ["taurus", "loves in snacks. never shares."],
    ["aries", "loves out loud. VERY loud."],
    ["sagittarius", "loves in surprise road trips"],
    ["gemini", "loves in 4-hour phone calls"],
    ["scorpio", "loves all the way. forever."],
    ["aquarius", "loves in 2 a.m. theories"],
    ["virgo", "loves in labelled leftovers"],
    ["capricorn", "loves in a five-year plan"],
  ],
  last: "Every sign loves hard. *Just differently.*",
  allOne: true,
})

export const HOOK = 'We ranked who | loves *hardest.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.5

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
