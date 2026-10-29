// st10aquarius score — synthwave, Am (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 12.2: the demo · breakdown 20.6: alone by the class garden · lift 37.4: the machine waters every plant ·
//   outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st10aquarius', duration: DURATION, music: { style: 'synthwave', key: 'Am', seed: 1011, sections: { drop: T.demo, breakdown: T.alone, lift: T.water, outroAt: DURATION - 4.4 } }, cues: CUES }
