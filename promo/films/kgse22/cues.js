// kgse22 score: lofi, G. Drop after the first-second pattern break; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from '../kgse01/scenes/guesskit.js'
export default { ...guessMusic('kgse22', { style: 'lofi', key: 'G', seed: 3022, D: DURATION, T: EP.T, ending: 'loop' }), cues: CUES }
