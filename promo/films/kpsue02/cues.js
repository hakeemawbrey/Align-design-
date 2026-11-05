// kpsue02 score: lofi, F (style engine in promo/scripts/teaser-sound.mjs). Loop at 26 (no end card).
//   drop 0.7: the sunrise lands · breakdown 8.0: "new people are a lot" · lift 17.4: "…yes." · outro 23.2.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpsue02', duration: DURATION, music: { style: 'lofi', key: 'F', seed: 5102, sections: { drop: 0.7, breakdown: [8.0], lift: [17.4], outroAt: 23.2 } }, cues: CUES }
