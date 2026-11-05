// kdde07 score: jazzy, Bb (style engine in promo/scripts/teaser-sound.mjs). Hard cut: the music lands with the last line.
//   drop 8.5: chapter 1 · breakdown 62.5: chapter 3 (the fight, softer) · lift 89.5: chapter 4 (the payoff).
import { DURATION, CUES, T } from './scenes/index.js'
const C = T.CH.map(c => c.at)
export default { id: 'kdde07', duration: DURATION, music: { style: 'jazzy', key: 'Bb', seed: 707, sections: { drop: C[0], breakdown: [C[2]], lift: [C[3]], outroAt: DURATION - 0.5 }, hits: [T.LASTH.at] }, cues: CUES }
