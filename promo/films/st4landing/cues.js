// st4landing score — cinematic, C minor, 100 bpm-ish (arranged by the style engine in promo/scripts/teaser-sound.mjs). The film agent sets sections.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4landing', duration: DURATION, music: { style: 'cinematic', key: 'Cm', seed: 401, sections: { drop: 4.9, outroAt: DURATION - 4.4 } }, cues: CUES }
