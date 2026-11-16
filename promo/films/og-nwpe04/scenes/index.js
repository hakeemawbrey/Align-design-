// og-nwpe04: social rework of nwpe04 (static HOOK outline until the beat change; no bug, title or end card; crazier items).
// Kit: ../wpkit.js (an og copy of nwpe01/wpkit.js). Was:
// nwpe04 · WINTER STARTER PACK 4: "Winter starter pack: Cancer" (13 s vertical, star_advice trial reel, jazzy Eb).
// Rows: promo/films/next30/b40.md. The format engine is ../../nwpe01/wpkit.js (shared by nwpe01–nwpe12).
//   0      "Winter starter pack: | *Cancer*" over the frosted grid; the sign shivering bottom-left, mid-hop.
//   items: a cookie tin of feelings · a candle that smells like home · a mug for every friend
//   5.60   the twist: a spare scarf, just in case (with capricorn).  6.71 beat change → "you brought a *spare*?"
//   last line: "*Always* a spare."  ♓ Pisces cries at the bottom all film.
import { makeWP } from '../wpkit.js'

const WP = makeWP({
  sign: 'cancer', partner: 'capricorn',
  items: [
    { label: "cookies baked for strangers", icon: 'tin', gag: 'bounce' },
    { label: "a candle named \"home\"", icon: 'candle', gag: 'glow' },
    { label: "a labelled mug per friend", icon: 'mug', gag: 'stack', n: 5 },
  ],
  twist: { label: "a spare scarf, for you", icon: 'scarf' },
  line1: "Cancer has been baking since *October*.",
  payoffLine: "you brought me a *spare*?",
  last: "*Always* a spare.",
})

export const DURATION = WP.DURATION
export const SCENES = WP.SCENES
export const CUES = WP.CUES
export const MUSIC = WP.MUSIC
export const TIMES = WP.T

// social hook: static caption from frame 0 (replaces the pack's popped title)
export const HOOK = "Cancer in winter: | *everyone\u2019s mom*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 6.5
