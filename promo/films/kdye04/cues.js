// kdye04 score: synthwave, E (style engine in promo/scripts/teaser-sound.mjs). No end card: the outro lands under the last line.
// drop 3.2: slowing down · breakdown 8.0: the sunrise · lift 12.8: the plant · hits 1.85 the stamp, 15.5 "Pace".
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kdye04', duration: DURATION, music: { style: 'synthwave', key: 'E', seed: 1604, sections: { drop: 3.2, breakdown: [8.0], lift: [12.8], outroAt: 18.2 }, hits: [1.85, 15.5] }, cues: CUES }
