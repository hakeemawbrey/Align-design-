// kgse10 score: lofi, D. Drop after the first-second pattern break; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from '../kgse01/scenes/guesskit.js'
export default { ...guessMusic('kgse10', { style: 'lofi', key: 'D', seed: 3010, D: DURATION, T: EP.T, ending: 'cut' }), cues: CUES }
