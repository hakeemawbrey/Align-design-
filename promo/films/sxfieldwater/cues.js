// sxfieldwater score — dreamy, Db, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.16: the guide's first line · breakdown 15.66: STOP 3, the rush (questions whoosh in over a thin bed) · lift 18.72:
//   SKIP IT, the calm bubble · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sxfieldwater', duration: DURATION, music: { style: 'dreamy', key: 'Db', seed: 234, sections: { drop: 1.156, breakdown: [15.66], lift: [18.72], outroAt: DURATION - 4.4 }, hits: [18.72] }, cues: CUES }
