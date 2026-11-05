// ktte02 score: lofi, F (arranged by the style engine in promo/scripts/teaser-sound.mjs). drop on the first slam · lift on the twist's pick · lands under the last line.
import { DURATION, CUES, LIFT } from './scenes/index.js'
export default { id: 'ktte02', duration: DURATION, music: { style: 'lofi', key: 'F', seed: 2902, sections: { drop: 0.12, lift: [LIFT], outroAt: DURATION - 1.6 }, hits: [LIFT] }, cues: CUES }
