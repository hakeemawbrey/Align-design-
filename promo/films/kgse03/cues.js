// kgse03 score: dreamy, F. Drop after the first-second pattern break; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from '../kgse01/scenes/guesskit.js'
export default { ...guessMusic('kgse03', { style: 'dreamy', key: 'F', seed: 3003, D: DURATION, T: EP.T, ending: 'cut' }), cues: CUES }
