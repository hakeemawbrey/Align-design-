// kdye03 score: chiptune, D (style engine in promo/scripts/teaser-sound.mjs). Loops: the outro rings into the seam.
// drop 3.0: the withdrawal · breakdown 8.2: the bookshop · lift 13.4: the hour's up · hits 1.3 the stamp, 14.6 60:00.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kdye03', duration: DURATION, music: { style: 'chiptune', key: 'D', seed: 1603, sections: { drop: 3.0, breakdown: [8.2], lift: [13.4], outroAt: 19.25 }, hits: [1.3, 14.6] }, cues: CUES }
