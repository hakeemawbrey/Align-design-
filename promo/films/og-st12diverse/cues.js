// st12diverse score — cinematic, D (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop: OBJECTION!, the shy star · lift: the verdict slams · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st12diverse', duration: DURATION, music: { style: 'cinematic', key: 'D', seed: 1228, sections: { drop: T.obj ?? T.obj1, lift: T.verdict, outroAt: DURATION - 4.4 } }, cues: CUES }
