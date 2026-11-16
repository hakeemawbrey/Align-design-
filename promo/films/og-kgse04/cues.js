// kgse04 score: funk, A. Drop after the first-second pattern break; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from './scenes/guesskit.js'
export default { ...guessMusic('og-kgse04', { style: 'funk', key: 'A', seed: 3004, D: DURATION, T: EP.T, ending: 'cut' }), cues: CUES }   // og: ending 'cut', no loop in the social cut
