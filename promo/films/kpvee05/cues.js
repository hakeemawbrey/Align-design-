// kpvee05 score: jazzy, E (style engine in promo/scripts/teaser-sound.mjs). Loops (22 s).
//   drop 0.15: Venus bursts out of the mirror · lift 9.8: the date · hit 18.8: the last line.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpvee05', duration: DURATION, music: { style: 'jazzy', key: 'E', seed: 4105, sections: { drop: 0.15, breakdown: [5.0], lift: [9.8], outroAt: DURATION - 0.3 }, hits: [16.8, 18.8] }, cues: CUES }
