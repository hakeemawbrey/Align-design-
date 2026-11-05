// kdde09 score: house, A (style engine in promo/scripts/teaser-sound.mjs). Hard cut: the music lands with the last line.
//   drop: chapter 1 · breakdown: chapter 3 (the fight, softer) · lift: chapter 4 (the payoff).
import { DURATION, CUES, T } from './scenes/index.js'
const C = T.CH.map(c => c.at)
export default { id: 'kdde09', duration: DURATION, music: { style: 'house', key: 'A', seed: 909, sections: { drop: C[0], breakdown: [C[2]], lift: [C[3]], outroAt: DURATION - 0.5 }, hits: [T.LASTH.at] }, cues: CUES }
