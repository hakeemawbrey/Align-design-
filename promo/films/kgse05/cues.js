// kgse05 score: cinematic, Dm. Drop after the first-second pattern break; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from '../kgse01/scenes/guesskit.js'
export default { ...guessMusic('kgse05', { style: 'cinematic', key: 'Dm', seed: 3005, D: DURATION, T: EP.T, ending: 'cut' }), cues: CUES }
