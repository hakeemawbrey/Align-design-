// npve09 score: chiptune, B (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.3: "that hat is a choice" · lift 9.15: "I really like you" (card cut) · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'npve09', duration: DURATION, music: { style: 'chiptune', key: 'B', seed: 4309, sections: { drop: 2.3, lift: 9.15, outroAt: DURATION - 4.4 } }, cues: CUES }
