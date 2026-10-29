// st9ariesam score — synthwave, Em (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.6: the speedrun HUD starts · lift 9.6: the kitchen · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st9ariesam', duration: DURATION, music: { style: 'synthwave', key: 'Em', seed: 901, sections: { drop: 2.6, lift: 9.6, outroAt: DURATION - 4.4 } }, cues: CUES }
