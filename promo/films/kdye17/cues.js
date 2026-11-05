// kdye17 score: pop, A (style engine in promo/scripts/teaser-sound.mjs). Loops: the outro rings into the seam.
// drop 3.4: the train · breakdown 33.0: the open mic · lift 48.0: sunset · hits 1.3 the stamp, 62.0 the voice note is sent.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kdye17', duration: DURATION, music: { style: 'pop', key: 'A', seed: 1617, sections: { drop: 3.4, breakdown: [33.0], lift: [48.0], outroAt: 64.2 }, hits: [1.3, 62.0] }, cues: CUES }
