// nwpe11 · WINTER STARTER PACK 11: "Winter starter pack: Aquarius" (15 s vertical, star_advice trial reel, jazzy Bb).
// Rows: promo/films/next30/b40.md. The format engine is ../../nwpe01/wpkit.js (shared by nwpe01–nwpe12).
//   0      "Winter starter pack: | *Aquarius*" over the frosted grid; the sign shivering bottom-left, mid-hop.
//   items: a snowflake under a magnifier · a new strange hobby · friends who don't match
//   5.60   the twist: a handwritten note, not a meme (with leo).  6.71 card cut → "you *wrote* this? by hand?"
//   last line: "*Handwritten*, even."  ♓ Pisces cries at the bottom all film.
import { makeWP } from '../../nwpe01/wpkit.js'

const WP = makeWP({
  sign: 'aquarius', partner: 'leo',
  items: [
    {label: "a snowflake under a magnifier", icon: "flake", gag: "spin"},
    {label: "a new strange hobby", icon: "question", gag: "bounce"},
    {label: "friends who don't match", icon: "mitten", gag: "stack", n: 3},
  ],
  twist: { label: "a handwritten note, not a meme", icon: 'note' },
  payoffLine: "you *wrote* this? by hand?",
  last: "*Handwritten*, even.",
})

export const DURATION = WP.DURATION
export const SCENES = WP.SCENES
export const CUES = WP.CUES
export const MUSIC = WP.MUSIC
export const TIMES = WP.T
