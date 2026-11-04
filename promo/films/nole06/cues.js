// nole06 score: jazzy, Bb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.55: the ruler · lift at the card flip into THE LINE · outro under the end card.
import { DURATION, CUES, CUT } from './scenes/index.js'

export default { id: 'nole06', duration: DURATION, music: { style: 'jazzy', key: 'Bb', seed: 4206, sections: { drop: 1.55, lift: [CUT], outroAt: DURATION - 4.4 }, hits: [CUT] }, cues: CUES }
