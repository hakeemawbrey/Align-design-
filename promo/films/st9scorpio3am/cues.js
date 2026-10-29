// st9scorpio3am score — screwed, Fm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop at the window · lift when Taurus replies · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st9scorpio3am', duration: DURATION, music: { style: 'screwed', key: 'Fm', seed: 940, sections: { drop: T.win, lift: T.reply, outroAt: DURATION - 4.4 } }, cues: CUES }
