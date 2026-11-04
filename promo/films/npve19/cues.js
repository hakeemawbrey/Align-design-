// npve19 score: cinematic, F (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.4: "you good?" · lift 6.2: the quiet seat (card cut) · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'npve19', duration: DURATION, music: { style: 'cinematic', key: 'F', seed: 4319, sections: { drop: 2.4, lift: 6.2, outroAt: DURATION - 2.4 } }, cues: CUES }
