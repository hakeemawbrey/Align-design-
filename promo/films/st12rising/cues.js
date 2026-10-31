// st12rising score — synthwave, Fm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop: OBJECTION!, Taurus bursts in · lift: the verdict slams · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st12rising', duration: DURATION, music: { style: 'synthwave', key: 'Fm', seed: 1222, sections: { drop: T.obj ?? T.obj1, lift: T.verdict, outroAt: DURATION - 4.4 } }, cues: CUES }
