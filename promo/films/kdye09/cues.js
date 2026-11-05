// kdye09 score: cinematic, Dm (style engine in promo/scripts/teaser-sound.mjs). No end card: the outro lands under the last line.
// drop 3.0: the matinee · breakdown 8.2: the sad part · lift 13.6: lights up · hits 1.3 the stamp, 16.0 "same time next week?".
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kdye09', duration: DURATION, music: { style: 'cinematic', key: 'D', seed: 1609, sections: { drop: 3.0, breakdown: [8.2], lift: [13.6], outroAt: 19.4 }, hits: [1.3, 16.0] }, cues: CUES }
