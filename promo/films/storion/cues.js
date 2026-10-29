// storion score — cinematic, Cm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   0.6 the brass hit under the title · drop 4.49: Night I · breakdown 18.93: Scorpius rises from the other side of the
//   sky · 25.4 the music grinds to a halt (tape stop): crickets, "…oh." · lift 27.82: someone new walks toward him ·
//   hit 29.25: they meet · breakdown 32.27: ★ lesson unlocked · lift 38.38: still chasing · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'storion', duration: DURATION, music: { style: 'cinematic', key: 'Cm', seed: 211, sections: { drop: 4.489, breakdown: [18.933, 32.267], lift: [27.822, 38.378], outroAt: DURATION - 4.4 }, hits: [0.6, 29.25] }, cues: CUES }
