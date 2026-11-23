// hst125 score: synthwave, B (teaser-sound.mjs style engine); quiet under the SFX (startalk.js-based: musicRel -11).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'hst125', duration: DURATION, music: { style: 'synthwave', key: 'B', seed: 12515, lufs: -26, musicRel: -11, crackle: false, sections: { drop: 0, outroAt: DURATION - 2.4 } }, cues: CUES }
