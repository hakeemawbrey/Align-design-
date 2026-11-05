// kbge01 score: funk, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.35: the whip zoom · breakdown 2.75: the red pen · lift at the glow-up · hit on the last line. No end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'kbge01', duration: DURATION, music: { style: 'funk', key: 'E', seed: 3401, sections: { drop: 0.35, breakdown: [T.strike[0]], lift: [T.glow], outroAt: DURATION - 0.6 }, hits: [T.last + 0.3] }, cues: CUES }
