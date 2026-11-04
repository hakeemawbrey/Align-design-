// nhse18 score: cinematic, Cm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 5.4: the survival guide opens · lift 17.4: THE STARS and the 28th at home · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nhse18', duration: DURATION, music: { style: 'cinematic', key: 'Cm', seed: 1818, sections: { drop: 5.4, lift: 17.4, outroAt: DURATION - 4.4 } }, cues: CUES }
