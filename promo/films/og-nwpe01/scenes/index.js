// og-nwpe01: social rework of nwpe01 (static HOOK box until the beat change; no bug, title or end card; crazier items).
// Kit: ../wpkit.js (an og copy of nwpe01/wpkit.js). Was:
// nwpe01 · WINTER STARTER PACK 1: "Winter starter pack: Aries" (13 s vertical, star_advice trial reel, jazzy C).
// Rows: promo/films/next30/b40.md. The format engine is ../wpkit.js (shared by nwpe01–nwpe12).
//   0      "Winter starter pack: | *Aries*" over the frosted grid; ♈ Aries shivering bottom-left, mid-hop.
//   1.16   shorts in the snow · 2.54 a snowball, already thrown · 3.93 cocoa, gulped (ow)
//   5.04   "and the *rare* item…"  5.60 the twist: racing to the first snow… and letting them win (♎ Libra).
//   6.71   beat change → ♎ LIBRA: "you let me *win*?"  last line: "Let them *win* one."  ♓ Pisces cries all film.
import { makeWP } from '../wpkit.js'

const WP = makeWP({
  sign: 'aries', partner: 'libra',
  items: [
    { label: 'shorts in a blizzard', icon: 'shorts', gag: 'shake', mood: 'squint', sweat: true },
    { label: 'a snowball before hello', icon: 'snowball', gag: 'spin' },
    { label: 'lava-hot cocoa, chugged', icon: 'mug', gag: 'steam', mood: 'wide' },
  ],
  twist: { label: '…letting someone else win', icon: 'flag' },
  line1: 'Aries treats winter like a *dare*.',
  payoffLine: 'wait. you let me *WIN*?',
  last: 'Let them *win* one.', lastAccent: '#ffb09a',
})

export const DURATION = WP.DURATION
export const SCENES = WP.SCENES
export const CUES = WP.CUES
export const MUSIC = WP.MUSIC
export const TIMES = WP.T

// social hook: static caption from frame 0 (replaces the pack's popped title)
export const HOOK = "Aries in winter: | *shorts.* Always."
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 6.5
