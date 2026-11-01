// hxwave score — pop, A (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop: OBJECTION!, Virgo · lift: the verdict slams · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'hxwave', duration: DURATION, music: { style: 'pop', key: 'A', seed: 4104, sections: { drop: T.obj, lift: T.verdict, outroAt: DURATION - 4.4 } }, cues: CUES }
