// kcfe15 score: cinematic, D (style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.6: the first booth · breakdown 12.2: "and how do you feel?" · lift 13.95: "…actually great." · hit 19.0: the last line.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kcfe15', duration: DURATION, music: { style: 'cinematic', key: 'D', seed: 915, sections: { drop: 1.6, breakdown: [12.2], lift: [13.95], outroAt: 19.0 }, hits: [19.0] }, cues: CUES }
