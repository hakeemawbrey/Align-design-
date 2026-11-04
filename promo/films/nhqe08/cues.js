// nhqe08 score: cinematic, Cm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.3: THEN · breakdown 5.0: the card cut to NOW · lift 7.9: THE STARS · hit 6.2: the vault opens · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nhqe08', duration: DURATION, music: { style: 'cinematic', key: 'Cm', seed: 4828, sections: { drop: 2.3, breakdown: [5.0], lift: [7.9], outroAt: DURATION - 4.4 }, hits: [6.2] }, cues: CUES }
