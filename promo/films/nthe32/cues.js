// nthe32 score: pop, C (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 6.8 · breakdown 10.95: the question · lift 13.9: the advice · hit 18.75: the payoff · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe32', duration: DURATION, music: { style: 'pop', key: 'C', seed: 3232, sections: { drop: 6.8, breakdown: [10.95], lift: [13.9], outroAt: DURATION - 4.4 }, hits: [18.75] }, cues: CUES }
