// st11scorpio score — screwed, C#m (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 4.2: Houston Mission Control · lift 42.2: Taurus takes Scorpio's hand · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st11scorpio', duration: DURATION, music: { style: 'screwed', key: 'C#m', seed: 1108, sections: { drop: 4.2, lift: 42.2, outroAt: DURATION - 4.4 } }, cues: CUES }
