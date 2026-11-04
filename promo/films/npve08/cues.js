// npve08 score: screwed, Ebm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.3: the staring contest · lift 9.15: "you first." (card cut) · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'npve08', duration: DURATION, music: { style: 'screwed', key: 'Ebm', seed: 4308, sections: { drop: 4.4, lift: 9.15, outroAt: DURATION - 4.4 } }, cues: CUES }
