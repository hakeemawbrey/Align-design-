// og-kgse01 score (copy of kgse01's): chiptune, C. Drop after the record scratch; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from './scenes/guesskit.js'
export default { ...guessMusic('og-kgse01', { style: 'chiptune', key: 'C', seed: 3001, D: DURATION, T: EP.T, ending: 'loop' }), cues: CUES }
