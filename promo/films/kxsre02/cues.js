// kxsre02 score: jazzy, Eb (style engine in promo/scripts/teaser-sound.mjs). No end card: the final chord lands with the
//   last line and the film hard-cuts at 60.
//   drop 3.0: the booth · breakdown 29.5: assuming the worst · lift 39.6: the screen turns round · hit 55.2: the stamp
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kxsre02', duration: DURATION, music: { style: 'jazzy', key: 'Eb', seed: 4202, sections: { drop: 3.0, breakdown: [29.5], lift: [39.6, 48.5], outroAt: 58.6 }, hits: [55.2] }, cues: CUES }
