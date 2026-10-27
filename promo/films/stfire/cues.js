// stfire score — house, A, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the box opens (Aries' first line) · breakdown 11.6: THE STARS ask · lift 14.95: "Passion listens, too." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stfire', duration: DURATION, music: { style: 'house', key: 'A', seed: 211, sections: { drop: 2.82, breakdown: 11.6, lift: 14.95, outroAt: DURATION - 4.4 } }, cues: CUES }
