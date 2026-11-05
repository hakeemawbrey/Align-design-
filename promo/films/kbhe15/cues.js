// kbhe15 score: lofi, G (style engine in promo/scripts/teaser-sound.mjs). Loops: music runs to the end (no end card).
//   drop 1.2: "one more message" · breakdown 3.6: sleep… 3 % · lift 7.0: the tuck-in · outro: the seam.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kbhe15', duration: DURATION, music: { style: 'lofi', key: 'G', seed: 4115, sections: { drop: 1.2, breakdown: [3.6], lift: [7.0], outroAt: DURATION - 0.5 }, hits: [5.8] }, cues: CUES }
