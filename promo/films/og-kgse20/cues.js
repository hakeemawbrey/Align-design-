// kgse20 score: pop, D. Drop after the first-second pattern break; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from './scenes/guesskit.js'
export default { ...guessMusic('og-kgse20', { style: 'pop', key: 'D', seed: 3020, D: DURATION, T: EP.T, ending: 'loop' }), cues: CUES }
