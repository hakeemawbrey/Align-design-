// hxpatio score — house, F (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop: OBJECTION!, Cancer melts · lift: the verdict slams · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'hxpatio', duration: DURATION, music: { style: 'house', key: 'F', seed: 4102, sections: { drop: T.obj, lift: T.verdict, outroAt: DURATION - 4.4 } }, cues: CUES }
