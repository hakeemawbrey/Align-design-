// kine16 score: cinematic, Cm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.6: chapter 1 · breakdown 16.0: chapter 2 (why it happens) · lift 29.5: chapter 3 (what helps) · lift 52.5: the
//   verdict · hits 55.25: SO NORMAL, 63.2: the sunrise · no end card: the film hard-cuts at 69.6.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kine16', duration: DURATION, music: { style: 'cinematic', key: 'Cm', seed: 1316, sections: { drop: 2.6, breakdown: [16.0], lift: [29.5, 52.5], outroAt: DURATION - 1.6 }, hits: [55.25, 63.2] }, cues: CUES }
