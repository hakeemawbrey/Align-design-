// kpmae04 score: dreamy, Db (style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.1: Mars lands on the porch · breakdown 2.0: the record-scratch freeze · lift 17.6: the talk card · loops at 30.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpmae04', duration: DURATION, music: { style: 'dreamy', key: 'Db', seed: 5404, sections: { drop: 0.1, breakdown: [2.0], lift: [17.6], outroAt: DURATION - 1.2 }, hits: [25.7] }, cues: CUES }
