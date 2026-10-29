// st9capwork score — cinematic, Gm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.8: the zoom-out begins · lift 12.9: the climb · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st9capwork', duration: DURATION, music: { style: 'cinematic', key: 'Gm', seed: 947, sections: { drop: 2.8, lift: 12.9, outroAt: DURATION - 4.4 } }, cues: CUES }
