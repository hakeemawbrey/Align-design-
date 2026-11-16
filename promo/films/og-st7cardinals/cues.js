// st7cardinals score — house, B (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.05: the meeting opens · lift at the plan · outro under the end card.
import { DURATION, CUES, BEATS } from './scenes/index.js'
export default { id: 'st7cardinals', duration: DURATION, music: { style: 'house', key: 'B', seed: 711, sections: { drop: 3.05, lift: +BEATS.plan.toFixed(2), outroAt: DURATION - 4.4 } }, cues: CUES }
