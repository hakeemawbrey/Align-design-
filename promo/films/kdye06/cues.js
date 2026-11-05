// kdye06 score: dreamy, Ab (style engine in promo/scripts/teaser-sound.mjs). Loops: the outro rings into the seam.
// drop 3.0: the cupboard · breakdown 8.2: the picnic · lift 13.6: the sunset · hits 1.3 the stamp, 6.2 "FOR TUESDAYS".
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kdye06', duration: DURATION, music: { style: 'dreamy', key: 'Ab', seed: 1606, sections: { drop: 3.0, breakdown: [8.2], lift: [13.6], outroAt: 19.2 }, hits: [1.3, 6.2] }, cues: CUES }
