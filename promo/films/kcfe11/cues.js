// kcfe11 score: synthwave, C#m (style engine in promo/scripts/teaser-sound.mjs). Loops: the music runs to the end.
//   drop 1.0: "I don't get attached." · breakdown 7.2: "you okay?" · lift 10.7: "so, a lot."
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kcfe11', duration: DURATION, music: { style: 'synthwave', key: 'C#m', seed: 911, sections: { drop: 1.0, breakdown: [7.2], lift: [10.7], outroAt: DURATION - 0.5 } }, cues: CUES }
