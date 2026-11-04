// nthe11 score: house, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.4 · breakdown 5.6 (the card cut) · lift 10.0 (the advice) · hit 14.3 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe11', duration: DURATION, music: { style: 'house', key: 'A', seed: 511, sections: { drop: 2.4, breakdown: [5.6], lift: [10.0], outroAt: DURATION - 2.4 }, hits: [14.3] }, cues: CUES }
