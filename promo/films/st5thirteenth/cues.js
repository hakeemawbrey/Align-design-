// st5thirteenth score — cinematic, Dm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.2: Saturn starts the group photo · lift 7.5: the flash, Ophiuchus arrives · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st5thirteenth', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 513, sections: { drop: 3.2, lift: 7.5, outroAt: DURATION - 4.4 } }, cues: CUES }
