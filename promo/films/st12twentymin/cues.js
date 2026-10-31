// st12twentymin score — lofi, Eb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop: OBJECTION!, Sagittarius · lift: the verdict slams · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st12twentymin', duration: DURATION, music: { style: 'lofi', key: 'Eb', seed: 1226, sections: { drop: T.obj ?? T.obj1, lift: T.verdict, outroAt: DURATION - 4.4 } }, cues: CUES }
