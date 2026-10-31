// st12libra score — jazzy, F#m (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop: OBJECTION! · lift: the gavel · outro under the end card.
import { DURATION, CUES, OBJ, VERDICT_AT } from './scenes/index.js'
export default { id: 'st12libra', duration: DURATION, music: { style: 'jazzy', key: 'F#m', seed: 1250, sections: { drop: OBJ, lift: VERDICT_AT, outroAt: DURATION - 4.4 } }, cues: CUES }
