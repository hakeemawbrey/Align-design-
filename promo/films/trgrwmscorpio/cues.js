// trgrwmscorpio score: pop, E, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the shades slide on · breakdown 20.25: the phone buzzes · lift 20.95: the grin · hit 23.05: "cancelled."
//   · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trgrwmscorpio', duration: DURATION, music: { style: 'pop', key: 'E', seed: 404, sections: { drop: 2.82, breakdown: [20.25], lift: [20.95], outroAt: DURATION - 4.4 }, hits: [23.05] }, cues: CUES }
