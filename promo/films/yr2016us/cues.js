// yr2016us score: dreamy, Ab, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 7.0: the card cut into NOW (the year flips to 2026) · hit 9.95: "that's ME." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'yr2016us', duration: DURATION, music: { style: 'dreamy', key: 'Ab', seed: 3001, sections: { drop: 7.0, outroAt: DURATION - 4.4 }, hits: [9.95] }, cues: CUES }
