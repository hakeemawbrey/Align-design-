// st12talkingstage score — house, Am (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro under the hot take · drop: OBJECTION! · lift: the gavel · outro under the end card.
import { DURATION, CUES, OBJ, VERDICT_AT } from './scenes/index.js'
export default { id: 'st12talkingstage', duration: DURATION, music: { style: 'house', key: 'Am', seed: 1203, sections: { drop: OBJ, lift: VERDICT_AT, outroAt: DURATION - 4.4 } }, cues: CUES }
