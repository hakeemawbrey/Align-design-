// kpvee01 score: funk, A (style engine in promo/scripts/teaser-sound.mjs). Hard cut at 24.
//   drop 0.12: Venus lands · breakdown 10.5: the love-language title · lift 15.8: the banner rolls up · hit 22.6: the last line.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpvee01', duration: DURATION, music: { style: 'funk', key: 'A', seed: 4101, sections: { drop: 0.12, breakdown: [10.5], lift: [15.8], outroAt: DURATION - 0.6 }, hits: [22.6] }, cues: CUES }
