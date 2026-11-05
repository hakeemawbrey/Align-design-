// ksbe18 score: funk, Bb (style engine in promo/scripts/teaser-sound.mjs). Long episode: drop on round 1, a breakdown
// under the rewind, the lift into round 2, and the tonic on the verdict. Hard cut, no end card.
import { DURATION, CUES } from './scenes/index.js'
import { L } from './scenes/times.js'
export default { id: 'ksbe18', duration: DURATION, music: { style: 'funk', key: 'Bb', seed: 1718, sections: { drop: 0.8, breakdown: [L.REW.at], lift: [L.R2 + 0.1], outroAt: L.LAST } }, cues: CUES }
