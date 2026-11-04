// nthe20 score: jazzy, F (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.9 · breakdown 5.6: the question · lift 11.0: the advice · hit 14.9: the payoff · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe20', duration: DURATION, music: { style: 'jazzy', key: 'F', seed: 2020, sections: { drop: 0.9, breakdown: [5.6], lift: [11.0], outroAt: DURATION - 4.4 }, hits: [14.9] }, cues: CUES }
