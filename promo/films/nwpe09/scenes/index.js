// nwpe09 · WINTER STARTER PACK 9: "Winter starter pack: Sagittarius" (13 s vertical, star_advice trial reel, jazzy Ab).
// Rows: promo/films/next30/b40.md. The format engine is ../../nwpe01/wpkit.js (shared by nwpe01–nwpe12).
//   0      "Winter starter pack: | *Sagittarius*" over the frosted grid; the sign shivering bottom-left, mid-hop.
//   items: a sled by the door · maps on every wall · a scarf from three trips ago
//   5.60   the twist: staying in, because you asked (with gemini).  6.71 beat change → "this is the best trip *yet*."
//   last line: "Staying in is a *trip*, too."  ♓ Pisces cries at the bottom all film.
import { makeWP } from '../../nwpe01/wpkit.js'

const WP = makeWP({
  sign: 'sagittarius', partner: 'gemini',
  items: [
    {label: "a sled by the door", icon: "sled", gag: "shake"},
    {label: "maps on every wall", icon: "map", gag: "stack", n: 3},
    {label: "a scarf from three trips ago", icon: "scarf", gag: "bounce"},
  ],
  twist: { label: "staying in, because you asked", icon: 'window' },
  payoffLine: "this is the best trip *yet*.",
  last: "Staying in is a *trip*, too.",
})

export const DURATION = WP.DURATION
export const SCENES = WP.SCENES
export const CUES = WP.CUES
export const MUSIC = WP.MUSIC
export const TIMES = WP.T
