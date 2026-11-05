// kxsre05 score: dreamy, E (style engine in promo/scripts/teaser-sound.mjs). Loops: the music runs to the seam.
//   drop 3.0: the door · breakdown 25.0: the napkin · lift 41.4: the counter breaks · hit 55.2: the stamp
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kxsre05', duration: DURATION, music: { style: 'dreamy', key: 'E', seed: 4205, sections: { drop: 3.0, breakdown: [25.0], lift: [41.4, 48.5], outroAt: DURATION - 0.5 }, hits: [55.2] }, cues: CUES }
