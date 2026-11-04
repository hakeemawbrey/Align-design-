// nole12 score: lofi, Eb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.8: the phone pings · lift at the cut into THE LINE · outro under the end card.
import { DURATION, CUES, CUT } from './scenes/index.js'

export default { id: 'nole12', duration: DURATION, music: { style: 'lofi', key: 'Eb', seed: 4212, sections: { drop: 1.8, lift: [CUT], outroAt: DURATION - 2.4 }, hits: [CUT] }, cues: CUES }
