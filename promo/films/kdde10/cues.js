// kdde10 score: lofi, Eb (style engine in promo/scripts/teaser-sound.mjs). Hard cut: the music lands with the last line.
//   drop: chapter 1 · breakdown: chapter 3 (the fight, softer) · lift: chapter 4 (the payoff).
import { DURATION, CUES, T } from './scenes/index.js'
const C = T.CH.map(c => c.at)
export default { id: 'kdde10', duration: DURATION, music: { style: 'lofi', key: 'Eb', seed: 1010, sections: { drop: C[0], breakdown: [C[2]], lift: [C[3]], outroAt: DURATION - 0.5 }, hits: [T.LASTH.at] }, cues: CUES }
