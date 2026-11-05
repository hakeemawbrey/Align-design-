// kgse23 score: synthwave, Fm. Breakdowns at each new round, lift + hit on each reveal.
import { CUES, EP } from './scenes/index.js'
import { guessLongMusic } from '../kgse01/scenes/guesskit.js'
export default { ...guessLongMusic('kgse23', { style: 'synthwave', key: 'Fm', seed: 3023, T: EP.T }), cues: CUES }
