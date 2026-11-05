// ktte11 score: synthwave, F# (arranged by the style engine in promo/scripts/teaser-sound.mjs). drop on the dodge · lift on SAY THE FEELING · rings into the loop.
import { DURATION, CUES, LIFT } from './scenes/index.js'
export default { id: 'ktte11', duration: DURATION, music: { style: 'synthwave', key: 'F#', seed: 2911, sections: { drop: 0.12, lift: [LIFT], outroAt: DURATION - 1.6 }, hits: [LIFT] }, cues: CUES }
