// st9scorpiowork score — screwed, Ebm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop on Scorpio's first line · lift as the strings draw on · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st9scorpiowork', duration: DURATION, music: { style: 'screwed', key: 'Ebm', seed: 937, sections: { drop: T.l2, lift: T.strings, outroAt: DURATION - 4.4 } }, cues: CUES }
