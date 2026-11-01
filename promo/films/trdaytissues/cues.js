// trdaytissues score: lofi, C, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 5.0: lunch break (the sweet text) · breakdown 13.45: the date · lift 18.65: clock out (the refill)
//   · hit 22.9: the salute · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trdaytissues', duration: DURATION, music: { style: 'lofi', key: 'C', seed: 1003, sections: { drop: 5.0, breakdown: [13.45], lift: [18.65], outroAt: DURATION - 4.4 }, hits: [22.9] }, cues: CUES }
