// ktte16 score: cinematic, G (arranged by the style engine in promo/scripts/teaser-sound.mjs). drop on the tug · lift on ONE DAY EACH · lands under the last line.
import { DURATION, CUES, LIFT } from './scenes/index.js'
export default { id: 'ktte16', duration: DURATION, music: { style: 'cinematic', key: 'G', seed: 2916, sections: { drop: 0.12, lift: [LIFT], outroAt: DURATION - 1.6 }, hits: [LIFT] }, cues: CUES }
