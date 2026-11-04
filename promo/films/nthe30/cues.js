// nthe30 score: jazzy, D (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.6 · breakdown 7.3: the question · lift 10.9: the advice · hit 14.9: the payoff · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe30', duration: DURATION, music: { style: 'jazzy', key: 'D', seed: 3030, sections: { drop: 0.6, breakdown: [7.3], lift: [10.9], outroAt: DURATION - 4.4 }, hits: [14.9] }, cues: CUES }
