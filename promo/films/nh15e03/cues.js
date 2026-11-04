// nh15e03 score: chiptune, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 4.1: guide A · breakdown 14.0: the door opens · lift 17.2: inside, no guide needed · hit 25.0: last line
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nh15e03', duration: DURATION, music: { style: 'chiptune', key: 'A', seed: 1503, sections: { drop: 4.1, breakdown: [14.0], lift: [17.2], outroAt: DURATION - 2.4 }, hits: [25.0] }, cues: CUES }
