// og-nwpe05: social rework of nwpe05 (static HOOK box until the beat change; no bug, title or end card; crazier items).
// Kit: ../wpkit.js (an og copy of nwpe01/wpkit.js). Was:
// nwpe05 · WINTER STARTER PACK 5: "Winter starter pack: Leo" (13 s vertical, star_advice trial reel, jazzy E).
// Rows: promo/films/next30/b40.md. The format engine is ../../nwpe01/wpkit.js (shared by nwpe01–nwpe12).
//   0      "Winter starter pack: | *Leo*" over the frosted grid; the sign shivering bottom-left, mid-hop.
//   items: a coat that's an event · the holiday photo, take 40 · glitter, everywhere
//   5.60   the twist: making room for the shy one (with cancer).  6.71 beat change → "get in! there's *room*."
//   last line: "*Room* in the frame."  ♓ Pisces cries at the bottom all film.
import { makeWP } from '../wpkit.js'

const WP = makeWP({
  sign: 'leo', partner: 'cancer',
  items: [
    { label: "a coat with a spotlight", icon: 'coat', gag: 'sparkle' },
    { label: "holiday photo, take 87", icon: 'camera', gag: 'shake' },
    { label: "glitter on the snowman", icon: 'glitter', gag: 'spin' },
  ],
  twist: { label: "room for the shy one", icon: 'camera' },
  line1: "Leo's winter has a *dress code*.",
  payoffLine: "get in! there's *room*.",
  last: "*Room* in the frame.",
})

export const DURATION = WP.DURATION
export const SCENES = WP.SCENES
export const CUES = WP.CUES
export const MUSIC = WP.MUSIC
export const TIMES = WP.T

// social hook: static caption from frame 0 (replaces the pack's popped title)
export const HOOK = "Leo in winter: | *photo, take 87*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 6.5
