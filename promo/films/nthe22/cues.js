// nthe22 score: pop, G (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.6 · breakdown 7.7: the question · lift 10.3: the advice · hit 13.6: the payoff · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe22', duration: DURATION, music: { style: 'pop', key: 'G', seed: 2222, sections: { drop: 0.6, breakdown: [7.7], lift: [10.3], outroAt: DURATION - 2.4 }, hits: [13.6] }, cues: CUES }
