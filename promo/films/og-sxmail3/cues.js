// sxmail3 score: lofi, Gm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the letter's first handwritten line · breakdown 11.71: the gavel ("order!") · lift 13.93: the answer
//   · hit 23.35: the seal · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sxmail3', duration: DURATION, music: { style: 'lofi', key: 'Gm', seed: 103, sections: { drop: 2.82, breakdown: [11.71], lift: [13.93], outroAt: DURATION - 4.4 }, hits: [23.35] }, cues: CUES }
