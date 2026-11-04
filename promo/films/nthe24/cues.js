// nthe24 score: synthwave, F#m (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.0 · breakdown 9.2: the question · lift 12.45: the advice · hit 17.4: the payoff · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nthe24', duration: DURATION, music: { style: 'synthwave', key: 'F#m', seed: 2424, sections: { drop: 1.0, breakdown: [9.2], lift: [12.45], outroAt: DURATION - 4.4 }, hits: [17.4] }, cues: CUES }
