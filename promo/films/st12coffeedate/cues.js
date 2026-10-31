// st12coffeedate score — lofi, F (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop: OBJECTION! · lift: the gavel · outro under the end card.
import { DURATION, CUES, OBJ, VERDICT_AT } from './scenes/index.js'
export default { id: 'st12coffeedate', duration: DURATION, music: { style: 'lofi', key: 'F', seed: 1236, sections: { drop: OBJ, lift: VERDICT_AT, outroAt: DURATION - 4.4 } }, cues: CUES }
