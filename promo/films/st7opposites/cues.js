// st7opposites score — dreamy, Db (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.05: the walk · lift at "look up" · outro under the end card.
import { DURATION, CUES, BEATS } from './scenes/index.js'
export default { id: 'st7opposites', duration: DURATION, music: { style: 'dreamy', key: 'Db', seed: 710, sections: { drop: 3.05, lift: +BEATS.sky.toFixed(2), outroAt: DURATION - 4.4 } }, cues: CUES }
