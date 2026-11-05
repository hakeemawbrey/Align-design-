// kpvee07 score: cinematic, Bb (style engine in promo/scripts/teaser-sound.mjs). Long (78.4 s), hard cut.
//   drop 0.42: Venus spins in · breakdown 24.8: paused · lift 38.8 / 57.8: chapters 3 and 4 · hits 66.9 (me too), 75.4.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpvee07', duration: DURATION, music: { style: 'cinematic', key: 'Bb', seed: 4107, sections: { drop: 0.42, breakdown: [24.8], lift: [38.8, 57.8], outroAt: DURATION - 0.8 }, hits: [66.9, 75.4] }, cues: CUES }
