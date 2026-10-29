// askaries score — synthwave, A minor, 118 bpm feel (arranged by the style engine in promo/scripts/teaser-sound.mjs). The film agent sets sections.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'askaries', duration: DURATION, music: { style: 'synthwave', key: 'Am', seed: 1201, sections: { drop: 2.5, outroAt: DURATION - 4.4 } }, cues: CUES }
