// nhse19 score: chiptune, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 5.4: the survival guide opens · lift 17.4: THE STARS and the scarf · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nhse19', duration: DURATION, music: { style: 'chiptune', key: 'A', seed: 1919, sections: { drop: 5.4, lift: 17.4, outroAt: DURATION - 4.4 } }, cues: CUES }
