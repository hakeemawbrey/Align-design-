// og-nwpe07: social rework of nwpe07 (static HOOK box until the beat change; no bug, title or end card; crazier items).
// Kit: ../wpkit.js (an og copy of nwpe01/wpkit.js). Was:
// nwpe07 · WINTER STARTER PACK 7: "Winter starter pack: Libra" (13 s vertical, star_advice trial reel, jazzy F#).
// Rows: promo/films/next30/b40.md. The format engine is ../../nwpe01/wpkit.js (shared by nwpe01–nwpe12).
//   0      "Winter starter pack: | *Libra*" over the frosted grid; the sign shivering bottom-left, mid-hop.
//   items: a matching hat and scarf · a mug that matches the throw · a snow-day playlist
//   5.60   the twist: finally picking the plan (with aries).  6.71 beat change → "the ice rink. I *pick* the ice rink."
//   last line: "Your vote *counts*."  ♓ Pisces cries at the bottom all film.
import { makeWP } from '../wpkit.js'

const WP = makeWP({
  sign: 'libra', partner: 'aries',
  items: [
    { label: "a hat that matches the snow", icon: 'hat', gag: 'glow' },
    { label: "a mug matching the blanket", icon: 'mug', gag: 'bounce' },
    { label: "a playlist for each mood", icon: 'music', gag: 'bounce' },
  ],
  twist: { label: "finally picking the plan", icon: 'rink' },
  line1: "Libra has been choosing a scarf for *an hour*.",
  payoffLine: "the ice rink. I *pick* the ice rink.",
  last: "Your vote *counts*.",
})

export const DURATION = WP.DURATION
export const SCENES = WP.SCENES
export const CUES = WP.CUES
export const MUSIC = WP.MUSIC
export const TIMES = WP.T

// social hook: static caption from frame 0 (replaces the pack's popped title)
export const HOOK = "Libra in winter: | *it all matches*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 6.5
