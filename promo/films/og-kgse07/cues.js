// kgse07 score: jazzy, Bb. Drop after the first-second pattern break; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from './scenes/guesskit.js'
export default { ...guessMusic('og-kgse07', { style: 'jazzy', key: 'Bb', seed: 3007, D: DURATION, T: EP.T, ending: 'cut' }), cues: CUES }
