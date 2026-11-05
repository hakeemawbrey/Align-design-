// kgse20 score: pop, D. Drop after the first-second pattern break; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from '../kgse01/scenes/guesskit.js'
export default { ...guessMusic('kgse20', { style: 'pop', key: 'D', seed: 3020, D: DURATION, T: EP.T, ending: 'loop' }), cues: CUES }
