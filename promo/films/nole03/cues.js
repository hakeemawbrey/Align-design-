// nole03 score: chiptune, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.9: the bubbles collide · lift at the card flip into THE LINE · outro under the end card.
import { DURATION, CUES, CUT } from './scenes/index.js'

export default { id: 'nole03', duration: DURATION, music: { style: 'chiptune', key: 'A', seed: 4203, sections: { drop: 1.9, lift: [CUT], outroAt: DURATION - 4.4 }, hits: [CUT] }, cues: CUES }
