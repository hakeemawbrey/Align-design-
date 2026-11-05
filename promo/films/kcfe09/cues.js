// kcfe09 score: synthwave, Bm (style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.9: "it's totally casual!" · breakdown 8.85: "do you want more?" · lift 10.7: "…yeah." · hit 15.0: the last line.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kcfe09', duration: DURATION, music: { style: 'synthwave', key: 'Bm', seed: 909, sections: { drop: 0.9, breakdown: [8.85], lift: [10.7], outroAt: 15.0 }, hits: [15.0] }, cues: CUES }
