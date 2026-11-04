// nwpe07 · WINTER STARTER PACK 7: "Winter starter pack: Libra" (15 s vertical, star_advice trial reel, jazzy F#).
// Rows: promo/films/next30/b40.md. The format engine is ../../nwpe01/wpkit.js (shared by nwpe01–nwpe12).
//   0      "Winter starter pack: | *Libra*" over the frosted grid; the sign shivering bottom-left, mid-hop.
//   items: a matching hat and scarf · a mug that matches the throw · a snow-day playlist
//   5.60   the twist: finally picking the plan (with aries).  6.71 card cut → "the ice rink. I *pick* the ice rink."
//   last line: "Your vote *counts*."  ♓ Pisces cries at the bottom all film.
import { makeWP } from '../../nwpe01/wpkit.js'

const WP = makeWP({
  sign: 'libra', partner: 'aries',
  items: [
    {label: "a matching hat and scarf", icon: "hat", gag: "glow"},
    {label: "a mug that matches the throw", icon: "mug", gag: "bounce"},
    {label: "a snow-day playlist", icon: "music", gag: "bounce"},
  ],
  twist: { label: "finally picking the plan", icon: 'rink' },
  payoffLine: "the ice rink. I *pick* the ice rink.",
  last: "Your vote *counts*.",
})

export const DURATION = WP.DURATION
export const SCENES = WP.SCENES
export const CUES = WP.CUES
export const MUSIC = WP.MUSIC
export const TIMES = WP.T
