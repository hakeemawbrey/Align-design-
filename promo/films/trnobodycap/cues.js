// trnobodycap score: chiptune, C#, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro under the silence ("Nobody:", crickets) · drop 2.82: "Capricorn planning date night:" · hit 7.75: the BOOKED stamp · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trnobodycap', duration: DURATION, music: { style: 'chiptune', key: 'C#', seed: 2203, sections: { drop: 2.82, build: 1, outroAt: DURATION - 4.4 }, hits: [7.75] }, cues: CUES }
