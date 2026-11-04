// ngfe14 score: chiptune, B (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.3: the door opens · breakdown 4.35: the big half · lift 8.8: the card cut · hit 9.35: the flag plants.
import { DURATION, CUES } from './scenes/index.js'
import { musicConfig } from '../ngfe01/scenes/advent.js'
export default { ...musicConfig('ngfe14', 'chiptune', 'B', 2414, { breakdown: 4.35 }), duration: DURATION, cues: CUES }
