// st9scorpioam score — screwed, Cm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop on the first line · lift when the drawer opens · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st9scorpioam', duration: DURATION, music: { style: 'screwed', key: 'Cm', seed: 936, sections: { drop: T.l1, lift: T.drawer, outroAt: DURATION - 4.4 } }, cues: CUES }
