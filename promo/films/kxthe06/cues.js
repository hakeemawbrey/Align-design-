// kxthe06 score: cinematic, Cm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.0: the night after · breakdown 21.6: "was it me?" · lift 38.4: Sag's story · breakdown 57.6: the quiet call
//   lift 72.0: the 3 a.m. voice notes · hits 47.4 NOBODY KNOWS, 50.4 "ha" · outro 88.25, hard cut at 90.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kxthe06', duration: DURATION, music: { style: 'cinematic', key: 'Cm', seed: 3806, sections: { drop: 3.0, breakdown: [21.6, 57.6], lift: [38.4, 72.0], outroAt: 88.25 }, hits: [47.4, 50.4] }, cues: CUES }
