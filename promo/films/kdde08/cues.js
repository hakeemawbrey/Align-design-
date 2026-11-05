// kdde08 score: cinematic, C#m (style engine in promo/scripts/teaser-sound.mjs). Loops: the music runs to the seam.
//   drop: chapter 1 · breakdown: chapter 3 (the fight, softer) · lift: chapter 4 (the payoff).
import { DURATION, CUES, T } from './scenes/index.js'
const C = T.CH.map(c => c.at)
export default { id: 'kdde08', duration: DURATION, music: { style: 'cinematic', key: 'C#m', seed: 808, sections: { drop: C[0], breakdown: [C[2]], lift: [C[3]], outroAt: DURATION - 0.5 }, hits: [T.LASTH.at] }, cues: CUES }
