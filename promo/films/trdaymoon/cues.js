// trdaymoon score: lofi, Bb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 5.0: hanging around · breakdown 13.45: eavesdropping · lift 18.65: clock out? never · hit 22.95: the wink
//   · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trdaymoon', duration: DURATION, music: { style: 'lofi', key: 'Bb', seed: 1002, sections: { drop: 5.0, breakdown: [13.45], lift: [18.65], outroAt: DURATION - 4.4 }, hits: [22.95] }, cues: CUES }
