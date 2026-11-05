// ktte15 score: house, D (arranged by the style engine in promo/scripts/teaser-sound.mjs). drop after the silence · lift on phones down · rings into the loop.
import { DURATION, CUES, LIFT } from './scenes/index.js'
export default { id: 'ktte15', duration: DURATION, music: { style: 'house', key: 'D', seed: 2915, sections: { drop: 0.12, lift: [LIFT], outroAt: DURATION - 1.6 }, hits: [LIFT] }, cues: CUES }
