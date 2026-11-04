// nole21 score: funk, C (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.6: the date looks down · lift at the card flip into THE LINE · outro under the end card.
import { DURATION, CUES, CUT } from './scenes/index.js'

export default { id: 'nole21', duration: DURATION, music: { style: 'funk', key: 'C', seed: 4221, sections: { drop: 1.6, lift: [CUT], outroAt: DURATION - 4.4 }, hits: [CUT] }, cues: CUES }
