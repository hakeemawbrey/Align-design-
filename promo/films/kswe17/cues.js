// kswe17 score: funk, Bb (style engine in promo/scripts/teaser-sound.mjs). Hard cut at 75.0.
//   drop 5.0: the deal · lifts 17.0 / 33.0 (the two talks), 63.0 (back) · breakdown 50.0: the verdict.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kswe17', duration: DURATION, music: { style: 'funk', key: 'Bb', seed: 1117, sections: { drop: 5.0, lift: [17.0, 33.0, 63.0], breakdown: [50.0], outroAt: 72.6 }, hits: [54.4] }, cues: CUES }
