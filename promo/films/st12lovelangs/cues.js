// st12lovelangs score — pop, D (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro under the hot take · drop: OBJECTION! · lift: the gavel · outro under the end card.
import { DURATION, CUES, OBJ, VERDICT_AT } from './scenes/index.js'
export default { id: 'st12lovelangs', duration: DURATION, music: { style: 'pop', key: 'D', seed: 1205, sections: { drop: OBJ, lift: VERDICT_AT, outroAt: DURATION - 4.4 } }, cues: CUES }
