// nhse24 score: cinematic, D (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 5.4: the survival badges · lift 17.4: THE STARS and the finale heap · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nhse24', duration: DURATION, music: { style: 'cinematic', key: 'D', seed: 2424, sections: { drop: 5.4, lift: 17.4, outroAt: DURATION - 2.4 } }, cues: CUES }
