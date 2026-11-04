// nole13 score: funk, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.5: the first knock · lift at the card flip into THE LINE · outro under the end card.
import { DURATION, CUES, CUT } from './scenes/index.js'

export default { id: 'nole13', duration: DURATION, music: { style: 'funk', key: 'E', seed: 4213, sections: { drop: 1.5, lift: [CUT], outroAt: DURATION - 4.4 }, hits: [CUT] }, cues: CUES }
