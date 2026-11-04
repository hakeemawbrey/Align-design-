// nf16e11 score: cinematic, Cm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.2: the frost · breakdown 11.4: give it time · lift 20.4: bring them in · hit 30.0: the lesson · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nf16e11', duration: DURATION, music: { style: 'cinematic', key: 'Cm', seed: 1611, sections: { drop: 3.2, breakdown: [11.4], lift: [20.4], outroAt: DURATION - 2.4 }, hits: [30.0] }, cues: CUES }
