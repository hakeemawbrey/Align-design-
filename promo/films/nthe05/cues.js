// nthe05 score: dreamy, Eb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.0 · breakdown 8.0 (the card cut) · lift 10.5 (the advice) · hit 12.1 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe05', duration: DURATION, music: { style: 'dreamy', key: 'Eb', seed: 505, sections: { drop: 3.0, breakdown: [8.0], lift: [10.5], outroAt: DURATION - 2.4 }, hits: [12.1] }, cues: CUES }
