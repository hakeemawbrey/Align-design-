// ngie03 score: chiptune · G (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.4: beat 1 · breakdown 5.2: the turn · lift 8.0: THE STARS · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ngie03', duration: DURATION, music: { style: 'chiptune', key: 'G', seed: 3823, sections: { drop: 2.4, breakdown: [5.2], lift: [8.0], outroAt: DURATION - 2.4 }, hits: [8.0] }, cues: CUES }
