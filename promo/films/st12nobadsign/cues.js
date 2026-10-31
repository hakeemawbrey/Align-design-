// st12nobadsign score — cinematic, Cm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop: the first OBJECTION! · lift: the verdict slams · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st12nobadsign', duration: DURATION, music: { style: 'cinematic', key: 'Cm', seed: 1224, sections: { drop: T.obj ?? T.obj1, lift: T.verdict, outroAt: DURATION - 4.4 } }, cues: CUES }
