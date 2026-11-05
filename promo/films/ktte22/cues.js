// ktte22 score: house, F (arranged by the style engine in promo/scripts/teaser-sound.mjs). drop on midnight · lift on the confetti · rings into the loop.
import { DURATION, CUES, LIFT } from './scenes/index.js'
export default { id: 'ktte22', duration: DURATION, music: { style: 'house', key: 'F', seed: 2922, sections: { drop: 0.12, lift: [LIFT], outroAt: DURATION - 1.6 }, hits: [LIFT] }, cues: CUES }
