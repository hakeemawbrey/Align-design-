// st5pluto score — screwed, Gm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 4.3: Pluto screeches to a stop, the gasp · lift 11.0: "you rule my chart, not my choices." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st5pluto', duration: DURATION, music: { style: 'screwed', key: 'Gm', seed: 533, sections: { drop: 4.3, lift: 11.0, outroAt: DURATION - 4.4 } }, cues: CUES }
