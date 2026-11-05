// kroe23 score: chiptune, C (style engine in promo/scripts/teaser-sound.mjs). No end card: the music runs to the hard cut.
//   drop 2.6: FIRE · breakdown 28.4: AIR · lift 41.3: WATER · hit 54.4: the ovation.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kroe23', duration: DURATION, music: { style: 'chiptune', key: 'C', seed: 3723, sections: { drop: 2.6, breakdown: [28.4], lift: [41.3, 54.4], outroAt: DURATION - 0.5 }, hits: [54.4] }, cues: CUES }
