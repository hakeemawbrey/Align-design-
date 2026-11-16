// st9capcrew score — cinematic, Cm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.8: the requests start · lift 15.0: the roles flip · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st9capcrew', duration: DURATION, music: { style: 'cinematic', key: 'Cm', seed: 949, sections: { drop: 2.8, lift: 15.0, outroAt: DURATION - 4.4 } }, cues: CUES }
