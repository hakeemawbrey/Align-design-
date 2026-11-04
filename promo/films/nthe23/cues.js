// nthe23 score: house, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.7 · breakdown 3.4: the question · lift 7.3: the advice · hit 11.1: the payoff · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe23', duration: DURATION, music: { style: 'house', key: 'A', seed: 2323, sections: { drop: 0.7, breakdown: [3.4], lift: [7.3], outroAt: DURATION - 2.4 }, hits: [11.1] }, cues: CUES }
