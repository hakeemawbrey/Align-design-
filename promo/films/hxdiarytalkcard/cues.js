// hxdiarytalkcard score — dreamy, B (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.9: the diary opens · lift 15.0: the bayou bench · hit 20.9: the card flips · breakdown 33.94: ★ lesson · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'hxdiarytalkcard', duration: DURATION, music: { style: 'dreamy', key: 'B', seed: 80304, sections: { drop: 2.9, lift: 15.0, breakdown: 33.94, outroAt: DURATION - 4.4 }, hits: [20.9] }, cues: CUES }
