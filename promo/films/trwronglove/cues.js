// trwronglove score: chiptune, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.3: answer 1's jump cut · breakdown 10.6: the tape-stop turn · lift 13.0: the RIGHT ANSWER stamp · hit 13.0
//   · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trwronglove', duration: DURATION, music: { style: 'chiptune', key: 'A', seed: 1702, sections: { drop: 2.3, breakdown: [10.6], lift: [13.0], outroAt: DURATION - 4.4 }, hits: [13.0] }, cues: CUES }
