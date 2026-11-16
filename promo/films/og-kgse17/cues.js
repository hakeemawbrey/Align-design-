// kgse17 score: cinematic, Gm. Drop after the first-second pattern break; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from './scenes/guesskit.js'
export default { ...guessMusic('og-kgse17', { style: 'cinematic', key: 'Gm', seed: 3017, D: DURATION, T: EP.T, ending: 'cut' }), cues: CUES }
