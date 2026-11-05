// kgse09 score: synthwave, F#m. Drop after the first-second pattern break; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from '../kgse01/scenes/guesskit.js'
export default { ...guessMusic('kgse09', { style: 'synthwave', key: 'F#m', seed: 3009, D: DURATION, T: EP.T, ending: 'cut' }), cues: CUES }
