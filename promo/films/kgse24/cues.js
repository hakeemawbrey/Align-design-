// kgse24 score: pop, A. Breakdowns at each new round, lift + hit on each reveal.
import { CUES, EP } from './scenes/index.js'
import { guessLongMusic } from '../kgse01/scenes/guesskit.js'
export default { ...guessLongMusic('kgse24', { style: 'pop', key: 'A', seed: 3024, T: EP.T }), cues: CUES }
