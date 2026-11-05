// kpvee08 score: screwed, Fm (style engine in promo/scripts/teaser-sound.mjs). Loops (24.6 s).
//   drop 0.17: Venus crashes in · breakdown 7.2: the talk · lift 13.2: CLICK · hit 21.4: the last line.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpvee08', duration: DURATION, music: { style: 'screwed', key: 'Fm', seed: 4108, sections: { drop: 0.17, breakdown: [7.2], lift: [13.2], outroAt: DURATION - 0.3 }, hits: [13.2, 21.4] }, cues: CUES }
