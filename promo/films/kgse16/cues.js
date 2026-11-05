// kgse16 score: synthwave, Cm. Drop after the first-second pattern break; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from '../kgse01/scenes/guesskit.js'
export default { ...guessMusic('kgse16', { style: 'synthwave', key: 'Cm', seed: 3016, D: DURATION, T: EP.T, ending: 'loop' }), cues: CUES }
