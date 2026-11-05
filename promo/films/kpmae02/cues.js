// kpmae02 score: lofi, Eb (style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.35: Mars skids to a stop · breakdown 9.6: Mars trying to sit still · lift 21.2: the reply · loops at 28.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpmae02', duration: DURATION, music: { style: 'lofi', key: 'Eb', seed: 5202, sections: { drop: 0.35, breakdown: [9.6], lift: [21.2], outroAt: DURATION - 1.2 }, hits: [24.5] }, cues: CUES }
