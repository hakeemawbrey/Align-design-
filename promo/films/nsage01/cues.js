// nsage01 score: pop, D (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.6: rule one · breakdown 12.1: rule three (the car) · lift 16.1: the last line · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nsage01', duration: DURATION, music: { style: 'pop', key: 'D', seed: 1001, sections: { drop: 2.6, breakdown: [12.1], lift: [16.1], outroAt: DURATION - 2.4 }, hits: [16.1] }, cues: CUES }
