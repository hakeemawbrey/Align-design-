// kgse15 score: screwed, Am. Drop after the first-second pattern break; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from '../kgse01/scenes/guesskit.js'
export default { ...guessMusic('kgse15', { style: 'screwed', key: 'Am', seed: 3015, D: DURATION, T: EP.T, ending: 'cut' }), cues: CUES }
