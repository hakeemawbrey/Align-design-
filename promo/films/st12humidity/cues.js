// st12humidity score — dreamy, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop: OBJECTION!, the Houston star · lift: the verdict slams · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st12humidity', duration: DURATION, music: { style: 'dreamy', key: 'A', seed: 1227, sections: { drop: T.obj ?? T.obj1, lift: T.verdict, outroAt: DURATION - 4.4 } }, cues: CUES }
