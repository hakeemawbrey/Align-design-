// nole01 score: pop, C (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.35: Aries starts typing "fine." · lift 3.6: the card flip into THE LINE · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nole01', duration: DURATION, music: { style: 'pop', key: 'C', seed: 4201, sections: { drop: 1.35, lift: [3.6], outroAt: DURATION - 4.4 }, hits: [3.6] }, cues: CUES }
