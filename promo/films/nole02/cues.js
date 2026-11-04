// nole02 score: lofi, F (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.7: the usual drifts off · lift at the card flip into THE LINE · outro under the end card.
import { DURATION, CUES, CUT } from './scenes/index.js'

export default { id: 'nole02', duration: DURATION, music: { style: 'lofi', key: 'F', seed: 4202, sections: { drop: 1.7, lift: [CUT], outroAt: DURATION - 4.4 }, hits: [CUT] }, cues: CUES }
