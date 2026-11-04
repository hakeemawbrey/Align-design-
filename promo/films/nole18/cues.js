// nole18 score: lofi, D (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.4: the eye twitch · lift at the cut into THE LINE · outro under the end card.
import { DURATION, CUES, CUT } from './scenes/index.js'

export default { id: 'nole18', duration: DURATION, music: { style: 'lofi', key: 'D', seed: 4218, sections: { drop: 1.4, lift: [CUT], outroAt: DURATION - 2.4 }, hits: [CUT] }, cues: CUES }
