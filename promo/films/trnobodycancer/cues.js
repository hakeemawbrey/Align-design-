// trnobodycancer score: chiptune, B, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro under the silence ("Nobody:", crickets) · drop 2.82: "Cancer after one voice note:" · hit 8.2: the payoff · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trnobodycancer', duration: DURATION, music: { style: 'chiptune', key: 'B', seed: 2202, sections: { drop: 2.82, build: 1, outroAt: DURATION - 4.4 }, hits: [8.2] }, cues: CUES }
