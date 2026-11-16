// st8knock score — screwed, Cm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.6: "THIS FALL…" · lift 13.5: Aries takes the chain · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st8knock', duration: DURATION, music: { style: 'screwed', key: 'Cm', seed: 802, sections: { drop: 2.6, lift: 13.5, outroAt: DURATION - 4.4 } }, cues: CUES }
