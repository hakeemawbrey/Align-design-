// nthe16 score: pop, Eb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.4 · breakdown 10.0 (the card cut) · lift 10.2 (the advice) · hit 14.8 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe16', duration: DURATION, music: { style: 'pop', key: 'Eb', seed: 516, sections: { drop: 1.4, breakdown: [10.0], lift: [10.2], outroAt: DURATION - 4.4 }, hits: [14.8] }, cues: CUES }
