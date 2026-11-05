// kxpye01 score: chiptune, C (style engine in promo/scripts/teaser-sound.mjs). No end card: the music runs to the hard cut.
//   drop 4.0: chapter 1 · breakdown 70.0: the goodbye chapter · lift 83.2: everyone waves.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kxpye01', duration: DURATION, music: { style: 'chiptune', key: 'C', seed: 4311, sections: { drop: 4.0, breakdown: [70.0], lift: [83.2], outroAt: DURATION - 0.5 } }, cues: CUES }
