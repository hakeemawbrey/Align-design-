// kgse06 score: house, C. Drop after the first-second pattern break; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from './scenes/guesskit.js'
export default { ...guessMusic('og-kgse06', { style: 'house', key: 'C', seed: 3006, D: DURATION, T: EP.T, ending: 'cut' }), cues: CUES }   // og: ending 'cut', no loop in the social cut
