// kgse19 score: jazzy, Eb. Drop after the first-second pattern break; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from '../kgse01/scenes/guesskit.js'
export default { ...guessMusic('kgse19', { style: 'jazzy', key: 'Eb', seed: 3019, D: DURATION, T: EP.T, ending: 'cut' }), cues: CUES }
