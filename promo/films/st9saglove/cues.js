// st9saglove score — house, F#m (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.95: the map's flight arcs land · lift 11.8: the telescope finds the galaxy's centre · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st9saglove', duration: DURATION, music: { style: 'house', key: 'F#m', seed: 943, sections: { drop: 2.95, lift: 11.8, outroAt: DURATION - 4.4 } }, cues: CUES }
