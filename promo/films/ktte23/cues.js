// ktte23 score: dreamy, C (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop on the first sob · breakdowns at each chapter · lift on question 30 · lands under the last line, hard cut.
import { DURATION, CUES, CHAPTERS, LIFT } from './scenes/index.js'
export default { id: 'ktte23', duration: DURATION, music: { style: 'dreamy', key: 'C', seed: 2923, sections: { drop: 0.12, breakdown: CHAPTERS.slice(1, 3), lift: [CHAPTERS[3], LIFT], outroAt: DURATION - 2.2 }, hits: [LIFT] }, cues: CUES }
