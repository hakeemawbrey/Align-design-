// nwpe04 · WINTER STARTER PACK 4: "Winter starter pack: Cancer" (13 s vertical, star_advice trial reel, jazzy Eb).
// Rows: promo/films/next30/b40.md. The format engine is ../../nwpe01/wpkit.js (shared by nwpe01–nwpe12).
//   0      "Winter starter pack: | *Cancer*" over the frosted grid; the sign shivering bottom-left, mid-hop.
//   items: a cookie tin of feelings · a candle that smells like home · a mug for every friend
//   5.60   the twist: a spare scarf, just in case (with capricorn).  6.71 beat change → "you brought a *spare*?"
//   last line: "*Always* a spare."  ♓ Pisces cries at the bottom all film.
import { makeWP } from '../../nwpe01/wpkit.js'

const WP = makeWP({
  sign: 'cancer', partner: 'capricorn',
  items: [
    {label: "a cookie tin of feelings", icon: "tin", gag: "bounce"},
    {label: "a candle that smells like home", icon: "candle", gag: "glow"},
    {label: "a mug for every friend", icon: "mug", gag: "stack", n: 5},
  ],
  twist: { label: "a spare scarf, just in case", icon: 'scarf' },
  payoffLine: "you brought a *spare*?",
  last: "*Always* a spare.",
})

export const DURATION = WP.DURATION
export const SCENES = WP.SCENES
export const CUES = WP.CUES
export const MUSIC = WP.MUSIC
export const TIMES = WP.T
