// og-kgse02 score (copy of kgse02's): pop, E. Drop after the whip; lift + hit on the reveal.
import { DURATION, CUES, EP } from './scenes/index.js'
import { guessMusic } from './scenes/guesskit.js'
export default { ...guessMusic('og-kgse02', { style: 'pop', key: 'E', seed: 3002, D: DURATION, T: EP.T, ending: 'loop' }), cues: CUES }
