// kgse24 score: pop, A. Breakdowns at each new round, lift + hit on each reveal.
import { CUES, EP } from './scenes/index.js'
import { guessLongMusic } from './scenes/guesskit.js'
export default { ...guessLongMusic('og-kgse24', { style: 'pop', key: 'A', seed: 3024, T: EP.T }), cues: CUES }
