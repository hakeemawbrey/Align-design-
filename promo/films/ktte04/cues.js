// ktte04 score: dreamy, D (arranged by the style engine in promo/scripts/teaser-sound.mjs). drop on the crash · lift on CALL A FRIEND · lands under the last line.
import { DURATION, CUES, LIFT } from './scenes/index.js'
export default { id: 'ktte04', duration: DURATION, music: { style: 'dreamy', key: 'D', seed: 2904, sections: { drop: 0.12, lift: [LIFT], outroAt: DURATION - 1.6 }, hits: [LIFT] }, cues: CUES }
