// nc14e18 score: cinematic, Cm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 6.8: the scales wobble · breakdown 10.3: "remember the snow day?" · lift 14.2: THE STARS · hit 18.6: the scales settle · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nc14e18', duration: DURATION, music: { style: 'cinematic', key: 'Cm', seed: 1418, sections: { drop: 6.8, breakdown: [10.3], lift: [14.2], outroAt: DURATION - 4.4 }, hits: [18.6] }, cues: CUES }
