// ktte21 score: synthwave, Bb (arranged by the style engine in promo/scripts/teaser-sound.mjs). drop on the scratch · lift on the sprint to ME · lands under the last line.
import { DURATION, CUES, LIFT } from './scenes/index.js'
export default { id: 'ktte21', duration: DURATION, music: { style: 'synthwave', key: 'Bb', seed: 2921, sections: { drop: 0.12, lift: [LIFT], outroAt: DURATION - 1.6 }, hits: [LIFT] }, cues: CUES }
