// og-nwpe11: social rework of nwpe11 (static HOOK box 0–6.7 is the pack's title; no bug, no title pops, no end
// card; grid/box/peekers inside the safe zones via ../wpkit.js, a copy of ../../nwpe01/wpkit.js; crazier items). Was:
// nwpe11 · WINTER STARTER PACK 11: "Winter starter pack: Aquarius" (13 s vertical, star_advice trial reel, jazzy Bb).
// Rows: promo/films/next30/b40.md. The format engine is ../../nwpe01/wpkit.js (shared by nwpe01–nwpe12).
//   0      "Winter starter pack: | *Aquarius*" over the frosted grid; the sign shivering bottom-left, mid-hop.
//   items: a snowflake under a magnifier · a new strange hobby · friends who don't match
//   5.60   the twist: a handwritten note, not a meme (with leo).  6.71 beat change → "you *wrote* this? by hand?"
//   last line: "*Handwritten*, even."  ♓ Pisces cries at the bottom all film.
import { makeWP } from '../wpkit.js'

const WP = makeWP({
  sign: 'aquarius', partner: 'leo',
  items: [
    {label: "a snowflake lab at home", icon: "flake", gag: "spin"},
    {label: "a new hobby every Tuesday", icon: "question", gag: "bounce"},
    {label: "mittens that never match", icon: "mitten", gag: "stack", n: 3},
  ],
  twist: { label: "a note. handwritten.", icon: 'note' },
  line1: "every Aquarius winter is an *experiment*.",
  payoffLine: "a real *pen*? for me?",
  last: "Analog. For *you*.",
})

export const DURATION = WP.DURATION
export const SCENES = WP.SCENES
export const CUES = WP.CUES
export const MUSIC = WP.MUSIC
export const TIMES = WP.T

export const HOOK = "Aquarius in winter | *is a science lab*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 6.7
