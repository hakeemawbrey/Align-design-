// yraries score: pop, C (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 6.71: the card cut into 2026 · lift 12.78: the payoff · hit 13.93: "Still fast. *Now* kind." lands · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'yraries', duration: DURATION, music: { style: 'pop', key: 'C', seed: 701, sections: { drop: 6.71, lift: [12.78], outroAt: DURATION - 4.4 }, hits: [13.93] }, cues: CUES }
