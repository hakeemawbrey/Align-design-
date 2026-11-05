// kcfe12 score: dreamy, Ab (style engine in promo/scripts/teaser-sound.mjs). Loops: the music runs to the end.
//   drop 1.5: the freeze lets go · breakdown 9.2: "is that bad?" · lift 10.7: "my favourite thing about me."
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kcfe12', duration: DURATION, music: { style: 'dreamy', key: 'Ab', seed: 912, sections: { drop: 1.5, breakdown: [9.2], lift: [10.7], outroAt: DURATION - 0.5 } }, cues: CUES }
