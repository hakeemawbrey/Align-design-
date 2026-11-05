// kxpye05 score: lofi, Ab (style engine in promo/scripts/teaser-sound.mjs). No end card: the music runs to the end and loops.
//   drop 4.0: chapter 1 · breakdown 70.0: the last chapter · lift 83.2: the goodbye.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kxpye05', duration: DURATION, music: { style: 'lofi', key: 'Ab', seed: 4315, sections: { drop: 4.0, breakdown: [70.0], lift: [83.2], outroAt: DURATION - 0.5 } }, cues: CUES }
