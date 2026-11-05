// ktte06 score: chiptune, B (arranged by the style engine in promo/scripts/teaser-sound.mjs). drop on the first slam · lift on BE THERE · rings into the loop.
import { DURATION, CUES, LIFT } from './scenes/index.js'
export default { id: 'ktte06', duration: DURATION, music: { style: 'chiptune', key: 'B', seed: 2906, sections: { drop: 0.12, lift: [LIFT], outroAt: DURATION - 1.6 }, hits: [LIFT] }, cues: CUES }
