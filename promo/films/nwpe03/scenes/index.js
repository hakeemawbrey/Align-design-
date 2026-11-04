// nwpe03 · WINTER STARTER PACK 3: "Winter starter pack: Gemini" (13 s vertical, star_advice trial reel, jazzy D).
// Rows: promo/films/next30/b40.md. The format engine is ../../nwpe01/wpkit.js (shared by nwpe01–nwpe12).
//   0      "Winter starter pack: | *Gemini*" over the frosted grid; the sign shivering bottom-left, mid-hop.
//   items: three hats, can't choose · a group chat on fire · two plans, one night
//   5.60   the twist: listening, all the way (with sagittarius).  6.71 beat change → "you remembered *all* of it?"
//   last line: "*All* ears."  ♓ Pisces cries at the bottom all film.
import { makeWP } from '../../nwpe01/wpkit.js'

const WP = makeWP({
  sign: 'gemini', partner: 'sagittarius',
  items: [
    {label: "three hats, can't choose", icon: "hat", gag: "stack", n: 3},
    {label: "a group chat on fire", icon: "phone", gag: "shake"},
    {label: "two plans, one night", icon: "cal", gag: "bounce"},
  ],
  twist: { label: "listening, all the way", icon: 'ear' },
  payoffLine: "you remembered *all* of it?",
  last: "*All* ears.",
})

export const DURATION = WP.DURATION
export const SCENES = WP.SCENES
export const CUES = WP.CUES
export const MUSIC = WP.MUSIC
export const TIMES = WP.T
