// st7campfire score — dreamy, C (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.05: the campfire · lift at the zodiac wheel · outro under the end card.
import { DURATION, CUES, BEATS } from './scenes/index.js'
export default { id: 'st7campfire', duration: DURATION, music: { style: 'dreamy', key: 'C', seed: 712, sections: { drop: 3.05, lift: +BEATS.family.toFixed(2), outroAt: DURATION - 4.4 } }, cues: CUES }
