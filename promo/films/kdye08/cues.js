// kdye08 score: house, C (style engine in promo/scripts/teaser-sound.mjs). Loops: the outro rings into the seam.
// drop 3.0: the coin flips · breakdown 8.4: lost · lift 13.4: the bakery · hits 1.3 the stamp, 14.2 the bakery window.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kdye08', duration: DURATION, music: { style: 'house', key: 'C', seed: 1608, sections: { drop: 3.0, breakdown: [8.4], lift: [13.4], outroAt: 19.8 }, hits: [1.3, 14.2] }, cues: CUES }
