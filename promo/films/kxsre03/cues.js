// kxsre03 score: lofi, F (style engine in promo/scripts/teaser-sound.mjs). No end card: the final chord lands with the
//   last line and the film hard-cuts at 60.
//   drop 3.0: hello · breakdown 25.0: the pause · lift 38.0: "so nervous" · hit 55.2: the stamp
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kxsre03', duration: DURATION, music: { style: 'lofi', key: 'F', seed: 4203, sections: { drop: 3.0, breakdown: [25.0], lift: [38.0, 48.5], outroAt: 58.6 }, hits: [55.2] }, cues: CUES }
