// kxsre06 score: chiptune, A (style engine in promo/scripts/teaser-sound.mjs). No end card: the final chord lands with the
//   last line and the film hard-cuts at 60.
//   drop 3.0: try one · breakdown 36.0: the last coin · lift 40.9: the win · hit 55.2: the stamp
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kxsre06', duration: DURATION, music: { style: 'chiptune', key: 'A', seed: 4206, sections: { drop: 3.0, breakdown: [36.0], lift: [40.9, 48.5], outroAt: 58.6 }, hits: [55.2] }, cues: CUES }
