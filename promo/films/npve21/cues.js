// npve21 score: chiptune, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.4: the talk card · lift 6.2: the hill (card cut) · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'npve21', duration: DURATION, music: { style: 'chiptune', key: 'E', seed: 4321, sections: { drop: 2.4, lift: 6.2, outroAt: DURATION - 2.4 } }, cues: CUES }
