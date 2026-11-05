// kgse14 score: funk, E. Drop after the first-second pattern break; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from '../kgse01/scenes/guesskit.js'
export default { ...guessMusic('kgse14', { style: 'funk', key: 'E', seed: 3014, D: DURATION, T: EP.T, ending: 'loop' }), cues: CUES }
