// kswe18 score: synthwave, Em (style engine in promo/scripts/teaser-sound.mjs). Loops: music runs to the end.
//   drop 5.0: the mismatch · breakdown 15.0: slow · lift 27.0: fast · breakdown 39.0: the bench · lift 51.0: morning.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kswe18', duration: DURATION, music: { style: 'synthwave', key: 'Em', seed: 1118, sections: { drop: 5.0, breakdown: [15.0, 39.0], lift: [27.0, 51.0], outroAt: DURATION - 0.5 } }, cues: CUES }
