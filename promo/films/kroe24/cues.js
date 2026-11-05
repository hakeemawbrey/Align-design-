// kroe24 score: funk, E (style engine in promo/scripts/teaser-sound.mjs). No end card: the music runs to the hard cut.
//   drop 3.0: draft 1 rated · breakdown 30: draft 4 · lift 40 + 51.5: draft 5 and SEND · hit 54: the reply.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kroe24', duration: DURATION, music: { style: 'funk', key: 'E', seed: 3724, sections: { drop: 3.0, breakdown: [30], lift: [40, 51.5], outroAt: DURATION - 0.5 }, hits: [54] }, cues: CUES }
