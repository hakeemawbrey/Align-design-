// og-nwpe12: social rework of nwpe12 (static HOOK outline 0–6.7 is the pack's title; no bug, no title pops, no end
// card; grid/box/peekers inside the safe zones via ../wpkit.js, a copy of ../../nwpe01/wpkit.js; crazier items). Was:
// nwpe12 · WINTER STARTER PACK 12: "Winter starter pack: Pisces" (13 s vertical, star_advice trial reel, jazzy B).
// Rows: promo/films/next30/b40.md. The format engine is ../../nwpe01/wpkit.js (shared by nwpe01–nwpe12).
//   0      "Winter starter pack: | *Pisces*" over the frosted grid; the sign shivering bottom-left, mid-hop.
//   items: a window seat for snow · tissues, the soft kind · one song on repeat
//   5.60   the twist: crying because you remembered (with scorpio).  6.71 beat change → "you remembered my *favourite*?"
//   last line: "Cried. *Happily*."  ♓ Pisces cries at the bottom all film.
import { makeWP } from '../wpkit.js'

const WP = makeWP({
  sign: 'pisces', partner: 'scorpio',
  items: [
    {label: "a window seat. for crying.", icon: "window", gag: "glow"},
    {label: "tissues, bought in bulk", icon: "tissue", gag: "stack", n: 3},
    {label: "one sad song. on repeat.", icon: "music", gag: "bounce"},
  ],
  twist: { label: "happy tears, for you", icon: 'gift' },
  line1: "every Pisces winter comes with *tears*.",
  payoffLine: "it's just your *favourite*\u2026",
  last: "Cried again. *Happily*.",
})

export const DURATION = WP.DURATION
export const SCENES = WP.SCENES
export const CUES = WP.CUES
export const MUSIC = WP.MUSIC
export const TIMES = WP.T

export const HOOK = "Pisces in winter: | *already crying*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 6.7
