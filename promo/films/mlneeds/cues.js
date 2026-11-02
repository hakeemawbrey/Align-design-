// mlneeds score: lofi, Eb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 10.0: Act 1 (Friday on the bench) · breakdown 63.0: the empty tissue box, soft under THE STARS ADVISE
//   · lift 90.0: Act 3 ("I need a check-in when you go quiet.") · hit 102.6: the pixel moon lands · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'mlneeds', duration: DURATION, music: { style: 'lofi', key: 'Eb', seed: 88, sections: { drop: 10.0, breakdown: [63.0], lift: [90.0], outroAt: DURATION - 4.4 }, hits: [102.6] }, cues: CUES }
