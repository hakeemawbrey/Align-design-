// ngfe24 score: cinematic, D (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.3: the door opens · breakdown 5.35: Tuesdays with you · lift 8.8: the card cut · hit 9.35: the flag plants.
import { DURATION, CUES } from './scenes/index.js'
import { musicConfig } from '../ngfe01/scenes/advent.js'
export default { ...musicConfig('ngfe24', 'cinematic', 'D', 2424, { breakdown: 5.35 }), duration: DURATION, cues: CUES }
