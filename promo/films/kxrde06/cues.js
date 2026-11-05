// kxrde06 score: cinematic, Cm (style engine in promo/scripts/teaser-sound.mjs). Loops: the music runs to the seam.
//   drop 3.0: the plan · breakdown 33.0: BUT… · lift 43.0: the laugh · hit 63.8: the stamp
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kxrde06', duration: DURATION, music: { style: 'cinematic', key: 'Cm', seed: 4216, sections: { drop: 3.0, breakdown: [33.0], lift: [43.0, 63.0], outroAt: DURATION - 0.5 }, hits: [63.8] }, cues: CUES }
