// st12venus score — dreamy, Eb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop: OBJECTION! · lift: the gavel · outro under the end card.
import { DURATION, CUES, OBJ, VERDICT_AT } from './scenes/index.js'
export default { id: 'st12venus', duration: DURATION, music: { style: 'dreamy', key: 'Eb', seed: 1256, sections: { drop: OBJ, lift: VERDICT_AT, outroAt: DURATION - 4.4 } }, cues: CUES }
