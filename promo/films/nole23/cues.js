// nole23 score: chiptune, D (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.6: the glitch · lift at the card flip into THE LINE · outro under the end card.
import { DURATION, CUES, CUT } from './scenes/index.js'

export default { id: 'nole23', duration: DURATION, music: { style: 'chiptune', key: 'D', seed: 4223, sections: { drop: 1.6, lift: [CUT], outroAt: DURATION - 4.4 }, hits: [CUT] }, cues: CUES }
