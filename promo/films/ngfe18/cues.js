// ngfe18 score: cinematic, Cm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.3: the door opens · breakdown 6.35: worth it. · lift 8.8: the card cut · hit 9.35: the flag plants.
import { DURATION, CUES } from './scenes/index.js'
import { musicConfig } from '../ngfe01/scenes/advent.js'
export default { ...musicConfig('ngfe18', 'cinematic', 'Cm', 2418, { breakdown: 6.35 }), duration: DURATION, cues: CUES }
