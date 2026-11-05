// kpte17 score: pop, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.42: the pattern break · breakdown: chapter 2 · lift: chapter 4 · hit: the last line.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'kpte17', duration: DURATION, music: { style: 'pop', key: 'A', seed: 14017, sections: { drop: 0.42, breakdown: [T.chapters[1].t0], lift: [T.chapters[3].t0], outroAt: DURATION - 1.4 }, hits: [T.lastAt] }, cues: CUES }
