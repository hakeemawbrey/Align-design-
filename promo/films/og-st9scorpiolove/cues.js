// st9scorpiolove score — screwed, Gm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop when the dossier opens · lift at the window, Antares · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'st9scorpiolove', duration: DURATION, music: { style: 'screwed', key: 'Gm', seed: 938, sections: { drop: T.dossier, lift: T.win, outroAt: DURATION - 4.4 } }, cues: CUES }
