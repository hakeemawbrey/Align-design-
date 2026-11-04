// nole05 score: funk, G (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.8: the big hair flip · lift at the card flip into THE LINE · outro under the end card.
import { DURATION, CUES, CUT } from './scenes/index.js'

export default { id: 'nole05', duration: DURATION, music: { style: 'funk', key: 'G', seed: 4205, sections: { drop: 1.8, lift: [CUT], outroAt: DURATION - 4.4 }, hits: [CUT] }, cues: CUES }
