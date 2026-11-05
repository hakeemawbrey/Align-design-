// kdye02 score: jazzy, Bb (style engine in promo/scripts/teaser-sound.mjs). No end card: the outro lands under the last line.
// drop 3.2: stop 1 (the stare) · breakdown 6.1: the reveal · lift 13.8: savour · hits 1.75 the stamp, 17.0 the bill.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kdye02', duration: DURATION, music: { style: 'jazzy', key: 'Bb', seed: 1602, sections: { drop: 3.2, breakdown: [6.1], lift: [13.8], outroAt: 19.4 }, hits: [1.75, 17.0] }, cues: CUES }
