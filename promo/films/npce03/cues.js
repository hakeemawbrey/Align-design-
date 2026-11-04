// npce03 score: chiptune, D (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.35: the dog stops and wags · breakdown 3.3: it trots over · lift 4.4: fountains · hit 5.6: the card cut · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'npce03', duration: DURATION, music: { style: 'chiptune', key: 'D', seed: 4803, sections: { drop: 1.35, breakdown: [3.3], lift: [4.4], outroAt: DURATION - 4.4 }, hits: [5.6] }, cues: CUES }
