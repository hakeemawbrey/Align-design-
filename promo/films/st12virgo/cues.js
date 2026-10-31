// st12virgo score — jazzy, Bb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop: OBJECTION!, Pisces and the towels · lift: the verdict slams · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st12virgo', duration: DURATION, music: { style: 'jazzy', key: 'Bb', seed: 1223, sections: { drop: T.obj ?? T.obj1, lift: T.verdict, outroAt: DURATION - 4.4 } }, cues: CUES }
