// kxrke04 score: dreamy, F (style engine in promo/scripts/teaser-sound.mjs). No end card: the music runs to the hard cut.
//   drop 4.2: chapter 1 / #12 · breakdown 70.2: the drumroll · lift 73.6: #1 · hit 73.6.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kxrke04', duration: DURATION, music: { style: 'dreamy', key: 'F', seed: 4304, sections: { drop: 4.2, breakdown: [70.2], lift: [73.6], outroAt: DURATION - 0.5 }, hits: [73.6] }, cues: CUES }
