// kgse21 score: funk, Bb. Drop after the first-second pattern break; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from './scenes/guesskit.js'
export default { ...guessMusic('og-kgse21', { style: 'funk', key: 'Bb', seed: 3021, D: DURATION, T: EP.T, ending: 'cut' }), cues: CUES }
