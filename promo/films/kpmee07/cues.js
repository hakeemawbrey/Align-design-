// kpmee07 score: jazzy, C (style engine in promo/scripts/teaser-sound.mjs). Loops: music runs to the seam.
//   drop 2.8: Pisces waiting · breakdown 10.5: the coin flip · lift 16.0: the reply.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpmee07', duration: DURATION, music: { style: 'jazzy', key: 'C', seed: 3107, sections: { drop: 2.8, breakdown: [10.5], lift: [16.0], outroAt: DURATION - 0.5 }, hits: [22.4] }, cues: CUES }
