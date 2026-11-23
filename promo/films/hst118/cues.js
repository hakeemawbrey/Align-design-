// hst118 score: jazzy, E (teaser-sound.mjs style engine); quiet under the SFX (startalk.js-based: musicRel -11).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'hst118', duration: DURATION, music: { style: 'jazzy', key: 'E', seed: 11808, lufs: -26, musicRel: -11, crackle: false, sections: { drop: 0, outroAt: DURATION - 2.4 } }, cues: CUES }
