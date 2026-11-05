// kbhe07 score: house, D (style engine in promo/scripts/teaser-sound.mjs). Loops: music runs to the end (no end card).
//   drop 1.2: the wheel stops on YOU PICK · breakdown 4.4: deciding… · lift 7.0: THE NOODLE PLACE · outro: the seam.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kbhe07', duration: DURATION, music: { style: 'house', key: 'D', seed: 4107, sections: { drop: 1.2, breakdown: [4.4], lift: [7.0], outroAt: DURATION - 0.5 }, hits: [7.0, 9.4] }, cues: CUES }
