// st8rose score — dreamy, Db (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 4.3: the host's first line · lift 12.6: the rose starts drawing · breakdown 24.85: the archive · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st8rose', duration: DURATION, music: { style: 'dreamy', key: 'Db', seed: 8222, sections: { drop: 4.3, lift: 12.6, breakdown: 24.85, outroAt: DURATION - 4.4 } }, cues: CUES }
