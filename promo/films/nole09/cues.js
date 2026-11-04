// nole09 score: house, F (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.8: the suitcase pops · lift at the card flip into THE LINE · outro under the end card.
import { DURATION, CUES, CUT } from './scenes/index.js'

export default { id: 'nole09', duration: DURATION, music: { style: 'house', key: 'F', seed: 4209, sections: { drop: 1.8, lift: [CUT], outroAt: DURATION - 4.4 }, hits: [CUT] }, cues: CUES }
