// hxpho score — lofi, Db (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop: OBJECTION!, the New York star laughs · lift: the verdict slams · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'hxpho', duration: DURATION, music: { style: 'lofi', key: 'Db', seed: 4103, sections: { drop: T.obj, lift: T.verdict, outroAt: DURATION - 4.4 } }, cues: CUES }
