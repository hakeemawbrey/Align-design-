// nhqe11 score: chiptune, F# (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.3: THEN · breakdown 5.0: the card cut to NOW · lift 7.9: THE STARS · hit 5.85: the toast pops · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nhqe11', duration: DURATION, music: { style: 'chiptune', key: 'F#', seed: 4831, sections: { drop: 2.3, breakdown: [5.0], lift: [7.9], outroAt: DURATION - 4.4 }, hits: [5.85] }, cues: CUES }
