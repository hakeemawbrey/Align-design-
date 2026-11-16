// og-nwpe10: social rework of nwpe10 (static HOOK outline 0–6.7 is the pack's title; no bug, no title pops, no end
// card; grid/box/peekers inside the safe zones via ../wpkit.js, a copy of ../../nwpe01/wpkit.js; crazier items). Was:
// nwpe10 · WINTER STARTER PACK 10: "Winter starter pack: Capricorn" (13 s vertical, star_advice trial reel, jazzy A).
// Rows: promo/films/next30/b40.md. The format engine is ../../nwpe01/wpkit.js (shared by nwpe01–nwpe12).
//   0      "Winter starter pack: | *Capricorn*" over the frosted grid; the sign shivering bottom-left, mid-hop.
//   items: a planner with a winter tab · the sensible boots · alarm at 6, even on Sunday
//   5.60   the twist: a soft spot for the lights (with cancer).  6.71 beat change → "…they're just *really* pretty."
//   last line: "Soft *on the inside*."  ♓ Pisces cries at the bottom all film.
import { makeWP } from '../wpkit.js'

const WP = makeWP({
  sign: 'capricorn', partner: 'cancer',
  items: [
    {label: "a planner: 9 winter tabs", icon: "planner", gag: "bounce"},
    {label: "boots rated for -40", icon: "boot", gag: "glow"},
    {label: "alarm: 5 AM. on Sunday.", icon: "alarm", gag: "shake"},
  ],
  twist: { label: "a soft spot for the lights", icon: 'lights' },
  line1: "every Capricorn winter is *scheduled*.",
  payoffLine: "you *stopped* for the lights?",
  last: "Scheduled. *Soft inside.*",
})

export const DURATION = WP.DURATION
export const SCENES = WP.SCENES
export const CUES = WP.CUES
export const MUSIC = WP.MUSIC
export const TIMES = WP.T

export const HOOK = "Capricorn's winter: | *alarm at 5 AM*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 6.7
