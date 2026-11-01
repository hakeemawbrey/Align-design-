// trdayphone score: lofi, Eb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 5.0: checking · breakdown 13.45: the wait before the right buzz · lift 18.65: the reply · hit 14.6: the right
//   buzz · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trdayphone', duration: DURATION, music: { style: 'lofi', key: 'Eb', seed: 1005, sections: { drop: 5.0, breakdown: [13.45], lift: [18.65], outroAt: DURATION - 4.4 }, hits: [14.6] }, cues: CUES }
