// yr2020video score: dreamy, Eb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 7.0: the card cut into NOW (the year flips to 2026) · hit 10.9: the slippers bump · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'yr2020video', duration: DURATION, music: { style: 'dreamy', key: 'Eb', seed: 2701, sections: { drop: 7.0, outroAt: DURATION - 4.4 }, hits: [10.9] }, cues: CUES }
