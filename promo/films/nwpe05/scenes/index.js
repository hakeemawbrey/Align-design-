// nwpe05 · WINTER STARTER PACK 5: "Winter starter pack: Leo" (13 s vertical, star_advice trial reel, jazzy E).
// Rows: promo/films/next30/b40.md. The format engine is ../../nwpe01/wpkit.js (shared by nwpe01–nwpe12).
//   0      "Winter starter pack: | *Leo*" over the frosted grid; the sign shivering bottom-left, mid-hop.
//   items: a coat that's an event · the holiday photo, take 40 · glitter, everywhere
//   5.60   the twist: making room for the shy one (with cancer).  6.71 beat change → "get in! there's *room*."
//   last line: "*Room* in the frame."  ♓ Pisces cries at the bottom all film.
import { makeWP } from '../../nwpe01/wpkit.js'

const WP = makeWP({
  sign: 'leo', partner: 'cancer',
  items: [
    {label: "a coat that's an event", icon: "coat", gag: "sparkle"},
    {label: "the holiday photo, take 40", icon: "camera", gag: "shake"},
    {label: "glitter, everywhere", icon: "glitter", gag: "spin"},
  ],
  twist: { label: "making room for the shy one", icon: 'camera' },
  payoffLine: "get in! there's *room*.",
  last: "*Room* in the frame.",
})

export const DURATION = WP.DURATION
export const SCENES = WP.SCENES
export const CUES = WP.CUES
export const MUSIC = WP.MUSIC
export const TIMES = WP.T
