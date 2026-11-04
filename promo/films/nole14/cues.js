// nole14 score: jazzy, G (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.8: the plate swings away · lift at the card flip into THE LINE · outro under the end card.
import { DURATION, CUES, CUT } from './scenes/index.js'

export default { id: 'nole14', duration: DURATION, music: { style: 'jazzy', key: 'G', seed: 4214, sections: { drop: 1.8, lift: [CUT], outroAt: DURATION - 4.4 }, hits: [CUT] }, cues: CUES }
