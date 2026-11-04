// nwpe01 · WINTER STARTER PACK 1: "Winter starter pack: Aries" (15 s vertical, star_advice trial reel, jazzy C).
// Rows: promo/films/next30/b40.md. The format engine is ../wpkit.js (shared by nwpe01–nwpe12).
//   0      "Winter starter pack: | *Aries*" over the frosted grid; ♈ Aries shivering bottom-left, mid-hop.
//   1.16   shorts in the snow · 2.54 a snowball, already thrown · 3.93 cocoa, gulped (ow)
//   5.04   "and the *rare* item…"  5.60 the twist: racing to the first snow… and letting them win (♎ Libra).
//   6.71   card cut → ♎ LIBRA: "you let me *win*?"  last line: "Let them *win* one."  ♓ Pisces cries all film.
import { makeWP } from '../wpkit.js'

const WP = makeWP({
  sign: 'aries', partner: 'libra',
  items: [
    { label: 'shorts in the snow', icon: 'shorts', gag: 'shake', mood: 'squint', sweat: true },
    { label: 'a snowball, already thrown', icon: 'snowball', gag: 'spin' },
    { label: 'cocoa, gulped (ow)', icon: 'mug', gag: 'steam', mood: 'wide' },
  ],
  twist: { label: '…letting them win the race', icon: 'flag' },
  payoffLine: 'you let me *win*?',
  last: 'Let them *win* one.', lastAccent: '#ffb09a',
})

export const DURATION = WP.DURATION
export const SCENES = WP.SCENES
export const CUES = WP.CUES
export const MUSIC = WP.MUSIC
export const TIMES = WP.T
