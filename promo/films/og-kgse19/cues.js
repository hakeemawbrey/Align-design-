// kgse19 score: jazzy, Eb. Drop after the first-second pattern break; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from './scenes/guesskit.js'
export default { ...guessMusic('og-kgse19', { style: 'jazzy', key: 'Eb', seed: 3019, D: DURATION, T: EP.T, ending: 'cut' }), cues: CUES }
