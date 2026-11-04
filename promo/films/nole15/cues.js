// nole15 score: chiptune, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.4: the date waves · lift at the cut into THE LINE · outro under the end card.
import { DURATION, CUES, CUT } from './scenes/index.js'

export default { id: 'nole15', duration: DURATION, music: { style: 'chiptune', key: 'E', seed: 4215, sections: { drop: 1.4, lift: [CUT], outroAt: DURATION - 2.4 }, hits: [CUT] }, cues: CUES }
