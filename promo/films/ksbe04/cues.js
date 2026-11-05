// ksbe04 score: dreamy, Ab (style engine in promo/scripts/teaser-sound.mjs). No end card: the music runs to the last frame.
//   drop 2.3: colour snaps back after the freeze · lift 10.4: the better line writes in.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ksbe04', duration: DURATION, music: { style: 'dreamy', key: 'Ab', seed: 1704, sections: { drop: 2.3, lift: [10.4], outroAt: DURATION - 1.0 } }, cues: CUES }
