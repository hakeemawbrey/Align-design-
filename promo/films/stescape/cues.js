// stescape score — chiptune, C, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.378: the rules · breakdown 23.378: the final door (lights dim) · lift 27.822: the door opens · hit 30.6: LESSON
//   · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'stescape', duration: DURATION, music: { style: 'chiptune', key: 'C', seed: 15, sections: { drop: T.drop, breakdown: T.fin, lift: T.open3, outroAt: DURATION - 4.4 }, hits: [T.lesson] }, cues: CUES }
