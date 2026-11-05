// kgse18 score: house, F. Drop after the first-second pattern break; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from '../kgse01/scenes/guesskit.js'
export default { ...guessMusic('kgse18', { style: 'house', key: 'F', seed: 3018, D: DURATION, T: EP.T, ending: 'loop' }), cues: CUES }
