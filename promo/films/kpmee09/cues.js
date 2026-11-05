// kpmee09 score: synthwave, E (style engine in promo/scripts/teaser-sound.mjs). Loops: music runs to the seam.
//   drop 2.6: the sack lands · breakdown 7.0: Pisces's voice note · lift 13.8: the reply.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpmee09', duration: DURATION, music: { style: 'synthwave', key: 'E', seed: 3109, sections: { drop: 2.6, breakdown: [7.0], lift: [13.8], outroAt: DURATION - 0.5 }, hits: [20.6] }, cues: CUES }
