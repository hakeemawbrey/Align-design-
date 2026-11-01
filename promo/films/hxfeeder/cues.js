// hxfeeder score — funk, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop: OBJECTION!, Aries · lift: the verdict slams · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'hxfeeder', duration: DURATION, music: { style: 'funk', key: 'E', seed: 4101, sections: { drop: T.obj, lift: T.verdict, outroAt: DURATION - 4.4 } }, cues: CUES }
