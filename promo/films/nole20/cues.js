// nole20 score: synthwave, Am (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.9: the snort · lift at the card flip into THE LINE · outro under the end card.
import { DURATION, CUES, CUT } from './scenes/index.js'

export default { id: 'nole20', duration: DURATION, music: { style: 'synthwave', key: 'Am', seed: 4220, sections: { drop: 1.9, lift: [CUT], outroAt: DURATION - 4.4 }, hits: [CUT] }, cues: CUES }
