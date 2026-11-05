// kpmae03 score: chiptune, A (style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.55: Mars lands · breakdown 6.0: the loading bar · lift 16.2: the reply · hit 22.5: the punchline. Hard cut.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpmae03', duration: DURATION, music: { style: 'chiptune', key: 'A', seed: 5303, sections: { drop: 0.55, breakdown: [6.0], lift: [16.2], outroAt: DURATION - 0.6 }, hits: [22.6] }, cues: CUES }
