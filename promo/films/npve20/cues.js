// npve20 score: screwed, Fm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.4: the lid pops · lift 6.2: "it's nothing" (card cut) · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'npve20', duration: DURATION, music: { style: 'screwed', key: 'Fm', seed: 4320, sections: { drop: 2.4, lift: 6.2, outroAt: DURATION - 2.4 } }, cues: CUES }
