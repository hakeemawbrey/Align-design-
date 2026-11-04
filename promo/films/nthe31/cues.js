// nthe31 score: dreamy, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.8 · breakdown 9.95: the question · lift 13.9: the advice · hit 18.75: the payoff · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe31', duration: DURATION, music: { style: 'dreamy', key: 'E', seed: 3131, sections: { drop: 0.8, breakdown: [9.95], lift: [13.9], outroAt: DURATION - 2.4 }, hits: [18.75] }, cues: CUES }
