// nh15e24 score: cinematic, D (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.4: plan 1 · lift 13.6: one big table · breakdown 24.0: "can we just plan it together?" · lift 29.1: the lesson
//   · hit 34.0: all twelve · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nh15e24', duration: DURATION, music: { style: 'cinematic', key: 'D', seed: 1524, sections: { drop: 3.4, breakdown: [24.0], lift: [13.6, 29.1], outroAt: DURATION - 2.4 }, hits: [34.0] }, cues: CUES }
