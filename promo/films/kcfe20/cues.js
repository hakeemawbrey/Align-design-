// kcfe20 score: dreamy, Bb (style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.6: the freeze lets go · breakdowns 16.1 confessionals, 54.4 the lights go out · lifts 42.1 the dinner, 66.1 dessert · hits 58.6 "I love you", 86.8 the last line.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kcfe20', duration: DURATION, music: { style: 'dreamy', key: 'Bb', seed: 920, sections: { drop: 2.6, breakdown: [16.1, 54.4], lift: [42.1, 66.1], outroAt: 86.8 }, hits: [58.6, 86.8] }, cues: CUES }
