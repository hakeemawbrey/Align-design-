// og-nole12 score: lofi, Eb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.8: the phone pings · lift at the cut into THE LINE · outro at the last beat (social: no end card).
import { DURATION, CUES, CUT } from './scenes/index.js'

export default { id: 'og-nole12', duration: DURATION, music: { style: 'lofi', key: 'Eb', seed: 4212, sections: { drop: 1.8, lift: [CUT], outroAt: DURATION - 0.6 }, hits: [CUT] }, cues: CUES }
