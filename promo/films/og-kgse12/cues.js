// kgse12 score: dreamy, Ab. Drop after the first-second pattern break; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from './scenes/guesskit.js'
export default { ...guessMusic('og-kgse12', { style: 'dreamy', key: 'Ab', seed: 3012, D: DURATION, T: EP.T, ending: 'cut' }), cues: CUES }   // og: ending 'cut', no loop in the social cut
