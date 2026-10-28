// st5blackhole score — cinematic, Ebm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.0: the unsent texts get slurped · lift 12.6: the first thing said out loud · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st5blackhole', duration: DURATION, music: { style: 'cinematic', key: 'Ebm', seed: 909, sections: { drop: 3.0, lift: 12.6, outroAt: DURATION - 4.4 } }, cues: CUES }
