// kpmee04 score: dreamy, Bb (style engine in promo/scripts/teaser-sound.mjs). Loops: music runs to the seam.
//   drop 2.8: the scroll close-up · breakdown 7.0: "I just want them to know I care" · lift 15.4: the rewrite.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpmee04', duration: DURATION, music: { style: 'dreamy', key: 'Bb', seed: 3104, sections: { drop: 2.8, breakdown: [7.0], lift: [15.4], outroAt: DURATION - 0.5 }, hits: [24.8] }, cues: CUES }
