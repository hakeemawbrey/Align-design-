// kgse17 score: cinematic, Gm. Drop after the first-second pattern break; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from '../kgse01/scenes/guesskit.js'
export default { ...guessMusic('kgse17', { style: 'cinematic', key: 'Gm', seed: 3017, D: DURATION, T: EP.T, ending: 'cut' }), cues: CUES }
