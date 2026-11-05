// kgse02 score: pop, E. Drop after the whip zoom; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from '../kgse01/scenes/guesskit.js'
export default { ...guessMusic('kgse02', { style: 'pop', key: 'E', seed: 3002, D: DURATION, T: EP.T, ending: 'loop' }), cues: CUES }
