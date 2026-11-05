// kdye19 score: funk, E (style engine in promo/scripts/teaser-sound.mjs). Loops: the outro rings into the seam.
// drop 3.4: the cake · lift 19.0: the playlist · breakdown 49.0: the card · hits 1.3 the stamp, 58.3 the card is read.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kdye19', duration: DURATION, music: { style: 'funk', key: 'E', seed: 1619, sections: { drop: 3.4, lift: [19.0], breakdown: [49.0], outroAt: 67.8 }, hits: [1.3, 58.3] }, cues: CUES }
