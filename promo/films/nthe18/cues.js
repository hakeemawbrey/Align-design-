// nthe18 score: lofi, Bb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.8 · breakdown 7.95: the question · lift 10.75: the advice · hit 14.6: the payoff · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe18', duration: DURATION, music: { style: 'lofi', key: 'Bb', seed: 1818, sections: { drop: 0.8, breakdown: [7.95], lift: [10.75], outroAt: DURATION - 2.4 }, hits: [14.6] }, cues: CUES }
