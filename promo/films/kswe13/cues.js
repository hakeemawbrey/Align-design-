// kswe13 score: chiptune, G (style engine in promo/scripts/teaser-sound.mjs). Hard cut at 20.0.
//   drop 2.8: early · breakdown 6.8: the lasagne · lift 13.8: home, the group hug.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kswe13', duration: DURATION, music: { style: 'chiptune', key: 'G', seed: 1113, sections: { drop: 2.8, breakdown: [6.8, 10.6], lift: [13.8], outroAt: 18.2 } }, cues: CUES }
