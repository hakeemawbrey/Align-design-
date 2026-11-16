// kgse11 score: chiptune, F. Drop after the first-second pattern break; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from './scenes/guesskit.js'
export default { ...guessMusic('og-kgse11', { style: 'chiptune', key: 'F', seed: 3011, D: DURATION, T: EP.T, ending: 'cut' }), cues: CUES }   // og: ending 'cut', no loop in the social cut
