// st12houstonbest score — house, Gm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop: OBJECTION! x2, Austin and Dallas · lift: the verdict slams · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st12houstonbest', duration: DURATION, music: { style: 'house', key: 'Gm', seed: 1225, sections: { drop: T.obj ?? T.obj1, lift: T.verdict, outroAt: DURATION - 4.4 } }, cues: CUES }
