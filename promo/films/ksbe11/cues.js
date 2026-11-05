// ksbe11 score: pop, D (style engine in promo/scripts/teaser-sound.mjs). No end card: the music runs to the last frame.
//   drop 2.3: colour snaps back after the freeze · lift 10.4: the better line writes in.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ksbe11', duration: DURATION, music: { style: 'pop', key: 'D', seed: 1711, sections: { drop: 2.3, lift: [10.4], outroAt: DURATION - 1.0 } }, cues: CUES }
