// nwpe06 · WINTER STARTER PACK 6: "Winter starter pack: Virgo" (15 s vertical, star_advice trial reel, jazzy F).
// Rows: promo/films/next30/b40.md. The format engine is ../../nwpe01/wpkit.js (shared by nwpe01–nwpe12).
//   0      "Winter starter pack: | *Virgo*" over the frosted grid; the sign shivering bottom-left, mid-hop.
//   items: a gift list with tabs · the perfect wrap job · a boot-drying rota
//   5.60   the twist: noticing your gloves are thin (with taurus).  6.71 card cut → "you *noticed*?"
//   last line: "Noticed. *Handled*."  ♓ Pisces cries at the bottom all film.
import { makeWP } from '../../nwpe01/wpkit.js'

const WP = makeWP({
  sign: 'virgo', partner: 'taurus',
  items: [
    {label: "a gift list with tabs", icon: "list", gag: "bounce"},
    {label: "the perfect wrap job", icon: "gift", gag: "sparkle"},
    {label: "a boot-drying rota", icon: "boot", gag: "stack", n: 4},
  ],
  twist: { label: "noticing your gloves are thin", icon: 'mitten' },
  payoffLine: "you *noticed*?",
  last: "Noticed. *Handled*.",
})

export const DURATION = WP.DURATION
export const SCENES = WP.SCENES
export const CUES = WP.CUES
export const MUSIC = WP.MUSIC
export const TIMES = WP.T
