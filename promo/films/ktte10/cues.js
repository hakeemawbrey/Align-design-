// ktte10 score: cinematic, Eb (arranged by the style engine in promo/scripts/teaser-sound.mjs). drop on the lift · lift on NOT REALLY · lands under the hug.
import { DURATION, CUES, LIFT } from './scenes/index.js'
export default { id: 'ktte10', duration: DURATION, music: { style: 'cinematic', key: 'Eb', seed: 2910, sections: { drop: 0.12, lift: [LIFT], outroAt: DURATION - 1.6 }, hits: [LIFT] }, cues: CUES }
