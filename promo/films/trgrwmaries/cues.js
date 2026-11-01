// trgrwmaries score: pop, C, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the four-second spin · breakdown 20.25: the phone buzzes · lift 21.3: the last spin · hit 23.05: "Still."
//   · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trgrwmaries', duration: DURATION, music: { style: 'pop', key: 'C', seed: 402, sections: { drop: 2.82, breakdown: [20.25], lift: [21.3], outroAt: DURATION - 4.4 }, hits: [23.05] }, cues: CUES }
