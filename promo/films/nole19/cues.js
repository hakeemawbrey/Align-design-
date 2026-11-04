// nole19 score: house, Bb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.8: the third gift drops · lift at the card flip into THE LINE · outro under the end card.
import { DURATION, CUES, CUT } from './scenes/index.js'

export default { id: 'nole19', duration: DURATION, music: { style: 'house', key: 'Bb', seed: 4219, sections: { drop: 1.8, lift: [CUT], outroAt: DURATION - 4.4 }, hits: [CUT] }, cues: CUES }
