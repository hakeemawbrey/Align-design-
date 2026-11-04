// ngfe23 score: chiptune, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.3: the door opens · breakdown 4.55: the crate arrives · lift 8.8: the card cut · hit 9.35: the flag plants.
import { DURATION, CUES } from './scenes/index.js'
import { musicConfig } from '../ngfe01/scenes/advent.js'
export default { ...musicConfig('ngfe23', 'chiptune', 'E', 2423, { breakdown: 4.55 }), duration: DURATION, cues: CUES }
