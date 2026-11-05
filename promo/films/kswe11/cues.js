// kswe11 score: synthwave, Am (style engine in promo/scripts/teaser-sound.mjs). Loops: music runs to the end.
//   drop 2.6: the board · breakdown 6.6: decoding · lift 9.4: the bus.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kswe11', duration: DURATION, music: { style: 'synthwave', key: 'Am', seed: 1111, sections: { drop: 2.6, breakdown: [6.6], lift: [9.4], outroAt: DURATION - 0.5 } }, cues: CUES }
