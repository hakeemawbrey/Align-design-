// sr01blind score — dreamy, D, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.93: the cards start flying · lift 10.6: "the stars are giving you a chance." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sr01blind', duration: DURATION, music: { style: 'dreamy', key: 'D', seed: 101, sections: { drop: 3.933, lift: 10.6, outroAt: DURATION - 4.4 } }, cues: CUES }
