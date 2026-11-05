// ktte13 score: pop, C (arranged by the style engine in promo/scripts/teaser-sound.mjs). drop on the first slam · lift on PASTA · lands under the last line.
import { DURATION, CUES, LIFT } from './scenes/index.js'
export default { id: 'ktte13', duration: DURATION, music: { style: 'pop', key: 'C', seed: 2913, sections: { drop: 0.12, lift: [LIFT], outroAt: DURATION - 1.6 }, hits: [LIFT] }, cues: CUES }
