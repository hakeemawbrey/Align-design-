// nole22 score: cinematic, Gm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.4: the receipt prints · lift at the cut into THE LINE · outro under the end card.
import { DURATION, CUES, CUT } from './scenes/index.js'

export default { id: 'nole22', duration: DURATION, music: { style: 'cinematic', key: 'Gm', seed: 4222, sections: { drop: 1.4, lift: [CUT], outroAt: DURATION - 2.4 }, hits: [CUT] }, cues: CUES }
