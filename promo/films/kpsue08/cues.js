// kpsue08 score: cinematic, Fm (style engine in promo/scripts/teaser-sound.mjs). Loop at 26 (no end card).
//   drop 0.4: the Sun lands · breakdown 8.2: "they could leave" · lift 17.0: the window opens · outro 22.8.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpsue08', duration: DURATION, music: { style: 'cinematic', key: 'Fm', seed: 5108, sections: { drop: 0.4, breakdown: [8.2], lift: [17.0], outroAt: 22.8 } }, cues: CUES }
