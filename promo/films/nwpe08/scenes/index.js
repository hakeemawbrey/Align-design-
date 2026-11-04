// nwpe08 · WINTER STARTER PACK 8: "Winter starter pack: Scorpio" (15 s vertical, star_advice trial reel, jazzy G).
// Rows: promo/films/next30/b40.md. The format engine is ../../nwpe01/wpkit.js (shared by nwpe01–nwpe12).
//   0      "Winter starter pack: | *Scorpio*" over the frosted grid; the sign shivering bottom-left, mid-hop.
//   items: a black coat, all winter · a candle lit at 4 PM · one very deep question
//   5.60   the twist: letting someone in (with taurus).  6.71 card cut → "welcome *in*. sit by the candle."
//   last line: "Inner circle: *plus one*."  ♓ Pisces cries at the bottom all film.
import { makeWP } from '../../nwpe01/wpkit.js'

const WP = makeWP({
  sign: 'scorpio', partner: 'taurus',
  items: [
    {label: "a black coat, all winter", icon: "coat", gag: "glow"},
    {label: "a candle lit at 4 PM", icon: "candle", gag: "glow"},
    {label: "one very deep question", icon: "question", gag: "shake"},
  ],
  twist: { label: "letting someone in", icon: 'candle' },
  payoffLine: "welcome *in*. sit by the candle.",
  last: "Inner circle: *plus one*.",
})

export const DURATION = WP.DURATION
export const SCENES = WP.SCENES
export const CUES = WP.CUES
export const MUSIC = WP.MUSIC
export const TIMES = WP.T
