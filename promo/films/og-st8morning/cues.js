// st8morning score — dreamy, Db (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop at the BEFORE / AFTER reveal · lift back on the hill at sunrise · outro under the end card.
import { DURATION, CUES, TIMES } from './scenes/index.js'
export default { id: 'st8morning', duration: DURATION, music: { style: 'dreamy', key: 'Db', seed: 814, sections: { drop: TIMES.ba[0], lift: TIMES.hill, outroAt: DURATION - 4.4 } }, cues: CUES }
