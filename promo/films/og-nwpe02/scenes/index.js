// og-nwpe02: social rework of nwpe02 (static HOOK outline until the beat change; no bug, title or end card; crazier items).
// Kit: ../wpkit.js (an og copy of nwpe01/wpkit.js). Was:
// nwpe02 · WINTER STARTER PACK 2: "Winter starter pack: Taurus" (13 s vertical, star_advice trial reel, jazzy Db).
// Rows: promo/films/next30/b40.md. The format engine is ../../nwpe01/wpkit.js (shared by nwpe01–nwpe12).
//   0      "Winter starter pack: | *Taurus*" over the frosted grid; the sign shivering bottom-left, mid-hop.
//   items: the heaviest blanket · soup since noon · fuzzy socks ×2
//   5.60   the twist: saving the warm spot for you (with virgo).  6.71 beat change → "you saved me the *warm* spot?"
//   last line: "The warm spot is *yours*."  ♓ Pisces cries at the bottom all film.
import { makeWP } from '../wpkit.js'

const WP = makeWP({
  sign: 'taurus', partner: 'virgo',
  items: [
    { label: "a blanket. then 4 more.", icon: 'blanket', gag: 'glow' },
    { label: "soup since breakfast", icon: 'pot', gag: 'steam' },
    { label: "fuzzy socks on socks", icon: 'sock', gag: 'stack', n: 2 },
  ],
  twist: { label: "saving you the warm spot", icon: 'blanket' },
  line1: "Taurus has not left the couch since *Tuesday*.",
  payoffLine: "you saved me the *warm* spot?",
  last: "The warm spot is *yours*.",
})

export const DURATION = WP.DURATION
export const SCENES = WP.SCENES
export const CUES = WP.CUES
export const MUSIC = WP.MUSIC
export const TIMES = WP.T

// social hook: static caption from frame 0 (replaces the pack's popped title)
export const HOOK = "Taurus in winter: | *hibernating.*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 6.5
