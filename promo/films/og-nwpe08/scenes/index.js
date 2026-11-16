// og-nwpe08: social rework of nwpe08 (static HOOK outline 0–6.7 is the pack's title; no bug, no title pops, no end
// card; grid/box/peekers inside the safe zones via ../wpkit.js, a copy of ../../nwpe01/wpkit.js; crazier items). Was:
// nwpe08 · WINTER STARTER PACK 8: "Winter starter pack: Scorpio" (13 s vertical, star_advice trial reel, jazzy G).
// Rows: promo/films/next30/b40.md. The format engine is ../../nwpe01/wpkit.js (shared by nwpe01–nwpe12).
//   0      "Winter starter pack: | *Scorpio*" over the frosted grid; the sign shivering bottom-left, mid-hop.
//   items: a black coat, all winter · a candle lit at 4 PM · one very deep question
//   5.60   the twist: letting someone in (with taurus).  6.71 beat change → "welcome *in*. sit by the candle."
//   last line: "Inner circle: *plus one*."  ♓ Pisces cries at the bottom all film.
import { makeWP } from '../wpkit.js'

const WP = makeWP({
  sign: 'scorpio', partner: 'taurus',
  items: [
    {label: "the same black coat. forever.", icon: "coat", gag: "glow"},
    {label: "candles lit at 3:59 PM", icon: "candle", gag: "glow"},
    {label: "one question. you'll cry.", icon: "question", gag: "shake"},
  ],
  twist: { label: "letting ONE person in", icon: 'candle' },
  line1: "Scorpio already knows *your* secrets.",
  payoffLine: "I got the *spare key*?!",
  last: "Inner circle: *you*.",
})

export const DURATION = WP.DURATION
export const SCENES = WP.SCENES
export const CUES = WP.CUES
export const MUSIC = WP.MUSIC
export const TIMES = WP.T

export const HOOK = "Scorpio's winter: | *a starter pack*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 6.7
