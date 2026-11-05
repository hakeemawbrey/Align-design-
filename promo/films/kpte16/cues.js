// kpte16 score: cinematic, G (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.42: the whip · breakdown: chapter 2 (the spiral) · lift: chapter 4 (the plan) · hit: the last line.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'kpte16', duration: DURATION, music: { style: 'cinematic', key: 'G', seed: 14016, sections: { drop: 0.42, breakdown: [T.chapters[1].t0], lift: [T.chapters[3].t0], outroAt: DURATION - 1.4 }, hits: [T.lastAt] }, cues: CUES }
