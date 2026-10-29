// st9sagam score — house, Am (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.75: the split-flap board drops in · lift 5.2: it lands on HOME · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st9sagam', duration: DURATION, music: { style: 'house', key: 'Am', seed: 941, sections: { drop: 2.75, lift: 5.2, outroAt: DURATION - 4.4 } }, cues: CUES }
