// kgse13 score: lofi, Em. Drop after the first-second pattern break; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from './scenes/guesskit.js'
export default { ...guessMusic('og-kgse13', { style: 'lofi', key: 'Em', seed: 3013, D: DURATION, T: EP.T, ending: 'cut' }), cues: CUES }
