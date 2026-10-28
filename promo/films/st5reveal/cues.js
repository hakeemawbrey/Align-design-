// st5reveal score — cinematic, Cm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.2: Saturn's sky map · lift 16.4: a seat at the table · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st5reveal', duration: DURATION, music: { style: 'cinematic', key: 'Cm', seed: 808, sections: { drop: 3.2, lift: 16.4, outroAt: DURATION - 4.4 } }, cues: CUES }
