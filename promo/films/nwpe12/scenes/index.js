// nwpe12 · WINTER STARTER PACK 12: "Winter starter pack: Pisces" (15 s vertical, star_advice trial reel, jazzy B).
// Rows: promo/films/next30/b40.md. The format engine is ../../nwpe01/wpkit.js (shared by nwpe01–nwpe12).
//   0      "Winter starter pack: | *Pisces*" over the frosted grid; the sign shivering bottom-left, mid-hop.
//   items: a window seat for snow · tissues, the soft kind · one song on repeat
//   5.60   the twist: crying because you remembered (with scorpio).  6.71 card cut → "you remembered my *favourite*?"
//   last line: "Cried. *Happily*."  ♓ Pisces cries at the bottom all film.
import { makeWP } from '../../nwpe01/wpkit.js'

const WP = makeWP({
  sign: 'pisces', partner: 'scorpio',
  items: [
    {label: "a window seat for snow", icon: "window", gag: "glow"},
    {label: "tissues, the soft kind", icon: "tissue", gag: "stack", n: 3},
    {label: "one song on repeat", icon: "music", gag: "bounce"},
  ],
  twist: { label: "crying because you remembered", icon: 'gift' },
  payoffLine: "you remembered my *favourite*?",
  last: "Cried. *Happily*.",
})

export const DURATION = WP.DURATION
export const SCENES = WP.SCENES
export const CUES = WP.CUES
export const MUSIC = WP.MUSIC
export const TIMES = WP.T
