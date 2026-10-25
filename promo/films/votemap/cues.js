// votemap score — cinematic, Dm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). The film agent sets sections.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'votemap', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 79, sections: { drop: 2.82, outroAt: DURATION - 4.4 } }, cues: CUES }
