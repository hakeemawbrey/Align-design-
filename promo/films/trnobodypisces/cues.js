// trnobodypisces score: chiptune, F#, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro under the silence ("Nobody:", crickets) · drop 2.82: "Pisces watching a sock ad:" · hit 8.2: the payoff · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trnobodypisces', duration: DURATION, music: { style: 'chiptune', key: 'F#', seed: 2205, sections: { drop: 2.82, build: 1, outroAt: DURATION - 4.4 }, hits: [8.2] }, cues: CUES }
