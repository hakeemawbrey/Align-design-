// kdye14 score: chiptune, A (style engine in promo/scripts/teaser-sound.mjs). No end card: the outro lands under the last line.
// drop 3.0: the rink · breakdown 8.2: the wobble · lift 13.4: the glide · hits 1.3 the stamp, 10.2 "+1 BRAVERY".
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kdye14', duration: DURATION, music: { style: 'chiptune', key: 'A', seed: 1614, sections: { drop: 3.0, breakdown: [8.2], lift: [13.4], outroAt: 19.4 }, hits: [1.3, 10.2] }, cues: CUES }
