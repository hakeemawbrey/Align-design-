// hst111 score: dreamy, D (teaser-sound.mjs style engine); quiet under the SFX (startalk.js-based: musicRel -11).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'hst111', duration: DURATION, music: { style: 'dreamy', key: 'D', seed: 11101, lufs: -26, musicRel: -11, crackle: false, sections: { drop: 0, outroAt: DURATION - 2.4 } }, cues: CUES }
