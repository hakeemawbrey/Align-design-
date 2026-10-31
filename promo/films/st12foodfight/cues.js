// st12foodfight score — funk, Em (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.6: OBJECTION! · lift 8.75: the food fight · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st12foodfight', duration: DURATION, music: { style: 'funk', key: 'Em', seed: 1229, sections: { drop: 2.6, lift: 8.75, outroAt: DURATION - 4.4 } }, cues: CUES }
