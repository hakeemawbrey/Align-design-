// nt2e70 score: cinematic, Gm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.1: beat 1's jump cut · breakdown 7.6: the twisted third beat · lift 11.35: the finale · hit 11.35 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nt2e70', duration: DURATION, music: { style: 'cinematic', key: 'Gm', seed: 7001, sections: { drop: 2.1, breakdown: [7.6], lift: [11.35], outroAt: DURATION - 2.4 }, hits: [11.35] }, cues: CUES }
