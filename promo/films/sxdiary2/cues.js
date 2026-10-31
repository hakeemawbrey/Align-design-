// sxdiary2 score — dreamy, A♭ (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.9: day two · lift 15.6: the outfit changes · hit 27.9: the veil lifts · breakdown 33.94: ★ lesson · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sxdiary2', duration: DURATION, music: { style: 'dreamy', key: 'Ab', seed: 13102, sections: { drop: 2.9, lift: 15.6, breakdown: 33.94, outroAt: DURATION - 4.4 }, hits: [27.9] }, cues: CUES }
