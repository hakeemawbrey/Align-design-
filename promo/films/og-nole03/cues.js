// og-nole03 score: chiptune, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.9: the bubbles collide · lift at the cut into THE LINE · outro at the last beat (social: no end card).
import { DURATION, CUES, CUT } from './scenes/index.js'

export default { id: 'og-nole03', duration: DURATION, music: { style: 'chiptune', key: 'A', seed: 4203, sections: { drop: 1.9, lift: [CUT], outroAt: DURATION - 0.6 }, hits: [CUT] }, cues: CUES }
