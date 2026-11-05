// kdde04 score: dreamy, Db (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 6.2: chapter 1 · breakdown 58.2: chapter 3 (the trench) · lift 84.2: chapter 4 · hit 113.4: the chest opens · no end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kdde04', duration: DURATION, music: { style: 'dreamy', key: 'Db', seed: 2414, sections: { drop: 6.2, breakdown: [58.2], lift: [84.2], outroAt: DURATION - 0.6 }, hits: [0.9, 113.4] }, cues: CUES }
