// og-nwpe06: social rework of nwpe06 (static HOOK outline until the beat change; no bug, title or end card; crazier items).
// Kit: ../wpkit.js (an og copy of nwpe01/wpkit.js). Was:
// nwpe06 · WINTER STARTER PACK 6: "Winter starter pack: Virgo" (13 s vertical, star_advice trial reel, jazzy F).
// Rows: promo/films/next30/b40.md. The format engine is ../../nwpe01/wpkit.js (shared by nwpe01–nwpe12).
//   0      "Winter starter pack: | *Virgo*" over the frosted grid; the sign shivering bottom-left, mid-hop.
//   items: a gift list with tabs · the perfect wrap job · a boot-drying rota
//   5.60   the twist: noticing your gloves are thin (with taurus).  6.71 beat change → "you *noticed*?"
//   last line: "Noticed. *Handled*."  ♓ Pisces cries at the bottom all film.
import { makeWP } from '../wpkit.js'

const WP = makeWP({
  sign: 'virgo', partner: 'taurus',
  items: [
    { label: "a colour-coded gift list", icon: 'list', gag: 'bounce' },
    { label: "wrapping with a ruler", icon: 'gift', gag: 'sparkle' },
    { label: "a laminated boot rota", icon: 'boot', gag: 'stack', n: 4 },
  ],
  twist: { label: "noticing your thin gloves", icon: 'mitten' },
  line1: "Virgo started the gift list in *July*.",
  payoffLine: "you *noticed*?",
  last: "Noticed. *Handled*.",
})

export const DURATION = WP.DURATION
export const SCENES = WP.SCENES
export const CUES = WP.CUES
export const MUSIC = WP.MUSIC
export const TIMES = WP.T

// social hook: static caption from frame 0 (replaces the pack's popped title)
export const HOOK = "Virgo in winter: | *a laminated rota*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 6.5
