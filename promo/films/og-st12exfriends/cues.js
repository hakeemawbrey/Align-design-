// st12exfriends score — screwed, C#m (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro under the hot take · drop: OBJECTION! · lift: the gavel · outro under the end card.
import { DURATION, CUES, OBJ, VERDICT_AT } from './scenes/index.js'
export default { id: 'st12exfriends', duration: DURATION, music: { style: 'screwed', key: 'C#m', seed: 1204, sections: { drop: OBJ, lift: VERDICT_AT, outroAt: DURATION - 4.4 } }, cues: CUES }
