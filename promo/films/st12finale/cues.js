// st12finale score — cinematic, Dm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.6: OBJECTION! and the city chorus · lift 11.95: the city-vote map · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st12finale', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 1235, sections: { drop: 2.6, lift: 11.95, outroAt: DURATION - 4.4 } }, cues: CUES }
