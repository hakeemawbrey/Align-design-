// kplanetdemo score: chiptune, C (style engine in promo/scripts/teaser-sound.mjs). Hard cut at 25.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kplanetdemo', duration: DURATION, music: { style: 'chiptune', key: 'C', seed: 1001, sections: { drop: 0.7, lift: [21.0], outroAt: DURATION - 1 } }, cues: CUES }
