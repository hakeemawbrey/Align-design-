// sxmail2 score: pop, Eb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the letter's first handwritten line · breakdown 10.6: the typing… "lol" · lift 13.93: the answer
//   · hits: "lol" 10.95, the seal 23.35 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sxmail2', duration: DURATION, music: { style: 'pop', key: 'Eb', seed: 102, sections: { drop: 2.82, breakdown: [10.6], lift: [13.93], outroAt: DURATION - 4.4 }, hits: [10.95, 23.35] }, cues: CUES }
