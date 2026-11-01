// trdaycard score: lofi, Ab, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 5.0: the commute (shuffled) · breakdown 13.45: the big meeting (flipped) · lift 18.65: clock out (loved)
//   · hit 22.95: the wink · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trdaycard', duration: DURATION, music: { style: 'lofi', key: 'Ab', seed: 1001, sections: { drop: 5.0, breakdown: [13.45], lift: [18.65], outroAt: DURATION - 4.4 }, hits: [22.95] }, cues: CUES }
