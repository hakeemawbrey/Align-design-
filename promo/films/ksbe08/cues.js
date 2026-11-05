// ksbe08 score: screwed, Fm (style engine in promo/scripts/teaser-sound.mjs). No end card: the music runs to the last frame.
//   drop 2.3: colour snaps back after the freeze · lift 10.4: the better line writes in.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ksbe08', duration: DURATION, music: { style: 'screwed', key: 'Fm', seed: 1708, sections: { drop: 2.3, lift: [10.4], outroAt: DURATION - 1.0 } }, cues: CUES }
