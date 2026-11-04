// nwpe10 · WINTER STARTER PACK 10: "Winter starter pack: Capricorn" (13 s vertical, star_advice trial reel, jazzy A).
// Rows: promo/films/next30/b40.md. The format engine is ../../nwpe01/wpkit.js (shared by nwpe01–nwpe12).
//   0      "Winter starter pack: | *Capricorn*" over the frosted grid; the sign shivering bottom-left, mid-hop.
//   items: a planner with a winter tab · the sensible boots · alarm at 6, even on Sunday
//   5.60   the twist: a soft spot for the lights (with cancer).  6.71 beat change → "…they're just *really* pretty."
//   last line: "Soft *on the inside*."  ♓ Pisces cries at the bottom all film.
import { makeWP } from '../../nwpe01/wpkit.js'

const WP = makeWP({
  sign: 'capricorn', partner: 'cancer',
  items: [
    {label: "a planner with a winter tab", icon: "planner", gag: "bounce"},
    {label: "the sensible boots", icon: "boot", gag: "glow"},
    {label: "alarm at 6, even on Sunday", icon: "alarm", gag: "shake"},
  ],
  twist: { label: "a soft spot for the lights", icon: 'lights' },
  payoffLine: "…they're just *really* pretty.",
  last: "Soft *on the inside*.",
})

export const DURATION = WP.DURATION
export const SCENES = WP.SCENES
export const CUES = WP.CUES
export const MUSIC = WP.MUSIC
export const TIMES = WP.T
