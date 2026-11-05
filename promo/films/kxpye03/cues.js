// kxpye03 score: jazzy, Db (style engine in promo/scripts/teaser-sound.mjs). No end card: the music runs to the end and loops.
//   drop 4.0: chapter 1 · breakdown 70.0: the last chapter · lift 83.2: the goodbye.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kxpye03', duration: DURATION, music: { style: 'jazzy', key: 'Db', seed: 4313, sections: { drop: 4.0, breakdown: [70.0], lift: [83.2], outroAt: DURATION - 0.5 } }, cues: CUES }
