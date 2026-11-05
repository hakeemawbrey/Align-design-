// ktte03 score: funk, A (arranged by the style engine in promo/scripts/teaser-sound.mjs). drop on the first grab · lift on the honest pick · rings into the loop.
import { DURATION, CUES, LIFT } from './scenes/index.js'
export default { id: 'ktte03', duration: DURATION, music: { style: 'funk', key: 'A', seed: 2903, sections: { drop: 0.12, lift: [LIFT], outroAt: DURATION - 1.6 }, hits: [LIFT] }, cues: CUES }
