// mldistance score: dreamy, Db, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 10.0: Act 1 (the café) · breakdown 62.5: the low point, soft under THE STARS ADVISE · lift 90.0: Act 3
//   ("I miss you. And I'm scared.") · hit 4.4: Cancer realises · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'mldistance', duration: DURATION, music: { style: 'dreamy', key: 'Db', seed: 77, sections: { drop: 10.0, breakdown: [62.5], lift: [90.0], outroAt: DURATION - 4.4 }, hits: [4.4] }, cues: CUES }
