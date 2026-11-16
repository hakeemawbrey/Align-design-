// og-nwpe09: social rework of nwpe09 (static HOOK box 0–6.7 is the pack's title; no bug, no title pops, no end
// card; grid/box/peekers inside the safe zones via ../wpkit.js, a copy of ../../nwpe01/wpkit.js; crazier items). Was:
// nwpe09 · WINTER STARTER PACK 9: "Winter starter pack: Sagittarius" (13 s vertical, star_advice trial reel, jazzy Ab).
// Rows: promo/films/next30/b40.md. The format engine is ../../nwpe01/wpkit.js (shared by nwpe01–nwpe12).
//   0      "Winter starter pack: | *Sagittarius*" over the frosted grid; the sign shivering bottom-left, mid-hop.
//   items: a sled by the door · maps on every wall · a scarf from three trips ago
//   5.60   the twist: staying in, because you asked (with gemini).  6.71 beat change → "this is the best trip *yet*."
//   last line: "Staying in is a *trip*, too."  ♓ Pisces cries at the bottom all film.
import { makeWP } from '../wpkit.js'

const WP = makeWP({
  sign: 'sagittarius', partner: 'gemini',
  items: [
    {label: "a sled packed by the door", icon: "sled", gag: "shake"},
    {label: "maps. on the ceiling too.", icon: "map", gag: "stack", n: 3},
    {label: "a scarf with sand in it", icon: "scarf", gag: "bounce"},
  ],
  twist: { label: "staying in. for you.", icon: 'window' },
  line1: "every Sag winter has an *exit plan*.",
  payoffLine: "you unpacked? for *me*?",
  last: "Staying in is a *trip*, too.",
})

export const DURATION = WP.DURATION
export const SCENES = WP.SCENES
export const CUES = WP.CUES
export const MUSIC = WP.MUSIC
export const TIMES = WP.T

export const HOOK = "Sag's winter: | *not staying home*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 6.7
