// ktte19 score: chiptune, A (arranged by the style engine in promo/scripts/teaser-sound.mjs). drop on the stampede · lift on VOICE NOTE · rings into the loop.
import { DURATION, CUES, LIFT } from './scenes/index.js'
export default { id: 'ktte19', duration: DURATION, music: { style: 'chiptune', key: 'A', seed: 2919, sections: { drop: 0.12, lift: [LIFT], outroAt: DURATION - 1.6 }, hits: [LIFT] }, cues: CUES }
