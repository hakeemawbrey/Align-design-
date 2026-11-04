// ngfe13 score: pop, G (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.3: the door opens · breakdown 5.75: your car's ready · lift 8.8: the card cut · hit 9.35: the flag plants.
import { DURATION, CUES } from './scenes/index.js'
import { musicConfig } from '../ngfe01/scenes/advent.js'
export default { ...musicConfig('ngfe13', 'pop', 'G', 2413, { breakdown: 5.75 }), duration: DURATION, cues: CUES }
